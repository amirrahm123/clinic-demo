"use client";

import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/content/i18n";
import { openStatus, type OpeningHours } from "@/lib/openingHours";

/** Re-evaluates once a minute; the server snapshot is null → nothing is rendered until hydration */
const subscribe = (notify: () => void) => {
  const id = window.setInterval(notify, 60_000);
  return () => window.clearInterval(id);
};

interface OpenNowProps {
  hours: OpeningHours | null;
  text: Dictionary["openNow"];
  className?: string;
}

/**
 * "Open now · until 18:00" / "Closed · opens Mon 8:00" from site.openingHours, computed on
 * the client in Europe/Berlin (no SSR mismatch). Renders nothing while the hours are still
 * TODO(client) (hours === null) and nothing before hydration.
 */
export function OpenNow({ hours, text, className }: OpenNowProps) {
  // getSnapshot must return a stable value between changes: a string, not a fresh object
  const snapshot = useSyncExternalStore(
    subscribe,
    () => {
      if (!hours) return null;
      const s = openStatus(hours, new Date());
      if (!s) return null;
      if (s.open) return `1${text.open.replace("{time}", s.time)}`;
      const day = s.day ? `${text.days[s.day]} ` : "";
      return `0${text.closed.replace("{day}", day).replace("{time}", s.time)}`;
    },
    () => null,
  );
  const status = snapshot ? { open: snapshot.startsWith("1"), label: snapshot.slice(1) } : null;
  if (!status) return null;
  return (
    <span
      data-open={status.open}
      className={`open-now inline-flex items-center gap-1.5 text-sm whitespace-nowrap tabular-nums ${className ?? ""}`}
    >
      <span aria-hidden="true" className="open-now-dot size-2 flex-none rounded-full" />
      {status.label}
    </span>
  );
}
