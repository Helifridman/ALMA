/**
 * Core domain types for EnglishQuest Israel.
 * The content layer (src/content) and the engine (src/lib) both depend on this file,
 * so keep it free of React / browser imports.
 */

export type Level = 0 | 1 | 2 | 3 | 4;

export type Skill =
  | "vocabulary"
  | "reading"
  | "writing"
  | "listening"
  | "speaking"
  | "grammar";

export type Topic =
  | "letters"
  | "animals"
  | "family"
  | "home"
  | "school"
  | "colors"
  | "numbers"
  | "food"
  | "body"
  | "clothes"
  | "verbs"
  | "adjectives"
  | "pronouns"
  | "greetings"
  | "time"
  | "feelings"
  | "nature"
  | "places"
  | "questions"
  | "everyday"
  | "grammar";

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "pronoun"
  | "phrase"
  | "number"
  | "preposition"
  | "question"
  | "letter"
  | "other";

export interface VocabularyItem {
  id: string;
  word: string;
  translationHe: string;
  /** Optional Hebrew transliteration – a temporary crutch, shown only on request. */
  pronunciationHint?: string;
  exampleEn: string;
  exampleHe: string;
  /** If missing, the audio service falls back to browser TTS. */
  audioUrl?: string;
  imageUrl?: string;
  /** Placeholder picture when no illustration exists yet. */
  emoji?: string;
  topic: Topic;
  level: Level;
  partOfSpeech: PartOfSpeech;
  skillTags?: Skill[];
}

export type ExerciseType =
  | "word-to-image"
  | "choose-translation"
  | "choose-word"
  | "listen-choose-image"
  | "listen-sentence"
  | "sentence-builder"
  | "missing-letter"
  | "spell-word"
  | "fill-blank"
  | "choose-in-context"
  | "match-pairs"
  | "read-record"
  | "story"
  | "dialogue";

export interface ExerciseBase {
  id: string;
  lessonId: string;
  type: ExerciseType;
  /** Instruction shown in Hebrew. */
  promptHe: string;
  /** Optional English instruction (shown small, read aloud). */
  promptEn?: string;
  difficulty: 1 | 2 | 3;
  /** Shown after a wrong answer (and available on demand). */
  explanationHe: string;
  /** Progressive hints, from gentle to explicit. */
  hintsHe?: string[];
  skillTags: Skill[];
  /** Vocabulary items practiced by this exercise (feeds the SRS). */
  vocabIds?: string[];
  /** A similar exercise shown after a wrong answer to check understanding. */
  followUp?: Exercise;
}

export interface WordToImagePayload {
  /** The English word shown (and spoken). */
  vocabId: string;
  /** Vocabulary ids shown as pictures, including the correct one. */
  options: string[];
}

export interface ChooseTranslationPayload {
  /** English word or sentence shown. */
  questionEn: string;
  /** Hebrew options. */
  options: string[];
  correct: string;
  /** Text to speak when the audio button is pressed. Defaults to questionEn. */
  audioText?: string;
}

export interface ChooseWordPayload {
  /** Hebrew word / meaning shown. */
  questionHe: string;
  /** Optional picture (vocab id) shown with the question. */
  pictureVocabId?: string;
  /** English options. */
  options: string[];
  correct: string;
}

export interface ListenChooseImagePayload {
  audioText: string;
  /** Vocabulary ids shown as pictures. */
  options: string[];
  correct: string;
}

export interface ListenSentencePayload {
  audioText: string;
  /** Shown after answering (or on request). */
  transcript: string;
  transcriptHe: string;
  questionHe: string;
  options: string[];
  correct: string;
}

export interface SentenceBuilderPayload {
  sentence: string;
  translationHe: string;
  /** Extra distractor words mixed into the bank. */
  extraWords?: string[];
}

export interface MissingLetterPayload {
  word: string;
  /** Index of the missing letter in `word`. */
  missingIndex: number;
  /** Letter options including the correct one. */
  options: string[];
  vocabId?: string;
}

export interface SpellWordPayload {
  word: string;
  vocabId?: string;
  /** What the learner sees: Hebrew meaning (and picture if vocabId). */
  meaningHe: string;
  /** Letter tiles offered (includes all letters of the word, maybe extras). If missing, a free keyboard is used. */
  tiles?: string[];
}

export interface FillBlankPayload {
  /** Sentence with a single "___" blank. */
  sentence: string;
  translationHe: string;
  bank: string[];
  correct: string;
}

export interface ChooseInContextPayload {
  /** Optional context sentence(s) shown before the question. */
  contextEn?: string;
  contextHe?: string;
  /** Sentence with "___" blank, or a question. */
  questionEn: string;
  options: string[];
  correct: string;
}

export interface MatchPairsPayload {
  pairs: { en: string; he: string }[];
}

export interface ReadRecordPayload {
  text: string;
  translationHe: string;
}

export interface StoryQuestion {
  questionHe: string;
  questionEn?: string;
  options: string[];
  correct: string;
  explanationHe: string;
}

export interface StoryPayload {
  title: string;
  paragraphs: string[];
  paragraphsHe: string[];
  questions: StoryQuestion[];
}

export interface DialogueLine {
  speaker: "A" | "B";
  en: string;
  he: string;
}

export interface DialoguePayload {
  situationHe: string;
  lines: DialogueLine[];
  /** Index in `lines` where the learner answers for speaker B. That line's `en` is the correct answer. */
  userTurnIndex: number;
  options: string[];
}

