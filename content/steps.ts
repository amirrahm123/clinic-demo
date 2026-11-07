import type { StaticImageData } from "next/image";
import { noBlur } from "@/lib/photo";
import ortho from "@/public/images/departments/ortho.jpg";
import empfang from "@/public/images/practice/empfang.png";
import hautscreening from "@/public/images/practice/hautscreening.jpg";
import hero from "@/public/images/practice/hero.jpg";
import laborRaum from "@/public/images/practice/labor-raum.jpg";
import type { Locale } from "./i18n";

export type StepId = "arrival" | "imaging" | "lab" | "consultation" | "treatment";

export interface StepBase {
  id: StepId;
  number: string;
  /** Real Isarblick photo for this step (static import → dimensions + blur placeholder) */
  image: StaticImageData;
  /** CSS object-position for the 4:3 / arch crops */
  imagePosition: string;
}

export interface StepText {
  title: string;
  text: string;
  imageAlt: string;
}

export type Step = StepBase & StepText;

/**
 * Step photos come from the existing real Isarblick images (never stock).
 * TODO(client): photo needed – a doctor-with-patient photo for "Consultation" (the hands-on
 * examination photo from the hero is reused meanwhile).
 */
const base: Record<StepId, StepBase> = {
  arrival: { id: "arrival", number: "01", image: noBlur(empfang), imagePosition: "50% 45%" },
  imaging: { id: "imaging", number: "02", image: noBlur(hautscreening), imagePosition: "50% 28%" },
  lab: { id: "lab", number: "03", image: noBlur(laborRaum), imagePosition: "40% 50%" },
  consultation: { id: "consultation", number: "04", image: noBlur(hero), imagePosition: "50% 35%" },
  treatment: { id: "treatment", number: "05", image: noBlur(ortho), imagePosition: "50% 40%" },
};

const order: StepId[] = ["arrival", "imaging", "lab", "consultation", "treatment"];

const texts: Record<Locale, Record<StepId, StepText>> = {
  de: {
    arrival: {
      title: "Ankommen",
      text: "Persönlicher Empfang, Anamnese und Zeit für all Ihre Fragen.",
      imageAlt: "Empfangstresen der Praxisklinik mit frischen Tulpen, dahinter der helle Praxisflur",
    },
    imaging: {
      title: "Bildgebung",
      text: "Röntgen, Ultraschall und strahlenfreie Wirbelsäulenvermessung vor Ort.",
      imageAlt: "Digitale Ganzkörper-Fotodokumentation beim Hautkrebsscreening in der Praxisklinik",
    },
    lab: {
      title: "Labor",
      text: "Blutwerte aus dem hauseigenen Isarblick Labor – ohne externe Wege.",
      imageAlt: "Blick durch die offene Tür in das Isarblick Labor mit Zentrifuge und Analysegeräten",
    },
    consultation: {
      title: "Befundgespräch",
      text: "Therapieentscheidungen treffen wir gemeinsam mit Ihnen – transparent.",
      imageAlt: "Therapeut untersucht den Rücken einer Patientin mit beiden Händen",
    },
    treatment: {
      title: "Behandlung",
      text: "Regenerativ, konservativ oder minimalinvasiv – oft noch am selben Tag.",
      imageAlt: "Stoßwellenbehandlung am Ellenbogen in der Isarblick Orthopädie",
    },
  },
  en: {
    arrival: {
      title: "Arrival",
      text: "A personal welcome, your medical history and time for all your questions.",
      imageAlt: "Isarblick reception desk with fresh tulips and the bright practice corridor behind",
    },
    imaging: {
      title: "Imaging",
      text: "X-ray, ultrasound and radiation-free spine measurement on site.",
      imageAlt: "Digital full-body photo documentation during skin cancer screening at Isarblick",
    },
    lab: {
      title: "Lab",
      text: "Blood values from the in-house Isarblick Lab – no external detours.",
      imageAlt: "View through the open door into the Isarblick Lab with centrifuge and analysers",
    },
    consultation: {
      title: "Consultation",
      text: "We make treatment decisions together with you – transparently.",
      imageAlt: "Therapist examining a patient’s back with both hands",
    },
    treatment: {
      title: "Treatment",
      text: "Regenerative, conservative or minimally invasive – often on the same day.",
      imageAlt: "Shockwave treatment of the elbow at Isarblick Orthopedics",
    },
  },
};

export const getSteps = (locale: Locale): Step[] =>
  order.map((id) => ({ ...base[id], ...texts[locale][id] }));
