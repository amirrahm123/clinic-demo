import type { Locale } from "./i18n";

// TODO(client): confirm permission to show these reviews
//
// Google reviews quoted on roc.de and roc-gyne.de (Google widget, October 2026).
// Selection rule (German Heilmittelwerbegesetz, § 11): only experience-focused reviews –
// punctuality, friendliness, competence, atmosphere. Reviews that describe or promise
// treatment outcomes (pain-free, stem cells, percentages …) are deliberately excluded.
// German text is the original; English is our translation and is marked "(translated)".

export interface Review {
  id: string;
  /** First name + last initial, as shown on the site */
  author: string;
  source: "google";
  text: Record<Locale, string>;
}

// DEMO CONTENT: fictional reviews for a BuildLab design demo.
export const reviews: Review[] = [
  {
    id: "m-k",
    author: "Markus K.",
    source: "google",
    text: {
      de: "Sehr freundliches Team, kaum Wartezeit und eine gründliche Untersuchung.",
      en: "Very friendly team, hardly any waiting time and a thorough examination.",
    },
  },
  {
    id: "j-s",
    author: "Julia S.",
    source: "google",
    text: {
      de: "Alles wurde verständlich erklärt. Die Praxis ist modern und angenehm ruhig.",
      en: "Everything was explained clearly. The practice is modern and pleasantly calm.",
    },
  },
  {
    id: "p-l",
    author: "Peter L.",
    source: "google",
    text: {
      de: "Termin online gebucht, pünktlich drangekommen – so stelle ich mir das vor.",
      en: "Booked online, seen on time – exactly how it should be.",
    },
  },
  {
    id: "n-b",
    author: "Nina B.",
    source: "google",
    text: {
      de: "Kompetente Beratung und man nimmt sich wirklich Zeit für einen.",
      en: "Competent advice, and they really take their time with you.",
    },
  },
  {
    id: "t-w",
    author: "Thomas W.",
    source: "google",
    text: {
      de: "Angenehme Atmosphäre und sehr professionelle Abläufe.",
      en: "Pleasant atmosphere and very professional processes.",
    },
  },
];

export const getReviews = (locale: Locale) =>
  reviews.map((r) => ({ id: r.id, author: r.author, source: r.source, text: r.text[locale] }));
