/**
 * Answer checking. Pure functions: no React, no storage.
 * Each exercise type has an `Answer` shape (what the UI collects) and a grader
 * returning whether it is correct plus a classified error kind for the SRS.
 */
import type { AnswerMode, ErrorKind, Exercise } from "./types";

export type Answer =
  | { type: "choice"; value: string }
  | { type: "letters"; value: string }
  | { type: "words"; value: string[] }
  | { type: "pairs"; value: { en: string; he: string }[]; mistakes?: number }
  | { type: "story"; value: string[] }
  | { type: "done" };

export interface GradeResult {
  correct: boolean;
  errorKind?: ErrorKind;
  /** Short Hebrew feedback tailored to the error (shown before the explanation). */
  feedbackHe: string;
  /** Does this exercise require recall (producing the word) rather than recognition? */
  mode: AnswerMode;
  /** For story exercises: which questions were wrong. */
  wrongIndexes?: number[];
}

export function normalizeWord(s: string): string {
  return s.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ");
}

export function normalizeSentence(s: string): string {
  return normalizeWord(s).replace(/[.,!?]/g, "");
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[n];
}

export function answerMode(type: Exercise["type"]): AnswerMode {
  switch (type) {
    case "spell-word":
    case "sentence-builder":
    case "missing-letter":
    case "fill-blank":
      return "recall";
    default:
      return "recognition";
  }
}

const OK = ["מעולה!", "נכון!", "יפה מאוד!", "בדיוק!", "כל הכבוד!"];
export function praise(seed = Math.random()): string {
  return OK[Math.floor(seed * OK.length) % OK.length];
}

