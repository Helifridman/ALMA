"use client";

import { useEffect, useMemo, useState } from "react";
import type { Exercise } from "@/lib/types";
import { seededRandom, shuffle } from "@/lib/grading";
import { VOCAB_BY_ID } from "@/content/vocabulary";
import { useAppStore } from "@/lib/store";
import { AudioButton } from "./AudioButton";
import { Picture } from "./Picture";
import { OptionButton, optionState } from "./OptionButton";
import type { ExerciseProps } from "./types";

/** Shared hook for single-choice exercises. */
function useChoice(props: ExerciseProps, correct: string) {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => setSelected(null), [props.attemptKey, props.exercise.id]);
  const revealed = props.result !== null;
  const choose = (v: string) => {
    if (revealed) return;
    setSelected(v);
    props.onChange({ type: "choice", value: v });
  };
  const stateOf = (v: string) => optionState(v, selected, props.revealAnswer ? correct : null, revealed, props.result?.correct ?? null);
  return { selected, choose, stateOf, revealed };
}

function stableShuffle<T>(arr: T[], seed: string): T[] {
  return shuffle(arr, seededRandom(seed));
}

/* ---------- word → picture ---------- */
export function WordToImage(props: ExerciseProps<Extract<Exercise, { type: "word-to-image" }>>) {
  const { payload } = props.exercise;
  const item = VOCAB_BY_ID[payload.vocabId];
  const { choose, stateOf, revealed } = useChoice(props, payload.vocabId);
  const options = useMemo(() => stableShuffle(payload.options, props.exercise.id), [payload.options, props.exercise.id]);
  const showHint = useAppStore((s) => s.settings.showTransliteration);
  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-5">
        <AudioButton text={item.word} audioUrl={item.audioUrl} autoPlay size="md" />
        <div className="text-center">
          <p className="en text-4xl font-extrabold">{item.word}</p>
          {showHint && item.pronunciationHint && <p className="text-ink-soft text-sm">{item.pronunciationHint}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((id) => (
          <OptionButton key={id} state={stateOf(id)} onClick={() => choose(id)} disabled={revealed} ariaLabel={VOCAB_BY_ID[id]?.translationHe} className="flex flex-col items-center py-4">
            <Picture vocabId={id} size="md" />
            {revealed && <span className="en text-sm mt-1 text-ink-soft">{VOCAB_BY_ID[id]?.word}</span>}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

/* ---------- listen → picture ---------- */
export function ListenChooseImage(props: ExerciseProps<Extract<Exercise, { type: "listen-choose-image" }>>) {
  const { payload } = props.exercise;
  const item = VOCAB_BY_ID[payload.correct];
  const { choose, stateOf, revealed } = useChoice(props, payload.correct);
  const options = useMemo(() => stableShuffle(payload.options, props.exercise.id), [payload.options, props.exercise.id]);
  return (
    <div>
      <div className="flex flex-col items-center gap-2 mb-5">
        <AudioButton text={payload.audioText} audioUrl={item?.audioUrl} autoPlay size="lg" slow />
        <p className="text-ink-soft text-sm">לחצי להשמעה חוזרת</p>
        {revealed && <p className="en text-2xl font-extrabold">{payload.audioText}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((id) => (
          <OptionButton key={id} state={stateOf(id)} onClick={() => choose(id)} disabled={revealed} ariaLabel={VOCAB_BY_ID[id]?.translationHe} className="flex flex-col items-center py-4">
            <Picture vocabId={id} size="md" />
            {revealed && <span className="en text-sm mt-1 text-ink-soft">{VOCAB_BY_ID[id]?.word}</span>}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

/* ---------- English → Hebrew ---------- */
export function ChooseTranslation(props: ExerciseProps<Extract<Exercise, { type: "choose-translation" }>>) {
  const { payload } = props.exercise;
  const { choose, stateOf, revealed } = useChoice(props, payload.correct);
  const options = useMemo(() => stableShuffle(payload.options, props.exercise.id), [payload.options, props.exercise.id]);
  const isLetter = payload.questionEn.length === 1;
  const listenOnly = Boolean(payload.audioText) && isLetter;
  const vocab = Object.values(VOCAB_BY_ID).find((v) => v.word === payload.questionEn);
  const showHint = useAppStore((s) => s.settings.showTransliteration);
  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-5">
        <AudioButton text={payload.audioText ?? payload.questionEn} audioUrl={vocab?.audioUrl} autoPlay size={listenOnly ? "lg" : "md"} slow={!isLetter} />
        {!listenOnly && (
          <div className="text-center">
            <p className={`en font-extrabold ${payload.questionEn.length > 14 ? "text-2xl" : "text-4xl"}`}>{payload.questionEn}</p>
            {showHint && vocab?.pronunciationHint && <p className="text-ink-soft text-sm">{vocab.pronunciationHint}</p>}
          </div>
        )}
        {listenOnly && revealed && <p className="en text-4xl font-extrabold">{payload.questionEn}</p>}
      </div>
      <div className={`grid gap-3 ${isLetter ? "grid-cols-2" : "grid-cols-1"}`}>
        {options.map((o) => (
          <OptionButton key={o} state={stateOf(o)} onClick={() => choose(o)} disabled={revealed} en={isLetter || /^[A-Za-z]/.test(o)} className={isLetter ? "text-3xl py-5" : ""}>
            {o}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

/* ---------- Hebrew → English ---------- */
export function ChooseWord(props: ExerciseProps<Extract<Exercise, { type: "choose-word" }>>) {
  const { payload } = props.exercise;
  const { choose, stateOf, revealed } = useChoice(props, payload.correct);
  const options = useMemo(() => stableShuffle(payload.options, props.exercise.id), [payload.options, props.exercise.id]);
  return (
    <div>
      <div className="flex flex-col items-center gap-2 mb-5">
        {payload.pictureVocabId && <Picture vocabId={payload.pictureVocabId} size="lg" />}
        <p className="text-3xl font-extrabold">{payload.questionHe}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionButton key={o} state={stateOf(o)} onClick={() => choose(o)} disabled={revealed} en className="text-2xl">
            {o}
          </OptionButton>
        ))}
      </div>
      {revealed && <div className="mt-3 flex justify-center"><AudioButton text={payload.correct} size="sm" label="השמעת המילה הנכונה" /></div>}
    </div>
  );
}

/* ---------- listen to a sentence, answer a question ---------- */
export function ListenSentence(props: ExerciseProps<Extract<Exercise, { type: "listen-sentence" }>>) {
  const { payload } = props.exercise;
  const { choose, stateOf, revealed } = useChoice(props, payload.correct);
  const [showText, setShowText] = useState(false);
  useEffect(() => setShowText(false), [props.exercise.id]);
  const options = useMemo(() => stableShuffle(payload.options, props.exercise.id), [payload.options, props.exercise.id]);
  return (
    <div>
      <div className="flex flex-col items-center gap-2 mb-4">
        <AudioButton text={payload.audioText} autoPlay size="lg" slow />
        {showText || revealed ? (
          <div className="text-center bg-brand-soft/50 rounded-2xl p-3 w-full">
            <p className="en text-xl font-bold">{payload.transcript}</p>
            {revealed && <p className="text-ink-soft text-sm mt-1">{payload.transcriptHe}</p>}
          </div>
        ) : (
          <button type="button" onClick={() => setShowText(true)} className="text-sm text-brand font-bold underline focus-ring rounded">
            להציג את המשפט (רמז)
          </button>
        )}
      </div>
      <p className="text-xl font-bold text-center mb-3">{payload.questionHe}</p>
      <div className="grid grid-cols-1 gap-3">
        {options.map((o) => (
          <OptionButton key={o} state={stateOf(o)} onClick={() => choose(o)} disabled={revealed} en={/^[A-Za-z]/.test(o)}>
            {o}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

/* ---------- missing letter ---------- */
export function MissingLetter(props: ExerciseProps<Extract<Exercise, { type: "missing-letter" }>>) {
  const { payload } = props.exercise;
  const correct = payload.word[payload.missingIndex];
  const { selected, choose, stateOf, revealed } = useChoice(props, correct);
  const options = useMemo(() => stableShuffle(payload.options, props.exercise.id), [payload.options, props.exercise.id]);
  const item = payload.vocabId ? VOCAB_BY_ID[payload.vocabId] : undefined;
  const shown = selected ?? (revealed && props.revealAnswer ? correct : null);
  return (
    <div>
      <div className="flex flex-col items-center gap-3 mb-5">
        <div className="flex items-center gap-4">
          {item && <Picture vocabId={item.id} size="md" />}
          <AudioButton text={payload.word} audioUrl={item?.audioUrl} autoPlay />
        </div>
        {item && <p className="text-ink-soft">{item.translationHe}</p>}
        <div className="en flex gap-1.5" aria-label={`המילה ${payload.word} עם אות חסרה`}>
          {payload.word.split("").map((ch, i) => (
            <span
              key={i}
              className={`h-14 w-12 rounded-xl flex items-center justify-center text-3xl font-extrabold border-2 ${i === payload.missingIndex ? (revealed ? (props.result?.correct ? "border-success bg-success-soft" : "border-danger bg-danger-soft") : "border-brand border-dashed bg-brand-soft/40") : "border-line bg-card"}`}
            >
              {i === payload.missingIndex ? shown ?? "_" : ch}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {options.map((o) => (
          <OptionButton key={o} state={stateOf(o)} onClick={() => choose(o)} disabled={revealed} en className="text-3xl py-4">
            {o}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

/* ---------- fill the blank from a word bank ---------- */
export function FillBlank(props: ExerciseProps<Extract<Exercise, { type: "fill-blank" }>>) {
  const { payload } = props.exercise;
  const { selected, choose, stateOf, revealed } = useChoice(props, payload.correct);
  const bank = useMemo(() => stableShuffle(payload.bank, props.exercise.id), [payload.bank, props.exercise.id]);
  const [before, after] = payload.sentence.split("___");
  const filled = selected ?? (revealed && props.revealAnswer ? payload.correct : null);
  return (
    <div>
      <div className="bg-card border border-line rounded-2xl p-4 mb-4 text-center">
        <p className="en text-2xl font-bold leading-relaxed">
          {before}
          <span className={`inline-block min-w-[4rem] mx-1 px-2 rounded-lg border-b-4 ${filled ? (revealed ? (props.result?.correct ? "border-success text-emerald-700" : "border-danger text-rose-700") : "border-brand text-brand") : "border-brand"}`}>
            {filled ?? " "}
          </span>
          {after}
        </p>
        <p className="text-ink-soft mt-2">{payload.translationHe}</p>
        <div className="mt-2 flex justify-center"><AudioButton text={payload.sentence.replace("___", filled ?? "")} size="sm" label="השמעת המשפט" /></div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {bank.map((w) => (
          <OptionButton key={w} state={stateOf(w)} onClick={() => choose(w)} disabled={revealed} en className="w-auto min-w-[5rem] px-5">
            {w}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

/* ---------- choose in context ---------- */
export function ChooseInContext(props: ExerciseProps<Extract<Exercise, { type: "choose-in-context" }>>) {
  const { payload } = props.exercise;
  const { choose, stateOf, revealed } = useChoice(props, payload.correct);
  const options = useMemo(() => stableShuffle(payload.options, props.exercise.id), [payload.options, props.exercise.id]);
  const [showHe, setShowHe] = useState(false);
  useEffect(() => setShowHe(false), [props.exercise.id]);
  const isLetterTask = payload.questionEn.length === 1 && options.every((o) => o.length === 1);
  return (
    <div>
      {payload.contextEn && (
        <div className="bg-amber-soft/60 border border-amber/40 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AudioButton text={payload.contextEn} size="sm" slow />
            <p className="en text-lg font-medium leading-relaxed flex-1">{payload.contextEn}</p>
          </div>
          {payload.contextHe && (
            <button type="button" onClick={() => setShowHe((v) => !v)} className="mt-2 text-sm text-brand font-bold underline focus-ring rounded">
              {showHe ? "להסתיר תרגום" : "להציג תרגום לעברית"}
            </button>
          )}
          {showHe && payload.contextHe && <p className="text-ink-soft mt-1">{payload.contextHe}</p>}
        </div>
      )}
      <div className="flex items-center justify-center gap-3 mb-5">
        {!isLetterTask && <AudioButton text={payload.questionEn.replace("___", "...")} size="sm" />}
        <p className={`en font-extrabold text-center ${isLetterTask ? "text-6xl" : payload.questionEn.length > 30 ? "text-xl" : "text-2xl"}`}>{payload.questionEn}</p>
      </div>
      <div className={`grid gap-3 ${isLetterTask || (options.length % 2 === 0 && options.every((o) => o.length <= 8)) ? "grid-cols-2" : "grid-cols-1"}`}>
        {options.map((o) => (
          <OptionButton key={o} state={stateOf(o)} onClick={() => choose(o)} disabled={revealed} en className={isLetterTask ? "text-4xl py-5" : ""}>
            {o}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
