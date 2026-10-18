"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ExerciseResult,
  Grade,
  Interest,
  Level,
  LessonProgress,
  LessonSummary,
  UserProfile,
  UserStats,
  UserVocabularyProgress,
} from "./types";
import { persistedStateSchema, type PersistedState } from "./schemas";
import { newProgress, scheduleReview, isMastered } from "./srs";
import { COINS, DEFAULT_DAILY_GOAL_XP, XP, emptySkillCounts, isPerfect, lessonCoins, lessonScore, lessonXP } from "./scoring";
import { daysBetween, todayKey } from "./dates";
import { newlyUnlocked } from "./achievements";
import { SHOP_BY_ID } from "@/content/mascots";
import { orderedLessons } from "@/content";

export const STORAGE_KEY = "englishquest-israel-v1";

function weekKey(d = new Date()): string {
  const x = new Date(d);
  x.setDate(d.getDate() - d.getDay());
  return todayKey(x);
}

export function emptyStats(): UserStats {
  return {
    totalXP: 0,
    coins: 0,
    currentStreak: 0,
    longestStreak: 0,
    completedLessons: 0,
    wordsMastered: 0,
    lastActiveDate: null,
    xpByDay: {},
    secondsByDay: {},
    skillCounts: emptySkillCounts(),
    dailyGoalXP: DEFAULT_DAILY_GOAL_XP,
  };
}

export function initialPersisted(): PersistedState {
  return {
    profile: null,
    settings: { reduceMotion: false, soundOn: true, ttsRate: 0.9, showHints: true, parentPin: null, showTransliteration: false },
    placement: { done: false, level: 0, completedAt: null },
    lessonProgress: {},
    vocabProgress: {},
    stats: emptyStats(),
    achievements: {},
    ownedCosmetics: [],
    equipped: {},
    counters: { reviewSessions: 0, perfectLessons: 0, spellingCorrect: 0, listeningCorrect: 0 },
    weekly: { weekKey: weekKey(), lessons: 0, reviews: 0, words: 0 },
  };
}

export interface AppState extends PersistedState {
  hydrated: boolean;
  setHydrated: () => void;
  createProfile: (p: { nickname: string; grade: Grade; interests: Interest[]; mascotId: string }) => void;
  updateProfile: (p: Partial<Pick<UserProfile, "nickname" | "grade" | "interests" | "mascotId">>) => void;
  updateSettings: (s: Partial<PersistedState["settings"]>) => void;
  completePlacement: (level: Level, results: ExerciseResult[]) => void;
  skipPlacement: () => void;
  startLesson: (lessonId: string) => void;
  completeLesson: (lessonId: string, results: ExerciseResult[], durationSeconds: number) => LessonSummary;
  completeReview: (results: ExerciseResult[], durationSeconds: number) => { xpEarned: number; coinsEarned: number; unlocked: string[] };
  recordVocabOutcome: (vocabIds: string[], outcome: { correct: boolean; mode: "recognition" | "recall"; struggled?: boolean; errorKind?: ExerciseResult["errorKind"] }) => void;
  addStudySeconds: (seconds: number) => void;
  buyCosmetic: (id: string) => boolean;
  equipCosmetic: (id: string | null, kind: string) => void;
  setDailyGoal: (xp: number) => void;
  resetAll: () => void;
}

function touchStreak(stats: UserStats, today = todayKey()): UserStats {
  if (stats.lastActiveDate === today) return stats;
  const gap = stats.lastActiveDate ? daysBetween(stats.lastActiveDate, today) : null;
  const currentStreak = gap === 1 ? stats.currentStreak + 1 : 1;
  return { ...stats, lastActiveDate: today, currentStreak, longestStreak: Math.max(stats.longestStreak, currentStreak) };
}

function addXP(stats: UserStats, xp: number, today = todayKey()): UserStats {
  return { ...stats, totalXP: stats.totalXP + xp, xpByDay: { ...stats.xpByDay, [today]: (stats.xpByDay[today] ?? 0) + xp } };
}

