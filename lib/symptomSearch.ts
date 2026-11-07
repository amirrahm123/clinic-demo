import { anatomy, regionIds, type Region, type RegionId, type TargetId } from "@/content/anatomy";
import { isMusculoskeletal, zoneOrder, type Zone, type ZoneId } from "@/content/bodyMap";
import type { DepartmentId } from "@/content/departments";
import { zoneKeywords } from "@/content/keywords";
import { searchSynonyms } from "@/content/searchIndex";
import { hasInjuryWord, matchQuality, normalize, tokenize } from "./freeTextMatch";

/**
 * Typo-tolerant suggestion search for the symptom finder ("What's bothering you?").
 * Pure, synchronous, client-side – nothing is sent anywhere.
 *
 * The index holds one entry per body-map zone and hidden region. Every entry carries its
 * title / short label / chip label and all synonyms (keywords.ts, anatomy.ts and
 * searchIndex.ts – DE and EN together), normalised (lower case, umlauts folded, ß → ss).
 *
 * Scoring: each query token is credited with its best match over the entry's terms –
 * exact (3), stem / known compound prefix (2) or one typo in words of 5+ letters (1),
 * multiplied by the term weight: a stand-alone synonym counts 2, a word inside a phrase 1,
 * a word of the title 1.5. The last token may also be an unfinished word ("kn" → knee).
 * A query that spells out a whole phrase ("lower back") gets a bonus. Generic filler
 * ("pain", "my", "Schmerzen") is ignored. An entry matched only through words inside a
 * phrase ("back of the hand") is dropped when another entry matched a whole word or phrase.
 * An injury word ("fell", "Sturz") puts the Orthopedics view of a musculoskeletal area
 * first and its Physiotherapy view right after. Results: the five best, ties in reading order.
 */

export interface SearchIndexEntry {
  target: TargetId;
  title: string;
  /** Department shown with the suggestion – and the view the area opens in */
  dept: DepartmentId;
  /** Second department of the area, if any */
  also: DepartmentId | null;
  /** Zone with a marker on the figure (regions have none) */
  zone: ZoneId | null;
}

interface Term {
  parts: string[];
  weight: number;
  joined: string;
}

interface IndexedEntry extends SearchIndexEntry {
  terms: Term[];
  order: number;
}

export interface SearchIndex {
  entries: IndexedEntry[];
}

export interface SearchHit extends SearchIndexEntry {
  score: number;
}

const TITLE_WEIGHT = 1.5;
const SINGLE_WEIGHT = 2;
const PHRASE_WEIGHT = 1;
const PHRASE_BONUS = 3;
export const MAX_RESULTS = 5;
export const MIN_QUERY = 2;
const MIN_PREFIX = 2;
const FUZZY_FROM = 5;

/** Filler words that must never decide a match on their own (normalised). */
const STOPWORDS = new Set(
  [
    "pain", "pains", "painful", "hurts", "hurt", "ache", "aches", "sore", "my", "i", "me",
    "have", "has", "had", "with", "when", "while", "the", "a", "an", "in", "on", "at", "of",
    "and", "or", "for", "since", "after", "from", "to", "is", "it", "its", "very", "bad",
    "strong", "problem", "problems", "issue", "issues", "schmerz", "schmerzen", "schmerzt",
    "weh", "tut", "tun", "ich", "mir", "mich", "mein", "meine", "meinem", "meiner", "habe",
    "hab", "seit", "beim", "bei", "im", "am", "an", "auf", "und", "oder", "mit", "der", "die",
    "das", "den", "dem", "ein", "eine", "einem", "einer", "ist", "es", "sehr", "stark",
    "starke", "beschwerden", "probleme", "wochen", "weeks", "tagen", "days", "monaten", "months",
  ].map(normalize),
);

function addTerm(terms: Term[], seen: Set<string>, raw: string, weight: number) {
  const joined = normalize(raw);
  if (!joined || seen.has(joined)) return;
  seen.add(joined);
  const parts = tokenize(joined);
  if (parts.length === 0) return;
  terms.push({ parts, weight: parts.length === 1 ? weight : Math.min(weight, PHRASE_WEIGHT), joined });
}

function synonymsOf(target: TargetId): string[] {
  const own = target in zoneKeywords ? zoneKeywords[target as ZoneId] : [];
  const fromAnatomy = anatomy.filter((a) => a.target === target).flatMap((a) => a.terms);
  return [...own, ...fromAnatomy, ...(searchSynonyms[target] ?? [])];
}

