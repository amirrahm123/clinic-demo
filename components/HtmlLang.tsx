"use client";

import { useEffect } from "react";
import type { Locale } from "@/content/i18n";

/**
 * A thrown notFound() renders inside Next's bare error document (<html id="__next_error__">
 * without the layout's lang attribute). This restores the page language on the root element
 * so screen readers and :lang() styles (German hyphenation) behave on the 404 pages.
 */
export function HtmlLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
