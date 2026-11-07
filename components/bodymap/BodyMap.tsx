"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { getRegions, isRegionId, type RegionId, type TargetId } from "@/content/anatomy";
import {
  DEFAULT_ZONE,
  isZoneId,
  markers,
  viewForZone,
  zoneOrder,
  type BodyMapContent,
  type BodyView,
  type ZoneId,
} from "@/content/bodyMap";
import { departmentIds, type Department, type DepartmentId } from "@/content/departments";
import type { Doctor, DoctorId } from "@/content/doctors";
import type { Dictionary, Locale } from "@/content/i18n";
import { buildSearchIndex } from "@/lib/symptomSearch";
import { ArrowRight } from "../icons";
import type { ModalHandle } from "../Modal";
import { SectionHeader } from "../SectionHeader";
import { BodyFigure } from "./BodyFigure";
import { MobileResultSheet } from "./MobileResultSheet";
import { RegionPanel } from "./RegionPanel";
import { ResultPanel, ZoneFlag, type ResultText } from "./ResultPanel";
import { SEARCH_INPUT_ID, SearchScreen, type SearchFocus } from "./SearchScreen";
import { ZoneMarker } from "./ZoneMarker";

interface BodyMapProps {
  locale: Locale;
  text: Dictionary["bodyMap"];
  content: BodyMapContent;
  departments: Record<DepartmentId, Department>;
  doctors: Record<DoctorId, Doctor>;
  newTab: string;
}

const isSmallScreen = () => window.matchMedia("(max-width: 1023px)").matches;

const PULSE_MS = 1800;
/** Figure turn: 250ms out (rotateY 0→90°) + 250ms in = 500ms; markers fade out in the first 150ms */
const TURN_HALF_MS = 250;

type TurnPhase = "idle" | "out" | "in";

/**
 * Drives the front/back turn. `shown` is the side that is actually drawn: it only switches
 * at the edge-on midpoint of the turn. Markers render while idle and while the figure is
 * still turning away; they mount (and pop in) again once the new side has settled.
 * Reduced motion: instant swap, no phases.
 */
function useFigureTurn(view: BodyView) {
  const [shown, setShown] = useState<BodyView>(view);
  const [phase, setPhase] = useState<TurnPhase>("idle");
  const [requested, setRequested] = useState<BodyView>(view);

  // A new side was requested (only ever on the client, after an interaction)
  if (view !== requested) {
    setRequested(view);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(view);
      setPhase("idle");
    } else if (phase === "idle") {
      setPhase("out");
    }
  }

  useEffect(() => {
    if (phase === "idle") return;
    const timer = window.setTimeout(() => {
      if (phase === "out") {
        setShown(requested);
        setPhase("in");
      } else if (shown !== requested) {
        // switched again mid-turn: turn once more
        setPhase("out");
      } else {
        setPhase("idle");
      }
    }, TURN_HALF_MS);
    return () => window.clearTimeout(timer);
  }, [phase, requested, shown]);

  return { shown, phase };
}

/**
 * Two ways in, one flow: the search ("What's bothering you?") and the figure both select a
 * zone; the result panel (desktop) / sheet (phones) then asks one question. No selection =
 * the search screen. "Reset selection" returns there.
 */
