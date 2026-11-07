// Lists every body-map zone/topic and confirms each has exactly one question with
// exactly three answers (each with three causes and a "why"), in both locales.
// Usage: node scripts/check-bodymap.mjs   (Node 22.6+ – runs the TS content directly)
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// The content files import each other without extensions ("./bodyMap.de"); Node's
// ESM loader needs them, so this tiny resolve hook appends ".ts" where required.
const hook = `
  import { access } from "node:fs/promises";
  import { fileURLToPath } from "node:url";
  export async function resolve(specifier, context, next) {
    if (specifier.startsWith(".") && !/\\.(ts|js|mjs|json)$/i.test(specifier) && context.parentURL) {
      const url = new URL(specifier + ".ts", context.parentURL);
      try { await access(fileURLToPath(url)); return { url: url.href, shortCircuit: true }; } catch {}
    }
    return next(specifier, context);
  }`;
register(`data:text/javascript,${encodeURIComponent(hook)}`, pathToFileURL("./"));

const { getBodyMap, zoneOrder, zoneMeta } = await import("../content/bodyMap.ts");

let errors = 0;
const fail = (msg) => {
  errors++;
  console.log(`  ✗ ${msg}`);
};

for (const locale of ["de", "en"]) {
  const map = getBodyMap(locale);
  console.log(`\n${locale.toUpperCase()} – ${zoneOrder.length} zones/topics`);
  for (const id of zoneOrder) {
    const zone = map.zones[id];
    const q = zone?.question;
    const kind = zoneMeta[id].kind === "spot" ? "zone " : "topic";
    if (!q || typeof q.text !== "string" || !q.text.trim()) {
      fail(`${kind} ${id}: no question`);
      continue;
    }
    const n = Array.isArray(q.options) ? q.options.length : 0;
    if (n !== 3) fail(`${kind} ${id}: ${n} answers (expected 3)`);
    q.options?.forEach((o, i) => {
      if (!o.label?.trim()) fail(`${kind} ${id}: answer ${i + 1} has no label`);
      if (!Array.isArray(o.causes) || o.causes.length !== 3)
        fail(`${kind} ${id}: answer ${i + 1} has ${o.causes?.length ?? 0} causes (expected 3)`);
      if (!o.why?.trim()) fail(`${kind} ${id}: answer ${i + 1} has no "why"`);
    });
    const labels = q.options.map((o) => o.label).join(" · ");
    console.log(`  ✓ ${kind} ${id.padEnd(12)} ${q.text}  →  ${labels}`);
  }
  const missing = Object.keys(zoneMeta).filter((id) => !zoneOrder.includes(id));
  if (missing.length) fail(`zones not in zoneOrder: ${missing.join(", ")}`);
}

console.log(errors ? `\n${errors} problem(s) found` : "\nAll zones and topics have one question with three answers.");
process.exit(errors ? 1 : 0);
