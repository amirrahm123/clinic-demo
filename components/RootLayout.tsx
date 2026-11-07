import { Barlow_Condensed, Fraunces, Hanken_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
import { BookingDialogLazy } from "@/components/LazyDialogs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { INTRO_HEAD_SCRIPT, IntroOverlay } from "@/components/IntroOverlay";
import { LangBanner } from "@/components/LangBanner";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { REVEAL_SCRIPT } from "@/components/Reveal";
import { getBookingList } from "@/content/departments";
import { getDict, type Locale } from "@/content/i18n";
import "@/app/globals.css";

// next/font downloads the files at build time and self-hosts them –
// no runtime request to Google (GDPR).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-barlow",
  display: "swap",
  // Eyebrows only – not worth a preload competing with the hero image
  preload: false,
});

/** Shared root layout; each locale route group renders it with its own <html lang>. */
export function RootLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDict(locale);
  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${hanken.variable} ${barlow.variable}`}
      // The head script below sets data-intro on <html> before hydration.
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- root layout <head> (component lives outside app/) */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_HEAD_SCRIPT }} />
      </head>
      <body>
        <IntroOverlay
          tagline={t.intro.tagline}
          skipLabel={t.intro.skip}
          skipAria={t.a11y.skipIntro}
        />
        <div id="page">
          <a
            href="#inhalt"
            className="focus:bg-navy sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:px-5 focus:py-3 focus:text-white"
          >
            {t.a11y.skipToContent}
          </a>
          <Header locale={locale} />
          {locale === "en" ? <LangBanner /> : null}
          <main id="inhalt">{children}</main>
          <Footer locale={locale} />
        </div>
        <a
          href="mailto:amirrahm135@gmail.com?subject=BuildLab%20demo"
          className="fixed bottom-20 left-3 z-40 rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur lg:bottom-4"
        >
          Design demo · BuildLab
        </a>
        <MobileBookingBar bookLabel={t.header.book} callLabel={t.a11y.call} />
        <AnalyticsEvents />
        <BookingDialogLazy
          rows={getBookingList(locale).map((d) => ({
            id: d.id,
            name: d.name,
            sub: d.bookingSub,
            url: d.bookingUrl ?? d.href,
            color: d.color,
            image: d.image,
            imagePosition: d.imagePosition,
          }))}
          text={{ ...t.booking, newTab: t.a11y.newTab }}
        />
        {/* Scroll reveals: runs as soon as the DOM is parsed, before hydration */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
      </body>
    </html>
  );
}
