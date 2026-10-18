"use client";

import Link from "next/link";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore, lessonStatusFor } from "@/lib/store";
import { WORLDS, lessonsForUnit, unitsForWorld } from "@/content";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import type { Lesson, Level, World } from "@/lib/types";

const WORLD_TONES: Record<string, { bg: string; text: string; ring: string }> = {
  sky: { bg: "bg-sky-soft", text: "text-sky-700", ring: "border-sky" },
  mint: { bg: "bg-mint-soft", text: "text-emerald-700", ring: "border-mint" },
  violet: { bg: "bg-violet-soft", text: "text-violet", ring: "border-violet" },
  coral: { bg: "bg-coral-soft", text: "text-coral", ring: "border-coral" },
  amber: { bg: "bg-amber-soft", text: "text-amber-700", ring: "border-amber" },
  rose: { bg: "bg-rose-soft", text: "text-rose", ring: "border-rose" },
};

export default function LearnPage() {
  const ready = useRequireProfile();
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const level = useAppStore((s) => s.placement.level as Level);
  if (!ready) return null;

  return (
    <div>
      <PageHeader title="מסלול ההרפתקה" subtitle="שישה עולמות, שיעורים קצרים, צעד אחרי צעד" />
      <div className="space-y-8">
        {WORLDS.map((world) => (
          <WorldSection key={world.id} world={world} lessonProgress={lessonProgress} level={level} />
        ))}
      </div>
    </div>
  );
}

function WorldSection({ world, lessonProgress, level }: { world: World; lessonProgress: ReturnType<typeof useAppStore.getState>["lessonProgress"]; level: Level }) {
  const tone = WORLD_TONES[world.color];
  const units = unitsForWorld(world.id);
  const lessons = units.flatMap((u) => lessonsForUnit(u.id));
  const completed = lessons.filter((l) => lessonProgress[l.id]?.status === "completed").length;
  return (
    <section aria-labelledby={`world-${world.id}`}>
      <div className={`rounded-3xl ${tone.bg} p-4 flex items-center gap-3 mb-3`}>
        <span className={`h-14 w-14 rounded-2xl bg-card ${tone.text} flex items-center justify-center shrink-0`}><Icon name={world.icon} size={28} /></span>
        <div className="flex-1 min-w-0">
          <h2 id={`world-${world.id}`} className="text-xl font-extrabold">עולם {world.order}: {world.titleHe}</h2>
          <p className="en text-sm text-ink-soft">{world.titleEn}</p>
          <p className="text-sm text-ink-soft">{world.descriptionHe}</p>
        </div>
        <span className={`text-sm font-bold ${tone.text} tabular-nums`}>{completed}/{lessons.length}</span>
      </div>
      {units.map((unit) => (
        <div key={unit.id} className="mb-3">
          <h3 className="text-sm font-extrabold text-ink-soft px-2 mb-2">{unit.titleHe} <span className="en font-medium">· {unit.titleEn}</span></h3>
          <ol className="space-y-2">
            {lessonsForUnit(unit.id).map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} status={lessonStatusFor(lesson.id, lessonProgress, level)} score={lessonProgress[lesson.id]?.score ?? 0} tone={tone} />
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}

function LessonRow({ lesson, status, score, tone }: { lesson: Lesson; status: string; score: number; tone: { bg: string; text: string; ring: string } }) {
  const locked = status === "locked";
  const completed = status === "completed";
  const inner = (
    <div className={`flex items-center gap-3 rounded-2xl border-2 bg-card p-3 ${locked ? "opacity-60 border-line" : completed ? `${tone.ring}` : "border-line hover:border-brand"}`}>
      <span className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 font-extrabold ${completed ? "bg-success text-white" : locked ? "bg-line text-ink-soft" : `${tone.bg} ${tone.text}`}`}>
        {completed ? <Icon name="check" /> : locked ? <Icon name="lock" size={18} /> : lesson.order}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-extrabold truncate">{lesson.titleHe}</p>
        <p className="en text-xs text-ink-soft truncate">{lesson.titleEn} · {lesson.exercises.length} תרגילים</p>
      </div>
      {completed ? (
        <span className="text-sm font-bold text-emerald-700 tabular-nums">{score}%</span>
      ) : status === "in-progress" ? (
        <span className="text-xs font-bold bg-amber-soft text-amber-700 rounded-full px-2 py-1">בתהליך</span>
      ) : !locked ? (
        <Icon name="play" className="text-brand" />
      ) : null}
    </div>
  );
  if (locked) return <li>{inner}</li>;
  return (
    <li>
      <Link href={`/lesson/${lesson.id}`} className="block focus-ring rounded-2xl">{inner}</Link>
    </li>
  );
}
