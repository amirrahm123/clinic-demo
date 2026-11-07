import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/de/impressum" },
  robots: { index: false },
};

// TODO(client): final Impressum text
export default function ImpressumPage() {
  return <LegalStub locale="de" page="imprint" currentUrl="#" />;
}