export function buildSearchIndex(
  zones: Record<ZoneId, Zone>,
  regions: Record<RegionId, Region>,
): SearchIndex {
  const entries: IndexedEntry[] = [];
  const add = (
    target: TargetId,
    title: string,
    labels: (string | undefined)[],
    dept: DepartmentId,
    also: DepartmentId | null,
    zone: ZoneId | null,
  ) => {
    const terms: Term[] = [];
    const seen = new Set<string>();
    for (const label of labels) if (label) addTerm(terms, seen, label, TITLE_WEIGHT);
    for (const synonym of synonymsOf(target)) addTerm(terms, seen, synonym, SINGLE_WEIGHT);
    entries.push({ target, title, dept, also, zone, terms, order: entries.length });
  };
  for (const id of zoneOrder) {
    const z = zones[id];
    add(id, z.title, [z.title, z.short, z.chipLabel], z.dept, z.also ?? null, id);
  }
  for (const id of regionIds) {
    const r = regions[id];
    add(id, r.title, [r.title, r.short], r.departments[0], r.departments[1] ?? null, null);
  }
  return { entries };
}

/** Query tokens that carry meaning (filler removed). */
export function searchTokens(query: string): string[] {
  return tokenize(normalize(query)).filter((t) => !STOPWORDS.has(t));
}

function tokenScore(token: string, term: Term, last: boolean): number {
  let best = 0;
  for (const part of term.parts) {
    let quality = matchQuality(token, part, token.length >= FUZZY_FROM);
    // The word still being typed: "kn" → knee / Knie – the closer the word, the better
    // ("kn" → "knee" before "Knoten")
    if (quality < 2 && last && token.length >= MIN_PREFIX && part.startsWith(token))
      quality = 2 + 0.2 * (token.length / part.length);
    if (quality > best) best = quality;
  }
  return best * term.weight;
}

export function searchSymptoms(index: SearchIndex, query: string, limit = MAX_RESULTS): SearchHit[] {
  const normalized = normalize(query);
  if (normalized.length < MIN_QUERY) return [];
  const tokens = searchTokens(query);
  if (tokens.length === 0) return [];

  const injury = hasInjuryWord(query);
  const phrase = tokens.join(" ");
  const scored: { entry: IndexedEntry; score: number; strong: boolean }[] = [];
  for (const entry of index.entries) {
    let score = 0;
    let matched = 0;
    // A whole word (or a whole phrase, below) matched – not just a word inside a phrase
    let strong = false;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === undefined) continue;
      const last = i === tokens.length - 1;
      let best = 0;
      let bestSingle = false;
      for (const term of entry.terms) {
        const s = tokenScore(token, term, last);
        if (s > best || (s === best && s > 0 && term.parts.length === 1)) {
          best = s;
          bestSingle = term.parts.length === 1;
        }
      }
      if (best > 0) {
        matched++;
        score += best;
        if (bestSingle) strong = true;
      }
    }
    if (matched === 0) continue;
    // A whole phrase typed, being typed, or contained: "lower back", "hair lo…",
    // "upper back" inside "fell on my upper back"
    if (
      entry.terms.some(
        (t) =>
          t.parts.length > 1 &&
          (t.joined === phrase || t.joined.startsWith(phrase) || ` ${phrase} `.includes(` ${t.joined} `)),
      )
    ) {
      score += PHRASE_BONUS;
      strong = true;
    }
    // Every meaningful word matched beats a partial match of the same strength
    score += matched === tokens.length ? 0.5 : 0;
    scored.push({ entry, score, strong });
  }
  const anyStrong = scored.some((s) => s.strong);
  const hits: SearchHit[] = [];
  for (const { entry, score, strong } of scored) {
    if (anyStrong && !strong) continue;
    const base = { target: entry.target, title: entry.title, zone: entry.zone };
    const msk = entry.zone ? isMusculoskeletal(entry.zone) : true;
    if (injury && msk && entry.dept !== "ortho" && entry.also === "ortho") {
      // Orthopedics view first, Physiotherapy right after it
      hits.push({ ...base, dept: "ortho", also: entry.dept, score });
      hits.push({ ...base, dept: entry.dept, also: "ortho", score });
    } else if (injury && msk && entry.dept === "ortho" && entry.also) {
      hits.push({ ...base, dept: "ortho", also: entry.also, score });
      hits.push({ ...base, dept: entry.also, also: "ortho", score });
    } else {
      hits.push({ ...base, dept: entry.dept, also: entry.also, score });
    }
  }
  // Same score: reading order, and an area's Orthopedics view before its Physiotherapy view
  hits.sort(
    (a, b) =>
      b.score - a.score ||
      orderOf(index, a.target) - orderOf(index, b.target) ||
      (a.dept === "ortho" ? -1 : 0) - (b.dept === "ortho" ? -1 : 0),
  );
  // Unique by area + department (keeps the first, best-ranked one)
  const seen = new Set<string>();
  return hits.filter((h) => {
    const key = `${h.target}:${h.dept}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

const orderOf = (index: SearchIndex, target: TargetId) =>
  index.entries.find((e) => e.target === target)?.order ?? 0;
