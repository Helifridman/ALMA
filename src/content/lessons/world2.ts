import { defineLesson } from "../builders";
import type { Lesson } from "@/lib/types";

/**
 * World 2 – My World (level 1).
 * Family, home, school, colors & numbers, food, animals & everyday things.
 * Each lesson moves from recognition (pictures, translations, listening)
 * to production (missing letters, spelling, fill-in, sentence building)
 * and ends with a short read-aloud.
 */

const l1 = defineLesson({
  id: "w2-l1",
  titleHe: "המשפחה שלי",
  titleEn: "My Family",
  worldId: "w2",
  unitId: "w2u1",
  order: 1,
  level: 1,
  learningObjectives: ["לזהות את בני המשפחה באנגלית", "לכתוב את המילים family ו-baby", "להגיד משפט קצר על המשפחה"],
  vocabIds: ["mother", "father", "sister", "brother", "grandmother", "grandfather", "baby", "family"],
  intro: {
    titleHe: "מי במשפחה?",
    bodyHe: "בשיעור הזה נכיר את בני המשפחה באנגלית. שימי לב: grandmother ו-grandfather מתחילות ב-grand, וזה בדיוק כמו 'סבתא' ו'סבא'. כשמדברים על המשפחה שלי אומרים my: my mother, my father.",
    examples: [
      { en: "mother", he: "אמא" },
      { en: "father", he: "אבא" },
      { en: "sister", he: "אחות" },
      { en: "brother", he: "אח" },
      { en: "This is my family.", he: "זאת המשפחה שלי." },
    ],
  },
  exercises: (ex) => [
    ex.wordToImage({ vocabId: "mother", options: ["mother", "father", "sister", "baby"] }, { explanationHe: "mother = אמא. father = אבא.", hintsHe: ["המילה מתחילה ב-m, כמו... mom!"] }),
    ex.wordToImage({ vocabId: "father", options: ["father", "grandfather", "brother", "mother"] }, { explanationHe: "father = אבא. grandfather = סבא, זה אבא של אבא או של אמא." }),
    ex.chooseTranslation({ questionEn: "sister", options: ["אחות", "אח", "אמא", "סבתא"], correct: "אחות" }, { explanationHe: "sister = אחות. brother = אח.", vocabIds: ["sister"], hintsHe: ["sister היא ילדה."] }),
    ex.chooseTranslation({ questionEn: "brother", options: ["אח", "אבא", "אחות", "סבא"], correct: "אח" }, { explanationHe: "brother = אח. sister = אחות.", vocabIds: ["brother"] }),
    ex.listenChooseImage({ audioText: "grandmother", options: ["grandmother", "grandfather", "mother", "baby"], correct: "grandmother" }, { explanationHe: "שמעת grandmother (סבתא). המילה מסתיימת ב-mother, כמו אמא.", hintsHe: ["הקשיבי לסוף המילה: mother או father?"] }),
    ex.wordToImage({ vocabId: "baby", options: ["baby", "sister", "brother", "grandfather"] }, { explanationHe: "baby = תינוק." }),
    ex.chooseWord({ questionHe: "סבא", pictureVocabId: "grandfather", options: ["grandfather", "grandmother", "father", "brother"], correct: "grandfather" }, { explanationHe: "סבא = grandfather. סבתא = grandmother.", vocabIds: ["grandfather"], hintsHe: ["המילה מתחילה ב-grand ומסתיימת ב-father."] }),
    ex.matchPairs({ pairs: [{ en: "mother", he: "אמא" }, { en: "father", he: "אבא" }, { en: "sister", he: "אחות" }, { en: "brother", he: "אח" }] }, { explanationHe: "mother = אמא, father = אבא, sister = אחות, brother = אח.", vocabIds: ["mother", "father", "sister", "brother"] }),
    ex.missingLetter({ word: "family", missingIndex: 0, options: ["f", "p", "v", "m"], vocabId: "family" }, { explanationHe: "family (משפחה) מתחילה באות f. הצליל 'פ' רפה נכתב ב-f.", hintsHe: ["הצליל הראשון הוא 'פֶ' רכה, כמו ב-fish."] }),
    ex.spellWord({ word: "baby", vocabId: "baby", meaningHe: "תינוק", tiles: ["b", "a", "b", "y", "e", "d"] }, { explanationHe: "תינוק = baby. האותיות: b, a, b, y. יש שתי b במילה.", hintsHe: ["המילה מתחילה ב-b.", "הצליל 'אִי' בסוף נכתב ב-y."], difficulty: 2 }),
    ex.fillBlank({ sentence: "This is my ___.", translationHe: "זאת אמא שלי.", bank: ["mother", "father", "sister"], correct: "mother" }, { explanationHe: "אמא = mother. המשפט: This is my mother.", vocabIds: ["mother"] }),
    ex.sentenceBuilder({ sentence: "I love my family.", translationHe: "אני אוהבת את המשפחה שלי.", extraWords: ["dog", "is"] }, { explanationHe: "מתחילים ב-I (אני), אחר כך love (אוהבת), ואז my family (המשפחה שלי).", vocabIds: ["family"], hintsHe: ["המילה הראשונה היא I.", "my באה לפני family."], difficulty: 2 }),
    ex.readRecord({ text: "This is my mother and this is my father.", translationHe: "זאת אמא שלי וזה אבא שלי." }, { explanationHe: "קראי לאט: This is my mother, and this is my father. ה-th ב-this נשמע כמו 'ד' רכה.", vocabIds: ["mother", "father"] }),
  ],
});

