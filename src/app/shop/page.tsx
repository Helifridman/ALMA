"use client";

import { useState } from "react";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore } from "@/lib/store";
import { SHOP_ITEMS } from "@/content/mascots";
import { PageHeader } from "@/components/layout/PageHeader";
import { MascotAvatar } from "@/components/mascot/MascotAvatar";
import { Pill } from "@/components/ui/Pill";
import { Icon } from "@/components/ui/Icon";

const KIND_HE = { hat: "כובעים", glasses: "משקפיים", scarf: "צעיפים", background: "רקעים" } as const;

export default function ShopPage() {
  const ready = useRequireProfile();
  const coins = useAppStore((s) => s.stats.coins);
  const owned = useAppStore((s) => s.ownedCosmetics);
  const equipped = useAppStore((s) => s.equipped);
  const buy = useAppStore((s) => s.buyCosmetic);
  const equip = useAppStore((s) => s.equipCosmetic);
  const mascotId = useAppStore((s) => s.profile?.mascotId ?? "pixi");
  const [msg, setMsg] = useState<string | null>(null);
  if (!ready) return null;

  const bgClass = equipped.background === "bg-stars" ? "bg-gradient-to-b from-indigo-900 to-violet-700" : equipped.background === "bg-beach" ? "bg-gradient-to-b from-sky-soft to-amber-soft" : "bg-brand-soft/50";

  return (
    <div>
      <PageHeader title="החנות" subtitle="מטבעות שצברת בלמידה קונים אביזרים לדמות" backHref="/" />
      <div className={`rounded-3xl ${bgClass} p-6 flex flex-col items-center gap-2 mb-4`}>
        <MascotAvatar mascotId={mascotId} mood="cheer" size={150} equipped={equipped} />
        <Pill icon="coin" tone="amber">{coins} מטבעות</Pill>
      </div>
      {msg && <p role="status" className="text-center text-sm font-bold text-brand mb-3">{msg}</p>}
      {(["hat", "glasses", "scarf", "background"] as const).map((kind) => (
        <section key={kind} className="mb-5">
          <h2 className="font-extrabold mb-2">{KIND_HE[kind]}</h2>
          <ul className="grid grid-cols-2 gap-3">
            {SHOP_ITEMS.filter((i) => i.kind === kind).map((item) => {
              const has = owned.includes(item.id);
              const on = equipped[kind] === item.id;
              return (
                <li key={item.id} className={`rounded-2xl border-2 bg-card p-3 flex flex-col gap-2 ${on ? "border-brand" : "border-line"}`}>
                  <div className="flex justify-center"><MascotAvatar mascotId={mascotId} size={72} equipped={{ [kind]: item.id }} /></div>
                  <p className="font-extrabold text-center">{item.nameHe}</p>
                  {has ? (
                    <button type="button" onClick={() => { equip(on ? null : item.id, kind); }} className={`rounded-xl py-2 text-sm font-bold focus-ring ${on ? "bg-brand text-white" : "bg-brand-soft text-brand-deep"}`}>
                      {on ? "לובשת" : "ללבוש"}
                    </button>
                  ) : (
                    <button type="button" disabled={coins < item.price} onClick={() => { const ok = buy(item.id); setMsg(ok ? `קנית ${item.nameHe}!` : "אין מספיק מטבעות עדיין."); }} className="rounded-xl py-2 text-sm font-bold bg-amber-soft text-amber-800 focus-ring disabled:opacity-50 flex items-center justify-center gap-1">
                      <Icon name="coin" size={16} /> {item.price}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
