import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/i18n";

/**
 * Schematic route map Munich → Bogenhausen in brand colours. Geometry is an inline SVG (no
 * tiles, no requests); labels are HTML positioned over it, so they stay 14px on screen at
 * every size and carry a small ivory halo – lines never cut through text. Strokes use
 * vector-effect: non-scaling-stroke (roads 4px, rails 2px, buses 1.5px on screen).
 *
 * Two layouts (desktop 800 × 420, phone 360 × 270) with their own positions so nothing
 * collides. Street address and entrance details live in the text column, not here.
 *
 * TODO(client): verify route details (bus lines 263/230 and their stops, the car park
 * entrance, which S2 station is recommended) before launch.
 */
type LabelKey = keyof Dictionary["visit"]["map"]["labels"];
type Label = { key: LabelKey; x: number; y: number; badge?: "road" | "s2" | "u2"; bus?: boolean; strong?: boolean };
type Layout = {
  w: number;
  h: number;
  munich: [number, number, number, number]; // cx cy rx ry
  aschheim: [number, number, number, number];
  a94: string;
  a99: string;
  s2: string;
  u2: string;
  bus263: string;
  bus230: string;
  feldkirchen: [number, number];
  messestadtWest: [number, number];
  pin: [number, number];
  parking: [number, number];
  labels: Label[];
};

const DESKTOP: Layout = {
  w: 800,
  h: 420,
  munich: [110, 210, 160, 150],
  aschheim: [690, 330, 85, 60],
  a94: "M0 230H800",
  a99: "M590 20C560 150 560 280 600 400",
  s2: "M0 120C200 120 400 118 800 100",
  u2: "M0 300H450",
  bus263: "M450 300C520 310 600 330 652 318",
  bus230: "M700 106C742 180 742 250 704 302",
  feldkirchen: [700, 106],
  messestadtWest: [450, 300],
  pin: [680, 314],
  parking: [732, 300],
  labels: [
    { key: "munich", x: 60, y: 70, strong: true },
    { key: "aschheim", x: 690, y: 396, strong: true },
    { key: "a94", x: 300, y: 230, badge: "road" },
    { key: "a99", x: 582, y: 62, badge: "road" },
    { key: "s2", x: 150, y: 120, badge: "s2" },
    { key: "u2", x: 150, y: 300, badge: "u2" },
    { key: "feldkirchen", x: 700, y: 78 },
    { key: "messestadtWest", x: 450, y: 326 },
    { key: "bus263", x: 520, y: 356, bus: true },
    { key: "bus230", x: 766, y: 204, bus: true },
    { key: "roc", x: 680, y: 346, strong: true },
  ],
};

const PHONE: Layout = {
  w: 360,
  h: 270,
  munich: [30, 135, 100, 110],
  aschheim: [305, 218, 50, 40],
  a94: "M0 150H360",
  a99: "M258 10V260",
  s2: "M0 80C100 80 200 78 360 70",
  u2: "M0 200H170",
  bus263: "M170 200C210 215 255 232 282 216",
  bus230: "M300 72C332 120 332 170 302 204",
  feldkirchen: [300, 72],
  messestadtWest: [170, 200],
  pin: [293, 214],
  parking: [320, 206],
  labels: [
    { key: "munich", x: 44, y: 36, strong: true },
    { key: "aschheim", x: 300, y: 256, strong: true },
    { key: "a94", x: 110, y: 150, badge: "road" },
    { key: "a99", x: 258, y: 182, badge: "road" },
    { key: "s2", x: 50, y: 80, badge: "s2" },
    { key: "u2", x: 50, y: 200, badge: "u2" },
    { key: "feldkirchen", x: 296, y: 50 },
    { key: "messestadtWest", x: 150, y: 224 },
    { key: "bus263", x: 215, y: 248, bus: true },
    { key: "bus230", x: 290, y: 134, bus: true },
    { key: "roc", x: 284, y: 236, strong: true },
  ],
};

