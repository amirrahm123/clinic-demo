"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isDoctorId, type DoctorId } from "@/content/doctors";
import type { BookingRow } from "./BookingDialog";
import type { Department, DepartmentId } from "@/content/departments";
import type { Doctor } from "@/content/doctors";
import type { Dictionary } from "@/content/i18n";

/**
 * The two dialogs are the largest client components that nobody needs before the first
 * interaction. They are not server-rendered (ssr: false) and their chunks load only when
 * a trigger is about to be used (pointer over / focus / touch), when a direct link needs
 * them (#team-<id>) or when their section comes near the viewport – never on a timer, so
 * nothing heavy runs before the first interaction. A click that arrives before the
 * chunk is mounted is replayed through `autoOpen`.
 *
 * Hovering or focusing a booking trigger also preconnects to Doctolib.
 */
const BookingDialog = dynamic(() => import("./BookingDialog").then((m) => m.BookingDialog), {
  ssr: false,
});
const DoctorProfileDialog = dynamic(
  () => import("./DoctorProfileDialog").then((m) => m.DoctorProfileDialog),
  { ssr: false },
);

const DOCTOLIB = "#";
let preconnected = false;
function preconnectDoctolib() {
  if (preconnected) return;
  preconnected = true;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = DOCTOLIB;
  link.crossOrigin = "";
  document.head.append(link);
}

interface OnDemand {
  /** Trigger elements (delegated) */
  selector: string;
  /** Section that, when near the viewport, loads the component early */
  near?: string;
  /** Load at once when the URL hash matches */
  hash?: RegExp;
  onIntent?: () => void;
}

type State = { ready: boolean; pending: HTMLElement | null };

/** Mount state; `pending` = the trigger that was clicked before the chunk was there */
function useOnDemand({ selector, near, hash, onIntent }: OnDemand): State {
  // A hash match is known on the client only; it is read once as the initial state
  const [state, setState] = useState<State>({ ready: false, pending: null });

  useEffect(() => {
    if (state.ready) return;
    if (hash && hash.test(location.hash)) {
      // external condition (the URL) → mount now
      const t = window.setTimeout(() => setState({ ready: true, pending: null }), 0);
      return () => window.clearTimeout(t);
    }
    const intent = (e: Event) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(selector) : null;
      if (!el) return;
      onIntent?.();
      setState((s) => (s.ready ? s : { ready: true, pending: e.type === "click" ? el : null }));
    };
    const types = ["pointerover", "focusin", "touchstart", "click"];
    for (const t of types) document.addEventListener(t, intent, { passive: true });
    let io: IntersectionObserver | undefined;
    const section = near ? document.querySelector(near) : null;
    if (section && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((en) => en.isIntersecting)) setState((s) => (s.ready ? s : { ready: true, pending: null }));
        },
        { rootMargin: "600px 0px" },
      );
      io.observe(section);
    }
    return () => {
      for (const t of types) document.removeEventListener(t, intent);
      io?.disconnect();
    };
  }, [state.ready, selector, near, hash, onIntent]);

  return state;
}

export function BookingDialogLazy(props: {
  rows: BookingRow[];
  text: { title: string; text: string; unsure: string; newTab: string };
}) {
  const { ready, pending } = useOnDemand({
    selector: "[data-booking-open]",
    onIntent: preconnectDoctolib,
  });
  if (!ready) return null;
  return <BookingDialog {...props} autoOpen={pending !== null} />;
}

export function DoctorProfileDialogLazy(props: {
  doctors: Record<DoctorId, Doctor>;
  departments: Record<DepartmentId, Department>;
  text: Dictionary["team"]["profile"];
  newTab: string;
}) {
  const { ready, pending } = useOnDemand({
    selector: "[data-doctor]",
    near: "#team",
    hash: /^#team-/,
  });
  if (!ready) return null;
  const id = pending?.dataset.doctor;
  return <DoctorProfileDialog {...props} autoOpen={id && isDoctorId(id) ? id : undefined} />;
}
