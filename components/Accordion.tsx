"use client";

import { useId, useState } from "react";
import { ArrowRight } from "./icons";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ accordion on native <details>/<summary>: one item open at a time, the body animates
 * with grid-template-rows 0fr → 1fr (300ms). The details stay `open` so the body can
 * animate; `aria-expanded` on the summary and `inert` on a collapsed body carry the
 * real state. Server-rendered with the first item open, so nothing flashes.
 */
export function Accordion({ items, label }: { items: AccordionItem[]; label: string }) {
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id ?? null);
  const base = useId();

  return (
    <div className="divide-line border-line divide-y border-y" role="group" aria-label={label}>
      {items.map((item) => {
        const open = expanded === item.id;
        const bodyId = `${base}-${item.id}`;
        return (
          <details key={item.id} open className="faq group">
            <summary
              aria-expanded={open}
              aria-controls={bodyId}
              onClick={(e) => {
                e.preventDefault();
                setExpanded(open ? null : item.id);
              }}
              className="text-navy flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-base font-semibold [&::-webkit-details-marker]:hidden"
            >
              {item.question}
              <ArrowRight
                className={`flex-none transition-transform duration-300 ${open ? "rotate-90" : ""}`}
              />
            </summary>
            <div id={bodyId} className="faq-body" data-expanded={open}>
              <div inert={!open}>
                <p className="text-ink max-w-[65ch] pb-5 text-base leading-relaxed text-pretty">
                  {item.answer}
                </p>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