export type Exercise =
  | (ExerciseBase & { type: "word-to-image"; payload: WordToImagePayload })
  | (ExerciseBase & { type: "choose-translation"; payload: ChooseTranslationPayload })
  | (ExerciseBase & { type: "choose-word"; payload: ChooseWordPayload })
  | (ExerciseBase & { type: "listen-choose-image"; payload: ListenChooseImagePayload })
  | (ExerciseBase & { type: "listen-sentence"; payload: ListenSentencePayload })
  | (ExerciseBase & { type: "sentence-builder"; payload: SentenceBuilderPayload })
  | (ExerciseBase & { type: "missing-letter"; payload: MissingLetterPayload })
  | (ExerciseBase & { type: "spell-word"; payload: SpellWordPayload })
  | (ExerciseBase & { type: "fill-blank"; payload: FillBlankPayload })
  | (ExerciseBase & { type: "choose-in-context"; payload: ChooseInContextPayload })
  | (ExerciseBase & { type: "match-pairs"; payload: MatchPairsPayload })
  | (ExerciseBase & { type: "read-record"; payload: ReadRecordPayload })
  | (ExerciseBase & { type: "story"; payload: StoryPayload })
  | (ExerciseBase & { type: "dialogue"; payload: DialoguePayload });

export interface Lesson {
  id: string;
  titleHe: string;
  titleEn: string;
  worldId: string;
  unitId: string;
  order: number;
  estimatedMinutes: number;
  learningObjectives: string[];
  /** Vocabulary introduced / practiced in this lesson. */
  vocabIds: string[];
  /** Short teaching card shown before the exercises (Hebrew explanation + English examples). */
  intro?: { titleHe: string; bodyHe: string; examples?: { en: string; he: string }[] };
  exercises: Exercise[];
  level: Level;
}

export interface Unit {
  id: string;
  worldId: string;
  titleHe: string;
  titleEn: string;
  order: number;
}

export interface World {
  id: string;
  titleHe: string;
  titleEn: string;
  descriptionHe: string;
  order: number;
  level: Level;
  /** Theme color token name (see globals.css). */
  color: string;
  /** Icon key for the world badge. */
  icon: "letters" | "world" | "sentence" | "speak" | "book" | "lab";
}

/* ---------- learner state ---------- */

export type Grade = 4 | 5 | 6 | "other";

export type Interest =
  | "animals"
  | "football"
  | "music"
  | "games"
  | "food"
  | "adventure"
  | "friends"
  | "art"
  | "science"
  | "dance";

export interface UserProfile {
  id: string;
  nickname: string;
  grade: Grade;
  interests: Interest[];
  mascotId: string;
  createdAt: string;
}

export type ErrorKind = "spelling" | "meaning" | "grammar" | "unknown-word" | "listening" | "order";

export type AnswerMode = "recognition" | "recall";

export interface UserVocabularyProgress {
  vocabularyItemId: string;
  correctCount: number;
  incorrectCount: number;
  /** Correct answers where the learner produced the word herself (spelling / building). */
  recallCorrectCount: number;
  /** 0 = new, 5 = mastered. */
  masteryLevel: number;
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  lastErrorKind?: ErrorKind;
}

export type LessonStatus = "locked" | "available" | "in-progress" | "completed";

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  /** 0..100, best score. */
  score: number;
  attempts: number;
  completedAt: string | null;
}

export interface UserStats {
  totalXP: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  completedLessons: number;
  wordsMastered: number;
  /** ISO date (YYYY-MM-DD) of the last day with activity. */
  lastActiveDate: string | null;
  /** XP per day, keyed by YYYY-MM-DD. */
  xpByDay: Record<string, number>;
  /** Study time in seconds per day. */
  secondsByDay: Record<string, number>;
  /** Exercises answered per skill: [correct, total]. */
  skillCounts: Record<Skill, [number, number]>;
  dailyGoalXP: number;
}

export interface Achievement {
  id: string;
  titleHe: string;
  descriptionHe: string;
  icon: "star" | "flame" | "book" | "ear" | "pen" | "trophy" | "heart" | "zap" | "crown" | "key";
  /** Criteria are evaluated by src/lib/achievements.ts. */
  criteria:
    | { kind: "lessons"; count: number }
    | { kind: "xp"; amount: number }
    | { kind: "streak"; days: number }
    | { kind: "words-mastered"; count: number }
    | { kind: "perfect-lesson" }
    | { kind: "placement" }
    | { kind: "review-session"; count: number }
    | { kind: "world-complete"; worldId: string }
    | { kind: "spelling"; count: number }
    | { kind: "listening"; count: number };
}

export interface Mascot {
  id: string;
  nameHe: string;
  nameEn: string;
  descriptionHe: string;
  /** Base color used by the SVG. */
  color: string;
  accent: string;
}

export interface CosmeticItem {
  id: string;
  nameHe: string;
  price: number;
  kind: "hat" | "glasses" | "scarf" | "background";
}

export interface PlacementQuestion {
  id: string;
  level: Level;
  exercise: Exercise;
}

export interface ExerciseResult {
  exerciseId: string;
  type: ExerciseType;
  correct: boolean;
  firstTry: boolean;
  attempts: number;
  errorKind?: ErrorKind;
  vocabIds: string[];
  skillTags: Skill[];
  mode: AnswerMode;
}

export interface LessonSummary {
  lessonId: string;
  score: number;
  xpEarned: number;
  coinsEarned: number;
  results: ExerciseResult[];
  newWords: string[];
  wordsToReview: string[];
  perfect: boolean;
  durationSeconds: number;
  unlockedAchievements: string[];
}
