import type { CSSProperties, ReactNode } from "react";
import type { Region, RegionId, TargetId } from "@/content/anatomy";
import type { Zone, ZoneId } from "@/content/bodyMap";
import type { Department, DepartmentId } from "@/content/departments";
import type { Doctor } from "@/content/doctors";
import type { Dictionary, Locale } from "@/content/i18n";
import { ArrowLeft, ArrowRight, Warning } from "../icons";
import { Photo } from "../Photo";
import { FreeText } from "./FreeText";

export interface ResultText {
  ui: Dictionary["bodyMap"];
  causesLabel: string;
  whyLabel: string;
  genericFlag: string;
  newTab: string;
}

interface ResultPanelProps {
  locale: Locale;
  zone: Zone;
  dept: Department;
  /** All departments – the free-text matcher suggests any of them */
  departments: Record<DepartmentId, Department>;
  /** All zones and hidden regions – the free-text matcher routes to any of them */
  zones: Record<ZoneId, Zone>;
  regions: Record<RegionId, Region>;
  onRoute: (target: TargetId, dept?: DepartmentId) => void;
  onSuggest: (targets: TargetId[]) => void;
  also: Department | null;
  doctor: Doctor;
  text: ResultText;
  /** Index of the chosen answer for zones with a question */
  answer: number | null;
  onAnswer: (index: number | null) => void;
  /** id for the title element (the mobile sheet uses it as dialog label) */
  titleId: string;
  /** The desktop panel pins the flag below the scroll area instead */
  showFlag?: boolean;
  /** The free-text match points to another area: only its card is shown, nothing of this one below */
  hideDetails?: boolean;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow !text-sm">{title}</h4>
      <div className="text-ink mt-2 text-sm leading-normal">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            className="mt-[0.5625rem] size-1.5 flex-none rounded-full bg-(--dept)"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** 4 — Red flag: zone-specific warning, or the generic one. */
export function ZoneFlag({ zone, text }: { zone: Zone; text: ResultText }) {
  return (
    <div
      role="note"
      aria-label={text.ui.warningLabel}
      className="text-ink flex gap-3 rounded-xl border border-[#E9B98C] bg-[#FBEBDA] p-4 text-sm leading-normal"
    >
      <Warning className="mt-0.5 flex-none text-[#A8500A]" />
      <p>{zone.flag ?? text.genericFlag}</p>
    </div>
  );
}

/** Content of the body-map result: shared by the desktop panel and the mobile sheet. */
export function ResultPanel({
  locale,
  zone,
  dept,
  departments,
  zones,
  regions,
  onRoute,
  onSuggest,
  also,
  doctor,
  text,
  answer,
  onAnswer,
  titleId,
  showFlag = true,
  hideDetails = false,
}: ResultPanelProps) {
  const chosen = answer !== null ? (zone.question.options[answer] ?? null) : null;
  const external = dept.ctaUrl.startsWith("#");

  return (
    <div className="space-y-6" style={{ "--dept": dept.color } as CSSProperties}>
      {/* 1 — Zone header (department color: dot + name) */}
      <header>
        <p className="eyebrow flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-(--dept)" aria-hidden="true" />
          <span style={{ color: "var(--dept)" }}>{dept.name}</span>
          <span className="text-subtle font-normal tracking-normal normal-case">
            · {dept.short}
          </span>
        </p>
        {/* tabIndex -1: the free-text router moves focus here after switching zones */}
        <h3 id={titleId} tabIndex={-1} className="h3 mt-2 pr-10 outline-none">
          {zone.title}
        </h3>
        <p className="text-muted mt-2.5">{zone.intro}</p>
      </header>

      {/* 2 — Question → causes + why */}
      {!chosen ? (
        <fieldset>
          <legend className="text-navy font-semibold">{zone.question.text}</legend>
          <div className="mt-3 grid gap-2">
            {zone.question.options.map((option, index) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onAnswer(index)}
                className="border-line-strong text-navy flex min-h-12 items-center justify-between gap-3 rounded-xl border bg-white px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 hover:border-(--dept) hover:bg-(--dept) hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
          {/* 4th option: free text with a client-side department matcher */}
          <FreeText
            key={zone.id}
            locale={locale}
            text={text.ui.freeText}
            departments={departments}
            zones={zones}
            regions={regions}
            currentZone={zone.id}
            newTab={text.newTab}
            onRoute={onRoute}
            onSuggest={onSuggest}
          />
        </fieldset>
      ) : null}

      {hideDetails ? null : (
        <>
      {chosen ? (
        <div className="bg-sand flex flex-wrap items-center justify-between gap-x-4 rounded-xl px-4 py-2">
          <p className="text-navy text-sm font-semibold">{chosen.label}</p>
          <button
            type="button"
            onClick={() => onAnswer(null)}
            className="text-navy inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold underline underline-offset-4"
          >
            <ArrowLeft />
            {text.ui.otherAnswer}
          </button>
        </div>
      ) : null}

      {/* Urgent answers (e.g. "noticed a change") show the red flag right here */}
      {chosen?.urgent ? <ZoneFlag zone={zone} text={text} /> : null}

      {chosen ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Block title={zone.causesLabel ?? text.causesLabel}>
            <BulletList items={chosen.causes} />
          </Block>
          <Block title={zone.whyLabel ?? text.whyLabel}>
            <p>{chosen.why}</p>
          </Block>
        </div>
      ) : null}

      {/* 3 — Diagnostics, therapy, doctor, CTA */}
      <div className="border-line grid gap-5 border-t pt-5 sm:grid-cols-2">
        <Block title={text.ui.diagLabel}>
          <p>{zone.diag}</p>
        </Block>
        <Block title={text.ui.therapyLabel}>
          <BulletList items={zone.therapy} />
        </Block>
      </div>

      <div className="border-line flex flex-wrap items-center gap-x-5 gap-y-4 border-t pt-5">
        <div className="flex min-w-0 flex-1 basis-56 items-center gap-3">
          <span className="bg-sand relative size-14 flex-none overflow-hidden rounded-full border-b-[3px] border-(--dept)">
            <Photo
              src={doctor.image}
              alt=""
              sizes="56px"
              position="50% 30%"
              className="object-cover"
            />
          </span>
          <p className="text-muted min-w-0 text-sm leading-snug">
            <span className="font-display text-navy block text-lg leading-tight">
              {doctor.name}
            </span>
            <span className="font-condensed mt-0.5 inline-flex min-h-5 items-center rounded-full bg-(--dept) px-2 text-sm font-semibold tracking-[0.12em] text-white uppercase">
              {dept.name}
            </span>
            <span className="block">{doctor.role}</span>
          </p>
        </div>
        <a
          href={dept.ctaUrl}
          data-book={dept.id}
          target="_blank"
          rel="noopener"
          className="btn bg-(--dept) text-white transition-[filter] duration-200 hover:brightness-110"
        >
          {dept.cta}
          <ArrowRight />
          <span className="sr-only">
            {external ? `${dept.name} ${text.ui.viaDoctolib} ` : `${dept.name} `}
            {text.newTab}
          </span>
        </a>
        {also ? (
          <p className="text-muted w-full text-sm">
            {text.ui.alsoRelevant}{" "}
            <a
              href={also.href}
              className="text-navy inline-flex min-h-6 items-center gap-1.5 font-semibold underline underline-offset-4"
            >
              <span
                className="size-2 rounded-full"
                style={{ background: also.color }}
                aria-hidden="true"
              />
              {also.name}
            </a>
          </p>
        ) : null}
      </div>

      {showFlag ? <ZoneFlag zone={zone} text={text} /> : null}
        </>
      )}
    </div>
  );
}
