import { de } from "./de";
import { en } from "./en";

export type Locale = "de" | "en";
export const locales: Locale[] = ["en", "de"];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof de;

const dictionaries: Record<Locale, Dictionary> = { de, en };

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Path prefix of a locale: "" for English (at /), "/de" for German. */
export function localePrefix(locale: Locale): string {
  return locale === "de" ? "/de" : "";
}

/** Build a locale-aware path: localePath("de", "/#koerper") → "/de#koerper". */
export function localePath(locale: Locale, path: string): string {
  const prefix = localePrefix(locale);
  if (path === "/") return prefix || "/";
  if (path.startsWith("/#")) return `${prefix || ""}/${path.slice(1)}`.replace("//", "/");
  return `${prefix}${path}`;
}

export const otherLocale = (locale: Locale): Locale => (locale === "de" ? "en" : "de");

export const LANG_COOKIE = "roc-lang";
