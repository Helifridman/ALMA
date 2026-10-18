"use client";

import { useMemo, useState } from "react";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore, dueWordCount } from "@/lib/store";
import { VOCAB_BY_ID, LESSONS } from "@/content";
import { lastNDays, todayKey, weekdayHe } from "@/lib/dates";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Icon } from "@/components/ui/Icon";
import type { Skill } from "@/lib/types";

const SKILL_HE: Record<Skill, string> = { vocabulary: "אוצר מילים", reading: "קריאה", writing: "כתיבה", listening: "הקשבה", speaking: "דיבור", grammar: "דקדוק" };

/**
 * Parent area. Protected by a parent gate: a PIN if one was set in settings,
 * otherwise a simple arithmetic gate (a prototype-level barrier against casual access).
 */
export default function ParentsPage() {
  const ready = useRequireProfile();
  const pin = useAppStore((s) => s.settings.parentPin);
  const [open, setOpen] = useState(false);
  if (!ready) return null;
  return (
    <div>
      <PageHeader title="אזור הורים" subtitle="מבט על הלמידה, בלי ציון כולל מטעה" />
      {open ? <ParentDashboard /> : <ParentGate pin={pin} onPass={() => setOpen(true)} />}
    </div>
  );
}

function ParentGate({ pin, onPass }: { pin: string | null; onPass: () => void }) {
  const [a] = useState(() => 3 + Math.floor(Math.random() * 6));
  const [b] = useState(() => 4 + Math.floor(Math.random() * 6));
  const [value, setValue] = useState("");
  const [err, setErr] = useState(false);
  const check = () => {
    const ok = pin ? value === pin : Number(value) === a * b;
    if (ok) onPass();
    else { setErr(true); setValue(""); }
  };
  return (
    <Card className="max-w-sm mx-auto text-center">
      <span className="mx-auto h-14 w-14 rounded-2xl bg-brand-soft text-brand flex items-center justify-center mb-3"><Icon name="lock" size={28} /></span>
      <h2 className="text-xl font-extrabold mb-1">שער הורים</h2>
      <p className="text-ink-soft text-sm mb-4">{pin ? "הזינו את קוד ההורים שהוגדר בהגדרות." : <>כדי להיכנס, פתרו: <span className="en font-bold text-lg">{a} × {b} = ?</span></>}</p>
      <input type={pin ? "password" : "number"} inputMode="numeric" value={value} onChange={(e) => { setValue(e.target.value); setErr(false); }} onKeyDown={(e) => e.key === "Enter" && check()} aria-label="תשובה" className="en w-full text-center text-2xl font-bold rounded-2xl border-2 border-line px-4 py-3 mb-3 focus-ring focus:border-brand" autoFocus />
      {err && <p className="text-danger text-sm font-bold mb-2" role="alert">לא נכון, נסו שוב.</p>}
      <Button size="lg" onClick={check}>כניסה</Button>
      {!pin && <p className="text-xs text-ink-soft mt-3">אפשר להגדיר קוד הורים קבוע במסך ההגדרות.</p>}
    </Card>
  );
}