const l2 = defineLesson({
  id: "w2-l2",
  titleHe: "הבית שלי",
  titleEn: "My Home",
  worldId: "w2",
  unitId: "w2u1",
  order: 2,
  level: 1,
  learningObjectives: ["לזהות 10 מילים של הבית והחדר", "לאיית bed ו-key", "להשלים משפט על חפצים בבית"],
  vocabIds: ["house", "door", "window", "bed", "table", "chair", "kitchen", "room", "key", "lamp"],
  intro: {
    titleHe: "מה יש בבית?",
    bodyHe: "נטייל בבית ונלמד איך קוראים לחדרים ולחפצים באנגלית. שימי לב: house הוא הבית כולו, ו-room הוא חדר אחד בתוכו.",
    examples: [
      { en: "house", he: "בית" },
      { en: "room", he: "חדר" },
      { en: "door", he: "דלת" },
      { en: "window", he: "חלון" },
      { en: "This is my room.", he: "זה החדר שלי." },
    ],
  },
  exercises: (ex) => [
    ex.wordToImage({ vocabId: "house", options: ["house", "door", "window", "bed"] }, { explanationHe: "house = בית.", hintsHe: ["המילה מתחילה ב-h ונשמעת 'הַאוּס'."] }),
    ex.wordToImage({ vocabId: "door", options: ["door", "window", "key", "lamp"] }, { explanationHe: "door = דלת. window = חלון." }),
    ex.chooseTranslation({ questionEn: "window", options: ["חלון", "דלת", "חדר", "מיטה"], correct: "חלון" }, { explanationHe: "window = חלון. door = דלת.", vocabIds: ["window"], hintsHe: ["דרך זה רואים החוצה."] }),
    ex.listenChooseImage({ audioText: "bed", options: ["bed", "table", "chair", "lamp"], correct: "bed" }, { explanationHe: "שמעת bed (מיטה). המילה קצרה ונשמעת 'בֶּד'." }),
    ex.chooseTranslation({ questionEn: "kitchen", options: ["מטבח", "חדר", "בית", "שולחן"], correct: "מטבח" }, { explanationHe: "kitchen = מטבח. שם מבשלים.", vocabIds: ["kitchen"], hintsHe: ["המילה נשמעת 'קִיצֶ'ן'."] }),
    ex.chooseWord({ questionHe: "כיסא", pictureVocabId: "chair", options: ["chair", "table", "bed", "door"], correct: "chair" }, { explanationHe: "כיסא = chair. שולחן = table.", vocabIds: ["chair"] }),
    ex.matchPairs({ pairs: [{ en: "table", he: "שולחן" }, { en: "room", he: "חדר" }, { en: "key", he: "מפתח" }, { en: "lamp", he: "מנורה" }] }, { explanationHe: "table = שולחן, room = חדר, key = מפתח, lamp = מנורה.", vocabIds: ["table", "room", "key", "lamp"] }),
    ex.missingLetter({ word: "door", missingIndex: 1, options: ["o", "a", "u", "e"], vocabId: "door" }, { explanationHe: "door (דלת) נכתבת עם שתי o: d-o-o-r.", hintsHe: ["יש שתי אותיות זהות באמצע המילה."] }),
    ex.spellWord({ word: "bed", vocabId: "bed", meaningHe: "מיטה", tiles: ["b", "e", "d", "a", "t"] }, { explanationHe: "מיטה = bed. האותיות: b, e, d.", hintsHe: ["מתחיל ב-b.", "הצליל 'אֶ' באמצע נכתב ב-e."] }),
    ex.spellWord({ word: "key", vocabId: "key", meaningHe: "מפתח", tiles: ["k", "e", "y", "c", "i"] }, { explanationHe: "מפתח = key. האותיות: k, e, y. הצליל 'אִי' בסוף נכתב ב-ey.", hintsHe: ["מתחיל ב-k, לא ב-c.", "המילה מסתיימת ב-y."], difficulty: 2 }),
    ex.fillBlank({ sentence: "The book is on the ___.", translationHe: "הספר על השולחן.", bank: ["table", "door", "bed", "window"], correct: "table" }, { explanationHe: "שולחן = table. המשפט: The book is on the table.", vocabIds: ["table"] }),
    ex.sentenceBuilder({ sentence: "This is my room.", translationHe: "זה החדר שלי.", extraWords: ["house", "a"] }, { explanationHe: "This is = זה, my room = החדר שלי. my באה תמיד לפני המילה שהיא שייכת אליה.", vocabIds: ["room"], hintsHe: ["מתחילים ב-This is.", "מה שלי? my room."], difficulty: 2 }),
    ex.readRecord({ text: "My house has a red door.", translationHe: "לבית שלי יש דלת אדומה." }, { explanationHe: "קראי: My house has a red door. באנגלית הצבע בא לפני החפץ: red door.", vocabIds: ["house", "door"] }),
  ],
});