function addSkillCounts(stats: UserStats, results: ExerciseResult[]): UserStats {
  const skillCounts = { ...stats.skillCounts };
  for (const r of results) {
    for (const s of r.skillTags) {
      const [c, t] = skillCounts[s] ?? [0, 0];
      skillCounts[s] = [c + (r.correct ? 1 : 0), t + 1];
    }
  }
  return { ...stats, skillCounts };
}

function applyVocab(vocabProgress: Record<string, UserVocabularyProgress>, results: ExerciseResult[], now = new Date()) {
  const next = { ...vocabProgress };
  const seen = new Set<string>();
  for (const r of results) {
    for (const vid of r.vocabIds) {
      const prev = next[vid] ?? newProgress(vid);
      // Within one session, only the first outcome per word counts for scheduling,
      // except a later failure which always counts.
      if (seen.has(vid) && r.correct) continue;
      seen.add(vid);
      next[vid] = scheduleReview(prev, { correct: r.correct, mode: r.mode, struggled: r.correct && !r.firstTry, errorKind: r.errorKind }, now);
    }
  }
  return next;
}

function rollWeekly(weekly: PersistedState["weekly"]): PersistedState["weekly"] {
  const key = weekKey();
  return weekly.weekKey === key ? weekly : { weekKey: key, lessons: 0, reviews: 0, words: 0 };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialPersisted(),
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      createProfile: ({ nickname, grade, interests, mascotId }) =>
        set({
          profile: { id: `local-${Date.now().toString(36)}`, nickname: nickname.trim().slice(0, 20), grade, interests, mascotId, createdAt: new Date().toISOString() },
        }),

      updateProfile: (p) => set((s) => (s.profile ? { profile: { ...s.profile, ...p } } : {})),

      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      completePlacement: (level, results) =>
        set((s) => {
          let stats = touchStreak(s.stats);
          stats = addXP(stats, XP.placement);
          stats = addSkillCounts(stats, results);
          const vocabProgress = applyVocab(s.vocabProgress, results);
          const placement = { done: true, level, completedAt: new Date().toISOString() };
          const ctx = { stats, lessonProgress: s.lessonProgress, placementDone: true, reviewSessions: s.counters.reviewSessions, perfectLessons: s.counters.perfectLessons, spellingCorrect: s.counters.spellingCorrect, listeningCorrect: s.counters.listeningCorrect };
          const unlocked = newlyUnlocked(ctx, s.achievements);
          const achievements = { ...s.achievements };
          for (const id of unlocked) achievements[id] = new Date().toISOString();
          return { stats, vocabProgress, placement, achievements };
        }),

      skipPlacement: () => set({ placement: { done: true, level: 0, completedAt: new Date().toISOString() } }),

      startLesson: (lessonId) =>
        set((s) => {
          const prev = s.lessonProgress[lessonId];
          if (prev?.status === "completed") return {};
          return { lessonProgress: { ...s.lessonProgress, [lessonId]: { lessonId, status: "in-progress", score: prev?.score ?? 0, attempts: prev?.attempts ?? 0, completedAt: null } } };
        }),

      completeLesson: (lessonId, results, durationSeconds) => {
        const s = get();
        const today = todayKey();
        const score = lessonScore(results);
        const xpEarned = lessonXP(results);
        const coinsEarned = lessonCoins(results);
        const perfect = isPerfect(results);
        const prev = s.lessonProgress[lessonId];
        const firstCompletion = prev?.status !== "completed";

        let stats = touchStreak(s.stats, today);
        stats = addXP(stats, xpEarned, today);
        stats = addSkillCounts(stats, results);
        stats = { ...stats, coins: stats.coins + coinsEarned, secondsByDay: { ...stats.secondsByDay, [today]: (stats.secondsByDay[today] ?? 0) + durationSeconds } };
        if (firstCompletion) stats = { ...stats, completedLessons: stats.completedLessons + 1 };

        const vocabProgress = applyVocab(s.vocabProgress, results);
        const masteredBefore = Object.values(s.vocabProgress).filter(isMastered).length;
        const masteredAfter = Object.values(vocabProgress).filter(isMastered).length;
        const newlyMastered = Math.max(0, masteredAfter - masteredBefore);
        stats = { ...stats, wordsMastered: masteredAfter, coins: stats.coins + newlyMastered * COINS.masteredWord };

        const lessonProgress: Record<string, LessonProgress> = {
          ...s.lessonProgress,
          [lessonId]: { lessonId, status: "completed", score: Math.max(prev?.score ?? 0, score), attempts: (prev?.attempts ?? 0) + 1, completedAt: new Date().toISOString() },
        };

        const counters = {
          ...s.counters,
          perfectLessons: s.counters.perfectLessons + (perfect ? 1 : 0),
          spellingCorrect: s.counters.spellingCorrect + results.filter((r) => r.correct && (r.type === "spell-word" || r.type === "missing-letter")).length,
          listeningCorrect: s.counters.listeningCorrect + results.filter((r) => r.correct && (r.type === "listen-choose-image" || r.type === "listen-sentence")).length,
        };
        const weekly = rollWeekly(s.weekly);
        weekly.lessons += 1;
        weekly.words += newlyMastered;

        const ctx = { stats, lessonProgress, placementDone: s.placement.done, reviewSessions: counters.reviewSessions, perfectLessons: counters.perfectLessons, spellingCorrect: counters.spellingCorrect, listeningCorrect: counters.listeningCorrect };
        const unlocked = newlyUnlocked(ctx, s.achievements);
        const achievements = { ...s.achievements };
        for (const id of unlocked) achievements[id] = new Date().toISOString();

        set({ stats, vocabProgress, lessonProgress, counters, weekly, achievements });

        const sessionVocab = new Set(results.flatMap((r) => r.vocabIds));
        const newWords = [...sessionVocab].filter((vid) => !s.vocabProgress[vid]);
        const wordsToReview = [...sessionVocab].filter((vid) => results.some((r) => !r.correct && r.vocabIds.includes(vid)));
        return { lessonId, score, xpEarned, coinsEarned, results, newWords, wordsToReview, perfect, durationSeconds, unlockedAchievements: unlocked };
      },

      completeReview: (results, durationSeconds) => {
        const s = get();
        const today = todayKey();
        const correct = results.filter((r) => r.correct).length;
        const xpEarned = XP.reviewSession + correct * XP.correctAfterRetry;
        const coinsEarned = COINS.reviewSession;
        let stats = touchStreak(s.stats, today);
        stats = addXP(stats, xpEarned, today);
        stats = addSkillCounts(stats, results);
        stats = { ...stats, coins: stats.coins + coinsEarned, secondsByDay: { ...stats.secondsByDay, [today]: (stats.secondsByDay[today] ?? 0) + durationSeconds } };
        const vocabProgress = applyVocab(s.vocabProgress, results);
        const masteredAfter = Object.values(vocabProgress).filter(isMastered).length;
        const newlyMastered = Math.max(0, masteredAfter - s.stats.wordsMastered);
        stats = { ...stats, wordsMastered: masteredAfter, coins: stats.coins + newlyMastered * COINS.masteredWord };
        const counters = { ...s.counters, reviewSessions: s.counters.reviewSessions + 1, spellingCorrect: s.counters.spellingCorrect + results.filter((r) => r.correct && (r.type === "spell-word" || r.type === "missing-letter")).length, listeningCorrect: s.counters.listeningCorrect + results.filter((r) => r.correct && r.type === "listen-choose-image").length };
        const weekly = rollWeekly(s.weekly);
        weekly.reviews += 1;
        weekly.words += newlyMastered;
        const ctx = { stats, lessonProgress: s.lessonProgress, placementDone: s.placement.done, reviewSessions: counters.reviewSessions, perfectLessons: counters.perfectLessons, spellingCorrect: counters.spellingCorrect, listeningCorrect: counters.listeningCorrect };
        const unlocked = newlyUnlocked(ctx, s.achievements);
        const achievements = { ...s.achievements };
        for (const id of unlocked) achievements[id] = new Date().toISOString();
        set({ stats, vocabProgress, counters, weekly, achievements });
        return { xpEarned, coinsEarned, unlocked };
      },

      recordVocabOutcome: (vocabIds, outcome) =>
        set((s) => {
          const vocabProgress = { ...s.vocabProgress };
          for (const vid of vocabIds) vocabProgress[vid] = scheduleReview(vocabProgress[vid] ?? newProgress(vid), outcome);
          return { vocabProgress };
        }),

      addStudySeconds: (seconds) =>
        set((s) => {
          const today = todayKey();
          return { stats: { ...s.stats, secondsByDay: { ...s.stats.secondsByDay, [today]: (s.stats.secondsByDay[today] ?? 0) + seconds } } };
        }),

      buyCosmetic: (id) => {
        const s = get();
        const item = SHOP_BY_ID[id];
        if (!item || s.ownedCosmetics.includes(id) || s.stats.coins < item.price) return false;
        set({ stats: { ...s.stats, coins: s.stats.coins - item.price }, ownedCosmetics: [...s.ownedCosmetics, id], equipped: { ...s.equipped, [item.kind]: id } });
        return true;
      },

      equipCosmetic: (id, kind) =>
        set((s) => {
          const equipped = { ...s.equipped };
          if (id) equipped[kind] = id;
          else delete equipped[kind];
          return { equipped };
        }),

      setDailyGoal: (xp) => set((s) => ({ stats: { ...s.stats, dailyGoalXP: xp } })),

      resetAll: () => set({ ...initialPersisted(), hydrated: true }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const { hydrated: _h, ...rest } = state as AppState & { hydrated: boolean };
        void _h;
        const persisted: PersistedState = {
          profile: rest.profile,
          settings: rest.settings,
          placement: rest.placement,
          lessonProgress: rest.lessonProgress,
          vocabProgress: rest.vocabProgress,
          stats: rest.stats,
          achievements: rest.achievements,
          ownedCosmetics: rest.ownedCosmetics,
          equipped: rest.equipped,
          counters: rest.counters,
          weekly: rest.weekly,
        };
        return persisted as unknown as AppState;
      },
      merge: (persisted, currentState) => {
        const parsed = persistedStateSchema.safeParse(persisted);
        if (!parsed.success) {
          console.warn("[EnglishQuest] stored data invalid, starting fresh", parsed.error.issues.slice(0, 3));
          return { ...currentState, ...initialPersisted() };
        }
        return { ...currentState, ...parsed.data };
      },
      onRehydrateStorage: () => (state) => state?.setHydrated(),
      version: 1,
    },
  ),
);

