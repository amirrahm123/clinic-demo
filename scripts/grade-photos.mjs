// One subtle grade for every practice / department / journey photo and a uniform 4:5 crop
// (eyes at ~38 % from the top) plus white-balance / exposure normalisation for the doctor
// portraits. Reads assets/photos-original/<path>, writes public/images/<path>.
// Usage: node scripts/grade-photos.mjs [--sheet <contact-sheet.png>]
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("assets/photos-original");
const OUT = path.resolve("public/images");

// Photos: slight warm white balance, −8 % saturation, gentle contrast, consistent sharpening.
// `scale` upsamples small sources (lanczos3) so the 2× renditions stay crisp.
const photos = [
  { file: "departments/ortho.jpg" },
  { file: "departments/physio.jpg" },
  { file: "departments/derma.jpg" },
  { file: "departments/aesthetic.jpg" },
  { file: "departments/gyne.jpg" },
  { file: "departments/labor.jpg" },
  { file: "practice/hero.jpg", scale: 2 },
  { file: "practice/behandlung.jpg" },
  { file: "practice/hautscreening.jpg" },
  { file: "practice/kurse.jpg" },
  { file: "practice/labor-raum.jpg" },
  { file: "practice/empfang.png", scale: 2 },
  { file: "practice/flur.jpg" },
  { file: "practice/praxis.jpg" },
];

// Portraits: eyeY / faceX are the eye line and face centre as fractions of the (square)
// source, read off the photos. The 4:5 crop takes 80 % of the height and places the
// eyes at 38 % from the top; nothing but white balance and exposure touches the colours.
const portraits = [
  { file: "doctors/filesch.jpg", eyeY: 0.31, faceX: 0.5 },
  { file: "doctors/berger.jpg", eyeY: 0.36, faceX: 0.5 },
  { file: "doctors/manos.jpg", eyeY: 0.35, faceX: 0.5 },
  { file: "doctors/heine.jpg", eyeY: 0.35, faceX: 0.46 },
  { file: "doctors/horvath.jpg", eyeY: 0.31, faceX: 0.44 },
  { file: "doctors/evenschor.jpg", eyeY: 0.34, faceX: 0.5 },
  { file: "doctors/trey.png", eyeY: 0.33, faceX: 0.48 },
  { file: "doctors/matz.jpg", eyeY: 0.33, faceX: 0.5 },
];

const EYE_LINE = 0.38;
const CROP_H = 0.8;
const PORTRAIT_W = 640;
const PORTRAIT_H = 800;
const TARGET_MEAN = 188; // portrait exposure target (0–255) = median of the sources
const IVORY = [241, 236, 228]; // soft ivory background tint
const IVORY_MIX = 0.55;

const WARM = [
  [1.03, 0, 0],
  [0, 1, 0],
  [0, 0, 0.965],
];

const write = async (img, target) => {
  await mkdir(path.dirname(target), { recursive: true });
  if (target.endsWith(".png")) await img.png({ compressionLevel: 9, palette: false }).toFile(target);
  else await img.jpeg({ quality: 86, mozjpeg: true }).toFile(target);
};

/** Blend plain light-grey background pixels toward ivory (skin and clothes keep their tone). */
async function tintBackground(img) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    // plain = desaturated and bright; smooth ramps avoid hard edges
    const sat = Math.max(0, 1 - (max - min) / 22);
    const bright = Math.min(1, Math.max(0, (lum - 150) / 40));
    const w = IVORY_MIX * sat * bright;
    if (w <= 0) continue;
    data[o] = Math.round(r + (IVORY[0] - r) * w * (r / 255));
    data[o + 1] = Math.round(g + (IVORY[1] - g) * w * (g / 255));
    data[o + 2] = Math.round(b + (IVORY[2] - b) * w * (b / 255));
  }
  return sharp(data, { raw: { width, height, channels } });
}

const results = [];

for (const { file, scale } of photos) {
  const src = path.join(SRC, file);
  let img = sharp(src);
  if (scale) {
    const m = await img.metadata();
    img = img.resize({ width: Math.round(m.width * scale), kernel: "lanczos3" });
  }
  img = img
    .recomb(WARM)
    .modulate({ saturation: 0.92 })
    .linear(1.07, -9)
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.3 });
  await write(img, path.join(OUT, file));
  results.push(file);
  console.log("graded", file);
}

for (const { file, eyeY, faceX } of portraits) {
  const src = path.join(SRC, file);
  const meta = await sharp(src).metadata();
  const S = Math.min(meta.width, meta.height);
  const h = Math.round(S * CROP_H);
  const w = Math.round(h * (PORTRAIT_W / PORTRAIT_H));
  const top = Math.min(meta.height - h, Math.max(0, Math.round((eyeY - EYE_LINE * CROP_H) * meta.height)));
  const left = Math.min(meta.width - w, Math.max(0, Math.round(faceX * meta.width - w / 2)));
  // Exposure: scale toward a common mean, at most ±10 %
  const stats = await sharp(src).stats();
  const mean = stats.channels.slice(0, 3).reduce((s, c) => s + c.mean, 0) / 3;
  const k = Math.min(1.1, Math.max(0.9, TARGET_MEAN / mean));
  let img = sharp(src)
    .extract({ left, top, width: w, height: h })
    .resize(PORTRAIT_W, PORTRAIT_H, { kernel: "lanczos3" })
    .recomb(WARM)
    .linear(k, 0)
    .removeAlpha();
  img = await tintBackground(img);
  img = img.sharpen({ sigma: 0.7, m1: 0.4, m2: 0.2 });
  await write(img, path.join(OUT, file));
  results.push(file);
  console.log(`portrait ${file}: crop ${w}×${h} @ ${left},${top}, exposure ×${k.toFixed(2)}`);
}

// Optional before/after contact sheet
const sheetIndex = process.argv.indexOf("--sheet");
if (sheetIndex > -1) {
  const sheetPath = process.argv[sheetIndex + 1];
  const TH = 200;
  const TW = 200;
  const PAD = 12;
  const LABEL = 22;
  const perRow = 3;
  const cell = TW * 2 + PAD * 3;
  const rowH = TH + LABEL + PAD * 2;
  const rows = Math.ceil(results.length / perRow);
  const composites = [];
  for (const [i, file] of results.entries()) {
    const x = (i % perRow) * cell + PAD;
    const y = Math.floor(i / perRow) * rowH + PAD + LABEL;
    const before = await sharp(path.join(SRC, file)).resize(TW, TH, { fit: "cover" }).toBuffer();
    const after = await sharp(path.join(OUT, file)).resize(TW, TH, { fit: "cover" }).toBuffer();
    composites.push({ input: before, left: x, top: y }, { input: after, left: x + TW + PAD, top: y });
    const label = Buffer.from(
      `<svg width="${cell}" height="${LABEL}"><text x="0" y="16" font-family="Arial" font-size="13" fill="#1d2530">${file}  —  before | after</text></svg>`,
    );
    composites.push({ input: label, left: x, top: y - LABEL });
  }
  await sharp({
    create: { width: perRow * cell + PAD, height: rows * rowH + PAD, channels: 3, background: "#ffffff" },
  })
    .composite(composites)
    .png()
    .toFile(sheetPath);
  console.log("contact sheet:", sheetPath);
}
