"use client";

import type { ReactNode } from "react";

export type OptionState = "idle" | "selected" | "correct" | "wrong" | "dim";

const styles: Record<OptionState, string> = {
  idle: "bg-card border-line hover:border-brand hover:bg-brand-soft/40",
  selected: "bg-brand-soft border-brand ring-2 ring-brand/30",
  correct: "bg-success-soft border-success text-emerald-800",
  wrong: "bg-danger-soft border-danger text-rose-800 anim-shake",
  dim: "bg-card border-line opacity-60",
};

export function OptionButton({ state = "idle", onClick, children, disabled, className = "", en, ariaLabel }: { state?: OptionState; onClick?: () => void; children: ReactNode; disabled?: boolean; className?: string; en?: boolean; ariaLabel?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === "selected"}
      aria-label={ariaLabel}
      className={`w-full min-h-[56px] rounded-2xl border-2 px-4 py-3 font-bold text-lg transition-all duration-150 focus-ring disabled:cursor-default active:scale-[0.98] ${styles[state]} ${en ? "en" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

/** Compute the visual state of an option given the selection and grading state. */
export function optionState(value: string, selected: string | null, correct: string | null, revealed: boolean, isCorrectAnswer: boolean | null): OptionState {
  if (!revealed) return selected === value ? "selected" : "idle";
  if (isCorrectAnswer && selected === value) return "correct";
  if (!isCorrectAnswer && selected === value) return "wrong";
  if (correct !== null && value === correct) return "correct";
  return "dim";
}
