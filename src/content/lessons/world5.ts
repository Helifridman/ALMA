import { defineLesson } from "../builders";
import type { Lesson } from "@/lib/types";

/**
 * World 5 – Reading Adventures (level 3).
 * Unit w5u1: short sentences and mini-texts with comprehension questions.
 * Unit w5u2: two illustrated stories with Hebrew support and follow-up practice.
 */

const l1 = defineLesson({
  id: "w5-l1",
  titleHe: "קוראים משפט שלם",
  titleEn: "Reading a Whole Sentence",
  worldId: "w5",
  unitId: "w5u1",
  order: 1,
  level: 3,
  learningObjectives: ["לקרוא משפט קצר באנגלית ולהבין את המשמעות המלאה שלו", "לשים לב למילים קטנות שמשנות את המשמעות (under, with, every day)", "להשלים משפט לפי ההקשר"],
  vocabIds: ["cat", "bed", "under", "sister", "ice-cream", "friend", "school", "hat", "coat", "hungry", "rabbit", "tired"],
  intro: {
    titleHe: "איך קוראים משפט?",
    bodyHe: "משפט באנגלית בנוי מחלקים: מי (The cat), מה קורה (is), ואיפה או מה (under the bed). כשקוראים, חפשי קודם את המילים שאת מכירה, ואז חברי אותן יחד. שימי לב למילים הקטנות כמו under, on, with – הן משנות את המשמעות!",
    examples: [
      { en: "The cat is under the bed.", he: "החתול מתחת למיטה." },
      { en: "I go to school with my friend.", he: "אני הולכת לבית הספר עם החברה שלי." },
      { en: "We play in the park every day.", he: "אנחנו משחקים בפארק כל יום." },
    ],
  },
  exercises: (ex) => [
    ex.chooseTranslation(
      { questionEn: "The cat is under the bed.", options: ["החתול מתחת למיטה.", "החתול על המיטה.", "הכלב מתחת למיטה.", "החתול בתוך המיטה."], correct: "החתול מתחת למיטה." },
      { explanationHe: "cat = חתול, under = מתחת, bed = מיטה. המילה under אומרת לנו שהחתול מתחת למיטה ולא עליה.", hintsHe: ["מי במשפט? cat = חתול.", "under פירושו מתחת."], skillTags: ["reading"], vocabIds: ["cat", "under", "bed"] },
    ),
    ex.chooseTranslation(
      { questionEn: "My sister likes ice cream.", options: ["אחותי אוהבת גלידה.", "אחי אוהב גלידה.", "אחותי רוצה גלידה.", "אחותי אוהבת עוגה."], correct: "אחותי אוהבת גלידה." },
      { explanationHe: "sister = אחות, likes = אוהבת, ice cream = גלידה. שימי לב: sister היא אחות ולא אח (brother).", hintsHe: ["sister היא בת, לא בן.", "likes = אוהבת, לא רוצה."], skillTags: ["reading"], vocabIds: ["sister", "like", "ice-cream"] },
    ),
    ex.chooseTranslation(
      { questionEn: "I go to school with my friend.", options: ["אני הולכת לבית הספר עם החברה שלי.", "אני הולכת לפארק עם החברה שלי.", "אני הולכת לבית הספר עם אחותי.", "אני משחקת בבית הספר עם החברה שלי."], correct: "אני הולכת לבית הספר עם החברה שלי." },
      { explanationHe: "go = הולכת, school = בית ספר, with = עם, friend = חברה. כל המילים חשובות: לאן הולכים ועם מי.", hintsHe: ["school = בית ספר.", "with my friend = עם החברה שלי."], skillTags: ["reading"], vocabIds: ["go", "school", "with", "friend"] },
    ),
    ex.listenSentence(
      { audioText: "The dog is big and black.", transcript: "The dog is big and black.", transcriptHe: "הכלב גדול ושחור.", questionHe: "איזה כלב מתואר במשפט?", options: ["כלב גדול ושחור", "כלב קטן ושחור", "כלב גדול ולבן"], correct: "כלב גדול ושחור" },
      { explanationHe: "שמעת: The dog is big and black. big = גדול, black = שחור.", hintsHe: ["הקשיבי לשתי המילים אחרי and ולפניה."], vocabIds: ["dog", "big", "black"] },
    ),
    ex.chooseTranslation(
      { questionEn: "We play in the park every day.", options: ["אנחנו משחקים בפארק כל יום.", "אנחנו משחקים בבית כל יום.", "אנחנו רצים בפארק כל יום.", "אנחנו משחקים בפארק היום."], correct: "אנחנו משחקים בפארק כל יום." },
      { explanationHe: "play = משחקים, park = פארק, every day = כל יום. every day זה לא היום (today) אלא כל יום.", hintsHe: ["every day = כל יום."], skillTags: ["reading"], vocabIds: ["we", "play", "park", "day"] },
    ),
    ex.fillBlank(
      { sentence: "The sun is hot. I wear a ___.", translationHe: "השמש חמה. אני חובשת כובע.", bank: ["hat", "coat", "sock"], correct: "hat" },
      { explanationHe: "כשחם וחם (hot) ויש שמש, חובשים כובע – hat. מעיל (coat) לובשים כשקר.", hintsHe: ["מה חובשים על הראש כשיש שמש?"], skillTags: ["reading", "vocabulary"], vocabIds: ["sun", "hot", "hat"] },
    ),
    ex.fillBlank(
      { sentence: "It is cold. Take a ___.", translationHe: "קר. קחי מעיל.", bank: ["coat", "cake", "ball"], correct: "coat" },
      { explanationHe: "cold = קר. כשקר לוקחים מעיל – coat. המשפט הראשון עוזר להבין את המשפט השני.", hintsHe: ["קראי את המשפט הראשון: מה מזג האוויר?"], skillTags: ["reading", "vocabulary"], vocabIds: ["cold", "coat"] },
    ),
    ex.listenSentence(
      { audioText: "My brother is ten and he likes football.", transcript: "My brother is ten and he likes football.", transcriptHe: "אחי בן עשר והוא אוהב כדורגל.", questionHe: "בן כמה האח?", options: ["עשר", "שמונה", "שבע"], correct: "עשר" },
      { explanationHe: "שמעת: My brother is ten. ten = עשר.", hintsHe: ["הקשיבי למספר אחרי המילה is."], vocabIds: ["brother", "ten"] },
    ),
    ex.chooseTranslation(
      { questionEn: "The baby is sleeping in the small bed.", options: ["התינוק ישן במיטה הקטנה.", "התינוק ישן במיטה הגדולה.", "התינוק משחק במיטה הקטנה.", "התינוק בוכה במיטה הקטנה."], correct: "התינוק ישן במיטה הקטנה." },
      { explanationHe: "baby = תינוק, is sleeping = ישן (עכשיו), small = קטנה. שימי לב לתואר small, הוא מתאר את המיטה.", hintsHe: ["sleeping = ישן.", "small = קטן, big = גדול."], skillTags: ["reading"], vocabIds: ["baby", "sleep", "small", "bed"] },
    ),
    ex.fillBlank(
      { sentence: "I am hungry. I want to ___.", translationHe: "אני רעבה. אני רוצה לאכול.", bank: ["eat", "sleep", "swim"], correct: "eat" },
      { explanationHe: "hungry = רעבה. מי שרעב רוצה לאכול – eat. המשפט הראשון מסביר את השני.", hintsHe: ["hungry פירושו רעבה. מה עושים כשרעבים?"], skillTags: ["reading", "vocabulary"], vocabIds: ["hungry", "want", "eat"] },
    ),
    ex.chooseInContext(
      { contextEn: "Dana is tired. She goes to bed at night.", contextHe: "דנה עייפה. היא הולכת למיטה בלילה.", questionEn: "Why does Dana go to bed?", options: ["She is tired.", "She is hungry.", "She is happy."], correct: "She is tired." },
      { promptHe: "קראי את המשפטים וענו על השאלה", explanationHe: "השאלה שואלת למה (why). בטקסט כתוב Dana is tired – דנה עייפה, ולכן היא הולכת למיטה.", hintsHe: ["חפשי בטקסט את המילה tired.", "tired = עייפה."], skillTags: ["reading"], vocabIds: ["tired", "bed", "night"] },
    ),
    ex.readRecord(
      { text: "My friend has a small white rabbit.", translationHe: "לחברה שלי יש ארנב לבן קטן." },
      { explanationHe: "קראי לאט ובקול: My friend has a small white rabbit. friend = חברה, rabbit = ארנב.", vocabIds: ["friend", "have", "small", "white", "rabbit"] },
    ),
  ],
});

