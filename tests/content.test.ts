import { describe, expect, it } from "vitest";
import { LESSONS, VOCABULARY, VOCAB_BY_ID, UNIT_BY_ID, WORLD_BY_ID } from "@/content";
import { PLACEMENT_QUESTIONS } from "@/content/placement";
import type { Exercise } from "@/lib/types";

const HEBREW = /[֐-׿]/;
const LATIN = /[A-Za-z]/;

function checkExercise(ex: Exercise, errors: string[], seenIds: Set<string>) {
  const where = `${ex.lessonId}/${ex.id}`;
  if (seenIds.has(ex.id)) errors.push(`${where}: duplicate exercise id`);
  seenIds.add(ex.id);
  if (!ex.promptHe || !HEBREW.test(ex.promptHe)) errors.push(`${where}: promptHe must be Hebrew`);
  if (!ex.explanationHe || !HEBREW.test(ex.explanationHe)) errors.push(`${where}: explanationHe must be Hebrew`);
  if (!ex.skillTags.length) errors.push(`${where}: skillTags empty`);
  for (const vid of ex.vocabIds ?? []) if (!VOCAB_BY_ID[vid]) errors.push(`${where}: unknown vocabId ${vid}`);

  const checkOptions = (options: string[], correct: string, label = "options") => {
    if (options.length < 2) errors.push(`${where}: ${label} needs 2+ options`);
    if (new Set(options).size !== options.length) errors.push(`${where}: ${label} has duplicates`);
    if (!options.includes(correct)) errors.push(`${where}: correct "${correct}" not in ${label}`);
  };

  switch (ex.type) {
    case "word-to-image":
      if (!VOCAB_BY_ID[ex.payload.vocabId]) errors.push(`${where}: unknown vocabId ${ex.payload.vocabId}`);
      checkOptions(ex.payload.options, ex.payload.vocabId);
      ex.payload.options.forEach((o) => { if (!VOCAB_BY_ID[o]) errors.push(`${where}: unknown option vocab ${o}`); });
      break;
    case "choose-translation":
      checkOptions(ex.payload.options, ex.payload.correct);
      break;
    case "choose-word":
      checkOptions(ex.payload.options, ex.payload.correct);
      if (!HEBREW.test(ex.payload.questionHe)) errors.push(`${where}: questionHe must be Hebrew`);
      if (ex.payload.pictureVocabId && !VOCAB_BY_ID[ex.payload.pictureVocabId]) errors.push(`${where}: unknown pictureVocabId`);
      break;
    case "listen-choose-image":
      checkOptions(ex.payload.options, ex.payload.correct);
      ex.payload.options.forEach((o) => { if (!VOCAB_BY_ID[o]) errors.push(`${where}: unknown option vocab ${o}`); });
      break;
    case "listen-sentence":
      checkOptions(ex.payload.options, ex.payload.correct);
      if (!ex.payload.transcript || !ex.payload.transcriptHe) errors.push(`${where}: transcript missing`);
      break;
    case "sentence-builder": {
      const words = ex.payload.sentence.split(/\s+/);
      if (words.length < 2) errors.push(`${where}: sentence too short`);
      if (!HEBREW.test(ex.payload.translationHe)) errors.push(`${where}: translationHe must be Hebrew`);
      break;
    }
    case "missing-letter": {
      const { word, missingIndex, options } = ex.payload;
      if (missingIndex < 0 || missingIndex >= word.length) errors.push(`${where}: missingIndex out of range`);
      checkOptions(options, word[missingIndex]);
      break;
    }
    case "spell-word": {
      const { word, tiles } = ex.payload;
      if (!LATIN.test(word)) errors.push(`${where}: word must be English`);
      if (tiles) {
        const pool = [...tiles];
        for (const ch of word.replace(/\s/g, "")) {
          const i = pool.indexOf(ch);
          if (i === -1) errors.push(`${where}: tiles missing letter "${ch}" for ${word}`);
          else pool.splice(i, 1);
        }
      }
      break;
    }
    case "fill-blank":
      if (!ex.payload.sentence.includes("___")) errors.push(`${where}: sentence must contain ___`);
      checkOptions(ex.payload.bank, ex.payload.correct, "bank");
      break;
    case "choose-in-context":
      checkOptions(ex.payload.options, ex.payload.correct);
      break;
    case "match-pairs":
      if (ex.payload.pairs.length < 2) errors.push(`${where}: need 2+ pairs`);
      if (new Set(ex.payload.pairs.map((p) => p.en)).size !== ex.payload.pairs.length) errors.push(`${where}: duplicate en in pairs`);
      if (new Set(ex.payload.pairs.map((p) => p.he)).size !== ex.payload.pairs.length) errors.push(`${where}: duplicate he in pairs`);
      break;
    case "read-record":
      if (!LATIN.test(ex.payload.text) || !HEBREW.test(ex.payload.translationHe)) errors.push(`${where}: read-record needs en text + he translation`);
      break;
    case "story":
      if (ex.payload.paragraphs.length !== ex.payload.paragraphsHe.length) errors.push(`${where}: paragraphs/paragraphsHe length mismatch`);
      if (!ex.payload.questions.length) errors.push(`${where}: story has no questions`);
      ex.payload.questions.forEach((q, i) => {
        checkOptions(q.options, q.correct, `question ${i}`);
        if (!HEBREW.test(q.explanationHe)) errors.push(`${where}: question ${i} explanation must be Hebrew`);
      });
      break;
    case "dialogue": {
      const { lines, userTurnIndex, options } = ex.payload;
      if (userTurnIndex < 0 || userTurnIndex >= lines.length) errors.push(`${where}: userTurnIndex out of range`);
      else {
        if (lines[userTurnIndex].speaker !== "B") errors.push(`${where}: user turn must be speaker B`);
        checkOptions(options, lines[userTurnIndex].en);
      }
      break;
    }
  }
  if (ex.followUp) checkExercise(ex.followUp, errors, seenIds);
}

