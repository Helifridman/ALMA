/**
 * Small DSL for writing lesson content.
 *
 * Every exercise gets a unique id derived from the lesson id, and the
 * builders fill sensible defaults (skill tags, difficulty) so lesson files
 * stay short and readable. All checks that content is valid live in
 * tests/content.test.ts.
 */
import type {
  Exercise,
  ExerciseBase,
  Lesson,
  Level,
  Skill,
  ChooseTranslationPayload,
  ChooseWordPayload,
  ChooseInContextPayload,
  DialoguePayload,
  FillBlankPayload,
  ListenChooseImagePayload,
  ListenSentencePayload,
  MatchPairsPayload,
  MissingLetterPayload,
  ReadRecordPayload,
  SentenceBuilderPayload,
  SpellWordPayload,
  StoryPayload,
  WordToImagePayload,
} from "@/lib/types";

type Common = Partial<Pick<ExerciseBase, "difficulty" | "hintsHe" | "skillTags" | "vocabIds" | "promptEn" | "followUp">> & {
  promptHe?: string;
  explanationHe: string;
};

export interface ExerciseFactory {
  wordToImage(p: WordToImagePayload, c: Common): Exercise;
  chooseTranslation(p: ChooseTranslationPayload, c: Common): Exercise;
  chooseWord(p: ChooseWordPayload, c: Common): Exercise;
  listenChooseImage(p: ListenChooseImagePayload, c: Common): Exercise;
  listenSentence(p: ListenSentencePayload, c: Common): Exercise;
  sentenceBuilder(p: SentenceBuilderPayload, c: Common): Exercise;
  missingLetter(p: MissingLetterPayload, c: Common): Exercise;
  spellWord(p: SpellWordPayload, c: Common): Exercise;
  fillBlank(p: FillBlankPayload, c: Common): Exercise;
  chooseInContext(p: ChooseInContextPayload, c: Common): Exercise;
  matchPairs(p: MatchPairsPayload, c: Common): Exercise;
  readRecord(p: ReadRecordPayload, c: Common): Exercise;
  story(p: StoryPayload, c: Common): Exercise;
  dialogue(p: DialoguePayload, c: Common): Exercise;
}

const DEFAULT_PROMPTS: Record<Exercise["type"], string> = {
  "word-to-image": "איזו תמונה מתאימה למילה?",
  "choose-translation": "מה הפירוש בעברית?",
  "choose-word": "איך אומרים את זה באנגלית?",
  "listen-choose-image": "הקשיבי ובחרי את התמונה המתאימה",
  "listen-sentence": "הקשיבי למשפט וענו על השאלה",
  "sentence-builder": "סדרי את המילים למשפט נכון",
  "missing-letter": "איזו אות חסרה?",
  "spell-word": "אייתי את המילה באנגלית",
  "fill-blank": "השלימי את המשפט",
  "choose-in-context": "בחרי את התשובה הנכונה",
  "match-pairs": "התאימי כל מילה לתרגום שלה",
  "read-record": "קראי את המשפט בקול, הקליטי והשוו",
  story: "קראי את הסיפור וענו על השאלות",
  dialogue: "מה כדאי להגיד עכשיו?",
};

const DEFAULT_SKILLS: Record<Exercise["type"], Skill[]> = {
  "word-to-image": ["vocabulary", "reading"],
  "choose-translation": ["vocabulary", "reading"],
  "choose-word": ["vocabulary"],
  "listen-choose-image": ["listening", "vocabulary"],
  "listen-sentence": ["listening"],
  "sentence-builder": ["grammar", "writing"],
  "missing-letter": ["writing", "vocabulary"],
  "spell-word": ["writing", "vocabulary"],
  "fill-blank": ["grammar", "reading"],
  "choose-in-context": ["grammar", "reading"],
  "match-pairs": ["vocabulary"],
  "read-record": ["speaking", "reading"],
  story: ["reading"],
  dialogue: ["speaking", "reading"],
};

export function createFactory(lessonId: string): ExerciseFactory {
  let n = 0;
  const base = <T extends Exercise["type"]>(type: T, c: Common): ExerciseBase & { type: T } => {
    n += 1;
    return {
      id: `${lessonId}-${String(n).padStart(2, "0")}`,
      lessonId,
      type,
      promptHe: c.promptHe ?? DEFAULT_PROMPTS[type],
      promptEn: c.promptEn,
      difficulty: c.difficulty ?? 1,
      explanationHe: c.explanationHe,
      hintsHe: c.hintsHe,
      skillTags: c.skillTags ?? DEFAULT_SKILLS[type],
      vocabIds: c.vocabIds,
      followUp: c.followUp,
    };
  };

  return {
    wordToImage: (payload, c) => ({ ...base("word-to-image", { vocabIds: [payload.vocabId], ...c }), payload }),
    chooseTranslation: (payload, c) => ({ ...base("choose-translation", c), payload }),
    chooseWord: (payload, c) => ({ ...base("choose-word", c), payload }),
    listenChooseImage: (payload, c) => ({ ...base("listen-choose-image", { vocabIds: [payload.correct], ...c }), payload }),
    listenSentence: (payload, c) => ({ ...base("listen-sentence", c), payload }),
    sentenceBuilder: (payload, c) => ({ ...base("sentence-builder", c), payload }),
    missingLetter: (payload, c) => ({ ...base("missing-letter", { vocabIds: payload.vocabId ? [payload.vocabId] : undefined, ...c }), payload }),
    spellWord: (payload, c) => ({ ...base("spell-word", { vocabIds: payload.vocabId ? [payload.vocabId] : undefined, ...c }), payload }),
    fillBlank: (payload, c) => ({ ...base("fill-blank", c), payload }),
    chooseInContext: (payload, c) => ({ ...base("choose-in-context", c), payload }),
    matchPairs: (payload, c) => ({ ...base("match-pairs", c), payload }),
    readRecord: (payload, c) => ({ ...base("read-record", c), payload }),
    story: (payload, c) => ({ ...base("story", c), payload }),
    dialogue: (payload, c) => ({ ...base("dialogue", c), payload }),
  };
}

export interface LessonSpec {
  id: string;
  titleHe: string;
  titleEn: string;
  worldId: string;
  unitId: string;
  order: number;
  level: Level;
  estimatedMinutes?: number;
  learningObjectives: string[];
  vocabIds: string[];
  intro?: Lesson["intro"];
  exercises: (ex: ExerciseFactory) => Exercise[];
}

export function defineLesson(spec: LessonSpec): Lesson {
  const ex = createFactory(spec.id);
  const exercises = spec.exercises(ex);
  return {
    id: spec.id,
    titleHe: spec.titleHe,
    titleEn: spec.titleEn,
    worldId: spec.worldId,
    unitId: spec.unitId,
    order: spec.order,
    level: spec.level,
    estimatedMinutes: spec.estimatedMinutes ?? Math.max(3, Math.round(exercises.length * 0.6)),
    learningObjectives: spec.learningObjectives,
    vocabIds: spec.vocabIds,
    intro: spec.intro,
    exercises,
  };
}

/** Helper: Hebrew explanation for a vocabulary word. */
export function wordExplanation(word: string, he: string): string {
  return `המילה ${word} פירושה "${he}".`;
}
