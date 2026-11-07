// TODO(client): the Datenschutz text must mention Vercel Web Analytics (cookieless, no
// personal data; custom events carry only categorical values – see README "Analytics").
import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: { canonical: "/de/datenschutz" },
  robots: { index: false },
};

// TODO(client): final privacy policy text
export default function DatenschutzPage() {
  return <LegalStub locale="de" page="privacy" currentUrl="#" />;
}
