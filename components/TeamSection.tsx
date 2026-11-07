"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Department, DepartmentId } from "@/content/departments";
import type { Doctor } from "@/content/doctors";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { CarouselControls } from "./CarouselControls";
import { ArcUnderline } from "./Arc";
import { ArrowRight } from "./icons";
import { Photo } from "./Photo";
import { accentTitle } from "./SectionHeader";

const TRACK_ID = "team-track";
const SWAP_MS = 200;

interface TeamSectionProps {
  doctors: Doctor[];
  departments: Record<DepartmentId, Department>;
  /** Departments that have doctors, in filter order */
  filterIds: DepartmentId[];
  text: Dictionary["team"];
  portraitOf: string;
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Team section: heading (count follows the filter), department filter (radiogroup in
 * department colours), scroll-snap carousel of doctor cards. Filtering fades the cards
 * out and in (opacity + 8px, 200ms) and resets the carousel to the start.
 */
export function TeamSection({ doctors, departments, filterIds, text, portraitOf }: TeamSectionProps) {
  const [filter, setFilter] = useState<DepartmentId | null>(null);
  // `shown` lags behind `filter` by the fade-out so the old cards can leave first
  const [shown, setShown] = useState<DepartmentId | null>(null);
  const [phase, setPhase] = useState<"idle" | "leaving" | "entering">("idle");
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionName = text.title.replace(/\*/g, "");

  const resetTrack = () => document.getElementById(TRACK_ID)?.scrollTo({ left: 0 });

  /** Change the filter: fade the cards out, swap, fade in (instant under reduced motion). */
  const choose = (dept: DepartmentId | null) => {
    if (dept === filter) return;
    setFilter(dept);
    if (reducedMotion()) {
      setShown(dept);
      resetTrack();
    } else {
      setPhase("leaving");
    }
  };

  // Phase timers: leaving → (swap the cards) → entering → idle
  useEffect(() => {
    if (phase === "idle") return;
    const timer = window.setTimeout(() => {
      if (phase === "leaving") {
        setShown(filter);
        resetTrack();
        setPhase("entering");
      } else {
        setPhase("idle");
      }
    }, SWAP_MS);
    return () => window.clearTimeout(timer);
  }, [phase, filter]);

  const visible = shown ? doctors.filter((d) => d.dept === shown) : doctors;
  const options: (DepartmentId | null)[] = [null, ...filterIds];
  const title = shown ? text.titleDept.replace("{dept}", departments[shown].name) : text.title;

  // Radio-group keyboard behaviour (←/→ move and select)
  const onKey = (e: React.KeyboardEvent, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const last = options.length - 1;
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % options.length
        : e.key === "ArrowLeft"
          ? (index + last) % options.length
          : e.key === "Home"
            ? 0
            : last;
    choose(options[next] ?? null);
    chipRefs.current[next]?.focus();
  };

  return (
    <>
      <div className="grid items-end gap-x-16 gap-y-4 lg:grid-cols-[minmax(0,1fr)_auto]">
        <h2 id="team-title" className="h2" data-reveal="heading" aria-live="polite">
          {accentTitle(title)}
        </h2>
        <div data-reveal="text" className="flex items-center justify-between gap-6 lg:justify-end lg:pb-2">
          <a href={site.teamUrl} className="link-arrow">
            <span>{text.all}</span>
            <ArrowRight />
          </a>
          <CarouselControls
            trackId={TRACK_ID}
            prevLabel={`${sectionName}: ${text.prev}`}
            nextLabel={`${sectionName}: ${text.next}`}
          />
        </div>
      </div>

      {/* Department filter */}
      <div
        role="radiogroup"
        aria-label={text.filterLabel}
        data-reveal="text"
        className="no-scrollbar fade-right -mx-5 mt-5 flex snap-x gap-2 overflow-x-auto px-5 pr-10 sm:mt-6 sm:[mask-image:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
      >
        {options.map((dept, index) => {
          const checked = filter === dept;
          return (
            <button
              key={dept ?? "all"}
              ref={(el) => {
                chipRefs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => choose(dept)}
              onKeyDown={(e) => onKey(e, index)}
              style={dept ? ({ "--dept": departments[dept].color } as CSSProperties) : undefined}
              className={`chip chip-sm flex-none snap-start gap-2 ${dept ? "chip-dept" : ""}`}
            >
              {dept ? (
                <span className="size-2 flex-none rounded-full bg-(--dept)" aria-hidden="true" />
              ) : null}
              {dept ? departments[dept].name : text.filterAll}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {text.shown.replace("{n}", String(visible.length))}
      </p>

      {/* Scroll-snap track: 4 cards per view on desktop, swipe on mobile.
          Each card is a button that opens the profile dialog (data-doctor). */}
      <ul
        id={TRACK_ID}
        data-reveal="grid"
        data-phase={phase}
        tabIndex={0}
        aria-label={text.trackLabel}
        className="no-scrollbar team-track -mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 sm:mt-6 lg:mx-0 lg:scroll-px-0 lg:gap-6 lg:px-0"
      >
        {visible.map((doctor, i) => {
          const dept = departments[doctor.dept];
          return (
            <li
              key={doctor.id}
              style={{ "--dept": dept.color, "--i": i } as CSSProperties}
              className="doctor-card team-card group w-[82%] flex-none snap-start sm:w-[calc((100%-2*1rem)/3)] lg:w-[calc((100%-3*1.5rem)/4)]"
            >
              <button
                type="button"
                data-doctor={doctor.id}
                aria-haspopup="dialog"
                className="block w-full rounded-[20px] text-left"
              >
                <span
                  className="bg-sand relative block aspect-[4/5] overflow-hidden rounded-[20px] border-b-[3px] border-(--dept)"
                  data-doctor-portrait={doctor.id}
                >
                  <Photo
                    src={doctor.image}
                    alt={`${portraitOf} ${doctor.name}`}
                    sizes="(min-width: 1024px) 294px, (min-width: 640px) 31vw, 82vw"
                    className="ease-roc object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-3 block">
                  <span className="font-condensed inline-flex min-h-6 items-center rounded-full bg-(--dept) px-2.5 text-sm font-semibold tracking-[0.12em] text-white uppercase">
                    {dept.name}
                  </span>
                </span>
                <span className="font-display text-navy mt-1 block text-lg leading-tight tracking-tight lg:text-xl">
                  {doctor.name}
                </span>
                <ArcUnderline className="mt-1" />
                <span className="text-muted mt-0.5 block text-sm leading-snug">{doctor.role}</span>
                {/* "View profile" – fades in on hover / focus */}
                <span className="doctor-cta text-navy mt-2 inline-flex items-center gap-1.5 text-sm font-semibold">
                  <span className="border-b border-current pb-px">{text.viewProfile}</span>
                  <ArrowRight />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
