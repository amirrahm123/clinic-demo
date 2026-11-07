import type { DepartmentId, DepartmentText } from "./departments";

export const departmentsDe: Record<DepartmentId, DepartmentText> = {
  ortho: {
    name: "Orthopädie",
    cta: "Termin buchen",
    description:
      "Präzise Diagnostik, konservative, minimalinvasive und regenerative Therapien – für Beweglichkeit und Schmerzfreiheit.",
    mobileLine: "Regenerativ, konservativ, minimalinvasiv",
    imageAlt: "Stoßwellenbehandlung am Ellenbogen in der Isarblick Orthopädie",
    bookingSub: "Online via Doctolib",
  },
  physio: {
    name: "Physiotherapie",
    cta: "Kontakt aufnehmen",
    description:
      "Gezielte Behandlungen, die Schmerzen reduzieren, Bewegung sichern und den Körper langfristig stabilisieren.",
    mobileLine: "Prävention, Therapie, Aufbau",
    imageAlt: "Physiotherapeutin begleitet eine Patientin beim Training mit Kurzhanteln",
    bookingSub: "Kontakt & Rückruf",
  },
  derma: {
    name: "Dermatologie",
    cta: "Termin buchen",
    description:
      "Hautkrebsscreening, Allergologie und Behandlung chronischer Hauterkrankungen – mit digitaler Fotodokumentation im Haus.",
    mobileLine: "Haut, Allergologie, Ästhetik",
    imageAlt:
      "Hautkrebsscreening mit digitaler Ganzkörper-Fotodokumentation in der Isarblick Dermatologie",
    bookingSub: "Online via Doctolib",
  },
  aesthetic: {
    name: "Ästhetik",
    cta: "Termin buchen",
    description:
      "Ärztliche ästhetische Medizin: Faltenbehandlung, Hautqualität und plastisch-chirurgische Eingriffe.",
    mobileLine: "Regeneration, Prävention, Ästhetik",
    imageAlt: "Patientin während einer ästhetischen Gesichtsbehandlung bei Isarblick Aesthetic",
    bookingSub: "Online via Doctolib",
  },
  gyne: {
    name: "Gynäkologie",
    cta: "Termin buchen",
    description:
      "Vertrauensvolle Begleitung von Frauen in jeder Lebensphase – mit moderner gynäkologischer Diagnostik.",
    mobileLine: "Begleitung in jeder Lebensphase",
    imageAlt: "Ultraschallgerät im Behandlungszimmer der Isarblick Gynäkologie",
    bookingSub: "Online via Doctolib",
  },
  labor: {
    name: "Labor",
    cta: "Mehr zum Labor",
    description:
      "Laboruntersuchungen direkt im Haus – Ergebnisse fließen ohne Umwege in Ihre Behandlung ein.",
    mobileLine: "Laboruntersuchungen im Haus",
    imageAlt: "Zwei Mitarbeiterinnen der Praxisklinik Labors prüfen eine Probe",
    bookingSub: "",
  },
};
