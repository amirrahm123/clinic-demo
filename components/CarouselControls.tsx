"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

interface CarouselControlsProps {
  trackId: string;
  prevLabel: string;
  nextLabel: string;
}

const behavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/** Width of one card incl. gap – the step for arrow keys. */
const cardStep = (track: HTMLElement) => {
  const first = track.firstElementChild as HTMLElement | null;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return first ? first.offsetWidth + gap : track.clientWidth;
};

/** Prev/next buttons for a scroll-snap track (the track itself is server-rendered). */
export function CarouselControls({ trackId, prevLabel, nextLabel }: CarouselControlsProps) {
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const update = () =>
      setEdges({
        start: track.scrollLeft <= 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      });
    // ← / → move the focused track by one card
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      track.scrollBy({
        left: (e.key === "ArrowRight" ? 1 : -1) * cardStep(track),
        behavior: behavior(),
      });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("keydown", onKey);
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      track.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", update);
    };
  }, [trackId]);

  const scroll = (direction: 1 | -1) => {
    const track = document.getElementById(trackId);
    track?.scrollBy({ left: direction * track.clientWidth, behavior: behavior() });
  };

  const buttonClass =
    "grid size-12 place-items-center rounded-full border border-line-strong text-navy transition-colors duration-200 hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className={buttonClass}
        aria-label={prevLabel}
        aria-controls={trackId}
        disabled={edges.start}
        onClick={() => scroll(-1)}
      >
        <ArrowLeft />
      </button>
      <button
        type="button"
        className={buttonClass}
        aria-label={nextLabel}
        aria-controls={trackId}
        disabled={edges.end}
        onClick={() => scroll(1)}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
