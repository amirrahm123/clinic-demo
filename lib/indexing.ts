/**
 * Pre-launch guard: the Vercel production URL is publicly reachable, so every
 * route sends `noindex` (robots meta + X-Robots-Tag) until launch.
 * TODO(client): at launch set NEXT_PUBLIC_INDEXABLE=1 in the Vercel project
 * (Production environment) – nothing else needs to change.
 */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "1";

export const robotsMeta = isIndexable
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true };
