"use client";

import type { Exercise } from "@/lib/types";
import type { ExerciseProps } from "./types";
import { ChooseInContext, ChooseTranslation, ChooseWord, FillBlank, ListenChooseImage, ListenSentence, MissingLetter, WordToImage } from "./ChoiceExercises";
import { MatchPairs, SentenceBuilder, SpellWord } from "./BuildExercises";
import { Dialogue, ReadRecord, Story } from "./SpeakReadExercises";

/** One renderer for every exercise type: new types plug in here. */
export function ExerciseRenderer(props: ExerciseProps) {
  const ex = props.exercise;
  switch (ex.type) {
    case "word-to-image": return <WordToImage {...(props as ExerciseProps<Extract<Exercise, { type: "word-to-image" }>>)} />;
    case "choose-translation": return <ChooseTranslation {...(props as ExerciseProps<Extract<Exercise, { type: "choose-translation" }>>)} />;
    case "choose-word": return <ChooseWord {...(props as ExerciseProps<Extract<Exercise, { type: "choose-word" }>>)} />;
    case "listen-choose-image": return <ListenChooseImage {...(props as ExerciseProps<Extract<Exercise, { type: "listen-choose-image" }>>)} />;
    case "listen-sentence": return <ListenSentence {...(props as ExerciseProps<Extract<Exercise, { type: "listen-sentence" }>>)} />;
    case "sentence-builder": return <SentenceBuilder {...(props as ExerciseProps<Extract<Exercise, { type: "sentence-builder" }>>)} />;
    case "missing-letter": return <MissingLetter {...(props as ExerciseProps<Extract<Exercise, { type: "missing-letter" }>>)} />;
    case "spell-word": return <SpellWord {...(props as ExerciseProps<Extract<Exercise, { type: "spell-word" }>>)} />;
    case "fill-blank": return <FillBlank {...(props as ExerciseProps<Extract<Exercise, { type: "fill-blank" }>>)} />;
    case "choose-in-context": return <ChooseInContext {...(props as ExerciseProps<Extract<Exercise, { type: "choose-in-context" }>>)} />;
    case "match-pairs": return <MatchPairs {...(props as ExerciseProps<Extract<Exercise, { type: "match-pairs" }>>)} />;
    case "read-record": return <ReadRecord {...(props as ExerciseProps<Extract<Exercise, { type: "read-record" }>>)} />;
    case "story": return <Story {...(props as ExerciseProps<Extract<Exercise, { type: "story" }>>)} />;
    case "dialogue": return <Dialogue {...(props as ExerciseProps<Extract<Exercise, { type: "dialogue" }>>)} />;
  }
}

/** Exercises that submit themselves (no "check" button). */
export function isSelfSubmitting(type: Exercise["type"]): boolean {
  return type === "match-pairs" || type === "read-record";
}
