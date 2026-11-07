import type { CSSProperties, ReactNode } from "react";
import behandlung from "@/public/images/practice/behandlung.jpg";
import hautscreening from "@/public/images/practice/hautscreening.jpg";
import kurse from "@/public/images/practice/kurse.jpg";
import { getBookingList } from "@/content/departments";
import { getDict, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { ArrowRight, Car, Clock, MapPin, Phone, Train } from "./icons";
import { Photo } from "./Photo";
import { noBlur } from "@/lib/photo";
import { SectionHeader } from "./SectionHeader";
import { VisitMap } from "./VisitMap";
import { OpenNow } from "./OpenNow";

function InfoRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="text-navy-soft mt-0.5 flex-none">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

export function Visit({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const bookingList = getBookingList(locale);

  const infoRows = (
    <>
      <InfoRow icon={<Phone />}>
        <a href={site.phone.href} className="text-navy font-semibold tabular-nums">
          {site.phone.display}
        </a>
        <OpenNow hours={site.openingHours} text={t.openNow} className="ml-2" />
      </InfoRow>
      {t.visit.hours.map((entry) => (
        <InfoRow key={entry.department} icon={<Clock />}>
          {entry.department}: {entry.hours}
        </InfoRow>
      ))}
      <InfoRow icon={<Car />}>{t.visit.parking}</InfoRow>
      <InfoRow icon={<Train />}>{t.visit.transit}</InfoRow>
    </>
  );

  const routeLink = (small?: boolean) => (
    <a
      href={site.mapsUrl}
      target="_blank"
      rel="noopener"
      className={`link-arrow ${small ? "text-sm" : "mt-2 lg:mt-3"}`}
    >
      <MapPin size={small ? 16 : 18} />
      <span>{t.visit.route}</span>
      <ArrowRight size={small ? 16 : 18} />
      <span className="sr-only">{t.visit.routeSr}</span>
    </a>
  );

  // Hover/focus/press styling: .booking-row / .booking-pill in globals.css (department color)
  const pill = (dept: (typeof bookingList)[number], compact: boolean) => (
    <a
      href={dept.bookingUrl ?? dept.href}
      target="_blank"
      rel="noopener"
      style={{ "--dept": dept.color } as CSSProperties}
      data-book={dept.id}
      className={`booking-row booking-pill flex items-center gap-2 rounded-full ${
        compact
          ? "bg-ivory min-h-11 px-3 py-1 text-sm"
          : "min-h-11 px-3 py-1 text-sm lg:min-h-12 lg:gap-3 lg:pr-2 lg:pl-4 lg:text-base"
      }`}
    >
      <span
        className="booking-dot size-2 flex-none rounded-full bg-(--dept)"
        aria-hidden="true"
      />
      <span className="booking-name truncate font-semibold">{dept.name}</span>
      {compact ? null : (
        <>
          <span className="text-subtle ml-auto hidden text-sm whitespace-nowrap lg:inline">
            {dept.id === "physio" ? t.booking.contact : dept.bookingSub}
          </span>
          <ArrowRight className="booking-arrow hidden flex-none lg:block" />
        </>
      )}
      <span className="sr-only">
        {dept.id === "physio" ? t.booking.contact : dept.bookingSub} {t.a11y.newTab}
      </span>
    </a>
  );

  return (
    <section id="praxis" aria-labelledby="praxis-title" className="section section-white" data-track-location="visit">
      <div className="container-roc">
        <SectionHeader id="praxis-title" title={t.visit.title} intro={t.visit.text} />

        {/* One image on mobile, three (one arch-topped) from lg */}
        <div className="mt-10 grid items-end gap-4 lg:mt-14 lg:grid-cols-[1.45fr_0.72fr_1fr] lg:gap-6">
          <div
            data-reveal="image"
            className="bg-sand relative h-[180px] overflow-hidden rounded-[20px] sm:h-[200px]"
          >
            <Photo
              src={noBlur(behandlung)}
              alt={t.visit.images.main}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-cover"
            />
          </div>
          <div data-reveal="image" className="arch bg-sand relative hidden h-[200px] lg:block">
            <Photo
              src={noBlur(hautscreening)}
              alt={t.visit.images.arch}
              sizes="280px"
              className="object-cover"
            />
          </div>
          <div
            data-reveal="image"
            className="bg-sand relative hidden h-[160px] overflow-hidden rounded-[20px] lg:block"
          >
            <Photo src={noBlur(kurse)} alt={t.visit.images.third} sizes="390px" className="object-cover" />
          </div>
        </div>

        {/* Mobile: one compact card – directions, English info, booking pills */}
        <div data-reveal="text" className="bg-sand mt-4 rounded-[20px] p-4 lg:hidden">
          <h3 className="h3 !text-xl">
            {site.address.streetDisplay}, {site.address.postalCode} {site.address.city}
          </h3>
          <ul className="text-ink mt-3 space-y-1.5 text-sm leading-snug">{infoRows}</ul>
          <div className="mt-1 flex flex-wrap items-center gap-x-5">
            {routeLink(true)}
            <a href={site.internationalUrl} lang="en" className="link-arrow text-sm">
              <span>{t.visit.international.cta}</span>
              <ArrowRight />
            </a>
          </div>
          <ul
            data-reveal="grid"
            className="border-line-strong mt-3 grid grid-cols-2 gap-1.5 border-t pt-3"
          >
            {bookingList.map((dept, i) => (
              <li key={dept.id} style={{ "--i": i } as CSSProperties} className="min-w-0">
                {pill(dept, true)}
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile: route map full width below the text, ≤ 300px tall */}
        <div data-reveal="image" className="mx-auto mt-4 w-full max-w-[400px] lg:hidden">
          <VisitMap text={t.visit.map} compact />
        </div>

        {/* Desktop: address + directions on the left, the route map on the right (55 %, ≤ 420px) */}
        <div className="hidden lg:mt-6 lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-start lg:gap-6">
          <div data-reveal="text" className="bg-sand rounded-[20px] p-6">
            <h3 className="h3 !text-2xl">
              {site.address.streetDisplay},
              <br />
              {site.address.postalCode} {site.address.city}
            </h3>
            <ul className="text-ink mt-4 space-y-1.5 text-sm leading-normal">{infoRows}</ul>
            {routeLink()}
          </div>
          <div data-reveal="image" className="mx-auto w-full max-w-[800px]">
            <VisitMap text={t.visit.map} />
          </div>
        </div>

        <div data-reveal="grid" className="hidden gap-6 lg:mt-6 lg:grid lg:grid-cols-2">
          {/* International patients (English block) */}
          <div
            lang="en"
            style={{ "--i": 0 } as CSSProperties}
            className="on-dark bg-navy-deep relative flex flex-col overflow-hidden rounded-[20px] p-6 text-white"
          >
            <div className="relative flex flex-1 flex-col">
              <p className="eyebrow !text-sm">{t.visit.international.eyebrow}</p>
              <h3 className="h3 mt-1.5 !text-2xl">{t.visit.international.title}</h3>
              <p className="mt-4 text-sm leading-normal text-white/80">
                {t.visit.international.text}
              </p>
              <a href={site.internationalUrl} className="btn btn-light mt-auto self-start">
                {t.visit.international.cta}
                <ArrowRight />
              </a>
            </div>
          </div>

          {/* Booking – no box: a hairline above the list is enough on the white section */}
          <div style={{ "--i": 1 } as CSSProperties} className="border-line border-t pt-5 lg:pt-6">
            <h3 className="h3 !text-2xl">{t.visit.booking.title}</h3>
            <ul data-reveal="grid" className="mt-4 grid gap-2">
              {bookingList.map((dept, i) => (
                <li key={dept.id} style={{ "--i": i } as CSSProperties} className="min-w-0">
                  {pill(dept, false)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