const l3 = defineLesson({
  id: "w2-l3",
  titleHe: "בבית הספר",
  titleEn: "At School",
  worldId: "w2",
  unitId: "w2u2",
  order: 3,
  level: 1,
  learningObjectives: ["לזהות חפצים ואנשים בבית הספר", "להבחין בין pen ל-pencil", "לכתוב משפט על עצמי כתלמידה"],
  vocabIds: ["school", "book", "pen", "pencil", "bag", "teacher", "class", "desk", "student"],
  intro: {
    titleHe: "מה יש בתיק?",
    bodyHe: "בשיעור הזה נלמד מילים מבית הספר. שימי לב להבדל: pen הוא עט ו-pencil הוא עיפרון, שתי המילים מתחילות אותו דבר. גם teacher (מורה) ו-student (תלמידה) הם שתי מילים חשובות בכיתה.",
    examples: [
      { en: "school", he: "בית ספר" },
      { en: "teacher", he: "מורה" },
      { en: "pen", he: "עט" },
      { en: "pencil", he: "עיפרון" },
      { en: "I am a student.", he: "אני תלמידה." },
    ],
  },
  exercises: (ex) => [
    ex.wordToImage({ vocabId: "school", options: ["school", "house", "class", "bag"] }, { explanationHe: "school = בית ספר. house = בית.", hintsHe: ["המילה נשמעת 'סְקוּל'."] }),
    ex.wordToImage({ vocabId: "pencil", options: ["pencil", "pen", "book", "bag"] }, { explanationHe: "pencil = עיפרון. pen = עט. pencil היא המילה הארוכה יותר.", hintsHe: ["עיפרון הוא זה שמוחקים."] }),
    ex.chooseTranslation({ questionEn: "teacher", options: ["מורה", "תלמיד / תלמידה", "כיתה", "בית ספר"], correct: "מורה" }, { explanationHe: "teacher = מורה. student = תלמיד / תלמידה.", vocabIds: ["teacher"] }),
    ex.listenChooseImage({ audioText: "bag", options: ["bag", "book", "pen", "desk"], correct: "bag" }, { explanationHe: "שמעת bag (תיק). נשמע 'בַּאג'.", hintsHe: ["המילה מתחילה ב-b ומסתיימת ב-g."] }),
    ex.chooseTranslation({ questionEn: "student", options: ["תלמיד / תלמידה", "מורה", "כיתה", "ספר"], correct: "תלמיד / תלמידה" }, { explanationHe: "student = תלמיד / תלמידה. teacher = מורה.", vocabIds: ["student"] }),
    ex.chooseWord({ questionHe: "כיתה", pictureVocabId: "class", options: ["class", "school", "desk", "student"], correct: "class" }, { explanationHe: "כיתה = class. בית ספר = school.", vocabIds: ["class"], hintsHe: ["המילה נשמעת 'קְלַאס'."] }),
    ex.matchPairs({ pairs: [{ en: "book", he: "ספר" }, { en: "pen", he: "עט" }, { en: "desk", he: "שולחן כתיבה" }, { en: "bag", he: "תיק" }] }, { explanationHe: "book = ספר, pen = עט, desk = שולחן כתיבה, bag = תיק.", vocabIds: ["book", "pen", "desk", "bag"] }),
    ex.missingLetter({ word: "school", missingIndex: 2, options: ["h", "c", "k", "w"], vocabId: "school" }, { explanationHe: "school נכתבת s-c-h-o-o-l. ה-h לא נשמעת, אבל היא שם.", hintsHe: ["יש אות שלא שומעים אותה אחרי ה-c."], difficulty: 2 }),
    ex.spellWord({ word: "pen", vocabId: "pen", meaningHe: "עט", tiles: ["p", "e", "n", "a", "b"] }, { explanationHe: "עט = pen. האותיות: p, e, n.", hintsHe: ["מתחיל ב-p.", "הצליל 'אֶ' נכתב ב-e."] }),
    ex.spellWord({ word: "book", vocabId: "book", meaningHe: "ספר", tiles: ["b", "o", "o", "k", "c", "u"] }, { explanationHe: "ספר = book. האותיות: b, o, o, k. הצליל 'אוּ' נכתב בשתי o.", hintsHe: ["יש שתי o באמצע.", "המילה מסתיימת ב-k."], difficulty: 2 }),
    ex.fillBlank({ sentence: "I write with a ___.", translationHe: "אני כותבת בעיפרון.", bank: ["pencil", "bag", "desk", "teacher"], correct: "pencil" }, { explanationHe: "עיפרון = pencil. המשפט: I write with a pencil.", vocabIds: ["pencil"] }),
    ex.sentenceBuilder({ sentence: "The teacher is nice.", translationHe: "המורה נחמדה.", extraWords: ["student", "a"] }, { explanationHe: "The teacher = המורה, is nice = נחמדה. באנגלית חייבים את המילה is בין המורה לתיאור.", vocabIds: ["teacher"], hintsHe: ["מתחילים ב-The teacher.", "אל תשכחי את is."], difficulty: 2 }),
    ex.readRecord({ text: "I am a student. I go to school.", translationHe: "אני תלמידה. אני הולכת לבית הספר." }, { explanationHe: "קראי: I am a student. I go to school. שימי לב ל-a לפני student.", vocabIds: ["student", "school"] }),
  ],
});

