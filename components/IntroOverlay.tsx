"use client";

import { Fragment, useEffect, type CSSProperties } from "react";
import { ArrowRight } from "./icons";
import { ArcLine } from "./Arc";
import { LogoMark, LogoWordmark } from "./Logo";

/**
 * Runs in <head> before first paint. Decides whether the intro plays and sets
 * `data-intro` on <html>; CSS shows the overlay only for "play"/"out", so there
 * is no flash and no hydration flicker on repeat visits.
 */
export const INTRO_HEAD_SCRIPT = `(function(){var d=document.documentElement;var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!rm){d.classList.add("js-reveal");setTimeout(function(){if(!window.__rocReveal)d.classList.remove("js-reveal")},4000)}try{var s=sessionStorage,k="roc-intro-seen";var p=location.pathname.replace(/\\/$/,"");var home=p===""||p==="/de";var force=/[?&]intro=1(&|$)/.test(location.search);var skip=!home||rm||(!force&&s.getItem(k));s.setItem(k,"1");d.dataset.intro=skip?"skip":"play";window.__rocIntroT0=performance.now()}catch(e){d.dataset.intro="skip"}})()`;

declare global {
  interface Window {
    __rocIntroT0?: number;
  }
}

/**
 * Timeline lives in CSS (#roc-intro custom properties): assemble 0–0.9s ·
 * pause · wordmark 1.2–1.8 · line 2.0–2.5 · tagline word by word 2.5–3.3 ·
 * hold · hand-off 4.2–4.8s. `?intro=1` replays the intro regardless of the
 * session flag.
 */
const toMs = (value: string, fallback: number) => {
  const v = value.trim();
  if (v.endsWith("ms")) return parseFloat(v);
  if (v.endsWith("s")) return parseFloat(v) * 1000;
  return fallback;
};

interface IntroOverlayProps {
  tagline: string;
  skipLabel: string;
  skipAria: string;
}

/**
 * Full-screen brand intro, shown once per session. The build-up is pure CSS
 * (it starts at first paint and never waits for hydration). This component
 * manages state – scroll lock, skip, the hero stagger – and runs the hand-off:
 * it measures the header logo and flies the intro mark onto it.
 */
export function IntroOverlay({ tagline, skipLabel, skipAria }: IntroOverlayProps) {
  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "play") return;

    const page = document.getElementById("page");
    const overlay = document.getElementById("roc-intro");
    const css = getComputedStyle(overlay ?? html);
    const HANDOFF_AT_MS = toMs(css.getPropertyValue("--i-handoff-at"), 4200);
    const HANDOFF_MS = toMs(css.getPropertyValue("--i-handoff"), 600);
    // Keep keyboard focus out of the covered page: the skip button is the only stop.
    page?.setAttribute("inert", "");
    let finished = false;
    let doneTimer = 0;

    /**
     * Hand-off target: the header logo's box, measured after layout. The mark
     * is translated by the distance between the two centres and scaled to the
     * header logo's width (both share the same viewBox, so one scale fits).
     */
    const aimAtHeaderLogo = () => {
      const mark = overlay?.querySelector<HTMLElement>(".intro-mark");
      const target = document.querySelector<HTMLElement>("[data-logo-target]");
      if (!overlay || !mark || !target) return;
      const from = mark.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      if (from.width === 0 || to.width === 0) return;
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      overlay.style.setProperty("--fly-x", `${dx.toFixed(2)}px`);
      overlay.style.setProperty("--fly-y", `${dy.toFixed(2)}px`);
      overlay.style.setProperty("--fly-s", (to.width / from.width).toFixed(4));
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      removeListeners();
      window.clearTimeout(timer);
      page?.removeAttribute("inert");
      aimAtHeaderLogo();
      // "out" runs the CSS hand-off (now), releases the scroll lock and starts the
      // hero stagger; "done" hides the overlay once the mark has landed.
      html.dataset.intro = "out";
      doneTimer = window.setTimeout(() => {
        html.dataset.intro = "done";
        // Neutral state afterwards so client-side navigations back home stay quiet.
        doneTimer = window.setTimeout(() => {
          if (html.dataset.intro === "done") html.dataset.intro = "skip";
        }, 800);
      }, HANDOFF_MS);
    };

    const skip = () => finish();
    const removeListeners = () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("pointerdown", skip);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    window.addEventListener("pointerdown", skip);

    // Follow the CSS clock: the hand-off starts --i-handoff-at after the head script ran.
    const elapsed = performance.now() - (window.__rocIntroT0 ?? performance.now());
    const timer = window.setTimeout(finish, Math.max(0, HANDOFF_AT_MS - elapsed));

    return () => {
      removeListeners();
      window.clearTimeout(timer);
      window.clearTimeout(doneTimer);
      page?.removeAttribute("inert");
    };
  }, []);

  const words = tagline.split(/\s+/).filter(Boolean);

  return (
    <div id="roc-intro">
      <div className="intro-bg" aria-hidden="true" />
      <div className="intro-logo" aria-hidden="true">
        <div className="intro-mark">
          <LogoMark />
        </div>
        <div className="intro-rest">
          <LogoWordmark className="intro-wordmark" />
          <ArcLine className="intro-line" />
          {/* One span per word: each fades and rises on its own (--w = index) */}
          <p className="intro-tagline">
            {words.map((word, i) => (
              <Fragment key={i}>
                {i > 0 ? " " : null}
                <span style={{ "--w": i } as CSSProperties}>{word}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      {/* Any click, key press, wheel or touch move skips as well (see effect). */}
      <button type="button" className="intro-skip" aria-label={skipAria}>
        {skipLabel}
        <ArrowRight />
      </button>
    </div>
  );
}
