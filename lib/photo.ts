import type { StaticImageData } from "next/image";

/**
 * Static image import without its build-time blur placeholder. Every blurDataURL
 * (≈1 KB of base64) is inlined twice per use – in the HTML and again in the RSC
 * payload – which added ~30 KB gzip to the homepage before the hero could paint.
 * Below-the-fold photos sit on a sand background instead; the hero keeps its blur
 * (Photo.tsx shows the blur layer only when the data is present).
 */
export const noBlur = (img: StaticImageData): StaticImageData => ({
  src: img.src,
  width: img.width,
  height: img.height,
});
