import {
  anatomy,
  headacheRedFlagModifiers,
  headacheTerms,
  injuryRedFlagModifiers,
  injuryTerms,
  symptoms,
  type AnatomyNote,
  type TargetId,
} from "@/content/anatomy";
import type { DepartmentId } from "@/content/departments";
import { departmentKeywords, redFlagKeywords, zoneKeywords } from "@/content/keywords";

/**
 * Client-side matcher for the body-map free text. Pure function, no network.
 *
 * 1. Normalise (lower-case, umlaut/diacritic folding, ue→u, ss for ß) and tokenise.
 * 2. Body parts – zone keywords and the anatomy dictionary – are matched first: phrases
 *    consume their tokens, single tokens match whole words, plural stems, compound prefixes
 *    ("knie" → "knieschmerzen" – only with a known tail, never "back" → "background", and
 *    never a word from the negative list) or, for words of 5+ letters, with one typo (two
 *    from 9 letters). When several keywords fit one token, the best quality / longest wins
 *    ("hautkrebs" beats "haut"). Weight 3 → a target (zone of the figure or hidden region).
 * 3. Symptom words weigh 2 and department keywords 1; they only decide anything when no
 *    body part matched.
 * 4. Red-flag words – and a headache word together with a red-flag modifier – are checked
 *    independently and always win the top of the result.
 */

/** Fold case, diacritics and German digraphs so "Rücken", "ruecken" and "RUCKEN" agree. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ae/g, "a")
    .replace(/oe/g, "o")
    .replace(/ue/g, "u")
    .replace(/[’'`´]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const tokenize = (normalized: string): string[] =>
  normalized.split(/[\s-]+/).filter(Boolean);

/** Prefix matches need a keyword of this length ("lab" must not hit "labia"). */
const MIN_PREFIX_KEYWORD = 4;
const MAX_PREFIX_EXTRA = 12;

/**
 * A keyword may only match as a prefix when the rest of the token is a known
 * continuation: an inflection ("sprain" → "sprained") or a German compound tail, optionally
 * after a joint letter ("Rücken·schmerzen", "Fersen·sporn", "Hüft·gelenk"). Anything else
 * ("back·ground", "knee·l", "hand·le") is a different word.
 */
const INFLECTIONS = /^(?:s|es|n|en|e|ed|d|ing|er|ern|ung|igkeit)?$/;
const COMPOUND_TAILS = [
  "schmerz", "gelenk", "verspannung", "beschwerde", "problem", "bereich", "scheibe", "blatt",
  "sporn", "muskel", "muskulatur", "sehne", "band", "bander", "kapsel", "bruch", "prellung",
  "zerrung", "entzundung", "steif", "verletzung", "wirbel", "kante", "spitze", "knochen",
  "region", "gegend", "seite", "arthrose", "operation", "training", "schwache", "boden",
  "krampf", "haut", "ballen", "sohle", "rucken", "gewolbe", "fehlstellung", "instabilitat",
  "blockade", "lehne", "partie", "hohe", "mitte", "ache", "pain", "cap", "bone", "joint",
];
const JOINT = /^(?:s|n|en|es|e|er)?/;
function isCompoundTail(rest: string): boolean {
  if (INFLECTIONS.test(rest)) return true;
  const afterJoint = rest.replace(JOINT, "");
  return COMPOUND_TAILS.some((tail) => afterJoint.startsWith(tail) || rest.startsWith(tail));
}

/** Words that start with a body keyword but mean something else (normalised). */
const NEGATIVE_WORDS = new Set(
  [
    "background", "backgrounds", "backpack", "backpacks", "backup", "backups", "backward",
    "backwards", "backing", "backstage", "backyard", "backlog", "backend", "kneel", "kneels",
    "kneeling", "kneeled", "knelt", "handle", "handles", "handling", "handled", "handy",
    "handful", "handsome", "handbuch", "handel", "handeln", "handlung", "handout", "handover",
    "skinny", "facebook", "faced", "faces", "facet", "facets", "footage", "football", "footing",
    "footnote", "footer", "hippo", "hipster", "hipsters", "armband", "armee", "armut", "arme",
    "necklace", "necktie", "disco", "discount", "discover", "discuss", "spineless", "spiny",
    "ribbon", "ribbons", "toecap", "heelless", "hautnah", "fussel", "fussball", "fussnote",
    "kniff", "handwerk", "handwerker", "handtuch", "handtasche", "handschuh", "handschuhe",
  ].map((w) => normalize(w)),
);
const MIN_FUZZY_LENGTH = 5;
const FUZZY_TWO_FROM = 9;

/** Crude plural / inflection stem: hands → hand, knees → knee, waden → wade, schmerzen → schmerz. */
export function stem(word: string): string {
  if (word.length <= 4) return word;
  if (word.endsWith("es") && word.length > 5) return word.slice(0, -2);
  if (word.endsWith("en") && word.length > 5) return word.slice(0, -2);
  if (word.endsWith("s") || word.endsWith("n") || word.endsWith("e")) return word.slice(0, -1);
  return word;
}

