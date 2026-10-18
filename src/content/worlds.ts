import type { Unit, World } from "@/lib/types";

export const WORLDS: World[] = [
  { id: "w1", order: 1, level: 0, titleHe: "התחלה באנגלית", titleEn: "English Starter", descriptionHe: "אותיות, צלילים ומילים ראשונות", color: "sky", icon: "letters" },
  { id: "w2", order: 2, level: 1, titleHe: "העולם שלי", titleEn: "My World", descriptionHe: "משפחה, בית, בית ספר, צבעים, אוכל וחיות", color: "mint", icon: "world" },
  { id: "w3", order: 3, level: 2, titleHe: "בונים משפט", titleEn: "Build a Sentence", descriptionHe: "כינויי גוף, הפועל to be, שאלות ושלילה", color: "violet", icon: "sentence" },
  { id: "w4", order: 4, level: 2, titleHe: "מדברים!", titleEn: "Speak Up", descriptionHe: "ברכות, היכרות, בקשות ושיחות קצרות", color: "coral", icon: "speak" },
  { id: "w5", order: 5, level: 3, titleHe: "הרפתקאות קריאה", titleEn: "Reading Adventures", descriptionHe: "משפטים, טקסטים קצרים וסיפורים עם שמע", color: "amber", icon: "book" },
  { id: "w6", order: 6, level: 3, titleHe: "מעבדת הדקדוק", titleEn: "Grammar Lab", descriptionHe: "זמנים, פעלים נפוצים וסדר מילים", color: "rose", icon: "lab" },
];

export const UNITS: Unit[] = [
  // World 1
  { id: "w1u1", worldId: "w1", order: 1, titleHe: "האותיות", titleEn: "The Alphabet" },
  { id: "w1u2", worldId: "w1", order: 2, titleHe: "צלילים ומילים ראשונות", titleEn: "Sounds & First Words" },
  // World 2
  { id: "w2u1", worldId: "w2", order: 1, titleHe: "משפחה ובית", titleEn: "Family & Home" },
  { id: "w2u2", worldId: "w2", order: 2, titleHe: "בית ספר, צבעים ומספרים", titleEn: "School, Colors & Numbers" },
  { id: "w2u3", worldId: "w2", order: 3, titleHe: "אוכל, חיות וחפצים", titleEn: "Food, Animals & Things" },
  // World 3
  { id: "w3u1", worldId: "w3", order: 1, titleHe: "אני, אתה, הוא, היא", titleEn: "Pronouns & to be" },
  { id: "w3u2", worldId: "w3", order: 2, titleHe: "שאלות, שלילה וכמויות", titleEn: "Questions, Negatives & Plurals" },
  // World 4
  { id: "w4u1", worldId: "w4", order: 1, titleHe: "נעים להכיר", titleEn: "Nice to Meet You" },
  { id: "w4u2", worldId: "w4", order: 2, titleHe: "בחוץ ובחנות", titleEn: "Out and About" },
  // World 5
  { id: "w5u1", worldId: "w5", order: 1, titleHe: "משפטים וטקסטים קצרים", titleEn: "Short Texts" },
  { id: "w5u2", worldId: "w5", order: 2, titleHe: "סיפורים", titleEn: "Stories" },
  // World 6
  { id: "w6u1", worldId: "w6", order: 1, titleHe: "הווה", titleEn: "Present Tenses" },
  { id: "w6u2", worldId: "w6", order: 2, titleHe: "עבר וסדר מילים", titleEn: "Past & Word Order" },
];

export const WORLD_BY_ID = Object.fromEntries(WORLDS.map((w) => [w.id, w])) as Record<string, World>;
export const UNIT_BY_ID = Object.fromEntries(UNITS.map((u) => [u.id, u])) as Record<string, Unit>;
