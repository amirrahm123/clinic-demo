import type { TargetId } from "./anatomy";
import type { ZoneId } from "./bodyMap";
import type { Locale } from "./i18n";

/**
 * Extra synonyms for the symptom search (lib/symptomSearch.ts) on top of the free-text
 * keywords in keywords.ts and the anatomy dictionary: everyday phrasings, activities and
 * typical typos that people type into a search box rather than describe in a sentence.
 * DE and EN in one list – matching is case-, umlaut- and typo-insensitive.
 */
export const searchSynonyms: Partial<Record<TargetId, string[]>> = {
  knie: [
    "treppe", "treppen", "treppensteigen", "stairs", "climbing stairs", "ligament", "band",
    "knieschmerzen", "knee pain", "kniebeschwerden", "acl", "mcl", "pcl", "jumpers knee",
    "springerknie", "knorpel", "cartilage", "kniearthrose", "knee arthritis", "kneeling pain",
    "beugen", "bending", "squat", "squats", "kniebeugen", "swollen knee", "geschwollenes knie",
    "knee gives way", "knie knickt weg", "knee clicks", "knie knackt", "kne", "kne pain",
  ],
  ruecken: [
    "rückenschmerzen", "back pain", "lower back pain", "unterer rücken", "lendenbereich",
    "lumbago", "sitting", "sitzen", "heben", "lifting", "bücken", "bending over", "verhebt",
    "hexenschuss", "nerv eingeklemmt", "pinched nerve", "trapped nerve", "ausstrahlung ins bein",
    "radiating into the leg", "kribbeln im bein", "tingling in the leg", "backpain",
  ],
  oben: ["verspannung zwischen den schulterblättern", "upper back pain", "rippenschmerzen", "rib pain"],
  nacken: [
    "nackenschmerzen", "neck pain", "nackenverspannung", "neck tension", "kopfschmerzen vom nacken",
    "headache from the neck", "bildschirmarbeit", "desk work", "schreibtisch", "whiplash",
    "schleudertrauma", "kann den kopf nicht drehen", "cannot turn my head",
  ],
  schulter: [
    "schulterschmerzen", "shoulder pain", "arm heben", "lifting the arm", "raising my arm",
    "overhead", "über kopf", "schulter steif", "stiff shoulder", "schulter knackt",
    "shoulder clicks", "sehnenriss schulter", "rotator cuff tear", "schulter ausgekugelt",
    "dislocated shoulder", "luxation",
  ],
  ellenbogen: ["ellenbogenschmerzen", "elbow pain", "tennis", "golf", "mausarm", "mouse arm", "rsi"],
  hand: [
    "handschmerzen", "hand pain", "handgelenkschmerzen", "wrist pain", "fingerschmerzen",
    "finger pain", "tippen", "typing", "einschlafende hände", "hands falling asleep",
    "kribbeln in den fingern", "tingling fingers", "fingerarthrose", "finger arthritis",
    "daumenschmerzen", "thumb pain",
  ],
  huefte: [
    "hüftschmerzen", "hip pain", "leistenschmerzen", "groin pain", "gesäßschmerzen",
    "buttock pain", "hüftarthrose", "hip arthritis", "hüfte knackt", "hip clicks",
    "schmerzen beim liegen auf der seite", "pain lying on my side",
  ],
  fuss: [
    "fußschmerzen", "foot pain", "sprunggelenkschmerzen", "ankle pain", "zehenschmerzen",
    "toe pain", "verstaucht", "sprained ankle", "bänderriss", "torn ligament", "umgeknickt",
    "twisted ankle", "fußfehlstellung", "senkfuß", "fallen arches",
  ],
  ferse: [
    "fersenschmerzen", "heel pain", "achillessehnenschmerzen", "achilles pain", "morgens erste schritte",
    "first steps in the morning", "laufen", "running", "jogging", "joggen",
  ],
  gesicht: ["gesichtsschmerzen", "face pain", "kiefer", "jaw", "jaw pain", "kieferschmerzen"],
  brust: ["brustschmerzen beim tasten", "lump", "knoten", "brustuntersuchung", "breast check", "breast exam"],
  gyne: [
    "frauengesundheit", "womens health", "women's health", "frauenärztin", "gynäkologie",
    "gynecology", "unterleibsschmerzen", "pelvic pain", "regelschmerzen", "period pain",
    "menstrual cramps", "zyklusstörung", "irregular periods", "ausbleibende periode",
    "missed period", "pille", "verhütung", "contraception", "kinderwunsch", "fertility",
    "schwangerschaft", "pregnancy",
  ],
  wechseljahre: ["menopause", "wechseljahresbeschwerden", "menopause symptoms", "hitzewallungen", "hot flashes", "hormontherapie", "hrt"],
  beckenboden: ["beckenbodentraining", "pelvic floor training", "blasenschwäche", "urinverlust", "leaking urine", "incontinence"],
  vorsorge: ["frauenarzt vorsorge", "gyn check-up", "krebsvorsorge frau", "pap smear", "abstrich"],
  intimlaser: ["scheidentrockenheit", "vaginal dryness", "intimbereich", "intimate area", "juliet laser"],
  hautkrebs: ["muttermal kontrolle", "mole check", "hautkrebsvorsorge", "skin cancer check", "leberfleck verändert", "mole changed"],
  haut: [
    "haarausfall", "hair loss", "haare fallen aus", "losing hair", "dünner werdendes haar",
    "thinning hair", "kahle stellen", "bald patches", "alopecia", "alopezie", "hautausschlag",
    "skin rash", "ausschlag", "rash", "juckende haut", "itchy skin", "ekzem", "eczema",
    "neurodermitis", "schuppenflechte", "psoriasis", "akne", "acne", "pickel", "pimples",
    "allergie", "allergy", "nagelpilz", "nail fungus", "warzen", "warts", "hautarzt",
    "dermatologist", "hautprobleme", "skin problems", "hautkrankheit", "skin disease",
  ],
  dermalaser: ["laserbehandlung", "laser treatment", "tattooentfernung", "tattoo removal", "besenreiser", "spider veins", "pigmentflecken", "pigmentation", "narben", "scars"],
  aesthetik: ["falten", "wrinkles", "botox", "filler", "hyaluron", "lippen aufspritzen", "lip filler", "anti-aging", "ästhetik", "aesthetics"],
  hautbild: ["hautbild verbessern", "improve my skin", "hydrafacial", "microneedling", "peeling", "skin booster", "glow"],
  chirurgie: ["schönheitsoperation", "cosmetic surgery", "plastische chirurgie", "plastic surgery", "lidstraffung", "eyelid surgery", "fettabsaugung", "liposuction", "brust op", "breast surgery"],
  labor: [
    "laborwerte", "lab tests", "lab test", "blutwerte", "blood test", "blood work", "bluttest",
    "blutabnahme", "blood draw", "check-up", "checkup", "gesundheitscheck", "health check",
    "vitamin d", "vitamin b12", "eisenmangel", "iron deficiency", "schilddrüse", "thyroid",
    "cholesterin", "cholesterol", "blutzucker", "blood sugar", "müdigkeit", "fatigue", "tired all the time",
    "ständig müde", "labor", "lab",
  ],
  schnelltest: ["schnelltest", "rapid test", "covid test", "corona test", "grippe test", "flu test", "streptokokken test", "strep test", "crp test", "schwangerschaftstest", "pregnancy test"],
  thigh: ["oberschenkelschmerzen", "thigh pain", "muskelzerrung", "pulled muscle", "hamstring"],
  upperArm: ["oberarmschmerzen", "upper arm pain", "bizeps", "biceps"],
  lowerLeg: ["wadenschmerzen", "calf pain", "wadenkrampf", "calf cramp", "schienbeinschmerzen", "shin pain", "shin splints"],
};

export interface QuickChip {
  target: ZoneId;
  label: Record<Locale, string>;
}

/** Quick entries under the search box – the most common requests, each with its department dot. */
export const quickChips: QuickChip[] = [
  { target: "knie", label: { de: "Knie", en: "Knee" } },
  { target: "ruecken", label: { de: "Rücken", en: "Back" } },
  { target: "schulter", label: { de: "Schulter", en: "Shoulder" } },
  { target: "haut", label: { de: "Haut", en: "Skin" } },
  { target: "haut", label: { de: "Haarausfall", en: "Hair loss" } },
  { target: "gyne", label: { de: "Frauengesundheit", en: "Women’s health" } },
  { target: "labor", label: { de: "Laborwerte", en: "Lab tests" } },
];