/** Levenshtein distance with an early exit above `max`. */
export function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min((prev[j] ?? 0) + 1, (cur[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length] ?? max + 1;
}

/** 0 = no match, 1 = fuzzy (typo), 2 = stem/prefix, 3 = exact. */
export function matchQuality(token: string, keyword: string, fuzzy = false): number {
  if (token === keyword) return 3;
  if (stem(token) === stem(keyword)) return 2;
  if (
    keyword.length >= MIN_PREFIX_KEYWORD &&
    token.startsWith(keyword) &&
    token.length <= keyword.length + MAX_PREFIX_EXTRA &&
    !NEGATIVE_WORDS.has(token) &&
    isCompoundTail(token.slice(keyword.length))
  )
    return 2;
  if (fuzzy && !NEGATIVE_WORDS.has(token) && token.length >= MIN_FUZZY_LENGTH && keyword.length >= MIN_FUZZY_LENGTH) {
    const max = token.length >= FUZZY_TWO_FROM && keyword.length >= FUZZY_TWO_FROM ? 2 : 1;
    if (editDistance(token, keyword, max) <= max) return 1;
  }
  return 0;
}

export const tokenMatches = (token: string, keyword: string, fuzzy = false) =>
  matchQuality(token, keyword, fuzzy) > 0;

interface Entry<T extends string> {
  target: T;
  /** Normalised keyword, split into tokens (phrases have several) */
  parts: string[];
  /** Optional tag carried to the result (anatomy notes) */
  tag?: string;
}

function buildEntries<T extends string>(
  lists: { target: T; terms: string[]; tag?: string }[],
): Entry<T>[] {
  const entries: Entry<T>[] = [];
  const seen = new Set<string>();
  for (const { target, terms, tag } of lists) {
    for (const raw of terms) {
      const normalized = normalize(raw);
      const key = `${target}|${normalized}`;
      if (!normalized || seen.has(key)) continue;
      seen.add(key);
      entries.push({ target, parts: tokenize(normalized), tag });
    }
  }
  // Longer phrases first so "lower back" consumes its tokens before "back" is tried
  return entries.sort((a, b) => b.parts.length - a.parts.length);
}

const fromTable = <T extends string>(table: Record<T, string[]>) =>
  (Object.keys(table) as T[]).map((target) => ({ target, terms: table[target] }));

export interface ScoreResult<T extends string> {
  scores: Record<T, number>;
  /** Tags of the entries that hit (e.g. "headache") */
  tags: Set<string>;
}

/**
 * Score entries against the tokens. Phrases consume their tokens; a single token is
 * credited to the best-matching keyword(s) only (quality first, then length).
 */
export function scoreEntries<T extends string>(
  entries: Entry<T>[],
  tokens: string[],
  weight: number,
  fuzzy = false,
): ScoreResult<T> {
  const scores = {} as Record<T, number>;
  const tags = new Set<string>();
  const consumed = new Array<boolean>(tokens.length).fill(false);
  const credit = (entry: Entry<T>) => {
    scores[entry.target] = (scores[entry.target] ?? 0) + weight;
    if (entry.tag) tags.add(entry.tag);
  };

  // Phrases
  for (const entry of entries) {
    if (entry.parts.length < 2) continue;
    for (let i = 0; i + entry.parts.length <= tokens.length; i++) {
      let ok = true;
      for (let j = 0; j < entry.parts.length; j++) {
        const token = tokens[i + j];
        const part = entry.parts[j];
        if (
          consumed[i + j] ||
          token === undefined ||
          part === undefined ||
          !tokenMatches(token, part, fuzzy)
        ) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      for (let j = 0; j < entry.parts.length; j++) consumed[i + j] = true;
      credit(entry);
    }
  }

  // Single tokens – best quality, then longest keyword wins
  for (let i = 0; i < tokens.length; i++) {
    if (consumed[i]) continue;
    const token = tokens[i];
    if (token === undefined) continue;
    let bestQuality = 0;
    let bestLength = 0;
    let winners: Entry<T>[] = [];
    for (const entry of entries) {
      const part = entry.parts[0];
      if (entry.parts.length !== 1 || part === undefined) continue;
      const quality = matchQuality(token, part, fuzzy);
      if (quality === 0) continue;
      if (quality > bestQuality || (quality === bestQuality && part.length > bestLength)) {
        bestQuality = quality;
        bestLength = part.length;
        winners = [entry];
      } else if (quality === bestQuality && part.length === bestLength) {
        if (!winners.some((w) => w.target === entry.target)) winners.push(entry);
      }
    }
    for (const entry of winners) credit(entry);
  }
  return { scores, tags };
}

/** Top-scoring keys: the best one, plus a runner-up that is close (≥ 75 %). Max two. */
export function topKeys<T extends string>(scores: Record<T, number>): T[] {
  const ranked = (Object.keys(scores) as T[])
    .filter((k) => scores[k] > 0)
    .sort((a, b) => scores[b] - scores[a]);
  const best = ranked[0];
  if (best === undefined) return [];
  const second = ranked[1];
  return second !== undefined && scores[second] >= scores[best] * 0.75 ? [best, second] : [best];
}

export const BODY_PART_WEIGHT = 3;
export const SYMPTOM_WEIGHT = 2;
export const DEPARTMENT_WEIGHT = 1;

// Body parts: zone keywords + anatomy dictionary → targets
const targetEntries = buildEntries<TargetId>([
  ...fromTable(zoneKeywords),
  ...anatomy.map((a) => ({ target: a.target, terms: a.terms, tag: a.note })),
]);
// Department scores: anatomy departments (3), symptoms (2), department keywords (1)
const anatomyDeptEntries = buildEntries<DepartmentId>(
  anatomy.flatMap((a) => a.departments.map((d) => ({ target: d, terms: a.terms }))),
);
const symptomEntries = buildEntries<DepartmentId>(
  symptoms.flatMap((s) => s.departments.map((d) => ({ target: d, terms: s.terms }))),
);
const departmentEntries = buildEntries<DepartmentId>(fromTable(departmentKeywords));
const redFlagEntries = buildEntries<"flag">([{ target: "flag", terms: redFlagKeywords }]);
const headacheEntries = buildEntries<"h">([{ target: "h", terms: headacheTerms }]);
const headacheModifierEntries = buildEntries<"m">([
  { target: "m", terms: headacheRedFlagModifiers },
]);
const injuryEntries = buildEntries<"i">([{ target: "i", terms: injuryTerms }]);
const injuryModifierEntries = buildEntries<"m">([{ target: "m", terms: injuryRedFlagModifiers }]);

export interface MatchResult {
  /** Best-matching body target(s): zone of the figure or hidden region – one, or two when close */
  targets: TargetId[];
  /** Department suggestion(s) – only filled when no target matched */
  departments: DepartmentId[];
  /** Extra note for the card (tension headache → neck, jaw → neck) */
  note: AnatomyNote | null;
  /** Scores (for tests / debugging) */
  targetScores: Partial<Record<TargetId, number>>;
  departmentScores: Partial<Record<DepartmentId, number>>;
  /** Words typed */
  words: number;
  redFlag: boolean;
  /** A fall / accident / sprain was mentioned: Orthopedics first for musculoskeletal areas */
  injury: boolean;
}

const sum = <T extends string>(...parts: Record<T, number>[]): Record<T, number> => {
  const out = {} as Record<T, number>;
  for (const p of parts)
    for (const k of Object.keys(p) as T[]) out[k] = (out[k] ?? 0) + (p[k] ?? 0);
  return out;
};

/** "fell", "Sturz", "umgeknickt" … – exact / stem matches only, never fuzzy. */
export function hasInjuryWord(input: string): boolean {
  const tokens = tokenize(normalize(input));
  return (scoreEntries(injuryEntries, tokens, 1).scores.i ?? 0) > 0;
}

/**
 * Red-flag check alone (the symptom search shows the emergency box while typing): a red-flag
 * word, a headache with a red-flag modifier, or an injury with severe pain / numbness /
 * cannot move or bear weight / head hit or dizziness.
 */
export function hasRedFlag(input: string): boolean {
  const tokens = tokenize(normalize(input));
  const hit = <T extends string>(entries: Entry<T>[], key: T) =>
    (scoreEntries(entries, tokens, 1).scores[key] ?? 0) > 0;
  if (hit(redFlagEntries, "flag")) return true;
  if (hit(headacheEntries, "h") && hit(headacheModifierEntries, "m")) return true;
  return hit(injuryEntries, "i") && hit(injuryModifierEntries, "m");
}

export function matchFreeText(input: string): MatchResult {
  const tokens = tokenize(normalize(input));

  // Body parts: exact / stem / prefix first; typo-tolerant only when nothing matched
  // ("tippen" must not become "lippen" when "Handgelenk" is right there)
  let body = scoreEntries(targetEntries, tokens, BODY_PART_WEIGHT);
  if (Object.keys(body.scores).length === 0)
    body = scoreEntries(targetEntries, tokens, BODY_PART_WEIGHT, true);
  const targets = topKeys(body.scores);

  const departmentScores = sum<DepartmentId>(
    scoreEntries(anatomyDeptEntries, tokens, BODY_PART_WEIGHT).scores,
    scoreEntries(symptomEntries, tokens, SYMPTOM_WEIGHT).scores,
    scoreEntries(departmentEntries, tokens, DEPARTMENT_WEIGHT).scores,
  );
  const departments = targets.length ? [] : topKeys(departmentScores);

  const redFlag = hasRedFlag(input);

  const note: AnatomyNote | null = body.tags.has("headache")
    ? "headache"
    : body.tags.has("jaw")
      ? "jaw"
      : null;

  return {
    targets,
    departments,
    note,
    targetScores: body.scores,
    departmentScores,
    words: tokens.length,
    redFlag,
    injury: hasInjuryWord(input),
  };
}
