/**
 * A simple, extensible spaced-repetition scheduler.
 *
 * Mastery levels 0..5. Intervals (in days) grow with mastery. A wrong answer
 * drops the level and schedules a short retry; a hard-but-correct answer keeps
 * the level and schedules soon; repeated success lengthens the interval.
 * Recall (spelling / building) counts more than recognition (picking an option).
 */
import type { AnswerMode, ErrorKind, UserVocabularyProgress } from "./types";

export const MASTERED_LEVEL = 4;
const DAY = 24 * 60 * 60 * 1000;
const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30];

export function newProgress(vocabularyItemId: string): UserVocabularyProgress {
  return {
    vocabularyItemId,
    correctCount: 0,
    incorrectCount: 0,
    recallCorrectCount: 0,
    masteryLevel: 0,
    lastReviewedAt: null,
    nextReviewAt: null,
  };
}

export interface ReviewOutcome {
  correct: boolean;
  mode: AnswerMode;
  /** Needed a retry or hint before getting it right. */
  struggled?: boolean;
  errorKind?: ErrorKind;
}

export function scheduleReview(progress: UserVocabularyProgress, outcome: ReviewOutcome, now = new Date()): UserVocabularyProgress {
  const next = { ...progress, lastReviewedAt: now.toISOString() };
  if (outcome.correct) {
    next.correctCount += 1;
    if (outcome.mode === "recall") next.recallCorrectCount += 1;
    if (outcome.struggled) {
      // Keep the level, come back soon.
      next.nextReviewAt = new Date(now.getTime() + 0.5 * DAY).toISOString();
    } else {
      // Recognition alone can't push a word past level 3; recall is needed to master it.
      const cap = outcome.mode === "recall" ? 5 : 3;
      next.masteryLevel = Math.min(cap, Math.max(next.masteryLevel, 0) + 1);
      if (next.masteryLevel < progress.masteryLevel) next.masteryLevel = progress.masteryLevel;
      next.nextReviewAt = new Date(now.getTime() + INTERVALS_DAYS[next.masteryLevel] * DAY).toISOString();
    }
  } else {
    next.incorrectCount += 1;
    next.lastErrorKind = outcome.errorKind;
    // Forgotten word: drop back to an easier stage and review within the hour.
    next.masteryLevel = Math.max(0, next.masteryLevel - 2);
    next.nextReviewAt = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
  }
  return next;
}

export function isDue(progress: UserVocabularyProgress, now = new Date()): boolean {
  if (!progress.nextReviewAt) return true;
  return new Date(progress.nextReviewAt).getTime() <= now.getTime();
}

export function isMastered(progress: UserVocabularyProgress): boolean {
  return progress.masteryLevel >= MASTERED_LEVEL;
}

export function masteryLabelHe(level: number): string {
  if (level <= 0) return "חדשה";
  if (level === 1) return "מתחילה";
  if (level === 2) return "מזהה";
  if (level === 3) return "זוכרת";
  if (level === 4) return "שולטת";
  return "מושלמת";
}

/**
 * Picks words for a review session: due words first (weakest first), then words
 * seen least recently. Returns vocab ids.
 */
export function pickReviewWords(all: UserVocabularyProgress[], count: number, now = new Date()): string[] {
  const due = all.filter((p) => isDue(p, now)).sort((a, b) => a.masteryLevel - b.masteryLevel || (a.lastReviewedAt ?? "").localeCompare(b.lastReviewedAt ?? ""));
  const notDue = all.filter((p) => !isDue(p, now)).sort((a, b) => (a.nextReviewAt ?? "").localeCompare(b.nextReviewAt ?? ""));
  return [...due, ...notDue].slice(0, count).map((p) => p.vocabularyItemId);
}
