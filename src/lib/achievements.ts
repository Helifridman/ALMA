import { ACHIEVEMENTS } from "@/content/achievements";
import { lessonsForWorld } from "@/content";
import type { Achievement, LessonProgress, UserStats } from "./types";

export interface AchievementContext {
  stats: UserStats;
  lessonProgress: Record<string, LessonProgress>;
  placementDone: boolean;
  reviewSessions: number;
  perfectLessons: number;
  spellingCorrect: number;
  listeningCorrect: number;
}

export function isUnlocked(a: Achievement, ctx: AchievementContext): boolean {
  const c = a.criteria;
  switch (c.kind) {
    case "lessons":
      return ctx.stats.completedLessons >= c.count;
    case "xp":
      return ctx.stats.totalXP >= c.amount;
    case "streak":
      return ctx.stats.longestStreak >= c.days;
    case "words-mastered":
      return ctx.stats.wordsMastered >= c.count;
    case "perfect-lesson":
      return ctx.perfectLessons >= 1;
    case "placement":
      return ctx.placementDone;
    case "review-session":
      return ctx.reviewSessions >= c.count;
    case "spelling":
      return ctx.spellingCorrect >= c.count;
    case "listening":
      return ctx.listeningCorrect >= c.count;
    case "world-complete":
      return lessonsForWorld(c.worldId).every((l) => ctx.lessonProgress[l.id]?.status === "completed");
  }
}

/** Returns ids newly unlocked compared with `already`. */
export function newlyUnlocked(ctx: AchievementContext, already: Record<string, string>): string[] {
  return ACHIEVEMENTS.filter((a) => !already[a.id] && isUnlocked(a, ctx)).map((a) => a.id);
}
