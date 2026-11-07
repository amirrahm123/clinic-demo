/**
 * Opening hours (content/site.ts openingHours) → "Open now · until 18:00" / "Closed · opens
 * Mon 8:00". Pure functions, Europe/Berlin via Intl – no library. Nothing renders while the
 * data is still TODO(client) (openingHours === null); see components/OpenNow.tsx.
 */

export type Weekday = "mo" | "tu" | "we" | "th" | "fr" | "sa" | "su";
export const WEEKDAYS: Weekday[] = ["mo", "tu", "we", "th", "fr", "sa", "su"];

/** "08:00"–"18:00" ranges per weekday; a day without entries is closed */
export type OpeningHours = Partial<Record<Weekday, [string, string][]>>;

export interface OpenStatus {
  open: boolean;
  /** Closing time today (open) or next opening time (closed), "HH:MM" */
  time: string;
  /** Weekday of the next opening – only when closed; undefined = later today */
  day?: Weekday;
}

const TZ = "Europe/Berlin";
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

/** Weekday + minutes since midnight in Europe/Berlin for a Date */
export function berlinNow(date: Date): { day: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  return { day: WEEKDAYS[dayIndex < 0 ? 0 : dayIndex] as Weekday, minutes: hour * 60 + Number(get("minute")) };
}

export function openStatus(hours: OpeningHours, date: Date): OpenStatus | null {
  const { day, minutes } = berlinNow(date);
  const today = hours[day] ?? [];
  for (const [from, to] of today) {
    if (minutes >= toMinutes(from) && minutes < toMinutes(to)) return { open: true, time: to };
  }
  // Closed: next opening later today, else on the next day with hours
  const later = today.find(([from]) => toMinutes(from) > minutes);
  if (later) return { open: false, time: later[0] };
  const start = WEEKDAYS.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const next = WEEKDAYS[(start + i) % 7] as Weekday;
    const first = hours[next]?.[0];
    if (first) return { open: false, time: first[0], day: next };
  }
  return null;
}

/** schema.org openingHoursSpecification entries */
export function openingHoursSpecification(hours: OpeningHours) {
  const names: Record<Weekday, string> = {
    mo: "Monday", tu: "Tuesday", we: "Wednesday", th: "Thursday", fr: "Friday", sa: "Saturday", su: "Sunday",
  };
  return WEEKDAYS.flatMap((d) =>
    (hours[d] ?? []).map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${names[d]}`,
      opens,
      closes,
    })),
  );
}
