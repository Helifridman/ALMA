import { describe, expect, it } from "vitest";
import { determineLevel, shouldContinue } from "@/lib/placement";
import { PLACEMENT_QUESTIONS } from "@/content/placement";
import type { ExerciseResult } from "@/lib/types";

function results(correctLevels: number[]): ExerciseResult[] {
  return PLACEMENT_QUESTIONS.map((q) => ({ exerciseId: q.exercise.id, type: q.exercise.type, correct: correctLevels.includes(q.level), firstTry: correctLevels.includes(q.level), attempts: 1, vocabIds: [], skillTags: ["reading"], mode: "recognition" as const }));
}

describe("placement", () => {
  it("starts at level 0 when nothing is passed", () => {
    expect(determineLevel(results([])).level).toBe(0);
  });
  it("starts at the first level not passed", () => {
    expect(determineLevel(results([0])).level).toBe(1);
    expect(determineLevel(results([0, 1])).level).toBe(2);
    expect(determineLevel(results([0, 1, 2])).level).toBe(3);
  });
  it("caps at level 3 even when everything is right", () => {
    expect(determineLevel(results([0, 1, 2, 3, 4])).level).toBe(3);
  });
  it("stops early when a whole level was missed", () => {
    const r = results([]).filter((x) => PLACEMENT_QUESTIONS.find((q) => q.exercise.id === x.exerciseId)!.level === 0);
    expect(shouldContinue(r, 1)).toBe(false);
    expect(shouldContinue(results([0, 1]), 2)).toBe(true);
  });
});
