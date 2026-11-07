import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import heroImg from "@/public/images/practice/hero.jpg";
import { getDict, type Locale } from "@/content/i18n";
import { heroChips } from "@/content/site";
import { Calendar, Search } from "./icons";
import { Photo } from "./Photo";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The hero photo is the mobile LCP element. Phones get a dedicated 4:5 crop cut from the
 * original photo (never upsampled, AVIF/WebP, scripts/hero-mobile.mjs) at 1.3×/2×/2.2× of
 * the 304px arch; desktop keeps next/image from the 2× master. Both are preloaded behind
 * media queries so each viewport downloads exactly one rendition.
 */
const MOBILE_MEDIA = "(max-width: 1023px)";
const DESKTOP_MEDIA = "(min-width: 1024px)";
const MOBILE_SIZES = "304px";
const DESKTOP_SIZES = "50vw";
const mobileSet = (ext: "avif" | "webp") =>
  [400, 608, 673].map((w) => `/images/practice/hero-mobile-${w}.${ext} ${w}w`).join(", ");
const heroMobile = { media: MOBILE_MEDIA, sizes: MOBILE_SIZES, avif: mobileSet("avif"), webp: mobileSet("webp") };

/**
 * Hero: one 12-column grid – text in columns 1–6, the arch photo in 7–12, 64px gutter.
 * Exactly seven elements: eyebrow, headline, lead, two CTAs, chip row, image.
 * Desktop height min(100svh − header, 820px) with the text centred against the photo;
 * on phones the photo follows the chip row (4:5, max 380px tall).
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const desktopSrcSet = getImageProps({ src: heroImg, alt: "", fill: true, sizes: DESKTOP_SIZES }).props.srcSet;

  return (
    <section className="relative" data-hero data-track-location="hero">
      {/* Hoisted into <head> by React; `type` lets browsers without AVIF skip it (they fall back to the WebP <source>) */}
      <link
        rel="preload"
        as="image"
        type="image/avif"
        media={MOBILE_MEDIA}
        imageSrcSet={heroMobile.avif}
        imageSizes={MOBILE_SIZES}
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media={DESKTOP_MEDIA}
        imageSrcSet={desktopSrcSet}
        imageSizes={DESKTOP_SIZES}
        fetchPriority="high"
      />
      <div className="container-roc grid grid-cols-1 items-center gap-x-16 gap-y-8 pt-6 pb-10 lg:min-h-[min(calc(100svh-var(--header-h)),820px)] lg:grid-cols-12 lg:py-10">
        <div className="hero-stagger min-w-0 lg:col-span-6">
          <p className="eyebrow" style={step(0)}>
            {t.hero.eyebrow}
          </p>

          <h1 className="h1 mt-4" style={step(1)}>
            <span className="block whitespace-nowrap">{t.hero.line1}</span>
            <span className="h-em">{t.hero.line2}</span>
          </h1>

          <p className="lead mt-5 max-w-[52ch]" style={step(2)}>
            {t.hero.text}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={step(3)}>
            <button
              id="hero-cta"
              type="button"
              data-booking-open
              className="btn btn-primary w-full sm:w-auto"
            >
              <Calendar />
              {t.hero.book}
            </button>
            {/* Smooth-scrolls to the body map and moves focus to its heading (BodyMap.tsx) */}
            <a href="#koerper" data-focus-bodymap className="btn btn-outline w-full sm:w-auto">
              <Search />
              {t.hero.findSpecialist}
            </a>
          </div>

          {/* One row, never wrapping: scrolls horizontally with a fade where it does not fit */}
          <div
            className="fade-right no-scrollbar -mx-5 mt-7 flex items-center gap-2 overflow-x-auto px-5 pr-12 whitespace-nowrap sm:mx-0 sm:px-0 lg:mt-8"
            style={step(4)}
            data-scroll-row
          >
            <p id="hero-chips-label" className="text-subtle flex-none text-sm">
              {t.hero.chipsLead}
            </p>
            <ul aria-labelledby="hero-chips-label" className="flex flex-none items-center gap-2">
              {heroChips.map((chip) => (
                <li key={chip.key} className="flex-none">
                  {/* BodyMap picks up data-zone and selects that zone. */}
                  <a href="#koerper" data-zone={chip.zone} className="chip chip-sm">
                    {t.hero.chips[chip.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="arch bg-sand relative mx-auto aspect-[4/5] w-full max-w-[304px] lg:col-span-6 lg:aspect-auto lg:h-[clamp(600px,calc(100svh-var(--header-h)-80px),700px)] lg:max-w-none">
          <Photo
            src={heroImg}
            alt={t.hero.imageAlt}
            loading="eager"
            fetchPriority="high"
            sizes={`${MOBILE_MEDIA} ${MOBILE_SIZES}, ${DESKTOP_SIZES}`}
            source={heroMobile}
            position="50% 30%"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