const l4 = defineLesson({
  id: "w2-l4",
  titleHe: "צבעים ומספרים",
  titleEn: "Colors and Numbers",
  worldId: "w2",
  unitId: "w2u2",
  order: 4,
  level: 1,
  learningObjectives: ["לזהות 9 צבעים באנגלית", "לספור מ-1 עד 5 ולהכיר את 10", "להבין משפט קצר עם צבע ומספר בשמיעה"],
  vocabIds: ["red", "blue", "green", "yellow", "black", "white", "orange", "purple", "pink", "one", "two", "three", "four", "five", "ten"],
  intro: {
    titleHe: "צבעים ומספרים",
    bodyHe: "באנגלית הצבע בא לפני החפץ: a red apple ולא apple red. נלמד תשעה צבעים ונספור: one, two, three, four, five... ועד ten. שימי לב: orange זה גם כתום וגם תפוז!",
    examples: [
      { en: "red, blue, green, yellow", he: "אדום, כחול, ירוק, צהוב" },
      { en: "black, white", he: "שחור, לבן" },
      { en: "orange, purple, pink", he: "כתום, סגול, ורוד" },
      { en: "one, two, three, four, five", he: "אחת, שתיים, שלוש, ארבע, חמש" },
      { en: "ten", he: "עשר" },
    ],
  },
  exercises: (ex) => [
    ex.wordToImage({ vocabId: "red", options: ["red", "blue", "green", "yellow"] }, { explanationHe: "red = אדום.", hintsHe: ["זה הצבע של תפוח ושל עגבנייה."] }),
    ex.wordToImage({ vocabId: "blue", options: ["blue", "black", "purple", "pink"] }, { explanationHe: "blue = כחול. black = שחור, שימי לב ששתיהן מתחילות ב-bl." }),
    ex.chooseTranslation({ questionEn: "green", options: ["ירוק", "צהוב", "כתום", "ורוד"], correct: "ירוק" }, { explanationHe: "green = ירוק. yellow = צהוב.", vocabIds: ["green"], hintsHe: ["זה הצבע של עשב ושל צפרדע."] }),
    ex.listenChooseImage({ audioText: "black", options: ["black", "white", "yellow", "purple"], correct: "black" }, { explanationHe: "שמעת black (שחור). white = לבן.", hintsHe: ["המילה מתחילה ב-bl ונשמעת 'בְּלַאק'."] }),
    ex.matchPairs({ pairs: [{ en: "yellow", he: "צהוב" }, { en: "white", he: "לבן" }, { en: "orange", he: "כתום" }, { en: "purple", he: "סגול" }, { en: "pink", he: "ורוד" }] }, { explanationHe: "yellow = צהוב, white = לבן, orange = כתום, purple = סגול, pink = ורוד.", vocabIds: ["yellow", "white", "orange", "purple", "pink"], difficulty: 2 }),
    ex.wordToImage({ vocabId: "three", options: ["three", "two", "one", "five"] }, { explanationHe: "three = שלוש. one = אחת, two = שתיים, five = חמש.", hintsHe: ["three נשמע 'תְ'רִי', עם th בהתחלה."] }),
    ex.chooseTranslation({ questionEn: "four", options: ["ארבע / ארבעה", "חמש / חמישה", "שלוש / שלושה", "אחת / אחד"], correct: "ארבע / ארבעה" }, { explanationHe: "four = ארבע. five = חמש. שתיהן מתחילות ב-f, שימי לב לסוף המילה.", vocabIds: ["four"] }),
    ex.matchPairs({ pairs: [{ en: "one", he: "אחת / אחד" }, { en: "two", he: "שתיים / שניים" }, { en: "five", he: "חמש / חמישה" }, { en: "ten", he: "עשר / עשרה" }] }, { explanationHe: "one = אחת, two = שתיים, five = חמש, ten = עשר.", vocabIds: ["one", "two", "five", "ten"] }),
    ex.listenSentence(
      { audioText: "I have two red apples.", transcript: "I have two red apples.", transcriptHe: "יש לי שני תפוחים אדומים.", questionHe: "באיזה צבע התפוחים?", options: ["אדום", "ירוק", "צהוב"], correct: "אדום" },
      { explanationHe: "במשפט נאמר two red apples: שני תפוחים אדומים. red = אדום.", vocabIds: ["two", "red"], hintsHe: ["הקשיבי למילה שבאה ממש לפני apples.", "הצבע מתחיל ב-r."], difficulty: 2 },
    ),
    ex.spellWord({ word: "red", vocabId: "red", meaningHe: "אדום", tiles: ["r", "e", "d", "a", "t"] }, { explanationHe: "אדום = red. האותיות: r, e, d.", hintsHe: ["מתחיל ב-r.", "הצליל 'אֶ' נכתב ב-e."] }),
    ex.fillBlank({ sentence: "The sun is ___.", translationHe: "השמש צהובה.", bank: ["yellow", "blue", "black", "green"], correct: "yellow" }, { explanationHe: "צהוב = yellow. המשפט: The sun is yellow.", vocabIds: ["yellow"], hintsHe: ["הצבע מתחיל ב-y."] }),
    ex.sentenceBuilder({ sentence: "My bag is pink.", translationHe: "התיק שלי ורוד.", extraWords: ["blue", "a"] }, { explanationHe: "My bag = התיק שלי, is pink = ורוד. התיאור (הצבע) בא אחרי is.", vocabIds: ["pink"], hintsHe: ["מתחילים ב-My bag.", "הצבע בא בסוף."], difficulty: 2 }),
    ex.readRecord({ text: "The sky is blue and the sun is yellow.", translationHe: "השמיים כחולים והשמש צהובה." }, { explanationHe: "קראי: The sky is blue, and the sun is yellow. and = ו-.", vocabIds: ["blue", "yellow"] }),
  ],
});

