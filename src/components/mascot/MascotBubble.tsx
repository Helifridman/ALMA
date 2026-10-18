"use client";

import { useAppStore } from "@/lib/store";
import { MascotAvatar, type MascotMood } from "./MascotAvatar";

export function MascotBubble({ text, mood = "happy", size = 88, className = "" }: { text: string; mood?: MascotMood; size?: number; className?: string }) {
  const mascotId = useAppStore((s) => s.profile?.mascotId ?? "pixi");
  const equipped = useAppStore((s) => s.equipped);
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <MascotAvatar mascotId={mascotId} mood={mood} size={size} equipped={equipped} className="shrink-0 anim-float" />
      <div className="relative bg-card border border-line rounded-2xl rounded-br-sm px-4 py-3 shadow-card text-base font-medium leading-relaxed anim-pop" role="status" aria-live="polite">
        {text}
      </div>
    </div>
  );
}
