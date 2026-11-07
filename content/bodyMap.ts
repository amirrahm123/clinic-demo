import type { DepartmentId } from "./departments";
import type { DoctorId } from "./doctors";
import type { Locale } from "./i18n";
import { bodyMapDe } from "./bodyMap.de";
import { bodyMapEn } from "./bodyMap.en";

export type ZoneId =
  // spots on the figure
  | "gesicht"
  | "nacken"
  | "schulter"
  | "oben"
  | "ellenbogen"
  | "hand"
  | "ruecken"
  | "brust"
  | "gyne"
  | "huefte"
  | "knie"
  | "fuss"
  | "ferse"
  // topics (not tied to a spot)
  | "wechseljahre"
  | "beckenboden"
  | "vorsorge"
  | "intimlaser"
  | "hautkrebs"
  | "haut"
  | "dermalaser"
  | "aesthetik"
  | "hautbild"
  | "chirurgie"
  | "labor"
  | "schnelltest";

export type BodyView = "front" | "back";

export interface ZoneAnswer {
  label: string;
  /** Exactly three bullets */
  causes: [string, string, string];
  why: string;
  /** Show the red-flag box right under this answer (e.g. "noticed a change") */
  urgent?: true;
}

/** Every zone asks exactly one question with exactly three answers. */
export interface ZoneQuestion {
  text: string;
  options: [ZoneAnswer, ZoneAnswer, ZoneAnswer];
}

/** Translated zone copy. */
export interface ZoneText {
  /** Marker / list label */
  short: string;
  /** Label on topic chips, if different from `short` */
  chipLabel?: string;
  title: string;
  intro: string;
  /** Required: a zone without a question (or with ≠ 3 answers) fails typecheck */
  question: ZoneQuestion;
  /** Labels of the causes/why blocks, if different from the generic ones */
  causesLabel?: string;
  whyLabel?: string;
  diag: string;
  therapy: string[];
  /** Zone-specific red flag; falls back to the generic one */
  flag?: string;
}

/** Locale-independent zone data. */
export interface ZoneMeta {
  id: ZoneId;
  kind: "spot" | "topic";
  dept: DepartmentId;
  also?: DepartmentId;
  doc: DoctorId;
}

export type Zone = ZoneMeta & ZoneText;

export interface BodyMapText {
  genericFlag: string;
  causesLabel: string;
  whyLabel: string;
  disclaimer: string;
  zones: Record<ZoneId, ZoneText>;
}

export const DEFAULT_ZONE: ZoneId = "knie";

export const zoneMeta: Record<ZoneId, ZoneMeta> = {
  gesicht: { id: "gesicht", kind: "spot", dept: "aesthetic", also: "derma", doc: "wagner" },
  nacken: { id: "nacken", kind: "spot", dept: "ortho", also: "physio", doc: "hoffmann" },
  schulter: { id: "schulter", kind: "spot", dept: "ortho", also: "physio", doc: "weber" },
  oben: { id: "oben", kind: "spot", dept: "physio", also: "ortho", doc: "hoffmann" },
  ellenbogen: { id: "ellenbogen", kind: "spot", dept: "ortho", also: "physio", doc: "weber" },
  hand: { id: "hand", kind: "spot", dept: "ortho", doc: "weber" },
  ruecken: { id: "ruecken", kind: "spot", dept: "ortho", also: "physio", doc: "brandt" },
  brust: { id: "brust", kind: "spot", dept: "gyne", doc: "fischer" },
  gyne: { id: "gyne", kind: "spot", dept: "gyne", doc: "fischer" },
  huefte: { id: "huefte", kind: "spot", dept: "ortho", also: "physio", doc: "klein" },
  knie: { id: "knie", kind: "spot", dept: "ortho", also: "physio", doc: "klein" },
  fuss: { id: "fuss", kind: "spot", dept: "ortho", also: "physio", doc: "brandt" },
  ferse: { id: "ferse", kind: "spot", dept: "ortho", also: "physio", doc: "brandt" },

  wechseljahre: { id: "wechseljahre", kind: "topic", dept: "gyne", doc: "fischer" },
  beckenboden: { id: "beckenboden", kind: "topic", dept: "gyne", doc: "fischer" },
  vorsorge: { id: "vorsorge", kind: "topic", dept: "gyne", doc: "fischer" },
  intimlaser: { id: "intimlaser", kind: "topic", dept: "gyne", doc: "fischer" },
  hautkrebs: { id: "hautkrebs", kind: "topic", dept: "derma", doc: "schaefer" },
  haut: { id: "haut", kind: "topic", dept: "derma", doc: "schaefer" },
  dermalaser: { id: "dermalaser", kind: "topic", dept: "derma", doc: "neumann" },
  aesthetik: { id: "aesthetik", kind: "topic", dept: "aesthetic", doc: "wagner" },
  hautbild: { id: "hautbild", kind: "topic", dept: "aesthetic", doc: "wagner" },
  chirurgie: { id: "chirurgie", kind: "topic", dept: "aesthetic", doc: "wagner" },
  labor: { id: "labor", kind: "topic", dept: "labor", doc: "weber" },
  schnelltest: { id: "schnelltest", kind: "topic", dept: "labor", doc: "weber" },
};

