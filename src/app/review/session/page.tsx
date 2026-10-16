"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore } from "@/lib/store";
import { buildReviewExercises } from "@/lib/review";
import type { ExerciseResult } from "@/lib/types";
import { SessionPlayer } from "@/components/session/SessionPlayer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { Confetti } from "@/components/ui/Confetti";
import { ACHIEVEMENT_BY_ID } from "@/content/achievements";

export default function ReviewSessionPage() {
  const ready = useRequireProfile();
  const router = useRouter();
  const vocabProgress = useAppStore((s) => s.vocabProgress);
  const completeReview = useAppStore((s) => s.completeReview);
  const [seed] = useState(() => String(Date.now()));
  const [outcome, setOutcome] = useState<{ xpEarned: number; coinsEarned: number; unlocked: string[]; correct: number; total: number } | null>(null);
  // Snapshot the exercises once, so store updates during the session don't reshuffle them.
  const exercises = useMemo(() => buildReviewExercises(Object.values(vocabProgress), seed), [seed]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ready && exercises.length === 0) router.replace("/review");
  }, [ready, exercises.length, router]);

  const onFinish = useCallback((results: ExerciseResult[], duration: number) => {
    const r = completeReview(results, duration);
    setOutcome({ ...r, correct: results.filter((x) => x.correct).length, total: results.length });
  }, [completeReview]);

  if (!ready || exercises.length === 0) return null;

  if (outcome) {
    return (
      <div className="min-h-dvh flex flex-col justify-center gap-4 py-6">
        {outcome.correct >= outcome.total * 0.7 && <Confetti count={25} />}
        <MascotBubble text={outcome.correct === outcome.total ? "כל המילים ישבו לך בראש. מצוין!" : "סיימת סיבוב חזרה. המילים שהתבלבלת בהן יחזרו שוב בקרוב."} mood="cheer" />
        <Card className="text-center">
          <p className="text-ink-soft font-bold">ענית נכון על</p>
          <p className="text-5xl font-extrabold tabular-nums">{outcome.correct}/{outcome.total}</p>
          <div className="flex justify-center gap-3 mt-3">
            <span className="bg-brand-soft text-brand-deep rounded-full px-3 py-1 font-bold flex items-center gap-1"><Icon name="star" size={16} /> +{outcome.xpEarned} XP</span>
            <span className="bg-amber-soft text-amber-700 rounded-full px-3 py-1 font-bold flex items-center gap-1"><Icon name="coin" size={16} /> +{outcome.coinsEarned}</span>
          </div>
        </Card>
        {outcome.unlocked.length > 0 && (
          <Card className="border-amber bg-amber-soft/50">
            <h3 className="font-extrabold flex items-center gap-2"><Icon name="trophy" className="text-amber-700" /> הישג חדש!</h3>
            {outcome.unlocked.map((id) => <p key={id} className="font-bold">{ACHIEVEMENT_BY_ID[id]?.titleHe}</p>)}
          </Card>
        )}
        <Button size="lg" href="/review">סיום</Button>
        <Button variant="secondary" href="/">למסך הבית</Button>
      </div>
    );
  }

  return <SessionPlayer exercises={exercises} titleHe="תרגול החזרה" onFinish={onFinish} onExit={() => router.push("/review")} />;
}
