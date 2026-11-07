import { BodyMap } from "@/components/bodymap/BodyMap";
import { Departments } from "@/components/Departments";
import { DoctorProfileDialogLazy } from "@/components/LazyDialogs";
import { FirstVisit, getFirstVisitItems } from "@/components/FirstVisit";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { RevealBoot } from "@/components/Reveal";
import { TeamCarousel } from "@/components/TeamCarousel";
import { TrustStrip } from "@/components/TrustStrip";
import { Visit } from "@/components/Visit";
import { getBodyMap } from "@/content/bodyMap";
import { getDepartmentList, getDepartments } from "@/content/departments";
import { getDoctors } from "@/content/doctors";
import { getDict, localePath, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { openingHoursSpecification } from "@/lib/openingHours";
import { getSiteUrl } from "@/lib/siteUrl";
import heroImg from "@/public/images/practice/hero.jpg";

function ClinicJsonLd({ locale }: { locale: Locale }) {
  const url = getSiteUrl();
  const t = getDict(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    description: t.meta.description,
    inLanguage: locale,
    url: `${url}${localePath(locale, "/")}`,
    image: `${url}${heroImg.src}`,
    telephone: site.phone.display.replace(/\u00a0/g, " "),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street.replace(/\u00a0/g, " "),
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    medicalSpecialty: [
      "https://schema.org/Musculoskeletal",
      "https://schema.org/Physiotherapy",
      "https://schema.org/Dermatology",
      "https://schema.org/PlasticSurgery",
      "https://schema.org/Gynecologic",
    ],
    department: getDepartmentList(locale).map((dept) => ({
      "@type": "MedicalClinic",
      name: `${dept.short} – ${dept.name}`,
      url: dept.href,
    })),
    availableLanguage: ["de", "en"],
    ...(site.openingHours
      ? { openingHoursSpecification: openingHoursSpecification(site.openingHours) }
      : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** FAQPage structured data for the "Your first visit" questions. */
function FaqJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: getFirstVisitItems(locale).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const departments = getDepartments(locale);
  const doctors = getDoctors(locale);
  return (
    <>
      <ClinicJsonLd locale={locale} />
      <FaqJsonLd locale={locale} />
      <Hero locale={locale} />
      <TrustStrip locale={locale} />
      <BodyMap
        locale={locale}
        text={t.bodyMap}
        content={getBodyMap(locale)}
        departments={departments}
        doctors={doctors}
        newTab={t.a11y.newTab}
      />
      <Departments locale={locale} />
      <TeamCarousel locale={locale} />
      <Journey locale={locale} />
      <FirstVisit locale={locale} />
      <Visit locale={locale} />
      <DoctorProfileDialogLazy
        doctors={doctors}
        departments={departments}
        text={t.team.profile}
        newTab={t.a11y.newTab}
      />
      <RevealBoot />
    </>
  );
}
