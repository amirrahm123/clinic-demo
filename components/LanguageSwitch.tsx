"use client";

import { LANG_COOKIE, localePath, otherLocale, type Locale } from "@/content/i18n";
import { trackEvent } from "@/lib/analytics";

interface LanguageSwitchProps {
  locale: Locale;
  /** aria-label for the link to the other language */
  switchLabel: string;
  srLabel: string;
  compact?: boolean;
}

/** Writes the roc-lang cookie (used only for the banner on /) – never redirects. */
export function rememberLanguage(locale: Locale) {
  document.cookie = `${LANG_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * "EN / DE" – real links to the same page in the other language. The hash of the
 * current section is appended on click so /#koerper ↔ /de#koerper stay in sync.
 */
export function LanguageSwitch({ locale, switchLabel, srLabel, compact }: LanguageSwitchProps) {
  const other = otherLocale(locale);
  const items: Locale[] = ["en", "de"];
  return (
    <div className="font-condensed text-subtle flex items-center text-sm font-semibold tracking-[0.12em]">
      <span className="sr-only">{srLabel}: </span>
      {items.map((l, i) => {
        const current = l === locale;
        const label = l.toUpperCase();
        return (
          <span key={l} className="flex items-center">
            {i > 0 ? (
              <span className={compact ? "hidden" : "px-0.5"} aria-hidden="true">
                /
              </span>
            ) : null}
            {current ? (
              <span
                aria-current="true"
                className={`text-navy flex min-h-11 items-center px-1.5 font-bold ${
                  compact ? "" : ""
                }`}
              >
                {label}
              </span>
            ) : (
              <a
                href={localePath(other, "/")}
                lang={other}
                hrefLang={other}
                aria-label={switchLabel}
                className={`hover:text-navy flex min-h-11 min-w-9 items-center justify-center px-1.5 transition-colors ${
                  compact ? "hidden sm:flex" : ""
                }`}
                onClick={(e) => {
                  rememberLanguage(other);
                  trackEvent("lang_switch", { to: other });
                  const hash = window.location.hash;
                  if (hash) e.currentTarget.href = localePath(other, "/") + hash;
                }}
              >
                {label}
              </a>
            )}
          </span>
        );
      })}
    </div>
  );
}
