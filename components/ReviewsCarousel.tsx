"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { ArcLine } from "./Arc";
import { ArrowLeft, ArrowRight, Stars } from "./icons";

export interface ReviewItem {
  id: string;
  author: string;
  text: string;
}

interface ReviewsCarouselProps {
  reviews: ReviewItem[];
  text: {
    label: string;
    starsSr: string;
    source: string;
    /** "(translated)" – empty on the original-language page */
    translated: string;
    prev: string;
    next: string;
    /** "Review {n} of {total}" (screen readers) */
    counter: string;
    /** Opening and closing quotation marks of the page language („…“ / “…”) */
    quotes: [string, string];
  };
}

const FADE_MS = 400;
const SWIPE_PX = 40;

/** Reading time per review: 2.5s + 45ms per character, clamped to 5–9s. */
const durationFor = (text: string) => Math.min(9000, Math.max(5000, 2500 + 45 * text.length));

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
/** true on the server and under reduced motion → no auto-rotation */
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => true,
  );

/**
 * Auto-rotating Google review card (same card as before, now with a thin peach
 * progress line). Pauses on hover/focus and off-screen, resumes after. Prev/next,
 * "2 / 6", swipe on mobile. aria-live only announces manual changes.
 */
export function ReviewsCarousel({ reviews, text }: ReviewsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [manual, setManual] = useState(false);
  const [cycle, setCycle] = useState(0);
  const auto = !useReducedMotion() && reviews.length > 1;
  const root = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const total = reviews.length;
  const current = reviews[index] ?? reviews[0];
  const duration = durationFor(current?.text ?? "");

  /** Crossfade to another review: fade out, swap, fade in (400ms in total). */
  const goTo = useCallback(
    (next: number, byUser: boolean) => {
      setManual(byUser);
      setFading(true);
      window.setTimeout(() => {
        setIndex(((next % total) + total) % total);
        setCycle((c) => c + 1);
        setFading(false);
      }, FADE_MS / 2);
    },
    [total],
  );

  // Pause while the card is off-screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = auto && !paused && inView && !fading;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => goTo(index + 1, false), duration);
    return () => window.clearTimeout(timer);
    // `cycle` restarts the timer after a manual change to the same index
  }, [running, index, duration, goTo, cycle]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    const end = e.changedTouches[0]?.clientX;
    if (start === null || end === undefined) return;
    const dx = end - start;
    if (Math.abs(dx) >= SWIPE_PX) goTo(index + (dx < 0 ? 1 : -1), true);
  };

  const counter = text.counter.replace("{n}", String(index + 1)).replace("{total}", String(total));
  const translated = text.translated ? ` ${text.translated}` : "";

  return (
    <figure
      ref={root}
      data-reveal="text"
      aria-label={text.label}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative overflow-hidden rounded-xl border border-white/12 bg-white/[0.06] px-4 pt-3 pb-3"
    >
      <div className="flex items-start gap-3">
        <Stars className="mt-0.5 flex-none" />
        <span className="sr-only">{text.starsSr}</span>
        <div
          className="review-text min-w-0 flex-1"
          data-fading={fading || undefined}
          // Announce only manual changes – auto-rotation stays quiet for screen readers
          aria-live={manual ? "polite" : "off"}
          aria-atomic="true"
        >
          <blockquote className="font-display text-base leading-snug font-light text-white italic">
            {text.quotes[0]}{current?.text}{text.quotes[1]}
          </blockquote>
          {/* Room on the right for the counter + arrows (absolutely positioned below) */}
          <figcaption className="mt-0.5 pr-24 text-sm text-white/70">
            — {current?.author} · {text.source}
            {translated}
          </figcaption>
        </div>
      </div>

      <span className="absolute right-2 bottom-1 flex items-center text-sm text-white/70">
        <span aria-hidden="true" className="font-condensed mr-1 tracking-[0.12em] tabular-nums">
          {index + 1} / {total}
        </span>
        <span className="sr-only">{counter}</span>
        <button
          type="button"
          aria-label={text.prev}
          onClick={() => goTo(index - 1, true)}
          className="grid size-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          aria-label={text.next}
          onClick={() => goTo(index + 1, true)}
          className="grid size-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowRight />
        </button>
      </span>

      {/* Reading-time progress: the peach arc draws along the bottom edge */}
      {auto ? (
        <ArcLine
          key={`${index}-${cycle}`}
          className="review-progress arc-progress"
          data-paused={running ? undefined : ""}
          style={{ "--review-ms": `${duration}ms` } as CSSProperties}
        />
      ) : null}
    </figure>
  );
}
