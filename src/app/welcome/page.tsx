"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { MASCOTS } from "@/content/mascots";
import type { Grade, Interest } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MascotAvatar } from "@/components/mascot/MascotAvatar";
import { ProgressBar } from "@/components/ui/ProgressBar";

const INTERESTS: { id: Interest; label: string }[] = [
  { id: "animals", label: "חיות" },
  { id: "football", label: "כדורגל" },
  { id: "music", label: "מוזיקה" },
  { id: "games", label: "משחקים" },
  { id: "food", label: "אוכל" },
  { id: "adventure", label: "הרפתקאות" },
  { id: "friends", label: "חברים" },
  { id: "art", label: "ציור ויצירה" },
  { id: "science", label: "מדע" },
  { id: "dance", label: "ריקוד" },
];

const STEPS = ["ברוכה הבאה", "שם", "כיתה", "תחומי עניין", "דמות מלווה", "איך לומדים"];

export default function WelcomePage() {
  const router = useRouter();
  const hydrated = useAppStore((s) => s.hydrated);
  const profile = useAppStore((s) => s.profile);
  const createProfile = useAppStore((s) => s.createProfile);
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [mascotId, setMascotId] = useState("pixi");

  useEffect(() => {
    if (hydrated && profile) router.replace("/");
  }, [hydrated, profile, router]);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    createProfile({ nickname: nickname.trim() || "חברה", grade: grade ?? "other", interests, mascotId });
    router.push("/placement");
  };

  return (
    <div className="min-h-dvh flex flex-col py-4">
      {step > 0 && (
        <div className="flex items-center gap-3 mb-6">
          <button type="button" onClick={back} aria-label="חזרה" className="h-10 w-10 rounded-xl flex items-center justify-center text-ink-soft hover:bg-line focus-ring">
            <Icon name="chevron" className="rotate-180" />
          </button>
          <ProgressBar value={step} max={STEPS.length - 1} className="flex-1" label="שלבי ההרשמה" />
        </div>
      )}

      {step === 0 && (
        <section className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-brand/15 blur-2xl scale-125" />
            <MascotAvatar mascotId="pixi" mood="cheer" size={180} className="relative anim-float" />
          </div>
          <div>
            <p className="en text-brand font-extrabold tracking-wide text-sm mb-1">ENGLISHQUEST ISRAEL</p>
            <h1 className="text-4xl font-extrabold leading-tight">לומדים אנגלית<br />כמו במשחק</h1>
            <p className="text-ink-soft mt-3 max-w-xs mx-auto">מסלול אישי, שמע לכל מילה, ודמות מלווה שמסבירה הכול בעברית. בלי הרשמה, ישר מתחילים.</p>
          </div>
          <Button size="lg" onClick={next} className="max-w-xs">
            יאללה, מתחילים <Icon name="arrow" className="rotate-180" />
          </Button>
          <p className="text-xs text-ink-soft">הכול נשמר רק על המכשיר הזה. בלי חשבון, בלי פרסומות.</p>
        </section>
      )}

      {step === 1 && (
        <section className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold">איך לקרוא לך?</h1>
          <p className="text-ink-soft">כינוי או שם פרטי, בלי שם משפחה.</p>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value.slice(0, 20))}
            placeholder="למשל: אלמה"
            autoFocus
            aria-label="כינוי"
            className="text-2xl font-bold rounded-2xl border-2 border-line bg-card px-4 py-4 focus-ring focus:border-brand"
          />
          <Button size="lg" onClick={next} disabled={!nickname.trim()}>המשך</Button>
        </section>
      )}

      {step === 2 && (
        <section className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold">באיזו כיתה את?</h1>
          <div className="grid grid-cols-2 gap-3">
            {([4, 5, 6, "other"] as Grade[]).map((g) => (
              <button key={String(g)} type="button" onClick={() => setGrade(g)} aria-pressed={grade === g} className={`rounded-2xl border-2 px-4 py-5 text-xl font-bold focus-ring ${grade === g ? "border-brand bg-brand-soft" : "border-line bg-card"}`}>
                {g === 4 ? "כיתה ד'" : g === 5 ? "כיתה ה'" : g === 6 ? "כיתה ו'" : "אחר"}
              </button>
            ))}
          </div>
          <Button size="lg" onClick={next} disabled={grade === null}>המשך</Button>
        </section>
      )}

      {step === 3 && (
        <section className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold">מה מעניין אותך?</h1>
          <p className="text-ink-soft">בחרי כמה שבא לך. זה עוזר לנו לבחור דוגמאות.</p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((it) => {
              const on = interests.includes(it.id);
              return (
                <button key={it.id} type="button" aria-pressed={on} onClick={() => setInterests((prev) => (on ? prev.filter((x) => x !== it.id) : [...prev, it.id]))} className={`rounded-full border-2 px-4 py-2.5 font-bold focus-ring ${on ? "border-brand bg-brand text-white" : "border-line bg-card"}`}>
                  {it.label}
                </button>
              );
            })}
          </div>
          <Button size="lg" onClick={next}>המשך</Button>
        </section>
      )}

      {step === 4 && (
        <section className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold">מי ילווה אותך?</h1>
          <div className="grid gap-3">
            {MASCOTS.map((m) => (
              <button key={m.id} type="button" onClick={() => setMascotId(m.id)} aria-pressed={mascotId === m.id} className={`flex items-center gap-4 rounded-2xl border-2 p-3 text-right focus-ring ${mascotId === m.id ? "border-brand bg-brand-soft" : "border-line bg-card"}`}>
                <MascotAvatar mascotId={m.id} size={72} mood={mascotId === m.id ? "cheer" : "happy"} />
                <div>
                  <p className="text-xl font-extrabold">{m.nameHe} <span className="en text-ink-soft text-sm">{m.nameEn}</span></p>
                  <p className="text-ink-soft text-sm">{m.descriptionHe}</p>
                </div>
              </button>
            ))}
          </div>
          <Button size="lg" onClick={next}>המשך</Button>
        </section>
      )}

      {step === 5 && (
        <section className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold">איך לומדים כאן?</h1>
          <ul className="space-y-3">
            {[
              { icon: "map" as const, text: "המסלול מחולק לעולמות ושיעורים קצרים של כמה דקות." },
              { icon: "speaker" as const, text: "כל מילה ומשפט אפשר לשמוע, גם לאט. אין צורך לדעת לקרוא אנגלית מראש." },
              { icon: "bulb" as const, text: "טעות? מקבלים הסבר בעברית ועוד ניסיון. ככה לומדים." },
              { icon: "repeat" as const, text: "מילים קשות חוזרות בדיוק בזמן הנכון כדי שלא נשכח אותן." },
              { icon: "star" as const, text: "צוברים נקודות, מטבעות והישגים, ופותחים עולמות חדשים." },
            ].map((row, i) => (
              <li key={i} className="flex items-start gap-3 bg-card border border-line rounded-2xl p-3">
                <span className="h-10 w-10 shrink-0 rounded-xl bg-brand-soft text-brand flex items-center justify-center"><Icon name={row.icon} /></span>
                <p className="font-medium leading-relaxed">{row.text}</p>
              </li>
            ))}
          </ul>
          <p className="text-ink-soft text-sm">עכשיו אבחון קצר של 3–5 דקות, כדי שנתחיל בדיוק ברמה שלך. לא ציון, רק נקודת פתיחה.</p>
          <Button size="lg" onClick={finish}>לאבחון הקצר <Icon name="arrow" className="rotate-180" /></Button>
        </section>
      )}
    </div>
  );
}
