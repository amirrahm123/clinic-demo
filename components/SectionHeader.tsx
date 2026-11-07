import type { ReactNode } from "react";

interface SectionHeaderProps {
  id: string;
  /** Plain heading; one optional *accent* word rendered italic (e.g. Journey) */
  title: string;
  /** Intro paragraph directly under the heading – same left edge, max 56ch, lead size */
  intro?: string;
  /**
   * Right column (grid columns 9–12), top-aligned with the heading's first line – for
   * short fact lines or actions, never a floating paragraph.
   */
  aside?: ReactNode;
  /** Centered heading with the intro centered under it (max 52ch) */
  center?: boolean;
}

/** Splits "text *accent* text" into nodes; the accent becomes <em class="h-accent">. */
export function accentTitle(title: string): ReactNode {
  const parts = title.split(/\*([^*]+)\*/);
  if (parts.length === 1) return title;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="h-accent">
        {part}
      </em>
    ) : (
      part
    ),
  );
}

/**
 * Section intro. Default: heading + intro as one unit (intro under the heading, 20px gap).
 * With `aside`: heading in columns 1–7, the aside in 9–12 aligned to the heading's top.
 * With `center`: both centered. The two-line hero heading is the only other heading style.
 */
export function SectionHeader({ id, title, intro, aside, center }: SectionHeaderProps) {
  const heading = (
    <h2 id={id} className="h2 outline-none" data-reveal="heading" tabIndex={-1}>
      {accentTitle(title)}
    </h2>
  );
  const lead = intro ? (
    <p
      data-reveal="text"
      className={`lead mt-5 ${center ? "mx-auto max-w-[52ch]" : "max-w-[56ch]"}`}
    >
      {intro}
    </p>
  ) : null;

  if (aside) {
    return (
      <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          {heading}
          {lead}
        </div>
        {/* pt aligns the first fact line with the heading's cap height */}
        <div data-reveal="text" className="lg:col-span-4 lg:col-start-9 lg:pt-3">
          {aside}
        </div>
      </div>
    );
  }
  return (
    <div className={center ? "text-center" : ""}>
      {heading}
      {lead}
    </div>
  );
}
