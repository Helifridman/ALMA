import type { CosmeticItem, Mascot } from "@/lib/types";

/** Original companion characters (drawn as inline SVG in src/components/mascot/MascotAvatar.tsx). */
export const MASCOTS: Mascot[] = [
  { id: "pixi", nameHe: "פיקסי", nameEn: "Pixi", descriptionHe: "שועלה סקרנית שאוהבת חידות ומילים חדשות", color: "#F97316", accent: "#FDE68A" },
  { id: "bumo", nameHe: "בומו", nameEn: "Bumo", descriptionHe: "ינשוף רגוע שתמיד יודע רמז טוב", color: "#8B5CF6", accent: "#C4B5FD" },
  { id: "zigi", nameHe: "זיגי", nameEn: "Zigi", descriptionHe: "רובוט קטן ואנרגטי שחוגג כל הצלחה", color: "#06B6D4", accent: "#A5F3FC" },
];

export const MASCOT_BY_ID = Object.fromEntries(MASCOTS.map((m) => [m.id, m])) as Record<string, Mascot>;

export const SHOP_ITEMS: CosmeticItem[] = [
  { id: "cap", nameHe: "כובע מצחייה", price: 30, kind: "hat" },
  { id: "crown", nameHe: "כתר", price: 80, kind: "hat" },
  { id: "party-hat", nameHe: "כובע מסיבה", price: 40, kind: "hat" },
  { id: "glasses", nameHe: "משקפיים", price: 25, kind: "glasses" },
  { id: "sunglasses", nameHe: "משקפי שמש", price: 45, kind: "glasses" },
  { id: "scarf", nameHe: "צעיף", price: 35, kind: "scarf" },
  { id: "bg-stars", nameHe: "רקע כוכבים", price: 50, kind: "background" },
  { id: "bg-beach", nameHe: "רקע חוף ים", price: 50, kind: "background" },
];

export const SHOP_BY_ID = Object.fromEntries(SHOP_ITEMS.map((s) => [s.id, s])) as Record<string, CosmeticItem>;

export interface MascotLine {
  greeting: string[];
  encourage: string[];
  wrong: string[];
  celebrate: string[];
  reviewNudge: string[];
  lessonStart: string[];
}

/** Short, natural Hebrew lines (feminine singular address, no baby talk). */
export const MASCOT_LINES: MascotLine = {
  greeting: ["היי! מוכנה לעוד קצת אנגלית?", "טוב לראות אותך! בואי נמשיך מאיפה שעצרנו.", "יום טוב ללמידה. נתחיל?"],
  encourage: ["כמעט! נסי שוב.", "עוד ניסיון אחד, את קרובה.", "לא נורא, ככה לומדים. נסי שוב."],
  wrong: ["הנה ההסבר. בפעם הבאה זה יהיה קל יותר.", "טעות היא חלק מהלמידה. נחזור על זה בהמשך.", "שימי לב להסבר, ונבדוק שוב בקרוב."],
  celebrate: ["הצלחת! עכשיו ננסה לזהות את המילה גם כששומעים אותה.", "מעולה, את כבר זוכרת את המילה הזאת.", "יפה! עוד צעד קדימה.", "בדיוק! ממשיכות."],
  reviewNudge: ["יש מילים שמחכות לחזרה. חמש דקות והן שלך.", "כדאי לחזור על כמה מילים היום כדי שלא נשכח אותן."],
  lessonStart: ["בשיעור הזה נלמד משהו חדש. קחי את הזמן.", "קודם מכירים, אחר כך מתרגלים. יאללה."],
};

export function pickLine(kind: keyof MascotLine, seed = Math.random()): string {
  const arr = MASCOT_LINES[kind];
  return arr[Math.floor(seed * arr.length) % arr.length];
}
