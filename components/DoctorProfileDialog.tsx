"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import type { Department, DepartmentId } from "@/content/departments";
import { doctorIds, isDoctorId, type Doctor, type DoctorId } from "@/content/doctors";
import type { Dictionary } from "@/content/i18n";
import { site } from "@/content/site";
import { ArrowLeft, ArrowRight, Phone } from "./icons";
import { trackEvent } from "@/lib/analytics";
import { Modal, type ModalHandle } from "./Modal";
import { Photo } from "./Photo";

interface DoctorProfileDialogProps {
  doctors: Record<DoctorId, Doctor>;
  departments: Record<DepartmentId, Department>;
  text: Dictionary["team"]["profile"];
  newTab: string;
  /** Open this profile as soon as mounted (card clicked before the chunk had loaded) */
  autoOpen?: DoctorId;
}

const HASH_PREFIX = "#team-";

/** View Transitions API available and motion allowed */
const canMorph = () =>
  typeof document !== "undefined" &&
  "startViewTransition" in document &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The portrait of a doctor card (TeamSection renders data-doctor-portrait) */
const cardPortrait = (id: DoctorId) =>
  document.querySelector<HTMLElement>(`[data-doctor-portrait="${id}"]`);

const name = (el: HTMLElement, value: string | null) => {
  if (value) {
    el.style.setProperty("view-transition-name", value);
    el.style.setProperty("view-transition-class", "doctor");
  } else {
    el.style.removeProperty("view-transition-name");
    el.style.removeProperty("view-transition-class");
  }
};

/**
 * Doctor profile dialog. Any element with `data-doctor="<id>"` opens it (the cards stay
 * server-rendered). Prev/next move between doctors without closing; the URL hash
 * mirrors the open profile (#team-weber) so a profile can be linked directly.
 *
 * Shared-element transition: when a card opens the dialog, the card portrait and the
 * dialog portrait share a view-transition-name (doctor-<id>) for the duration of the
 * transition, so the photo morphs from the card into the dialog and back on close.
 * Without the API or under reduced motion the dialog simply opens.
 */
