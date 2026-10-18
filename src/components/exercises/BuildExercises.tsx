"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Exercise } from "@/lib/types";
import { seededRandom, shuffle } from "@/lib/grading";
import { VOCAB_BY_ID } from "@/content/vocabulary";
import { AudioButton } from "./AudioButton";
import { Picture } from "./Picture";
import { OptionButton } from "./OptionButton";
import { Icon } from "@/components/ui/Icon";
import type { ExerciseProps } from "./types";

/* ---------- spell a word (letter tiles or keyboard) ---------- */
export function SpellWord(props: ExerciseProps<Extract<Exercise, { type: "spell-word" }>>) {
  const { payload } = props.exercise;
  const item = payload.vocabId ? VOCAB_BY_ID[payload.vocabId] : undefined;
  const tiles = useMemo(() => (payload.tiles ? shuffle(payload.tiles.map((t, i) => ({ id: i, ch: t })), seededRandom(props.exercise.id + props.attemptKey)) : null), [payload.tiles, props.exercise.id, props.attemptKey]);
  const [used, setUsed] = useState<number[]>([]);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const revealed = props.result !== null;

  useEffect(() => {
    setUsed([]);
    setTyped("");
    props.onChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.attemptKey, props.exercise.id]);

  const value = tiles ? used.map((i) => tiles.find((t) => t.id === i)?.ch ?? "").join("") : typed;

  const addTile = (id: number) => {
    if (revealed) return;
    const next = [...used, id];
    setUsed(next);
    const v = next.map((i) => tiles!.find((t) => t.id === i)?.ch ?? "").join("");
    props.onChange(v ? { type: "letters", value: v } : null);
  };
  const removeLast = () => {
    if (revealed) return;
    const next = used.slice(0, -1);
    setUsed(next);
    const v = next.map((i) => tiles!.find((t) => t.id === i)?.ch ?? "").join("");
    props.onChange(v ? { type: "letters", value: v } : null);
  };

  const boxes = payload.word.replace(/\s/g, "").length;
  const letters = value.split("");

  return (
    <div>
      <div className="flex flex-col items-center gap-2 mb-5">
        {item && <Picture vocabId={item.id} size="lg" />}
        <p className="text-3xl font-extrabold">{payload.meaningHe}</p>
        {item && <AudioButton text={item.word} audioUrl={item.audioUrl} size="sm" label="השמעת המילה" />}
      </div>

      {tiles ? (
        <>
          <div className="en flex flex-wrap justify-center gap-1.5 mb-5 min-h-[3.5rem]" aria-live="polite" aria-label={`כתבת: ${value}`}>
            {Array.from({ length: boxes }).map((_, i) => (
              <span key={i} className={`h-14 w-12 rounded-xl flex items-center justify-center text-3xl font-extrabold border-2 ${letters[i] ? (revealed ? (props.result?.correct ? "border-success bg-success-soft" : "border-danger bg-danger-soft") : "border-brand bg-brand-soft/40") : "border-line border-dashed bg-card"}`}>
                {letters[i] ?? ""}
              </span>
            ))}
          </div>
          {revealed && props.revealAnswer && !props.result?.correct && <p className="en text-center text-xl font-bold text-emerald-700 mb-3">{payload.word}</p>}
          <div className="flex flex-wrap justify-center gap-2">
            {tiles.map((t) => (
              <button
                key={t.id}
                type="button"
                disabled={used.includes(t.id) || revealed}
                onClick={() => addTile(t.id)}
                className="en h-14 w-12 rounded-xl bg-card border-2 border-line text-2xl font-extrabold focus-ring hover:border-brand disabled:opacity-30 active:scale-95"
                aria-label={`אות ${t.ch}`}
              >
                {t.ch}
              </button>
            ))}
            <button type="button" onClick={removeLast} disabled={!used.length || revealed} aria-label="מחיקת האות האחרונה" className="h-14 w-14 rounded-xl bg-coral-soft text-coral flex items-center justify-center focus-ring disabled:opacity-30">
              <Icon name="arrow" className="rotate-180" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            dir="ltr"
            lang="en"
            value={typed}
            disabled={revealed}
            onChange={(e) => {
              const v = e.target.value.replace(/[^A-Za-z' ]/g, "");
              setTyped(v);
              props.onChange(v.trim() ? { type: "letters", value: v } : null);
            }}
            aria-label="כתבי את המילה באנגלית"
            placeholder="type here"
            className={`en w-full max-w-xs text-center text-3xl font-extrabold rounded-2xl border-2 px-4 py-3 focus-ring ${revealed ? (props.result?.correct ? "border-success bg-success-soft" : "border-danger bg-danger-soft") : "border-brand"}`}
          />
          {revealed && props.revealAnswer && !props.result?.correct && <p className="en text-xl font-bold text-emerald-700">{payload.word}</p>}
          <p className="text-xs text-ink-soft">אפשר להקליד באותיות אנגליות. מקלדת: החליפי לשפה אנגלית.</p>
        </div>
      )}
    </div>
  );
}

/* ---------- sentence builder ---------- */
export function SentenceBuilder(props: ExerciseProps<Extract<Exercise, { type: "sentence-builder" }>>) {
  const { payload } = props.exercise;
  const bank = useMemo(() => {
    const words = [...payload.sentence.split(/\s+/), ...(payload.extraWords ?? [])].map((w, i) => ({ id: i, w }));
    return shuffle(words, seededRandom(props.exercise.id));
  }, [payload, props.exercise.id]);
  const [picked, setPicked] = useState<number[]>([]);
  const revealed = props.result !== null;

  useEffect(() => {
    setPicked([]);
    props.onChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.attemptKey, props.exercise.id]);

  const update = (next: number[]) => {
    setPicked(next);
    props.onChange(next.length ? { type: "words", value: next.map((i) => bank.find((b) => b.id === i)!.w) } : null);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-3">
        <AudioButton text={payload.sentence} size="sm" slow />
        <p className="text-xl font-bold text-center">{payload.translationHe}</p>
      </div>
      <div className={`en min-h-[4.5rem] rounded-2xl border-2 border-dashed p-3 flex flex-wrap gap-2 mb-4 ${revealed ? (props.result?.correct ? "border-success bg-success-soft" : "border-danger bg-danger-soft") : "border-brand bg-brand-soft/30"}`} aria-live="polite" aria-label="המשפט שבנית">
        {picked.map((id) => {
          const b = bank.find((x) => x.id === id)!;
          return (
            <button key={id} type="button" disabled={revealed} onClick={() => update(picked.filter((p) => p !== id))} className="rounded-xl bg-card border-2 border-brand px-3 py-2 text-xl font-bold focus-ring">
              {b.w}
            </button>
          );
        })}
        {!picked.length && <span className="text-ink-soft self-center" dir="rtl">לחצי על המילים לפי הסדר</span>}
      </div>
      {revealed && props.revealAnswer && !props.result?.correct && <p className="en text-center text-lg font-bold text-emerald-700 mb-3">{payload.sentence}</p>}
      <div className="en flex flex-wrap gap-2 justify-center">
        {bank.map((b) => (
          <button key={b.id} type="button" disabled={picked.includes(b.id) || revealed} onClick={() => update([...picked, b.id])} className="rounded-xl bg-card border-2 border-line px-3 py-2 text-xl font-bold focus-ring hover:border-brand disabled:opacity-30 active:scale-95">
            {b.w}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- match pairs ---------- */
export function MatchPairs(props: ExerciseProps<Extract<Exercise, { type: "match-pairs" }>>) {
  const { payload } = props.exercise;
  const left = useMemo(() => shuffle(payload.pairs.map((p) => p.en), seededRandom(props.exercise.id + "L")), [payload.pairs, props.exercise.id]);
  const right = useMemo(() => shuffle(payload.pairs.map((p) => p.he), seededRandom(props.exercise.id + "R")), [payload.pairs, props.exercise.id]);
  const [selEn, setSelEn] = useState<string | null>(null);
  const [selHe, setSelHe] = useState<string | null>(null);
  const [matched, setMatched] = useState<{ en: string; he: string }[]>([]);
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const mistakes = useRef(0);
  const revealed = props.result !== null;

  useEffect(() => {
    setSelEn(null); setSelHe(null); setMatched([]); mistakes.current = 0;
  }, [props.attemptKey, props.exercise.id]);

  useEffect(() => {
    if (!selEn || !selHe) return;
    const ok = payload.pairs.some((p) => p.en === selEn && p.he === selHe);
    if (ok) {
      const next = [...matched, { en: selEn, he: selHe }];
      setMatched(next);
      setSelEn(null); setSelHe(null);
      if (next.length === payload.pairs.length) props.onSubmit({ type: "pairs", value: next, mistakes: mistakes.current });
    } else {
      mistakes.current += 1;
      setWrongFlash(selEn + selHe);
      setTimeout(() => { setWrongFlash(null); setSelEn(null); setSelHe(null); }, 450);
      if (mistakes.current >= 3) props.onSubmit({ type: "pairs", value: matched, mistakes: mistakes.current });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selEn, selHe]);

  const isMatched = (side: "en" | "he", v: string) => matched.some((m) => m[side] === v);
  const stateFor = (side: "en" | "he", v: string) => {
    if (isMatched(side, v)) return "correct" as const;
    if (wrongFlash && ((side === "en" && selEn === v) || (side === "he" && selHe === v))) return "wrong" as const;
    if ((side === "en" && selEn === v) || (side === "he" && selHe === v)) return "selected" as const;
    return "idle" as const;
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        {left.map((en) => (
          <OptionButton key={en} en state={stateFor("en", en)} disabled={isMatched("en", en) || revealed} onClick={() => setSelEn(en)}>
            {en}
          </OptionButton>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {right.map((he) => (
          <OptionButton key={he} state={stateFor("he", he)} disabled={isMatched("he", he) || revealed} onClick={() => setSelHe(he)} en={/^[A-Za-z]/.test(he)}>
            {he}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
