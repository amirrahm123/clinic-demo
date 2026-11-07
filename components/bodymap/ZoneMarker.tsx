import type { CSSProperties } from "react";
import type { Marker } from "@/content/bodyMap";

interface ZoneMarkerProps {
  marker: Marker;
  /** Position in the current view – drives the reveal stagger (--i) */
  index: number;
  label: string;
  deptName: string;
  color: string;
  /** Second department color for zones that involve two departments (split ring) */
  alsoColor?: string;
  /** Selected on the figure, or previewed from the search (same look) */
  selected: boolean;
  /** Brief attention pulse after the free-text router switched to this zone */
  pulsing?: boolean;
  onSelect: () => void;
  /** Pointer / keyboard focus entered (true) or left (false) – tints the body region */
  onHover?: (hovered: boolean) => void;
}

/**
 * A real 44×44 button on the figure. Hover: soft glow in the department color,
 * marker scales 1.15, label pill "Zone · Department". Selected: solid dot with
 * white ring, glow and label stay.
 */
export function ZoneMarker({
  marker,
  index,
  label,
  deptName,
  color,
  alsoColor,
  selected,
  pulsing = false,
  onSelect,
  onHover,
}: ZoneMarkerProps) {
  // Labels open away from the body's centre line so they never cover the figure.
  const labelSide = marker.x < 150 ? "right-full mr-1" : "left-full ml-1";
  const show = (whenSelected: string) => (selected ? whenSelected : "");

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${label} · ${deptName}`}
      onClick={onSelect}
      onPointerEnter={onHover ? () => onHover(true) : undefined}
      onPointerLeave={onHover ? () => onHover(false) : undefined}
      onFocus={onHover ? () => onHover(true) : undefined}
      onBlur={onHover ? () => onHover(false) : undefined}
      style={
        {
          left: `${(marker.x / 300) * 100}%`,
          top: `${(marker.y / 640) * 100}%`,
          "--dept": color,
          "--dept2": alsoColor ?? color,
          "--i": index,
        } as CSSProperties
      }
      className={`zone-marker group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${
        selected ? "z-20" : "z-10 hover:z-20 focus-visible:z-20"
      }`}
    >
      {/* Soft glow of the region */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute size-28 rounded-full transition-opacity duration-150 group-hover:opacity-50 group-focus-visible:opacity-50 ${
          selected ? "opacity-50" : "opacity-0"
        }`}
        style={{ background: "radial-gradient(circle, var(--dept) 0%, transparent 68%)" }}
      />

      {/* Pulsing ring – split in two colors when two departments are involved */}
      <span
        aria-hidden="true"
        className="zone-ring pointer-events-none absolute size-9 rounded-full"
        style={{
          background: alsoColor
            ? "conic-gradient(from -90deg, var(--dept) 0 50%, var(--dept2) 50% 100%)"
            : "var(--dept)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 0)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 0)",
        }}
      />

      {/* Route pulse: three expanding rings (1.8s) after "Show <zone>" */}
      {pulsing ? (
        <span
          aria-hidden="true"
          className="zone-route-ring pointer-events-none absolute size-9 rounded-full border-[3px] border-(--dept)"
        />
      ) : null}

      {/* Dot */}
      <span
        aria-hidden="true"
        className={`relative size-3 rounded-full bg-(--dept) ring-2 ring-white transition-transform duration-150 group-hover:scale-115 group-focus-visible:scale-115 ${show(
          "!size-4",
        )}`}
      />

      {/* Label pill: zone · department (department name in its color). Desktop only –
          on phones it would overflow the page horizontally and the sheet shows the title. */}
      <span
        aria-hidden="true"
        className={`shadow-float pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center gap-1.5 rounded-full bg-white py-1 pr-3 pl-2.5 text-sm font-semibold whitespace-nowrap transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 lg:flex ${labelSide} ${
          selected ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-navy">{label}</span>
        <span className="text-subtle">·</span>
        <span style={{ color: "var(--dept)" }}>{deptName}</span>
      </span>
    </button>
  );
}
