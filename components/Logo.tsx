import type { SVGProps } from "react";

// The four parts of the Isarblick mark. Class names are part of the contract:
// the intro animates .p-r, .p-ol, .p-or and .p-c individually.
function MarkPaths() {
  // DEMO mark (fictional clinic): pillar, rising sun, river, dot.
  return (
    <>
      <path className="p-r" d="M56,4a6,6,0,0,1,6,6v56a6,6,0,0,1-12,0v-56a6,6,0,0,1,6-6Z" />
      <path className="p-ol" d="M88,44a32,32,0,0,1,64,0h-10a22,22,0,0,0-44,0Z" />
      <path className="p-or" d="M78,58q21-11,42,0t42,0v10q-21-11-42,0t-42,0Z" />
      <path className="p-c" d="M172,4a8,8,0,1,1,0,16a8,8,0,1,1,0-16Z" />
    </>
  );
}

/** Mark only (no wordmark). Decorative by default – label the surrounding link instead. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="44 0 137 76" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <MarkPaths />
    </svg>
  );
}

/**
 * Wordmark "PRAXISKLINIK ISARBLICK".
 * TODO(client): swap in the official vector wordmark – only a raster logo was available,
 * so it is recreated as live text in Barlow Condensed 600.
 */
export function LogoWordmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 91 225.3 16.4"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <WordmarkText />
    </svg>
  );
}

function WordmarkText() {
  return (
    <text
      x="0.5"
      y="105.6"
      textLength="224.3"
      lengthAdjust="spacing"
      style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "17.5px" }}
    >
      PRAXISKLINIK ISARBLICK
    </text>
  );
}

/** Full logo: mark + wordmark, viewBox 0 0 225.3 107.4. */
export function LogoFull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 225.3 107.4"
      fill="currentColor"
      role="img"
      aria-label="Praxisklinik Isarblick"
      {...props}
    >
      <MarkPaths />
      <WordmarkText />
    </svg>
  );
}
