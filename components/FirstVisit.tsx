import { getDict, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { Accordion } from "./Accordion";
import { Phone } from "./icons";
import { accentTitle } from "./SectionHeader";

/** Questions and answers of the "Your first visit" section (also used for the FAQ JSON-LD). */
export function getFirstVisitItems(locale: Locale) {
  const t = getDict(locale);
  return t.firstVisit.questions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer
      .replace("{parking}", t.visit.parking)
      .replace("{transit}", t.visit.transit)
      .replace("{address}", `${site.address.streetDisplay}, ${site.address.postalCode} ${site.address.city}`),
  }));
}

/**
 * "Your first visit": heading, one paragraph and the call button on the left; the FAQ
 * accordion on the right. Unconfirmed facts (costs, duration, billing wording) are
 * TODO(client) in content/i18n – nothing is invented here.
 */
export function FirstVisit({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <section id="erster-besuch" data-track-location="firstvisit" aria-labelledby="erster-besuch-title" className="section">
      <div className="container-roc grid gap-x-16 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="erster-besuch-title" className="h2" data-reveal="heading">
            {accentTitle(t.firstVisit.title)}
          </h2>
          <p className="lead mt-5 max-w-[56ch]" data-reveal="text">
            {t.firstVisit.text}
          </p>
          <a href={site.phone.href} className="btn btn-primary mt-7" data-reveal="text">
            <Phone />
            {t.firstVisit.call}
            <span className="sr-only">: {site.phone.display}</span>
          </a>
        </div>
        <div className="lg:col-span-7" data-reveal="text">
          <Accordion items={getFirstVisitItems(locale)} label={t.firstVisit.label} />
        </div>
      </div>
    </section>
  );
}
