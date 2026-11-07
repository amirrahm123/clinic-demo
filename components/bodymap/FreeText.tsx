"use client";

import { useId, useState, type CSSProperties, type KeyboardEvent } from "react";
import { isRegionId, type Region, type RegionId, type TargetId } from "@/content/anatomy";
import { isMusculoskeletal, type Zone, type ZoneId } from "@/content/bodyMap";
import type { Department, DepartmentId } from "@/content/departments";
import type { Dictionary, Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { matchFreeText, type MatchResult } from "@/lib/freeTextMatch";
import { ArrowRight, Phone, Warning } from "../icons";

const MAX_CHARS = 300;
const MIN_CHARS = 2;

interface FreeTextProps {
  locale: Locale;
  text: Dictionary["bodyMap"]["freeText"];
  departments: Record<DepartmentId, Department>;
  zones: Record<ZoneId, Zone>;
  /** Hidden regions (thigh, upper arm, lower leg) the router can open like a zone */
  regions: Record<RegionId, Region>;
  /** The zone whose panel the text is typed in; null on the search screen (no zone yet) */
  currentZone: ZoneId | null;
  newTab: string;
  /** Text to start with when the field is opened (what was typed into the search box) */
  prefill?: string;
  /** Open another zone/region (the panel swaps, the marker pulses, focus moves to the title),
   *  optionally in a department view (Orthopedics after an injury word) */
  onRoute: (target: TargetId, dept?: DepartmentId) => void;
  /** Report the matched targets after a submit (the panel hides its red flag when the
   *  match points elsewhere); [] clears */
  onSuggest: (targets: TargetId[]) => void;
}

/** "Lower back" → "lower back" inside an English sentence; German nouns stay capitalised. */
const inSentence = (label: string, locale: Locale) =>
  locale === "en" ? label.charAt(0).toLowerCase() + label.slice(1) : label;

/** Emergency box (call 112) – shown by the free text and the symptom search for red-flag words. */
export function EmergencyBox({ text }: { text: Dictionary["bodyMap"]["freeText"] }) {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-xl border border-[#E9A3A3] bg-[#FBE3E3] p-4 text-sm leading-normal text-[#5a1414]"
    >
      <Warning className="mt-0.5 flex-none text-[#B42318]" />
      <div>
        <p className="font-semibold">{text.emergencyTitle}</p>
        <p className="mt-0.5">{text.emergencyText}</p>
        <a
          href="tel:112"
          className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#B42318] px-4 font-semibold text-white"
        >
          <Phone />
          {text.emergencyCall}
        </a>
      </div>
    </div>
  );
}

/**
 * "Something else? Describe it" – the fourth option under every question. Expands a
 * textarea; on submit (button or Enter) a purely client-side keyword matcher routes to
 * the matching body zone, or suggests a department. Nothing is sent or stored.
 * Red-flag words always show the emergency box first.
 */
export function FreeText({
  locale,
  text,
  departments,
  zones,
  regions,
  currentZone,
  newTab,
  prefill,
  onRoute,
  onSuggest,
}: FreeTextProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const id = useId();

  const canSubmit = value.trim().length >= MIN_CHARS;

  const toggle = () => {
    if (!open && value === "" && prefill) setValue(prefill.slice(0, MAX_CHARS));
    setOpen((o) => !o);
  };

  const submit = () => {
    if (!canSubmit) return;
    const next = matchFreeText(value);
    setResult(next);
    onSuggest(next.targets);
    // Usage count only – nothing about the text or the result leaves the browser
    trackEvent("find_specialist_submit", {});
  };

  const change = (next: string) => {
    setValue(next.slice(0, MAX_CHARS));
    // Results appear only after submitting – editing clears the last one
    if (result) {
      setResult(null);
      onSuggest([]);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const current = currentZone ? departments[zones[currentZone].dept] : null;
  const noMatch = result && result.targets.length === 0 && result.departments.length === 0;
  const note = result?.note ? text.notes[result.note] : null;

  return (
    <div className="mt-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-field`}
        onClick={toggle}
        data-free-text-toggle
        className="text-navy border-line-strong flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-dashed bg-transparent px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 hover:border-navy hover:bg-white"
      >
        {text.option}
        <ArrowRight
          className={`flex-none transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open ? (
        <div id={`${id}-field`} className="mt-3">
          <label htmlFor={`${id}-input`} className="text-navy block text-sm font-semibold">
            {text.label}
          </label>
          <textarea
            id={`${id}-input`}
            value={value}
            onChange={(e) => change(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={MAX_CHARS}
            rows={3}
            placeholder={text.placeholder}
            aria-describedby={`${id}-note`}
            className="border-line-strong text-ink focus:border-navy mt-1.5 w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-normal outline-none"
          />
          <p id={`${id}-note`} className="text-subtle mt-1 flex justify-between gap-4 text-sm">
            <span>
              {text.note} <span className="sr-only">{text.submitHint}</span>
            </span>
            <span aria-hidden="true">
              {value.length}/{MAX_CHARS}
            </span>
          </p>

          <button
            type="button"
            onClick={submit}
            disabled={!canSubmit}
            className="btn btn-primary mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {text.submit}
            <ArrowRight />
          </button>

          {/* Result – polite live region, announced once after submitting */}
          <div aria-live="polite" className="mt-3 space-y-3">
            {result?.redFlag ? <EmergencyBox text={text} /> : null}

            {/* Body-part matches: route to another zone / hidden region, or confirm the current zone */}
            {result?.targets.map((target) => {
              if (isRegionId(target)) {
                const region = regions[target];
                const depts = region.departments.map((d) => departments[d]);
                const primary = depts[0];
                if (!primary) return null;
                return (
                  <div
                    key={target}
                    style={{ "--dept": primary.color } as CSSProperties}
                    className="rounded-xl border border-(--dept) p-4"
                    data-free-text-result="region"
                  >
                    <p className="eyebrow !text-sm" style={{ color: "var(--dept)" }}>
                      {depts.map((d) => d.name).join(" & ")}
                    </p>
                    <p className="font-display text-navy mt-1 text-xl leading-tight">
                      {text.zoneSuggestion.replace("{zone}", inSentence(region.short, locale))}
                    </p>
                    <p className="text-muted mt-1.5 text-sm leading-normal">{region.intro}</p>
                    <button
                      type="button"
                      onClick={() => onRoute(target)}
                      className="btn mt-3 bg-(--dept) text-white hover:brightness-110"
                    >
                      {text.showZone.replace("{zone}", inSentence(region.short, locale))}
                      <ArrowRight />
                    </button>
                  </div>
                );
              }
              const zone = zones[target];
              // A fall / accident / sprain: the Orthopedics view of the area comes first
              const viewDept: DepartmentId =
                result.injury && isMusculoskeletal(target) ? "ortho" : zone.dept;
              const dept = departments[viewDept];
              const same = target === currentZone;
              return (
                <div
                  key={target}
                  style={{ "--dept": dept.color } as CSSProperties}
                  className="rounded-xl border border-(--dept) p-4"
                  data-free-text-result={same ? "same" : "zone"}
                >
                  <p className="eyebrow !text-sm" style={{ color: "var(--dept)" }}>
                    {dept.name}
                  </p>
                  {same ? (
                    <>
                      <p className="text-navy mt-1 text-sm leading-normal font-semibold">
                        {text.sameZone}
                      </p>
                      {note && target === "nacken" ? (
                        <p className="text-muted mt-1.5 text-sm leading-normal" data-free-text-note>
                          {note}
                        </p>
                      ) : null}
                      <a
                        href={dept.ctaUrl}
                        data-book={dept.id}
                        target="_blank"
                        rel="noopener"
                        className="btn mt-3 bg-(--dept) text-white hover:brightness-110"
                      >
                        {text.book.replace("{dept}", dept.name)}
                        <ArrowRight />
                        <span className="sr-only"> {newTab}</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-navy mt-1 text-xl leading-tight">
                        {text.zoneSuggestion.replace("{zone}", inSentence(zone.short, locale))}
                      </p>
                      <p className="text-muted mt-1.5 text-sm leading-normal">{zone.intro}</p>
                      {note && target === "nacken" ? (
                        <p
                          className="text-navy mt-2 rounded-xl bg-white/70 px-3 py-2 text-sm leading-normal"
                          data-free-text-note
                        >
                          {note}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => onRoute(target, viewDept)}
                        className="btn mt-3 bg-(--dept) text-white hover:brightness-110"
                      >
                        {text.showZone.replace("{zone}", inSentence(zone.short, locale))}
                        <ArrowRight />
                      </button>
                    </>
                  )}
                </div>
              );
            })}

            {/* Department-only matches */}
            {result?.departments.map((deptId) => {
              const dept = departments[deptId];
              return (
                <div
                  key={deptId}
                  style={{ "--dept": dept.color } as CSSProperties}
                  className="rounded-xl border border-(--dept) p-4"
                  data-free-text-result="department"
                >
                  <p className="eyebrow !text-sm" style={{ color: "var(--dept)" }}>
                    {dept.short}
                  </p>
                  <p className="font-display text-navy mt-1 text-xl leading-tight">
                    {text.suggestion.replace("{dept}", dept.name)}
                  </p>
                  <p className="text-muted mt-1.5 text-sm leading-normal">{dept.description}</p>
                  <a
                    href={dept.bookingUrl ?? dept.href}
                    data-book={dept.id}
                    target="_blank"
                    rel="noopener"
                    className="btn mt-3 bg-(--dept) text-white hover:brightness-110"
                  >
                    {text.book.replace("{dept}", dept.name)}
                    <ArrowRight />
                    <span className="sr-only"> {newTab}</span>
                  </a>
                </div>
              );
            })}

            {noMatch ? (
              <div className="bg-sand rounded-xl p-4" data-free-text-result="none">
                <p className="text-navy text-sm leading-normal font-semibold">
                  {text.noMatch}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={site.phone.href} className="btn btn-primary">
                    <Phone />
                    {site.phone.display}
                  </a>
                  {current ? (
                    <a
                      href={current.ctaUrl}
                      data-book={current.id}
                      target="_blank"
                      rel="noopener"
                      className="btn border-line-strong text-navy border bg-white"
                    >
                      {text.book.replace("{dept}", current.name)}
                      <ArrowRight />
                      <span className="sr-only"> {newTab}</span>
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
