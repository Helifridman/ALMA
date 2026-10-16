"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

const COLORS = ["#6d4df2", "#2bb3e8", "#22c58b", "#ff6b5e", "#f6b02c", "#ec4899"];

export function Confetti({ count = 40 }: { count?: number }) {
  const reduce = useAppStore((s) => s.settings.reduceMotion);
  const [pieces, setPieces] = useState<{ left: number; delay: number; color: string; rot: number }[]>([]);
  useEffect(() => {
    setPieces(Array.from({ length: count }, () => ({ left: Math.random() * 100, delay: Math.random() * 0.8, color: COLORS[Math.floor(Math.random() * COLORS.length)], rot: Math.random() * 360 })));
  }, [count]);
  if (reduce) return null;
  return (
    <div aria-hidden="true">
      {pieces.map((p, i) => (
        <span key={i} className="confetti-piece" style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, background: p.color, transform: `rotate(${p.rot}deg)` }} />
      ))}
    </div>
  );
}
