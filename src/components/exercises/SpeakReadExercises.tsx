"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Exercise } from "@/lib/types";
import { recordingSupported, startRecording, type Recorder } from "@/lib/audio";
import { seededRandom, shuffle } from "@/lib/grading";
import { AudioButton } from "./AudioButton";
import { OptionButton, optionState } from "./OptionButton";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { ExerciseProps } from "./types";

/* ---------- read & record ---------- */
export function ReadRecord(props: ExerciseProps<Extract<Exercise, { type: "read-record" }>>) {
  const { payload } = props.exercise;
  const [supported, setSupported] = useState(true);
  const [recording, setRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<Recorder | null>(null);
  const [highlight, setHighlight] = useState<number>(-1);
  const revealed = props.result !== null;

  useEffect(() => { setSupported(recordingSupported()); }, []);
  useEffect(() => () => { recRef.current?.cancel(); if (blobUrl) URL.revokeObjectURL(blobUrl); }, [blobUrl]);
  useEffect(() => { setBlobUrl(null); setHighlight(-1); setError(null); }, [props.exercise.id]);

  const words = payload.text.split(" ");
  const charOffsets = useMemo(() => { let acc = 0; return words.map((w) => { const s = acc; acc += w.length + 1; return s; }); }, [words]);

  const toggle = async () => {
    if (recording) {
      setRecording(false);
      const blob = await recRef.current?.stop();
      recRef.current = null;
      if (blob) setBlobUrl(URL.createObjectURL(blob));
      return;
    }
    try {
      setError(null);
      recRef.current = await startRecording();
      setRecording(true);
    } catch {
      setError("לא קיבלנו הרשאה למיקרופון. אפשר להמשיך בלי הקלטה.");
    }
  };

  return (
    <div>
      <div className="bg-card border border-line rounded-2xl p-4 mb-4 text-center">
        <p className="en text-2xl font-bold leading-relaxed">
          {words.map((w, i) => (
            <span key={i} className={`rounded px-0.5 transition-colors ${highlight === i ? "bg-amber-soft text-amber-700" : ""}`}>{w} </span>
          ))}
        </p>
        <p className="text-ink-soft mt-2">{payload.translationHe}</p>
        <div className="mt-3 flex justify-center">
          <AudioButton text={payload.text} autoPlay slow onBoundary={(ci) => setHighlight(charOffsets.findLastIndex((o) => o <= ci))} />
        </div>
      </div>

      <div className="rounded-2xl bg-brand-soft/50 p-4 flex flex-col items-center gap-3">
        <p className="text-sm text-ink-soft text-center">הקלטה נשמרת רק במכשיר שלך, ורק כשאת לוחצת על הכפתור.</p>
        {supported ? (
          <button type="button" onClick={() => void toggle()} disabled={revealed} aria-pressed={recording} aria-label={recording ? "עצירת ההקלטה" : "התחלת הקלטה"} className={`h-20 w-20 rounded-full flex items-center justify-center text-white focus-ring shadow-lg ${recording ? "bg-danger anim-pulse" : "bg-coral"}`}>
            <Icon name={recording ? "stop" : "mic"} size={34} />
          </button>
        ) : (
          <p className="text-sm font-bold text-ink-soft">הדפדפן הזה לא תומך בהקלטה. אפשר לקרוא בקול ולהמשיך.</p>
        )}
        {error && <p className="text-sm text-danger font-bold">{error}</p>}
        {blobUrl && (
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-sm font-bold">ההקלטה שלך: הקשיבי והשוו למקור</p>
            <audio controls src={blobUrl} className="w-full max-w-xs" />
          </div>
        )}
        {!revealed && (
          <Button variant="success" onClick={() => props.onSubmit({ type: "done" })} className="mt-1">
            <Icon name="check" /> קראתי בקול
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---------- story ---------- */
export function Story(props: ExerciseProps<Extract<Exercise, { type: "story" }>>) {
  const { payload } = props.exercise;
  const [answers, setAnswers] = useState<(string | null)[]>(() => payload.questions.map(() => null));
  const [showHe, setShowHe] = useState<number | null>(null);
  const [step, setStep] = useState<"read" | "questions">("read");
  const revealed = props.result !== null;
  const wrongSet = new Set(props.result?.wrongIndexes ?? []);

  useEffect(() => {
    // On retry keep correct answers, clear wrong ones.
    setAnswers((prev) => prev.map((a, i) => (wrongSet.has(i) ? null : a)));
    props.onChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.attemptKey]);
  useEffect(() => { setAnswers(payload.questions.map(() => null)); setStep("read"); setShowHe(null); }, [props.exercise.id, payload.questions]);

  const shuffledOptions = useMemo(() => payload.questions.map((q, i) => shuffle(q.options, seededRandom(props.exercise.id + i))), [payload.questions, props.exercise.id]);

  const pick = (qi: number, v: string) => {
    if (revealed) return;
    const next = answers.map((a, i) => (i === qi ? v : a));
    setAnswers(next);
    props.onChange(next.every((a) => a !== null) ? { type: "story", value: next as string[] } : null);
  };

  return (
    <div>
      <div className="bg-amber-soft/50 border border-amber/40 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="en text-xl font-extrabold">{payload.title}</h3>
          <AudioButton text={payload.paragraphs.join(" ")} size="sm" slow label="השמעת הסיפור" />
        </div>
        <ol className="space-y-2">
          {payload.paragraphs.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <AudioButton text={p} size="sm" />
              <div className="flex-1">
                <button type="button" onClick={() => setShowHe(showHe === i ? null : i)} className="en text-right w-full text-lg font-medium leading-relaxed focus-ring rounded" title="לחיצה מציגה תרגום">
                  {p}
                </button>
                {showHe === i && <p className="text-sm text-ink-soft">{payload.paragraphsHe[i]}</p>}
              </div>
            </li>
          ))}
        </ol>
        <p className="text-xs text-ink-soft mt-2">לחיצה על משפט מציגה את התרגום שלו.</p>
      </div>

      {step === "read" ? (
        <Button variant="primary" size="lg" onClick={() => setStep("questions")}>
          סיימתי לקרוא, לשאלות
        </Button>
      ) : (
        <div className="space-y-5">
          {payload.questions.map((q, qi) => (
            <div key={qi} className={`rounded-2xl border p-3 ${revealed && wrongSet.has(qi) ? "border-danger bg-danger-soft/40" : "border-line bg-card"}`}>
              <p className="font-bold mb-1">{qi + 1}. {q.questionHe}</p>
              {q.questionEn && <p className="en text-ink-soft text-sm mb-2">{q.questionEn}</p>}
              <div className="grid grid-cols-1 gap-2">
                {shuffledOptions[qi].map((o) => (
                  <OptionButton
                    key={o}
                    en={/^[A-Za-z]/.test(o)}
                    state={optionState(o, answers[qi], props.revealAnswer ? q.correct : null, revealed, revealed ? !wrongSet.has(qi) : null)}
                    onClick={() => pick(qi, o)}
                    disabled={revealed || (answers[qi] !== null && props.result !== null && !wrongSet.has(qi))}
                    className="min-h-[48px] text-base"
                  >
                    {o}
                  </OptionButton>
                ))}
              </div>
              {revealed && wrongSet.has(qi) && <p className="text-sm mt-2 text-rose-800">{q.explanationHe}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- dialogue ---------- */
export function Dialogue(props: ExerciseProps<Extract<Exercise, { type: "dialogue" }>>) {
  const { payload } = props.exercise;
  const correct = payload.lines[payload.userTurnIndex].en;
  const [selected, setSelected] = useState<string | null>(null);
  const [showHe, setShowHe] = useState(false);
  const revealed = props.result !== null;
  useEffect(() => { setSelected(null); }, [props.attemptKey, props.exercise.id]);
  const options = useMemo(() => shuffle(payload.options, seededRandom(props.exercise.id)), [payload.options, props.exercise.id]);
  const visible = payload.lines.slice(0, revealed ? payload.lines.length : payload.userTurnIndex);

  return (
    <div>
      <p className="text-center text-ink-soft font-bold mb-3">{payload.situationHe}</p>
      <div className="space-y-2 mb-4">
        {visible.map((line, i) => (
          <div key={i} className={`flex ${line.speaker === "A" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3 py-2 ${line.speaker === "A" ? "bg-card border border-line rounded-tr-sm" : "bg-brand-soft rounded-tl-sm"}`}>
              <div className="flex items-center gap-2">
                <AudioButton text={line.en} size="sm" autoPlay={i === visible.length - 1 && !revealed} />
                <p className="en font-bold">{line.en}</p>
              </div>
              {showHe && <p className="text-xs text-ink-soft mt-1">{line.he}</p>}
            </div>
          </div>
        ))}
        {!revealed && (
          <div className="flex justify-end">
            <div className="rounded-2xl bg-brand-soft/60 border-2 border-dashed border-brand px-4 py-2 text-brand font-bold">מה תגידי?</div>
          </div>
        )}
      </div>
      <button type="button" onClick={() => setShowHe((v) => !v)} className="text-sm text-brand font-bold underline mb-3 focus-ring rounded">
        {showHe ? "להסתיר תרגום" : "להציג תרגום לעברית"}
      </button>
      <div className="grid grid-cols-1 gap-3">
        {options.map((o) => (
          <OptionButton key={o} en state={optionState(o, selected, props.revealAnswer ? correct : null, revealed, props.result?.correct ?? null)} disabled={revealed} onClick={() => { setSelected(o); props.onChange({ type: "choice", value: o }); }}>
            {o}
          </OptionButton>
        ))}
      </div>
    </div>
  );
}