const l5 = defineLesson({
  id: "w2-l5",
  titleHe: "אוכל ושתייה",
  titleEn: "Food and Drinks",
  worldId: "w2",
  unitId: "w2u3",
  order: 5,
  level: 1,
  learningObjectives: ["לזהות 11 מילים של אוכל ושתייה", "להשתמש בפעלים eat, drink ו-like", "להגיד מה אני אוהבת לאכול"],
  vocabIds: ["apple", "banana", "bread", "milk", "water", "egg", "pizza", "cake", "juice", "ice-cream", "cookie", "eat", "drink", "like"],
  intro: {
    titleHe: "מה אוכלים היום?",
    bodyHe: "נלמד מילים של אוכל ושתייה ושלושה פעלים שימושיים: eat (לאכול), drink (לשתות) ו-like (לאהוב). כדי להגיד מה את אוהבת, פשוט אומרים I like ואז האוכל: I like pizza.",
    examples: [
      { en: "I eat an apple.", he: "אני אוכלת תפוח." },
      { en: "I drink water.", he: "אני שותה מים." },
      { en: "I like pizza.", he: "אני אוהבת פיצה." },
      { en: "ice cream", he: "גלידה" },
    ],
  },
  exercises: (ex) => [
    ex.wordToImage({ vocabId: "apple", options: ["apple", "banana", "egg", "cake"] }, { explanationHe: "apple = תפוח. banana = בננה." }),
    ex.wordToImage({ vocabId: "pizza", options: ["pizza", "bread", "cake", "cookie"] }, { explanationHe: "pizza = פיצה. המילה נשמעת כמעט כמו בעברית.", hintsHe: ["המילה נשמעת בדיוק כמו בעברית."] }),
    ex.chooseTranslation({ questionEn: "bread", options: ["לחם", "חלב", "ביצה", "עוגה"], correct: "לחם" }, { explanationHe: "bread = לחם. milk = חלב.", vocabIds: ["bread"], hintsHe: ["המילה נשמעת 'בְּרֶד'."] }),
    ex.listenChooseImage({ audioText: "milk", options: ["milk", "water", "juice", "egg"], correct: "milk" }, { explanationHe: "שמעת milk (חלב). water = מים, juice = מיץ." }),
    ex.listenChooseImage({ audioText: "ice cream", options: ["ice-cream", "cake", "cookie", "banana"], correct: "ice-cream" }, { explanationHe: "שמעת ice cream (גלידה). ice = קרח, cream = שמנת.", hintsHe: ["אלה שתי מילים, והראשונה היא ice, קרח."] }),
    ex.matchPairs({ pairs: [{ en: "banana", he: "בננה" }, { en: "egg", he: "ביצה" }, { en: "cake", he: "עוגה" }, { en: "cookie", he: "עוגייה" }, { en: "juice", he: "מיץ" }] }, { explanationHe: "banana = בננה, egg = ביצה, cake = עוגה, cookie = עוגייה, juice = מיץ.", vocabIds: ["banana", "egg", "cake", "cookie", "juice"], difficulty: 2 }),
    ex.chooseTranslation({ questionEn: "eat", options: ["לאכול", "לשתות", "לאהוב / לחבב", "לשחק"], correct: "לאכול" }, { explanationHe: "eat = לאכול. drink = לשתות. like = לאהוב.", vocabIds: ["eat"], hintsHe: ["מה עושים עם פיצה?"] }),
    ex.listenSentence(
      { audioText: "I drink milk and I eat bread.", transcript: "I drink milk and I eat bread.", transcriptHe: "אני שותה חלב ואני אוכלת לחם.", questionHe: "מה הילדה שותה?", options: ["חלב", "מים", "מיץ"], correct: "חלב" },
      { explanationHe: "נאמר I drink milk: אני שותה חלב. milk = חלב.", vocabIds: ["drink", "milk"], hintsHe: ["הקשיבי למילה שבאה אחרי drink.", "המילה מתחילה ב-m."], difficulty: 2 },
    ),
    ex.missingLetter({ word: "apple", missingIndex: 1, options: ["p", "b", "d", "l"], vocabId: "apple" }, { explanationHe: "apple נכתבת a-p-p-l-e, עם שתי p באמצע.", hintsHe: ["יש שתי אותיות זהות אחרי ה-a."] }),
    ex.spellWord({ word: "egg", vocabId: "egg", meaningHe: "ביצה", tiles: ["e", "g", "g", "a", "k"] }, { explanationHe: "ביצה = egg. האותיות: e, g, g. יש שתי g בסוף.", hintsHe: ["מתחיל ב-e.", "המילה מסתיימת בשתי g."] }),
    ex.fillBlank({ sentence: "I ___ water.", translationHe: "אני שותה מים.", bank: ["drink", "eat", "go"], correct: "drink" }, { explanationHe: "שותה = drink. מים שותים, לא אוכלים: I drink water.", vocabIds: ["drink", "water"], hintsHe: ["מה עושים עם מים: אוכלים או שותים?"] }),
    ex.sentenceBuilder({ sentence: "I like pizza.", translationHe: "אני אוהבת פיצה.", extraWords: ["eat", "a"] }, { explanationHe: "I like = אני אוהבת, ואז pizza. במשפט הזה לא צריך a לפני pizza.", vocabIds: ["like", "pizza"], hintsHe: ["מתחילים ב-I.", "אוהבת = like."], difficulty: 2 }),
    ex.readRecord({ text: "I eat an apple and drink juice.", translationHe: "אני אוכלת תפוח ושותה מיץ." }, { explanationHe: "קראי: I eat an apple, and drink juice. לפני apple אומרים an, כי המילה מתחילה בתנועה.", vocabIds: ["eat", "apple", "drink", "juice"] }),
  ],
});