const C = {
  land: "var(--color-sand)",
  city: "rgba(0, 45, 85, 0.08)",
  road: "var(--color-navy-soft)",
  rail: "var(--color-navy)",
  u2: "var(--color-dept-ortho)",
  s2: "var(--color-dept-physio)",
  bus: "var(--color-dept-derma)",
  pin: "var(--color-orange)",
  white: "#fff",
};
const NS = { vectorEffect: "non-scaling-stroke" as const, fill: "none", strokeLinecap: "round" as const };

export function VisitMap({ text, compact }: { text: Dictionary["visit"]["map"]; compact?: boolean }) {
  const L = compact ? PHONE : DESKTOP;
  const id = compact ? "map-m" : "map-d";
  const pct = (x: number, y: number): CSSProperties => ({
    left: `${(x / L.w) * 100}%`,
    top: `${(y / L.h) * 100}%`,
  });
  const station = ([x, y]: [number, number], color: string) => (
    <circle cx={x} cy={y} r={compact ? 4.5 : 6} fill={C.white} stroke={color} strokeWidth={2} vectorEffect="non-scaling-stroke" />
  );

  return (
    <figure
      className="relative m-0 w-full overflow-hidden rounded-[20px]"
      style={{ aspectRatio: `${L.w} / ${L.h}`, background: C.land }}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
    >
      <figcaption id={`${id}-title`} className="sr-only">
        {text.title}
      </figcaption>
      <p id={`${id}-desc`} className="sr-only">
        {text.desc}
      </p>

      <svg viewBox={`0 0 ${L.w} ${L.h}`} className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <ellipse cx={L.munich[0]} cy={L.munich[1]} rx={L.munich[2]} ry={L.munich[3]} fill={C.city} />
        <ellipse cx={L.aschheim[0]} cy={L.aschheim[1]} rx={L.aschheim[2]} ry={L.aschheim[3]} fill={C.city} />
        <path d={L.a99} stroke={C.road} strokeWidth={4} {...NS} />
        <path d={L.a94} stroke={C.road} strokeWidth={4} {...NS} />
        <path d={L.s2} stroke={C.s2} strokeWidth={2} {...NS} />
        <path d={L.u2} stroke={C.u2} strokeWidth={2} {...NS} />
        <path d={L.bus263} stroke={C.bus} strokeWidth={1.5} strokeDasharray="4 4" {...NS} />
        <path d={L.bus230} stroke={C.bus} strokeWidth={1.5} strokeDasharray="4 4" {...NS} />
        {station(L.feldkirchen, C.s2)}
        {station(L.messestadtWest, C.u2)}
        {/* Isarblick pin */}
        <g transform={`translate(${L.pin[0]} ${L.pin[1]})${compact ? " scale(0.8)" : ""}`}>
          <path d="M0 0C-7-9-14-16-14-25a14 14 0 0 1 28 0c0 9-7 16-14 25Z" fill={C.pin} />
          <circle cx={0} cy={-25} r={5.5} fill={C.white} />
        </g>
      </svg>

      {/* Car park: always-legible "P" badge */}
      <span
        aria-label={text.labels.parking}
        role="img"
        className="bg-navy absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[4px] text-[12px] font-bold text-white"
        style={pct(L.parking[0], L.parking[1])}
      >
        P
      </span>

      {L.labels.map((l) => {
        const cls = l.badge
          ? `text-white text-[12px] font-bold tracking-[0.04em] px-1.5 py-0.5 rounded-[5px] ${
              l.badge === "road" ? "bg-navy-soft" : l.badge === "s2" ? "bg-dept-physio" : "bg-dept-ortho"
            }`
          : `bg-ivory/90 rounded px-1 text-[14px] leading-tight ${
              l.bus ? "text-dept-derma font-medium" : l.strong ? "text-navy font-semibold" : "text-ink"
            }`;
        return (
          <span
            key={l.key}
            aria-hidden="true"
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap ${cls}`}
            style={pct(l.x, l.y)}
          >
            {text.labels[l.key]}
          </span>
        );
      })}
    </figure>
  );
}
