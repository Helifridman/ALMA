"use client";

import { useRequireProfile } from "@/hooks/useRequireProfile";
import { useAppStore, dueWordCount } from "@/lib/store";
import { VOCAB_BY_ID } from "@/content";
import { isDue, masteryLabelHe } from "@/lib/srs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MascotBubble } from "@/components/mascot/MascotBubble";
import { Picture } from "@/components/exercises/Picture";

export default function ReviewPage() {
  const ready = useRequireProfile();
  const vocabProgress = useAppStore((s) => s.vocabProgress);
  if (!ready) return null;
  const all = Object.values(vocabProgress);
  const due = dueWordCount(vocabProgress);
  const weakest = all.filter((p) => isDue(p)).sort((a, b) => a.masteryLevel - b.masteryLevel).slice(0, 6);

  return (
    <div className="space-y-5">
      <PageHeader title="חזרה חכמה" subtitle="המילים חוזרות בדיוק כשהן עומדות להישכח" action={{ href: "/words", icon: "book", label: "כל המילים" }} />
      <MascotBubble text={all.length === 0 ? "עוד אין מילים לחזור עליהן. נתחיל בשיעור ראשון, ואז נחזור לכאן." : due > 0 ? `${due} מילים מחכות לך. סיבוב של 10 שאלות לוקח כשלוש דקות.` : "כל המילים שלך מעודכנות! אפשר לתרגל בכל זאת לחיזוק."} mood={due > 0 ? "think" : "happy"} />

      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center py-3"><p className="text-2xl font-extrabold text-coral tabular-nums">{due}</p><p className="text-xs font-bold text-ink-soft">לחזרה</p></Card>
        <Card className="text-center py-3"><p className="text-2xl font-extrabold text-sky tabular-nums">{all.length}</p><p className="text-xs font-bold text-ink-soft">נלמדו</p></Card>
        <Card className="text-center py-3"><p className="text-2xl font-extrabold text-mint tabular-nums">{all.filter((p) => p.masteryLevel >= 4).length}</p><p className="text-xs font-bold text-ink-soft">בשליטה</p></Card>
      </div>

      {all.length > 0 ? (
        <Button href="/review/session" size="lg"><Icon name="repeat" /> {due > 0 ? "מתחילים חזרה" : "תרגול חיזוק"}</Button>
      ) : (
        <Button href="/learn" size="lg"><Icon name="map" /> למסלול הלמידה</Button>
      )}

      {weakest.length > 0 && (
        <Card>
          <h3 className="font-extrabold mb-2">מילים שכדאי לחזק</h3>
          <ul className="space-y-2">
            {weakest.map((p) => {
              const v = VOCAB_BY_ID[p.vocabularyItemId];
              if (!v) return null;
              return (
                <li key={p.vocabularyItemId} className="flex items-center gap-3">
                  <Picture vocabId={v.id} size="sm" />
                  <div className="flex-1 min-w-0"><p className="en font-bold">{v.word}</p><p className="text-xs text-ink-soft">{v.translationHe}</p></div>
                  <span className="text-xs font-bold bg-line rounded-full px-2 py-1">{masteryLabelHe(p.masteryLevel)}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}
