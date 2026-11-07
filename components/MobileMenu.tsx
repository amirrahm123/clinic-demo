"use client";

import { useRef } from "react";
import type { Locale } from "@/content/i18n";
import { Calendar, Close, Menu, Phone } from "./icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { LogoMark } from "./Logo";

interface MobileMenuProps {
  items: { label: string; href: string }[];
  text: {
    open: string;
    close: string;
    menu: string;
    nav: string;
    book: string;
    phone: { display: string; href: string };
  };
  locale: Locale;
  switchLabel: string;
  srLabel: string;
}

/** Round menu button + full-screen menu (native <dialog>: focus trap and Esc built in). */
export function MobileMenu({ items, text, locale, switchLabel, srLabel }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label={text.open}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="border-line-strong text-navy hover:bg-navy grid size-11 flex-none place-items-center rounded-full border transition-colors hover:text-white xl:hidden"
      >
        <Menu size={24} />
      </button>

      <dialog ref={dialogRef} className="roc-menu" aria-label={text.menu} data-track-location="header">
        <div className="container-roc border-line flex h-[72px] flex-none items-center justify-between border-b">
          <LogoMark className="text-navy h-8 w-[58px]" />
          <div className="flex items-center gap-2">
            <LanguageSwitch locale={locale} switchLabel={switchLabel} srLabel={srLabel} />
            <button
              type="button"
              aria-label={text.close}
              onClick={close}
              className="border-line-strong text-navy grid size-11 place-items-center rounded-full border"
            >
              <Close size={24} />
            </button>
          </div>
        </div>

        <nav aria-label={text.nav} className="container-roc flex-1 overflow-y-auto py-6">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-line border-b">
                <a
                  href={item.href}
                  onClick={close}
                  className="font-display text-navy flex min-h-16 items-center text-2xl font-light tracking-tight"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-roc flex flex-none flex-col gap-3 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <a href={text.phone.href} className="btn border-line-strong text-navy border tabular-nums">
            <Phone />
            {text.phone.display}
          </a>
          <button type="button" data-booking-open onClick={close} className="btn btn-primary">
            <Calendar />
            {text.book}
          </button>
        </div>
      </dialog>
    </>
  );
}
