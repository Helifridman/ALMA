import { createFactory } from "./builders";
import type { PlacementQuestion } from "@/lib/types";

/**
 * Short diagnostic (about 3–5 minutes). Questions get harder as levels rise.
 * The placement engine (src/lib/placement.ts) stops early when the learner
 * misses most questions of a level.
 */
const ex = createFactory("placement");

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // Level 0 – letters & first words
  { id: "p0-1", level: 0, exercise: ex.chooseInContext({ questionEn: "B", options: ["b", "d", "p", "a"], correct: "b" }, { promptHe: "איזו אות קטנה מתאימה לאות הגדולה B?", explanationHe: "B גדולה נכתבת בקטן כ-b.", skillTags: ["reading"] }) },
  { id: "p0-2", level: 0, exercise: ex.chooseTranslation({ questionEn: "M", options: ["M", "N", "W", "H"], correct: "M", audioText: "M" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות M נשמע 'אֶם'.", skillTags: ["listening"] }) },
  { id: "p0-3", level: 0, exercise: ex.wordToImage({ vocabId: "dog", options: ["dog", "cat", "sun", "ball"] }, { explanationHe: "dog = כלב." }) },
  { id: "p0-4", level: 0, exercise: ex.listenChooseImage({ audioText: "apple", options: ["apple", "book", "car", "fish"], correct: "apple" }, { explanationHe: "שמעת apple (תפוח)." }) },
  // Level 1 – common words
  { id: "p1-1", level: 1, exercise: ex.chooseTranslation({ questionEn: "mother", options: ["אמא", "אבא", "אחות", "סבתא"], correct: "אמא" }, { explanationHe: "mother = אמא.", vocabIds: ["mother"] }) },
  { id: "p1-2", level: 1, exercise: ex.chooseWord({ questionHe: "ירוק", pictureVocabId: "green", options: ["green", "red", "blue", "yellow"], correct: "green" }, { explanationHe: "ירוק = green.", vocabIds: ["green"] }) },
  { id: "p1-3", level: 1, exercise: ex.missingLetter({ word: "book", missingIndex: 3, options: ["k", "c", "g", "t"], vocabId: "book" }, { explanationHe: "book (ספר) מסתיימת באות k." }) },
  { id: "p1-4", level: 1, exercise: ex.chooseTranslation({ questionEn: "I like pizza.", options: ["אני אוהבת פיצה.", "אני אוכלת פיצה.", "יש לי פיצה.", "אני רוצה פיצה."], correct: "אני אוהבת פיצה." }, { explanationHe: "like = לאהוב. I like pizza = אני אוהבת פיצה.", vocabIds: ["like", "pizza"] }) },
  // Level 2 – basic sentences
  { id: "p2-1", level: 2, exercise: ex.chooseInContext({ questionEn: "She ___ happy.", options: ["am", "is", "are"], correct: "is" }, { explanationHe: "עם she משתמשים ב-is: She is happy.", skillTags: ["grammar"] }) },
  { id: "p2-2", level: 2, exercise: ex.sentenceBuilder({ sentence: "I have a dog", translationHe: "יש לי כלב", extraWords: ["is"] }, { explanationHe: "הסדר באנגלית: מי (I) + פועל (have) + מה (a dog)." }) },
  { id: "p2-3", level: 2, exercise: ex.chooseInContext({ questionEn: "___ is my bag?", options: ["Where", "What", "Who"], correct: "Where" }, { explanationHe: "Where = איפה. שואלים איפה התיק שלי.", skillTags: ["grammar"] }) },
  { id: "p2-4", level: 2, exercise: ex.fillBlank({ sentence: "I eat ___ apple.", translationHe: "אני אוכלת תפוח.", bank: ["an", "a", "the"], correct: "an" }, { explanationHe: "לפני מילה שמתחילה בתנועה (a, e, i, o, u) אומרים an: an apple." }) },
  // Level 3 – reading & basic grammar
  { id: "p3-1", level: 3, exercise: ex.listenSentence({ audioText: "My brother plays football every day.", transcript: "My brother plays football every day.", transcriptHe: "אח שלי משחק כדורגל כל יום.", questionHe: "מה האח עושה כל יום?", options: ["משחק כדורגל", "שוחה בים", "קורא ספר"], correct: "משחק כדורגל" }, { explanationHe: "plays football = משחק כדורגל." }) },
  { id: "p3-2", level: 3, exercise: ex.chooseInContext({ questionEn: "They ___ to school every morning.", options: ["goes", "go", "going"], correct: "go" }, { explanationHe: "עם they הפועל ב-Present Simple נשאר בלי s: They go.", skillTags: ["grammar"] }) },
  { id: "p3-3", level: 3, exercise: ex.chooseInContext({ contextEn: "Dana is a girl. She has a cat. The cat is black and white.", contextHe: "", questionEn: "What color is the cat?", options: ["black and white", "black and red", "white and blue"], correct: "black and white" }, { promptHe: "קראי את הקטע וענו על השאלה", explanationHe: "כתוב: The cat is black and white (החתול שחור ולבן).", skillTags: ["reading"] }) },
  // Level 4 – stories & writing
  { id: "p4-1", level: 4, exercise: ex.chooseInContext({ questionEn: "Yesterday I ___ to the park.", options: ["go", "went", "going"], correct: "went" }, { explanationHe: "Yesterday = אתמול, לכן צריך עבר: went.", skillTags: ["grammar"] }) },
  { id: "p4-2", level: 4, exercise: ex.spellWord({ word: "beautiful", vocabId: "beautiful", meaningHe: "יפה" }, { explanationHe: "יפה = beautiful. איות: b-e-a-u-t-i-f-u-l.", skillTags: ["writing"] }) },
  { id: "p4-3", level: 4, exercise: ex.chooseInContext({ questionEn: "I am happy ___ it is Friday.", options: ["but", "because", "and"], correct: "because" }, { explanationHe: "because = כי. אני שמחה כי יום שישי.", skillTags: ["grammar"] }) },
];
