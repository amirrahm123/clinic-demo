import type { BodyView, ZoneId } from "@/content/bodyMap";

/**
 * Gender-neutral line-art figure, viewBox 0 0 300 640 (the marker coordinates in
 * content/bodyMap.ts refer to this grid). 1.25px navy-soft strokes that stay 1.25px at any
 * size (non-scaling-stroke), a soft sand fill, no face and no genital detail.
 *
 * The silhouette is written once for the left half and mirrored in code, so both sides
 * are symmetric by construction. Front and back share it; only the inner lines differ.
 */

type Cubic = [number, number, number, number, number, number];

const START: [number, number] = [138, 84];

/** Left half, neck → shoulder → arm → hand → torso side → leg → foot → crotch (viewer's left) */
const LEFT: Cubic[] = [
  [138, 92, 137, 98, 137, 106], // neck
  [118, 108, 100, 112, 90, 122], // trapezius slope
  [80, 132, 76, 146, 74, 162], // shoulder, upper arm (outer)
  [71, 186, 68, 214, 66, 238], // elbow
  [63, 270, 57, 306, 52, 338], // forearm
  [48, 352, 44, 366, 43, 378], // hand (outer)
  [42, 388, 46, 394, 52, 394], // fingertips
  [58, 394, 62, 388, 63, 378],
  [64, 366, 66, 354, 68, 342], // hand (inner)
  [72, 308, 80, 272, 84, 244], // forearm (inner)
  [86, 218, 92, 188, 100, 156], // upper arm (inner) to the armpit
  [100, 190, 104, 222, 106, 252], // ribs, waist
  [108, 280, 100, 300, 96, 322], // hip
  [92, 350, 94, 400, 100, 440], // thigh (outer)
  [102, 456, 100, 466, 100, 478], // knee
  [98, 500, 94, 520, 96, 540], // calf
  [98, 560, 104, 580, 106, 596], // ankle
  [98, 600, 88, 606, 86, 614], // foot
  [85, 624, 94, 628, 106, 628],
  [120, 628, 134, 626, 136, 618],
  [136, 610, 128, 604, 124, 596], // ankle (inner)
  [125, 580, 129, 560, 132, 540], // calf (inner)
  [133, 520, 134, 500, 136, 482], // knee (inner)
  [138, 470, 138, 460, 139, 448], // thigh (inner)
  [141, 420, 146, 390, 150, 356], // to the crotch
];

const f = (n: number) => String(Math.round(n * 100) / 100);

/** Right half = left half mirrored on x = 150 and walked backwards (crotch → neck) */
function buildBody(): string {
  const mirror = (x: number) => 300 - x;
  const points: [number, number][] = [START];
  for (const seg of LEFT) points.push([seg[4], seg[5]]);
  let d = `M${f(START[0])} ${f(START[1])}`;
  for (const s of LEFT) d += `C${s.map(f).join(" ")}`;
  for (let i = LEFT.length - 1; i >= 0; i--) {
    const [c1x, c1y, c2x, c2y] = LEFT[i] as Cubic;
    const to = points[i] as [number, number];
    d += `C${f(mirror(c2x))} ${f(c2y)} ${f(mirror(c1x))} ${f(c1y)} ${f(mirror(to[0]))} ${f(to[1])}`;
  }
  return `${d}Z`;
}

const BODY = buildBody();
const HEAD = { cx: 150, cy: 52, rx: 28, ry: 35 };

/** Inner lines for the left half; the right half is the mirror image (see <Mirrored>) */
const DETAIL: Record<BodyView, string[]> = {
  front: [
    "M137 110C126 112 112 116 100 123", // collarbone
    "M112 301C124 317 138 331 150 341", // hip crease
    "M74 232C77 238 79 242 82 246", // elbow
    "M110 470C112 462 126 462 128 470C126 478 112 478 110 470", // kneecap
  ],
  back: [
    "M118 138C111 158 119 180 141 188", // shoulder blade
    "M104 332C112 354 136 360 150 354", // gluteal fold
    "M100 466C112 470 126 470 138 466", // back of the knee
  ],
};
const CENTER_LINE: Record<BodyView, string | null> = {
  front: "M150 106V112", // sternal notch
  back: "M150 86V330", // spine
};

