import { track } from "@vercel/analytics";

/**
 * Custom events for Vercel Web Analytics (cookieless). Generic actions only: no free text,
 * no body zone, no matched topic, nothing about symptoms or a person. Properties are a
 * department id, a UI location or a language – that is all. Documented in the README
 * ("Analytics"); keep both in sync.
 */
export type BookLocation = "hero" | "header" | "dialog" | "bodymap" | "visit" | "profile";

type Events = {
  /** A booking trigger (opens the dialog) or an outbound booking link */
  book_click: { department?: string; location: BookLocation | string };
  /** Any tel: link */
  phone_click: { location: string };
  /** A doctor profile opened – only the department, never the doctor */
  profile_open: { department: string };
  /** The free-text search was used – no properties at all */
  find_specialist_submit: Record<string, never>;
  lang_switch: { to: "de" | "en" };
};

export function trackEvent<K extends keyof Events>(name: K, props: Events[K]): void {
  try {
    const clean: Record<string, string> = {};
    for (const [k, v] of Object.entries(props)) if (v !== undefined) clean[k] = String(v);
    track(name, clean);
  } catch {
    // never let analytics break an interaction
  }
}
