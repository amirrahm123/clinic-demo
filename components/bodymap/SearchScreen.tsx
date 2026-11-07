"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import type { Region, RegionId, TargetId } from "@/content/anatomy";
import type { Zone, ZoneId } from "@/content/bodyMap";
import type { Department, DepartmentId } from "@/content/departments";
import type { Dictionary, Locale } from "@/content/i18n";
import { quickChips } from "@/content/searchIndex";
import { site } from "@/content/site";
import { hasRedFlag, normalize } from "@/lib/freeTextMatch";
import { searchSymptoms, type SearchHit, type SearchIndex } from "@/lib/symptomSearch";
import { ArrowLeft, Close, Phone, Search } from "../icons";
import { EmergencyBox, FreeText } from "./FreeText";

export const SEARCH_INPUT_ID = "symptom-search";

const PLACEHOLDER_MS = 3000;
/** Show the "no match" fallback only once a word is really there, not on the first letters */
const NO_MATCH_FROM = 3;

/** When the input takes focus on mount: always, only if the section is on screen, never */
export type SearchFocus = "always" | "visible" | "none";

interface SearchScreenProps {
  locale: Locale;
  text: Dictionary["bodyMap"]["search"];
  freeText: Dictionary["bodyMap"]["freeText"];
  departments: Record<DepartmentId, Department>;
  zones: Record<ZoneId, Zone>;
  regions: Record<RegionId, Region>;
  index: SearchIndex;
  newTab: string;
  /** Desktop only – phones never get the keyboard pushed up unasked */
  focus: SearchFocus;
  /** A suggestion or chip was chosen: opens the zone like a tap on the figure – in the
   *  suggestion's department view (Orthopedics first after an injury word) */
  onPick: (target: TargetId, dept?: DepartmentId) => void;
  /** Suggestion under the pointer / arrow keys: its marker lights up on the figure */
  onPreview: (zone: ZoneId | null) => void;
  /** Free-text result card → zone / region, optionally in a department view */
  onRoute: (target: TargetId, dept?: DepartmentId) => void;
  onSuggest: (targets: TargetId[]) => void;
}

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

/**
 * Initial state of the result panel: "What's bothering you?" – a search box with typo-
 * tolerant suggestions (ARIA combobox: ↑ ↓ Enter Esc, Home/End), quick chips for the most
 * common requests and a hint towards the figure. Everything is matched in the browser;
 * nothing typed here is sent or tracked. No match → "describe it" + phone, never a dead end.
 */
