// Dedicated mobile crop of the hero photo (LCP on phones). The desktop hero goes through
// next/image from the 2× upsampled practice/hero.jpg; on phones that meant serving
// upsampled pixels at 640–1080px. Here the 4:5 crop (object-position 50% 30%, as in
// Hero.tsx) is cut from the ORIGINAL 673×948 photo – never enlarged – with the same grade
// as grade-photos.mjs, and written as AVIF + WebP at 400/608/673 px (1.3×/2×/2.2× of the
// 304px arch). Usage: node scripts/hero-mobile.mjs
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("assets/photos-original/practice/hero.jpg");
const OUT = path.resolve("public/images/practice");
const ASPECT = 4 / 5;
const POSITION_Y = 0.3; // CSS object-position 50% 30%
const WIDTHS = [400, 608, 673];
const AVIF_QUALITY = Number(process.env.AVIF_Q ?? 52);
const WEBP_QUALITY = 78;

const WARM = [
  [1.03, 0, 0],
  [0, 1, 0],
  [0, 0, 0.965],
];

const meta = await sharp(SRC).metadata();
const cropW = Math.min(meta.width, Math.floor(meta.height * ASPECT));
const cropH = Math.floor(cropW / ASPECT);
const left = Math.floor((meta.width - cropW) / 2);
const top = Math.floor((meta.height - cropH) * POSITION_Y);
await mkdir(OUT, { recursive: true });

for (const w of WIDTHS) {
  if (w > cropW) throw new Error(`rendition ${w}px would upsample the ${cropW}px crop`);
  const img = sharp(SRC)
    .extract({ left, top, width: cropW, height: cropH })
    .resize({ width: w, kernel: "lanczos3" })
    .recomb(WARM)
    .modulate({ saturation: 0.92 })
    .linear(1.07, -9)
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.3 });
  const avif = await img.clone().avif({ quality: AVIF_QUALITY, effort: 7 }).toFile(path.join(OUT, `hero-mobile-${w}.avif`));
  const webp = await img.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(path.join(OUT, `hero-mobile-${w}.webp`));
  console.log(`hero-mobile-${w}: ${avif.width}×${avif.height} avif ${(avif.size / 1024).toFixed(1)} KB, webp ${(webp.size / 1024).toFixed(1)} KB`);
}
console.log(`crop ${cropW}×${cropH} @ ${left},${top} from ${meta.width}×${meta.height}`);
