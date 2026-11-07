import type { ZoneId } from "./bodyMap";
import type { DepartmentId } from "./departments";
import type { Locale } from "./i18n";

/**
 * Body parts, muscles and regions that are not (or not literally) on the figure, for the
 * "Something else?" free text. Each entry maps lay and medical terms (DE + EN in one list –
 * matching is umlaut-insensitive and fuzzy) to a target: an existing zone of the figure or
 * one of the hidden regions below. Body-part hits outrank symptom and department words.
 */

/** Regions without a marker on the figure – opened by the router like a zone. */
export type RegionId = "thigh" | "upperArm" | "lowerLeg";

export type TargetId = ZoneId | RegionId;

/** Extra copy shown on the result card for some targets */
export type AnatomyNote = "headache" | "jaw";

export interface AnatomyEntry {
  terms: string[];
  target: TargetId;
  departments: DepartmentId[];
  note?: AnatomyNote;
}

const ORTHO_PHYSIO: DepartmentId[] = ["ortho", "physio"];

export const anatomy: AnatomyEntry[] = [
  // ── Hidden regions ───────────────────────────────────────────────────────────
  {
    target: "thigh",
    departments: ORTHO_PHYSIO,
    terms: [
      "hamstring", "hamstrings", "pulled hamstring", "oberschenkelrückseite",
      "hintere oberschenkelmuskulatur", "ischiocrurale", "quadriceps", "quadrizeps", "quads",
      "thigh", "thighs", "oberschenkel", "oberschenkelmuskel", "oberschenkelmuskulatur",
      "oberschenkelzerrung", "femur", "front of my thigh", "back of my thigh", "it band",
      "iliotibial", "tractus", "schenkel",
    ],
  },
  {
    target: "upperArm",
    departments: ORTHO_PHYSIO,
    terms: [
      "biceps", "bizeps", "bizepssehne", "biceps tendon", "triceps", "trizeps", "upper arm",
      "oberarm", "oberarmmuskel", "oberarmknochen", "humerus", "arm muscle", "armmuskel",
      "deltoid", "deltamuskel", "deltoideus",
    ],
  },
  {
    target: "lowerLeg",
    departments: ORTHO_PHYSIO,
    terms: [
      "calf", "calves", "calf muscle", "calf cramp", "wade", "waden", "wadenmuskel",
      "wadenkrampf", "wadenkrämpfe", "wadenzerrung", "shin", "shins", "shin splints",
      "schienbein", "schienbeinkante", "schienbeinkantensyndrom", "lower leg", "unterschenkel",
      "soleus", "gastrocnemius", "tibia", "fibula", "wadenbein",
    ],
  },

  // ── Mapped onto existing zones ───────────────────────────────────────────────
  {
    target: "huefte",
    departments: ORTHO_PHYSIO,
    terms: [
      "groin", "leiste", "leistengegend", "leistenschmerz", "adductor", "adductors", "adduktor",
      "adduktoren", "inner thigh", "innenseite oberschenkel", "gluteal", "glutes",
      "gesäßmuskel", "po", "hintern", "sit bone", "sitzbein", "piriformis", "hip flexor",
      "hüftbeuger",
    ],
  },
  {
    target: "hand",
    departments: ["ortho"],
    terms: [
      "wrist", "wrists", "handgelenk", "finger", "fingers", "thumb", "daumen", "knuckle",
      "knuckles", "fingerknöchel", "palm", "handfläche", "handwurzel", "little finger",
      "pinky", "kleiner finger", "index finger", "zeigefinger", "mittelfinger", "ringfinger",
      "handrücken", "back of the hand",
    ],
  },
  {
    target: "fuss",
    departments: ORTHO_PHYSIO,
    terms: [
      "toe", "toes", "zeh", "zehen", "big toe", "großer zeh", "großzeh", "sole of my foot",
      "sole of the foot", "fußsohle", "instep", "fußrücken", "ball of the foot", "fußballen",
      "mittelfuß", "midfoot",
      "knöchel", "ankle", "ankles", "fußgelenk",
    ],
  },
  {
    target: "oben",
    departments: ["physio", "ortho"],
    terms: [
      "ribs", "rib", "rippen", "rippe", "chest wall", "brustkorb", "sternum", "brustbein",
      "shoulder blade", "shoulder blades", "schulterblatt", "schulterblätter", "thorax",
      "upper back", "oberer rücken",
    ],
  },
  {
    // Tension headaches often start in the neck – the card shows a note (GP for the rest)
    target: "nacken",
    departments: ORTHO_PHYSIO,
    note: "headache",
    terms: [
      "headache", "headaches", "kopfschmerz", "kopfschmerzen", "kopfweh", "tension headache",
      "spannungskopfschmerz", "spannungskopfschmerzen", "migräne", "migraine",
      "back of the head", "hinterkopf",
    ],
  },
  {
    target: "nacken",
    departments: ORTHO_PHYSIO,
    note: "jaw",
    terms: [
      "jaw", "kiefer", "kiefergelenk", "jaw joint", "tmj", "cmd", "temple", "temples",
      "schläfe", "schläfen", "teeth grinding", "zähneknirschen", "knirschen",
    ],
  },
];