export function DoctorProfileDialog({ doctors, departments, text, newTab, autoOpen }: DoctorProfileDialogProps) {
  const modal = useRef<ModalHandle>(null);
  const [id, setId] = useState<DoctorId>(doctorIds[0] ?? "weber");
  const [open, setOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  const show = useCallback((next: DoctorId, morph = false) => {
    const apply = () => {
      flushSync(() => {
        setId(next);
        setOpen(true);
      });
      history.replaceState(null, "", `${HASH_PREFIX}${next}`);
      modal.current?.open();
      trackEvent("profile_open", { department: doctors[next].dept });
      scroller.current?.scrollTo({ top: 0 });
    };
    const card = morph ? cardPortrait(next) : null;
    if (!card || !canMorph()) {
      apply();
      return;
    }
    const transitionName = `doctor-${next}`;
    name(card, transitionName);
    const transition = document.startViewTransition(() => {
      // Only one element may carry the name in the new state: the dialog portrait
      name(card, null);
      apply();
      if (portrait.current) name(portrait.current, transitionName);
    });
    transition.finished.finally(() => {
      if (portrait.current) name(portrait.current, null);
    });
  }, [doctors]);

  // Open from the cards and from a direct link (#team-<id>)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const target = e.target.closest<HTMLElement>("[data-doctor]")?.dataset.doctor;
      if (target && isDoctorId(target)) show(target, true);
    };
    const fromHash = () => {
      const h = location.hash;
      if (h.startsWith(HASH_PREFIX) && isDoctorId(h.slice(HASH_PREFIX.length))) {
        show(h.slice(HASH_PREFIX.length) as DoctorId);
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", fromHash);
    fromHash();
    if (autoOpen) show(autoOpen, true);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [show, autoOpen]);

  /** Close requests (button, backdrop, Escape): morph the portrait back onto the card */
  const beforeClose = useCallback(
    (close: () => void) => {
      const card = cardPortrait(id);
      const from = portrait.current;
      if (!card || !from || !canMorph()) {
        close();
        return;
      }
      const transitionName = `doctor-${id}`;
      name(from, transitionName);
      const transition = document.startViewTransition(() => {
        name(from, null);
        close();
        flushSync(() => setOpen(false));
        name(card, transitionName);
      });
      transition.finished.finally(() => name(card, null));
    },
    [id],
  );

  const onClose = () => {
    setOpen(false);
    if (location.hash.startsWith(HASH_PREFIX)) history.replaceState(null, "", "#team");
  };

  const index = doctorIds.indexOf(id);
  const step = (delta: number) =>
    show(doctorIds[(index + delta + doctorIds.length) % doctorIds.length] ?? id);

  const doctor = doctors[id];
  const dept = departments[doctor.dept];
  const bookHref = dept.bookingUrl ?? dept.href;

  const section = (title: string, children: React.ReactNode) => (
    <section className="mt-6 first:mt-0">
      <h3 className="eyebrow !text-sm">{title}</h3>
      <div className="mt-2.5">{children}</div>
    </section>
  );

  return (
    <Modal
      ref={modal}
      labelledBy="doctor-title"
      onClose={onClose}
      beforeClose={beforeClose}
      wide
      closeLabel={text.close}
    >
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden sm:flex-row"
        data-track-location="profile"
        style={{ "--dept": dept.color } as CSSProperties}
        // Re-render the content when switching doctors (resets scroll + animations)
        key={open ? id : "closed"}
      >
        {/* Left column / mobile header band: portrait on a soft department tint */}
        <div
          className="relative flex flex-none flex-col sm:w-[38%] sm:overflow-y-auto"
          style={{ background: "color-mix(in srgb, var(--dept) 12%, var(--color-ivory))" }}
        >
          <div className="flex items-end gap-4 px-5 pt-5 pb-4 sm:block sm:px-7 sm:pt-8 sm:pb-6">
            <div
              ref={portrait}
              className="bg-sand relative size-24 flex-none overflow-hidden rounded-[20px] border-b-[3px] border-(--dept) sm:aspect-[4/5] sm:size-auto sm:w-full"
            >
              <Photo
                src={doctor.image}
                alt={`${text.portraitOf} ${doctor.name}`}
                sizes="(min-width: 640px) 320px, 96px"
                position="50% 30%"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 sm:mt-5">
              <span
                className="font-condensed inline-flex min-h-6 items-center rounded-full bg-(--dept) px-2.5 text-sm font-semibold tracking-[0.12em] text-white uppercase"
              >
                {dept.name}
              </span>
              <h2
                id="doctor-title"
                className="font-display text-navy mt-2 text-xl leading-tight tracking-tight sm:text-2xl"
              >
                {doctor.name}
              </h2>
              <p className="text-muted mt-1 text-sm leading-snug">{doctor.role}</p>
            </div>
          </div>
          <div className="hidden px-7 pb-7 sm:mt-auto sm:block">
            <a
              href={bookHref}
              data-book={dept.id}
              target="_blank"
              rel="noopener"
              className="btn w-full bg-(--dept) text-white hover:brightness-110"
            >
              {text.book.replace("{dept}", dept.name)}
              <ArrowRight />
              <span className="sr-only"> {newTab}</span>
            </a>
            <a
              href={site.phone.href}
              className="text-navy mt-3 flex min-h-11 items-center justify-center gap-2 text-sm font-semibold tabular-nums"
            >
              <Phone />
              {site.phone.display}
            </a>
          </div>
        </div>

        {/* Right column: scrolling sections */}
        <div
          ref={scroller}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-28 sm:px-8 sm:pt-8 sm:pb-8"
        >
          {doctor.focus.length > 0
            ? section(
                text.focus,
                <ul className="flex flex-wrap gap-2">
                  {doctor.focus.map((item) => (
                    <li
                      key={item}
                      className="text-navy inline-flex min-h-8 items-center rounded-full border border-(--dept) px-3 text-sm font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>,
              )
            : null}

          {section(
            text.career,
            <ol className="profile-timeline space-y-3.5">
              {doctor.career.map((station) => (
                <li
                  key={`${station.years}-${station.text}`}
                  className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
                >
                  <span className="font-condensed text-subtle text-sm font-semibold tracking-[0.08em] uppercase tabular-nums">
                    {station.years}
                  </span>
                  <span className="text-ink text-sm leading-normal">{station.text}</span>
                </li>
              ))}
            </ol>,
          )}

          {doctor.qualifications.length > 0
            ? section(
                text.qualifications,
                <ul className="space-y-1.5">
                  {doctor.qualifications.map((item) => (
                    <li key={item} className="text-ink flex gap-2.5 text-sm leading-normal">
                      <span className="mt-[0.5625rem] size-1.5 flex-none rounded-full bg-(--dept)" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>,
              )
            : null}

          {doctor.memberships.length > 0
            ? section(
                text.memberships,
                <ul className="space-y-1.5">
                  {doctor.memberships.map((item) => (
                    <li key={item} className="text-ink flex gap-2.5 text-sm leading-normal">
                      <span className="mt-[0.5625rem] size-1.5 flex-none rounded-full bg-(--dept)" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>,
              )
            : null}

          {doctor.publicationsUrl ? (
            <a
              href={doctor.publicationsUrl}
              target="_blank"
              rel="noopener"
              className="link-arrow mt-6"
            >
              <span>{text.publications}</span>
              <ArrowRight />
              <span className="sr-only"> {newTab}</span>
            </a>
          ) : null}

          {/* Prev / next between doctors */}
          <div className="border-line mt-8 flex items-center justify-between gap-3 border-t pt-4">
            <button
              type="button"
              onClick={() => step(-1)}
              className="text-navy inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
            >
              <ArrowLeft />
              {text.prev}
            </button>
            <span className="font-condensed text-subtle text-sm tracking-[0.12em] tabular-nums">
              {index + 1} / {doctorIds.length}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              className="text-navy inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
            >
              {text.next}
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Mobile: sticky booking bar inside the sheet */}
        <div className="bg-ivory/95 border-line absolute inset-x-0 bottom-0 flex gap-2 border-t px-4 py-3 backdrop-blur sm:hidden">
          <a
            href={bookHref}
            data-book={dept.id}
            target="_blank"
            rel="noopener"
            className="btn flex-1 bg-(--dept) text-white"
          >
            {text.book.replace("{dept}", dept.name)}
            <ArrowRight />
          </a>
          <a
            href={site.phone.href}
            aria-label={`${text.call}: ${site.phone.display}`}
            className="border-line-strong text-navy grid size-12 flex-none place-items-center rounded-full border"
          >
            <Phone />
          </a>
        </div>
      </div>
    </Modal>
  );
}