const l2 = defineLesson({
  id: "w5-l2",
  titleHe: "טקסטים קצרים: נועה והחתולה שלה",
  titleEn: "Mini-Texts: Noa and Her Cat",
  worldId: "w5",
  unitId: "w5u1",
  order: 2,
  level: 3,
  learningObjectives: ["לקרוא טקסט של 2–3 משפטים ולהבין את הרעיון המרכזי", "לענות על שאלת הבנה באנגלית (What, Who, Where, Why)", "למצוא את התשובה בתוך הטקסט"],
  vocabIds: ["cat", "black", "bed", "school", "teacher", "nice", "egg", "bread", "milk", "juice", "friend", "park", "ball", "fish", "happy", "homework", "book", "mother"],
  intro: {
    titleHe: "קוראים טקסט קצר",
    bodyHe: "עכשיו נקרא טקסטים של שניים-שלושה משפטים על נועה, החתולה שלה ובית הספר. אחרי כל טקסט יש שאלה באנגלית. הטריק: התשובה תמיד מסתתרת בטקסט! קראי את השאלה, חפשי את מילת השאלה (What = מה, Who = מי, Where = איפה, Why = למה), ואז חזרי לטקסט ומצאי את התשובה.",
    examples: [
      { en: "What? Who? Where? Why?", he: "מה? מי? איפה? למה?" },
      { en: "Noa has a cat. → What does Noa have? A cat.", he: "לנועה יש חתולה. ← מה יש לנועה? חתולה." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { contextEn: "Noa is ten. She has a small black cat. The cat sleeps on her bed.", contextHe: "נועה בת עשר. יש לה חתולה שחורה קטנה. החתולה ישנה על המיטה שלה.", questionEn: "What does Noa have?", options: ["A black cat", "A black dog", "A white cat"], correct: "A black cat" },
      { promptHe: "קראי את הטקסט וענו על השאלה", explanationHe: "בטקסט כתוב: She has a small black cat. black = שחורה, cat = חתולה.", hintsHe: ["חפשי בטקסט את המילה has.", "איזה צבע כתוב לפני cat?"], skillTags: ["reading"], vocabIds: ["cat", "black", "have"] },
    ),
    ex.chooseInContext(
      { contextEn: "Noa goes to school every day. She likes her teacher. Her teacher is very nice.", contextHe: "נועה הולכת לבית הספר כל יום. היא אוהבת את המורה שלה. המורה שלה נחמדה מאוד.", questionEn: "Who is very nice?", options: ["Noa's teacher", "Noa's cat", "Noa's friend"], correct: "Noa's teacher" },
      { promptHe: "קראי את הטקסט וענו על השאלה", explanationHe: "Who = מי. בטקסט כתוב: Her teacher is very nice – המורה שלה נחמדה מאוד.", hintsHe: ["חפשי את המילים very nice בטקסט.", "מי כתוב לפני is very nice?"], skillTags: ["reading"], vocabIds: ["school", "teacher", "nice", "very"] },
    ),
    ex.chooseInContext(
      { contextEn: "In the morning Noa eats an egg and bread. She drinks milk. She does not like juice.", contextHe: "בבוקר נועה אוכלת ביצה ולחם. היא שותה חלב. היא לא אוהבת מיץ.", questionEn: "What does Noa drink in the morning?", options: ["Milk", "Juice", "Water"], correct: "Milk" },
      { promptHe: "קראי את הטקסט וענו על השאלה", explanationHe: "drink = לשתות. בטקסט כתוב: She drinks milk. מיץ (juice) היא דווקא לא אוהבת.", hintsHe: ["חפשי את המילה drinks בטקסט."], skillTags: ["reading"], vocabIds: ["morning", "egg", "bread", "milk", "juice", "drink"] },
    ),
    ex.chooseInContext(
      { contextEn: "Noa has a friend. Her name is Maya. They play in the park with a ball.", contextHe: "לנועה יש חברה. קוראים לה מאיה. הן משחקות בפארק עם כדור.", questionEn: "Where do Noa and Maya play?", options: ["In the park", "At school", "In the house"], correct: "In the park" },
      { promptHe: "קראי את הטקסט וענו על השאלה", explanationHe: "Where = איפה. בטקסט כתוב: They play in the park – הן משחקות בפארק.", hintsHe: ["Where שואל על מקום.", "חפשי את המילה play ומה כתוב אחריה."], skillTags: ["reading"], vocabIds: ["friend", "play", "park", "ball"] },
    ),
    ex.chooseInContext(
      { contextEn: "The cat is hungry. Noa gives the cat fish. Now the cat is happy.", contextHe: "החתולה רעבה. נועה נותנת לחתולה דג. עכשיו החתולה שמחה.", questionEn: "Why is the cat happy now?", options: ["Noa gives it fish.", "Noa gives it milk.", "Noa plays with it."], correct: "Noa gives it fish." },
      { promptHe: "קראי את הטקסט וענו על השאלה", explanationHe: "Why = למה. החתולה הייתה רעבה (hungry), נועה נתנה לה דג (fish), ולכן עכשיו היא שמחה.", hintsHe: ["מה נועה נותנת לחתולה?", "gives = נותנת."], skillTags: ["reading"], vocabIds: ["hungry", "fish", "happy"] },
    ),
    ex.chooseInContext(
      { contextEn: "After school Noa does her homework. Then she reads a book with her mother.", contextHe: "אחרי בית הספר נועה מכינה שיעורי בית. אחר כך היא קוראת ספר עם אמא שלה.", questionEn: "What does Noa do after her homework?", options: ["She reads a book.", "She plays a game.", "She goes to the park."], correct: "She reads a book." },
      { promptHe: "קראי את הטקסט וענו על השאלה", explanationHe: "Then = אחר כך. אחרי שיעורי הבית כתוב: she reads a book with her mother – היא קוראת ספר עם אמא.", hintsHe: ["חפשי את המילה Then – מה בא אחריה?"], skillTags: ["reading"], vocabIds: ["homework", "read", "book", "mother"] },
    ),
    ex.fillBlank(
      { sentence: "The cat sleeps on her ___.", translationHe: "החתולה ישנה על המיטה שלה.", bank: ["bed", "table", "chair"], correct: "bed" },
      { promptHe: "השלימי את המשפט מהטקסט על נועה", explanationHe: "בטקסט הראשון כתוב: The cat sleeps on her bed. bed = מיטה.", hintsHe: ["איפה חתולים אוהבים לישון?"], skillTags: ["reading", "vocabulary"], vocabIds: ["sleep", "bed"] },
    ),
    ex.fillBlank(
      { sentence: "Noa ___ her teacher.", translationHe: "נועה אוהבת את המורה שלה.", bank: ["likes", "eats", "sees"], correct: "likes" },
      { promptHe: "השלימי את המשפט מהטקסט על נועה", explanationHe: "בטקסט כתוב: She likes her teacher. likes = אוהבת.", hintsHe: ["המורה נחמדה מאוד, אז מה נועה מרגישה כלפיה?"], skillTags: ["reading", "vocabulary"], vocabIds: ["like", "teacher"] },
    ),
    ex.listenSentence(
      { audioText: "Noa and Maya play in the park with a ball.", transcript: "Noa and Maya play in the park with a ball.", transcriptHe: "נועה ומאיה משחקות בפארק עם כדור.", questionHe: "עם מה הן משחקות?", options: ["עם כדור", "עם חתולה", "עם ספר"], correct: "עם כדור" },
      { explanationHe: "שמעת: with a ball. with = עם, ball = כדור.", hintsHe: ["הקשיבי למילה שאחרי with."], vocabIds: ["play", "park", "with", "ball"] },
    ),
    ex.chooseTranslation(
      { questionEn: "every day", options: ["כל יום", "היום", "כל שבוע", "מחר"], correct: "כל יום" },
      { explanationHe: "every = כל, day = יום. every day = כל יום. היום זה today, ומחר זה tomorrow.", hintsHe: ["every פירושו כל."], vocabIds: ["day", "today", "tomorrow", "week"] },
    ),
    ex.readRecord(
      { text: "Noa has a small black cat.", translationHe: "לנועה יש חתולה שחורה קטנה." },
      { explanationHe: "קראי בקול: Noa has a small black cat. שימי לב: באנגלית התואר (small, black) בא לפני שם העצם (cat).", vocabIds: ["have", "small", "black", "cat"] },
    ),
  ],
});

const l3 = defineLesson({
  id: "w5-l3",
  titleHe: "משלימים מילים בטקסט: יום בפארק",
  titleEn: "Completing a Text: A Day at the Park",
  worldId: "w5",
  unitId: "w5u1",
  order: 3,
  level: 3,
  learningObjectives: ["להשלים מילים חסרות בטקסט לפי ההקשר", "לכתוב נכון מילות מפתח מהטקסט", "לסדר משפט מהטקסט בסדר הנכון"],
  vocabIds: ["today", "day", "brother", "park", "walk", "under", "big", "tree", "run", "fast", "jump", "see", "duck", "water", "eat", "drink", "cold", "juice", "night", "tired", "happy"],
  intro: {
    titleHe: "קוראים פסקה שלמה",
    bodyHe: "הפעם נקרא פסקה שלמה על יום בפארק, ואז נשלים בה מילים חסרות. כשחסרה מילה, קראי את כל המשפט – ולפעמים גם את המשפט שלפניו – ושאלי: איזו מילה הגיונית כאן? קראי קודם את הפסקה כולה.",
    examples: [
      { en: "Today is a sunny day. Dana and her brother go to the park.", he: "היום יום שמשי. דנה ואחיה הולכים לפארק." },
      { en: "They walk under the big trees. Dana runs fast and her brother jumps.", he: "הם הולכים מתחת לעצים הגדולים. דנה רצה מהר ואחיה קופץ." },
      { en: "They see a duck in the water. At twelve they eat sandwiches and drink cold juice.", he: "הם רואים ברווז במים. בשתים-עשרה הם אוכלים כריכים ושותים מיץ קר." },
      { en: "At night they are tired but happy.", he: "בלילה הם עייפים אבל שמחים." },
    ],
  },
  exercises: (ex) => [
    ex.fillBlank(
      { sentence: "Today is a sunny day. Dana and her brother go to the ___.", translationHe: "היום יום שמשי. דנה ואחיה הולכים לפארק.", bank: ["park", "school", "shop"], correct: "park" },
      { promptHe: "השלימי את המילה החסרה מהפסקה", explanationHe: "הפסקה מספרת על יום בפארק: go to the park = הולכים לפארק.", hintsHe: ["על מה הפסקה? קראי את הכותרת."], skillTags: ["reading"], vocabIds: ["today", "brother", "go", "park"] },
    ),
    ex.fillBlank(
      { sentence: "They walk under the big ___.", translationHe: "הם הולכים מתחת לעצים הגדולים.", bank: ["trees", "tables", "beds"], correct: "trees" },
      { promptHe: "השלימי את המילה החסרה מהפסקה", explanationHe: "בפארק יש עצים: trees. under the big trees = מתחת לעצים הגדולים.", hintsHe: ["מה גדול ויש בפארק?", "tree = עץ. trees = עצים."], skillTags: ["reading"], vocabIds: ["walk", "under", "big", "tree"] },
    ),
    ex.fillBlank(
      { sentence: "Dana runs ___ and her brother jumps.", translationHe: "דנה רצה מהר ואחיה קופץ.", bank: ["fast", "tall", "new"], correct: "fast" },
      { promptHe: "השלימי את המילה החסרה מהפסקה", explanationHe: "runs fast = רצה מהר. fast מתאר איך דנה רצה.", hintsHe: ["איך רצים? מהר = ..."], skillTags: ["reading"], vocabIds: ["run", "fast", "jump"] },
    ),
    ex.fillBlank(
      { sentence: "They see a ___ in the water.", translationHe: "הם רואים ברווז במים.", bank: ["duck", "cow", "lion"], correct: "duck" },
      { promptHe: "השלימי את המילה החסרה מהפסקה", explanationHe: "duck = ברווז. ברווז חי במים (water), לכן הוא מתאים כאן.", hintsHe: ["איזו חיה שוחה במים בפארק?"], skillTags: ["reading"], vocabIds: ["see", "duck", "water"] },
    ),
    ex.fillBlank(
      { sentence: "Then they drink cold ___.", translationHe: "אחר כך הם שותים מיץ קר.", bank: ["juice", "bread", "cake"], correct: "juice" },
      { promptHe: "השלימי את המילה החסרה מהפסקה", explanationHe: "drink = שותים. שותים מיץ – juice. לחם ועוגה אוכלים, לא שותים.", hintsHe: ["מה אפשר לשתות?"], skillTags: ["reading"], vocabIds: ["drink", "cold", "juice"] },
    ),
    ex.fillBlank(
      { sentence: "At night Dana is tired. She goes to ___.", translationHe: "בלילה דנה עייפה. היא הולכת למיטה.", bank: ["bed", "school", "park"], correct: "bed" },
      { promptHe: "השלימי את המילה החסרה", explanationHe: "tired = עייפה. בלילה, כשעייפים, הולכים למיטה: goes to bed.", hintsHe: ["לאן הולכים כשעייפים בלילה?"], skillTags: ["reading"], vocabIds: ["night", "tired", "bed"] },
    ),
    ex.missingLetter(
      { word: "park", missingIndex: 1, options: ["a", "e", "o", "u"], vocabId: "park" },
      { explanationHe: "park (פארק) נכתבת p-a-r-k. הצליל 'אַ' נכתב באות a.", hintsHe: ["הקשיבי לצליל אחרי p."] },
    ),
    ex.missingLetter(
      { word: "juice", missingIndex: 1, options: ["u", "o", "a", "e"], vocabId: "juice" },
      { explanationHe: "juice (מיץ) נכתבת j-u-i-c-e. אחרי j באה u, למרות שהצליל הוא 'וּ'." },
    ),
    ex.missingLetter(
      { word: "tree", missingIndex: 2, options: ["e", "i", "a", "o"], vocabId: "tree" },
      { explanationHe: "tree (עץ) נכתבת t-r-e-e. הצליל הארוך 'אִי' נכתב כאן בשתי e.", hintsHe: ["האות האחרונה במילה היא e, ולפניה אותה אות."] },
    ),
    ex.sentenceBuilder(
      { sentence: "They see a duck in the water.", translationHe: "הם רואים ברווז במים.", extraWords: ["cat", "on"] },
      { explanationHe: "קודם מי (They), אחר כך מה עושים (see), ואז מה רואים (a duck) ואיפה (in the water).", hintsHe: ["התחילי עם They.", "in the water בא בסוף."], vocabIds: ["they", "see", "duck", "in", "water"] },
    ),
    ex.sentenceBuilder(
      { sentence: "They drink cold juice.", translationHe: "הם שותים מיץ קר.", extraWords: ["hot", "eat"] },
      { explanationHe: "They drink cold juice: מי – מה עושים – מה. שימי לב: cold (קר) בא לפני juice.", hintsHe: ["drink = שותים, לא eat."], vocabIds: ["drink", "cold", "juice"] },
    ),
    ex.listenSentence(
      { audioText: "At night they are tired but happy.", transcript: "At night they are tired but happy.", transcriptHe: "בלילה הם עייפים אבל שמחים.", questionHe: "איך הם מרגישים בלילה?", options: ["עייפים אבל שמחים", "עייפים ועצובים", "רעבים ושמחים"], correct: "עייפים אבל שמחים" },
      { explanationHe: "שמעת: tired but happy. tired = עייפים, but = אבל, happy = שמחים.", hintsHe: ["הקשיבי למילה אחרי but."], vocabIds: ["night", "tired", "but", "happy"] },
    ),
    ex.readRecord(
      { text: "We walk under the big trees.", translationHe: "אנחנו הולכים מתחת לעצים הגדולים." },
      { explanationHe: "קראי בקול: We walk under the big trees. walk = הולכים ברגל, under = מתחת.", vocabIds: ["walk", "under", "big", "tree"] },
    ),
  ],
});

const l4 = defineLesson({
  id: "w5-l4",
  titleHe: "סיפור: החתול שאבד",
  titleEn: "Story: The Lost Cat",
  worldId: "w5",
  unitId: "w5u2",
  order: 4,
  level: 3,
  learningObjectives: ["לקרוא סיפור קצר באנגלית ולענות על שאלות הבנה", "להבין ולהשתמש במילים: look, open, help, under", "לקרוא בקול משפט מהסיפור"],
  vocabIds: ["cat", "black", "sleep", "sun", "look", "kitchen", "chair", "sad", "under", "table", "bag", "brother", "help", "open", "door", "house", "room", "bed", "happy", "where"],
  intro: {
    titleHe: "קוראים סיפור",
    bodyHe: "הסיפור הראשון שלנו: מאיה מחפשת את טום, החתול השחור שלה. קראי את הסיפור חלק אחרי חלק. אם משהו לא ברור, אפשר ללחוץ ולראות את התרגום לעברית. בסוף יש ארבע שאלות על הסיפור. המילים האלה יעזרו לך:",
    examples: [
      { en: "look for", he: "לחפש" },
      { en: "under", he: "מתחת" },
      { en: "help", he: "לעזור" },
      { en: "Where are you?", he: "איפה אתה?" },
    ],
  },
  exercises: (ex) => [
    ex.story(
      {
        title: "The Lost Cat",
        paragraphs: [
          "Maya has a black cat. His name is Tom. Tom likes to sleep in the sun.",
          "One morning Maya looks for Tom. He is not in the kitchen. He is not on the chair.",
          "\"Tom! Where are you?\" Maya is sad. She looks under the table. She looks in her bag. No cat!",
          "Maya's brother helps her. They open every door in the house. They look in every room.",
          "Then Maya hears a small sound. \"Meow!\" It comes from her room.",
          "Maya looks under the bed. Tom is there! He is sleeping. Maya is very happy.",
        ],
        paragraphsHe: [
          "למאיה יש חתול שחור. קוראים לו טום. טום אוהב לישון בשמש.",
          "בוקר אחד מאיה מחפשת את טום. הוא לא במטבח. הוא לא על הכיסא.",
          "\"טום! איפה אתה?\" מאיה עצובה. היא מסתכלת מתחת לשולחן. היא מסתכלת בתוך התיק שלה. אין חתול!",
          "אח של מאיה עוזר לה. הם פותחים כל דלת בבית. הם מסתכלים בכל חדר.",
          "ואז מאיה שומעת קול קטן. \"מיאו!\" הוא מגיע מהחדר שלה.",
          "מאיה מסתכלת מתחת למיטה. טום שם! הוא ישן. מאיה שמחה מאוד.",
        ],
        questions: [
          { questionHe: "באיזה צבע טום?", questionEn: "What color is Tom?", options: ["black", "white", "orange"], correct: "black", explanationHe: "בתחילת הסיפור כתוב: Maya has a black cat. black = שחור." },
          { questionHe: "מה טום אוהב לעשות?", questionEn: "What does Tom like to do?", options: ["sleep in the sun", "play with a ball", "eat fish"], correct: "sleep in the sun", explanationHe: "בסיפור כתוב: Tom likes to sleep in the sun – טום אוהב לישון בשמש." },
          { questionHe: "מי עוזר למאיה לחפש?", questionEn: "Who helps Maya?", options: ["her brother", "her mother", "her friend"], correct: "her brother", explanationHe: "כתוב: Maya's brother helps her. brother = אח, helps = עוזר." },
          { questionHe: "איפה טום בסוף הסיפור?", questionEn: "Where is Tom at the end?", options: ["under the bed", "under the table", "in the kitchen"], correct: "under the bed", explanationHe: "בסוף: Maya looks under the bed. Tom is there! מתחת לשולחן היא הסתכלה קודם, אבל הוא לא היה שם." },
        ],
      },
      { explanationHe: "קראי את הסיפור שוב לאט. התשובות לכל השאלות נמצאות בתוך הסיפור.", hintsHe: ["אפשר לפתוח את התרגום לעברית של כל חלק.", "חפשי בסיפור את המילה מהשאלה."], vocabIds: ["cat", "black", "look", "under", "bed", "help"] },
    ),
    ex.chooseTranslation(
      { questionEn: "Where are you?", options: ["איפה אתה?", "מי אתה?", "מה שלומך?", "מה אתה רוצה?"], correct: "איפה אתה?" },
      { explanationHe: "Where = איפה. Where are you? = איפה אתה? (מי = who, מה = what).", hintsHe: ["Where שואל על מקום."], vocabIds: ["where", "you"] },
    ),
    ex.chooseTranslation(
      { questionEn: "He is sleeping.", options: ["הוא ישן.", "הוא אוכל.", "הוא משחק.", "היא ישנה."], correct: "הוא ישן." },
      { explanationHe: "He = הוא, is sleeping = ישן (ממש עכשיו). She = היא.", hintsHe: ["He = הוא, She = היא."], vocabIds: ["he", "sleep"] },
    ),
    ex.fillBlank(
      { sentence: "Maya looks ___ the bed.", translationHe: "מאיה מסתכלת מתחת למיטה.", bank: ["under", "on", "with"], correct: "under" },
      { promptHe: "השלימי את המשפט מהסיפור", explanationHe: "under = מתחת. טום היה מתחת למיטה: under the bed.", hintsHe: ["איפה טום התחבא?"], skillTags: ["reading", "grammar"], vocabIds: ["look", "under", "bed"] },
    ),
    ex.fillBlank(
      { sentence: "Maya's brother ___ her.", translationHe: "אח של מאיה עוזר לה.", bank: ["helps", "sleeps", "eats"], correct: "helps" },
      { promptHe: "השלימי את המשפט מהסיפור", explanationHe: "helps = עוזר. האח עוזר למאיה לחפש את טום.", hintsHe: ["help = לעזור."], skillTags: ["reading", "vocabulary"], vocabIds: ["brother", "help"] },
    ),
    ex.chooseInContext(
      { contextEn: "Then Maya hears a small sound. \"Meow!\" It comes from her room.", contextHe: "ואז מאיה שומעת קול קטן. \"מיאו!\" הוא מגיע מהחדר שלה.", questionEn: "Who makes the sound?", options: ["Tom", "Maya", "Maya's brother"], correct: "Tom" },
      { promptHe: "קראי את הקטע וענו על השאלה", explanationHe: "Meow זה הקול של חתול, ולכן הקול הוא של טום. זה הרמז שעוזר למאיה למצוא אותו.", hintsHe: ["מי אומר מיאו?"], skillTags: ["reading"], vocabIds: ["small", "room"] },
    ),
    ex.matchPairs(
      { pairs: [{ en: "look", he: "להסתכל" }, { en: "open", he: "לפתוח" }, { en: "help", he: "לעזור" }, { en: "sleep", he: "לישון" }] },
      { explanationHe: "look = להסתכל, open = לפתוח, help = לעזור, sleep = לישון. כל הפעלים האלה מופיעים בסיפור.", vocabIds: ["look", "open", "help", "sleep"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Tom likes to sleep in the sun.", translationHe: "טום אוהב לישון בשמש.", extraWords: ["cat", "bed"] },
      { explanationHe: "Tom likes to sleep in the sun: קודם מי (Tom), מה (likes to sleep), ואיפה (in the sun).", hintsHe: ["התחילי עם Tom likes.", "אחרי likes בא to sleep."], vocabIds: ["like", "sleep", "in", "sun"] },
    ),
    ex.listenSentence(
      { audioText: "He is not in the kitchen.", transcript: "He is not in the kitchen.", transcriptHe: "הוא לא במטבח.", questionHe: "איפה טום לא נמצא?", options: ["במטבח", "בחדר", "בפארק"], correct: "במטבח" },
      { explanationHe: "שמעת: He is not in the kitchen. kitchen = מטבח. not = לא.", hintsHe: ["הקשיבי למילה האחרונה במשפט."], vocabIds: ["kitchen", "in"] },
    ),
    ex.chooseWord(
      { questionHe: "עצוב", pictureVocabId: "sad", options: ["sad", "happy", "tired"], correct: "sad" },
      { explanationHe: "עצוב = sad. כשמאיה לא מצאה את טום היא הייתה sad, ובסוף היא happy (שמחה).", vocabIds: ["sad", "happy"] },
    ),
    ex.readRecord(
      { text: "Maya looks under the bed. Tom is there!", translationHe: "מאיה מסתכלת מתחת למיטה. טום שם!" },
      { explanationHe: "קראי בקול, עם התרגשות בסוף: Tom is there! there = שם.", vocabIds: ["look", "under", "bed"] },
    ),
  ],
});

const l5 = defineLesson({
  id: "w5-l5",
  titleHe: "סיפור: יום בים",
  titleEn: "Story: A Day at the Sea",
  worldId: "w5",
  unitId: "w5u2",
  order: 5,
  level: 3,
  learningObjectives: ["לקרוא סיפור על טיול משפחתי ולענות על שאלות הבנה", "להבין תיאורים (hot, cold, small, white, funny) בתוך סיפור", "לבנות ולקרוא בקול משפטים מהסיפור"],
  vocabIds: ["family", "sea", "mother", "father", "brother", "sun", "hot", "blue", "swim", "water", "hungry", "bag", "eat", "drink", "cold", "juice", "funny", "dog", "small", "white", "want", "jump", "run", "bread", "tired", "good", "day"],
  intro: {
    titleHe: "סיפור שני: טיול לים",
    bodyHe: "בסיפור הזה משפחה נוסעת לים ביום שישי, ואז מגיע אורח מצחיק. שימי לב שהסיפור מסופר בגוף ראשון – I ו-we, כי הילדה מספרת בעצמה. המילים האלה יעזרו לך:",
    examples: [
      { en: "sandwiches", he: "כריכים" },
      { en: "a funny dog", he: "כלב מצחיק" },
      { en: "laughs", he: "צוחק" },
      { en: "in the evening", he: "בערב" },
    ],
  },
  exercises: (ex) => [
    ex.story(
      {
        title: "A Day at the Sea",
        paragraphs: [
          "On Friday my family goes to the sea. Mom, Dad, my little brother and me.",
          "The sun is hot and the sea is blue. I swim with Dad. My brother plays with the water.",
          "At twelve we are hungry. Mom opens the big bag. We eat sandwiches and drink cold juice.",
          "Then a funny dog comes. He is small and white. He wants our sandwiches!",
          "The dog jumps and runs. My brother laughs and laughs. We give the dog a little bread.",
          "In the evening we go home. I am tired, but it is a very good day.",
        ],
        paragraphsHe: [
          "ביום שישי המשפחה שלי נוסעת לים. אמא, אבא, אחי הקטן ואני.",
          "השמש חמה והים כחול. אני שוחה עם אבא. אחי משחק במים.",
          "בשתים-עשרה אנחנו רעבים. אמא פותחת את התיק הגדול. אנחנו אוכלים כריכים ושותים מיץ קר.",
          "ואז מגיע כלב מצחיק. הוא קטן ולבן. הוא רוצה את הכריכים שלנו!",
          "הכלב קופץ ורץ. אחי צוחק וצוחק. אנחנו נותנים לכלב קצת לחם.",
          "בערב אנחנו חוזרים הביתה. אני עייפה, אבל זה יום טוב מאוד.",
        ],
        questions: [
          { questionHe: "מתי המשפחה נוסעת לים?", questionEn: "When does the family go to the sea?", options: ["on Friday", "on Sunday", "on Monday"], correct: "on Friday", explanationHe: "המשפט הראשון: On Friday my family goes to the sea. Friday = יום שישי." },
          { questionHe: "מה המשפחה אוכלת?", questionEn: "What does the family eat?", options: ["sandwiches", "pizza", "rice"], correct: "sandwiches", explanationHe: "כתוב: We eat sandwiches and drink cold juice. sandwiches = כריכים." },
          { questionHe: "איך נראה הכלב?", questionEn: "What does the dog look like?", options: ["small and white", "big and black", "small and black"], correct: "small and white", explanationHe: "כתוב: He is small and white – הוא קטן ולבן." },
          { questionHe: "מה הכלב רוצה?", questionEn: "What does the dog want?", options: ["the sandwiches", "the ball", "the juice"], correct: "the sandwiches", explanationHe: "כתוב: He wants our sandwiches! – הוא רוצה את הכריכים שלנו." },
        ],
      },
      { explanationHe: "חזרי לסיפור וחפשי את המשפט שעונה על השאלה. אפשר להיעזר בתרגום.", hintsHe: ["כל תשובה נמצאת בתוך הסיפור.", "חפשי מילה מהשאלה בתוך הסיפור."], vocabIds: ["family", "sea", "sun", "hot", "swim", "hungry", "funny", "dog"] },
    ),
    ex.chooseTranslation(
      { questionEn: "The sun is hot and the sea is blue.", options: ["השמש חמה והים כחול.", "השמש חמה והים קר.", "השמש צהובה והים כחול.", "השמיים כחולים והים חם."], correct: "השמש חמה והים כחול." },
      { explanationHe: "sun = שמש, hot = חמה, sea = ים, blue = כחול. and מחבר בין שני החלקים.", hintsHe: ["hot = חם, cold = קר.", "blue = כחול."], skillTags: ["reading"], vocabIds: ["sun", "hot", "sea", "blue"] },
    ),
    ex.fillBlank(
      { sentence: "I swim with ___.", translationHe: "אני שוחה עם אבא.", bank: ["Dad", "Mom", "the dog"], correct: "Dad" },
      { promptHe: "השלימי את המשפט מהסיפור", explanationHe: "בסיפור כתוב: I swim with Dad. אמא פותחת את התיק, והכלב מגיע רק אחר כך.", hintsHe: ["מי שוחה עם הילדה? חפשי את המילה swim."], skillTags: ["reading"], vocabIds: ["swim", "with", "father"] },
    ),
    ex.fillBlank(
      { sentence: "We drink ___ juice.", translationHe: "אנחנו שותים מיץ קר.", bank: ["cold", "hot", "big"], correct: "cold" },
      { promptHe: "השלימי את המשפט מהסיפור", explanationHe: "cold = קר. ביום חם בים שותים מיץ קר: cold juice. שימי לב: התואר בא לפני juice.", hintsHe: ["איזה מיץ כיף לשתות כשחם?"], skillTags: ["reading", "vocabulary"], vocabIds: ["drink", "cold", "juice"] },
    ),
    ex.chooseInContext(
      { contextEn: "The dog jumps and runs. My brother laughs and laughs.", contextHe: "הכלב קופץ ורץ. אחי צוחק וצוחק.", questionEn: "How does my brother feel?", options: ["happy", "sad", "tired"], correct: "happy" },
      { promptHe: "קראי את הקטע וענו על השאלה", explanationHe: "laughs = צוחק. מי שצוחק וצוחק מרגיש שמח – happy.", hintsHe: ["laughs = צוחק. איך מרגישים כשצוחקים?"], skillTags: ["reading"], vocabIds: ["happy", "brother"] },
    ),
    ex.matchPairs(
      { pairs: [{ en: "sea", he: "ים" }, { en: "sun", he: "שמש" }, { en: "swim", he: "לשחות" }, { en: "hungry", he: "רעב" }, { en: "funny", he: "מצחיק" }] },
      { explanationHe: "sea = ים, sun = שמש, swim = לשחות, hungry = רעב, funny = מצחיק.", vocabIds: ["sea", "sun", "swim", "hungry", "funny"] },
    ),
    ex.sentenceBuilder(
      { sentence: "The dog jumps and runs.", translationHe: "הכלב קופץ ורץ.", extraWords: ["cat", "sleeps"] },
      { explanationHe: "The dog jumps and runs: מי (The dog), ואז שני פעלים מחוברים ב-and.", hintsHe: ["התחילי עם The dog.", "and מחבר בין jumps ל-runs."], vocabIds: ["dog", "jump", "and", "run"] },
    ),
    ex.sentenceBuilder(
      { sentence: "We give the dog a little bread.", translationHe: "אנחנו נותנים לכלב קצת לחם.", extraWords: ["cat"] },
      { explanationHe: "We give the dog a little bread: מי (We), מה עושים (give), למי (the dog), ומה (a little bread).", hintsHe: ["אחרי give בא למי נותנים: the dog."], vocabIds: ["we", "dog", "bread"] },
    ),
    ex.listenSentence(
      { audioText: "He is small and white.", transcript: "He is small and white.", transcriptHe: "הוא קטן ולבן.", questionHe: "מה שמעת על הכלב?", options: ["הוא קטן ולבן", "הוא גדול ולבן", "הוא קטן ושחור"], correct: "הוא קטן ולבן" },
      { explanationHe: "שמעת: small and white. small = קטן, white = לבן.", hintsHe: ["הקשיבי לשתי המילים: אחת על הגודל ואחת על הצבע."], vocabIds: ["small", "white"] },
    ),
    ex.readRecord(
      { text: "I am tired, but it is a very good day.", translationHe: "אני עייפה, אבל זה יום טוב מאוד." },
      { explanationHe: "קראי בקול: I am tired, but it is a very good day. עצרי רגע אחרי הפסיק, לפני but.", vocabIds: ["tired", "but", "very", "good", "day"] },
    ),
  ],
});

export const WORLD5_LESSONS: Lesson[] = [l1, l2, l3, l4, l5];
