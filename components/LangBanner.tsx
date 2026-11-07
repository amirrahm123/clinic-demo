"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { LANG_COOKIE } from "@/content/i18n";
import { en } from "@/content/i18n/en";
import { ArrowRight, Close } from "./icons";

const DISMISS_KEY = "roc-lang-banner-dismissed";

const noop = () => () => {};
const prefersGerman = () => {
  try {
    const cookie = document.cookie.split("; ").some((c) => c === `${LANG_COOKIE}=de`);
    return cookie && sessionStorage.getItem(DISMISS_KEY) !== "1";
  } catch {
    return false;
  }
};

/**
 * Shown on the English page only when the roc-lang cookie says "de"
 * (a previous visitor chose German). Never redirects; dismissible per session.
 */
export function LangBanner() {
  // Server snapshot = hidden, so the static HTML is identical for everyone.
  const wanted = useSyncExternalStore(noop, prefersGerman, () => false);
  const [dismissed, setDismissed] = useState(false);

  if (!wanted || dismissed) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* private mode – banner simply shows again next time */
    }
    setDismissed(true);
  };

  return (
    <div lang="de" className="bg-navy text-white">
      <div className="container-roc flex min-h-11 items-center justify-between gap-4 text-sm">
        <Link href="/de" className="link-arrow !min-h-10 text-white">
          <span>{en.langBanner.text}</span>
          <ArrowRight />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={en.langBanner.dismiss}
          className="grid size-10 place-items-center rounded-full text-white/80 hover:text-white"
        >
          <Close />
        </button>
      </div>
    </div>
  );
}
