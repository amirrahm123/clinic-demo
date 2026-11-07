import type { Metadata } from "next";
import { getDict, localePath, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

/** hreflang alternates for a path that exists in both locales (x-default → English). */
export function languageAlternates(path: "/" = "/") {
  return {
    en: localePath("en", path),
    de: localePath("de", path),
    "x-default": localePath("en", path),
  };
}

export function homeMetadata(locale: Locale): Metadata {
  const t = getDict(locale);
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: {
      canonical: localePath(locale, "/"),
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: t.meta.locale,
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: localePath(locale, "/"),
    },
    twitter: { card: "summary_large_image" },
  };
}
