import Link from "next/link";
import { getDepartmentList } from "@/content/departments";
import { getDict, localePath, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { ArrowRight } from "./icons";
import { LogoFull } from "./Logo";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white";

interface FooterItem {
  label: string;
  href: string;
  lang?: string;
  /** Small note after the label, e.g. "(German)" */
  note?: string;
}

function FooterLink({ href, label, lang, note }: FooterItem) {
  const internal = href.startsWith("/") && !href.includes("#");
  const content = (
    <>
      {label}
      {note ? <span className="text-sm text-white/70">{note}</span> : null}
    </>
  );
  if (internal) {
    return (
      <Link href={href} className={linkClass} lang={lang}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={linkClass} lang={lang}>
      {content}
    </a>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const columns: { id: string; title: string; items: FooterItem[] }[] = [
    {
      id: "fach",
      title: t.footer.departments,
      items: getDepartmentList(locale).map((dept) => ({ label: dept.name, href: dept.href })),
    },
    {
      id: "roc",
      title: t.footer.roc,
      items: site.footer.roc.map((item) => ({
        label: t.footer.links[item.key],
        href: item.href.startsWith("/#") ? localePath(locale, item.href) : item.href,
      })),
    },
    {
      id: "kontakt",
      title: t.footer.contact,
      items: [
        { label: t.footer.contactLinks.directions, href: localePath(locale, "/#praxis") },
        { label: t.footer.contactLinks.international, href: site.internationalUrl, lang: "en" },
        { label: "Instagram", href: site.social.instagram },
        { label: "Facebook", href: site.social.facebook },
        { label: "YouTube", href: site.social.youtube },
      ],
    },
  ];

  // Legal pages are German only; the English footer says so.
  const note = locale === "en" ? t.footer.germanNote : undefined;
  const legalLang = locale === "en" ? "de" : undefined;
  const legal: FooterItem[] = [
    { label: t.footer.legal.imprint, href: "/de/impressum", lang: legalLang, note },
    { label: t.footer.legal.privacy, href: "/de/datenschutz", lang: legalLang, note },
    { label: t.footer.legal.press, href: site.footer.press, lang: legalLang, note },
  ];

  return (
    <footer data-track-location="footer" data-reveal="text" className="on-dark bg-navy-deep pb-[88px] text-white md:pb-0">
      <div className="container-roc grid gap-5 py-6 lg:grid-cols-[1.2fr_2fr] lg:gap-10 lg:py-16">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 lg:block">
          <LogoFull className="w-[120px] text-white lg:w-[168px]" />
          <p className="text-sm text-white/70 lg:mt-6 lg:text-sm">
            {site.address.streetDisplay}
            <br />
            {site.address.postalCode} {site.address.city}
          </p>
        </div>

        {/* Mobile: accordion per column · sm+: three open columns */}
        <div className="divide-y divide-white/12 border-y border-white/12 sm:hidden">
          {columns.map((col) => (
            <details key={col.id} className="group">
              <summary className="eyebrow flex min-h-12 cursor-pointer list-none items-center justify-between !text-white/85 [&::-webkit-details-marker]:hidden">
                {col.title}
                <ArrowRight
                  className="transition-transform duration-200 group-open:rotate-90"
                />
              </summary>
              <ul className="pb-2">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <FooterLink {...item} />
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="hidden grid-cols-3 gap-6 sm:grid">
          {columns.map((col) => (
            <nav key={col.id} aria-labelledby={`footer-${col.id}`}>
              <h2 id={`footer-${col.id}`} className="eyebrow mb-3">
                {col.title}
              </h2>
              <ul>
                {col.items.map((item) => (
                  <li key={item.href}>
                    <FooterLink {...item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-roc flex flex-col gap-1 py-3 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:text-sm">
          <p>{t.footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-5">
            {legal.map((item) => (
              <li key={item.href}>
                <FooterLink {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
