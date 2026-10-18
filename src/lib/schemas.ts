import { z } from "zod";

/** Zod schemas used to validate persisted state before it is trusted. */

export const skillSchema = z.enum(["vocabulary", "reading", "writing", "listening", "speaking", "grammar"]);

export const profileSchema = z.object({
  id: z.string(),
  nickname: z.string().min(1).max(20),
  grade: z.union([z.literal(4), z.literal(5), z.literal(6), z.literal("other")]),
  interests: z.array(z.string()),
  mascotId: z.string(),
  createdAt: z.string(),
});

export const vocabProgressSchema = z.object({
  vocabularyItemId: z.string(),
  correctCount: z.number(),
  incorrectCount: z.number(),
  recallCorrectCount: z.number().default(0),
  masteryLevel: z.number(),
  lastReviewedAt: z.string().nullable(),
  nextReviewAt: z.string().nullable(),
  lastErrorKind: z.enum(["spelling", "meaning", "grammar", "unknown-word", "listening", "order"]).optional(),
});

export const lessonProgressSchema = z.object({
  lessonId: z.string(),
  status: z.enum(["locked", "available", "in-progress", "completed"]),
  score: z.number(),
  attempts: z.number(),
  completedAt: z.string().nullable(),
});

const pair = z.tuple([z.number(), z.number()]);

export const statsSchema = z.object({
  totalXP: z.number(),
  coins: z.number(),
  currentStreak: z.number(),
  longestStreak: z.number(),
  completedLessons: z.number(),
  wordsMastered: z.number(),
  lastActiveDate: z.string().nullable(),
  xpByDay: z.record(z.string(), z.number()),
  secondsByDay: z.record(z.string(), z.number()),
  skillCounts: z.object({ vocabulary: pair, reading: pair, writing: pair, listening: pair, speaking: pair, grammar: pair }),
  dailyGoalXP: z.number(),
});

export const settingsSchema = z.object({
  reduceMotion: z.boolean(),
  soundOn: z.boolean(),
  ttsRate: z.number(),
  showHints: z.boolean(),
  parentPin: z.string().nullable(),
  showTransliteration: z.boolean(),
});

export const persistedStateSchema = z.object({
  profile: profileSchema.nullable(),
  settings: settingsSchema,
  placement: z.object({ done: z.boolean(), level: z.number(), completedAt: z.string().nullable() }),
  lessonProgress: z.record(z.string(), lessonProgressSchema),
  vocabProgress: z.record(z.string(), vocabProgressSchema),
  stats: statsSchema,
  achievements: z.record(z.string(), z.string()),
  ownedCosmetics: z.array(z.string()),
  equipped: z.record(z.string(), z.string()),
  counters: z.object({
    reviewSessions: z.number(),
    perfectLessons: z.number(),
    spellingCorrect: z.number(),
    listeningCorrect: z.number(),
  }),
  weekly: z.object({ weekKey: z.string(), lessons: z.number(), reviews: z.number(), words: z.number() }),
});

export type PersistedState = z.infer<typeof persistedStateSchema>;
