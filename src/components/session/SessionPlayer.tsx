"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Exercise, ExerciseResult } from "@/lib/types";
import type { Answer } from "@/lib/grading";
import { advance, createSession, current, progress, retry, showHint, skip, submit, MAX_ATTEMPTS, type SessionState } from "@/lib/lessonEngine";
import { useAppStore } from "@/lib/store";
import { pickLine } from "@/content/mascots";
import { ExerciseRenderer, isSelfSubmitting } from "@/components/exercises/ExerciseRenderer";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MascotAvatar } from "@/components/mascot/MascotAvatar";
import { AudioButton } from "@/components/exercises/AudioButton";
import { stopSpeaking } from "@/lib/audio";

interface Props {
  exercises: Exercise[];
  titleHe: string;
  onFinish: (results: ExerciseResult[], durationSeconds: number) => void;
  onExit: () => void;
  /** Optional: stop early when this returns false after each answer (placement). */
  shouldContinue?: (results: ExerciseResult[], nextExercise: Exercise | null) => boolean;
}

export function SessionPlayer({ exercises, titleHe, onFinish, onExit, shouldContinue }: Props) {
  const [state, setState] = useState<SessionState>(() => createSession(exercises));
  const [pending, setPending] = useState<Answer | null>(null);
  const [attemptKey, setAttemptKey] = useState(0);
  const [confirmExit, setConfirmExit] = useState(false);
  const mascotId = useAppStore((s) => s.profile?.mascotId ?? "pixi");
  const equipped = useAppStore((s) => s.equipped);
  const hintsEnabled = useAppStore((s) => s.settings.showHints);
  const finishedRef = useRef(false);
  const liveRef = useRef<HTMLDivElement>(null);

  const item = current(state);
  const { done, total } = progress(state);
  const res = state.last;
  const outOfTries = res !== null && !res.correct && state.attempts >= MAX_ATTEMPTS;

  useEffect(() => {
    if (state.finished && !finishedRef.current) {
      finishedRef.current = true;
      stopSpeaking();
      onFinish(state.results, Math.round((Date.now() - state.startedAt) / 1000));
    }
  }, [state.finished, state.results, state.startedAt, onFinish]);

  const handleSubmit = useCallback((answer: Answer) => {
    setState((s) => submit(s, answer));
    setPending(null);
  }, []);

  const handleContinue = () => {
    setState((s) => {
      const next = advance(s);
      if (shouldContinue && !next.finished) {
        const nextItem = current(next);
        if (!shouldContinue(next.results, nextItem?.exercise ?? null)) return { ...next, finished: true };
      }
      return next;
    });
    setAttemptKey((k) => k + 1);
  };

  const handleRetry = () => {
    setState((s) => retry(s));
    setAttemptKey((k) => k + 1);
    setPending(null);
  };

  const mascotLine = useMemo(() => {
    if (!res) return null;
    if (res.correct) return pickLine("celebrate", (state.index + 1) / 7);
    if (outOfTries) return pickLine("wrong", state.index / 5);
    return pickLine("encourage", state.index / 3);
  }, [res, outOfTries, state.index]);

  useEffect(() => { liveRef.current?.focus(); }, [res]);

  if (!item) return null;
  const ex = item.exercise;
  const hints = hintsEnabled ? ex.hintsHe ?? [] : [];
  const selfSubmit = isSelfSubmitting(ex.type);

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="flex items-center gap-3 py-2">
        <button type="button" onClick={() => setConfirmExit(true)} aria-label="יציאה מהשיעור" className="h-10 w-10 rounded-xl flex items-center justify-center text-ink-soft hover:bg-line focus-ring">
          <Icon name="x" />
        </button>
        <div className="flex-1">
          <ProgressBar value={done} max={total} label={`התקדמות: ${done} מתוך ${total}`} color="bg-mint" />
        </div>
        <span className="text-sm font-bold text-ink-soft tabular-nums">{done}/{total}</span>
      </header>

      <div className="flex-1 pb-44">
        <div className="flex items-center gap-2 mb-1 mt-2">
          {item.isRetry && <span className="text-xs font-bold bg-amber-soft text-amber-700 rounded-full px-2 py-0.5">ניסיון חוזר</span>}
          {item.isFollowUp && <span className="text-xs font-bold bg-sky-soft text-sky-700 rounded-full px-2 py-0.5">בדיקה קטנה</span>}
        </div>
        <h2 className="text-xl font-extrabold mb-1">{ex.promptHe}</h2>
        {ex.promptEn && (
          <div className="flex items-center gap-2 text-ink-soft text-sm mb-3">
            <span className="en">{ex.promptEn}</span>
            <AudioButton text={ex.promptEn} size="sm" />
          </div>
        )}
        <div key={`${ex.id}-${attemptKey}`} className="anim-pop mt-3">
          <ExerciseRenderer exercise={ex} attemptKey={attemptKey} result={res} revealAnswer={outOfTries} onChange={setPending} onSubmit={handleSubmit} hintsShown={state.hintsShown} />
        </div>

        {state.hintsShown > 0 && !res && (
          <div className="mt-4 space-y-2" aria-live="polite">
            {hints.slice(0, state.hintsShown).map((h, i) => (
              <div key={i} className="flex items-start gap-2 bg-amber-soft text-amber-900 rounded-xl px-3 py-2 text-sm font-medium">
                <Icon name="bulb" size={18} className="shrink-0 mt-0.5" /> {h}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30">
        <div className={`max-w-2xl mx-auto px-4 pt-3 pb-5 rounded-t-3xl border-t transition-colors ${res ? (res.correct ? "bg-success-soft border-success/40" : "bg-danger-soft border-danger/40") : "bg-card border-line"}`} style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)" }}>
          {res ? (
            <div ref={liveRef} tabIndex={-1} className="focus:outline-none" aria-live="assertive">
              <div className="flex items-start gap-3 mb-3">
                <MascotAvatar mascotId={mascotId} mood={res.correct ? "cheer" : "oops"} size={56} equipped={equipped} />
                <div className="flex-1">
                  <p className={`font-extrabold text-lg ${res.correct ? "text-emerald-800" : "text-rose-800"}`}>{res.feedbackHe}</p>
                  <p className="text-sm text-ink-soft">{mascotLine}</p>
                  {(res.correct || outOfTries) && <p className="mt-1 text-sm font-medium bg-card/70 rounded-xl px-3 py-2">{ex.explanationHe}</p>}
                </div>
              </div>
              {res.correct || outOfTries ? (
                <Button size="lg" variant={res.correct ? "success" : "primary"} onClick={handleContinue} autoFocus>
                  המשך <Icon name="arrow" className="rotate-180" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="lg" variant="primary" onClick={handleRetry} autoFocus>
                    עוד ניסיון
                  </Button>
                  {hints.length > state.hintsShown && (
                    <Button variant="outline" onClick={() => { setState((s) => showHint(retry(s))); setAttemptKey((k) => k + 1); setPending(null); }} className="shrink-0">
                      <Icon name="bulb" /> רמז
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              {!selfSubmit && (
                <Button size="lg" variant="primary" disabled={!pending} onClick={() => pending && handleSubmit(pending)}>
                  <Icon name="check" /> בדיקה
                </Button>
              )}
              {selfSubmit && ex.type === "match-pairs" && (
                <p className="flex-1 self-center text-center text-sm font-bold text-ink-soft">לחצי על מילה באנגלית ואז על התרגום שלה</p>
              )}
              {selfSubmit && ex.type === "read-record" && (
                <Button size="lg" variant="outline" onClick={() => setState((s) => skip(s))}>
                  דילוג
                </Button>
              )}
              {hints.length > state.hintsShown && (
                <Button variant="outline" onClick={() => setState((s) => showHint(s))} className="shrink-0" aria-label="רמז">
                  <Icon name="bulb" /> רמז
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {confirmExit && (
        <div role="dialog" aria-modal="true" aria-labelledby="exit-title" className="fixed inset-0 z-50 bg-ink/50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-6 w-full max-w-sm anim-pop">
            <h3 id="exit-title" className="text-xl font-extrabold mb-2">לצאת מ{titleHe}?</h3>
            <p className="text-ink-soft mb-5">ההתקדמות בשיעור הזה לא תישמר, אבל המילים שכבר תרגלת כן נזכרות.</p>
            <div className="flex gap-2">
              <Button variant="danger" onClick={() => { stopSpeaking(); onExit(); }} className="flex-1">יציאה</Button>
              <Button variant="secondary" onClick={() => setConfirmExit(false)} className="flex-1" autoFocus>להישאר</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
