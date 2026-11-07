import type { SVGProps } from "react";

/**
 * The Isarblick arc – the one recurring motif, borrowed from the C/O arcs of the logo. A shallow
 * convex segment with a fixed curvature (ARC_PATH, pathLength 100) that stretches to its
 * box. Four uses on the page, no more: the arch photos, the edges of the navy Journey
 * section (CSS, .arc-edges), the card hover underline (ArcUnderline) and the two thin
 * lines – the intro's line and the review reading-time progress (ArcLine).
 */
export const ARC_PATH = "M0 10 Q50 -4 100 10";

/** 1px arc line, stroke in currentColor; `.arc-progress` animates it (globals.css) */
export function ArcLine({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        d={ARC_PATH}
        pathLength={100}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Thin arc under a card title; draws in on hover (CSS .arc-underline, colour --dept) */
export function ArcUnderline({ className }: { className?: string }) {
  return (
    <ArcLine
      className={`arc-underline pointer-events-none block h-[5px] w-14 ${className ?? ""}`}
      style={{ color: "var(--dept)" }}
    />
  );
}
