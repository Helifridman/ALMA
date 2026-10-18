import { describe, expect, it } from "vitest";
import { buildReviewExercises } from "@/lib/review";
import { newProgress } from "@/lib/srs";
import { grade } from "@/lib/grading";
import { VOCAB_BY_ID } from "@/content";

describe("review builder", () => {
  it("builds varied, gradable exercises for due words", () => {
    const ids = ["dog", "cat", "apple", "mother", "red", "run", "happy", "hello", "one", "water", "big", "book"];
    const progress = ids.map((id, i) => ({ ...newProgress(id), masteryLevel: i % 5 }));
    const exercises = buildReviewExercises(progress, "seed-1", 10);
    expect(exercises).toHaveLength(10);
    expect(new Set(exercises.map((e) => e.type)).size).toBeGreaterThanOrEqual(3);
    expect(new Set(exercises.map((e) => e.id)).size).toBe(10);
    for (const e of exercises) {
      expect(e.vocabIds?.length).toBeGreaterThan(0);
      // Every generated exercise must be solvable with its correct answer.
      switch (e.type) {
        case "word-to-image": expect(grade(e, { type: "choice", value: e.payload.vocabId }).correct).toBe(true); break;
        case "listen-choose-image": expect(grade(e, { type: "choice", value: e.payload.correct }).correct).toBe(true); break;
        case "choose-translation": expect(grade(e, { type: "choice", value: e.payload.correct }).correct).toBe(true); expect(new Set(e.payload.options).size).toBe(e.payload.options.length); break;
        case "choose-word": expect(grade(e, { type: "choice", value: e.payload.correct }).correct).toBe(true); break;
        case "missing-letter": expect(grade(e, { type: "choice", value: e.payload.word[e.payload.missingIndex] }).correct).toBe(true); break;
        case "spell-word": expect(grade(e, { type: "letters", value: VOCAB_BY_ID[e.payload.vocabId!].word }).correct).toBe(true); break;
      }
    }
  });

  it("is deterministic for a seed", () => {
    const progress = ["dog", "cat", "sun"].map((id) => newProgress(id));
    const a = buildReviewExercises(progress, "s", 3).map((e) => e.type + e.id);
    const b = buildReviewExercises(progress, "s", 3).map((e) => e.type + e.id);
    expect(a).toEqual(b);
  });
});
