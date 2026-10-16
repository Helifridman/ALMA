import type { ExerciseResult, Skill } from "./types";

export const XP = {
  correctFirstTry: 10,
  correctAfterRetry: 5,
  lessonComplete: 20,
  perfectBonus: 15,
  reviewSession: 15,
  placement: 25,
} as const;

export const COINS = {
  lessonComplete: 10,
  perfectBonus: 5,
  reviewSession: 5,
  masteredWord: 2,
} as const;

export const DEFAULT_DAILY_GOAL_XP = 40;

export function xpForResult(r: ExerciseResult): number {
  if (!r.correct) return 0;
  return r.firstTry ? XP.correctFirstTry : XP.correctAfterRetry;
}

/** Score 0..100 = share of exercises solved on the first try, with retries counting half. */
export function lessonScore(results: ExerciseResult[]): number {
  if (results.length === 0) return 0;
  const points = results.reduce((sum, r) => sum + (r.correct ? (r.firstTry ? 1 : 0.5) : 0), 0);
  return Math.round((points / results.length) * 100);
}

export function isPerfect(results: ExerciseResult[]): boolean {
  return results.length > 0 && results.every((r) => r.correct && r.firstTry);
}

export function lessonXP(results: ExerciseResult[]): number {
  const base = results.reduce((sum, r) => sum + xpForResult(r), 0);
  return base + XP.lessonComplete + (isPerfect(results) ? XP.perfectBonus : 0);
}

export function lessonCoins(results: ExerciseResult[]): number {
  return COINS.lessonComplete + (isPerfect(results) ? COINS.perfectBonus : 0);
}

/** Level thresholds for the learner "rank" shown on the home screen. */
export const RANKS = [
  { minXP: 0, titleHe: "מתחילה" },
  { minXP: 150, titleHe: "חוקרת" },
  { minXP: 400, titleHe: "הרפתקנית" },
  { minXP: 800, titleHe: "מגלה" },
  { minXP: 1500, titleHe: "אלופה" },
  { minXP: 2500, titleHe: "אגדה" },
];

export function rankFor(totalXP: number): { index: number; titleHe: string; nextXP: number | null; progress: number } {
  let index = 0;
  for (let i = 0; i < RANKS.length; i++) if (totalXP >= RANKS[i].minXP) index = i;
  const next = RANKS[index + 1];
  const start = RANKS[index].minXP;
  const progress = next ? (totalXP - start) / (next.minXP - start) : 1;
  return { index, titleHe: RANKS[index].titleHe, nextXP: next ? next.minXP : null, progress: Math.min(1, Math.max(0, progress)) };
}

export function emptySkillCounts(): Record<Skill, [number, number]> {
  return { vocabulary: [0, 0], reading: [0, 0], writing: [0, 0], listening: [0, 0], speaking: [0, 0], grammar: [0, 0] };
}
