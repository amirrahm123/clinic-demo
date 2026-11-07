import { getDict, type Locale } from "@/content/i18n";
import { getReviews } from "@/content/reviews";
import { getSteps } from "@/content/steps";
import { JourneySteps } from "./JourneySteps";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { SectionHeader } from "./SectionHeader";

export function Journey({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  // Google reviews: auto-rotating card under the step list (content/reviews.ts)
  const quote = (
    <ReviewsCarousel
      reviews={getReviews(locale)}
      text={{
        label: t.journey.reviewsLabel,
        starsSr: t.journey.starsSr,
        source: t.journey.source,
        translated: t.journey.translated,
        prev: t.journey.reviewPrev,
        next: t.journey.reviewNext,
        counter: t.journey.reviewCounter,
        quotes: locale === "de" ? ["„", "“"] : ["“", "”"],
      }}
    />
  );

  return (
    <section
      id="weg"
      aria-labelledby="weg-title"
      className="on-dark section arc-edges bg-navy relative overflow-hidden text-white"
    >
      <div className="container-roc relative">
        {/* Centered over the split view, lead centered under it */}
        <SectionHeader id="weg-title" center title={t.journey.title} intro={t.journey.text} />
        <div className="mt-10 lg:mt-14">
          <JourneySteps
            steps={getSteps(locale)}
            text={{
              stepsLabel: t.journey.stepsLabel,
              stepOf: t.journey.stepOf,
              showStep: t.journey.showStep,
              trackLabel: t.journey.trackLabel,
            }}
            quote={quote}
          />
        </div>
      </div>
    </section>
  );
}
