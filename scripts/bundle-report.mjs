// Homepage JavaScript budget: lists every script the built / page loads (from the
// prerendered HTML) with its gzip size. Usage: node scripts/bundle-report.mjs  (after `next build`)
import { readFileSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";

const html = readFileSync(".next/server/app/index.html", "utf8");
// nomodule = the polyfill bundle, never downloaded by a modern browser
const srcs = [...html.matchAll(/<script src="([^"]+\.js)"(?![^>]*nomodule)[^>]*>/gi)].map((m) => m[1]);
const preloads = [...html.matchAll(/<link rel="preload" as="script" [^>]*href="([^"]+)"/g)].map((m) => m[1]);
let total = 0;
const rows = [];
for (const src of new Set([...srcs, ...preloads])) {
  const file = ".next" + src.replace(/^\/_next/, "").split("?")[0];
  if (!existsSync(file)) continue;
  const gz = gzipSync(readFileSync(file)).length;
  total += gz;
  rows.push([src.split("/").pop(), gz]);
}
rows.sort((a, b) => b[1] - a[1]);
for (const [name, gz] of rows) console.log(String((gz / 1024).toFixed(1)).padStart(7), "KB  ", name);
console.log("-------\n" + (total / 1024).toFixed(1) + " KB gzip JS on / (" + rows.length + " files)");
