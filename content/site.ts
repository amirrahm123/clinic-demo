import type { OpeningHours } from "@/lib/openingHours";

// Locale-independent site data. All visible text lives in content/i18n.
// DEMO: fictional clinic for a BuildLab design demo.
// Everything marked TODO(client) is a placeholder that must be confirmed or
// supplied by Isarblick before launch (see README).

const INTERNATIONAL_URL = "/#praxis";

export const site = {
  name: "Praxisklinik Isarblick",

  // TODO(client): final production domain (used for canonical, sitemap, Open Graph)
  url: "https://clinic-demo.vercel.app",

  // TODO(client): confirm central phone number (taken from the current roc.de site)
  phone: { display: "+49\u00a089\u00a01234\u00a05670", href: "tel:+498912345670" },

  // TODO(client): confirm central e-mail address (taken from the current roc.de site)
  email: "kontakt@praxisklinik-demo.de",

  address: {
    street: "Musterstraße\u00a012",
    streetDisplay: "Musterstraße\u00a012",
    postalCode: "81675",
    city: "München",
    country: "DE",
  },

  // TODO(client): opening hours per department live in content/i18n (visit.hours)

  // TODO(client): structured opening hours (Europe/Berlin). While this is null, the
  // "Open now" status (header + Visit) and the JSON-LD openingHoursSpecification stay off.
  // Example: { mo: [["08:00", "18:00"]], tu: [["08:00", "18:00"]], ..., fr: [["08:00", "14:00"]] }
  openingHours: null as OpeningHours | null,

  // Plain link instead of an embedded map – embeds would require cookie consent.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=M%C3%BCnchen",

  // TODO(client): keep Google rating & review count up to date (or wire to an API later)
  rating: { value: "4,9", valueEn: "4.9", count: 128 },
  // TODO(client): link to the Google Business profile (reviews); a Maps search until then
  googleProfileUrl: "#",

  // TODO(client): confirm social media URLs (taken from the current roc.de site)
  social: { instagram: "#", facebook: "#", youtube: "#" },

  internationalUrl: INTERNATIONAL_URL,
  teamUrl: "/#team",

  /** Nav items: label keys resolve in content/i18n (header.nav). */
  nav: [
    { key: "complaints", href: "/#koerper" },
    { key: "departments", href: "/#fach" },
    { key: "team", href: "/#team" },
    { key: "practice", href: "/#praxis" },
    { key: "international", href: INTERNATIONAL_URL, external: true },
  ] as const,

  footer: {
    roc: [
      { key: "team", href: "/#team" },
      { key: "careers", href: "#" },
      { key: "events", href: "#" },
      { key: "guide", href: "#" },
    ] as const,
    press: "#",
  },
} as const;

/** Hero quick-entry chips (max 5, one row). `zone` must be a key of the body-map zones; labels in i18n (hero.chips). */
export const heroChips = [
  { key: "knie", zone: "knie" },
  { key: "ruecken", zone: "ruecken" },
  { key: "schulter", zone: "schulter" },
  { key: "haut", zone: "haut" },
  { key: "gyne", zone: "gyne" },
] as const;
