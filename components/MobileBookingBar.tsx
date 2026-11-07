"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Calendar, Phone } from "./icons";

/**
 * Fixed bottom bar on mobile; appears once the hero CTA has scrolled out of view
 * and hides while any dialog (menu, sheet, booking) is open (CSS, .mobile-bar).
 */
export function MobileBookingBar({
  bookLabel,
  callLabel,
}: {
  bookLabel: string;
  callLabel: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cta = document.getElementById("hero-cta");
    if (!cta) {
      const onScroll = () => setVisible(window.scrollY > 200);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      data-visible={visible}
      data-track-location="header"
      className="mobile-bar border-line bg-ivory fixed inset-x-0 bottom-0 z-30 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="flex gap-3">
        <button type="button" data-booking-open className="btn btn-primary min-h-[54px] flex-1">
          <Calendar />
          {bookLabel}
        </button>
        <a
          href={site.phone.href}
          aria-label={`${callLabel}: ${site.phone.display}`}
          className="border-line-strong text-navy hover:bg-navy grid size-[54px] flex-none place-items-center rounded-full border transition-colors hover:text-white"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}
