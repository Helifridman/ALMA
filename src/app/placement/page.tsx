"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { PLACEMENT_QUESTIONS } from "@/content/placement";
import { determineLevel, LEVEL_NAMES_HE, shouldContinue, START_WORLD_FOR_LEVEL } from "@/lib/placement";
import { WORLD_BY_ID } from "@/content/worlds";
import type { ExerciseResult, Level } from "@/lib/types";
import { SessionPlayer } from "@/components/session/SessionPlayer";
import { Button } from "@/components/ui/Button";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { Icon } from "@/components/ui/Icon";
import { Confetti } from "@/components/ui/Confetti";

export default function PlacementPage() {
  const ready = useRequireProfile();
  const router = useRouter();
  const completePlacement = useAppStore((s) => s.completePlacement);
  const skipPlacement = useAppStore((s) => s.skipPlacement);
  const nickname = useAppStore((s) => s.profile?.nickname ?? "");
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [level, setLevel] = useState<Level>(0);
  const [stats, setStats] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const exercises = useMemo(() => PLACEMENT_QUESTIONS.map((q) => q.exercise), []);
  const levelOf = useMemo(() => new Map(PLACEMENT_QUESTIONS.map((q) => [q.exercise.id, q.level])), []);

  const onFinish = useCallback((results: ExerciseResult[]) => {
    const { level: lv } = determineLevel(results);
    setLevel(lv);
    setStats({ correct: results.filter((r) => r.correct && r.firstTry).length, total: results.length });
    completePlacement(lv, results);
    setPhase("done");
  }, [completePlacement]);

  if (!ready) return null;

  if (phase === "intro") {
    return (
      <div className="min-h-dvh flex flex-col justify-center gap-6 py-6">
        <MascotBubble text={`${nickname}, נתחיל באבחון קצר. עונים על כמה שאלות, בלי לחץ. אם משהו קשה מדי, זה בסדר גמור: ככה נדע מאיפה להתחיל.`} mood="think" size={96} />
        <ul className="text-ink-soft space-y-1 text-sm px-1">
          <li>• בין 8 ל-17 שאלות, בערך 3–5 דקות.</li>
          <li>• השאלות נהיות קשות יותר, ועוצרות כשצריך.</li>
          <li>• אפשר לדלג ולהתחיל מההתחלה.</li>
        </ul>
        <Button size="lg" onClick={() => setPhase("play")}>מתחילים את האבחון <Icon name="arrow" className="rotate-180" /></Button>
        <Button variant="ghost" onClick={() => { skipPlacement(); router.replace("/"); }}>לדלג ולהתחיל מרמה 0</Button>
      </div>
    );
  }

  if (phase === "play") {
    return (
      <SessionPlayer
        exercises={exercises}
        titleHe="האבחון"
        onFinish={onFinish}
        onExit={() => { skipPlacement(); router.replace("/"); }}
        shouldContinue={(results, nextEx) => (nextEx ? shouldContinue(results, levelOf.get(nextEx.id) ?? 0) : true)}
      />
    );
  }

  const world = WORLD_BY_ID[START_WORLD_FOR_LEVEL[level]];
  return (
    <div className="min-h-dvh flex flex-col justify-center gap-6 py-6">
      <Confetti count={30} />
      <MascotBubble text="סיימת את האבחון! הנה המסלול שהכנו לך." mood="cheer" size={96} />
      <div className="bg-card border border-line rounded-3xl p-5 shadow-card">
        <p className="text-sm text-ink-soft font-bold">נקודת הפתיחה שלך</p>
        <p className="text-2xl font-extrabold mt-1">{LEVEL_NAMES_HE[level]}</p>
        <p className="text-ink-soft mt-2">ענית נכון על {stats.correct} מתוך {stats.total} שאלות. נתחיל בעולם <span className="font-bold">{world.titleHe}</span> ({world.titleEn}). העולמות הקודמים פתוחים גם הם, אם תרצי לחזור ולחזק.</p>
      </div>
      <Button size="lg" onClick={() => router.replace("/")}>למסך הבית <Icon name="arrow" className="rotate-180" /></Button>
    </div>
  );
}
