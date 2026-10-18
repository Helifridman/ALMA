import { describe, expect, it } from "vitest";
import { isDue, isMastered, newProgress, pickReviewWords, scheduleReview } from "@/lib/srs";

const now = new Date("2026-10-16T10:00:00Z");
const hours = (iso: string | null) => (new Date(iso!).getTime() - now.getTime()) / 3600000;

describe("spaced repetition", () => {
  it("new words are due immediately", () => {
    expect(isDue(newProgress("dog"), now)).toBe(true);
  });

  it("a wrong answer drops mastery and schedules a quick retry", () => {
    let p = newProgress("dog");
    p = { ...p, masteryLevel: 3 };
    p = scheduleReview(p, { correct: false, mode: "recognition", errorKind: "meaning" }, now);
    expect(p.masteryLevel).toBe(1);
    expect(p.incorrectCount).toBe(1);
    expect(p.lastErrorKind).toBe("meaning");
    expect(hours(p.nextReviewAt)).toBeCloseTo(1 / 6, 2);
  });

  it("repeated success lengthens the interval", () => {
    let p = newProgress("dog");
    p = scheduleReview(p, { correct: true, mode: "recognition" }, now);
    expect(p.masteryLevel).toBe(1);
    expect(hours(p.nextReviewAt)).toBe(24);
    p = scheduleReview(p, { correct: true, mode: "recognition" }, now);
    expect(hours(p.nextReviewAt)).toBe(72);
  });

  it("recognition alone caps at level 3; recall is needed to master", () => {
    let p = newProgress("dog");
    for (let i = 0; i < 6; i++) p = scheduleReview(p, { correct: true, mode: "recognition" }, now);
    expect(p.masteryLevel).toBe(3);
    expect(isMastered(p)).toBe(false);
    p = scheduleReview(p, { correct: true, mode: "recall" }, now);
    expect(p.masteryLevel).toBe(4);
    expect(isMastered(p)).toBe(true);
    expect(p.recallCorrectCount).toBe(1);
  });

  it("a struggled correct answer keeps the level and comes back soon", () => {
    let p = { ...newProgress("dog"), masteryLevel: 2 };
    p = scheduleReview(p, { correct: true, mode: "recognition", struggled: true }, now);
    expect(p.masteryLevel).toBe(2);
    expect(hours(p.nextReviewAt)).toBe(12);
  });

  it("picks due words, weakest first", () => {
    const a = { ...newProgress("a"), masteryLevel: 2, nextReviewAt: "2026-10-15T00:00:00Z" };
    const b = { ...newProgress("b"), masteryLevel: 0, nextReviewAt: "2026-10-15T00:00:00Z" };
    const c = { ...newProgress("c"), masteryLevel: 1, nextReviewAt: "2026-10-20T00:00:00Z" };
    expect(pickReviewWords([a, b, c], 2, now)).toEqual(["b", "a"]);
    expect(pickReviewWords([a, b, c], 3, now)).toEqual(["b", "a", "c"]);
  });
});
