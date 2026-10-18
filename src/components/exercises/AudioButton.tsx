"use client";

import { useEffect, useRef, useState } from "react";
import { speak, stopSpeaking, ttsSupported } from "@/lib/audio";
import { useAppStore } from "@/lib/store";
import { Icon } from "@/components/ui/Icon";

interface Props {
  text: string;
  audioUrl?: string;
  /** Automatically speak once when mounted. */
  autoPlay?: boolean;
  size?: "sm" | "md" | "lg";
  /** Show a "slow" button too. */
  slow?: boolean;
  label?: string;
  className?: string;
  onBoundary?: (charIndex: number) => void;
}

export function AudioButton({ text, audioUrl, autoPlay, size = "md", slow, label, className = "", onBoundary }: Props) {
  const rate = useAppStore((s) => s.settings.ttsRate);
  const soundOn = useAppStore((s) => s.settings.soundOn);
  const [playing, setPlaying] = useState<null | "normal" | "slow">(null);
  const [supported, setSupported] = useState(true);
  const played = useRef(false);

  useEffect(() => {
    setSupported(ttsSupported() || Boolean(audioUrl));
  }, [audioUrl]);

  const play = async (mode: "normal" | "slow") => {
    if (!supported) return;
    setPlaying(mode);
    await speak(text, { audioUrl, rate: mode === "slow" ? Math.max(0.5, rate - 0.3) : rate, onBoundary });
    setPlaying(null);
  };

  useEffect(() => {
    if (autoPlay && soundOn && !played.current) {
      played.current = true;
      const t = setTimeout(() => void play("normal"), 350);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, text]);

  useEffect(() => () => stopSpeaking(), []);

  const dims = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-9 w-9" : "h-12 w-12";
  const iconSize = size === "lg" ? 30 : size === "sm" ? 18 : 22;

  if (!supported) {
    return (
      <span className="text-xs text-ink-soft bg-line rounded-xl px-2 py-1" title="הדפדפן לא תומך בהשמעה">
        אין שמע בדפדפן הזה
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => void play("normal")}
        aria-label={label ?? `השמעה: ${text}`}
        className={`${dims} rounded-full bg-brand text-white flex items-center justify-center shadow-[0_4px_0_0_#4f34c9] active:translate-y-[2px] active:shadow-none focus-ring ${playing === "normal" ? "anim-pulse" : ""}`}
      >
        <Icon name="speaker" size={iconSize} />
      </button>
      {slow && (
        <button
          type="button"
          onClick={() => void play("slow")}
          aria-label="השמעה איטית"
          title="לאט"
          className={`h-10 w-10 rounded-full bg-sky-soft text-sky-700 flex items-center justify-center focus-ring ${playing === "slow" ? "anim-pulse" : ""}`}
        >
          <Icon name="turtle" size={20} />
        </button>
      )}
    </div>
  );
}
