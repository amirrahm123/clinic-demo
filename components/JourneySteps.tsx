"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Step } from "@/content/steps";
import { Photo } from "./Photo";

const AUTO_ADVANCE_MS = 4500;

interface JourneyStepsProps {
  steps: Step[];
  text: { stepsLabel: string; stepOf: string; showStep: string; trackLabel: string };
  /** Google quote card, rendered under the step list on desktop */
  quote: ReactNode;
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Desktop (lg+): split view – large photo left, vertical step list right. The photo
 * crossfades to the active step; steps auto-advance every 4.5s while the section is
 * in view until the user hovers, focuses or clicks a step. Mobile: scroll-snap cards
 * with a "1/5" counter. Reduced motion: no auto-advance, no crossfade.
 */
export function JourneySteps({ steps, text, quote }: JourneyStepsProps) {
  const [active, setActive] = useState(0);
  const [card, setCard] = useState(0);
  const [stopped, setStopped] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const total = steps.length;

  // Auto-advance: only while in view, never with reduced motion, and never again
  // once the user has interacted with the list.
  useEffect(() => {
    const el = root.current;
    if (!el || stopped || reducedMotion()) return;
    let timer = 0;
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && entry.intersectionRatio >= 0.4) {
          if (!timer) timer = window.setInterval(() => setActive((i) => (i + 1) % total), AUTO_ADVANCE_MS);
        } else stop();
      },
      { threshold: [0, 0.4] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [stopped, total]);

  // Mobile counter follows the snapped card
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
      setCard(Math.min(total - 1, Math.max(0, Math.round(el.scrollLeft / step))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  const choose = (index: number) => {
    setStopped(true);
    setActive(index);
  };
  const stepOf = (n: number) =>
    text.stepOf.replace("{n}", String(n)).replace("{total}", String(total));

  return (
    <div ref={root}>
      {/* ---- Desktop: photo + list ---- */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:gap-10">
        <div
          data-reveal="image"
          className="arch bg-navy-deep relative min-h-[340px] self-stretch overflow-hidden"
        >
          {steps.map((step, i) => (
            <div
              key={step.id}
              aria-hidden={i !== active}
              className={`journey-photo absolute inset-0 ${i === active ? "is-active" : ""}`}
            >
              <Photo
                src={step.image}
                alt={step.imageAlt}
                sizes="(min-width: 1280px) 640px, 55vw"
                position={step.imagePosition}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <ol
            aria-label={text.stepsLabel}
            data-reveal="grid"
            className="flex flex-col gap-1"
            onPointerEnter={() => setStopped(true)}
            onFocus={() => setStopped(true)}
          >
            {steps.map((step, i) => (
              <li key={step.id} style={{ "--i": i } as CSSProperties}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => choose(i)}
                  className="journey-step group flex w-full items-start gap-3.5 rounded-xl px-3.5 py-2 text-left"
                >
                  <span className="font-condensed text-peach mt-[3px] w-6 flex-none text-sm font-semibold tracking-[0.1em]">
                    {step.number}
                  </span>
                  <span className="min-w-0">
                    <span className="font-display block text-lg leading-tight font-light tracking-tight text-white">
                      {step.title}
                    </span>
                    <span className="block text-sm leading-snug text-white/85">
                      {step.text}
                    </span>
                  </span>
                  <span className="sr-only"> – {text.showStep}</span>
                </button>
              </li>
            ))}
          </ol>
          {quote}
        </div>
      </div>

      {/* ---- Mobile / tablet: snap cards ---- */}
      <div className="lg:hidden">
        <ul
          ref={track}
          data-journey-track
          aria-label={text.trackLabel}
          data-reveal="grid"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1"
        >
          {steps.map((step, i) => (
            <li
              key={step.id}
              style={{ "--i": i } as CSSProperties}
              aria-label={stepOf(i + 1)}
              className="w-[82%] flex-none snap-start sm:w-[calc((100%-0.75rem)/2)]"
            >
              <div className="bg-navy-deep relative aspect-[4/3] overflow-hidden rounded-[20px]">
                <Photo
                  src={step.image}
                  alt={step.imageAlt}
                  sizes="(min-width: 640px) 46vw, 82vw"
                  position={step.imagePosition}
                  className="object-cover"
                />
              </div>
              <p className="mt-3 flex items-baseline gap-3">
                <span className="font-condensed text-peach text-sm font-semibold tracking-[0.1em]">
                  {step.number}
                </span>
                <span className="font-display text-lg leading-tight font-light tracking-tight text-white">
                  {step.title}
                </span>
              </p>
              <p className="mt-1 text-sm leading-snug text-white/80">{step.text}</p>
            </li>
          ))}
        </ul>
        <p
          className="font-condensed mt-3 text-sm font-semibold tracking-[0.12em] text-white/70 tabular-nums"
          aria-live="polite"
        >
          <span aria-hidden="true">
            {card + 1}/{total}
          </span>
          <span className="sr-only">{stepOf(card + 1)}</span>
        </p>
        <div className="mt-5">{quote}</div>
      </div>
    </div>
  );
}
