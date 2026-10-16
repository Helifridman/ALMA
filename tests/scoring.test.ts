import { describe, expect, it } from "vitest";
import { isPerfect, lessonCoins, lessonScore, lessonXP, rankFor, XP, COINS } from "@/lib/scoring";
import type { ExerciseResult } from "@/lib/types";

const r = (correct: boolean, firstTry: boolean): ExerciseResult => ({ exerciseId: "x", type: "choose-word", correct, firstTry, attempts: firstTry ? 1 : 2, vocabIds: [], skillTags: ["vocabulary"], mode: "recognition" });

describe("scoring", () => {
  it("scores first-try full, retries half, wrong zero", () => {
    expect(lessonScore([r(true, true), r(true, false), r(false, false), r(true, true)])).toBe(63);
    expect(lessonScore([])).toBe(0);
    expect(lessonScore([r(true, true), r(true, true)])).toBe(100);
  });

  it("awards XP with lesson and perfect bonuses", () => {
    const perfect = [r(true, true), r(true, true)];
    expect(isPerfect(perfect)).toBe(true);
    expect(lessonXP(perfect)).toBe(2 * XP.correctFirstTry + XP.lessonComplete + XP.perfectBonus);
    const mixed = [r(true, true), r(true, false), r(false, false)];
    expect(isPerfect(mixed)).toBe(false);
    expect(lessonXP(mixed)).toBe(XP.correctFirstTry + XP.correctAfterRetry + XP.lessonComplete);
    expect(lessonCoins(perfect)).toBe(COINS.lessonComplete + COINS.perfectBonus);
  });

  it("ranks grow with XP", () => {
    expect(rankFor(0).index).toBe(0);
    expect(rankFor(150).index).toBe(1);
    expect(rankFor(9999).nextXP).toBeNull();
    expect(rankFor(75).progress).toBeCloseTo(0.5);
  });
});
