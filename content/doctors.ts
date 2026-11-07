import type { StaticImageData } from "next/image";
import { noBlur } from "@/lib/photo";
import hoffmann from "@/public/images/doctors/hoffmann.jpg";
import neumann from "@/public/images/doctors/neumann.jpg";
import weber from "@/public/images/doctors/weber.jpg";
import klein from "@/public/images/doctors/klein.jpg";
import schaefer from "@/public/images/doctors/schaefer.jpg";
import brandt from "@/public/images/doctors/brandt.jpg";
import fischer from "@/public/images/doctors/fischer.jpg";
import wagner from "@/public/images/doctors/wagner.png";
import type { DepartmentId } from "./departments";
import type { Locale } from "./i18n";

export type DoctorId =
  "weber" | "hoffmann" | "brandt" | "klein" | "schaefer" | "neumann" | "wagner" | "fischer";

export interface CareerStation {
  /** "seit 2020", "2018 – 2019", "2017" … */
  years: string;
  text: string;
}

/** Translated profile copy (shown in the profile dialog). */
export interface DoctorProfile {
  role: string;
  /** Focus areas – shown as chips */
  focus: string[];
  career: CareerStation[];
  qualifications: string[];
  memberships: string[];
}

export interface Doctor extends DoctorProfile {
  id: DoctorId;
  name: string;
  dept: DepartmentId;
  image: StaticImageData;
  /** Link to a publication list, if the doctor has one */
  publicationsUrl?: string;
}

type DoctorBase = Pick<Doctor, "id" | "name" | "dept" | "image" | "publicationsUrl">;

const base: Record<DoctorId, DoctorBase> = {
  weber: { id: "weber", name: "Dr.\u00a0med.\u00a0Jonas Weber", dept: "ortho", image: noBlur(weber) },
  hoffmann: { id: "hoffmann", name: "Dr.\u00a0med.\u00a0Lena Hoffmann", dept: "ortho", image: noBlur(hoffmann) },
  brandt: { id: "brandt", name: "Dr.\u00a0med.\u00a0Felix Brandt", dept: "ortho", image: noBlur(brandt) },
  klein: { id: "klein", name: "Tobias Klein", dept: "ortho", image: noBlur(klein) },
  schaefer: { id: "schaefer", name: "Dr.\u00a0med.\u00a0Miriam Schäfer", dept: "derma", image: noBlur(schaefer) },
  neumann: { id: "neumann", name: "Dr.\u00a0med.\u00a0Clara Neumann", dept: "derma", image: noBlur(neumann) },
  wagner: { id: "wagner", name: "Dr.\u00a0med.\u00a0Sophie Wagner", dept: "aesthetic", image: noBlur(wagner) },
  fischer: { id: "fischer", name: "Dr.\u00a0med.\u00a0Anna Fischer", dept: "gyne", image: noBlur(fischer) },
};

// DEMO CONTENT: fictional team for a BuildLab design demo.
const profiles: Record<Locale, Record<DoctorId, DoctorProfile>> = {
  de: {
    weber: {
      role: "Facharzt für Orthopädie und Unfallchirurgie",
      focus: ["Sportorthopädie", "Gelenkdiagnostik"],
      career: [{ years: "seit 2019", text: "Ärztin/Arzt in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
    hoffmann: {
      role: "Fachärztin für Orthopädie",
      focus: ["Wirbelsäule", "Osteoporose"],
      career: [{ years: "seit 2019", text: "Ärztin/Arzt in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
    brandt: {
      role: "Facharzt für Orthopädie",
      focus: ["Knie & Schulter"],
      career: [{ years: "seit 2019", text: "Ärztin/Arzt in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
    klein: {
      role: "Physiotherapeut (B.Sc.)",
      focus: ["Manuelle Therapie", "Trainingstherapie"],
      career: [{ years: "seit 2019", text: "Physiotherapeut in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
    schaefer: {
      role: "Fachärztin für Dermatologie",
      focus: ["Hautkrebsvorsorge", "Allergologie"],
      career: [{ years: "seit 2019", text: "Ärztin/Arzt in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
    neumann: {
      role: "Fachärztin für Dermatologie",
      focus: ["Ästhetische Dermatologie"],
      career: [{ years: "seit 2019", text: "Ärztin/Arzt in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
    wagner: {
      role: "Ärztin für ästhetische Medizin",
      focus: ["Faltenbehandlung", "Hautbild"],
      career: [{ years: "seit 2019", text: "Ärztin/Arzt in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
    fischer: {
      role: "Fachärztin für Gynäkologie",
      focus: ["Vorsorge", "Hormonberatung"],
      career: [{ years: "seit 2019", text: "Ärztin/Arzt in der Praxisklinik" }],
      qualifications: [],
      memberships: [],
    },
  },
  en: {
    weber: {
      role: "Specialist in orthopedics and trauma surgery",
      focus: ["Sports orthopedics", "Joint diagnostics"],
      career: [{ years: "since 2019", text: "Physician at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
    hoffmann: {
      role: "Specialist in orthopedics",
      focus: ["Spine", "Osteoporosis"],
      career: [{ years: "since 2019", text: "Physician at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
    brandt: {
      role: "Specialist in orthopedics",
      focus: ["Knee & shoulder"],
      career: [{ years: "since 2019", text: "Physician at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
    klein: {
      role: "Physiotherapist (B.Sc.)",
      focus: ["Manual therapy", "Exercise therapy"],
      career: [{ years: "since 2019", text: "Physiotherapist at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
    schaefer: {
      role: "Specialist in dermatology",
      focus: ["Skin cancer screening", "Allergology"],
      career: [{ years: "since 2019", text: "Physician at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
    neumann: {
      role: "Specialist in dermatology",
      focus: ["Aesthetic dermatology"],
      career: [{ years: "since 2019", text: "Physician at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
    wagner: {
      role: "Physician for aesthetic medicine",
      focus: ["Wrinkle treatment", "Skin quality"],
      career: [{ years: "since 2019", text: "Physician at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
    fischer: {
      role: "Specialist in gynecology",
      focus: ["Check-ups", "Hormone counselling"],
      career: [{ years: "since 2019", text: "Physician at the practice clinic" }],
      qualifications: [],
      memberships: [],
    },
  },
};

export const doctorIds: DoctorId[] = [
  "weber",
  "hoffmann",
  "brandt",
  "klein",
  "schaefer",
  "neumann",
  "wagner",
  "fischer",
];

export function getDoctors(locale: Locale): Record<DoctorId, Doctor> {
  return Object.fromEntries(
    doctorIds.map((id) => [id, { ...base[id], ...profiles[locale][id] }]),
  ) as Record<DoctorId, Doctor>;
}

export function getDoctorList(locale: Locale): Doctor[] {
  const all = getDoctors(locale);
  return doctorIds.map((id) => all[id]);
}

export const isDoctorId = (value: string): value is DoctorId =>
  (doctorIds as string[]).includes(value);
