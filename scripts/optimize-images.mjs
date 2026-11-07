// One-off helper: takes the raw downloads from roc.de (see README) and writes
// optimized copies into public/images. Usage: node scripts/optimize-images.mjs <sourceDir>
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Usage: node scripts/optimize-images.mjs <sourceDir>");
const out = path.resolve("public/images");

// [source, target, max long edge]
// Revision 2 (treatment photos picked from the department pages). Circular PNGs are
// cropped to the largest rectangle inscribed in the circle (see `inscribe`).
// [source, target, max long edge, inscribe aspect | null]
const picks = [
  ["cand/ortho-stosswelle.jpg", "departments/ortho.jpg", 1600, null],
  ["cand/physio-training.png", "departments/physio.jpg", 1600, [16, 10]],
  ["cand/derma-hautscreening.png", "departments/derma.jpg", 1600, [16, 10]],
  ["cand/x-ViTAL_headerbild_4.jpg", "departments/aesthetic.jpg", 1600, null],
  ["cand/gyne-matz.jpg", "departments/gyne.jpg", 1600, null],
  ["cand/x-Jasna-Vizintin_ROC-edited.jpg", "departments/labor.jpg", 1600, null],
  ["cand/physio-behandlung.png", "practice/hero.jpg", 1600, [44, 62]],
  ["cand/x-ViTAL_headerbild_4.jpg", "practice/behandlung.jpg", 2000, null],
  ["cand/derma-hautscreening.png", "practice/hautscreening.jpg", 1600, [3, 4]],
  ["cand/physio-kurse.png", "practice/kurse.jpg", 1600, null],
];

const jobs = [
  ["doctors/filesch.jpg", "doctors/filesch.jpg", 1200],
  ["doctors/berger.jpg", "doctors/berger.jpg", 1200],
  ["doctors/manos.jpg", "doctors/manos.jpg", 1200],
  ["doctors/heine.jpg", "doctors/heine.jpg", 1200],
  ["doctors/horvath.jpg", "doctors/horvath.jpg", 1200],
  ["doctors/evenschor.jpg", "doctors/evenschor.jpg", 1200],
  ["doctors/trey.png", "doctors/trey.png", 1200],
  ["doctors/matz.jpg", "doctors/matz.jpg", 1200],
  ["practice/flur-full.jpg", "practice/flur.jpg", 2400],
  ["practice/praxis.jpg", "practice/praxis.jpg", 2400],
  ["practice/empfang.png", "practice/empfang.png", 2400],
  ["practice/wirbelsaeulenscan.png", "practice/wirbelsaeulenscan.png", 2400],
  ["practice/experten.png", "practice/experten.png", 2400],
  ["practice/beratung.png", "practice/beratung.png", 2400],
  ["practice/technik.png", "practice/technik.png", 2400],
  ["international.jpg", "international.jpg", 2400],
  ["departments/ortho-src.jpg", "departments/ortho.jpg", 1600],
  ["departments/physio-src.jpg", "departments/physio.jpg", 1600],
  ["departments/derma-src.jpg", "departments/derma.jpg", 1600],
  ["departments/aesthetic-src.jpg", "departments/aesthetic.jpg", 1600],
  ["departments/gyne2-src.jpg", "departments/gyne.jpg", 1600],
  ["departments/labor-src.jpg", "departments/labor.jpg", 1600],
];

for (const [from, to, max, inscribe] of [...jobs, ...picks]) {
  const target = path.join(out, to);
  await mkdir(path.dirname(target), { recursive: true });
  let img = sharp(path.join(src, from));
  if (inscribe) {
    const m = await img.metadata();
    const r = (Math.min(m.width, m.height) / 2) * 0.985;
    const a = inscribe[0] / inscribe[1];
    const w = Math.floor((2 * r * a) / Math.sqrt(1 + a * a));
    const h = Math.floor(w / a);
    img = img
      .extract({
        left: Math.floor(m.width / 2 - w / 2),
        top: Math.floor(m.height / 2 - h / 2),
        width: w,
        height: h,
      })
      .flatten({ background: "#f6f3ee" });
  }
  img = img.resize({
    width: max,
    height: max,
    fit: "inside",
    withoutEnlargement: true,
  });
  if (to.endsWith(".png")) await img.png({ compressionLevel: 9, palette: false }).toFile(target);
  else await img.jpeg({ quality: 86, mozjpeg: true }).toFile(target);
  console.log("wrote", to);
}
