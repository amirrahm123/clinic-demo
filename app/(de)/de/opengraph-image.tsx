import { OG_SIZE, renderOgImage } from "@/components/OgImage";
import { getDict } from "@/content/i18n";

export const alt = getDict("de").meta.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage("de");
}
