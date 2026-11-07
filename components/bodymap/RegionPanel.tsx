import type { CSSProperties } from "react";
import type { Region } from "@/content/anatomy";
import type { Department, DepartmentId } from "@/content/departments";
import { site } from "@/content/site";
import { ArrowRight, Phone, Warning } from "../icons";
import type { ResultText } from "./ResultPanel";

interface RegionPanelProps {
  region: Region;
  departments: Record<DepartmentId, Department>;
  text: ResultText;
  titleId: string;
  /** The desktop panel pins the flag below the scroll area instead */
  showFlag?: boolean;
}

/**
 * Result for a hidden region (thigh, upper arm, lower leg): no marker on the figure, no
 * question – a short intro, booking for both departments and the generic red flag.
 */
export function RegionPanel({ region, departments, text, titleId, showFlag = true }: RegionPanelProps) {
  const depts = region.departments.map((id) => departments[id]);
  const primary = depts[0];
  if (!primary) return null;

  return (
    <div className="space-y-6" style={{ "--dept": primary.color } as CSSProperties}>
      <header>
        <p className="eyebrow flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {depts.map((dept, i) => (
            <span key={dept.id} className="flex items-center gap-2.5">
              {i > 0 ? <span className="text-subtle font-normal">&amp;</span> : null}
              <span className="size-2.5 rounded-full" style={{ background: dept.color }} aria-hidden="true" />
              <span style={{ color: dept.color }}>{dept.name}</span>
            </span>
          ))}
        </p>
        <h3 id={titleId} tabIndex={-1} className="h3 mt-2 pr-10 outline-none">
          {region.title}
        </h3>
        <p className="text-subtle mt-1 text-sm">{text.ui.freeText.regionLabel}</p>
        <p className="text-muted mt-2.5">{region.intro}</p>
      </header>

      <div className="border-line grid gap-3 border-t pt-5 sm:grid-cols-2">
        {depts.map((dept) => (
          <a
            key={dept.id}
            href={dept.ctaUrl}
            data-book={dept.id}
            target="_blank"
            rel="noopener"
            style={{ "--dept": dept.color } as CSSProperties}
            className="btn bg-(--dept) text-white transition-[filter] duration-200 hover:brightness-110"
          >
            {text.ui.freeText.book.replace("{dept}", dept.name)}
            <ArrowRight />
            <span className="sr-only"> {text.newTab}</span>
          </a>
        ))}
      </div>
      <a
        href={site.phone.href}
        className="text-navy inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
      >
        <Phone />
        {site.phone.display}
      </a>
      <p className="text-subtle text-sm">{text.ui.freeText.regionReview}</p>

      {showFlag ? (
        <div
          role="note"
          aria-label={text.ui.warningLabel}
          className="text-ink flex gap-3 rounded-xl border border-[#E9B98C] bg-[#FBEBDA] p-4 text-sm leading-normal"
        >
          <Warning className="mt-0.5 flex-none text-[#A8500A]" />
          <p>{text.genericFlag}</p>
        </div>
      ) : null}
    </div>
  );
}
