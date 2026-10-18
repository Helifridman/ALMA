"use client";

import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore } from "@/lib/store";
import { ACHIEVEMENTS } from "@/content/achievements";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { rankFor } from "@/lib/scoring";

export default function AchievementsPage() {
  const ready = useRequireProfile();
  const achievements = useAppStore((s) => s.achievements);
  const stats = useAppStore((s) => s.stats);
  if (!ready) return null;
  const unlockedCount = ACHIEVEMENTS.filter((a) => achievements[a.id]).length;
  const rank = rankFor(stats.totalXP);

  return (
    <div>
      <PageHeader title="ההישגים שלי" subtitle={`${unlockedCount} מתוך ${ACHIEVEMENTS.length} נפתחו`} />
      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-ink-soft">דרגה</p>
            <p className="text-2xl font-extrabold">{rank.titleHe}</p>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-ink-soft">סה&quot;כ XP</p>
            <p className="text-2xl font-extrabold tabular-nums">{stats.totalXP}</p>
          </div>
        </div>
        <ProgressBar value={rank.progress} className="mt-2" label="התקדמות לדרגה הבאה" />
        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
          <div><p className="font-extrabold text-coral tabular-nums">{stats.currentStreak}</p><p className="text-ink-soft">רצף נוכחי</p></div>
          <div><p className="font-extrabold text-amber-700 tabular-nums">{stats.longestStreak}</p><p className="text-ink-soft">רצף הכי ארוך</p></div>
          <div><p className="font-extrabold text-mint tabular-nums">{stats.wordsMastered}</p><p className="text-ink-soft">מילים בשליטה</p></div>
        </div>
      </Card>
      <ul className="grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const on = Boolean(achievements[a.id]);
          return (
            <li key={a.id} className={`rounded-2xl border p-3 flex flex-col items-center text-center gap-1 ${on ? "bg-card border-amber shadow-card" : "bg-card/60 border-line opacity-70"}`}>
              <span className={`h-14 w-14 rounded-full flex items-center justify-center ${on ? "bg-amber-soft text-amber-700" : "bg-line text-ink-soft"}`}>
                <Icon name={on ? a.icon : "lock"} size={26} />
              </span>
              <p className="font-extrabold text-sm leading-tight">{a.titleHe}</p>
              <p className="text-xs text-ink-soft leading-tight">{a.descriptionHe}</p>
              {on && <p className="text-[10px] text-ink-soft">{new Date(achievements[a.id]).toLocaleDateString("he-IL")}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