/**
 * Symptom words (weight between body parts and department keywords). They do not pick a
 * zone, they tip the department suggestion towards orthopedics / physiotherapy.
 */
export interface SymptomEntry {
  terms: string[];
  departments: DepartmentId[];
}

export const symptoms: SymptomEntry[] = [
  {
    departments: ORTHO_PHYSIO,
    terms: [
      "pulled muscle", "zerrung", "gezerrt", "muskelzerrung", "muscle strain", "strain",
      "strained", "tear", "torn", "riss", "gerissen", "faserriss", "muskelfaserriss",
      "muscle tear", "sprain", "sprained", "verstaucht", "verstauchung", "stiff", "steif",
      "steifheit", "stiffness", "swollen", "geschwollen", "swelling", "schwellung", "cramp",
      "cramps", "krampf", "krämpfe", "muskelkater", "sore muscles", "muscle soreness",
      "verspannt", "verspannung", "tight", "tightness", "bluterguss", "bruise", "bruised",
      "prellung", "gives way", "knickt weg", "instabil", "unstable", "clicking", "knacken",
      "locked", "blockiert", "overuse", "überlastung", "überlastet",
    ],
  },
];

/**
 * Headache red flags: a headache word together with one of these is treated as an
 * emergency (sudden/worst headache, with fever or a stiff neck, after a fall).
 */
export const headacheTerms = [
  "headache", "headaches", "kopfschmerz", "kopfschmerzen", "kopfweh", "migräne", "migraine",
];
export const headacheRedFlagModifiers = [
  "plötzlich", "plötzlicher", "plötzliche", "plötzlichem", "sudden", "suddenly", "stärkste",
  "stärkster", "stärksten", "heftigste", "heftigster", "schlimmste", "schlimmster", "worst",
  "severe", "donnerschlag", "thunderclap", "fieber", "fever", "nackensteifigkeit",
  "nackensteif", "steifer nacken", "steifen nacken", "stiff neck", "sturz", "gestürzt",
  "nach einem sturz", "fall", "fell", "after a fall", "unfall", "accident", "erbrechen",
  "vomiting", "bewusstlos", "unconscious", "sehstörung", "sehstörungen", "vision",
  "sprachstörung", "lähmung", "taub",
];

/**
 * Injury words: a fall, accident or sprain together with a musculoskeletal body part puts
 * the Orthopedics view of that area first (Physiotherapy second) – in the search and in
 * the free text.
 */
export const injuryTerms = [
  "fell", "fall", "fallen", "falling", "slipped", "slip", "tripped", "trip", "accident",
  "crash", "crashed", "hit", "twisted", "sprain", "sprained", "injured", "injury", "injuries",
  "gestürzt", "sturz", "gefallen", "hingefallen", "ausgerutscht", "gestolpert", "unfall",
  "verletzt", "verletzung", "umgeknickt", "verdreht", "prellung", "geprellt",
];
/** An injury word together with one of these is treated as an emergency. */
export const injuryRedFlagModifiers = [
  "severe pain", "severe", "unbearable", "unbearable pain", "extreme pain", "starke schmerzen",
  "starken schmerzen", "stärkste schmerzen", "unerträgliche schmerzen", "unerträglich",
  "extreme schmerzen", "numb", "numbness", "tingling", "taub", "taubheit", "taubheitsgefühl",
  "kribbeln", "cant move", "can't move", "cannot move", "unable to move", "kann nicht bewegen",
  "nicht bewegen", "bear weight", "put weight", "cant walk", "can't walk", "cannot walk",
  "cannot stand", "nicht belasten", "nicht auftreten", "kann nicht auftreten", "kann nicht laufen",
  "kann nicht gehen", "kann nicht stehen", "hit my head", "head injury", "on my head",
  "on the head", "auf den kopf", "kopf angeschlagen", "kopf gestoßen", "kopfverletzung",
  "dizzy", "dizziness", "schwindel", "schwindelig", "schwindlig",
];

