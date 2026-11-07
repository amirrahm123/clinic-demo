"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { site } from "@/content/site";
import { ArrowRight, Phone } from "./icons";
import { Modal, type ModalHandle } from "./Modal";
import { Photo } from "./Photo";

export interface BookingRow {
  id: string;
  name: string;
  sub: string;
  url: string;
  color: string;
  image: StaticImageData;
  imagePosition: string;
}

interface BookingDialogProps {
  rows: BookingRow[];
  text: { title: string; text: string; unsure: string; newTab: string };
  /** Open as soon as mounted (a trigger was clicked before the chunk had loaded) */
  autoOpen?: boolean;
}

/**
 * One booking dialog for the whole site. Any element with `data-booking-open`
 * opens it, so the triggers themselves can stay server-rendered.
 */
export function BookingDialog({ rows, text, autoOpen }: BookingDialogProps) {
  const modal = useRef<ModalHandle>(null);

  useEffect(() => {
    if (autoOpen) modal.current?.open();
  }, [autoOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest("[data-booking-open]")) modal.current?.open();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <Modal ref={modal} labelledBy="booking-title">
      <div data-track-location="dialog" className="overflow-y-auto overscroll-contain px-5 pt-2 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
        <h2 id="booking-title" className="h3 pr-12">
          {text.title}
        </h2>
        <p className="text-muted mt-2">{text.text}</p>

        <ul className="divide-line border-line mt-5 divide-y border-y">
          {rows.map((row) => (
            <li key={row.id}>
              <a
                href={row.url}
                target="_blank"
                rel="noopener"
                style={{ "--dept": row.color } as CSSProperties}
                data-book={row.id}
                // Hover/focus/press styling: .booking-row in globals.css (department color)
                className="booking-row -mx-3 flex min-h-[72px] items-center gap-4 rounded-xl px-3 py-2.5"
              >
                <span className="bg-sand relative size-13 flex-none overflow-hidden rounded-xl">
                  <Photo
                    src={row.image}
                    alt=""
                    sizes="52px"
                    position={row.imagePosition}
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="booking-name font-display flex items-center gap-2 text-xl leading-tight">
                    {row.name}
                    <span
                      className="booking-dot size-2 rounded-full bg-(--dept)"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-subtle block text-sm">{row.sub}</span>
                </span>
                <span className="booking-arrow border-line-strong grid size-10 flex-none place-items-center rounded-full border">
                  <ArrowRight />
                </span>
                <span className="sr-only">{text.newTab}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="bg-sand text-ink mt-5 flex items-center gap-3 rounded-xl p-4 text-sm">
          <span className="bg-ivory text-navy grid size-10 flex-none place-items-center rounded-full">
            <Phone />
          </span>
          <p>
            {text.unsure}{" "}
            <a
              href={site.phone.href}
              className="text-navy font-semibold whitespace-nowrap tabular-nums underline underline-offset-4"
            >
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