export function SearchScreen({
  locale,
  text,
  freeText,
  departments,
  zones,
  regions,
  index,
  newTab,
  focus,
  onPick,
  onPreview,
  onRoute,
  onSuggest,
}: SearchScreenProps) {
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-option-${i}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [placeholder, setPlaceholder] = useState(0);

  const hits = useMemo(() => searchSymptoms(index, value), [index, value]);
  const typed = normalize(value);
  const noMatch = typed.length >= NO_MATCH_FROM && hits.length === 0;
  const redFlag = typed.length >= NO_MATCH_FROM && hasRedFlag(value);
  const expanded = open && hits.length > 0;
  const current = expanded && active >= 0 ? (hits[active] ?? null) : null;

  // Cycle the example placeholder while the box is empty (static under reduced motion)
  useEffect(() => {
    if (value !== "" || text.placeholders.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setPlaceholder((i) => (i + 1) % text.placeholders.length),
      PLACEHOLDER_MS,
    );
    return () => window.clearInterval(timer);
  }, [value, text.placeholders.length]);

  // Desktop autofocus: after a reset always; on first mount only if the section is on screen
  useEffect(() => {
    if (focus === "none" || !isDesktop()) return;
    const input = inputRef.current;
    if (!input) return;
    if (focus === "visible") {
      const r = input.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) return;
    }
    input.focus({ preventScroll: true });
  }, [focus]);

  // The highlighted suggestion lights up its marker on the figure
  useEffect(() => {
    onPreview(current?.zone ?? null);
  }, [current, onPreview]);
  useEffect(() => () => onPreview(null), [onPreview]);

  const change = (next: string) => {
    setValue(next);
    setActive(-1);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActive(-1);
  };

  const pick = (hit: SearchHit) => {
    close();
    onPick(hit.target, hit.dept);
  };

  /** No suggestion for the text: hand it to "Describe it" (prefilled) */
  const describe = () => {
    const toggle = fallbackRef.current?.querySelector<HTMLButtonElement>("[data-free-text-toggle]");
    if (!toggle) return;
    if (toggle.getAttribute("aria-expanded") !== "true") toggle.click();
    window.requestAnimationFrame(() =>
      fallbackRef.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus(),
    );
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const n = hits.length;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (n === 0) return;
        setOpen(true);
        setActive((a) => (open ? (a + 1) % n : 0));
        return;
      case "ArrowUp":
        e.preventDefault();
        if (n === 0) return;
        setOpen(true);
        setActive((a) => (open && a > 0 ? a - 1 : n - 1));
        return;
      case "Home":
        if (!expanded) return;
        e.preventDefault();
        setActive(0);
        return;
      case "End":
        if (!expanded) return;
        e.preventDefault();
        setActive(n - 1);
        return;
      case "Enter": {
        e.preventDefault();
        const hit = (expanded && active >= 0 ? hits[active] : hits[0]) ?? null;
        if (hit) pick(hit);
        else if (noMatch) describe();
        return;
      }
      case "Escape":
        if (open && n > 0) {
          e.preventDefault();
          close();
        } else if (value) {
          e.preventDefault();
          change("");
        }
        return;
      case "Tab":
        close();
        return;
      default:
        return;
    }
  };

  const status = expanded
    ? hits.length === 1
      ? text.oneResult
      : text.resultsCount.replace("{n}", String(hits.length))
    : noMatch
      ? text.noMatch
      : "";

  return (
    <div className="space-y-4 md:space-y-7">
      <h3 id={`${id}-title`} tabIndex={-1} className="h3 outline-none">
        {text.heading}
      </h3>

      {/* Combobox */}
      <div className="relative">
        <label htmlFor={SEARCH_INPUT_ID} className="sr-only">
          {text.label}
        </label>
        <div className="relative">
          <Search
            size={24}
            className="text-subtle pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
          />
          <input
            ref={inputRef}
            id={SEARCH_INPUT_ID}
            type="text"
            role="combobox"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={current ? optionId(active) : undefined}
            aria-describedby={`${id}-status`}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            maxLength={120}
            value={value}
            placeholder={text.placeholders[placeholder] ?? text.placeholders[0]}
            onChange={(e) => change(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setOpen(true)}
            onBlur={close}
            className="border-line-strong text-ink placeholder:text-subtle focus:border-navy min-h-14 w-full rounded-xl border bg-white py-3 pr-12 pl-13 text-base outline-none"
          />
          {value ? (
            <button
              type="button"
              aria-label={text.clear}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                change("");
                inputRef.current?.focus();
              }}
              className="text-subtle hover:text-navy absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full"
            >
              <Close />
            </button>
          ) : null}
        </div>

        {/* Suggestions – mousedown is swallowed so the input keeps focus until the click */}
        <ul
          id={listId}
          role="listbox"
          aria-label={text.resultsLabel}
          hidden={!expanded}
          onMouseDown={(e) => e.preventDefault()}
          className="border-line-strong shadow-float absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border bg-white py-1"
        >
          {expanded
            ? hits.map((hit, i) => {
                const dept = departments[hit.dept];
                return (
                  <li
                    key={`${hit.target}-${hit.dept}`}
                    id={optionId(i)}
                    role="option"
                    aria-selected={i === active}
                    data-target={hit.target}
                    data-dept={hit.dept}
                    onPointerEnter={() => setActive(i)}
                    onClick={() => pick(hit)}
                    style={{ "--dept": dept.color } as CSSProperties}
                    className="aria-selected:bg-sand flex min-h-12 cursor-pointer items-center gap-3 px-4 text-sm"
                  >
                    <span className="size-2.5 flex-none rounded-full bg-(--dept)" aria-hidden="true" />
                    <span className="text-navy font-semibold">{hit.title}</span>
                    <span className="text-subtle" aria-hidden="true">
                      ·
                    </span>
                    <span style={{ color: "var(--dept)" }}>{dept.name}</span>
                  </li>
                );
              })
            : null}
        </ul>
        <p id={`${id}-status`} className="sr-only" aria-live="polite">
          {status}
        </p>
      </div>

      {redFlag ? <EmergencyBox text={freeText} /> : null}

      {/* No suggestion: describe it (prefilled with the text) or call – never a dead end */}
      {noMatch ? (
        <div ref={fallbackRef} className="bg-sand rounded-xl p-4" data-search-no-match>
          <p className="text-navy text-sm leading-normal font-semibold">{text.noMatch}</p>
          <FreeText
            locale={locale}
            text={freeText}
            departments={departments}
            zones={zones}
            regions={regions}
            currentZone={null}
            newTab={newTab}
            prefill={value}
            onRoute={onRoute}
            onSuggest={onSuggest}
          />
          <a
            href={site.phone.href}
            className="text-navy mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
          >
            <Phone />
            {site.phone.display}
          </a>
        </div>
      ) : null}

      {/* Quick chips: the most common requests, department dot from the legend */}
      <div>
        <p id={`${id}-quick`} className="eyebrow !text-sm">
          {text.quickLabel}
        </p>
        {/* Phones: one row that scrolls sideways (fade at the edge); from md it wraps */}
        <ul
          aria-labelledby={`${id}-quick`}
          data-scroll-row
          className="fade-right no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pr-10 whitespace-nowrap md:mx-0 md:mt-3 md:flex-wrap md:overflow-visible md:px-0 md:whitespace-normal"
        >
          {quickChips.map((chip) => {
            const dept = departments[zones[chip.target].dept];
            return (
              <li key={chip.label.en} className="flex-none">
                <button
                  type="button"
                  data-chip={chip.target}
                  onClick={() => onPick(chip.target)}
                  onPointerEnter={() => onPreview(chip.target)}
                  onPointerLeave={() => onPreview(null)}
                  onFocus={() => onPreview(chip.target)}
                  onBlur={() => onPreview(null)}
                  className="chip chip-sm gap-2"
                >
                  <span
                    className="size-2.5 flex-none rounded-full ring-2 ring-white"
                    style={{ background: dept.color }}
                    aria-hidden="true"
                  />
                  {chip.label[locale]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop: the figure is to the left. Phones have the "Or choose on the body" toggle. */}
      <p className="text-muted hidden items-center gap-2 text-sm lg:flex">
        <ArrowLeft className="text-navy flex-none" />
        {text.hint}
      </p>
    </div>
  );
}
