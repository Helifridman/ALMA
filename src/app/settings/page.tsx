"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore, STORAGE_KEY } from "@/lib/store";
import { MASCOTS } from "@/content/mascots";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MascotAvatar } from "@/components/mascot/MascotAvatar";
import { AudioButton } from "@/components/exercises/AudioButton";
import { Icon } from "@/components/ui/Icon";

export default function SettingsPage() {
  const ready = useRequireProfile();
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const settings = useAppStore((s) => s.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const resetAll = useAppStore((s) => s.resetAll);
  const [nickname, setNickname] = useState(profile?.nickname ?? "");
  const [pin, setPin] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  if (!ready || !profile) return null;

  const Toggle = ({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center gap-3 py-2 cursor-pointer">
      <div className="flex-1"><p className="font-bold">{label}</p>{desc && <p className="text-xs text-ink-soft">{desc}</p>}</div>
      <button type="button" role="switch" aria-checked={value} aria-label={label} onClick={() => onChange(!value)} className={`relative h-8 w-14 rounded-full transition-colors focus-ring ${value ? "bg-brand" : "bg-line"}`}>
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${value ? "right-1" : "right-7"}`} />
      </button>
    </label>
  );

  return (
    <div className="space-y-4">
      <PageHeader title="הגדרות" backHref="/" />

      <Card>
        <h2 className="font-extrabold mb-2">הפרופיל שלי</h2>
        <label className="text-sm font-bold block mb-1" htmlFor="nick">כינוי</label>
        <div className="flex gap-2">
          <input id="nick" value={nickname} onChange={(e) => setNickname(e.target.value.slice(0, 20))} className="flex-1 rounded-xl border-2 border-line px-3 py-2 font-bold focus-ring focus:border-brand" />
          <Button variant="secondary" onClick={() => updateProfile({ nickname: nickname.trim() || profile.nickname })} disabled={!nickname.trim() || nickname.trim() === profile.nickname}>שמירה</Button>
        </div>
        <p className="text-sm font-bold mt-4 mb-2">דמות מלווה</p>
        <div className="grid grid-cols-3 gap-2">
          {MASCOTS.map((m) => (
            <button key={m.id} type="button" onClick={() => updateProfile({ mascotId: m.id })} aria-pressed={profile.mascotId === m.id} className={`rounded-2xl border-2 p-2 flex flex-col items-center focus-ring ${profile.mascotId === m.id ? "border-brand bg-brand-soft" : "border-line"}`}>
              <MascotAvatar mascotId={m.id} size={56} />
              <span className="text-sm font-bold">{m.nameHe}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-extrabold mb-1">שמע</h2>
        <Toggle label="צלילים והשמעה אוטומטית" value={settings.soundOn} onChange={(v) => updateSettings({ soundOn: v })} />
        <div className="py-2">
          <div className="flex justify-between text-sm mb-1"><span className="font-bold">מהירות הדיבור</span><span className="text-ink-soft tabular-nums">{settings.ttsRate.toFixed(1)}</span></div>
          <input type="range" min={0.5} max={1.2} step={0.1} value={settings.ttsRate} onChange={(e) => updateSettings({ ttsRate: Number(e.target.value) })} aria-label="מהירות הדיבור" className="w-full accent-brand" dir="ltr" />
          <div className="mt-2 flex items-center gap-2 text-sm"><AudioButton text="Hello! My name is Pixi. Nice to meet you." size="sm" /> בדיקת קול</div>
        </div>
        <Toggle label="תעתיק עברי ליד מילים" desc="עזר זמני להגייה, מומלץ לכבות עם הזמן" value={settings.showTransliteration} onChange={(v) => updateSettings({ showTransliteration: v })} />
      </Card>

      <Card>
        <h2 className="font-extrabold mb-1">נגישות</h2>
        <Toggle label="הפחתת תנועה" desc="מבטל אנימציות וקונפטי" value={settings.reduceMotion} onChange={(v) => updateSettings({ reduceMotion: v })} />
        <Toggle label="כפתור רמז בתרגילים" value={settings.showHints} onChange={(v) => updateSettings({ showHints: v })} />
      </Card>

      <Card>
        <h2 className="font-extrabold mb-1">קוד הורים</h2>
        <p className="text-xs text-ink-soft mb-2">{settings.parentPin ? "קוד הורים מוגדר. אפשר להחליף או להסיר." : "ללא קוד, אזור ההורים נפתח עם תרגיל חשבון פשוט."}</p>
        <div className="flex gap-2">
          <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="4–6 ספרות" aria-label="קוד הורים" className="en flex-1 rounded-xl border-2 border-line px-3 py-2 font-bold focus-ring focus:border-brand" />
          <Button variant="secondary" disabled={pin.length < 4} onClick={() => { updateSettings({ parentPin: pin }); setPin(""); }}>שמירה</Button>
          {settings.parentPin && <Button variant="ghost" onClick={() => updateSettings({ parentPin: null })}>הסרה</Button>}
        </div>
      </Card>

      <Card className="border-danger/40">
        <h2 className="font-extrabold mb-1 flex items-center gap-2"><Icon name="trash" size={18} className="text-danger" /> מחיקת כל הנתונים</h2>
        <p className="text-xs text-ink-soft mb-3">מוחק את הפרופיל, ההתקדמות, המילים וההישגים מהמכשיר הזה. אי אפשר לשחזר.</p>
        {confirmDelete ? (
          <div className="flex gap-2">
            <Button variant="danger" onClick={() => { resetAll(); try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ } router.replace("/welcome"); }}>כן, למחוק הכול</Button>
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>ביטול</Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setConfirmDelete(true)}>מחיקת הנתונים שלי</Button>
        )}
      </Card>

      <p className="text-xs text-ink-soft text-center">EnglishQuest Israel · גרסה 0.1 · הכול נשמר במכשיר בלבד</p>
    </div>
  );
}