export interface Marker {
  zone: ZoneId;
  /** Coordinates in the 300 × 640 figure viewBox */
  x: number;
  y: number;
}

export const markers: Record<BodyView, Marker[]> = {
  front: [
    { zone: "gesicht", x: 150, y: 50 },
    { zone: "schulter", x: 100, y: 130 },
    { zone: "brust", x: 150, y: 168 },
    { zone: "ellenbogen", x: 74, y: 240 },
    { zone: "gyne", x: 150, y: 286 },
    { zone: "huefte", x: 100, y: 322 },
    { zone: "hand", x: 52, y: 366 },
    { zone: "knie", x: 181, y: 470 },
    { zone: "fuss", x: 114, y: 604 },
  ],
  back: [
    { zone: "nacken", x: 150, y: 100 },
    { zone: "schulter", x: 200, y: 130 },
    { zone: "oben", x: 150, y: 176 },
    { zone: "ruecken", x: 150, y: 276 },
    { zone: "ferse", x: 184, y: 602 },
  ],
};

/** Topic chips per department (shown when that department is selected). */
export const departmentTopics: Record<DepartmentId, ZoneId[]> = {
  ortho: [],
  physio: [],
  derma: ["hautkrebs", "haut", "dermalaser"],
  aesthetic: ["aesthetik", "hautbild", "chirurgie"],
  gyne: ["wechseljahre", "beckenboden", "vorsorge", "intimlaser"],
  labor: ["labor", "schnelltest"],
};

/** All zones in reading order for the accessible text list. */
export const zoneOrder: ZoneId[] = [
  "gesicht",
  "nacken",
  "schulter",
  "oben",
  "brust",
  "ellenbogen",
  "hand",
  "ruecken",
  "huefte",
  "gyne",
  "knie",
  "fuss",
  "ferse",
  "hautkrebs",
  "haut",
  "dermalaser",
  "aesthetik",
  "hautbild",
  "chirurgie",
  "wechseljahre",
  "beckenboden",
  "vorsorge",
  "intimlaser",
  "labor",
  "schnelltest",
];

const texts: Record<Locale, BodyMapText> = { de: bodyMapDe, en: bodyMapEn };

export interface BodyMapContent {
  genericFlag: string;
  causesLabel: string;
  whyLabel: string;
  disclaimer: string;
  zones: Record<ZoneId, Zone>;
}

export function getBodyMap(locale: Locale): BodyMapContent {
  const t = texts[locale];
  const zones = Object.fromEntries(
    (Object.keys(zoneMeta) as ZoneId[]).map((id) => [id, { ...zoneMeta[id], ...t.zones[id] }]),
  ) as Record<ZoneId, Zone>;
  return { ...t, zones };
}

/** Zones (spots + topics) that belong to a department, incl. "also" involvement. */
export function zonesOfDepartment(dept: DepartmentId): ZoneId[] {
  return (Object.keys(zoneMeta) as ZoneId[]).filter(
    (id) => zoneMeta[id].dept === dept || zoneMeta[id].also === dept,
  );
}

/** Which side of the figure shows a zone (topics keep the current view). */
export function viewForZone(zone: ZoneId, current: BodyView): BodyView {
  const onFront = markers.front.some((m) => m.zone === zone);
  const onBack = markers.back.some((m) => m.zone === zone);
  if (onFront && onBack) return current;
  if (onFront) return "front";
  if (onBack) return "back";
  return current;
}

/** Zones treated by Orthopedics (primary or "also") – an injury puts the Orthopedics view first. */
export function isMusculoskeletal(zone: ZoneId): boolean {
  const meta = zoneMeta[zone];
  return meta.dept === "ortho" || meta.also === "ortho";
}

export function isZoneId(value: string): value is ZoneId {
  return value in zoneMeta;
}
