import { ImageResponse } from "next/og";
import { getDict, type Locale } from "@/content/i18n";

export const OG_SIZE = { width: 1200, height: 630 };

const NAVY = "#002D55";
const IVORY = "#F6F3EE";
const NAVY_SOFT = "#22507D";

const MARK = [
  "M70.2,73.1l-10.8-14.4c8.6-5.8,14.3-15.6,14.3-26.7,0-16.6-12.7-30.4-29-32v9.3c11.1,1.5,19.7,11.1,19.7,22.6s-8.6,21.1-19.7,22.6v9.3c2.5-.2,5-.8,7.3-1.6l9.1,12.2c.3.5.9.7,1.5.7h6.5c1.1,0,1.8-1.3,1.1-2.2Z",
  "M80.9,32c0,16.3,12.2,29.8,28,31.9v-9.4c-10.7-1.9-18.8-11.3-18.8-22.5s8.1-20.5,18.8-22.5V.1c-15.8,2-28,15.5-28,31.9Z",
  "M144.7,32c0,16.3-12.2,29.8-28,31.9v-9.4c10.7-1.9,18.8-11.3,18.8-22.5,0-11.2-8.1-20.5-18.8-22.5V.1c15.8,2,28,15.5,28,31.9Z",
  "M152.5,32c0,16.3,12.2,29.8,28,31.9v-9.4c-10.7-1.9-18.8-11.3-18.8-22.5s8.1-20.5,18.8-22.5V.1c-15.8,2-28,15.5-28,31.9Z",
];

/** Open Graph image per locale (brand colors + logo + hero headline). */
export function renderOgImage(locale: Locale) {
  const t = getDict(locale);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: IVORY,
        padding: "72px 80px",
        color: NAVY,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <svg width="180" height="100" viewBox="44 0 137 76">
          {MARK.map((d) => (
            <path key={d} d={d} fill={NAVY} />
          ))}
        </svg>
        <div style={{ width: 1, height: 84, background: "rgba(0,45,85,0.25)" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 26,
            letterSpacing: 5,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          <span>PRAXISKLINIK</span>
          <span>ISARBLICK</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, letterSpacing: -2.5, lineHeight: 1.05 }}>{t.hero.line1}</div>
        <div style={{ fontSize: 84, letterSpacing: -2.5, lineHeight: 1.05, color: NAVY_SOFT }}>
          {t.hero.line2}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
        <div style={{ width: 14, height: 14, borderRadius: 14, background: "#F08A2C" }} />
        <span>{t.meta.ogTagline}</span>
      </div>
    </div>,
    OG_SIZE,
  );
}
