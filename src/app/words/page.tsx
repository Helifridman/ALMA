"use client";

import { useMemo, useState } from "react";
import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore } from "@/lib/store";
import { VOCABULARY } from "@/content";
import { masteryLabelHe } from "@/lib/srs";
import { PageHeader } from "@/components/layout/PageHeader";
import { AudioButton } from "@/components/exercises/AudioButton";
import { Picture } from "@/components/exercises/Picture";

type Filter = "learned" | "all" | "weak" | "mastered";

export default function WordsPage() {
  const ready = useRequireProfile();
  const vocabProgress = useAppStore((s) => s.vocabProgress);
  const showHint = useAppStore((s) => s.settings.showTransliteration);
  const [filter, setFilter] = useState<Filter>("learned");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const list = VOCABULARY.filter((v) => {
      const p = vocabProgress[v.id];
      if (filter === "learned") return Boolean(p);
      if (filter === "weak") return p && p.masteryLevel <= 1;
      if (filter === "mastered") return p && p.masteryLevel >= 4;
      return true;
    });
    const needle = q.trim().toLowerCase();
    return needle ? list.filter((v) => v.word.toLowerCase().includes(needle) || v.translationHe.includes(needle)) : list;
  }, [filter, q, vocabProgress]);

  if (!ready) return null;

  return (
    <div>
      <PageHeader title="המילים שלי" subtitle={`${Object.keys(vocabProgress).length} מילים נלמדו מתוך ${VOCABULARY.length}`} backHref="/" />
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש מילה באנגלית או בעברית" aria-label="חיפוש" className="w-full rounded-2xl border-2 border-line bg-card px-4 py-3 mb-3 focus-ring focus:border-brand" />
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1" role="tablist">
        {([["learned", "נלמדו"], ["weak", "לחיזוק"], ["mastered", "בשליטה"], ["all", "כל המילון"]] as [Filter, string][]).map(([f, label]) => (
          <button key={f} role="tab" aria-selected={filter === f} type="button" onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap focus-ring ${filter === f ? "bg-brand text-white" : "bg-card border border-line"}`}>
            {label}
          </button>
        ))}
      </div>
      {rows.length === 0 ? (
        <p className="text-center text-ink-soft py-10">אין מילים להצגה כאן עדיין.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((v) => {
            const p = vocabProgress[v.id];
            return (
              <li key={v.id} className="flex items-center gap-3 bg-card border border-line rounded-2xl p-3">
                <Picture vocabId={v.id} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="en font-extrabold text-lg">{v.word}</p>
                  <p className="text-sm text-ink-soft">{v.translationHe}{showHint && v.pronunciationHint ? ` · ${v.pronunciationHint}` : ""}</p>
                  <p className="en text-xs text-ink-soft truncate">{v.exampleEn}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <AudioButton text={v.word} audioUrl={v.audioUrl} size="sm" />
                  <span className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${!p ? "bg-line text-ink-soft" : p.masteryLevel >= 4 ? "bg-success-soft text-emerald-700" : p.masteryLevel <= 1 ? "bg-coral-soft text-coral" : "bg-sky-soft text-sky-700"}`}>
                    {p ? masteryLabelHe(p.masteryLevel) : "לא נלמדה"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