/**
 * Body regions that take a soft tint when their marker is hovered/focused/selected,
 * in figure coordinates (clipped to the silhouette). Same side as the marker.
 */
type Shape = { cx: number; cy: number; rx: number; ry: number };
const REGIONS: Record<BodyView, Partial<Record<ZoneId, Shape>>> = {
  front: {
    gesicht: { cx: 150, cy: 52, rx: 30, ry: 37 },
    schulter: { cx: 100, cy: 132, rx: 24, ry: 22 },
    brust: { cx: 150, cy: 168, rx: 46, ry: 34 },
    ellenbogen: { cx: 74, cy: 240, rx: 17, ry: 24 },
    gyne: { cx: 150, cy: 288, rx: 36, ry: 30 },
    huefte: { cx: 100, cy: 322, rx: 24, ry: 28 },
    hand: { cx: 52, cy: 368, rx: 17, ry: 32 },
    knie: { cx: 181, cy: 470, rx: 24, ry: 30 },
    fuss: { cx: 114, cy: 608, rx: 28, ry: 18 },
  },
  back: {
    nacken: { cx: 150, cy: 98, rx: 17, ry: 20 },
    schulter: { cx: 200, cy: 132, rx: 24, ry: 22 },
    oben: { cx: 150, cy: 178, rx: 48, ry: 42 },
    ruecken: { cx: 150, cy: 278, rx: 42, ry: 36 },
    ferse: { cx: 184, cy: 608, rx: 19, ry: 17 },
  },
};

const LINE = {
  stroke: "var(--color-navy-soft)",
  strokeWidth: 1.25,
  vectorEffect: "non-scaling-stroke" as const,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Mirrored({ d, opacity }: { d: string; opacity: number }) {
  return (
    <>
      <path d={d} {...LINE} opacity={opacity} />
      <path d={d} {...LINE} opacity={opacity} transform="translate(300 0) scale(-1 1)" />
    </>
  );
}

interface BodyFigureProps {
  className?: string;
  view: BodyView;
  /** Zones whose region is tinted (hovered / focused / selected) */
  active: ZoneId[];
  /** Department colour per zone */
  colors: Partial<Record<ZoneId, string>>;
}

export function BodyFigure({ className, view, active, colors }: BodyFigureProps) {
  const regions = REGIONS[view];
  const center = CENTER_LINE[view];
  return (
    <svg
      viewBox="0 0 300 640"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-view={view}
    >
      <defs>
        <clipPath id="figure-clip">
          <path d={BODY} />
          <ellipse {...HEAD} />
        </clipPath>
      </defs>

      {/* silhouette: sand fill + outline */}
      <path d={BODY} fill="var(--color-figure)" />
      <ellipse {...HEAD} fill="var(--color-figure)" />

      {/* hover / selection tint: department colour at 15 %, clipped to the body */}
      <g clipPath="url(#figure-clip)">
        {(Object.keys(regions) as ZoneId[]).map((zone) => {
          const shape = regions[zone];
          if (!shape) return null;
          return (
            <ellipse
              key={zone}
              {...shape}
              fill={colors[zone] ?? "transparent"}
              fillOpacity={0.15}
              className="figure-region"
              data-active={active.includes(zone) || undefined}
            />
          );
        })}
      </g>

      <path d={BODY} {...LINE} opacity={0.9} />
      <ellipse {...HEAD} {...LINE} opacity={0.9} />
      {DETAIL[view].map((d) => (
        <Mirrored key={d} d={d} opacity={0.45} />
      ))}
      {center ? <path d={center} {...LINE} opacity={0.45} strokeDasharray={view === "back" ? "1 5" : undefined} /> : null}
    </svg>
  );
}
