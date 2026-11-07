import Link from "next/link";
import { getDict, localePath, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { ArcLine } from "./Arc";
import { HtmlLang } from "./HtmlLang";
import { ArrowRight, Calendar, Phone } from "./icons";

/**
 * Designed 404. Rendered inside the locale's own layout (app/(de)/not-found.tsx and
 * app/(en)/not-found.tsx, reached through the catch-all routes), so header and footer match
 * the language. Short headline, the Isarblick arc as the only decoration, three ways on: home,
 * booking, phone.
 */
export function NotFound({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const other: Locale = locale === "de" ? "en" : "de";
  const o = getDict(other);

  return (
    <div lang={locale} data-track-location="404" className="container-roc section flex min-h-[70svh] flex-col justify-center">
      <HtmlLang lang={locale} />
      <div className="max-w-[40rem]">
        <p className="eyebrow">{t.notFound.eyebrow}</p>
        <h1 className="h1 mt-4">{t.notFound.title}</h1>
        <ArcLine className="text-navy-soft mt-6 block h-4 w-56" />
        <p className="lead mt-6">{t.notFound.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href={localePath(locale, "/")} className="btn btn-primary">
            {t.notFound.home}
            <ArrowRight />
          </Link>
          <button type="button" data-booking-open className="btn btn-outline">
            <Calendar />
            {t.notFound.book}
          </button>
          <a href={site.phone.href} className="btn btn-outline tabular-nums">
            <Phone />
            {t.notFound.call}
          </a>
        </div>
        <p lang={other} className="text-muted mt-10 text-sm">
          <Link href={localePath(other, "/")} className="link-arrow">
            <span>{o.notFound.home}</span>
            <ArrowRight />
          </Link>
        </p>
      </div>
    </div>
  );
}
