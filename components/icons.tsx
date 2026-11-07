import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

// One icon set: 1.6px stroke, round caps, two sizes only – 20 (inline, default) and 24
// (standalone round buttons). One arrow glyph (ArrowRight; ArrowLeft is its mirror).
// Decorative by default.
function Icon({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Icon>
);

export const ArrowLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </Icon>
);

export const Calendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </Icon>
);

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.6 3.5h2.6l1.5 4.2-2 1.5a12.5 12.5 0 0 0 6.1 6.1l1.5-2 4.2 1.5v2.6a2.1 2.1 0 0 1-2.3 2.1A16.6 16.6 0 0 1 4.5 5.8a2.1 2.1 0 0 1 2.1-2.3Z" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8h16M4 16h16" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Icon>
);

export const Warning = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4 2.8 19.5h18.4L12 4Z" />
    <path d="M12 10v4.5M12 17.2v.1" />
  </Icon>
);

export const Scan = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
    <path d="M8 12h8M12 8v8" />
  </Icon>
);

export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.3-4.3" />
  </Icon>
);

export const MapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.900 12 21 12 21Z" />
    <circle cx="12" cy="9.500" r="2.500" />
  </Icon>
);

export const Clock = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.500" />
    <path d="M12 7.500V12l3 2" />
  </Icon>
);

export const Car = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 16v-3.500l1.800-4.700A2 2 0 0 1 7.700 6.500h8.600a2 2 0 0 1 1.900 1.300L20 12.500V16" />
    <path d="M3.500 16h17v2.500h-17zM7 13h.1M17 13h-.1" />
  </Icon>
);

export const Train = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5.500" y="3.500" width="13" height="13.500" rx="3" />
    <path d="M5.500 11h13M9 14h.1M15 14h-.1M8 20.500l1.500-3.500M16 20.500 14.500 17" />
  </Icon>
);

export function Star({ size = 16, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m12 2.800 2.800 5.900 6.400.8-4.700 4.500 1.200 6.400L12 17.300l-5.700 3.100 1.200-6.400L2.800 9.500l6.400-.8L12 2.800Z" />
    </svg>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={`text-orange inline-flex gap-0.5 ${className ?? ""}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} />
      ))}
    </span>
  );
}