describe("vocabulary", () => {
  it("has at least 100 items with unique ids and complete fields", () => {
    expect(VOCABULARY.length).toBeGreaterThanOrEqual(100);
    const ids = new Set<string>();
    for (const item of VOCABULARY) {
      expect(ids.has(item.id), `duplicate vocab id ${item.id}`).toBe(false);
      ids.add(item.id);
      expect(item.word.length).toBeGreaterThan(0);
      expect(HEBREW.test(item.translationHe), `${item.id} translationHe`).toBe(true);
      expect(LATIN.test(item.exampleEn), `${item.id} exampleEn`).toBe(true);
      expect(HEBREW.test(item.exampleHe), `${item.id} exampleHe`).toBe(true);
      expect(item.emoji || item.imageUrl, `${item.id} needs picture`).toBeTruthy();
    }
  });
});

describe("lessons", () => {
  it("has at least 20 lessons with unique ids, valid worlds/units and 5+ exercises each", () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(20);
    const ids = new Set<string>();
    for (const lesson of LESSONS) {
      expect(ids.has(lesson.id), `duplicate lesson id ${lesson.id}`).toBe(false);
      ids.add(lesson.id);
      expect(WORLD_BY_ID[lesson.worldId], `${lesson.id} world`).toBeTruthy();
      expect(UNIT_BY_ID[lesson.unitId], `${lesson.id} unit`).toBeTruthy();
      expect(UNIT_BY_ID[lesson.unitId].worldId).toBe(lesson.worldId);
      expect(lesson.exercises.length, `${lesson.id} exercises`).toBeGreaterThanOrEqual(5);
      expect(lesson.learningObjectives.length).toBeGreaterThan(0);
      for (const vid of lesson.vocabIds) expect(VOCAB_BY_ID[vid], `${lesson.id} vocab ${vid}`).toBeTruthy();
    }
  });

  it("every exercise is well-formed", () => {
    const errors: string[] = [];
    const seen = new Set<string>();
    for (const lesson of LESSONS) for (const ex of lesson.exercises) checkExercise(ex, errors, seen);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  it("uses at least 8 exercise types", () => {
    const types = new Set(LESSONS.flatMap((l) => l.exercises.map((e) => e.type)));
    expect(types.size).toBeGreaterThanOrEqual(8);
  });

  it("orders are unique within a world", () => {
    const byWorld = new Map<string, number[]>();
    for (const l of LESSONS) byWorld.set(l.worldId, [...(byWorld.get(l.worldId) ?? []), l.order]);
    for (const [w, orders] of byWorld) expect(new Set(orders).size, `world ${w} orders`).toBe(orders.length);
  });
});

describe("placement", () => {
  it("has well-formed questions across levels", () => {
    expect(PLACEMENT_QUESTIONS.length).toBeGreaterThanOrEqual(10);
    const errors: string[] = [];
    const seen = new Set<string>();
    for (const q of PLACEMENT_QUESTIONS) checkExercise(q.exercise, errors, seen);
    expect(errors, errors.join("\n")).toEqual([]);
    const levels = new Set(PLACEMENT_QUESTIONS.map((q) => q.level));
    expect(levels.size).toBeGreaterThanOrEqual(4);
  });
});
