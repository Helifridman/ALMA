import { MASCOT_BY_ID } from "@/content/mascots";

export type MascotMood = "happy" | "think" | "cheer" | "oops" | "sleep";

interface Props {
  mascotId: string;
  mood?: MascotMood;
  size?: number;
  equipped?: Record<string, string>;
  className?: string;
}

/**
 * Original companion characters drawn as SVG: Pixi the fox, Bumo the owl, Zigi the robot.
 * Cosmetics from the shop (hat / glasses / scarf) are layered on top.
 */
export function MascotAvatar({ mascotId, mood = "happy", size = 120, equipped = {}, className = "" }: Props) {
  const m = MASCOT_BY_ID[mascotId] ?? MASCOT_BY_ID.pixi;
  const eyes = mood === "sleep" ? "closed" : mood === "think" ? "side" : mood === "oops" ? "wide" : "open";
  const mouth = mood === "cheer" ? "big" : mood === "oops" ? "o" : mood === "think" ? "flat" : "smile";

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label={m.nameHe}>
      {m.id === "pixi" && <Fox color={m.color} accent={m.accent} />}
      {m.id === "bumo" && <Owl color={m.color} accent={m.accent} />}
      {m.id === "zigi" && <Robot color={m.color} accent={m.accent} />}
      <Face eyes={eyes} mouth={mouth} robot={m.id === "zigi"} />
      <Cosmetics equipped={equipped} />
    </svg>
  );
}

function Fox({ color, accent }: { color: string; accent: string }) {
  return (
    <g>
      <path d="M22 40 L36 14 L52 36 Z" fill={color} />
      <path d="M98 40 L84 14 L68 36 Z" fill={color} />
      <path d="M30 38 L38 24 L48 38 Z" fill={accent} />
      <path d="M90 38 L82 24 L72 38 Z" fill={accent} />
      <ellipse cx="60" cy="68" rx="40" ry="36" fill={color} />
      <path d="M32 78 Q60 112 88 78 Q74 66 60 70 Q46 66 32 78 Z" fill="#fff7ed" />
      <circle cx="60" cy="80" r="5" fill="#3b2a1a" />
    </g>
  );
}

function Owl({ color, accent }: { color: string; accent: string }) {
  return (
    <g>
      <ellipse cx="60" cy="66" rx="40" ry="42" fill={color} />
      <path d="M26 30 L40 44 L22 48 Z" fill={color} />
      <path d="M94 30 L80 44 L98 48 Z" fill={color} />
      <ellipse cx="60" cy="82" rx="26" ry="22" fill={accent} />
      <circle cx="44" cy="58" r="14" fill="#fff" />
      <circle cx="76" cy="58" r="14" fill="#fff" />
      <path d="M55 70 L60 80 L65 70 Z" fill="#f59e0b" />
      <path d="M44 100 Q60 112 76 100" stroke="#5b21b6" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Robot({ color, accent }: { color: string; accent: string }) {
  return (
    <g>
      <rect x="56" y="8" width="8" height="14" rx="4" fill="#64748b" />
      <circle cx="60" cy="8" r="6" fill="#f43f5e" />
      <rect x="22" y="24" width="76" height="70" rx="20" fill={color} />
      <rect x="30" y="34" width="60" height="38" rx="14" fill={accent} />
      <rect x="10" y="50" width="12" height="24" rx="6" fill="#64748b" />
      <rect x="98" y="50" width="12" height="24" rx="6" fill="#64748b" />
      <rect x="40" y="82" width="40" height="6" rx="3" fill="#0e7490" />
    </g>
  );
}

function Face({ eyes, mouth, robot }: { eyes: string; mouth: string; robot: boolean }) {
  const ey = robot ? 52 : 60;
  const my = robot ? 66 : 92;
  const eyeFill = robot ? "#0f172a" : "#1f1a3d";
  return (
    <g>
      {eyes === "closed" ? (
        <>
          <path d={`M38 ${ey} q6 5 12 0`} stroke={eyeFill} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M70 ${ey} q6 5 12 0`} stroke={eyeFill} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={eyes === "side" ? 47 : 44} cy={ey} r={eyes === "wide" ? 7 : 5.5} fill={eyeFill} />
          <circle cx={eyes === "side" ? 79 : 76} cy={ey} r={eyes === "wide" ? 7 : 5.5} fill={eyeFill} />
          <circle cx={eyes === "side" ? 49 : 46} cy={ey - 2} r="1.8" fill="#fff" />
          <circle cx={eyes === "side" ? 81 : 78} cy={ey - 2} r="1.8" fill="#fff" />
        </>
      )}
      {mouth === "smile" && <path d={`M50 ${my} q10 8 20 0`} stroke={eyeFill} strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mouth === "big" && <path d={`M46 ${my - 2} q14 16 28 0 z`} fill="#be123c" />}
      {mouth === "o" && <ellipse cx="60" cy={my + 2} rx="5" ry="6" fill="#be123c" />}
      {mouth === "flat" && <path d={`M50 ${my + 2} h20`} stroke={eyeFill} strokeWidth="3" strokeLinecap="round" />}
    </g>
  );
}

function Cosmetics({ equipped }: { equipped: Record<string, string> }) {
  return (
    <g>
      {equipped.hat === "cap" && (
        <g>
          <path d="M30 30 Q60 0 90 30 Z" fill="#2563eb" />
          <rect x="26" y="28" width="68" height="8" rx="4" fill="#1d4ed8" />
          <path d="M86 32 L108 36 L88 40 Z" fill="#1d4ed8" />
        </g>
      )}
      {equipped.hat === "crown" && <path d="M34 30 L44 10 L54 26 L60 6 L66 26 L76 10 L86 30 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />}
      {equipped.hat === "party-hat" && (
        <g>
          <path d="M60 0 L40 34 L80 34 Z" fill="#ec4899" />
          <circle cx="60" cy="2" r="4" fill="#facc15" />
          <path d="M48 20 h24 M44 28 h32" stroke="#fde68a" strokeWidth="3" />
        </g>
      )}
      {equipped.glasses === "glasses" && (
        <g stroke="#1f1a3d" strokeWidth="3" fill="none">
          <circle cx="44" cy="58" r="11" />
          <circle cx="76" cy="58" r="11" />
          <path d="M55 58 h10" />
        </g>
      )}
      {equipped.glasses === "sunglasses" && (
        <g>
          <rect x="31" y="49" width="26" height="18" rx="8" fill="#0f172a" />
          <rect x="63" y="49" width="26" height="18" rx="8" fill="#0f172a" />
          <path d="M57 56 h6" stroke="#0f172a" strokeWidth="3" />
        </g>
      )}
      {equipped.scarf === "scarf" && (
        <g>
          <path d="M28 96 Q60 112 92 96 L92 106 Q60 122 28 106 Z" fill="#ef4444" />
          <path d="M70 104 L76 120 L86 116 L80 100 Z" fill="#dc2626" />
        </g>
      )}
    </g>
  );
}
