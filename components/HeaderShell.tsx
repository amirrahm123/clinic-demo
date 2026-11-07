"use client";

import { useEffect, useRef, type ReactNode } from "react";

const COMPACT_AFTER = 40; // px: desktop compacts 88→68, soft shadow
const HIDE_AFTER = 120; // px: below this the mobile header is always visible
const DELTA = 6; // px: ignore smaller scroll jitter

/**
 * Fixed header frame with a spacer of the same height in the flow (so the
 * desktop compacting never moves the content). Mobile: hides on scroll-down
 * after 120px, shows on any scroll-up (rAF-throttled, passive). Also marks the
 * nav link of the section in view with aria-current.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastY = window.scrollY;
    let hidden = false;
    let frame = 0;

    const set = (name: "scrolled" | "hidden", value: boolean) => {
      const v = String(value);
      if (el.dataset[name] !== v) el.dataset[name] = v;
    };
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - lastY;
      if (y <= HIDE_AFTER) hidden = false;
      else if (dy > DELTA) hidden = true;
      else if (dy < -DELTA) hidden = false;
      if (Math.abs(dy) > DELTA || y <= HIDE_AFTER) lastY = y;
      set("scrolled", y > COMPACT_AFTER);
      set("hidden", hidden);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("header .nav-link[data-section]"),
    );
    const sections = links
      .map((link) => document.getElementById(link.dataset.section ?? ""))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target, entry.intersectionRatio);
        // The section with the largest visible share wins; none → no highlight.
        let best: Element | null = null;
        let bestRatio = 0.1;
        for (const [el, ratio] of visible) {
          if (ratio > bestRatio) {
            best = el;
            bestRatio = ratio;
          }
        }
        for (const link of links) {
          const active = best !== null && link.dataset.section === best.id;
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        }
      },
      { rootMargin: "-88px 0px -40% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="header-spacer" aria-hidden="true" />
      <header
        ref={ref}
        className="site-header"
        data-scrolled="false"
        data-hidden="false"
        data-track-location="header"
      >
        {children}
      </header>
    </>
  );
}