export function BodyMap({ locale, text, content, departments, doctors, newTab }: BodyMapProps) {
  // null = nothing chosen yet: the panel shows the search screen
  const [zoneId, setZoneId] = useState<ZoneId | null>(null);
  // A hidden region (thigh, upper arm, lower leg) opened by the free-text router replaces
  // the zone panel until the next zone is selected
  const [regionId, setRegionId] = useState<RegionId | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [view, setView] = useState<BodyView>("front");
  const [announce, setAnnounce] = useState("");
  // Free text: targets the submitted text matched (hides this zone's flag if it points away)
  const [suggested, setSuggested] = useState<TargetId[]>([]);
  // Markers that pulse after the free-text router switched zones (nearest ones for a region)
  const [pulse, setPulse] = useState<ZoneId[]>([]);
  // Incremented to move focus to the (new) zone title after routing
  const [focusRequest, setFocusRequest] = useState(0);
  const sheet = useRef<ModalHandle>(null);
  // Marker under the pointer / keyboard focus: its body region takes a soft tint
  const [hovered, setHovered] = useState<ZoneId | null>(null);
  // Suggestion / chip under the pointer or arrow keys: its marker shows as selected
  const [preview, setPreview] = useState<ZoneId | null>(null);
  // Department the area is shown in when it differs from its primary one (Orthopedics
  // after an injury word); cleared by a tap on the figure
  const [viewDept, setViewDept] = useState<DepartmentId | null>(null);
  // Remounts the search screen (clears it) after "Reset selection"; > 0 also focuses it
  const [searchKey, setSearchKey] = useState(0);
  const searchPanel = useRef<HTMLDivElement>(null);

  const { shown: shownView, phase: turnPhase } = useFigureTurn(view);
  const zones = content.zones;
  const regions = useMemo(() => getRegions(locale), [locale]);
  const index = useMemo(() => buildSearchIndex(zones, regions), [zones, regions]);
  const selected = zoneId !== null || regionId !== null;
  // The sheet and the summary row need a zone even before the first selection
  const panelZone = zones[zoneId ?? DEFAULT_ZONE];
  const panelRegion = regionId ? regions[regionId] : null;
  const zoneDept: DepartmentId =
    viewDept && (viewDept === panelZone.dept || viewDept === panelZone.also) ? viewDept : panelZone.dept;
  const panelDept = departments[panelRegion ? panelRegion.departments[0] : zoneDept];
  // The other department of the area, shown as "Also relevant"
  const panelAlso = panelZone.also
    ? departments[zoneDept === panelZone.dept ? panelZone.also : panelZone.dept]
    : null;
  // The area's doctor – or, in another department's view, a doctor of that department
  const panelDoctor =
    doctors[panelZone.doc].dept === zoneDept
      ? doctors[panelZone.doc]
      : (Object.values(doctors).find((d) => d.dept === zoneDept) ?? doctors[panelZone.doc]);
  const panelTitle = panelRegion ? panelRegion.title : panelZone.title;
  // Urgent answers render the flag inside the panel; the pinned copy would be a duplicate
  const urgentAnswer = answer !== null && panelZone.question.options[answer]?.urgent === true;
  // The free-text result points to another zone: that zone's flag is shown after routing
  const flagHidden = suggested.length > 0 && !suggested.includes(regionId ?? panelZone.id);
  // Department colour per zone, for the region tint on the figure
  const figureColors = Object.fromEntries(
    (Object.keys(zones) as ZoneId[]).map((id) => [id, departments[zones[id].dept].color]),
  ) as Partial<Record<ZoneId, string>>;
  const resultText: ResultText = {
    ui: text,
    causesLabel: content.causesLabel,
    whyLabel: content.whyLabel,
    genericFlag: content.genericFlag,
    newTab,
  };

  /** Select a zone; on small screens the result opens as a bottom sheet. */
  const select = useCallback(
    (id: ZoneId, openSheet = true) => {
      setZoneId(id);
      setRegionId(null);
      setAnswer(null);
      setSuggested([]);
      setPreview(null);
      setViewDept(null);
      setView((current) => viewForZone(id, current));
      setAnnounce(`${text.selected}: ${zones[id].title}`);
      if (openSheet && isSmallScreen()) sheet.current?.open();
    },
    [zones, text.selected],
  );

  /**
   * Router for the search and the free text: open the matched zone (switching the figure
   * side if needed), pulse its marker and move focus to the title. `openSheet`: the
   * search screen on phones opens the sheet; a free-text card inside the sheet does not.
   * `dept`: open the area in that department's view (Orthopedics after an injury word).
   */
  const routeTo = useCallback(
    (target: TargetId, openSheet = false, dept: DepartmentId | null = null) => {
      if (isRegionId(target)) {
        const region = regions[target];
        setRegionId(target);
        setAnswer(null);
        setSuggested([]);
        setPreview(null);
        // Show the side where the nearest markers are (all current regions: front)
        setView((current) => {
          const first = region.nearest[0];
          return first ? viewForZone(first, current) : current;
        });
        setAnnounce(`${text.selected}: ${region.title}`);
        setPulse(region.nearest);
        if (openSheet && isSmallScreen()) sheet.current?.open();
      } else {
        select(target, openSheet);
        setViewDept(dept);
        setPulse([target]);
      }
      setFocusRequest((n) => n + 1);
    },
    [regions, select, text.selected],
  );

  const pickFromSearch = useCallback(
    (target: TargetId, dept?: DepartmentId) => routeTo(target, true, dept ?? null),
    [routeTo],
  );
  const routeFromSearch = pickFromSearch;
  /** Free-text card inside an open result: the sheet / panel swaps in place */
  const routeFromResult = useCallback(
    (target: TargetId, dept?: DepartmentId) => routeTo(target, false, dept ?? null),
    [routeTo],
  );

  /** Suggestion under the pointer / arrow keys: marker lights up, figure turns to its side */
  const previewZone = useCallback((zone: ZoneId | null) => {
    setPreview(zone);
    if (zone) setView((current) => viewForZone(zone, current));
  }, []);

  useEffect(() => {
    if (pulse.length === 0) return;
    const timer = window.setTimeout(() => setPulse([]), PULSE_MS);
    return () => window.clearTimeout(timer);
  }, [pulse]);

  useEffect(() => {
    if (focusRequest === 0) return;
    // The sheet's title when the sheet is open, otherwise the desktop panel's
    const title =
      document.querySelector<HTMLElement>("dialog[open] #zone-title-sheet") ??
      document.getElementById("zone-title");
    if (!title) return;
    title.closest<HTMLElement>(".overflow-y-auto")?.scrollTo({ top: 0 });
    title.focus({ preventScroll: true });
  }, [focusRequest]);

  const chooseAnswer = (index: number | null) => {
    setAnswer(index);
    setSuggested([]);
  };

  /** Back to the start: no zone, no answer, no highlight; the search screen, scrolled to top. */
  const reset = () => {
    setZoneId(null);
    setRegionId(null);
    setAnswer(null);
    setSuggested([]);
    setPulse([]);
    setHovered(null);
    setPreview(null);
    setViewDept(null);
    setSearchKey((k) => k + 1);
    setAnnounce(text.reset);
  };

  // After a reset the search panel is remounted: scroll it to the top (its input takes focus
  // itself on desktop, see SearchScreen)
  useEffect(() => {
    if (searchKey === 0) return;
    searchPanel.current?.querySelector(".overflow-y-auto")?.scrollTo({ top: 0 });
  }, [searchKey]);

  // Hero chips (<a href="#koerper" data-zone="…">) set the zone while the page scrolls here;
  // the hero's "Find the right specialist" (data-focus-bodymap) scrolls here and moves
  // focus to the search box (desktop) or the section heading (phones, no keyboard pop-up).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const id = e.target.closest<HTMLElement>("a[data-zone]")?.dataset.zone;
      if (id && isZoneId(id)) select(id, false);
      if (e.target.closest("a[data-focus-bodymap]")) {
        e.preventDefault();
        const section = document.getElementById("koerper");
        const input = isSmallScreen() ? null : document.getElementById(SEARCH_INPUT_ID);
        const title = input ?? document.getElementById("koerper-title");
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#koerper");
        title?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [select]);

  const isSelected = (zone: ZoneId) => (!regionId && zoneId === zone) || preview === zone;

  // Legend: only the departments with a marker (or a ring segment) on the shown side –
  // Lab has no marker and is reached through the search and the "Lab tests" chip
  const legendDepts = departmentIds.filter((dept) =>
    markers[shownView].some((m) => zones[m.zone].dept === dept || zones[m.zone].also === dept),
  );

  // "All areas": every zone and topic, grouped by its primary department
  const groups = departmentIds
    .map((dept) => ({ dept, ids: zoneOrder.filter((id) => zones[id].dept === dept) }))
    .filter((g) => g.ids.length > 0);

  const searchFocus: SearchFocus = searchKey > 0 ? "always" : "visible";

  return (
    <section id="koerper" aria-labelledby="koerper-title" className="section" data-track-location="bodymap">
      <div className="container-roc">
        {/* Heading + one-line lead + the 3-step line */}
        <SectionHeader id="koerper-title" title={text.title} intro={text.intro} />

        <p className="sr-only" aria-live="polite">
          {announce}
        </p>

        {/* How it works: 3 numbered steps in one line */}
        <ol
          aria-label={text.stepsLabel}
          data-reveal="text"
          className="text-ink mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium"
        >
          {text.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="bg-navy font-condensed grid size-6 place-items-center rounded-full text-sm font-semibold text-white">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        {/* Phones: search → summary of the selection → figure (always visible, ≤ 60vh).
            Desktop: figure left, fixed-height panel right – the panel swaps between the
            search screen and the result, it never grows the page. */}
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-2 md:mt-8 md:gap-3 lg:h-[620px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
          {/* Search screen: a card on phones, the panel on desktop while nothing is selected.
              Stays mounted (the query survives a selection on phones); a reset remounts it. */}
          <div
            ref={searchPanel}
            data-reveal="text"
            data-search-panel
            className={`border-line-strong relative rounded-[20px] border bg-white/60 lg:col-start-2 lg:row-start-1 lg:overflow-hidden ${
              selected ? "lg:hidden" : ""
            }`}
          >
            <div key={searchKey} className="panel-swap flex flex-col lg:absolute lg:inset-0">
              <div className="bg-navy h-[3px] flex-none opacity-70" aria-hidden="true" />
              <div className="min-h-0 flex-1 px-4 pt-5 pb-4 md:px-5 md:pt-6 md:pb-6 lg:overflow-y-auto lg:overscroll-contain lg:px-8 lg:pt-8">
                <SearchScreen
                  locale={locale}
                  text={text.search}
                  freeText={text.freeText}
                  departments={departments}
                  zones={zones}
                  regions={regions}
                  index={index}
                  newTab={newTab}
                  focus={searchFocus}
                  onPick={pickFromSearch}
                  onPreview={previewZone}
                  onRoute={routeFromSearch}
                  onSuggest={setSuggested}
                />
              </div>
              {/* Desktop: the warning stays pinned under the search as it does under a result */}
              <div className="border-line hidden flex-none border-t px-8 pt-4 pb-3 lg:block">
                <ZoneFlag zone={{ ...panelZone, flag: undefined }} text={resultText} />
                <p className="text-subtle mt-2 text-sm">{content.disclaimer}</p>
              </div>
            </div>
          </div>

          {/* Phones: compact summary of the selection; details in the sheet */}
          {selected ? (
            <button
              type="button"
              onClick={() => sheet.current?.open()}
              style={{ "--dept": panelDept.color } as CSSProperties}
              className="border-line-strong flex min-h-14 items-center gap-3 rounded-[20px] border border-l-[3px] border-l-(--dept) bg-white/60 px-4 py-2.5 text-left lg:hidden"
            >
              <span className="min-w-0 flex-1">
                <span className="font-display text-navy block text-lg leading-tight">
                  {panelTitle}
                </span>
                <span className="block text-sm">
                  <span className="font-semibold" style={{ color: "var(--dept)" }}>
                    {panelDept.name}
                  </span>
                  <span className="text-muted"> · {text.summaryHint}</span>
                </span>
              </span>
              <ArrowRight className="text-navy flex-none" />
            </button>
          ) : null}

          {/* Figure column: view toggle, figure, legend, "All areas" */}
          <div className="bg-sand relative min-w-0 rounded-[20px] lg:col-start-1 lg:row-start-1 lg:flex lg:min-h-0 lg:flex-col">
            <div
              id="koerper-figure"
              className="flex min-h-0 min-w-0 flex-col items-center px-4 pt-3 pb-3 md:pt-4 md:pb-4 lg:flex-1 lg:px-5 lg:pt-5"
            >
              <div
                role="group"
                aria-label={text.viewLabel}
                className="border-line-strong bg-ivory flex flex-none rounded-full border p-1"
              >
                {(["front", "back"] as BodyView[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    onClick={() => setView(v)}
                    className="text-navy aria-pressed:bg-navy min-h-11 min-w-24 rounded-full px-5 text-sm font-semibold transition-colors aria-pressed:text-white"
                  >
                    {text.views[v]}
                  </button>
                ))}
              </div>

              {/* Reveal: figure fades in, markers pop in with a 40ms stagger. Switching sides
                  turns the figure (rotateY, 500ms, perspective 1200px); see useFigureTurn. */}
              <div
                data-reveal="bodymap"
                data-phase={turnPhase}
                className="figure-stage relative mt-2 aspect-[300/640] h-[min(60svh,440px)] max-w-full flex-none md:mt-3 lg:h-auto lg:min-h-0 lg:flex-1"
              >
                <div className="figure-turn size-full">
                  <BodyFigure
                    className="size-full"
                    view={shownView}
                    active={[hovered, preview, regionId ? null : zoneId].filter(
                      (id): id is ZoneId => id !== null,
                    )}
                    colors={figureColors}
                  />
                </div>
                {turnPhase === "in"
                  ? null
                  : markers[shownView].map((marker, index) => {
                      const z = zones[marker.zone];
                      const dept = departments[z.dept];
                      const also = z.also ? departments[z.also] : undefined;
                      return (
                        <ZoneMarker
                          key={`${shownView}-${marker.zone}`}
                          index={index}
                          marker={marker}
                          label={z.short}
                          deptName={dept.name}
                          color={dept.color}
                          alsoColor={also?.color}
                          selected={isSelected(marker.zone)}
                          pulsing={pulse.includes(marker.zone)}
                          onSelect={() => select(marker.zone)}
                          onHover={(on) => setHovered((cur) => (on ? marker.zone : cur === marker.zone ? null : cur))}
                        />
                      );
                    })}
              </div>

              {/* Colour legend for the shown side: dot + department name (wraps on small screens) */}
              <ul
                aria-label={text.legendLabel}
                className="text-muted mt-2 flex w-full flex-none flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-medium md:mt-3 md:gap-y-1.5"
              >
                {legendDepts.map((dept) => (
                  <li key={dept} className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 flex-none rounded-full ring-2 ring-white"
                      style={{ background: departments[dept].color }}
                      aria-hidden="true"
                    />
                    {departments[dept].name}
                  </li>
                ))}
              </ul>

              {/* Text list of all zones and topics, grouped by department (also the only way
                  to reach the topics without a marker). Inline on phones; on desktop the
                  column has a fixed height, so the open list overlays the figure. */}
              <details className="group mt-1 w-full flex-none">
                <summary className="text-navy relative z-40 flex min-h-11 cursor-pointer list-none items-center justify-center gap-1.5 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  {text.allZones}
                  <ArrowRight
                    className="transition-transform duration-200 group-open:rotate-90"
                  />
                </summary>
                <div className="bg-ivory/95 space-y-2 pb-1 lg:shadow-float lg:absolute lg:inset-x-3 lg:top-20 lg:bottom-14 lg:z-30 lg:overflow-y-auto lg:rounded-xl lg:p-4 lg:backdrop-blur">
                  {groups.map(({ dept, ids }) => (
                    <div
                      key={dept}
                      className="flex flex-wrap items-baseline gap-x-1 gap-y-0"
                      style={{ "--dept": departments[dept].color } as CSSProperties}
                    >
                      <h4 className="font-condensed mr-1.5 text-sm font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--dept)" }}>
                        {departments[dept].name}
                      </h4>
                      <ul className="-mx-1 flex flex-wrap">
                        {ids.map((id) => (
                          <li key={id}>
                            <button
                              type="button"
                              aria-pressed={!regionId && zoneId === id}
                              onClick={() => select(id)}
                              className="text-muted decoration-line-strong hover:text-navy aria-pressed:text-navy aria-pressed:decoration-navy min-h-9 px-1.5 text-sm underline underline-offset-4 aria-pressed:font-semibold"
                            >
                              {zones[id].chipLabel ?? zones[id].short}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>

          {/* Desktop result panel (only while something is selected) */}
          {selected ? (
            <div
              data-result-panel
              className="border-line-strong relative hidden overflow-hidden rounded-[20px] border bg-white/60 lg:col-start-2 lg:row-start-1 lg:block"
            >
              {/* key → remount → CSS fade-in (0.25s) when the zone changes */}
              <div key={regionId ?? panelZone.id} className="panel-swap absolute inset-0 flex flex-col">
                <div
                  className="h-[3px] flex-none"
                  style={{ background: panelDept.color }}
                  aria-hidden="true"
                />
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-8 pt-6 pb-6">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={reset}
                      data-reset
                      className="text-subtle hover:text-navy -mt-1 -mr-3 inline-flex min-h-9 items-center px-3 text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      {text.reset}
                    </button>
                  </div>
                  {panelRegion ? (
                    <RegionPanel
                      region={panelRegion}
                      departments={departments}
                      text={resultText}
                      titleId="zone-title"
                      showFlag={false}
                    />
                  ) : (
                    <ResultPanel
                      locale={locale}
                      zone={panelZone}
                      dept={panelDept}
                      departments={departments}
                      zones={zones}
                      regions={regions}
                      onRoute={routeFromResult}
                      onSuggest={setSuggested}
                      also={panelAlso}
                      doctor={panelDoctor}
                      text={resultText}
                      answer={answer}
                      onAnswer={chooseAnswer}
                      titleId="zone-title"
                      showFlag={false}
                      hideDetails={flagHidden}
                    />
                  )}
                </div>
                {/* Pinned so the warning stays visible however long the content is */}
                <div className="border-line flex-none border-t px-8 pt-4 pb-3">
                  {panelRegion ? (
                    <ZoneFlag zone={{ ...panelZone, flag: undefined }} text={resultText} />
                  ) : urgentAnswer || flagHidden ? null : (
                    <ZoneFlag zone={panelZone} text={resultText} />
                  )}
                  <p className="text-subtle mt-2 text-sm">{content.disclaimer}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <MobileResultSheet
        ref={sheet}
        titleId="zone-title-sheet"
        accent={panelDept.color}
        disclaimer={content.disclaimer}
      >
        {panelRegion ? (
          <RegionPanel
            region={panelRegion}
            departments={departments}
            text={resultText}
            titleId="zone-title-sheet"
          />
        ) : (
          <ResultPanel
            locale={locale}
            zone={panelZone}
            dept={panelDept}
            departments={departments}
            zones={zones}
            regions={regions}
            onRoute={routeFromResult}
            onSuggest={setSuggested}
            also={panelAlso}
            doctor={panelDoctor}
            text={resultText}
            answer={answer}
            onAnswer={chooseAnswer}
            titleId="zone-title-sheet"
            showFlag={!flagHidden}
            hideDetails={flagHidden}
          />
        )}
      </MobileResultSheet>
    </section>
  );
}
