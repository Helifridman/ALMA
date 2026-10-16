import { defineLesson } from "../builders";
import type { Lesson } from "@/lib/types";

/**
 * World 3 – Build a Sentence (level 2).
 * Pronouns, the verb "to be", negatives and questions, a / an and plurals,
 * have / has, question words and basic prepositions.
 * Each lesson teaches one small grammar idea and drills it in context.
 */

const l1 = defineLesson({
  id: "w3-l1",
  titleHe: "כינויי גוף: I, you, he, she, it, we, they",
  titleEn: "Pronouns: I, you, he, she, it, we, they",
  worldId: "w3",
  unitId: "w3u1",
  order: 1,
  level: 2,
  learningObjectives: ["להכיר את שבעת כינויי הגוף באנגלית", "לדעת מתי משתמשים ב-he, she, it ו-they", "לזהות כינוי גוף בתוך משפט"],
  vocabIds: ["i", "you", "he", "she", "it", "we", "they"],
  intro: {
    titleHe: "מי זה מי?",
    bodyHe: "כינוי גוף הוא מילה קצרה שבאה במקום שם. he = הוא (ילד או גבר), she = היא (ילדה או אישה), it = זה (חפץ או חיה). we = אנחנו, they = הם או הן (כמה אנשים או דברים). שימי לב: I (אני) נכתבת תמיד באות גדולה.",
    examples: [
      { en: "I am Dana.", he: "אני דנה." },
      { en: "He is my brother.", he: "הוא אח שלי." },
      { en: "She is my sister.", he: "היא אחותי." },
      { en: "It is a ball.", he: "זה כדור." },
      { en: "They are at school.", he: "הם בבית הספר." },
    ],
  },
  exercises: (ex) => [
    ex.matchPairs(
      {
        pairs: [
          { en: "I", he: "אני" },
          { en: "you", he: "את / אתה" },
          { en: "he", he: "הוא" },
          { en: "she", he: "היא" },
          { en: "we", he: "אנחנו" },
          { en: "they", he: "הם / הן" },
        ],
      },
      { explanationHe: "I = אני, you = את/אתה, he = הוא, she = היא, we = אנחנו, they = הם/הן.", vocabIds: ["i", "you", "he", "she", "we", "they"], skillTags: ["vocabulary", "grammar"] },
    ),
    ex.chooseInContext(
      { contextEn: "Dana is a girl.", contextHe: "דנה היא ילדה.", questionEn: "___ is happy.", options: ["She", "He", "It"], correct: "She" },
      { explanationHe: "דנה היא ילדה, ולילדה אומרים she. לכן: She is happy.", hintsHe: ["דנה היא ילדה. איזה כינוי מתאים לילדה?"], vocabIds: ["she"] },
    ),
    ex.chooseInContext(
      { contextEn: "Tom is a boy.", contextHe: "טום הוא ילד.", questionEn: "___ is tall.", options: ["She", "He", "They"], correct: "He" },
      { explanationHe: "טום הוא ילד, ולילד אומרים he. לכן: He is tall.", hintsHe: ["לילד או לגבר משתמשים ב-he."], vocabIds: ["he"] },
    ),
    ex.chooseInContext(
      { contextEn: "This is a ball.", contextHe: "זה כדור.", questionEn: "___ is red.", options: ["He", "It", "She"], correct: "It" },
      { explanationHe: "כדור הוא חפץ, ולחפץ או לחיה אומרים it. לכן: It is red.", hintsHe: ["כדור הוא לא ילד ולא ילדה. איזה כינוי מתאים לחפץ?"], vocabIds: ["it"] },
    ),
    ex.chooseInContext(
      { contextEn: "Dan and Noa are friends.", contextHe: "דן ונועה חברים.", questionEn: "___ are at school.", options: ["He", "She", "They"], correct: "They" },
      { explanationHe: "דן ונועה הם שני אנשים. לכמה אנשים אומרים they. לכן: They are at school.", hintsHe: ["מדובר בשני אנשים, לא באחד."], vocabIds: ["they"] },
    ),
    ex.chooseInContext(
      { contextEn: "Noa and I are sisters.", contextHe: "נועה ואני אחיות.", questionEn: "___ are happy.", options: ["We", "They", "I"], correct: "We" },
      { explanationHe: "כשמדברים על 'אני ועוד מישהו' משתמשים ב-we (אנחנו). לכן: We are happy.", hintsHe: ["נועה ואני = אנחנו."], vocabIds: ["we"] },
    ),
    ex.chooseTranslation(
      { questionEn: "She is my sister.", options: ["היא אחותי.", "הוא אח שלי.", "הם החברים שלי.", "אני אחותך."], correct: "היא אחותי." },
      { explanationHe: "she = היא, sister = אחות. לכן המשפט פירושו: היא אחותי.", vocabIds: ["she", "sister"] },
    ),
    ex.chooseTranslation(
      { questionEn: "They are at school.", options: ["הם בבית הספר.", "היא בבית הספר.", "אנחנו בבית הספר.", "הוא בבית."], correct: "הם בבית הספר." },
      { explanationHe: "they = הם, school = בית ספר. לכן: הם בבית הספר.", vocabIds: ["they", "school"] },
    ),
    ex.fillBlank(
      { sentence: "___ am Dana.", translationHe: "אני דנה.", bank: ["I", "He", "She"], correct: "I" },
      { explanationHe: "אני = I. המילה I נכתבת תמיד באות גדולה, גם באמצע משפט.", hintsHe: ["המשפט מתחיל ב'אני'."], vocabIds: ["i"] },
    ),
    ex.sentenceBuilder(
      { sentence: "He is my brother.", translationHe: "הוא אח שלי.", extraWords: ["She"] },
      { explanationHe: "הוא = he. הסדר באנגלית: קודם מי (He), אחר כך is, ואז השאר: He is my brother.", hintsHe: ["אח הוא ילד, אז מתחילים ב-He."], vocabIds: ["he", "brother"] },
    ),
    ex.listenSentence(
      { audioText: "She is my sister. She is ten.", transcript: "She is my sister. She is ten.", transcriptHe: "היא אחותי. היא בת עשר.", questionHe: "על מי מדברים במשפט?", options: ["על ילדה", "על ילד", "על חפץ"], correct: "על ילדה" },
      { explanationHe: "שמעת She. את she אומרים על ילדה או אישה. He אומרים על ילד, ו-it על חפץ.", hintsHe: ["הקשיבי למילה הראשונה: she או he?"], vocabIds: ["she"] },
    ),
    ex.chooseWord(
      { questionHe: "הם / הן", pictureVocabId: "they", options: ["they", "we", "he"], correct: "they" },
      { explanationHe: "הם/הן = they. we = אנחנו, he = הוא.", vocabIds: ["they"], skillTags: ["vocabulary", "grammar"] },
    ),
    ex.readRecord(
      { text: "We are friends. They are at school.", translationHe: "אנחנו חברים. הם בבית הספר." },
      { explanationHe: "we = אנחנו, they = הם. קראי לאט וברור: We are friends. They are at school.", vocabIds: ["we", "they", "friend"] },
    ),
  ],
});

