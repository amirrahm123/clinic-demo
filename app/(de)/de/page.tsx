import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { homeMetadata } from "@/lib/metadata";

export const metadata: Metadata = homeMetadata("de");

export default function GermanHomePage() {
  return <HomePage locale="de" />;
}
