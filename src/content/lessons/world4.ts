import { defineLesson } from "../builders";
import type { Lesson } from "@/lib/types";

/**
 * World 4 – Speak Up (level 2).
 * Greetings, introducing yourself, questions about me and my friends,
 * asking for help, shopping, ordering food and playing with friends.
 * Every lesson has short dialogues where the learner picks what to say.
 */

const l1 = defineLesson({
  id: "w4-l1",
  titleHe: "ברכות: שלום, תודה, סליחה",
  titleEn: "Greetings: Hello, Thank You, Sorry",
  worldId: "w4",
  unitId: "w4u1",
  order: 1,
  level: 2,
  learningObjectives: ["לברך לשלום בבוקר, ביום ובלילה", "לענות על How are you?", "להגיד בבקשה, תודה וסליחה במקום הנכון"],
  vocabIds: ["hello", "goodbye", "good-morning", "good-night", "how-are-you", "please", "thank-you", "sorry", "yes", "no"],
  intro: {
    titleHe: "מה אומרים כשנפגשים?",
    bodyHe: "Hello אומרים בכל שעה. Good morning אומרים בבוקר, ו-Good night רק לפני השינה. כששואלים אותך How are you? (מה שלומך?) עונים: I am fine, thank you. כשנפרדים אומרים Goodbye. ואל תשכחי: please = בבקשה, thank you = תודה, sorry = סליחה.",
    examples: [
      { en: "Good morning! How are you?", he: "בוקר טוב! מה שלומך?" },
      { en: "I am fine, thank you.", he: "אני בסדר, תודה." },
      { en: "Water, please.", he: "מים, בבקשה." },
      { en: "Sorry!", he: "סליחה!" },
      { en: "Good night, Mom.", he: "לילה טוב, אמא." },
    ],
  },
  exercises: (ex) => [
    ex.matchPairs(
      {
        pairs: [
          { en: "hello", he: "שלום" },
          { en: "goodbye", he: "להתראות" },
          { en: "good morning", he: "בוקר טוב" },
          { en: "good night", he: "לילה טוב" },
        ],
      },
      { explanationHe: "hello = שלום, goodbye = להתראות, good morning = בוקר טוב, good night = לילה טוב.", vocabIds: ["hello", "goodbye", "good-morning", "good-night"] },
    ),
    ex.matchPairs(
      {
        pairs: [
          { en: "please", he: "בבקשה" },
          { en: "thank you", he: "תודה" },
          { en: "sorry", he: "סליחה" },
          { en: "yes", he: "כן" },
          { en: "no", he: "לא" },
        ],
      },
      { explanationHe: "please = בבקשה, thank you = תודה, sorry = סליחה, yes = כן, no = לא.", vocabIds: ["please", "thank-you", "sorry", "yes", "no"] },
    ),
    ex.chooseInContext(
      { contextHe: "השעה שבע בבוקר ואת פוגשת את אבא במטבח.", questionEn: "___, Dad!", options: ["Good morning", "Good night", "Goodbye"], correct: "Good morning" },
      { explanationHe: "בבוקר אומרים Good morning. Good night אומרים רק לפני השינה, ו-Goodbye כשנפרדים.", hintsHe: ["morning = בוקר."], vocabIds: ["good-morning"], skillTags: ["vocabulary", "reading"] },
    ),
    ex.chooseInContext(
      { contextEn: "It is late. I go to sleep.", contextHe: "מאוחר. אני הולכת לישון.", questionEn: "___, Mom!", options: ["Good night", "Good morning", "Hello"], correct: "Good night" },
      { explanationHe: "לפני השינה אומרים Good night (לילה טוב).", vocabIds: ["good-night", "sleep"], skillTags: ["vocabulary", "reading"] },
    ),
    ex.dialogue(
      {
        situationHe: "את פוגשת את המורה בבוקר בכניסה לבית הספר.",
        lines: [
          { speaker: "A", en: "Good morning, Noa! How are you?", he: "בוקר טוב, נועה! מה שלומך?" },
          { speaker: "B", en: "Good morning! I am fine, thank you.", he: "בוקר טוב! אני בסדר, תודה." },
          { speaker: "A", en: "Great! See you in class.", he: "יופי! נתראה בכיתה." },
        ],
        userTurnIndex: 1,
        options: ["Good morning! I am fine, thank you.", "Good night! I am fine, thank you.", "Goodbye! Thank you very much."],
      },
      { explanationHe: "על How are you? עונים I am fine, thank you. ובבוקר מברכים בחזרה Good morning, לא Good night.", hintsHe: ["זה בוקר, והמורה שאלה מה שלומך."], vocabIds: ["good-morning", "how-are-you", "thank-you"] },
    ),
    ex.dialogue(
      {
        situationHe: "במסדרון נתקלת בטעות בילד.",
        lines: [
          { speaker: "A", en: "Ouch!", he: "אאוץ'!" },
          { speaker: "B", en: "Sorry!", he: "סליחה!" },
          { speaker: "A", en: "It's OK.", he: "זה בסדר." },
        ],
        userTurnIndex: 1,
        options: ["Sorry!", "Thank you!", "Yes!"],
      },
      { explanationHe: "כשעושים למישהו משהו לא נעים בטעות אומרים Sorry (סליחה). Thank you אומרים כשמקבלים משהו.", vocabIds: ["sorry"] },
    ),
    ex.listenSentence(
      { audioText: "Hello! How are you? I am fine, thank you.", transcript: "Hello! How are you? I am fine, thank you.", transcriptHe: "שלום! מה שלומך? אני בסדר, תודה.", questionHe: "מה שלום הדוברת?", options: ["טוב", "עייפה", "עצובה"], correct: "טוב" },
      { explanationHe: "שמעת I am fine. fine = טוב, בסדר.", hintsHe: ["הקשיבי למילה שאחרי I am."], vocabIds: ["how-are-you", "hello"] },
    ),
    ex.sentenceBuilder(
      { sentence: "How are you today?", translationHe: "מה שלומך היום?", extraWords: ["is", "am"] },
      { explanationHe: "השאלה הקבועה היא How are you, ואפשר להוסיף today בסוף: How are you today?", hintsHe: ["מתחילים ב-How."], vocabIds: ["how-are-you", "today"] },
    ),
    ex.fillBlank(
      { sentence: "Water, ___.", translationHe: "מים, בבקשה.", bank: ["please", "sorry", "goodbye"], correct: "please" },
      { explanationHe: "כשמבקשים משהו מוסיפים please (בבקשה) בסוף: Water, please.", vocabIds: ["please", "water"], skillTags: ["vocabulary", "writing"] },
    ),
    ex.fillBlank(
      { sentence: "___ you very much!", translationHe: "תודה רבה לך!", bank: ["Thank", "Please", "Sorry"], correct: "Thank" },
      { explanationHe: "תודה = Thank you. כשרוצים להגיד 'תודה רבה' אומרים Thank you very much.", hintsHe: ["הצירוף הוא ___ you. איזו מילה הולכת עם you?"], vocabIds: ["thank-you", "very"], skillTags: ["vocabulary", "writing"] },
    ),
    ex.chooseTranslation(
      { questionEn: "Goodbye! See you tomorrow.", options: ["להתראות! נתראה מחר.", "שלום! מה שלומך?", "לילה טוב! נתראה מחר.", "בוקר טוב! נתראה היום."], correct: "להתראות! נתראה מחר." },
      { explanationHe: "Goodbye = להתראות, tomorrow = מחר. See you tomorrow = נתראה מחר.", vocabIds: ["goodbye", "tomorrow"] },
    ),
    ex.chooseWord(
      { questionHe: "לילה טוב", pictureVocabId: "good-night", options: ["good night", "good morning", "goodbye"], correct: "good night" },
      { explanationHe: "לילה טוב = good night. night = לילה, morning = בוקר.", vocabIds: ["good-night"] },
    ),
    ex.readRecord(
      { text: "Hello! How are you? I am fine, thank you.", translationHe: "שלום! מה שלומך? אני בסדר, תודה." },
      { explanationHe: "קראי בקול וברור: Hello! How are you? I am fine, thank you. בשאלה הקול עולה בסוף.", vocabIds: ["hello", "how-are-you", "thank-you"] },
    ),
  ],
});

