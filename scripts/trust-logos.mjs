// Monochrome navy versions of the membership logos for the trust strip. Sources in
// assets/logos-original/:
//  - blaek-hoheitsform.svg: the official vector mark (blaek.de) → recoloured navy SVG,
//    sharp at any size (blaek-navy.svg)
//  - iroc-white.png: white-on-transparent → alpha kept, pixels navy, padding trimmed
//  - wip-128.png: the official colour logo (worldinstituteofpain.org, 128px – the largest
//    published) → darkness becomes alpha, padding trimmed (109px tall)
// Usage: node scripts/trust-logos.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const NAVY = { r: 0, g: 45, b: 85 };
const src = path.resolve("assets/logos-original");
const out = path.resolve("public/images/trust");

const navyWithAlpha = async (alpha, width, height, target) => {
  // transparent padding trimmed, so every mark fills its display height
  const info = await sharp(
    await sharp({ create: { width, height, channels: 3, background: NAVY } })
      .joinChannel(alpha, { raw: { width, height, channels: 1 } })
      .png()
      .toBuffer(),
  )
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(target);
  console.log("wrote", path.basename(target), `${info.width}×${info.height}`);
};

{
  const svg = await readFile(path.join(src, "blaek-hoheitsform.svg"), "utf8");
  await writeFile(path.join(out, "blaek-navy.svg"), svg.replace(/#0f7dc8/gi, "#002d55"));
  console.log("wrote blaek-navy.svg (vector)");
}

for (const name of ["iroc"]) {
  const file = path.join(src, `${name}-white.png`);
  const { width, height } = await sharp(file).metadata();
  // The white source carries a soft alpha that tops out well below 255: stretch it so the
  // solid strokes print full navy like the other marks (anti-aliased edges kept)
  const raw = await sharp(file).ensureAlpha().extractChannel(3).raw().toBuffer();
  const max = raw.reduce((m, v) => Math.max(m, v), 1);
  const alpha = Buffer.from(raw.map((v) => Math.min(255, Math.round((v * 255) / max))));
  await navyWithAlpha(alpha, width, height, path.join(out, `${name}-navy.png`));
}

{
  const file = path.join(src, "wip-128.png");
  const { width, height } = await sharp(file).metadata();
  // darkness × original alpha → alpha (white grid and letters stay see-through)
  const { data } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    alpha[i] = Math.round(Math.min(1, (1 - lum) * 1.5) * (a / 255) * 255);
  }
  await navyWithAlpha(alpha, width, height, path.join(out, "wip-navy.png"));
}