export function grade(exercise: Exercise, answer: Answer): GradeResult {
  const mode = answerMode(exercise.type);
  const ok = (feedbackHe = praise()): GradeResult => ({ correct: true, feedbackHe, mode });
  const bad = (errorKind: ErrorKind, feedbackHe: string): GradeResult => ({ correct: false, errorKind, feedbackHe, mode });

  switch (exercise.type) {
    case "word-to-image": {
      if (answer.type !== "choice") return bad("meaning", "בחרי תמונה.");
      return answer.value === exercise.payload.vocabId ? ok() : bad("meaning", "לא זו. נסי שוב, חשבי מה פירוש המילה.");
    }
    case "listen-choose-image": {
      if (answer.type !== "choice") return bad("listening", "בחרי תמונה.");
      return answer.value === exercise.payload.correct ? ok() : bad("listening", "כמעט. הקשיבי שוב, שימי לב לצליל הראשון של המילה.");
    }
    case "choose-translation":
    case "choose-word":
    case "choose-in-context": {
      if (answer.type !== "choice") return bad("meaning", "בחרי תשובה.");
      const correct = normalizeSentence(answer.value) === normalizeSentence(exercise.payload.correct);
      if (correct) return ok();
      const kind: ErrorKind = exercise.skillTags.includes("grammar") ? "grammar" : "meaning";
      return bad(kind, kind === "grammar" ? "לא בדיוק. בואי נבדוק את הכלל." : "לא זו. נסי שוב.");
    }
    case "listen-sentence": {
      if (answer.type !== "choice") return bad("listening", "בחרי תשובה.");
      return answer.value === exercise.payload.correct ? ok() : bad("listening", "הקשיבי למשפט שוב, אפשר גם לאט יותר.");
    }
    case "dialogue": {
      if (answer.type !== "choice") return bad("meaning", "בחרי תשובה.");
      const expected = exercise.payload.lines[exercise.payload.userTurnIndex].en;
      return normalizeSentence(answer.value) === normalizeSentence(expected) ? ok("תשובה מצוינת לשיחה!") : bad("meaning", "זו לא התשובה שמתאימה כאן. קראי שוב מה נאמר קודם.");
    }
    case "missing-letter": {
      if (answer.type !== "choice" && answer.type !== "letters") return bad("spelling", "בחרי אות.");
      const expected = exercise.payload.word[exercise.payload.missingIndex];
      return normalizeWord(answer.value) === normalizeWord(expected) ? ok() : bad("spelling", "לא האות הזאת. הקשיבי לצליל ונסי שוב.");
    }
    case "spell-word": {
      if (answer.type !== "letters") return bad("spelling", "כתבי את המילה.");
      const expected = normalizeWord(exercise.payload.word);
      const got = normalizeWord(answer.value);
      if (got === expected) return ok("איות מושלם!");
      if (got.length === 0) return bad("spelling", "כתבי את המילה באותיות.");
      const d = levenshtein(got, expected);
      if (d === 1) return bad("spelling", "כמעט! טעות של אות אחת. בדקי שוב.");
      if (d === 2) return bad("spelling", "קרוב. שתי אותיות לא במקום.");
      return bad("unknown-word", "זו לא המילה. נזכיר אותה שוב בהמשך.");
    }
    case "sentence-builder": {
      if (answer.type !== "words") return bad("order", "סדרי את המילים.");
      const expected = exercise.payload.sentence.split(/\s+/).map(normalizeSentence);
      const got = answer.value.map(normalizeSentence);
      if (got.length === expected.length && got.every((w, i) => w === expected[i])) return ok("משפט מושלם!");
      const sameWords = [...got].sort().join(" ") === [...expected].sort().join(" ");
      if (sameWords) return bad("order", "המילים נכונות, אבל הסדר לא. באנגלית: מי עושה, מה עושה, ואז השאר.");
      if (got.length !== expected.length) return bad("grammar", got.length < expected.length ? "חסרה מילה במשפט." : "יש מילה מיותרת במשפט.");
      return bad("grammar", "לא בדיוק. שימי לב למילים שבחרת.");
    }
    case "fill-blank": {
      if (answer.type !== "choice") return bad("grammar", "בחרי מילה.");
      if (normalizeSentence(answer.value) === normalizeSentence(exercise.payload.correct)) return ok();
      const kind: ErrorKind = exercise.skillTags.includes("grammar") ? "grammar" : "meaning";
      return bad(kind, "לא המילה הזאת. קראי את המשפט שוב ונסי להבין מה חסר.");
    }
    case "match-pairs": {
      if (answer.type !== "pairs") return bad("meaning", "התאימי את הזוגות.");
      const expected = new Map(exercise.payload.pairs.map((p) => [p.en, p.he]));
      const allRight = answer.value.length === expected.size && answer.value.every((p) => expected.get(p.en) === p.he);
      if (!allRight) return bad("meaning", "יש זוגות שלא מתאימים. נסי שוב, לאט.");
      if ((answer.mistakes ?? 0) >= 2) return bad("meaning", "התאמת את כולם, אבל עם כמה טעויות בדרך. נעשה סיבוב נוסף.");
      return ok("כל הזוגות נכונים!");
    }
    case "story": {
      if (answer.type !== "story") return bad("meaning", "עני על השאלות.");
      const wrong: number[] = [];
      exercise.payload.questions.forEach((q, i) => {
        if (normalizeSentence(answer.value[i] ?? "") !== normalizeSentence(q.correct)) wrong.push(i);
      });
      if (wrong.length === 0) return ok("הבנת את כל הסיפור!");
      return { correct: false, errorKind: "meaning", feedbackHe: wrong.length === 1 ? "שאלה אחת לא נכונה. קראי שוב את הקטע המתאים." : `${wrong.length} שאלות לא נכונות. חזרי לסיפור ובדקי.`, mode, wrongIndexes: wrong };
    }
    case "read-record": {
      // Self-assessed: listening + recording is the practice; no automatic pronunciation grading in v1.
      return ok("יופי! תרגלת קריאה בקול.");
    }
  }
}

/** Fisher–Yates shuffle with optional seeded RNG. */
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Deterministic RNG so option order is stable per exercise render. */
export function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
