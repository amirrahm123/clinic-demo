"use client";

import Image, { type ImageProps, type StaticImageData } from "next/image";
import { useState, type CSSProperties } from "react";

/** Art-directed rendition for one media query (see Hero.tsx: the mobile hero crop) */
export type PhotoSource = {
  media: string;
  sizes: string;
  /** srcset strings per format; the browser takes the first type it supports */
  avif: string;
  webp: string;
};

type PhotoProps = Omit<
  ImageProps,
  "src" | "placeholder" | "blurDataURL" | "fill" | "width" | "height"
> & {
  /** Static import → width/height and the build-time blurDataURL come for free */
  src: StaticImageData;
  /** CSS object-position, applied to the photo and the blur layer alike */
  position?: string;
  /**
   * Pre-built renditions that replace `src` where `media` matches (a <picture>
   * source in front of next/image). Pass `loading="eager"` + `fetchPriority`
   * instead of `priority` with this, or next/image preloads `src` everywhere.
   */
  source?: PhotoSource;
};

/**
 * next/image (fill) with a build-time blur placeholder that fades out over
 * 300ms once the photo has loaded – only where `src` still carries its
 * blurDataURL (the hero; see lib/photo.ts noBlur for everything else). The blur layer sits *on top* of the image,
 * so the real photo paints (and counts for LCP) the moment it arrives – even
 * before hydration. A CSS safety animation removes the layer after 6s in case
 * the load event is ever missed.
 */
export function Photo({ src, alt, position, style, source, ...rest }: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const done = () => setLoaded(true);
  const img = (
    <Image
      {...rest}
      src={src}
      alt={alt}
      fill
      placeholder="empty"
      style={position ? { objectPosition: position, ...style } : style}
      // Already complete before hydration (cache / fast network)
      ref={(img) => {
        if (img?.complete && img.naturalWidth > 0) done();
      }}
      onLoad={done}
    />
  );
  return (
    <>
      {source ? (
        <picture className="contents">
          <source media={source.media} type="image/avif" srcSet={source.avif} sizes={source.sizes} />
          <source media={source.media} type="image/webp" srcSet={source.webp} sizes={source.sizes} />
          {img}
        </picture>
      ) : (
        img
      )}
      {src.blurDataURL ? (
        <span
          aria-hidden="true"
          className="photo-blur"
          data-loaded={loaded || undefined}
          style={
            {
              backgroundImage: `url(${src.blurDataURL})`,
              backgroundPosition: position,
            } as CSSProperties
          }
        />
      ) : null}
    </>
  );
}
