import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const home = { en: `${base}/`, de: `${base}/de` };
  return [
    {
      url: home.en,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: home.en, de: home.de, "x-default": home.en } },
    },
    {
      url: home.de,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: home.en, de: home.de, "x-default": home.en } },
    },
    { url: `${base}/de/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/de/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