const l6 = defineLesson({
  id: "w2-l6",
  titleHe: "חיות וחפצים",
  titleEn: "Animals and Things",
  worldId: "w2",
  unitId: "w2u3",
  order: 6,
  level: 1,
  learningObjectives: ["לזהות 8 חיות ו-4 חפצים מהיומיום", "לתאר דברים עם big ו-small", "להבין משפט מושמע על גודל"],
  vocabIds: ["cow", "horse", "rabbit", "lion", "monkey", "elephant", "frog", "duck", "ball", "car", "bus", "phone", "big", "small"],
  intro: {
    titleHe: "גדול וקטן",
    bodyHe: "נכיר חיות וחפצים, ונלמד שתי מילים שמתארות גודל: big (גדול) ו-small (קטן). כדי לתאר משהו אומרים is: The elephant is big. The frog is small.",
    examples: [
      { en: "elephant", he: "פיל" },
      { en: "frog", he: "צפרדע" },
      { en: "The elephant is big.", he: "הפיל גדול." },
      { en: "The frog is small.", he: "הצפרדע קטנה." },
    ],
  },
  exercises: (ex) => [
    ex.wordToImage({ vocabId: "cow", options: ["cow", "horse", "duck", "rabbit"] }, { explanationHe: "cow = פרה. horse = סוס.", hintsHe: ["המילה נשמעת 'קַאוּ'. זאת החיה שנותנת חלב."] }),
    ex.wordToImage({ vocabId: "lion", options: ["lion", "monkey", "elephant", "frog"] }, { explanationHe: "lion = אריה. monkey = קוף, elephant = פיל." }),
    ex.chooseTranslation({ questionEn: "horse", options: ["סוס", "פרה", "ארנב", "ברווז"], correct: "סוס" }, { explanationHe: "horse = סוס. cow = פרה.", vocabIds: ["horse"], hintsHe: ["על החיה הזאת רוכבים."] }),
    ex.listenChooseImage({ audioText: "frog", options: ["frog", "duck", "monkey", "rabbit"], correct: "frog" }, { explanationHe: "שמעת frog (צפרדע). המילה מתחילה ב-fr.", hintsHe: ["החיה הירוקה שקופצת."] }),
    ex.listenChooseImage({ audioText: "bus", options: ["bus", "car", "phone", "ball"], correct: "bus" }, { explanationHe: "שמעת bus (אוטובוס). car = מכונית. ball = כדור, נשמע דומה ל-bus, שימי לב לסוף המילה." }),
    ex.matchPairs({ pairs: [{ en: "elephant", he: "פיל" }, { en: "duck", he: "ברווז" }, { en: "rabbit", he: "ארנב" }, { en: "monkey", he: "קוף" }, { en: "phone", he: "טלפון" }] }, { explanationHe: "elephant = פיל, duck = ברווז, rabbit = ארנב, monkey = קוף, phone = טלפון.", vocabIds: ["elephant", "duck", "rabbit", "monkey", "phone"], difficulty: 2 }),
    ex.chooseTranslation({ questionEn: "big", options: ["גדול", "קטן", "חם", "מהיר"], correct: "גדול" }, { explanationHe: "big = גדול. small = קטן.", vocabIds: ["big"], hintsHe: ["כמו פיל."] }),
    ex.listenSentence(
      { audioText: "The elephant is big and the frog is small.", transcript: "The elephant is big and the frog is small.", transcriptHe: "הפיל גדול והצפרדע קטנה.", questionHe: "מי קטן?", options: ["הצפרדע", "הפיל", "הסוס"], correct: "הצפרדע" },
      { explanationHe: "נאמר the frog is small: הצפרדע קטנה. small = קטן, big = גדול.", vocabIds: ["elephant", "frog", "big", "small"], hintsHe: ["הקשיבי מי בא לפני small.", "small = קטן."], difficulty: 2 },
    ),
    ex.missingLetter({ word: "frog", missingIndex: 1, options: ["r", "l", "w", "n"], vocabId: "frog" }, { explanationHe: "frog (צפרדע) נכתבת f-r-o-g. הצליל 'ר' נכתב ב-r.", hintsHe: ["הצליל השני במילה הוא 'ר'."] }),
    ex.spellWord({ word: "duck", vocabId: "duck", meaningHe: "ברווז", tiles: ["d", "u", "c", "k", "a", "g"] }, { explanationHe: "ברווז = duck. האותיות: d, u, c, k. הצליל 'ק' בסוף נכתב ב-ck.", hintsHe: ["מתחיל ב-d.", "הצליל 'ק' בסוף נכתב בשתי אותיות: c ואז k."], difficulty: 2 }),
    ex.fillBlank({ sentence: "The ___ is big.", translationHe: "הפיל גדול.", bank: ["elephant", "rabbit", "duck", "frog"], correct: "elephant" }, { explanationHe: "פיל = elephant. המשפט: The elephant is big.", vocabIds: ["elephant", "big"] }),
    ex.sentenceBuilder({ sentence: "The car is small.", translationHe: "המכונית קטנה.", extraWords: ["big", "bus"] }, { explanationHe: "The car = המכונית, is small = קטנה. המילה is מחברת בין החפץ לתיאור.", vocabIds: ["car", "small"], hintsHe: ["מתחילים ב-The car.", "קטנה = small, לא big."], difficulty: 2 }),
    ex.readRecord({ text: "The lion is big. The rabbit is small.", translationHe: "האריה גדול. הארנב קטן." }, { explanationHe: "קראי: The lion is big. The rabbit is small. שני משפטים קצרים, עצרי רגע בין המשפטים.", vocabIds: ["lion", "rabbit", "big", "small"] }),
  ],
});

export const WORLD2_LESSONS: Lesson[] = [l1, l2, l3, l4, l5, l6];
