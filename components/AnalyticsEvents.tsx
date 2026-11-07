"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Vercel Web Analytics (cookieless, no personal data) plus the delegated click events:
 *  - book_click  – any `[data-booking-open]` trigger (opens the dialog) and any outbound
 *                  booking link marked `data-book="<department>"`
 *  - phone_click – any tel: link
 * The `location` is the nearest `[data-track-location]` ancestor (hero, header, dialog,
 * bodymap, visit, profile, footer, …). Zone / profile / free-text / language events are
 * fired where they happen (BodyMap, DoctorProfileDialog, FreeText, LanguageSwitch).
 */
const locationOf = (el: Element) =>
  el.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ?? "page";

/** The analytics script is injected in idle time only – never before first paint or input */
function useIdle(): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 5000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setIdle(true), 2500);
    return () => window.clearTimeout(t);
  }, []);
  return idle;
}

export function AnalyticsEvents() {
  const idle = useIdle();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const trigger = e.target.closest<HTMLElement>("[data-booking-open]");
      if (trigger) trackEvent("book_click", { location: locationOf(trigger) });
      const book = e.target.closest<HTMLElement>("a[data-book]");
      if (book) trackEvent("book_click", { department: book.dataset.book, location: locationOf(book) });
      const tel = e.target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (tel) trackEvent("phone_click", { location: locationOf(tel) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return idle ? <Analytics /> : null;
}
