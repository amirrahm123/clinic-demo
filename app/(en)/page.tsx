import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { homeMetadata } from "@/lib/metadata";

export const metadata: Metadata = homeMetadata("en");

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
