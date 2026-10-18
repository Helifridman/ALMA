// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { useAppStore, STORAGE_KEY, lessonStatusFor, nextLessonId } from "@/lib/store";
import { persistedStateSchema } from "@/lib/schemas";
import { LESSONS, orderedLessons } from "@/content";
import type { ExerciseResult } from "@/lib/types";

const r = (overrides: Partial<ExerciseResult> = {}): ExerciseResult => ({ exerciseId: "x", type: "choose-word", correct: true, firstTry: true, attempts: 1, vocabIds: ["dog"], skillTags: ["vocabulary"], mode: "recognition", ...overrides });

describe("store", () => {
  beforeEach(() => {
    localStorage.clear();
    useAppStore.getState().resetAll();
  });

  it("creates a local profile and persists it to localStorage", () => {
    useAppStore.getState().createProfile({ nickname: "אלמה", grade: 5, interests: ["animals"], mascotId: "pixi" });
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.state.profile.nickname).toBe("אלמה");
    expect(persistedStateSchema.safeParse(parsed.state).success).toBe(true);
  });

  it("completing a lesson awards XP, coins, streak, unlocks the next lesson and schedules vocab", () => {
    const s = useAppStore.getState();
    s.createProfile({ nickname: "a", grade: 5, interests: [], mascotId: "pixi" });
    s.skipPlacement();
    const first = orderedLessons()[0];
    const second = orderedLessons()[1];
    expect(lessonStatusFor(second.id, useAppStore.getState().lessonProgress, 0)).toBe("locked");
    const summary = s.completeLesson(first.id, [r(), r({ correct: false, firstTry: false, attempts: 2, errorKind: "meaning", vocabIds: ["cat"] })], 120);
    const st = useAppStore.getState();
    expect(summary.score).toBe(50);
    expect(st.stats.totalXP).toBe(summary.xpEarned);
    expect(st.stats.coins).toBeGreaterThan(0);
    expect(st.stats.currentStreak).toBe(1);
    expect(st.stats.completedLessons).toBe(1);
    expect(st.lessonProgress[first.id].status).toBe("completed");
    expect(lessonStatusFor(second.id, st.lessonProgress, 0)).toBe("available");
    expect(nextLessonId(st.lessonProgress, 0)).toBe(second.id);
    expect(st.vocabProgress.dog.masteryLevel).toBe(1);
    expect(st.vocabProgress.cat.incorrectCount).toBe(1);
    expect(summary.wordsToReview).toEqual(["cat"]);
    expect(st.achievements["first-lesson"]).toBeTruthy();
    expect(st.stats.secondsByDay[Object.keys(st.stats.secondsByDay)[0]]).toBe(120);
  });

  it("placement level opens all lessons of lower worlds", () => {
    const s = useAppStore.getState();
    s.createProfile({ nickname: "a", grade: 5, interests: [], mascotId: "pixi" });
    s.completePlacement(2, []);
    const w3first = LESSONS.find((l) => l.worldId === "w3")!;
    const w5first = LESSONS.find((l) => l.worldId === "w5")!;
    const st = useAppStore.getState();
    expect(lessonStatusFor(w3first.id, st.lessonProgress, 2)).toBe("available");
    expect(lessonStatusFor(w5first.id, st.lessonProgress, 2)).toBe("locked");
    expect(nextLessonId(st.lessonProgress, 2)).toBe(w3first.id);
    expect(st.achievements["first-steps"]).toBeTruthy();
  });

  it("rejects corrupted stored data and starts fresh", () => {
    expect(persistedStateSchema.safeParse({ profile: { nickname: 5 } }).success).toBe(false);
  });

  it("review sessions count and buy cosmetics with coins", () => {
    const s = useAppStore.getState();
    s.createProfile({ nickname: "a", grade: 5, interests: [], mascotId: "pixi" });
    s.completeReview([r(), r()], 60);
    expect(useAppStore.getState().counters.reviewSessions).toBe(1);
    useAppStore.setState({ stats: { ...useAppStore.getState().stats, coins: 100 } });
    expect(s.buyCosmetic("cap")).toBe(true);
    expect(useAppStore.getState().stats.coins).toBe(70);
    expect(useAppStore.getState().equipped.hat).toBe("cap");
    expect(s.buyCosmetic("cap")).toBe(false);
  });
});
