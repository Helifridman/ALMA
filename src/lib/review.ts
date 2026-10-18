/**
 * Builds a review session from the learner's vocabulary progress.
 * Each word is practiced in a different exercise type than the one that last
 * failed, cycling through recognition and recall formats.
 */
import type { Exercise, UserVocabularyProgress, VocabularyItem } from "./types";
import { createFactory } from "@/content/builders";
import { VOCABULARY, VOCAB_BY_ID } from "@/content/vocabulary";
import { pickReviewWords } from "./srs";
import { seededRandom, shuffle } from "./grading";

export const REVIEW_SIZE = 10;

function distractors(item: VocabularyItem, count: number, rng: () => number, filter?: (v: VocabularyItem) => boolean): VocabularyItem[] {
  const sameTopic = VOCABULARY.filter((v) => v.id !== item.id && v.topic === item.topic && (!filter || filter(v)));
  const others = VOCABULARY.filter((v) => v.id !== item.id && v.topic !== item.topic && (!filter || filter(v)));
  const pool = [...shuffle(sameTopic, rng), ...shuffle(others, rng)];
  const out: VocabularyItem[] = [];
  const seenHe = new Set([item.translationHe]);
  for (const v of pool) {
    if (out.length >= count) break;
    if (seenHe.has(v.translationHe)) continue;
    seenHe.add(v.translationHe);
    out.push(v);
  }
  return out;
}

function letterTiles(word: string, rng: () => number): string[] {
  const letters = word.replace(/\s/g, "").split("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const extras: string[] = [];
  while (extras.length < Math.min(3, Math.max(1, Math.floor(letters.length / 2)))) {
    const ch = alphabet[Math.floor(rng() * alphabet.length)];
    if (!letters.includes(ch) && !extras.includes(ch)) extras.push(ch);
  }
  return shuffle([...letters, ...extras], rng);
}

export function buildReviewExercises(progressList: UserVocabularyProgress[], seed = String(Date.now()), size = REVIEW_SIZE, now = new Date()): Exercise[] {
  const rng = seededRandom(seed);
  const ids = pickReviewWords(progressList, size, now);
  const ex = createFactory(`review-${seed.slice(-6)}`);
  const progressById = new Map(progressList.map((p) => [p.vocabularyItemId, p]));
  const out: Exercise[] = [];

  ids.forEach((id, i) => {
    const item = VOCAB_BY_ID[id];
    if (!item) return;
    const p = progressById.get(id);
    const level = p?.masteryLevel ?? 0;
    const hasPicture = Boolean(item.emoji || item.imageUrl);
    // Rotate formats: weak words get recognition; stronger words get recall.
    const variant = (level + i) % 4;
    const expl = `${item.word} = ${item.translationHe}. ${item.exampleEn} (${item.exampleHe})`;
    if (level <= 1 && variant % 2 === 0 && hasPicture) {
      const opts = shuffle([item, ...distractors(item, 3, rng, (v) => Boolean(v.emoji || v.imageUrl))], rng).map((v) => v.id);
      out.push(ex.wordToImage({ vocabId: item.id, options: opts }, { explanationHe: expl, hintsHe: [`רמז: ${item.exampleHe}`] }));
    } else if (variant === 0 && hasPicture) {
      const opts = shuffle([item, ...distractors(item, 3, rng, (v) => Boolean(v.emoji || v.imageUrl))], rng).map((v) => v.id);
      out.push(ex.listenChooseImage({ audioText: item.word, options: opts, correct: item.id }, { explanationHe: expl }));
    } else if (variant === 1) {
      const opts = shuffle([item, ...distractors(item, 3, rng)], rng).map((v) => v.translationHe);
      out.push(ex.chooseTranslation({ questionEn: item.word, options: opts, correct: item.translationHe }, { explanationHe: expl, vocabIds: [item.id], hintsHe: [`רמז: ${item.exampleEn}`] }));
    } else if (variant === 2) {
      const opts = shuffle([item, ...distractors(item, 3, rng)], rng).map((v) => v.word);
      out.push(ex.chooseWord({ questionHe: item.translationHe, pictureVocabId: hasPicture ? item.id : undefined, options: opts, correct: item.word }, { explanationHe: expl, vocabIds: [item.id] }));
    } else {
      const word = item.word.toLowerCase();
      if (word.length <= 3 || rng() < 0.4) {
        const idx = Math.floor(rng() * word.replace(/\s/g, "").length);
        const letters = word.replace(/\s/g, "");
        const correct = letters[idx];
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("").filter((c) => c !== correct);
        const opts = shuffle([correct, ...shuffle(alphabet, rng).slice(0, 3)], rng);
        out.push(ex.missingLetter({ word: letters, missingIndex: idx, options: opts, vocabId: item.id }, { explanationHe: expl, hintsHe: [`המילה פירושה "${item.translationHe}".`] }));
      } else {
        out.push(ex.spellWord({ word, vocabId: item.id, meaningHe: item.translationHe, tiles: letterTiles(word, rng) }, { explanationHe: expl, hintsHe: [`האות הראשונה היא ${word[0]}.`, `המילה מתחילה ב-${word.slice(0, Math.ceil(word.length / 2))}...`] }));
      }
    }
  });
  return out;
}