const l2 = defineLesson({
  id: "w4-l2",
  titleHe: "מציגה את עצמי",
  titleEn: "Introducing Myself",
  worldId: "w4",
  unitId: "w4u1",
  order: 2,
  level: 2,
  learningObjectives: ["להגיד איך קוראים לי, בת כמה אני ומאיפה אני", "להגיד מה אני אוהבת", "להגיד נעים להכיר"],
  vocabIds: ["my-name-is", "like", "i", "hello", "pizza"],
  intro: {
    titleHe: "נעים להכיר!",
    bodyHe: "כשמכירים מישהו חדש אומרים ארבעה דברים: My name is... (קוראים לי...), I am ten (אני בת עשר; לא אומרים 'בת', רק I am + מספר), I am from Israel (אני מישראל) ו-I like... (אני אוהבת...). ובסוף: Nice to meet you! (נעים להכיר!).",
    examples: [
      { en: "My name is Alma.", he: "קוראים לי אלמה." },
      { en: "I am eleven.", he: "אני בת אחת עשרה." },
      { en: "I am from Israel.", he: "אני מישראל." },
      { en: "I like pizza and music.", he: "אני אוהבת פיצה ומוזיקה." },
      { en: "Nice to meet you!", he: "נעים להכיר!" },
    ],
  },
  exercises: (ex) => [
    ex.sentenceBuilder(
      { sentence: "My name is Dana.", translationHe: "קוראים לי דנה.", extraWords: ["am"] },
      { explanationHe: "'קוראים לי' באנגלית זה My name is (מילה במילה: 'השם שלי הוא'). לכן: My name is Dana.", hintsHe: ["מתחילים ב-My name."], vocabIds: ["my-name-is"] },
    ),
    ex.fillBlank(
      { sentence: "I ___ eleven.", translationHe: "אני בת אחת עשרה.", bank: ["am", "is", "are"], correct: "am" },
      { explanationHe: "גיל אומרים עם to be: I am + מספר. עם I תמיד am: I am eleven.", vocabIds: ["i"] },
    ),
    ex.fillBlank(
      { sentence: "I am ___ Israel.", translationHe: "אני מישראל.", bank: ["from", "in", "to"], correct: "from" },
      { explanationHe: "'מ-' (מאיפה אני) באנגלית זה from: I am from Israel. in = בתוך, to = אל.", hintsHe: ["המילה אומרת מאיפה באת."] },
    ),
    ex.chooseInContext(
      { questionEn: "I ___ pizza and ice cream.", options: ["like", "likes", "am like"], correct: "like" },
      { explanationHe: "עם I אומרים like בלי s: I like pizza. likes הולך רק עם he, she, it.", hintsHe: ["עם I הפועל נשאר כמו שהוא."], vocabIds: ["like", "pizza", "ice-cream"] },
    ),
    ex.dialogue(
      {
        situationHe: "ילדה חדשה בכיתה ניגשת אלייך בהפסקה.",
        lines: [
          { speaker: "A", en: "Hello! My name is Maya. What is your name?", he: "שלום! קוראים לי מאיה. איך קוראים לך?" },
          { speaker: "B", en: "Hi! My name is Noa. Nice to meet you!", he: "היי! קוראים לי נועה. נעים להכיר!" },
          { speaker: "A", en: "Nice to meet you too!", he: "נעים להכיר גם אותך!" },
        ],
        userTurnIndex: 1,
        options: ["Hi! My name is Noa. Nice to meet you!", "Hi! I am from Israel. Goodbye!", "Yes, I am ten. Thank you!"],
      },
      { explanationHe: "מאיה שאלה What is your name? אז עונים עם My name is... ומוסיפים Nice to meet you.", hintsHe: ["השאלה הייתה על השם שלך."], vocabIds: ["my-name-is", "hello"] },
    ),
    ex.dialogue(
      {
        situationHe: "את מכירה חבר חדש בפארק.",
        lines: [
          { speaker: "A", en: "Nice to meet you! Where are you from?", he: "נעים להכיר! מאיפה את?" },
          { speaker: "B", en: "I am from Israel.", he: "אני מישראל." },
          { speaker: "A", en: "Cool! I am from Israel too.", he: "מגניב! גם אני מישראל." },
        ],
        userTurnIndex: 1,
        options: ["I am from Israel.", "I am ten.", "My name is Israel."],
      },
      { explanationHe: "Where are you from? = מאיפה את? עונים: I am from Israel. (I am ten זו תשובה לשאלה על גיל.)", hintsHe: ["Where = איפה, from = מ-."], vocabIds: ["where", "i"] },
    ),
    ex.matchPairs(
      {
        pairs: [
          { en: "My name is", he: "קוראים לי" },
          { en: "I am ten", he: "אני בת עשר" },
          { en: "I am from Israel", he: "אני מישראל" },
          { en: "Nice to meet you", he: "נעים להכיר" },
          { en: "I like cats", he: "אני אוהבת חתולים" },
        ],
      },
      { explanationHe: "My name is = קוראים לי, I am ten = אני בת עשר, I am from Israel = אני מישראל, Nice to meet you = נעים להכיר, I like cats = אני אוהבת חתולים.", vocabIds: ["my-name-is", "like", "ten", "cat"], skillTags: ["vocabulary", "reading"] },
    ),
    ex.listenSentence(
      { audioText: "Hi! My name is Tom. I am ten. I am from Israel. I like football.", transcript: "Hi! My name is Tom. I am ten. I am from Israel. I like football.", transcriptHe: "היי! קוראים לי טום. אני בן עשר. אני מישראל. אני אוהב כדורגל.", questionHe: "בן כמה טום?", options: ["עשר", "אחת עשרה", "תשע"], correct: "עשר" },
      { explanationHe: "שמעת I am ten. ten = עשר.", hintsHe: ["הקשיבי למספר שאחרי I am."], vocabIds: ["ten", "my-name-is"] },
    ),
    ex.chooseTranslation(
      { questionEn: "Nice to meet you!", options: ["נעים להכיר!", "מה שלומך?", "קוראים לי נועה.", "להתראות!"], correct: "נעים להכיר!" },
      { explanationHe: "Nice to meet you = נעים להכיר. אומרים את זה כשפוגשים מישהו בפעם הראשונה.", vocabIds: ["nice"] },
    ),
    ex.chooseTranslation(
      { questionEn: "I am from Israel and I like music.", options: ["אני מישראל ואני אוהבת מוזיקה.", "אני מישראל ואני אוהבת פיצה.", "אני בת עשר ואני אוהבת מוזיקה.", "היא מישראל והיא אוהבת מוזיקה."], correct: "אני מישראל ואני אוהבת מוזיקה." },
      { explanationHe: "I am from Israel = אני מישראל, I like music = אני אוהבת מוזיקה. and = ו-.", vocabIds: ["like", "and"] },
    ),
    ex.chooseInContext(
      { contextEn: "What is your name?", contextHe: "איך קוראים לך?", questionEn: "___ is Dana.", options: ["My name", "I name", "Me name"], correct: "My name" },
      { explanationHe: "'השם שלי' = My name. לכן: My name is Dana. לא אומרים I name או Me name.", vocabIds: ["my-name-is"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Nice to meet you.", translationHe: "נעים להכיר.", extraWords: ["am"] },
      { explanationHe: "זה ביטוי קבוע, תמיד באותו סדר: Nice to meet you.", vocabIds: ["nice", "you"] },
    ),
    ex.readRecord(
      { text: "Hello! My name is Alma. I am eleven. I am from Israel.", translationHe: "שלום! קוראים לי אלמה. אני בת אחת עשרה. אני מישראל." },
      { explanationHe: "קראי לאט, משפט אחרי משפט: Hello! My name is Alma. I am eleven. I am from Israel. אפשר להחליף לשם שלך.", vocabIds: ["hello", "my-name-is", "i"] },
    ),
  ],
});

const l3 = defineLesson({
  id: "w4-l3",
  titleHe: "שאלות ותשובות: עליי ועל חברים",
  titleEn: "Questions and Answers: Me and My Friends",
  worldId: "w4",
  unitId: "w4u1",
  order: 3,
  level: 2,
  learningObjectives: ["לשאול ולענות: How old are you? Where are you from?", "לשאול מה הצבע האהוב", "לענות על Do you like...? עם Yes, I do / No, I don't"],
  vocabIds: ["how", "where", "what", "friend", "like", "blue", "yes", "no"],
  intro: {
    titleHe: "שואלים ועונים",
    bodyHe: "שלוש שאלות חשובות: How old are you? (בת כמה את?) עונים I am ten. Where are you from? (מאיפה את?) עונים I am from Israel. What is your favorite color? (מה הצבע האהוב עלייך?) עונים My favorite color is blue. ועוד אחת: Do you like pizza? (את אוהבת פיצה?) עונים Yes, I do. או No, I don't.",
    examples: [
      { en: "How old are you? I am ten.", he: "בת כמה את? אני בת עשר." },
      { en: "Where are you from? I am from Israel.", he: "מאיפה את? אני מישראל." },
      { en: "What is your favorite color? Blue.", he: "מה הצבע האהוב עלייך? כחול." },
      { en: "Do you like cats? Yes, I do.", he: "את אוהבת חתולים? כן." },
      { en: "Do you like fish? No, I don't.", he: "את אוהבת דגים? לא." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "___ old are you?", options: ["How", "What", "Where"], correct: "How" },
      { explanationHe: "'בת כמה את?' זה תמיד How old are you? הצירוף How old הולך ביחד.", hintsHe: ["הצירוף הקבוע הוא How old."], vocabIds: ["how"] },
    ),
    ex.chooseInContext(
      { questionEn: "___ are you from?", options: ["Where", "How", "Who"], correct: "Where" },
      { explanationHe: "שואלים על מקום (מאיפה?), ואיפה = Where. לכן: Where are you from?", vocabIds: ["where"] },
    ),
    ex.chooseInContext(
      { questionEn: "___ is your favorite color?", options: ["What", "Where", "How"], correct: "What" },
      { explanationHe: "'מה הצבע האהוב עלייך?' מתחיל ב-What (מה): What is your favorite color?", hintsHe: ["מה = What."], vocabIds: ["what"] },
    ),
    ex.chooseInContext(
      { contextEn: "Do you like pizza?", contextHe: "את אוהבת פיצה?", questionEn: "___", options: ["Yes, I do.", "Yes, I am.", "Yes, I like."], correct: "Yes, I do." },
      { explanationHe: "שאלה שמתחילה ב-Do מקבלת תשובה עם do: Yes, I do. (Yes, I am עונים רק על שאלה שמתחילה ב-Are.)", hintsHe: ["השאלה מתחילה ב-Do, אז גם התשובה עם do."], vocabIds: ["yes", "like", "pizza"] },
    ),
    ex.chooseInContext(
      { contextEn: "Do you like cats?", contextHe: "את אוהבת חתולים?", questionEn: "___", options: ["No, I don't.", "No, I am not.", "No, I not."], correct: "No, I don't." },
      { explanationHe: "תשובה שלילית לשאלת Do היא No, I don't (don't = do not).", vocabIds: ["no", "like", "cat"] },
    ),
    ex.dialogue(
      {
        situationHe: "חברה חדשה מתעניינת בך.",
        lines: [
          { speaker: "A", en: "How old are you?", he: "בת כמה את?" },
          { speaker: "B", en: "I am eleven.", he: "אני בת אחת עשרה." },
          { speaker: "A", en: "Me too!", he: "גם אני!" },
        ],
        userTurnIndex: 1,
        options: ["I am eleven.", "I am from Israel.", "I am fine, thank you."],
      },
      { explanationHe: "How old are you? שואל על גיל, אז עונים I am + מספר: I am eleven.", hintsHe: ["How old = בת כמה."], vocabIds: ["how"] },
    ),
    ex.dialogue(
      {
        situationHe: "בהפסקה חבר שואל אותך על כדורגל.",
        lines: [
          { speaker: "A", en: "Do you like football?", he: "את אוהבת כדורגל?" },
          { speaker: "B", en: "Yes, I do! I like football.", he: "כן! אני אוהבת כדורגל." },
          { speaker: "A", en: "Great! Let's play.", he: "יופי! בואי נשחק." },
        ],
        userTurnIndex: 1,
        options: ["Yes, I do! I like football.", "Yes, I am! I like football.", "No, I am not football."],
      },
      { explanationHe: "על Do you like...? עונים Yes, I do. אחר כך אפשר להוסיף I like football.", vocabIds: ["yes", "like", "play"] },
    ),
    ex.sentenceBuilder(
      { sentence: "What is your favorite color?", translationHe: "מה הצבע האהוב עלייך?", extraWords: ["are"] },
      { explanationHe: "מתחילים ב-What, ואז is (כי color הוא יחיד): What is your favorite color?", hintsHe: ["מה = What. אחרי what באה is."], vocabIds: ["what"] },
    ),
    ex.matchPairs(
      {
        pairs: [
          { en: "How old are you?", he: "בת כמה את?" },
          { en: "Where are you from?", he: "מאיפה את?" },
          { en: "What is your favorite color?", he: "מה הצבע האהוב עלייך?" },
          { en: "Do you like cats?", he: "את אוהבת חתולים?" },
        ],
      },
      { explanationHe: "How old = בת כמה, Where... from = מאיפה, What... color = איזה צבע, Do you like = את אוהבת.", vocabIds: ["how", "where", "what", "like"], skillTags: ["reading", "grammar"] },
    ),
    ex.listenSentence(
      { audioText: "My friend is Dana. She is ten and she likes blue.", transcript: "My friend is Dana. She is ten and she likes blue.", transcriptHe: "החברה שלי היא דנה. היא בת עשר והיא אוהבת כחול.", questionHe: "איזה צבע דנה אוהבת?", options: ["כחול", "אדום", "ירוק"], correct: "כחול" },
      { explanationHe: "שמעת she likes blue. blue = כחול.", hintsHe: ["הקשיבי למילה האחרונה במשפט."], vocabIds: ["friend", "blue", "like"] },
    ),
    ex.fillBlank(
      { sentence: "My favorite ___ is green.", translationHe: "הצבע האהוב עליי הוא ירוק.", bank: ["color", "name", "friend"], correct: "color" },
      { explanationHe: "green הוא צבע, לכן המילה החסרה היא color: My favorite color is green.", vocabIds: ["green"], skillTags: ["vocabulary", "reading"] },
    ),
    ex.chooseTranslation(
      { questionEn: "Do you like ice cream? Yes, I do!", options: ["את אוהבת גלידה? כן!", "את אוהבת פיצה? כן!", "את רוצה גלידה? לא.", "היא אוהבת גלידה? כן!"], correct: "את אוהבת גלידה? כן!" },
      { explanationHe: "Do you like = את אוהבת, ice cream = גלידה, Yes, I do = כן.", vocabIds: ["like", "ice-cream", "yes"] },
    ),
    ex.readRecord(
      { text: "How old are you? I am eleven. Where are you from? I am from Israel.", translationHe: "בת כמה את? אני בת אחת עשרה. מאיפה את? אני מישראל." },
      { explanationHe: "קראי את השאלה ואת התשובה. בשאלות הקול עולה בסוף.", vocabIds: ["how", "where"] },
    ),
  ],
});

const l4 = defineLesson({
  id: "w4-l4",
  titleHe: "מבקשת עזרה ובחנות",
  titleEn: "Asking for Help and at the Shop",
  worldId: "w4",
  unitId: "w4u2",
  order: 4,
  level: 2,
  learningObjectives: ["לבקש עזרה בנימוס: Can you help me, please?", "לשאול כמה משהו עולה: How much is it?", "להגיד מה אני רוצה ולהגיב ב-Here you are ו-Thank you"],
  vocabIds: ["help", "want", "shop", "please", "thank-you", "hat", "bag"],
  intro: {
    titleHe: "בבקשה ותודה בחנות",
    bodyHe: "כשצריך עזרה אומרים Can you help me, please? (את יכולה לעזור לי, בבקשה?). בחנות שואלים How much is it? (כמה זה עולה?) ואומרים I want... (אני רוצה...). כשנותנים משהו אומרים Here you are (בבקשה, קחי), ומי שמקבל עונה Thank you.",
    examples: [
      { en: "Can you help me, please?", he: "את יכולה לעזור לי, בבקשה?" },
      { en: "How much is it?", he: "כמה זה עולה?" },
      { en: "I want a blue hat.", he: "אני רוצה כובע כחול." },
      { en: "Here you are.", he: "בבקשה, קחי." },
      { en: "Thank you!", he: "תודה!" },
    ],
  },
  exercises: (ex) => [
    ex.matchPairs(
      {
        pairs: [
          { en: "Can you help me?", he: "את יכולה לעזור לי?" },
          { en: "How much is it?", he: "כמה זה עולה?" },
          { en: "I want a hat.", he: "אני רוצה כובע." },
          { en: "Here you are.", he: "בבקשה, קחי." },
          { en: "Thank you.", he: "תודה." },
        ],
      },
      { explanationHe: "help = לעזור, How much = כמה (עולה), want = לרצות, Here you are = בבקשה (כשנותנים משהו), Thank you = תודה.", vocabIds: ["help", "want", "hat", "thank-you"], skillTags: ["vocabulary", "reading"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Can you help me, please?", translationHe: "את יכולה לעזור לי, בבקשה?", extraWords: ["Is"] },
      { explanationHe: "בקשה מנומסת מתחילה ב-Can you, ואחר כך הפועל: Can you help me, please?", hintsHe: ["מתחילים ב-Can you."], vocabIds: ["help", "please"] },
    ),
    ex.sentenceBuilder(
      { sentence: "How much is it?", translationHe: "כמה זה עולה?", extraWords: ["are", "What"] },
      { explanationHe: "'כמה זה עולה' זה ביטוי קבוע: How much is it? (עם is, כי it הוא יחיד).", vocabIds: ["how", "it"] },
    ),
    ex.fillBlank(
      { sentence: "I ___ a new bag.", translationHe: "אני רוצה תיק חדש.", bank: ["want", "wants", "wanting"], correct: "want" },
      { explanationHe: "אני רוצה = I want. עם I הפועל בלי s: I want a new bag.", vocabIds: ["want", "new", "bag"] },
    ),
    ex.fillBlank(
      { sentence: "How ___ is it?", translationHe: "כמה זה עולה?", bank: ["much", "many", "what"], correct: "much" },
      { explanationHe: "כששואלים על מחיר אומרים How much: How much is it?", hintsHe: ["הצירוף הקבוע למחיר הוא How much."], vocabIds: ["how"] },
    ),
    ex.dialogue(
      {
        situationHe: "את בחנות ורוצה לקנות כובע.",
        lines: [
          { speaker: "A", en: "Hello! Can I help you?", he: "שלום! אפשר לעזור לך?" },
          { speaker: "B", en: "Yes, please. How much is the hat?", he: "כן, בבקשה. כמה עולה הכובע?" },
          { speaker: "A", en: "It is ten shekels.", he: "זה עשרה שקלים." },
          { speaker: "B", en: "OK. Here you are.", he: "בסדר. בבקשה, קח." },
          { speaker: "A", en: "Thank you!", he: "תודה!" },
        ],
        userTurnIndex: 1,
        options: ["Yes, please. How much is the hat?", "No, I am a hat.", "Good night. Here you are."],
      },
      { explanationHe: "המוכר מציע עזרה, אז עונים Yes, please ושואלים על המחיר: How much is the hat?", hintsHe: ["את רוצה לדעת כמה הכובע עולה."], vocabIds: ["help", "please", "hat", "shop"] },
    ),
    ex.dialogue(
      {
        situationHe: "את לא מוצאת את הכיתה החדשה ופונה למורה במסדרון.",
        lines: [
          { speaker: "A", en: "Hi! Are you OK?", he: "היי! הכול בסדר?" },
          { speaker: "B", en: "Can you help me, please? Where is room five?", he: "את יכולה לעזור לי, בבקשה? איפה כיתה חמש?" },
          { speaker: "A", en: "Sure. It is over there.", he: "בטח. היא שם." },
          { speaker: "B", en: "Thank you!", he: "תודה!" },
        ],
        userTurnIndex: 1,
        options: ["Can you help me, please? Where is room five?", "Yes, I am room five.", "Thank you. I want a room."],
      },
      { explanationHe: "כשצריך עזרה מבקשים: Can you help me, please? ואז שואלים את השאלה: Where is room five?", vocabIds: ["help", "where", "five"] },
    ),
    ex.chooseInContext(
      { contextHe: "המוכר נותן לך את התיק. מה הוא אומר?", questionEn: "Shopkeeper: ___", options: ["Here you are.", "How much is it?", "Can you help me?"], correct: "Here you are." },
      { explanationHe: "כשנותנים משהו למישהו אומרים Here you are (בבקשה, קח). How much is it שואל הקונה, לא המוכר.", vocabIds: ["shop", "bag"], skillTags: ["reading", "speaking"] },
    ),
    ex.chooseInContext(
      { questionEn: "I ___ ice cream, please.", contextHe: "אני רוצה גלידה, בבקשה.", options: ["want", "wants", "am want"], correct: "want" },
      { explanationHe: "I + want (בלי s ובלי am): I want ice cream, please.", vocabIds: ["want", "ice-cream"] },
    ),
    ex.listenSentence(
      { audioText: "Hello! I want a blue hat, please. How much is it? It is ten shekels.", transcript: "Hello! I want a blue hat, please. How much is it? It is ten shekels.", transcriptHe: "שלום! אני רוצה כובע כחול, בבקשה. כמה זה עולה? זה עשרה שקלים.", questionHe: "כמה עולה הכובע?", options: ["עשרה שקלים", "חמישה שקלים", "שני שקלים"], correct: "עשרה שקלים" },
      { explanationHe: "שמעת It is ten shekels. ten = עשר.", hintsHe: ["הקשיבי למספר בסוף."], vocabIds: ["hat", "ten", "want"] },
    ),
    ex.chooseTranslation(
      { questionEn: "Can you help me, please?", options: ["את יכולה לעזור לי, בבקשה?", "כמה זה עולה, בבקשה?", "אני רוצה עזרה, תודה.", "את רוצה לעזור לי?"], correct: "את יכולה לעזור לי, בבקשה?" },
      { explanationHe: "Can you = את יכולה, help me = לעזור לי, please = בבקשה.", vocabIds: ["help", "please"] },
    ),
    ex.fillBlank(
      { sentence: "___ you are.", translationHe: "בבקשה, קחי.", bank: ["Here", "Where", "What"], correct: "Here" },
      { explanationHe: "כשמושיטים משהו אומרים Here you are. Here = כאן, הנה.", hintsHe: ["Where זו שאלה, ואנחנו לא שואלות."], skillTags: ["vocabulary", "writing"] },
    ),
    ex.readRecord(
      { text: "Hello! Can you help me, please? How much is it?", translationHe: "שלום! את יכולה לעזור לי, בבקשה? כמה זה עולה?" },
      { explanationHe: "קראי בנימוס ובקול ברור: Hello! Can you help me, please? How much is it?", vocabIds: ["hello", "help", "please"] },
    ),
  ],
});

const l5 = defineLesson({
  id: "w4-l5",
  titleHe: "מזמינה אוכל ומדברת עם חברים",
  titleEn: "Ordering Food and Talking with Friends",
  worldId: "w4",
  unitId: "w4u2",
  order: 5,
  level: 2,
  learningObjectives: ["להזמין אוכל ושתייה: I want... / Can I have...?", "להציע לחברים לשחק: Let's play! Do you want to play?", "להכיר מילים של אוכל ומשחק"],
  vocabIds: ["pizza", "water", "juice", "ice-cream", "play", "game", "friend", "want"],
  intro: {
    titleHe: "מה את רוצה?",
    bodyHe: "כשמזמינים אוכל אומרים I want pizza, please (אני רוצה פיצה, בבקשה) או בנימוס: Can I have water? (אפשר לקבל מים?). עם חברים מציעים: Let's play! (בואו נשחק!) ושואלים: Do you want to play? (את רוצה לשחק?).",
    examples: [
      { en: "I want pizza, please.", he: "אני רוצה פיצה, בבקשה." },
      { en: "Can I have water?", he: "אפשר לקבל מים?" },
      { en: "Let's play!", he: "בואו נשחק!" },
      { en: "Do you want to play a game?", he: "את רוצה לשחק משחק?" },
      { en: "Yes! Let's play with my friend.", he: "כן! בואו נשחק עם החברה שלי." },
    ],
  },
  exercises: (ex) => [
    ex.matchPairs(
      {
        pairs: [
          { en: "pizza", he: "פיצה" },
          { en: "water", he: "מים" },
          { en: "juice", he: "מיץ" },
          { en: "ice cream", he: "גלידה" },
          { en: "game", he: "משחק" },
        ],
      },
      { explanationHe: "pizza = פיצה, water = מים, juice = מיץ, ice cream = גלידה, game = משחק.", vocabIds: ["pizza", "water", "juice", "ice-cream", "game"] },
    ),
    ex.sentenceBuilder(
      { sentence: "I want pizza, please.", translationHe: "אני רוצה פיצה, בבקשה.", extraWords: ["have"] },
      { explanationHe: "אני רוצה = I want. אחרי want באה המילה של האוכל, ו-please בסוף: I want pizza, please.", hintsHe: ["מתחילים ב-I want."], vocabIds: ["want", "pizza", "please"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Can I have water?", translationHe: "אפשר לקבל מים?", extraWords: ["Is", "am"] },
      { explanationHe: "בקשה מנומסת: Can I have + מה שרוצים. לכן: Can I have water?", hintsHe: ["מתחילים ב-Can I."], vocabIds: ["have", "water"] },
    ),
    ex.fillBlank(
      { sentence: "Can I ___ juice, please?", translationHe: "אפשר לקבל מיץ, בבקשה?", bank: ["have", "has", "am"], correct: "have" },
      { explanationHe: "אחרי Can הפועל תמיד בצורה הבסיסית: Can I have (לא has).", vocabIds: ["have", "juice"] },
    ),
    ex.chooseInContext(
      { questionEn: "Do you ___ to play?", contextHe: "את רוצה לשחק?", options: ["want", "wants", "wanting"], correct: "want" },
      { explanationHe: "עם you אומרים want בלי s: Do you want to play?", vocabIds: ["want", "play"] },
    ),
    ex.dialogue(
      {
        situationHe: "את במסעדה והמלצר שואל מה את רוצה.",
        lines: [
          { speaker: "A", en: "Hello! What do you want?", he: "שלום! מה את רוצה?" },
          { speaker: "B", en: "I want pizza and juice, please.", he: "אני רוצה פיצה ומיץ, בבקשה." },
          { speaker: "A", en: "OK. Here you are.", he: "בסדר. בבקשה." },
          { speaker: "B", en: "Thank you!", he: "תודה!" },
        ],
        userTurnIndex: 1,
        options: ["I want pizza and juice, please.", "I am pizza and juice.", "Yes, I do. Goodbye!"],
      },
      { explanationHe: "What do you want? = מה את רוצה? עונים I want + האוכל, ובסוף please.", hintsHe: ["עונים עם I want."], vocabIds: ["want", "pizza", "juice"] },
    ),
    ex.dialogue(
      {
        situationHe: "אחרי בית הספר חברה באה לבקר.",
        lines: [
          { speaker: "A", en: "Hi! Do you want to play a game?", he: "היי! את רוצה לשחק משחק?" },
          { speaker: "B", en: "Yes! Let's play!", he: "כן! בואי נשחק!" },
          { speaker: "A", en: "Great! I have a new game.", he: "יופי! יש לי משחק חדש." },
        ],
        userTurnIndex: 1,
        options: ["Yes! Let's play!", "Yes! I am a game.", "No, thank you. I want water."],
      },
      { explanationHe: "אם רוצים לשחק עונים Yes! ומוסיפים Let's play! (בואי נשחק).", vocabIds: ["yes", "play", "game"] },
    ),
    ex.chooseInContext(
      { contextEn: "Do you want ice cream?", contextHe: "את רוצה גלידה?", questionEn: "___", options: ["Yes, please!", "Yes, I want.", "Yes, I am."], correct: "Yes, please!" },
      { explanationHe: "כשמציעים לך משהו ואת רוצה, עונים בנימוס Yes, please! (או No, thank you אם לא).", hintsHe: ["התשובה המנומסת כוללת את המילה please."], vocabIds: ["yes", "please", "ice-cream"], skillTags: ["reading", "speaking"] },
    ),
    ex.listenSentence(
      { audioText: "I want ice cream and water, please.", transcript: "I want ice cream and water, please.", transcriptHe: "אני רוצה גלידה ומים, בבקשה.", questionHe: "מה הילדה רוצה?", options: ["גלידה ומים", "פיצה ומיץ", "גלידה ומיץ"], correct: "גלידה ומים" },
      { explanationHe: "שמעת ice cream and water. ice cream = גלידה, water = מים.", hintsHe: ["הקשיבי לשתי המילים שאחרי want."], vocabIds: ["ice-cream", "water", "want"] },
    ),
    ex.chooseTranslation(
      { questionEn: "Let's play a game!", options: ["בואו נשחק משחק!", "אני רוצה לשחק משחק.", "את רוצה לשחק?", "בואו נאכל פיצה!"], correct: "בואו נשחק משחק!" },
      { explanationHe: "Let's = בואו (הצעה לעשות משהו ביחד), play a game = לשחק משחק.", vocabIds: ["play", "game"] },
    ),
    ex.chooseTranslation(
      { questionEn: "Can I have water, please?", options: ["אפשר לקבל מים, בבקשה?", "אפשר לקבל מיץ, בבקשה?", "אני רוצה מים, תודה.", "את רוצה מים?"], correct: "אפשר לקבל מים, בבקשה?" },
      { explanationHe: "Can I have = אפשר לקבל, water = מים, please = בבקשה.", vocabIds: ["water", "please"] },
    ),
    ex.chooseWord(
      { questionHe: "מיץ", pictureVocabId: "juice", options: ["juice", "water", "milk"], correct: "juice" },
      { explanationHe: "מיץ = juice. water = מים, milk = חלב.", vocabIds: ["juice"] },
    ),
    ex.readRecord(
      { text: "Can I have pizza and juice, please? Thank you!", translationHe: "אפשר לקבל פיצה ומיץ, בבקשה? תודה!" },
      { explanationHe: "קראי בנימוס: Can I have pizza and juice, please? Thank you!", vocabIds: ["pizza", "juice", "please", "thank-you"] },
    ),
  ],
});

export const WORLD4_LESSONS: Lesson[] = [l1, l2, l3, l4, l5];
