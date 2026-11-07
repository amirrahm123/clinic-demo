import type { DepartmentId, DepartmentText } from "./departments";

export const departmentsEn: Record<DepartmentId, DepartmentText> = {
  ortho: {
    name: "Orthopedics",
    cta: "Book appointment",
    description:
      "Precise diagnostics and conservative, minimally invasive and regenerative therapies – for mobility and freedom from pain.",
    mobileLine: "Regenerative, conservative, minimally invasive",
    imageAlt: "Shockwave treatment of the elbow at Isarblick Orthopedics",
    bookingSub: "Online via Doctolib",
  },
  physio: {
    name: "Physiotherapy",
    cta: "Get in touch",
    description:
      "Targeted treatments that reduce pain, restore movement and stabilise the body in the long term.",
    mobileLine: "Prevention, therapy, strengthening",
    imageAlt: "Physiotherapist guiding a patient through dumbbell training",
    bookingSub: "Contact & call-back",
  },
  derma: {
    name: "Dermatology",
    cta: "Book appointment",
    description:
      "Skin cancer screening, allergology and treatment of chronic skin conditions – with digital photo documentation in-house.",
    mobileLine: "Skin, allergology, aesthetics",
    imageAlt: "Skin cancer screening with digital full-body photo documentation at Isarblick Dermatology",
    bookingSub: "Online via Doctolib",
  },
  aesthetic: {
    name: "Aesthetics",
    cta: "Book appointment",
    description:
      "Physician-led aesthetic medicine: wrinkle treatment, skin quality and plastic surgery procedures.",
    mobileLine: "Regeneration, prevention, aesthetics",
    imageAlt: "Patient during an aesthetic facial treatment at Isarblick Aesthetic",
    bookingSub: "Online via Doctolib",
  },
  gyne: {
    name: "Gynecology",
    cta: "Book appointment",
    description:
      "Trusted care for women in every phase of life – with modern gynecological diagnostics.",
    mobileLine: "Care in every phase of life",
    imageAlt: "Ultrasound workstation in a treatment room at Isarblick Gynecology",
    bookingSub: "Online via Doctolib",
  },
  labor: {
    name: "Lab",
    cta: "About the lab",
    description:
      "Laboratory tests directly in-house – results flow straight into your treatment, no detours.",
    mobileLine: "In-house laboratory testing",
    imageAlt: "Two Isarblick Lab staff members checking a sample",
    bookingSub: "",
  },
};
