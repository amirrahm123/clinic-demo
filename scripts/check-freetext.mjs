// Runs the body-map free-text matcher against a fixed list of phrases and checks the
// routing result (zone / department / red flag). Exits 1 if any case fails.
// Usage: node scripts/check-freetext.mjs   (Node 22.6+ – runs the TS source directly)
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

const { matchFreeText } = await import("../lib/freeTextMatch.ts");
const { zoneMeta } = await import("../content/bodyMap.ts");

/** [phrase, expected] – expected: { zone? (zone or region id), only?, note?, dept?, deptOfZone?, redFlag?, none? } */
const cases = [
  // Routing (round 6, part "Something else?")
  ["i have back pain", { zone: "ruecken" }],
  ["Schmerzen im Knie", { zone: "knie" }],
  ["knee hurts on stairs", { zone: "knie" }],
  ["seit zwei Wochen Rückenschmerzen mit Kribbeln", { zone: "ruecken" }],
  ["my shoulder clicks when I lift my arm", { zone: "schulter" }],
  ["Nackenverspannung vom Bildschirm", { zone: "nacken" }],
  ["Hüfte und Leiste tun weh", { zone: "huefte" }],
  ["umgeknickt, Sprunggelenk geschwollen", { zone: "fuss", injury: true }],
  ["heel pain in the morning, achilles", { zone: "ferse" }],
  ["Tennisarm seit dem Umzug", { zone: "ellenbogen" }],
  ["Handgelenk schmerzt beim Greifen", { zone: "hand" }],
  ["zwischen den Schulterblättern", { zone: "oben" }],
  ["itchy rash on my arms", { zone: "haut" }],
  ["a mole has changed colour", { zone: "hautkrebs" }],
  ["Hitzewallungen und Schlafprobleme", { zone: "wechseljahre" }],
  ["Urinverlust beim Niesen", { zone: "beckenboden" }],
  ["Falten und Lippen", { zone: "aesthetik" }],
  ["Müdigkeit und Blutwerte checken", { zone: "labor" }],
  ["Tattoo entfernen lassen", { zone: "dermalaser" }],
  // Anatomy dictionary: body parts not on the figure (hidden regions), fuzzy, headache
  ["problem with my hamstring", { zone: "thigh" }],
  ["Bizeps tut weh", { zone: "upperArm" }],
  ["triceps pain", { zone: "upperArm" }],
  ["Wadenkrampf", { zone: "lowerLeg" }],
  ["hamstrng", { zone: "thigh" }],
  ["Schultr", { zone: "schulter" }],
  ["headache", { zone: "nacken", note: "headache" }],
  ["plötzlicher stärkster Kopfschmerz", { redFlag: true }],
  ["Kopfschmerzen mit Fieber und steifem Nacken", { redFlag: true }],
  ["Schmerzen in der Leiste", { zone: "huefte" }],
  ["itchy rash", { zone: "haut", deptOfZone: "derma" }],
  ["Kiefer knackt beim Kauen", { zone: "nacken", note: "jaw" }],
  ["Rippen tun weh beim Atmen", { zone: "oben" }],
  ["beim Tippen tut mein Handgelenk weh", { zone: "hand", only: true }],
  // Symptom words alone → Ortho / Physio
  ["Zerrung beim Sport", { dept: "ortho" }],
  // Department-only
  ["Physiotherapie nach der OP", { dept: "physio" }],
  // No match
  ["lorem ipsum dolor", { none: true }],
  // Prefix false positives: a body word at the start of another word is not a hit
  ["background", { none: true }],
  ["backpack", { none: true }],
  ["kneel", { none: true }],
  ["my background is in sports", { none: true }],
  // Red flags (always flagged, whatever else matches)
  ["Falten und Lippen und Atemnot", { zone: "aesthetik", redFlag: true }],
  ["chest pain and shortness of breath", { redFlag: true }],
  // Injuries: Orthopedics view first, emergency only with a serious modifier
  ["fell on my upper back", { zone: "oben", injury: true }],
  ["bin auf der Treppe gestürzt, Knie tut weh", { zone: "knie", injury: true }],
  ["fell and hit my head, dizzy", { redFlag: true, injury: true }],
  ["knee pain climbing stairs", { zone: "knie" }],
  ["fell on my upper back, cannot move my arm", { zone: "oben", injury: true, redFlag: true }],
];

let failed = 0;
for (const [phrase, expected] of cases) {
  const r = matchFreeText(phrase);
  const problems = [];
  if (expected.zone && r.targets[0] !== expected.zone)
    problems.push(`target ${r.targets.join("+") || "–"} (expected ${expected.zone})`);
  if (expected.only && r.targets.length !== 1) problems.push(`expected a single target, got ${r.targets.join("+")}`);
  if (expected.note && r.note !== expected.note) problems.push(`note ${r.note ?? "–"} (expected ${expected.note})`);
  if (expected.deptOfZone && zoneMeta[r.targets[0]]?.dept !== expected.deptOfZone)
    problems.push(`zone department ${zoneMeta[r.targets[0]]?.dept} (expected ${expected.deptOfZone})`);
  if (expected.dept && (r.targets.length || r.departments[0] !== expected.dept))
    problems.push(`dept ${r.departments.join("+") || "–"} targets ${r.targets.join("+") || "–"} (expected dept ${expected.dept})`);
  if (expected.none && (r.targets.length || r.departments.length))
    problems.push(`matched ${[...r.targets, ...r.departments].join("+")} (expected nothing)`);
  if (expected.redFlag && !r.redFlag) problems.push("no red flag");
  if (!expected.redFlag && r.redFlag) problems.push("unexpected red flag");
  if (expected.injury && !r.injury) problems.push("injury not detected");
  if (!expected.injury && r.injury) problems.push("unexpected injury");
  const ok = problems.length === 0;
  if (!ok) failed++;
  const got = r.targets.length ? `target ${r.targets.join("+")}` : r.departments.length ? `dept ${r.departments.join("+")}` : "no match";
  console.log(`${ok ? "✓" : "✗"} ${JSON.stringify(phrase).padEnd(50)} → ${got}${r.note ? ` (note: ${r.note})` : ""}${r.redFlag ? " + 112" : ""}${ok ? "" : "   " + problems.join("; ")}`);
}
console.log(failed ? `\n${failed} case(s) failed` : `\nAll ${cases.length} cases pass.`);
process.exit(failed ? 1 : 0);