const l2 = defineLesson({
  id: "w3-l2",
  titleHe: "הפועל to be: am, is, are",
  titleEn: "The Verb to be: am, is, are",
  worldId: "w3",
  unitId: "w3u1",
  order: 2,
  level: 2,
  learningObjectives: ["לדעת מתי אומרים am, is ו-are", "לבנות משפטים פשוטים עם to be", "לזהות את הצורה הנכונה לפי כינוי הגוף"],
  vocabIds: ["i", "you", "he", "she", "it", "we", "they", "happy", "tired"],
  intro: {
    titleHe: "am, is או are?",
    bodyHe: "בעברית אומרים 'אני שמחה', אבל באנגלית חייבים להוסיף מילה קטנה: am, is או are. הכלל פשוט: עם I אומרים am. עם he, she ו-it אומרים is. עם you, we ו-they אומרים are.",
    examples: [
      { en: "I am happy.", he: "אני שמחה." },
      { en: "She is tired.", he: "היא עייפה." },
      { en: "It is a cat.", he: "זה חתול." },
      { en: "We are friends.", he: "אנחנו חברים." },
      { en: "They are at home.", he: "הם בבית." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "I ___ happy.", options: ["am", "is", "are"], correct: "am" },
      {
        explanationHe: "עם I משתמשים תמיד ב-am. לכן אומרים I am happy.",
        hintsHe: ["I היא יוצאת דופן: יש לה מילה משלה."],
        vocabIds: ["i", "happy"],
        followUp: ex.chooseInContext(
          { questionEn: "I ___ ten.", options: ["am", "is", "are"], correct: "am" },
          { explanationHe: "I הולכת תמיד עם am: I am ten.", vocabIds: ["i"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "She ___ happy.", options: ["am", "is", "are"], correct: "is" },
      {
        explanationHe: "עם she משתמשים ב-is. לכן אומרים She is happy.",
        hintsHe: ["she היא אחת (יחיד). איזו מילה הולכת עם he, she, it?"],
        vocabIds: ["she"],
        followUp: ex.chooseInContext(
          { questionEn: "He ___ tall.", options: ["am", "is", "are"], correct: "is" },
          { explanationHe: "עם he, בדיוק כמו עם she, משתמשים ב-is: He is tall.", vocabIds: ["he", "tall"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "They ___ at school.", options: ["am", "is", "are"], correct: "are" },
      {
        explanationHe: "עם they (הם) משתמשים ב-are. לכן אומרים They are at school.",
        hintsHe: ["they = כמה אנשים (רבים). עם רבים משתמשים ב-are."],
        vocabIds: ["they", "school"],
        followUp: ex.chooseInContext(
          { questionEn: "We ___ friends.", options: ["am", "is", "are"], correct: "are" },
          { explanationHe: "we = אנחנו, רבים. עם we משתמשים ב-are: We are friends.", vocabIds: ["we", "friend"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "It ___ a cat.", options: ["am", "is", "are"], correct: "is" },
      {
        explanationHe: "עם it (חפץ או חיה) משתמשים ב-is. לכן אומרים It is a cat.",
        hintsHe: ["it הולך עם אותה מילה כמו he ו-she."],
        vocabIds: ["it", "cat"],
        followUp: ex.chooseInContext(
          { questionEn: "It ___ big.", options: ["am", "is", "are"], correct: "is" },
          { explanationHe: "it הולך עם is: It is big.", vocabIds: ["it", "big"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "You ___ my friend.", options: ["am", "is", "are"], correct: "are" },
      {
        explanationHe: "עם you משתמשים תמיד ב-are, גם כשמדברים עם אדם אחד. לכן: You are my friend.",
        hintsHe: ["you הולך עם אותה מילה כמו we ו-they."],
        vocabIds: ["you", "friend"],
        followUp: ex.chooseInContext(
          { questionEn: "You ___ nice.", options: ["am", "is", "are"], correct: "are" },
          { explanationHe: "you + are, תמיד: You are nice.", vocabIds: ["you", "nice"] },
        ),
      },
    ),
    ex.fillBlank(
      { sentence: "My mother ___ a teacher.", translationHe: "אמא שלי מורה.", bank: ["is", "am", "are"], correct: "is" },
      { explanationHe: "אמא שלי = she (אחת). עם she משתמשים ב-is: My mother is a teacher.", hintsHe: ["חשבי: במקום 'my mother' אפשר להגיד she."], vocabIds: ["mother", "teacher"] },
    ),
    ex.fillBlank(
      { sentence: "The dogs ___ big.", translationHe: "הכלבים גדולים.", bank: ["are", "is", "am"], correct: "are" },
      { explanationHe: "dogs = כמה כלבים = they. עם they משתמשים ב-are: The dogs are big.", hintsHe: ["כמה כלבים יש? אחד או יותר?"], vocabIds: ["dog", "big"] },
    ),
    ex.matchPairs(
      {
        pairs: [
          { en: "I am happy.", he: "אני שמחה." },
          { en: "He is tall.", he: "הוא גבוה." },
          { en: "We are friends.", he: "אנחנו חברים." },
          { en: "It is a cat.", he: "זה חתול." },
        ],
      },
      { explanationHe: "I am, He is, We are, It is. המילה הקטנה משתנה לפי מי שמדברים עליו.", skillTags: ["grammar", "reading"] },
    ),
    ex.sentenceBuilder(
      { sentence: "She is my teacher.", translationHe: "היא המורה שלי.", extraWords: ["are"] },
      { explanationHe: "she הולכת עם is, ו-is באה מיד אחרי she: She is my teacher.", hintsHe: ["מתחילים ב-She. מה בא אחריה: is או are?"], vocabIds: ["she", "teacher"] },
    ),
    ex.sentenceBuilder(
      { sentence: "We are at school.", translationHe: "אנחנו בבית הספר.", extraWords: ["is", "am"] },
      { explanationHe: "we הולך עם are: We are at school. is ו-am לא מתאימים ל-we.", vocabIds: ["we", "school"] },
    ),
    ex.chooseTranslation(
      { questionEn: "He is ten.", options: ["הוא בן עשר.", "היא בת עשר.", "אני בן עשר.", "הם בני עשר."], correct: "הוא בן עשר." },
      { explanationHe: "he = הוא, ten = עשר. He is ten = הוא בן עשר. באנגלית לא אומרים 'בן' או 'בת', רק is + המספר.", vocabIds: ["he", "ten"] },
    ),
    ex.listenSentence(
      { audioText: "They are at the park. They are happy.", transcript: "They are at the park. They are happy.", transcriptHe: "הם בפארק. הם שמחים.", questionHe: "איפה הם?", options: ["בפארק", "בבית הספר", "בבית"], correct: "בפארק" },
      { explanationHe: "שמעת They are at the park. park = פארק.", hintsHe: ["הקשיבי למילה שאחרי at the."], vocabIds: ["they", "park"] },
    ),
    ex.readRecord(
      { text: "I am happy and you are my friend.", translationHe: "אני שמחה ואת החברה שלי." },
      { explanationHe: "I am, you are. קראי בקול: I am happy and you are my friend.", vocabIds: ["i", "you", "happy", "friend"] },
    ),
  ],
});

const l3 = defineLesson({
  id: "w3-l3",
  titleHe: "שלילה ושאלות עם to be",
  titleEn: "Negatives and Questions with to be",
  worldId: "w3",
  unitId: "w3u2",
  order: 3,
  level: 2,
  learningObjectives: ["להגיד משפט שלילי עם not", "לשאול שאלה עם Am / Is / Are בתחילת המשפט", "לענות תשובה קצרה: Yes, I am. / No, I'm not."],
  vocabIds: ["i", "you", "he", "she", "it", "yes", "no", "tired", "happy"],
  intro: {
    titleHe: "להגיד 'לא' ולשאול שאלה",
    bodyHe: "כדי להגיד 'לא', מוסיפים not אחרי am, is או are: She is not happy. אפשר גם לקצר: isn't, aren't. כדי לשאול שאלה, מחליפים סדר: המילה am / is / are עוברת לתחילת המשפט: Are you happy? עונים בקצרה: Yes, I am. / No, I'm not.",
    examples: [
      { en: "I am not tired.", he: "אני לא עייפה." },
      { en: "He isn't at home.", he: "הוא לא בבית." },
      { en: "Are you happy?", he: "את שמחה?" },
      { en: "Is she your sister?", he: "היא אחותך?" },
      { en: "Yes, I am. / No, I'm not.", he: "כן. / לא." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "She is ___ happy.", options: ["not", "no", "don't"], correct: "not" },
      { explanationHe: "כדי לשלול משפט עם is, מוסיפים not מיד אחרי is: She is not happy. המילה no לבד לא באה באמצע משפט כזה.", hintsHe: ["המילה באה אחרי is ומשמעותה 'לא'."] },
    ),
    ex.chooseInContext(
      { questionEn: "He ___ at home.", contextHe: "הוא לא בבית.", options: ["isn't", "aren't", "am not"], correct: "isn't" },
      { explanationHe: "he הולך עם is, ו-is + not מתקצר ל-isn't: He isn't at home.", hintsHe: ["איזו מילה הולכת עם he: is או are?"], vocabIds: ["he"] },
    ),
    ex.chooseInContext(
      { questionEn: "___ you happy?", options: ["Are", "Is", "Am"], correct: "Are" },
      { explanationHe: "בשאלה המילה של to be עוברת להתחלה. you הולך עם are, לכן: Are you happy?", hintsHe: ["במשפט רגיל אומרים You are happy. בשאלה הופכים את הסדר."], vocabIds: ["you", "happy"] },
    ),
    ex.chooseInContext(
      { questionEn: "___ she your sister?", options: ["Is", "Are", "Am"], correct: "Is" },
      { explanationHe: "she הולכת עם is, ובשאלה is עוברת להתחלה: Is she your sister?", vocabIds: ["she", "sister"] },
    ),
    ex.chooseInContext(
      { contextEn: "Are you ten?", contextHe: "את בת עשר?", questionEn: "___", options: ["Yes, I am.", "Yes, I is.", "Yes, you are."], correct: "Yes, I am." },
      { explanationHe: "כששואלים אותך Are you...? את עונה על עצמך, עם I: Yes, I am. (לא Yes, I is ולא Yes, you are).", hintsHe: ["השאלה על 'את', אז התשובה מתחילה ב'אני' = I."], vocabIds: ["yes", "i"] },
    ),
    ex.chooseInContext(
      { contextEn: "Is he tall?", contextHe: "הוא גבוה?", questionEn: "___", options: ["No, he isn't.", "No, he aren't.", "No, I'm not."], correct: "No, he isn't." },
      { explanationHe: "השאלה על he, אז גם התשובה עם he. he הולך עם is: No, he isn't.", hintsHe: ["שואלים על 'הוא', אז עונים על 'הוא'."], vocabIds: ["no", "he"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Is she your friend?", translationHe: "היא החברה שלך?", extraWords: ["Are"] },
      { explanationHe: "בשאלה המילה is באה ראשונה, ואז she: Is she your friend? Are לא מתאים ל-she.", hintsHe: ["שאלה מתחילה ב-Is או Are. איזו מהן הולכת עם she?"], vocabIds: ["she", "friend"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Are you at school?", translationHe: "את בבית הספר?", extraWords: ["Is", "am"] },
      { explanationHe: "you הולך עם are, ובשאלה are באה בהתחלה: Are you at school?", vocabIds: ["you", "school"] },
    ),
    ex.fillBlank(
      { sentence: "We ___ not at home.", translationHe: "אנחנו לא בבית.", bank: ["are", "is", "am"], correct: "are" },
      { explanationHe: "גם במשפט שלילי הכלל לא משתנה: we + are. לכן: We are not at home.", vocabIds: ["we", "house"] },
    ),
    ex.dialogue(
      {
        situationHe: "חברה פוגשת אותך בבית הספר ושואלת מה שלומך.",
        lines: [
          { speaker: "A", en: "Hi! Are you tired today?", he: "היי! את עייפה היום?" },
          { speaker: "B", en: "No, I'm not. I am happy!", he: "לא. אני שמחה!" },
          { speaker: "A", en: "Great! Me too.", he: "יופי! גם אני." },
        ],
        userTurnIndex: 1,
        options: ["No, I'm not. I am happy!", "No, I not. I am happy!", "Yes, you are. I am happy!"],
      },
      { explanationHe: "על Are you...? עונים עם I: No, I'm not. חייבים את am (I'm = I am) לפני not.", hintsHe: ["התשובה הקצרה לשלילה היא No, I'm not."], vocabIds: ["no", "tired", "happy"] },
    ),
    ex.chooseTranslation(
      { questionEn: "She isn't at home.", options: ["היא לא בבית.", "היא בבית.", "הוא לא בבית.", "הם לא בבית."], correct: "היא לא בבית." },
      { explanationHe: "isn't = is not = לא. she = היא. לכן: היא לא בבית.", vocabIds: ["she", "house"] },
    ),
    ex.listenSentence(
      { audioText: "Is the dog big? No, it isn't. It is small.", transcript: "Is the dog big? No, it isn't. It is small.", transcriptHe: "הכלב גדול? לא. הוא קטן.", questionHe: "הכלב גדול או קטן?", options: ["קטן", "גדול", "מהיר"], correct: "קטן" },
      { explanationHe: "שמעת No, it isn't. It is small. הכלב לא גדול, הוא קטן.", hintsHe: ["הקשיבי לתשובה אחרי השאלה: Yes או No?"], vocabIds: ["dog", "small", "big"] },
    ),
    ex.readRecord(
      { text: "Are you happy? Yes, I am.", translationHe: "את שמחה? כן." },
      { explanationHe: "בשאלה הקול עולה בסוף: Are you happy? ובתשובה יורד: Yes, I am.", vocabIds: ["you", "happy", "yes"] },
    ),
  ],
});

const l4 = defineLesson({
  id: "w3-l4",
  titleHe: "a, an ורבים",
  titleEn: "a / an and Plurals",
  worldId: "w3",
  unitId: "w3u2",
  order: 4,
  level: 2,
  learningObjectives: ["לבחור נכון בין a ל-an", "להפוך מילה ליחיד לרבים עם s", "להבדיל בין This is a... ל-These are..."],
  vocabIds: ["dog", "cat", "apple", "egg", "book", "pen", "banana", "orange"],
  intro: {
    titleHe: "אחד או הרבה?",
    bodyHe: "לפני דבר אחד שמים a: a dog, a cat. אם המילה מתחילה בצליל של תנועה (a, e, i, o, u) שמים an: an apple, an egg. כשיש כמה דברים, מוסיפים s בסוף המילה ובלי a: cats, dogs, apples. אומרים This is a pen (זה עט) אבל These are pens (אלה עטים).",
    examples: [
      { en: "a dog", he: "כלב" },
      { en: "an apple", he: "תפוח" },
      { en: "two cats", he: "שני חתולים" },
      { en: "This is a book.", he: "זה ספר." },
      { en: "These are books.", he: "אלה ספרים." },
    ],
  },
  exercises: (ex) => [
    ex.fillBlank(
      { sentence: "I have ___ dog.", translationHe: "יש לי כלב.", bank: ["a", "an", "two"], correct: "a" },
      { explanationHe: "dog מתחילה בצליל d, שהוא לא תנועה. לכן שמים a: a dog.", hintsHe: ["באיזה צליל מתחילה המילה dog?"], vocabIds: ["dog"] },
    ),
    ex.fillBlank(
      { sentence: "She eats ___ apple.", translationHe: "היא אוכלת תפוח.", bank: ["an", "a", "two"], correct: "an" },
      { explanationHe: "apple מתחילה בצליל תנועה (a), ולכן שמים an: an apple. ככה קל יותר להגיד.", hintsHe: ["המילה מתחילה ב-a. איזו מילה קטנה באה לפני תנועה?"], vocabIds: ["apple"] },
    ),
    ex.fillBlank(
      { sentence: "This is ___ egg.", translationHe: "זאת ביצה.", bank: ["an", "a", "two"], correct: "an" },
      { explanationHe: "egg מתחילה בצליל e, תנועה. לכן: an egg.", vocabIds: ["egg"] },
    ),
    ex.fillBlank(
      { sentence: "It is ___ orange cat.", translationHe: "זה חתול כתום.", bank: ["an", "a", "two"], correct: "an" },
      { explanationHe: "שימי לב: בוחרים לפי המילה שבאה מיד אחרי. orange מתחילה בתנועה (o), ולכן an orange cat, למרות ש-cat מתחילה ב-c.", hintsHe: ["המילה הבאה היא orange, לא cat.", "orange מתחילה ב-o, תנועה."], vocabIds: ["orange", "cat"] },
    ),
    ex.chooseInContext(
      { questionEn: "I see two ___.", options: ["cats", "cat", "a cat"], correct: "cats" },
      { explanationHe: "two = שניים, כלומר רבים. ברבים מוסיפים s ולא שמים a: two cats.", hintsHe: ["המילה two אומרת לך שיש יותר מאחד."], vocabIds: ["two", "cat"] },
    ),
    ex.chooseInContext(
      { questionEn: "These are my ___.", options: ["books", "book", "a book"], correct: "books" },
      { explanationHe: "These are = אלה, רבים. אחרי These are באה מילה ברבים: These are my books.", hintsHe: ["These are פותח משפט על כמה דברים."], vocabIds: ["book"] },
    ),
    ex.chooseInContext(
      { questionEn: "This is ___.", contextHe: "זה עט.", options: ["a pen", "pens", "pen"], correct: "a pen" },
      { explanationHe: "This is = זה, יחיד. אחרי This is שמים a + המילה ביחיד: This is a pen. בלי a זה לא משפט שלם.", hintsHe: ["דבר אחד צריך a לפניו."], vocabIds: ["pen"] },
    ),
    ex.matchPairs(
      {
        pairs: [
          { en: "a dog", he: "כלב" },
          { en: "dogs", he: "כלבים" },
          { en: "an egg", he: "ביצה" },
          { en: "eggs", he: "ביצים" },
        ],
      },
      { explanationHe: "a dog = כלב אחד, dogs = כלבים. an egg = ביצה אחת, eggs = ביצים.", vocabIds: ["dog", "egg"], skillTags: ["grammar", "vocabulary"] },
    ),
    ex.sentenceBuilder(
      { sentence: "These are my books.", translationHe: "אלה הספרים שלי.", extraWords: ["This", "is"] },
      { explanationHe: "ברבים אומרים These are, לא This is: These are my books.", hintsHe: ["books הוא רבים. איך מתחילים משפט על רבים?"], vocabIds: ["book"] },
    ),
    ex.sentenceBuilder(
      { sentence: "This is an apple.", translationHe: "זה תפוח.", extraWords: ["a"] },
      { explanationHe: "apple מתחילה בתנועה, לכן לפניה an ולא a: This is an apple.", vocabIds: ["apple"] },
    ),
    ex.chooseTranslation(
      { questionEn: "I have two cats and a dog.", options: ["יש לי שני חתולים וכלב.", "יש לי חתול ושני כלבים.", "יש לי שני כלבים וחתול.", "יש לי חתול וכלב."], correct: "יש לי שני חתולים וכלב." },
      { explanationHe: "two cats = שני חתולים (יש s), a dog = כלב אחד. לכן: יש לי שני חתולים וכלב.", hintsHe: ["שימי לב איזו מילה מקבלת s ואיזו מקבלת a."], vocabIds: ["cat", "dog", "two"] },
    ),
    ex.listenSentence(
      { audioText: "I have three apples and an egg.", transcript: "I have three apples and an egg.", transcriptHe: "יש לי שלושה תפוחים וביצה.", questionHe: "כמה תפוחים יש לה?", options: ["שלושה", "אחד", "שניים"], correct: "שלושה" },
      { explanationHe: "שמעת three apples. three = שלושה, ו-apples ברבים.", hintsHe: ["הקשיבי למספר שלפני apples."], vocabIds: ["three", "apple", "egg"] },
    ),
    ex.readRecord(
      { text: "I eat an apple and a banana.", translationHe: "אני אוכלת תפוח ובננה." },
      { explanationHe: "an apple (תנועה), a banana (לא תנועה). קראי: I eat an apple and a banana.", vocabIds: ["eat", "apple", "banana"] },
    ),
  ],
});

const l5 = defineLesson({
  id: "w3-l5",
  titleHe: "have / has, מילות שאלה ומילות יחס",
  titleEn: "have / has, Question Words and Prepositions",
  worldId: "w3",
  unitId: "w3u2",
  order: 5,
  level: 2,
  learningObjectives: ["לדעת מתי אומרים have ומתי has", "להכיר את מילות השאלה what, where, who, when, why, how", "להשתמש ב-in, on, under, with כדי להגיד איפה משהו"],
  vocabIds: ["have", "what", "where", "who", "when", "why", "how", "in", "on", "under", "with"],
  intro: {
    titleHe: "יש לי, איפה ומה",
    bodyHe: "have = יש ל... עם I, you, we, they אומרים have, ועם he, she, it אומרים has: I have a dog. She has a cat. מילות שאלה פותחות שאלה: What (מה), Where (איפה), Who (מי), When (מתי), Why (למה), How (איך). ומילות יחס אומרות איפה: in (בתוך), on (על), under (מתחת), with (עם).",
    examples: [
      { en: "I have a dog.", he: "יש לי כלב." },
      { en: "She has a cat.", he: "יש לה חתול." },
      { en: "Where is my bag?", he: "איפה התיק שלי?" },
      { en: "The book is on the table.", he: "הספר על השולחן." },
      { en: "The cat is under the bed.", he: "החתול מתחת למיטה." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "I ___ a dog.", contextHe: "יש לי כלב.", options: ["have", "has", "am"], correct: "have" },
      { explanationHe: "עם I משתמשים ב-have: I have a dog.", hintsHe: ["has הולכת רק עם he, she, it."], vocabIds: ["have", "dog"] },
    ),
    ex.chooseInContext(
      { questionEn: "She ___ a cat.", contextHe: "יש לה חתול.", options: ["have", "has", "is"], correct: "has" },
      {
        explanationHe: "עם she משתמשים ב-has: She has a cat.",
        hintsHe: ["she היא אחת (יחיד). איזו צורה הולכת עם he, she, it?"],
        vocabIds: ["have", "cat"],
        followUp: ex.chooseInContext(
          { questionEn: "He ___ a ball.", options: ["have", "has", "is"], correct: "has" },
          { explanationHe: "he, כמו she, הולך עם has: He has a ball.", vocabIds: ["have", "ball"] },
        ),
      },
    ),
    ex.matchPairs(
      {
        pairs: [
          { en: "what", he: "מה" },
          { en: "where", he: "איפה" },
          { en: "who", he: "מי" },
          { en: "when", he: "מתי" },
          { en: "why", he: "למה" },
          { en: "how", he: "איך" },
        ],
      },
      { explanationHe: "what = מה, where = איפה, who = מי, when = מתי, why = למה, how = איך.", vocabIds: ["what", "where", "who", "when", "why", "how"] },
    ),
    ex.chooseInContext(
      { questionEn: "___ is your name?", options: ["What", "Where", "Who"], correct: "What" },
      { explanationHe: "שואלים 'מה השם שלך?', ו'מה' = What. לכן: What is your name?", hintsHe: ["התשובה לשאלה היא שם, למשל: My name is Dana."], vocabIds: ["what"] },
    ),
    ex.chooseInContext(
      { contextEn: "My bag is not here.", contextHe: "התיק שלי לא פה.", questionEn: "___ is my bag?", options: ["Where", "What", "When"], correct: "Where" },
      { explanationHe: "שואלים על מקום (איפה התיק?), ו'איפה' = Where. לכן: Where is my bag?", hintsHe: ["השאלה היא על מקום."], vocabIds: ["where", "bag"] },
    ),
    ex.chooseInContext(
      { questionEn: "___ is she? She is my sister.", options: ["Who", "Where", "Why"], correct: "Who" },
      { explanationHe: "התשובה היא 'היא אחותי', כלומר שאלו 'מי היא?'. מי = Who.", vocabIds: ["who", "sister"] },
    ),
    ex.chooseInContext(
      { questionEn: "___ old are you?", options: ["How", "What", "Who"], correct: "How" },
      { explanationHe: "'בת כמה את?' באנגלית אומרים How old are you? (מילה במילה: 'כמה זקנה את'). תמיד How + old.", hintsHe: ["הצירוף הקבוע הוא How old."], vocabIds: ["how"] },
    ),
    ex.fillBlank(
      { sentence: "The book is ___ the table.", translationHe: "הספר על השולחן.", bank: ["on", "in", "under"], correct: "on" },
      { explanationHe: "על = on. הספר נמצא על השולחן, למעלה: The book is on the table.", hintsHe: ["in = בתוך, under = מתחת. מה נשאר?"], vocabIds: ["on", "book", "table"] },
    ),
    ex.fillBlank(
      { sentence: "The cat is ___ the box.", translationHe: "החתול בתוך הקופסה.", bank: ["in", "on", "with"], correct: "in" },
      { explanationHe: "בתוך = in. החתול נמצא בתוך הקופסה: The cat is in the box.", vocabIds: ["in", "cat"] },
    ),
    ex.listenSentence(
      { audioText: "The cat is under the table.", transcript: "The cat is under the table.", transcriptHe: "החתול מתחת לשולחן.", questionHe: "איפה החתול?", options: ["מתחת לשולחן", "על השולחן", "בתוך הקופסה"], correct: "מתחת לשולחן" },
      { explanationHe: "שמעת under the table. under = מתחת. לכן החתול מתחת לשולחן.", hintsHe: ["הקשיבי למילה שאחרי is: on, in או under?"], vocabIds: ["under", "cat", "table"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Where is my pen?", translationHe: "איפה העט שלי?", extraWords: ["What", "are"] },
      { explanationHe: "שאלה על מקום מתחילה ב-Where, ואחריה is: Where is my pen?", hintsHe: ["איפה = Where. המילה הזאת פותחת את השאלה."], vocabIds: ["where", "pen"] },
    ),
    ex.chooseTranslation(
      { questionEn: "I play with my friend.", options: ["אני משחקת עם החברה שלי.", "אני משחקת עם אחותי.", "אני אוכלת עם החברה שלי.", "היא משחקת עם החברה שלי."], correct: "אני משחקת עם החברה שלי." },
      { explanationHe: "I = אני, play = משחקת, with = עם, friend = חברה. לכן: אני משחקת עם החברה שלי.", vocabIds: ["with", "play", "friend"] },
    ),
    ex.readRecord(
      { text: "She has a dog. It is under the bed.", translationHe: "יש לה כלב. הוא מתחת למיטה." },
      { explanationHe: "She has (לא have), under = מתחת. קראי: She has a dog. It is under the bed.", vocabIds: ["have", "under", "dog", "bed"] },
    ),
  ],
});

export const WORLD3_LESSONS: Lesson[] = [l1, l2, l3, l4, l5];
