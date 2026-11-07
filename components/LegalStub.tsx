import Link from "next/link";
import { getDict, localePath, type Locale } from "@/content/i18n";
import { ArrowRight } from "./icons";

interface LegalStubProps {
  locale: Locale;
  page: "imprint" | "privacy";
  /** Where the currently valid version lives until the final text is supplied */
  currentUrl: string;
}

/** Placeholder layout for legal pages until the client supplies the final texts. */
export function LegalStub({ locale, page, currentUrl }: LegalStubProps) {
  const t = getDict(locale);
  return (
    <div className="container-roc section min-h-[60svh]">
      <h1 className="h2">{t.legal[page]}</h1>
      <p className="lead mt-6 max-w-2xl">
        {t.legal.text}{" "}
        <a href={currentUrl} className="text-navy font-semibold underline underline-offset-4">
          {currentUrl.replace("https://", "").replace(/\/$/, "")}
        </a>
        .
      </p>
      <Link href={localePath(locale, "/")} className="link-arrow mt-6">
        <span>{t.legal.home}</span>
        <ArrowRight />
      </Link>
    </div>
  );
}