function ParentDashboard() {
  const stats = useAppStore((s) => s.stats);
  const vocabProgress = useAppStore((s) => s.vocabProgress);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const placement = useAppStore((s) => s.placement);
  const profile = useAppStore((s) => s.profile);
  const weekly = useAppStore((s) => s.weekly);
  const setDailyGoal = useAppStore((s) => s.setDailyGoal);

  const days = useMemo(() => lastNDays(7), []);
  const totalSeconds = Object.values(stats.secondsByDay).reduce((a, b) => a + b, 0);
  const weekSeconds = days.reduce((a, d) => a + (stats.secondsByDay[d] ?? 0), 0);
  const all = Object.values(vocabProgress);
  const mastered = all.filter((p) => p.masteryLevel >= 4);
  const due = dueWordCount(vocabProgress);
  const newThisWeek = all.filter((p) => p.lastReviewedAt && days.includes(p.lastReviewedAt.slice(0, 10)) && p.correctCount + p.incorrectCount <= 2).length;
  const hardest = all.filter((p) => p.incorrectCount > 0).sort((a, b) => b.incorrectCount - a.incorrectCount).slice(0, 8);
  const completed = Object.values(lessonProgress).filter((l) => l.status === "completed");
  const maxDay = Math.max(1, ...days.map((d) => stats.secondsByDay[d] ?? 0));

  const fmt = (s: number) => (s < 60 ? `${s} שנ'` : `${Math.round(s / 60)} דק'`);

  return (
    <div className="space-y-4">
      <Card className="bg-amber-soft/50 border-amber/40 text-sm leading-relaxed">
        <p><span className="font-bold">שימו לב:</span> הנתונים כאן מתארים פעילות באפליקציה בלבד ואינם ציון או מדד רשמי לרמת האנגלית של {profile?.nickname}. רמת הפתיחה נקבעה באבחון קצר (רמה {placement.level}).</p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="זמן לימוד השבוע" value={fmt(weekSeconds)} icon="clock" />
        <Stat label="זמן לימוד כולל" value={fmt(totalSeconds)} icon="clock" />
        <Stat label="שיעורים שהושלמו" value={`${completed.length} / ${LESSONS.length}`} icon="book" />
        <Stat label="רצף ימים" value={`${stats.currentStreak} (שיא ${stats.longestStreak})`} icon="flame" />
      </div>

      <Card>
        <h3 className="font-extrabold mb-3">פעילות בשבעת הימים האחרונים</h3>
        <div className="flex items-end gap-2 h-28" role="img" aria-label="דקות לימוד לפי יום">
          {days.map((d) => {
            const sec = stats.secondsByDay[d] ?? 0;
            const h = Math.round((sec / maxDay) * 100);
            return (
              <div key={d} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[10px] text-ink-soft tabular-nums">{sec ? Math.max(1, Math.round(sec / 60)) : ""}</span>
                <div className={`w-full rounded-t-lg ${d === todayKey() ? "bg-brand" : "bg-sky"}`} style={{ height: `${Math.max(sec ? 6 : 2, h)}%` }} />
                <span className="text-xs font-bold text-ink-soft">{weekdayHe(d)}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="font-extrabold mb-3">אוצר מילים</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div><p className="text-2xl font-extrabold text-sky tabular-nums">{newThisWeek}</p><p className="text-xs text-ink-soft">חדשות השבוע</p></div>
          <div><p className="text-2xl font-extrabold text-mint tabular-nums">{mastered.length}</p><p className="text-xs text-ink-soft">בשליטה</p></div>
          <div><p className="text-2xl font-extrabold text-coral tabular-nums">{due}</p><p className="text-xs text-ink-soft">דורשות חזרה</p></div>
        </div>
        <p className="text-xs text-ink-soft mt-2">&quot;בשליטה&quot; = המילה נענתה נכון שוב ושוב, כולל איות או בנייה עצמאית, לא רק זיהוי.</p>
      </Card>

      <Card>
        <h3 className="font-extrabold mb-3">התקדמות לפי מיומנות</h3>
        <div className="space-y-3">
          {(Object.keys(SKILL_HE) as Skill[]).map((skill) => {
            const [c, t] = stats.skillCounts[skill] ?? [0, 0];
            const pct = t ? Math.round((c / t) * 100) : 0;
            return (
              <div key={skill}>
                <div className="flex justify-between text-sm mb-1"><span className="font-bold">{SKILL_HE[skill]}</span><span className="text-ink-soft tabular-nums">{t ? `${pct}% נכון · ${t} תרגילים` : "עדיין לא תורגל"}</span></div>
                <ProgressBar value={pct} max={100} color={pct >= 80 ? "bg-success" : pct >= 60 ? "bg-amber" : "bg-coral"} className="h-2" label={SKILL_HE[skill]} />
              </div>
            );
          })}
        </div>
      </Card>

      {hardest.length > 0 && (
        <Card>
          <h3 className="font-extrabold mb-2">מילים שהיו קשות</h3>
          <ul className="grid grid-cols-2 gap-2">
            {hardest.map((p) => {
              const v = VOCAB_BY_ID[p.vocabularyItemId];
              return v ? (
                <li key={p.vocabularyItemId} className="flex items-center justify-between rounded-xl bg-coral-soft/50 px-3 py-2 text-sm">
                  <span><span className="en font-bold">{v.word}</span> <span className="text-ink-soft">{v.translationHe}</span></span>
                  <span className="text-xs text-coral font-bold tabular-nums">{p.incorrectCount} טעויות</span>
                </li>
              ) : null;
            })}
          </ul>
        </Card>
      )}

      <Card>
        <h3 className="font-extrabold mb-2">יעדי למידה</h3>
        <div className="space-y-2 text-sm">
          <Row label="שיעורים השבוע" value={`${weekly.lessons} / 5`} />
          <Row label="תרגולי חזרה השבוע" value={`${weekly.reviews} / 3`} />
          <Row label="מילים חדשות בשליטה השבוע" value={`${weekly.words} / 10`} />
        </div>
        <div className="mt-4">
          <label className="text-sm font-bold block mb-1" htmlFor="goal">יעד יומי (XP)</label>
          <div className="flex gap-2">
            {[20, 40, 60, 100].map((g) => (
              <button key={g} type="button" onClick={() => setDailyGoal(g)} aria-pressed={stats.dailyGoalXP === g} className={`flex-1 rounded-xl py-2 font-bold text-sm focus-ring ${stats.dailyGoalXP === g ? "bg-brand text-white" : "bg-brand-soft text-brand-deep"}`}>{g}</button>
            ))}
          </div>
          <p className="text-xs text-ink-soft mt-1">שיעור אחד ≈ 60–120 XP. יעד של 40 הוא כ-5–10 דקות ביום.</p>
        </div>
      </Card>

      <p className="text-xs text-ink-soft text-center">כל הנתונים נשמרים במכשיר הזה בלבד ואינם משותפים עם אף אחד. ניתן למחוק הכול במסך ההגדרות.</p>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: "clock" | "book" | "flame" }) {
  return (
    <Card className="flex items-center gap-3 py-3">
      <span className="h-10 w-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0"><Icon name={icon} size={20} /></span>
      <div><p className="text-xs text-ink-soft font-bold">{label}</p><p className="font-extrabold">{value}</p></div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span>{label}</span><span className="font-bold tabular-nums">{value}</span></div>;
}
