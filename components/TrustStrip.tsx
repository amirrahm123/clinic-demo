import Image from "next/image";
import { getDict, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { Star } from "./icons";

// Membership / partner logos in monochrome navy (scripts/trust-logos.mjs), padding trimmed
// so each mark fills its box. 56px tall on desktop, 40px on mobile. BLÄK is the official
// vector (blaek.de, recoloured) and wide, so it is limited by width instead – up to 200px
// (160px on phones) – which makes its lettering larger than the old PNG at 56px. The two
// PNGs are ≥ 1.95× their display height (WIP's largest published file is 128px) and are
// served as they are (unoptimized) – never resampled or upscaled.
// TODO(client): iROC website URL (roc.de shows the logo without a link).
const logos: { href: string; alt: string; src: string; width: number; height: number; size: string }[] = [];

/**
 * One calm row directly under the hero. Desktop: a three-column grid – rating left, the
 * logo group exactly centred, "6 specialties" right, all vertically centred. Mobile: the
 * rating, then the logos in their own centred row, then the specialties line.
 */
export function TrustStrip({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const rating = locale === "de" ? site.rating.value : site.rating.valueEn;

  return (
    <section aria-label={t.trust.label} className="border-line border-y bg-white">
      <div
        data-reveal="grid"
        className="container-roc grid grid-cols-1 items-center justify-items-center gap-y-4 py-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10 lg:py-7"
      >
        <a
          href={site.googleProfileUrl}
          target="_blank"
          rel="noopener"
          className="text-navy inline-flex min-h-11 items-center gap-2 text-sm whitespace-nowrap lg:justify-self-start lg:text-base"
        >
          <Star className="text-orange flex-none" />
          <span className="font-semibold tabular-nums">{rating}</span>
          <span className="text-muted tabular-nums">
            · {site.rating.count} {t.trust.reviews}
          </span>
          <span className="sr-only">
            {" "}
            {t.trust.ratingSr} {t.a11y.newTab}
          </span>
        </a>

        {/* Logo group: centred in the strip, equal gaps between all logos */}
        <ul className="flex items-center justify-center gap-8 lg:gap-12">
          {logos.map((logo) => (
            <li key={logo.href} className="flex items-center">
              <a
                href={logo.href}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center opacity-90 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className={`object-contain ${logo.size}`}
                />
                <span className="sr-only"> {t.a11y.newTab}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-muted text-center text-sm lg:justify-self-end lg:text-right lg:text-base">
          {t.trust.specialties}
        </p>
      </div>
    </section>
  );
}
