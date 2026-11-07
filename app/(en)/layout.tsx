import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootLayout } from "@/components/RootLayout";
import { site } from "@/content/site";
import { robotsMeta } from "@/lib/indexing";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: site.name, template: `%s – ${site.name}` },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: robotsMeta,
};

export const viewport: Viewport = { themeColor: "#F6F3EE" };

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootLayout locale="en">{children}</RootLayout>;
}
