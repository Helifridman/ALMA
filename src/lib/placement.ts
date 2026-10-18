import type { ExerciseResult, Level } from "./types";
import { PLACEMENT_QUESTIONS } from "@/content/placement";

/**
 * Determines the starting level from placement results.
 * A level is "passed" when at least 2/3 of its questions were answered correctly on the first try.
 * The learner starts at the first level that was NOT passed (capped at 3 so every learner
 * still gets the sentence-building foundations before the reading world).
 */
export function determineLevel(results: ExerciseResult[]): { level: Level; perLevel: Record<number, { correct: number; total: number }> } {
  const perLevel: Record<number, { correct: number; total: number }> = {};
  for (const q of PLACEMENT_QUESTIONS) {
    const r = results.find((x) => x.exerciseId === q.exercise.id);
    if (!r) continue;
    perLevel[q.level] ??= { correct: 0, total: 0 };
    perLevel[q.level].total += 1;
    if (r.correct && r.firstTry) perLevel[q.level].correct += 1;
  }
  let level: Level = 0;
  for (const lv of [0, 1, 2, 3] as Level[]) {
    const s = perLevel[lv];
    if (s && s.total > 0 && s.correct / s.total >= 2 / 3) level = (lv + 1) as Level;
    else break;
  }
  return { level: Math.min(level, 3) as Level, perLevel };
}

/** Questions to ask, adaptively: stop once a level is clearly failed. */
export function shouldContinue(results: ExerciseResult[], nextLevel: Level): boolean {
  const { perLevel } = determineLevel(results);
  for (let lv = 0; lv < nextLevel; lv++) {
    const s = perLevel[lv];
    if (s && s.total >= 3 && s.correct === 0) return false;
  }
  return true;
}

export const LEVEL_NAMES_HE: Record<Level, string> = {
  0: "רמה 0: אותיות, צלילים ומילים ראשונות",
  1: "רמה 1: מילים נפוצות ומשפטים קצרים",
  2: "רמה 2: משפטים בסיסיים, שאלות ותשובות",
  3: "רמה 3: קריאה, דקדוק ושיחה בסיסית",
  4: "רמה 4: סיפורים, כתיבה והבעה",
};

/** First lesson suggested for each level (world ids). */
export const START_WORLD_FOR_LEVEL: Record<Level, string> = { 0: "w1", 1: "w2", 2: "w3", 3: "w5", 4: "w5" };