/* ---------- selectors ---------- */

export function lessonStatusFor(lessonId: string, lessonProgress: Record<string, LessonProgress>, placementLevel: Level): LessonProgress["status"] {
  const existing = lessonProgress[lessonId];
  if (existing && existing.status !== "locked") return existing.status;
  const ordered = orderedLessons();
  const idx = ordered.findIndex((l) => l.id === lessonId);
  if (idx === -1) return "locked";
  const lesson = ordered[idx];
  // Lessons below the placement level are open (already known material).
  // From the placement level on, lessons unlock one after the other.
  if (lesson.level < placementLevel) return "available";
  if (idx === 0) return "available";
  const prev = ordered[idx - 1];
  if (prev.level < placementLevel) return "available";
  return lessonProgress[prev.id]?.status === "completed" ? "available" : "locked";
}

export function nextLessonId(lessonProgress: Record<string, LessonProgress>, placementLevel: Level): string | null {
  const ordered = orderedLessons();
  const inProgress = ordered.find((l) => lessonProgress[l.id]?.status === "in-progress");
  if (inProgress) return inProgress.id;
  // First available, not completed lesson at or above the placement level's start world.
  const firstAtLevel = ordered.find((l) => l.level >= placementLevel && lessonProgress[l.id]?.status !== "completed" && lessonStatusFor(l.id, lessonProgress, placementLevel) === "available");
  if (firstAtLevel) return firstAtLevel.id;
  const any = ordered.find((l) => lessonProgress[l.id]?.status !== "completed" && lessonStatusFor(l.id, lessonProgress, placementLevel) === "available");
  return any?.id ?? null;
}

export function dueWordCount(vocabProgress: Record<string, UserVocabularyProgress>, now = new Date()): number {
  return Object.values(vocabProgress).filter((p) => !p.nextReviewAt || new Date(p.nextReviewAt).getTime() <= now.getTime()).length;
}
