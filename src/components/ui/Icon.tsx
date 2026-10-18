import type { SVGProps } from "react";

export type IconName =
  | "home" | "map" | "repeat" | "trophy" | "parents" | "settings" | "speaker" | "mic" | "check" | "x"
  | "bulb" | "star" | "flame" | "coin" | "lock" | "play" | "arrow" | "book" | "ear" | "pen" | "zap"
  | "crown" | "key" | "heart" | "turtle" | "close" | "letters" | "world" | "sentence" | "speak" | "lab"
  | "clock" | "sparkle" | "shop" | "eye" | "trash" | "info" | "stop" | "chevron";

const paths: Record<IconName, React.ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></>,
  repeat: <><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>,
  trophy: <><path d="M8 21h8M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" /></>,
  parents: <><circle cx="9" cy="8" r="3.2" /><circle cx="17" cy="9.5" r="2.4" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M15.5 20a4.5 4.5 0 0 1 6 0" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  speaker: <><path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /></>,
  mic: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" /></>,
  check: <path d="m5 12 5 5L20 7" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
  star: <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />,
  flame: <path d="M12 22c4.4 0 7-3 7-7 0-3-2-5-3-6.5-.5 2-1.5 3-2.5 3.5.5-3-1-6-4-9 .5 4-3 6-4 9.5C4.3 17 7 22 12 22z" />,
  coin: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="M12 9v6M10.5 10.5h3M10.5 13.5h3" /></>,
  lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  play: <path d="M7 4v16l13-8z" />,
  arrow: <><path d="M19 12H5" /><path d="m12 5-7 7 7 7" /></>,
  chevron: <path d="m15 6-6 6 6 6" />,
  book: <><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" /><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z" /></>,
  ear: <><path d="M6 10a6 6 0 0 1 12 0c0 3-2 3.5-2 6a3 3 0 0 1-6 0" /><path d="M9.5 10a2.5 2.5 0 0 1 5 0c0 1.3-1 1.6-1 3" /></>,
  pen: <><path d="m4 20 4-1L19 8l-3-3L5 16z" /><path d="m14 7 3 3" /></>,
  zap: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  crown: <><path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5z" /><path d="M5 21h14" /></>,
  key: <><circle cx="8" cy="14" r="4" /><path d="m11 11 9-9M16 6l3 3M14 8l2 2" /></>,
  heart: <path d="M12 21s-7.5-4.6-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2 4.4-9.5 9-9.5 9z" />,
  turtle: <><path d="M5 14a7 5 0 0 1 14 0z" /><path d="M3 14h18M6 14v3M18 14v3M12 9v5" /><circle cx="20" cy="12" r="1.5" /></>,
  close: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" /></>,
  letters: <><path d="M4 18 9 6l5 12M5.8 14h6.4" /><path d="M16 10h3a2 2 0 0 1 0 4h-3zM16 14h3.5a2 2 0 0 1 0 4H16z" /></>,
  world: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  sentence: <><rect x="3" y="7" width="7" height="5" rx="1.5" /><rect x="12" y="7" width="9" height="5" rx="1.5" /><rect x="3" y="14" width="12" height="5" rx="1.5" /></>,
  speak: <><path d="M4 5h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M8 10h6" /></>,
  lab: <><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" /><path d="M7 15h10" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m12 7 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" /></>,
  shop: <><path d="M4 9h16l-1 11H5z" /><path d="M8 9V7a4 4 0 0 1 8 0v2" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  stop: <rect x="6" y="6" width="12" height="12" rx="2" />,
};

export function Icon({ name, size = 22, className, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
