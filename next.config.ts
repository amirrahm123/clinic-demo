import type { NextConfig } from "next";

// Mirrors lib/indexing.ts (next.config cannot use the "@/" alias)
const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Pre-launch: keep the public Vercel URL out of search engines (see lib/indexing.ts)
    if (isIndexable) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
  async redirects() {
    // Legal pages are German only and live under /de
    return [
      { source: "/impressum", destination: "/de/impressum", permanent: true },
      { source: "/datenschutz", destination: "/de/datenschutz", permanent: true },
    ];
  },
};

export default nextConfig;
