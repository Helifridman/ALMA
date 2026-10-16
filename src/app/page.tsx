"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, dueWordCount, nextLessonId } from "@/lib/store";
import { getLesson, WORLD_BY_ID } from "@/content";
import { ACHIEVEMENTS } from "@/content/achievements";
import { pickLine } from "@/content/mascots";
import { rankFor } from "@/lib/scoring";
import { todayKey } from "@/lib/dates";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { MascotBubble } from "@/components/mascot/MascotBubble";

export default function HomePage() {
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const profile = useAppStore((s) => s.profile);
  const placement = useAppStore((s) => s.placement);
  const stats = useAppStore((s) => s.stats);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const vocabProgress = useAppStore((s) => s.vocabProgress);
  const achievements = useAppStore((s) => s.achievements);
  const weekly = useAppStore((s) => s.weekly);

  useEffect(() => {
    if (!hydrated) return;
    if (!profile) router.replace("/welcome");
    else if (!placement.done) router.replace("/placement");
  }, [hydrated, profile, placement.done, router]);

  if (!hydrated || !profile || !placement.done) return null;

  const level = placement.level as 0 | 1 | 2 | 3 | 4;
  const nextId = nextLessonId(lessonProgress, level);
  const next = nextId ? getLesson(nextId) : undefined;
  const nextWorld = next ? WORLD_BY_ID[next.worldId] : undefined;
  const due = dueWordCount(vocabProgress);
  const wordsSeen = Object.keys(vocabProgress).length;
  const today = todayKey();
  const todayXP = stats.xpByDay[today] ?? 0;
  const goalDone = todayXP >= stats.dailyGoalXP;
  const rank = rankFor(stats.totalXP);
  const unlocked = ACHIEVEMENTS.filter((a) => achievements[a.id]);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "בוקר טוב" : hour < 18 ? "צהריים טובים" : "ערב טוב";
  const line = due >= 5 ? pickLine("reviewNudge", 0.3) : pickLine("greeting", (stats.totalXP % 7) / 7);

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-ink-soft text-sm font-bold">{greeting},</p>
          <h1 className="text-3xl font-extrabold">{profile.nickname}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Pill icon="flame" tone="coral">{stats.currentStreak}</Pill>
          <Pill icon="coin" tone="amber">{stats.coins}</Pill>
          <Link href="/settings" aria-label="הגדרות" className="h-10 w-10 rounded-2xl bg-card border border-line flex items-center justify-center text-ink-soft focus-ring hover:text-brand">
            <Icon name="settings" size={20} />
          </Link>
        </div>
      </header>

      <MascotBubble text={line} mood={goalDone ? "cheer" : "happy"} />

      {/* main CTA */}
      <Card className="bg-gradient-to-br from-brand to-violet text-white border-0 p-5">
        <p className="text-white/80 text-sm font-bold">{next ? `השיעור הבא · ${nextWorld?.titleHe}` : "כל השיעורים הושלמו!"}</p>
        <h2 className="text-2xl font-extrabold mt-1">{next ? next.titleHe : "כל הכבוד!"}</h2>
        {next && <p className="en text-white/80 text-sm">{next.titleEn} · ~{next.estimatedMinutes} min</p>}
        <div className="mt-4">
          {next ? (
            <Button href={`/lesson/${next.id}`} size="lg" className="bg-white !text-brand-deep shadow-[0_5px_0_0_#d9d0ff]">
              <Icon name="play" /> מתחילים ללמוד
            </Button>
          ) : (
            <Button href="/review" size="lg" className="bg-white !text-brand-deep shadow-[0_5px_0_0_#d9d0ff]">
              <Icon name="repeat" /> לתרגול חזרה
            </Button>
          )}
        </div>
      </Card>

      {/* daily goal */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-extrabold flex items-center gap-2"><Icon name="zap" size={18} className="text-amber" /> משימת היום</h3>
          <span className="text-sm font-bold text-ink-soft tabular-nums">{Math.min(todayXP, stats.dailyGoalXP)}/{stats.dailyGoalXP} XP</span>
        </div>
        <ProgressBar value={todayXP} max={stats.dailyGoalXP} color={goalDone ? "bg-success" : "bg-amber"} label="יעד יומי" />
        <p className="text-sm text-ink-soft mt-2">{goalDone ? "היעד היומי הושג! כל מה שמעבר זה בונוס." : "שיעור אחד או תרגול חזרה אחד בדרך כלל משלימים את היעד."}</p>
      </Card>

      {/* stats row */}
      <div className="grid grid-cols-3 gap-3">
        <Stat icon="star" label="XP" value={stats.totalXP} tone="text-brand" />
        <Stat icon="book" label="מילים" value={wordsSeen} tone="text-sky" />
        <Stat icon="trophy" label="שיעורים" value={stats.completedLessons} tone="text-mint" />
      </div>

      <Card className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-bold text-ink-soft">הדרגה שלך</p>
          <p className="text-lg font-extrabold">{rank.titleHe}</p>
          <ProgressBar value={rank.progress} max={1} className="mt-1 h-2" label="התקדמות לדרגה הבאה" />
        </div>
        {rank.nextXP && <p className="text-xs text-ink-soft">עוד {rank.nextXP - stats.totalXP} XP</p>}
      </Card>

      {/* review shortcut */}
      <Link href="/review" className="block focus-ring rounded-2xl">
        <Card className={`flex items-center gap-3 ${due > 0 ? "border-coral/50 bg-coral-soft/40" : ""}`}>
          <span className="h-12 w-12 rounded-2xl bg-coral-soft text-coral flex items-center justify-center shrink-0"><Icon name="repeat" /></span>
          <div className="flex-1">
            <p className="font-extrabold">חזרה על מילים</p>
            <p className="text-sm text-ink-soft">{due > 0 ? `${due} מילים מחכות לחזרה` : wordsSeen > 0 ? "כל המילים מעודכנות. אפשר לתרגל בכל זאת." : "נלמד כמה מילים ואז נחזור עליהן."}</p>
          </div>
          <Icon name="chevron" className="text-ink-soft" />
        </Card>
      </Link>

      {/* weekly quest */}
      <Card>
        <h3 className="font-extrabold flex items-center gap-2 mb-3"><Icon name="sparkle" size={18} className="text-violet" /> המשימה השבועית</h3>
        <div className="space-y-3">
          <Quest label="להשלים 5 שיעורים" value={weekly.lessons} max={5} />
          <Quest label="3 תרגולי חזרה" value={weekly.reviews} max={3} />
          <Quest label="לשלוט ב-10 מילים חדשות" value={weekly.words} max={10} />
        </div>
      </Card>

      {/* achievements */}
      <Link href="/achievements" className="block focus-ring rounded-2xl">
        <Card className="flex items-center gap-3">
          <span className="h-12 w-12 rounded-2xl bg-amber-soft text-amber-700 flex items-center justify-center shrink-0"><Icon name="trophy" /></span>
          <div className="flex-1">
            <p className="font-extrabold">הישגים</p>
            <p className="text-sm text-ink-soft">{unlocked.length} מתוך {ACHIEVEMENTS.length} נפתחו{unlocked.length ? ` · האחרון: ${unlocked[unlocked.length - 1].titleHe}` : ""}</p>
          </div>
          <Icon name="chevron" className="text-ink-soft" />
        </Card>
      </Link>

      <div className="grid grid-cols-2 gap-3">
        <Button href="/words" variant="outline"><Icon name="book" size={18} /> המילים שלי</Button>
        <Button href="/shop" variant="outline"><Icon name="shop" size={18} /> החנות</Button>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, tone }: { icon: "star" | "book" | "trophy"; label: string; value: number; tone: string }) {
  return (
    <Card className="flex flex-col items-center py-3">
      <Icon name={icon} className={tone} />
      <p className="text-2xl font-extrabold tabular-nums mt-1">{value}</p>
      <p className="text-xs text-ink-soft font-bold">{label}</p>
    </Card>
  );
}

function Quest({ label, value, max }: { label: string; value: number; max: number }) {
  const done = value >= max;
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className={`font-bold ${done ? "text-emerald-700" : ""}`}>{done && <Icon name="check" size={14} className="inline ml-1" />}{label}</span>
        <span className="text-ink-soft tabular-nums">{Math.min(value, max)}/{max}</span>
      </div>
      <ProgressBar value={value} max={max} color={done ? "bg-success" : "bg-violet"} className="h-2" label={label} />
    </div>
  );
}