// ── Region content ───────────────────────────────────────────────────────────

export interface RegionMeta {
  id: RegionId;
  /** Shown and bookable – first one gives the accent colour */
  departments: [DepartmentId, DepartmentId];
  /** Markers that pulse when the router opens the region (nearest on the figure) */
  nearest: ZoneId[];
}

export interface RegionText {
  /** "thigh" – used in "It sounds like your {zone}" */
  short: string;
  title: string;
  intro: string;
}

export type Region = RegionMeta & RegionText;

export const regionMeta: Record<RegionId, RegionMeta> = {
  thigh: { id: "thigh", departments: ["ortho", "physio"], nearest: ["huefte", "knie"] },
  upperArm: { id: "upperArm", departments: ["ortho", "physio"], nearest: ["schulter", "ellenbogen"] },
  lowerLeg: { id: "lowerLeg", departments: ["ortho", "physio"], nearest: ["knie", "fuss"] },
};

// TODO(client): medical review of the region texts (written in the tone of the zone intros)
const regionText: Record<Locale, Record<RegionId, RegionText>> = {
  de: {
    thigh: {
      short: "Oberschenkel",
      title: "Oberschenkel",
      intro:
        "Zerrungen und Faserrisse der Oberschenkelmuskulatur – hintere Muskulatur, Quadrizeps oder Adduktoren – gehören zu den häufigsten Sportverletzungen. Ultraschall zeigt das Ausmaß, die Behandlung ist fast immer konservativ: von Physiotherapie bis zu regenerativen Verfahren.",
    },
    upperArm: {
      short: "Oberarm",
      title: "Oberarm",
      intro:
        "Bizeps, Trizeps und Deltamuskel arbeiten eng mit der Schulter zusammen. Schmerzen entstehen meist durch Überlastung, Sehnenreizungen oder nach einer plötzlichen Belastung. Mit Ultraschall sehen wir Sehnen und Muskeln direkt – und planen die Behandlung gezielt.",
    },
    lowerLeg: {
      short: "Unterschenkel",
      title: "Unterschenkel & Wade",
      intro:
        "Wadenkrämpfe, Zerrungen oder Schmerzen an der Schienbeinkante haben ihre Ursache meist in Belastung und Muskelbalance. Wir untersuchen klinisch und per Ultraschall; Physiotherapie und ein angepasster Trainingsaufbau sind die Basis der Behandlung.",
    },
  },
  en: {
    thigh: {
      short: "Thigh",
      title: "Thigh",
      intro:
        "Strains and muscle fibre tears of the thigh – hamstrings, quadriceps or adductors – are among the most common sports injuries. Ultrasound shows the extent; treatment is almost always conservative, from physiotherapy to regenerative procedures.",
    },
    upperArm: {
      short: "Upper arm",
      title: "Upper arm",
      intro:
        "Biceps, triceps and deltoid work closely with the shoulder. Pain usually comes from overuse, tendon irritation or a sudden load. Ultrasound shows tendons and muscles directly – and lets us plan treatment precisely.",
    },
    lowerLeg: {
      short: "Lower leg",
      title: "Lower leg & calf",
      intro:
        "Calf cramps, strains or pain along the shin usually come down to load and muscle balance. We examine clinically and with ultrasound; physiotherapy and a tailored training plan are the basis of treatment.",
    },
  },
};

export const regionIds: RegionId[] = ["thigh", "upperArm", "lowerLeg"];

export function getRegions(locale: Locale): Record<RegionId, Region> {
  return Object.fromEntries(
    regionIds.map((id) => [id, { ...regionMeta[id], ...regionText[locale][id] }]),
  ) as Record<RegionId, Region>;
}

export const isRegionId = (value: string): value is RegionId =>
  (regionIds as string[]).includes(value);
