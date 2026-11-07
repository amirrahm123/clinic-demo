// Scans the built HTML of "/" (English) and "/de" (German) for words of the other
// language. Elements with an explicit `lang` attribute of the other language
// (e.g. the English "International Patients" card on the German page) are skipped.
// Usage: pnpm build && node scripts/check-locale-strings.mjs
import { readFileSync } from "node:fs";

const pages = [
  {
    file: ".next/server/app/index.html",
    locale: "en",
    forbidden: [
      "und",
      "Termin",
      "Ihr",
      "Ihre",
      "der",
      "die",
      "das",
      "Sie",
      "buchen",
      "Fachbereiche",
      "wir",
      "nicht",
      "oder",
      "für",
      "mit",
    ],
  },
  {
    file: ".next/server/app/de.html",
    locale: "de",
    forbidden: [
      "the",
      "your",
      "book",
      "and",
      "with",
      "our",
      "for",
      "appointment",
      "skin",
      "pain",
      "we",
      "you",
    ],
  },
];

/** Remove whole elements whose opening tag carries lang="xx" with xx ≠ locale. */
function stripForeignLangBlocks(html, locale) {
  const tagRe = /<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g;
  let out = "";
  let last = 0;
  let depth = 0; // >0 while inside a foreign-language element
  let m;
  while ((m = tagRe.exec(html))) {
    const [full, slash, name, attrs] = m;
    const isVoid = /^(br|img|input|meta|link|hr|source|path|circle|rect|ellipse|use)$/i.test(name);
    if (depth === 0) {
      out += html.slice(last, m.index);
      const lang = /\slang="([a-z]{2})"/i.exec(attrs)?.[1];
      if (!slash && lang && lang !== locale && !isVoid) {
        depth = 1;
      } else {
        out += full;
      }
    } else if (!isVoid && !/\/\s*>$/.test(full)) {
      depth += slash ? -1 : 1;
    }
    last = m.index + full.length;
  }
  out += html.slice(last);
  return out;
}

let failed = false;
for (const page of pages) {
  const raw = readFileSync(page.file, "utf8");
  const visible = stripForeignLangBlocks(raw, page.locale)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&");
  const hits = [];
  for (const word of page.forbidden) {
    const re = new RegExp(`(^|[^\\p{L}])${word}(?=$|[^\\p{L}])`, "gu");
    const found = visible.match(re);
    if (found) hits.push(`${word}×${found.length}`);
  }
  if (hits.length) {
    failed = true;
    console.log(`✗ ${page.file} (${page.locale}) contains: ${hits.join(", ")}`);
    for (const word of page.forbidden) {
      const re = new RegExp(`.{0,40}(^|[^\\p{L}])${word}(?=$|[^\\p{L}]).{0,40}`, "gu");
      for (const ctx of visible.match(re) ?? [])
        console.log("   …" + ctx.replace(/\s+/g, " ") + "…");
    }
  } else {
    console.log(`✓ ${page.file} (${page.locale}): no foreign-language words found`);
  }
}
process.exit(failed ? 1 : 0);
