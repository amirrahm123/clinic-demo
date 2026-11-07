// One-off helper (round 5): small source photos from roc.de / roc-gyne.de → 4:3 crops,
// upscaled ≤ 2× with lanczos3 plus light sharpening. Usage:
//   node scripts/upscale-photos.mjs <sourceDir>
// Sources (see README → TODO(client)):
//   roc-gyne_praxis_gynaekologie_ultraschall_aschheim-1-edited.jpg  (484×484)
//   Labor-Landingpage-1.jpg (580×640) · Labor-Landingpage-2.jpg (580×640)
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Usage: node scripts/upscale-photos.mjs <sourceDir>");
const out = path.resolve("public/images");

/** [source, target, crop {left, top, width, height} in source px, scale] */
const jobs = [
  // Ultrasound device: square → 4:3, keep the console (lower two thirds)
  [
    "roc-gyne_praxis_gynaekologie_ultraschall_aschheim-1-edited.jpg",
    "departments/gyne.jpg",
    { left: 0, top: 90, width: 484, height: 363 },
    2,
  ],
  // Lab team with syringe: 4:3 around the faces/hands
  [
    "Labor-Landingpage-1.jpg",
    "departments/labor.jpg",
    { left: 0, top: 30, width: 580, height: 435 },
    2,
  ],
  // Lab room (door "LABOR"): full frame for the Journey step (object-fit covers the crop)
  ["Labor-Landingpage-2.jpg", "practice/labor-raum.jpg", null, 2],
];

for (const [from, to, crop, scale] of jobs) {
  let img = sharp(path.join(src, from));
  if (crop) img = img.extract(crop);
  const meta = await img.toBuffer({ resolveWithObject: true });
  const w = Math.round(meta.info.width * scale);
  await sharp(meta.data)
    .resize({ width: w, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.4 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(out, to));
  const done = await sharp(path.join(out, to)).metadata();
  console.log(`${to}: ${done.width}×${done.height}`);
}
