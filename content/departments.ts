import type { StaticImageData } from "next/image";
import { noBlur } from "@/lib/photo";
import aesthetic from "@/public/images/departments/aesthetic.jpg";
import derma from "@/public/images/departments/derma.jpg";
import gyne from "@/public/images/departments/gyne.jpg";
import labor from "@/public/images/departments/labor.jpg";
import ortho from "@/public/images/departments/ortho.jpg";
import physio from "@/public/images/departments/physio.jpg";
import type { Locale } from "./i18n";
import { departmentsDe } from "./departments.de";
import { departmentsEn } from "./departments.en";

export type DepartmentId = "ortho" | "physio" | "derma" | "aesthetic" | "gyne" | "labor";

/** Locale-independent department data. */
export interface DepartmentBase {
  id: DepartmentId;
  /** Brand label, e.g. "Isarblick Ortho" (proper name, not translated) */
  short: string;
  /** Department color token (defined once in globals.css) – dots, tags, markers, borders */
  color: string;
  /** Target of the body-map call to action (Doctolib calendar or info page) */
  ctaUrl: string;
  href: string;
  /** Static import: gives next/image the dimensions and a build-time blur placeholder */
  image: StaticImageData;
  /** CSS object-position for the 4:3 cards and square thumbs (faces: center 25%) */
  imagePosition: string;
  /** Booking URL; `null` = not bookable (Labor) */
  bookingUrl: string | null;
}

/** Translated department copy. */
export interface DepartmentText {
  name: string;
  /** Label of the call to action in the body map */
  cta: string;
  description: string;
  mobileLine: string;
  imageAlt: string;
  /** Sub-line in the booking dialog / pills */
  bookingSub: string;
}

export type Department = DepartmentBase & DepartmentText;

/** Typed color map (CSS custom properties from globals.css). */
export const departmentColors: Record<DepartmentId, string> = {
  ortho: "var(--color-dept-ortho)",
  physio: "var(--color-dept-physio)",
  derma: "var(--color-dept-derma)",
  aesthetic: "var(--color-dept-aesthetic)",
  gyne: "var(--color-dept-gyne)",
  labor: "var(--color-dept-labor)",
};

const DOCTOLIB = "#";

export const departmentBase: Record<DepartmentId, DepartmentBase> = {
  ortho: {
    id: "ortho",
    short: "Isarblick Ortho",
    color: departmentColors.ortho,
    ctaUrl: "#",
    href: "#",
    image: noBlur(ortho),
    imagePosition: "50% 30%",
    bookingUrl: "#",
  },
  physio: {
    id: "physio",
    short: "Isarblick Physio",
    color: departmentColors.physio,
    ctaUrl: "#",
    href: "#",
    image: noBlur(physio),
    imagePosition: "50% 50%",
    bookingUrl: "#",
  },
  derma: {
    id: "derma",
    short: "Isarblick Derma",
    color: departmentColors.derma,
    ctaUrl: "#",
    href: "#",
    image: noBlur(derma),
    imagePosition: "50% 50%",
    bookingUrl: "#",
  },
  aesthetic: {
    id: "aesthetic",
    short: "Isarblick Aesthetic",
    color: departmentColors.aesthetic,
    ctaUrl: "#",
    href: "#",
    image: noBlur(aesthetic),
    imagePosition: "50% 35%",
    bookingUrl: "#",
  },
  gyne: {
    id: "gyne",
    short: "Isarblick Gyne",
    color: departmentColors.gyne,
    ctaUrl: "#",
    href: "#",
    // Ultrasound workstation from roc-gyne.de (484px source, upscaled 2× – scripts/upscale-photos.mjs)
    image: noBlur(gyne),
    imagePosition: "50% 50%",
    bookingUrl: "#",
  },
  labor: {
    id: "labor",
    short: "Isarblick Lab",
    color: departmentColors.labor,
    ctaUrl: "#",
    href: "#",
    // Lab team photo from roc.de (580px source, upscaled 2× – scripts/upscale-photos.mjs)
    image: noBlur(labor),
    imagePosition: "50% 30%",
    bookingUrl: null,
  },
};

const texts: Record<Locale, Record<DepartmentId, DepartmentText>> = {
  de: departmentsDe,
  en: departmentsEn,
};

export const departmentIds: DepartmentId[] = [
  "ortho",
  "physio",
  "derma",
  "aesthetic",
  "gyne",
  "labor",
];

/** Order of the rows in the booking dialog (section 8 of the brief). */
const bookingOrder: DepartmentId[] = ["ortho", "derma", "aesthetic", "gyne", "physio"];

export function getDepartments(locale: Locale): Record<DepartmentId, Department> {
  const t = texts[locale];
  return Object.fromEntries(
    departmentIds.map((id) => [id, { ...departmentBase[id], ...t[id] }]),
  ) as Record<DepartmentId, Department>;
}

/** Department cards / footer order. */
export function getDepartmentList(locale: Locale): Department[] {
  const all = getDepartments(locale);
  return departmentIds.map((id) => all[id]);
}

/** Booking dialog rows (Labor has no calendar). */
export function getBookingList(locale: Locale): Department[] {
  const all = getDepartments(locale);
  return bookingOrder.map((id) => all[id]);
}
