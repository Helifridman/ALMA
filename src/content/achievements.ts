import type { Achievement } from "@/lib/types";

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-steps", titleHe: "צעדים ראשונים", descriptionHe: "סיימת את האבחון הראשוני", icon: "key", criteria: { kind: "placement" } },
  { id: "first-lesson", titleHe: "שיעור ראשון!", descriptionHe: "השלמת שיעור אחד", icon: "star", criteria: { kind: "lessons", count: 1 } },
  { id: "five-lessons", titleHe: "בדרך הנכונה", descriptionHe: "השלמת 5 שיעורים", icon: "book", criteria: { kind: "lessons", count: 5 } },
  { id: "ten-lessons", titleHe: "לומדת רצינית", descriptionHe: "השלמת 10 שיעורים", icon: "trophy", criteria: { kind: "lessons", count: 10 } },
  { id: "twenty-lessons", titleHe: "מכונת למידה", descriptionHe: "השלמת 20 שיעורים", icon: "crown", criteria: { kind: "lessons", count: 20 } },
  { id: "perfect", titleHe: "שיעור מושלם", descriptionHe: "ענית נכון על כל השאלות בניסיון הראשון", icon: "zap", criteria: { kind: "perfect-lesson" } },
  { id: "streak-3", titleHe: "שלושה ימים ברצף", descriptionHe: "למדת 3 ימים ברציפות", icon: "flame", criteria: { kind: "streak", days: 3 } },
  { id: "streak-7", titleHe: "שבוע שלם!", descriptionHe: "למדת 7 ימים ברציפות", icon: "flame", criteria: { kind: "streak", days: 7 } },
  { id: "xp-100", titleHe: "100 נקודות", descriptionHe: "צברת 100 נקודות ניסיון", icon: "star", criteria: { kind: "xp", amount: 100 } },
  { id: "xp-500", titleHe: "500 נקודות", descriptionHe: "צברת 500 נקודות ניסיון", icon: "trophy", criteria: { kind: "xp", amount: 500 } },
  { id: "xp-1000", titleHe: "1000 נקודות", descriptionHe: "צברת 1000 נקודות ניסיון", icon: "crown", criteria: { kind: "xp", amount: 1000 } },
  { id: "words-10", titleHe: "10 מילים בכיס", descriptionHe: "שולטת ב-10 מילים", icon: "heart", criteria: { kind: "words-mastered", count: 10 } },
  { id: "words-50", titleHe: "אוצר מילים", descriptionHe: "שולטת ב-50 מילים", icon: "heart", criteria: { kind: "words-mastered", count: 50 } },
  { id: "review-1", titleHe: "חזרה ראשונה", descriptionHe: "סיימת תרגול חזרה אחד", icon: "book", criteria: { kind: "review-session", count: 1 } },
  { id: "review-10", titleHe: "זיכרון של פיל", descriptionHe: "סיימת 10 תרגולי חזרה", icon: "book", criteria: { kind: "review-session", count: 10 } },
  { id: "speller", titleHe: "מאייתת", descriptionHe: "איית נכון 20 מילים", icon: "pen", criteria: { kind: "spelling", count: 20 } },
  { id: "listener", titleHe: "אוזן טובה", descriptionHe: "ענית נכון על 30 תרגילי הקשבה", icon: "ear", criteria: { kind: "listening", count: 30 } },
  { id: "world-1", titleHe: "סיימת את עולם 1", descriptionHe: "כל האותיות והמילים הראשונות", icon: "trophy", criteria: { kind: "world-complete", worldId: "w1" } },
  { id: "world-2", titleHe: "סיימת את עולם 2", descriptionHe: "העולם שלי באנגלית", icon: "trophy", criteria: { kind: "world-complete", worldId: "w2" } },
  { id: "world-3", titleHe: "סיימת את עולם 3", descriptionHe: "את בונה משפטים!", icon: "trophy", criteria: { kind: "world-complete", worldId: "w3" } },
];

export const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a])) as Record<string, Achievement>;
