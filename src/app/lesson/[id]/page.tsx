"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore, nextLessonId } from "@/lib/store";
import { getLesson, VOCAB_BY_ID, WORLD_BY_ID } from "@/content";
import { ACHIEVEMENT_BY_ID } from "@/content/achievements";
import type { ExerciseResult, LessonSummary, Level } from "@/lib/types";
import { SessionPlayer } from "@/components/session/SessionPlayer";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { AudioButton } from "@/components/exercises/AudioButton";
import { Confetti } from "@/components/ui/Confetti";
import { Picture } from "@/components/exercises/Picture";
import { pickLine } from "@/content/mascots";

export default function LessonPage() {
  const ready = useRequireProfile();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const lesson = getLesson(params.id);
  const startLesson = useAppStore((s) => s.startLesson);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const level = useAppStore((s) => s.placement.level as Level);
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [summary, setSummary] = useState<LessonSummary | null>(null);

  useEffect(() => {
    if (ready && lesson && phase === "play") startLesson(lesson.id);
  }, [ready, lesson, phase, startLesson]);

  const onFinish = useCallback((results: ExerciseResult[], duration: number) => {
    if (!lesson) return;
    setSummary(completeLesson(lesson.id, results, duration));
    setPhase("done");
  }, [lesson, completeLesson]);

  if (!ready) return null;
  if (!lesson) {
    return (
      <div className="py-10 text-center space-y-4">
        <p className="text-xl font-extrabold">השיעור לא נמצא</p>
        <Button href="/learn">חזרה למסלול</Button>
      </div>
    );
  }
  const world = WORLD_BY_ID[lesson.worldId];

  if (phase === "intro") {
    const vocab = lesson.vocabIds.map((id) => VOCAB_BY_ID[id]).filter(Boolean);
    return (
      <div className="min-h-dvh flex flex-col py-2">
        <button type="button" onClick={() => router.back()} aria-label="חזרה" className="self-start h-10 w-10 rounded-xl flex items-center justify-center text-ink-soft hover:bg-line focus-ring">
          <Icon name="x" />
        </button>
        <div className="flex-1 space-y-4 pb-28">
          <div>
            <p className="text-sm font-bold text-brand">עולם {world.order} · {world.titleHe}</p>
            <h1 className="text-3xl font-extrabold">{lesson.titleHe}</h1>
            <p className="en text-ink-soft">{lesson.titleEn} · ~{lesson.estimatedMinutes} min · {lesson.exercises.length} תרגילים</p>
          </div>
          <MascotBubble text={pickLine("lessonStart", lesson.order / 10)} mood="happy" size={72} />
          {lesson.intro && (
            <Card className="bg-brand-soft/40 border-brand/20">
              <h2 className="text-lg font-extrabold mb-1">{lesson.intro.titleHe}</h2>
              <p className="leading-relaxed">{lesson.intro.bodyHe}</p>
              {lesson.intro.examples && (
                <ul className="mt-3 space-y-2">
                  {lesson.intro.examples.map((e, i) => (
                    <li key={i} className="flex items-center gap-2 bg-card rounded-xl px-3 py-2">
                      <AudioButton text={e.en.split("—")[0].trim()} size="sm" />
                      <span className="en font-bold flex-1">{e.en}</span>
                      <span className="text-ink-soft text-sm">{e.he}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
          <Card>
            <h2 className="font-extrabold mb-2">מה נלמד</h2>
            <ul className="space-y-1">
              {lesson.learningObjectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm"><Icon name="check" size={16} className="text-success mt-0.5 shrink-0" />{o}</li>
              ))}
            </ul>
          </Card>
          {vocab.length > 0 && (
            <Card>
              <h2 className="font-extrabold mb-2">מילים בשיעור</h2>
              <ul className="grid grid-cols-2 gap-2">
                {vocab.map((v) => (
                  <li key={v.id} className="flex items-center gap-2 rounded-xl border border-line px-2 py-1.5">
                    <Picture vocabId={v.id} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="en font-bold text-sm truncate">{v.word}</p>
                      <p className="text-xs text-ink-soft truncate">{v.translationHe}</p>
                    </div>
                    <AudioButton text={v.word} audioUrl={v.audioUrl} size="sm" />
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
        <div className="fixed inset-x-0 bottom-0 bg-card/95 backdrop-blur border-t border-line" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          <div className="max-w-2xl mx-auto px-4 py-3">
            <Button size="lg" onClick={() => setPhase("play")}><Icon name="play" /> {lessonProgress[lesson.id]?.status === "completed" ? "לתרגל שוב" : "מתחילים"}</Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "play") {
    return <SessionPlayer exercises={lesson.exercises} titleHe={lesson.titleHe} onFinish={onFinish} onExit={() => router.push("/learn")} />;
  }

  return summary ? <LessonDone summary={summary} lessonId={lesson.id} nextId={nextLessonId(lessonProgress, level)} onRetry={() => { setSummary(null); setPhase("play"); }} /> : null;
}

function LessonDone({ summary, lessonId, nextId, onRetry }: { summary: LessonSummary; lessonId: string; nextId: string | null; onRetry: () => void }) {
  const nickname = useAppStore((s) => s.profile?.nickname ?? "");
  const good = summary.score >= 70;
  const newWords = summary.newWords.map((id) => VOCAB_BY_ID[id]).filter(Boolean);
  const reviewWords = summary.wordsToReview.map((id) => VOCAB_BY_ID[id]).filter(Boolean);
  const wrongTypes = summary.results.filter((r) => !r.correct);
  const adviceHe = (() => {
    if (wrongTypes.length === 0) return "ענית נכון על הכול. בפעם הבאה ננסה שיעור חדש או חזרה על מילים ותיקות.";
    const kinds = new Set(wrongTypes.map((r) => r.errorKind));
    if (kinds.has("spelling")) return "כדאי לחזור על האיות של המילים שהתבלבלת בהן. נזכיר אותן בתרגול החזרה.";
    if (kinds.has("grammar") || kinds.has("order")) return "כדאי לקרוא שוב את ההסבר בתחילת השיעור ולהתאמן על סדר המילים.";
    if (kinds.has("listening")) return "כדאי להקשיב למילים שוב, גם במהירות איטית, ולחזור עליהן בקול.";
    return "המילים שהתבלבלת בהן נכנסו לתור החזרה. ניפגש איתן שוב בקרוב.";
  })();
  const next = nextId && nextId !== lessonId ? nextId : null;

  return (
    <div className="min-h-dvh flex flex-col py-4 gap-4">
      {good && <Confetti />}
      <MascotBubble text={summary.perfect ? `${nickname}, שיעור מושלם! כל תשובה נכונה בניסיון הראשון.` : good ? "סיימת את השיעור. עבודה יפה!" : "סיימת! היו כמה טעויות, וזה בדיוק מה שעוזר ללמוד."} mood={good ? "cheer" : "happy"} />

      <Card className="text-center bg-gradient-to-br from-brand to-violet text-white border-0">
        <p className="text-white/80 font-bold">ציון השיעור</p>
        <p className="text-6xl font-extrabold tabular-nums my-1">{summary.score}%</p>
        <div className="flex justify-center gap-3 mt-2">
          <span className="bg-white/20 rounded-full px-3 py-1 font-bold flex items-center gap-1"><Icon name="star" size={16} /> +{summary.xpEarned} XP</span>
          <span className="bg-white/20 rounded-full px-3 py-1 font-bold flex items-center gap-1"><Icon name="coin" size={16} /> +{summary.coinsEarned}</span>
          <span className="bg-white/20 rounded-full px-3 py-1 font-bold flex items-center gap-1"><Icon name="clock" size={16} /> {Math.max(1, Math.round(summary.durationSeconds / 60))} דק&apos;</span>
        </div>
      </Card>

      {summary.unlockedAchievements.length > 0 && (
        <Card className="border-amber bg-amber-soft/50">
          <h3 className="font-extrabold flex items-center gap-2"><Icon name="trophy" className="text-amber-700" /> הישג חדש!</h3>
          <ul className="mt-1">
            {summary.unlockedAchievements.map((id) => (
              <li key={id} className="font-bold">{ACHIEVEMENT_BY_ID[id]?.titleHe} <span className="text-sm text-ink-soft font-medium">· {ACHIEVEMENT_BY_ID[id]?.descriptionHe}</span></li>
            ))}
          </ul>
        </Card>
      )}

      {newWords.length > 0 && (
        <Card>
          <h3 className="font-extrabold mb-2">מילים חדשות שלמדת ({newWords.length})</h3>
          <ul className="flex flex-wrap gap-2">
            {newWords.map((v) => (
              <li key={v.id} className="flex items-center gap-1.5 rounded-full bg-mint-soft px-3 py-1 text-sm">
                <span className="en font-bold">{v.word}</span><span className="text-ink-soft">{v.translationHe}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <h3 className="font-extrabold mb-1 flex items-center gap-2"><Icon name="bulb" size={18} className="text-amber" /> על מה כדאי לחזור</h3>
        <p className="text-sm leading-relaxed">{adviceHe}</p>
        {reviewWords.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-2">
            {reviewWords.map((v) => (
              <li key={v.id} className="flex items-center gap-1.5 rounded-full bg-coral-soft px-3 py-1 text-sm">
                <span className="en font-bold">{v.word}</span><span className="text-ink-soft">{v.translationHe}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="grid gap-2 mt-auto">
        {next ? <Button href={`/lesson/${next}`} size="lg">לשיעור הבא <Icon name="arrow" className="rotate-180" /></Button> : <Button href="/review" size="lg"><Icon name="repeat" /> לתרגול חזרה</Button>}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onRetry}>לתרגל שוב</Button>
          <Button variant="secondary" href="/">למסך הבית</Button>
        </div>
      </div>
    </div>
  );
}
