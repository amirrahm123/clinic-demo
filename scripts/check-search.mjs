// Runs the symptom search (lib/symptomSearch.ts) against typed queries – incl. typos and
// unfinished words – and checks the first suggestion. Exits 1 if any case fails.
// Usage: node scripts/check-search.mjs   (Node 22.6+ – runs the TS source directly)
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Content files import each other without extensions and via the "@/…" alias; this
// resolve hook maps both for Node's ESM loader.
const hook = `
  import { access } from "node:fs/promises";
  import { fileURLToPath, pathToFileURL } from "node:url";
  const root = ${JSON.stringify(pathToFileURL(process.cwd() + "/").href)};
  export async function resolve(specifier, context, next) {
    let target = null;
    if (specifier.startsWith("@/")) target = new URL(specifier.slice(2), root);
    else if (specifier.startsWith(".") && context.parentURL) target = new URL(specifier, context.parentURL);
    if (target && !/\\.(ts|js|mjs|json)$/i.test(target.href)) {
      const url = new URL(target.href + ".ts");
      try { await access(fileURLToPath(url)); return { url: url.href, shortCircuit: true }; } catch {}
    }
    if (target) return { url: target.href, shortCircuit: true };
    return next(specifier, context);
  }`;
register(`data:text/javascript,${encodeURIComponent(hook)}`, pathToFileURL("./"));

const { searchSymptoms, buildSearchIndex } = await import("../lib/symptomSearch.ts");
const { getBodyMap } = await import("../content/bodyMap.ts");
const { getRegions } = await import("../content/anatomy.ts");

/** [locale, query, expected first target (or null = no suggestion), optional: must be among the 5] */
const cases = [
  ["en", "knee", "knie"],
  ["en", "knie", "knie"],
  ["en", "kne", "knie"],
  ["en", "Knee pain when climbing stairs", "knie"],
  ["en", "stairs", "knie"],
  ["en", "back pian", "ruecken"],
  ["en", "lower back", "ruecken"],
  ["en", "Lower back pain…", "ruecken"],
  ["en", "upper back", "oben"],
  ["en", "sholder", "schulter"],
  ["en", "shoulder blade", "oben"],
  ["en", "hair loss", "haut"],
  ["en", "hair lo", "haut"],
  ["en", "skin rash", "haut"],
  ["en", "rash", "haut"],
  ["en", "mole", "hautkrebs"],
  ["en", "lab tests", "labor"],
  ["en", "blood test", "labor"],
  ["en", "women's health", "gyne"],
  ["en", "menopause", "wechseljahre"],
  ["en", "heel", "ferse"],
  ["en", "achilles", "ferse"],
  ["en", "wrist", "hand"],
  ["en", "thigh", "thigh"],
  ["en", "calf cramp", "lowerLeg"],
  ["en", "botox", "aesthetik"],
  ["en", "kn", "knie", true],
  ["en", "pain", null],
  ["en", "xyzzy", null],
  ["de", "Knie", "knie"],
  ["de", "knie treppe", "knie"],
  ["de", "Treppensteigen", "knie"],
  ["de", "Rücken", "ruecken"],
  ["de", "ruecken", "ruecken"],
  ["de", "unterer Rücken", "ruecken"],
  ["de", "Schulter", "schulter"],
  ["de", "Schultr", "schulter"],
  ["de", "Haarausfall", "haut"],
  ["de", "Hautausschlag", "haut"],
  ["de", "Haut", "haut"],
  ["de", "Laborwerte", "labor"],
  ["de", "Blutbild", "labor"],
  ["de", "Frauengesundheit", "gyne"],
  ["de", "Wechseljahre", "wechseljahre"],
  ["de", "Ferse", "ferse"],
  ["de", "Handgelenk", "hand"],
  ["de", "Oberschenkel", "thigh"],
  ["de", "Wade", "lowerLeg"],
  ["de", "Muttermal", "hautkrebs"],
  ["de", "Schmerzen", null],
  // Injuries: Orthopedics view first, Physiotherapy second; phrase-only matches dropped
  ["en", "fell on my upper back", "oben", false, "ortho", ["oben:ortho", "oben:physio"]],
  ["de", "bin auf der Treppe gestürzt, Knie tut weh", "knie", false, "ortho", ["knie:ortho", "knie:physio"]],
  ["en", "knee pain climbing stairs", "knie", false, "ortho"],
  ["en", "upper back", "oben", false, "physio"],
  ["en", "fell on my upper back", "oben", false, null, null, ["hand", "thigh"]],
  // No duplicate area + department (every case is checked; these are the foot ones)
  ["en", "foot", "fuss"],
  ["en", "ankle", "fuss"],
  ["de", "Fuß", "fuss"],
  ["de", "Sprunggelenk", "fuss"],
  ["en", "fell on my foot", "fuss", false, "ortho", ["fuss:ortho", "fuss:physio"]],
];

let failed = 0;
for (const [locale, query, expected, anywhere, dept, order, absent] of cases) {
  const index = buildSearchIndex(getBodyMap(locale).zones, getRegions(locale));
  const hits = searchSymptoms(index, query);
  const got = hits.map((h) => `${h.target}:${h.dept}`);
  const targets = hits.map((h) => h.target);
  let ok =
    expected === null
      ? got.length === 0
      : anywhere
        ? targets.includes(expected)
        : targets[0] === expected;
  if (dept && hits[0]?.dept !== dept) ok = false;
  if (order && order.some((o, i) => got[i] !== o)) ok = false;
  if (absent && absent.some((t) => targets.includes(t))) ok = false;
  if (new Set(got).size !== got.length) ok = false; // duplicate area + department
  if (!ok) failed++;
  if (hits.length > 5) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} [${locale}] "${query}" → ${got.join(", ") || "–"}${ok ? "" : `  (expected ${expected}${dept ? " " + dept : ""})`}`);
}
console.log(`\n${cases.length - failed}/${cases.length} passed`);
process.exit(failed ? 1 : 0);
