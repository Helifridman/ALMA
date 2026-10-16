import { describe, expect, it } from "vitest";
import { grade, levenshtein, normalizeSentence } from "@/lib/grading";
import { createFactory } from "@/content/builders";

const ex = createFactory("t");

describe("grade", () => {
  it("checks word-to-image by vocab id", () => {
    const e = ex.wordToImage({ vocabId: "dog", options: ["dog", "cat"] }, { explanationHe: "x" });
    expect(grade(e, { type: "choice", value: "dog" }).correct).toBe(true);
    const r = grade(e, { type: "choice", value: "cat" });
    expect(r.correct).toBe(false);
    expect(r.errorKind).toBe("meaning");
  });

  it("classifies grammar errors for grammar-tagged choices", () => {
    const e = ex.chooseInContext({ questionEn: "She ___ happy.", options: ["am", "is", "are"], correct: "is" }, { explanationHe: "x", skillTags: ["grammar"] });
    expect(grade(e, { type: "choice", value: "is" }).correct).toBe(true);
    expect(grade(e, { type: "choice", value: "are" }).errorKind).toBe("grammar");
  });

  it("is tolerant to case, spacing and punctuation in text answers", () => {
    const e = ex.chooseTranslation({ questionEn: "dog", options: ["כלב", "חתול"], correct: "כלב" }, { explanationHe: "x" });
    expect(grade(e, { type: "choice", value: " כלב " }).correct).toBe(true);
    expect(normalizeSentence("Hello, World!")).toBe("hello world");
  });

  it("spell-word distinguishes near misses from unknown words", () => {
    const e = ex.spellWord({ word: "apple", meaningHe: "תפוח" }, { explanationHe: "x" });
    expect(grade(e, { type: "letters", value: "Apple" }).correct).toBe(true);
    expect(grade(e, { type: "letters", value: "aple" }).errorKind).toBe("spelling");
    expect(grade(e, { type: "letters", value: "banana" }).errorKind).toBe("unknown-word");
    expect(grade(e, { type: "letters", value: "apple" }).mode).toBe("recall");
  });

  it("sentence-builder detects order vs missing word errors", () => {
    const e = ex.sentenceBuilder({ sentence: "I have a dog", translationHe: "יש לי כלב" }, { explanationHe: "x" });
    expect(grade(e, { type: "words", value: ["I", "have", "a", "dog"] }).correct).toBe(true);
    expect(grade(e, { type: "words", value: ["have", "I", "a", "dog"] }).errorKind).toBe("order");
    expect(grade(e, { type: "words", value: ["I", "have", "dog"] }).errorKind).toBe("grammar");
  });

  it("missing-letter compares the letter at the index", () => {
    const e = ex.missingLetter({ word: "cat", missingIndex: 1, options: ["a", "e", "o"] }, { explanationHe: "x" });
    expect(grade(e, { type: "choice", value: "a" }).correct).toBe(true);
    expect(grade(e, { type: "choice", value: "e" }).errorKind).toBe("spelling");
  });

  it("match-pairs needs all pairs and few mistakes", () => {
    const e = ex.matchPairs({ pairs: [{ en: "dog", he: "כלב" }, { en: "cat", he: "חתול" }] }, { explanationHe: "x" });
    const all = [{ en: "dog", he: "כלב" }, { en: "cat", he: "חתול" }];
    expect(grade(e, { type: "pairs", value: all, mistakes: 0 }).correct).toBe(true);
    expect(grade(e, { type: "pairs", value: all, mistakes: 3 }).correct).toBe(false);
    expect(grade(e, { type: "pairs", value: [all[0]] }).correct).toBe(false);
  });

  it("story reports which questions were wrong", () => {
    const e = ex.story({ title: "T", paragraphs: ["A cat."], paragraphsHe: ["חתול."], questions: [{ questionHe: "?", options: ["a", "b"], correct: "a", explanationHe: "x" }, { questionHe: "?", options: ["c", "d"], correct: "d", explanationHe: "x" }] }, { explanationHe: "x" });
    const r = grade(e, { type: "story", value: ["a", "c"] });
    expect(r.correct).toBe(false);
    expect(r.wrongIndexes).toEqual([1]);
    expect(grade(e, { type: "story", value: ["a", "d"] }).correct).toBe(true);
  });

  it("dialogue compares with the user turn line", () => {
    const e = ex.dialogue({ situationHe: "s", lines: [{ speaker: "A", en: "Hi!", he: "היי" }, { speaker: "B", en: "Hello!", he: "שלום" }], userTurnIndex: 1, options: ["Hello!", "Bye!"] }, { explanationHe: "x" });
    expect(grade(e, { type: "choice", value: "Hello!" }).correct).toBe(true);
    expect(grade(e, { type: "choice", value: "Bye!" }).correct).toBe(false);
  });

  it("read-record always passes (self-assessed)", () => {
    const e = ex.readRecord({ text: "I am happy.", translationHe: "אני שמחה." }, { explanationHe: "x" });
    expect(grade(e, { type: "done" }).correct).toBe(true);
  });

  it("levenshtein", () => {
    expect(levenshtein("cat", "cat")).toBe(0);
    expect(levenshtein("cat", "cut")).toBe(1);
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });
});
