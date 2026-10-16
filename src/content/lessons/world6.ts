import { defineLesson } from "../builders";
import type { Lesson } from "@/lib/types";

/**
 * World 6 – Grammar Lab (level 3).
 * Unit w6u1: Present Simple (affirmative, negative, questions) and Present Continuous.
 * Unit w6u2: Past Simple basics, word order and connectors.
 * Each lesson teaches one rule, with a follow-up check after wrong answers.
 */

const l1 = defineLesson({
  id: "w6-l1",
  titleHe: "הווה פשוט: She plays",
  titleEn: "Present Simple: I play / She plays",
  worldId: "w6",
  unitId: "w6u1",
  order: 1,
  level: 3,
  learningObjectives: ["להבין ש-Present Simple מתאר דברים שקורים תמיד או כל יום", "להוסיף s לפועל עם he / she / it", "לבנות משפט פשוט בהווה"],
  vocabIds: ["play", "eat", "like", "run", "go", "drink", "have", "read", "day", "he", "she", "it", "we", "they"],
  intro: {
    titleHe: "Present Simple – מה קורה תמיד",
    bodyHe: "Present Simple הוא הזמן של דברים שקורים תמיד, כל יום או בדרך כלל. עם I, you, we, they הפועל נשאר כמו שהוא: I play. עם he, she, it (וגם עם שם של אדם אחד, כמו Dana או my brother) מוסיפים s בסוף הפועל: She plays. מילים כמו every day רומזות לנו שזה Present Simple.",
    examples: [
      { en: "I play football every day.", he: "אני משחקת כדורגל כל יום." },
      { en: "She plays football every day.", he: "היא משחקת כדורגל כל יום." },
      { en: "They eat pizza on Friday.", he: "הם אוכלים פיצה ביום שישי." },
      { en: "He eats an apple.", he: "הוא אוכל תפוח." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "I ___ football every day.", options: ["play", "plays", "playing"], correct: "play" },
      {
        explanationHe: "עם I הפועל נשאר בצורה הבסיסית, בלי s: I play.",
        hintsHe: ["מי עושה את הפעולה? I.", "עם I לא מוסיפים s."],
        vocabIds: ["play", "i"],
        followUp: ex.chooseInContext(
          { questionEn: "We ___ in the park.", options: ["play", "plays", "playing"], correct: "play" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "עם we (כמו עם I, you, they) הפועל בלי s: We play.", vocabIds: ["play", "we"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "She ___ football every day.", options: ["plays", "play", "playing"], correct: "plays" },
      {
        explanationHe: "עם he/she/it מוסיפים s לפועל: She plays.",
        hintsHe: ["מי עושה את הפעולה? She – היא.", "עם she הפועל מקבל s."],
        vocabIds: ["play", "she"],
        followUp: ex.chooseInContext(
          { questionEn: "He ___ with his dog.", options: ["plays", "play", "playing"], correct: "plays" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "He = הוא. עם he מוסיפים s: He plays.", vocabIds: ["play", "he"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "My brother ___ an apple in the morning.", options: ["eats", "eat", "eating"], correct: "eats" },
      {
        explanationHe: "My brother הוא אדם אחד – כמו he. לכן מוסיפים s: My brother eats.",
        hintsHe: ["my brother = הוא (he).", "עם he מוסיפים s לפועל."],
        vocabIds: ["eat", "brother", "apple"],
        followUp: ex.chooseInContext(
          { questionEn: "The cat ___ fish.", options: ["eats", "eat", "eating"], correct: "eats" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "The cat = it. עם it מוסיפים s: The cat eats.", vocabIds: ["eat", "cat"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "They ___ ice cream.", options: ["like", "likes", "liking"], correct: "like" },
      {
        explanationHe: "עם they (הם) הפועל נשאר בלי s: They like.",
        hintsHe: ["they = הם. זה לא he/she/it."],
        vocabIds: ["like", "they", "ice-cream"],
        followUp: ex.chooseInContext(
          { questionEn: "You ___ cats.", options: ["like", "likes", "liking"], correct: "like" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "עם you הפועל בלי s: You like.", vocabIds: ["like", "you"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "The dog ___ in the park every day.", options: ["runs", "run", "running"], correct: "runs" },
      {
        explanationHe: "The dog = it. עם it מוסיפים s: The dog runs.",
        hintsHe: ["הכלב הוא it.", "עם it הפועל מקבל s."],
        vocabIds: ["run", "dog", "park"],
        followUp: ex.chooseInContext(
          { questionEn: "It ___ fast.", options: ["runs", "run", "running"], correct: "runs" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "עם it מוסיפים s: It runs.", vocabIds: ["run", "it", "fast"] },
        ),
      },
    ),
    ex.fillBlank(
      { sentence: "My sister ___ to school every day.", translationHe: "אחותי הולכת לבית הספר כל יום.", bank: ["goes", "go", "going"], correct: "goes" },
      { explanationHe: "My sister = she, ולכן מוסיפים s. שימי לב: go מקבל es ולא רק s: goes.", hintsHe: ["my sister = היא.", "go + es = goes."], vocabIds: ["go", "sister", "school"] },
    ),
    ex.fillBlank(
      { sentence: "I ___ water every day.", translationHe: "אני שותה מים כל יום.", bank: ["drink", "drinks", "drinking"], correct: "drink" },
      { explanationHe: "עם I הפועל נשאר בלי s: I drink.", vocabIds: ["drink", "water", "i"] },
    ),
    ex.fillBlank(
      { sentence: "We ___ a big house.", translationHe: "יש לנו בית גדול.", bank: ["have", "has", "having"], correct: "have" },
      { explanationHe: "עם we אומרים have. (עם he/she/it הפועל have משתנה ל-has: She has a dog.)", hintsHe: ["we = אנחנו, לא he/she/it."], vocabIds: ["have", "we", "house"] },
    ),
    ex.sentenceBuilder(
      { sentence: "She reads a book every day.", translationHe: "היא קוראת ספר כל יום.", extraWords: ["read", "at"] },
      { explanationHe: "She reads: עם she הפועל מקבל s. every day בא בסוף המשפט.", hintsHe: ["התחילי עם She.", "בחרי reads עם s, כי זו she."], vocabIds: ["read", "she", "book", "day"] },
    ),
    ex.sentenceBuilder(
      { sentence: "They play in the park.", translationHe: "הם משחקים בפארק.", extraWords: ["plays"] },
      { explanationHe: "עם they הפועל בלי s: They play. אחר כך איפה: in the park.", hintsHe: ["they – בלי s."], vocabIds: ["they", "play", "park"] },
    ),
    ex.listenSentence(
      { audioText: "He eats an egg every morning.", transcript: "He eats an egg every morning.", transcriptHe: "הוא אוכל ביצה כל בוקר.", questionHe: "מה הוא אוכל כל בוקר?", options: ["ביצה", "תפוח", "לחם"], correct: "ביצה" },
      { explanationHe: "שמעת: He eats an egg. egg = ביצה. שימי לב ל-s בסוף eats, כי זה he.", hintsHe: ["הקשיבי למילה אחרי eats an."], vocabIds: ["eat", "egg", "morning"] },
    ),
    ex.readRecord(
      { text: "My mother likes cake.", translationHe: "אמא שלי אוהבת עוגה." },
      { explanationHe: "קראי בקול: My mother likes cake. הקפידי להשמיע את ה-s בסוף likes.", vocabIds: ["mother", "like", "cake"] },
    ),
  ],
});

const l2 = defineLesson({
  id: "w6-l2",
  titleHe: "הווה פשוט: don't / doesn't ושאלות",
  titleEn: "Present Simple: Negatives & Questions",
  worldId: "w6",
  unitId: "w6u1",
  order: 2,
  level: 3,
  learningObjectives: ["לבנות משפט שלילה עם don't / doesn't", "לשאול שאלה עם Do / Does", "לענות תשובה קצרה: Yes, I do. / No, she doesn't."],
  vocabIds: ["like", "eat", "play", "go", "have", "read", "want", "milk", "fish", "cat", "dog", "rain", "pen", "ice-cream"],
  intro: {
    titleHe: "איך אומרים 'לא' ואיך שואלים?",
    bodyHe: "כדי להגיד 'לא' ב-Present Simple מוסיפים don't לפני הפועל: I don't like milk. עם he, she, it משתמשים ב-doesn't, והפועל חוזר לצורה הבסיסית בלי s: She doesn't like milk (לא likes!). לשאלה מתחילים ב-Do או Does: Do you like cats? Does she play? ועונים בקצרה: Yes, I do. / No, she doesn't.",
    examples: [
      { en: "I don't like milk.", he: "אני לא אוהבת חלב." },
      { en: "She doesn't like milk.", he: "היא לא אוהבת חלב." },
      { en: "Do you like cats? Yes, I do.", he: "את אוהבת חתולים? כן." },
      { en: "Does he play football? No, he doesn't.", he: "הוא משחק כדורגל? לא." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "I ___ like milk.", options: ["don't", "doesn't", "not"], correct: "don't" },
      {
        explanationHe: "עם I משתמשים ב-don't: I don't like milk.",
        hintsHe: ["עם I/you/we/they – don't."],
        vocabIds: ["like", "milk"],
        followUp: ex.chooseInContext(
          { questionEn: "We ___ eat pizza.", options: ["don't", "doesn't", "no"], correct: "don't" },
          { promptHe: "בדיקה: בחרי את המילה הנכונה", explanationHe: "עם we משתמשים ב-don't: We don't eat.", vocabIds: ["eat", "pizza"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "She ___ like cold water.", options: ["doesn't", "don't", "not"], correct: "doesn't" },
      {
        explanationHe: "עם he/she/it משתמשים ב-doesn't: She doesn't like.",
        hintsHe: ["She היא he/she/it.", "עם she – doesn't."],
        vocabIds: ["like", "cold", "water"],
        followUp: ex.chooseInContext(
          { questionEn: "He ___ play football.", options: ["doesn't", "don't", "isn't"], correct: "doesn't" },
          { promptHe: "בדיקה: בחרי את המילה הנכונה", explanationHe: "עם he משתמשים ב-doesn't: He doesn't play.", vocabIds: ["play"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "My brother doesn't ___ fish.", options: ["eat", "eats", "eating"], correct: "eat" },
      {
        explanationHe: "אחרי doesn't הפועל חוזר לצורה הבסיסית בלי s: doesn't eat. ה-s כבר נמצאת בתוך doesn't.",
        hintsHe: ["ה-s כבר יושבת ב-doesn't.", "אחרי doesn't – פועל בלי s."],
        vocabIds: ["eat", "fish", "brother"],
        followUp: ex.chooseInContext(
          { questionEn: "She doesn't ___ to school on Friday.", options: ["go", "goes", "going"], correct: "go" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "אחרי doesn't הפועל בלי s: doesn't go.", vocabIds: ["go", "school"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "___ you like ice cream?", options: ["Do", "Does", "Is"], correct: "Do" },
      {
        explanationHe: "שאלה עם you מתחילה ב-Do: Do you like ice cream?",
        hintsHe: ["עם I/you/we/they – Do."],
        vocabIds: ["like", "ice-cream", "you"],
        followUp: ex.chooseInContext(
          { questionEn: "___ they play football?", options: ["Do", "Does", "Are"], correct: "Do" },
          { promptHe: "בדיקה: בחרי את מילת השאלה", explanationHe: "עם they שואלים עם Do: Do they play?", vocabIds: ["play", "they"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "___ she have a dog?", options: ["Does", "Do", "Is"], correct: "Does" },
      {
        explanationHe: "שאלה עם he/she/it מתחילה ב-Does: Does she have a dog?",
        hintsHe: ["she – מהקבוצה של he/she/it.", "עם she – Does."],
        vocabIds: ["have", "dog", "she"],
        followUp: ex.chooseInContext(
          { questionEn: "___ he like cats?", options: ["Does", "Do", "Is"], correct: "Does" },
          { promptHe: "בדיקה: בחרי את מילת השאלה", explanationHe: "עם he שואלים עם Does: Does he like cats?", vocabIds: ["like", "cat", "he"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "Does your sister ___ a book every day?", options: ["read", "reads", "reading"], correct: "read" },
      { explanationHe: "אחרי Does הפועל בלי s: Does your sister read? ה-s כבר נמצאת ב-Does.", hintsHe: ["Does כבר 'לקח' את ה-s."], vocabIds: ["read", "book", "sister"] },
    ),
    ex.fillBlank(
      { sentence: "Do you like cats? Yes, I ___.", translationHe: "את אוהבת חתולים? כן.", bank: ["do", "does", "am"], correct: "do" },
      { explanationHe: "תשובה קצרה לשאלה עם Do: Yes, I do. / No, I don't.", hintsHe: ["השאלה התחילה ב-Do, אז עונים עם do."], vocabIds: ["like", "cat", "yes"] },
    ),
    ex.fillBlank(
      { sentence: "Does he play football? No, he ___.", translationHe: "הוא משחק כדורגל? לא.", bank: ["doesn't", "don't", "isn't"], correct: "doesn't" },
      { explanationHe: "תשובה קצרה שלילית עם he: No, he doesn't.", hintsHe: ["השאלה התחילה ב-Does, אז עונים עם doesn't."], vocabIds: ["play", "no", "he"] },
    ),
    ex.fillBlank(
      { sentence: "They ___ want juice.", translationHe: "הם לא רוצים מיץ.", bank: ["don't", "doesn't", "not"], correct: "don't" },
      { explanationHe: "עם they משתמשים ב-don't: They don't want juice.", vocabIds: ["want", "juice", "they"] },
    ),
    ex.sentenceBuilder(
      { sentence: "She doesn't like rain.", translationHe: "היא לא אוהבת גשם.", extraWords: ["don't", "likes"] },
      { explanationHe: "She doesn't like rain: עם she – doesn't, ואחריו הפועל בלי s (like, לא likes).", hintsHe: ["התחילי עם She doesn't.", "אחרי doesn't – like בלי s."], vocabIds: ["she", "like", "rain"] },
    ),
    ex.sentenceBuilder(
      { sentence: "Do you have a pen?", translationHe: "יש לך עט?", extraWords: ["Does", "has"] },
      { explanationHe: "שאלה: Do + you + have. עם you משתמשים ב-Do, והפועל have נשאר כמו שהוא.", hintsHe: ["שאלה מתחילה ב-Do.", "אחרי Do בא you."], vocabIds: ["have", "pen", "you"] },
    ),
    ex.listenSentence(
      { audioText: "I don't like cold milk.", transcript: "I don't like cold milk.", transcriptHe: "אני לא אוהבת חלב קר.", questionHe: "מה הדוברת לא אוהבת?", options: ["חלב קר", "מים קרים", "חלב חם"], correct: "חלב קר" },
      { explanationHe: "שמעת: I don't like cold milk. don't = לא, cold = קר, milk = חלב.", hintsHe: ["הקשיבי לשתי המילים האחרונות."], vocabIds: ["like", "cold", "milk"] },
    ),
    ex.readRecord(
      { text: "Does she like ice cream? Yes, she does.", translationHe: "היא אוהבת גלידה? כן." },
      { explanationHe: "קראי בקול: בשאלה הקול עולה בסוף, ובתשובה הקול יורד. Does she like? Yes, she does.", vocabIds: ["like", "ice-cream", "she", "yes"] },
    ),
  ],
});

const l3 = defineLesson({
  id: "w6-l3",
  titleHe: "הווה ממושך: I am eating now",
  titleEn: "Present Continuous: am / is / are + ing",
  worldId: "w6",
  unitId: "w6u1",
  order: 3,
  level: 3,
  learningObjectives: ["להבין ש-Present Continuous מתאר מה שקורה ממש עכשיו", "לבנות את הזמן משני חלקים: am / is / are + פועל עם ing", "להבדיל בין 'כל יום' (Present Simple) ל'עכשיו' (Present Continuous)"],
  vocabIds: ["sleep", "run", "read", "play", "eat", "sing", "drink", "talk", "swim", "write", "go", "cat", "dog", "bird", "baby", "phone", "sea"],
  intro: {
    titleHe: "Present Continuous – מה קורה עכשיו",
    bodyHe: "Present Continuous מתאר מה שקורה ממש עכשיו, ברגע זה. בונים אותו משני חלקים: am / is / are + פועל עם ing. I am eating. She is reading. They are playing. מילים כמו now ו-Look! רומזות שזה קורה עכשיו.",
    examples: [
      { en: "I am eating an apple now.", he: "אני אוכלת תפוח עכשיו." },
      { en: "She is reading a book.", he: "היא קוראת ספר (עכשיו)." },
      { en: "They are playing in the park.", he: "הם משחקים בפארק (עכשיו)." },
      { en: "Look! The cat is sleeping.", he: "תראי! החתול ישן." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "Look! The cat ___ sleeping.", options: ["is", "are", "am"], correct: "is" },
      {
        explanationHe: "The cat = it. עם it משתמשים ב-is: The cat is sleeping.",
        hintsHe: ["החתול הוא it.", "עם he/she/it – is."],
        vocabIds: ["cat", "sleep"],
        followUp: ex.chooseInContext(
          { questionEn: "The dog ___ running now.", options: ["is", "are", "am"], correct: "is" },
          { promptHe: "בדיקה: בחרי את המילה הנכונה", explanationHe: "The dog = it, ולכן is: The dog is running.", vocabIds: ["dog", "run"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "I ___ reading a book now.", options: ["am", "is", "are"], correct: "am" },
      { explanationHe: "עם I תמיד am: I am reading.", hintsHe: ["I הולך רק עם am."], vocabIds: ["read", "book", "i"] },
    ),
    ex.chooseInContext(
      { questionEn: "They ___ playing in the park.", options: ["are", "is", "am"], correct: "are" },
      {
        explanationHe: "עם they (וגם you, we) משתמשים ב-are: They are playing.",
        hintsHe: ["they = הם.", "עם you/we/they – are."],
        vocabIds: ["play", "park", "they"],
        followUp: ex.chooseInContext(
          { questionEn: "We ___ eating pizza now.", options: ["are", "is", "am"], correct: "are" },
          { promptHe: "בדיקה: בחרי את המילה הנכונה", explanationHe: "עם we משתמשים ב-are: We are eating.", vocabIds: ["eat", "pizza", "we"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "She is ___ now.", options: ["singing", "sings", "sing"], correct: "singing" },
      {
        explanationHe: "אחרי is בא פועל עם ing: She is singing. שני החלקים תמיד ביחד.",
        hintsHe: ["יש כבר is, אז הפועל צריך ing."],
        vocabIds: ["sing", "she"],
        followUp: ex.chooseInContext(
          { questionEn: "He is ___ water.", options: ["drinking", "drinks", "drink"], correct: "drinking" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "אחרי is הפועל מקבל ing: He is drinking.", vocabIds: ["drink", "water", "he"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "Listen! The birds are ___.", options: ["singing", "sing", "sings"], correct: "singing" },
      {
        explanationHe: "Listen! אומר לנו שזה קורה עכשיו. אחרי are בא פועל עם ing: The birds are singing.",
        hintsHe: ["אחרי are – פועל עם ing."],
        vocabIds: ["listen", "bird", "sing"],
        followUp: ex.chooseInContext(
          { questionEn: "Look! The children are ___.", options: ["dancing", "dance", "dances"], correct: "dancing" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "אחרי are הפועל מקבל ing: are dancing. (ב-dance ה-e נופלת לפני ing.)", vocabIds: ["dance", "look"] },
        ),
      },
    ),
    ex.fillBlank(
      { sentence: "My father is ___ on the phone.", translationHe: "אבא שלי מדבר בטלפון (עכשיו).", bank: ["talking", "talk", "talks"], correct: "talking" },
      { explanationHe: "יש כבר is, ולכן הפועל צריך ing: is talking.", hintsHe: ["is + פועל עם ing."], vocabIds: ["father", "talk", "phone"] },
    ),
    ex.fillBlank(
      { sentence: "We ___ swimming in the sea now.", translationHe: "אנחנו שוחים בים עכשיו.", bank: ["are", "is", "am"], correct: "are" },
      { explanationHe: "עם we משתמשים ב-are: We are swimming.", vocabIds: ["we", "swim", "sea"] },
    ),
    ex.sentenceBuilder(
      { sentence: "I am writing my name.", translationHe: "אני כותבת את השם שלי (עכשיו).", extraWords: ["is", "write"] },
      { explanationHe: "I am writing: I + am + פועל עם ing. שני החלקים של הזמן תמיד ביחד.", hintsHe: ["התחילי עם I am.", "בחרי writing עם ing."], vocabIds: ["i", "write", "my-name-is"] },
    ),
    ex.sentenceBuilder(
      { sentence: "The baby is sleeping now.", translationHe: "התינוק ישן עכשיו.", extraWords: ["are", "sleeps"] },
      { explanationHe: "The baby is sleeping now: The baby + is + sleeping, ו-now בסוף.", hintsHe: ["The baby = it, אז is.", "now בא בסוף."], vocabIds: ["baby", "sleep"] },
    ),
    ex.listenSentence(
      { audioText: "Look! The dog is jumping.", transcript: "Look! The dog is jumping.", transcriptHe: "תראי! הכלב קופץ.", questionHe: "מה הכלב עושה עכשיו?", options: ["קופץ", "ישן", "אוכל"], correct: "קופץ" },
      { explanationHe: "שמעת: The dog is jumping. jump = לקפוץ. is + jumping = קופץ עכשיו.", hintsHe: ["הקשיבי לפועל עם ing בסוף."], vocabIds: ["dog", "jump", "look"] },
    ),
    ex.chooseInContext(
      { questionEn: "I ___ to school every day.", options: ["go", "am going", "goes"], correct: "go" },
      { promptHe: "כל יום או עכשיו? בחרי את הצורה הנכונה", explanationHe: "every day = כל יום, משהו קבוע. לכן Present Simple: I go. (am going זה רק לעכשיו.)", hintsHe: ["every day – זה קבוע, לא עכשיו.", "עם I ב-Present Simple – go בלי s."], vocabIds: ["go", "school", "day"] },
    ),
    ex.chooseInContext(
      { questionEn: "Look! Dana ___ a book.", options: ["is reading", "reads", "read"], correct: "is reading" },
      { promptHe: "כל יום או עכשיו? בחרי את הצורה הנכונה", explanationHe: "Look! אומר שזה קורה ממש עכשיו. לכן Present Continuous: Dana is reading.", hintsHe: ["Look! = זה קורה עכשיו.", "עכשיו = is + פועל עם ing."], vocabIds: ["look", "read", "book"] },
    ),
    ex.readRecord(
      { text: "I am eating an apple now.", translationHe: "אני אוכלת תפוח עכשיו." },
      { explanationHe: "קראי בקול: I am eating an apple now. שימי לב ל-ing בסוף eating.", vocabIds: ["eat", "apple", "i"] },
    ),
  ],
});

const l4 = defineLesson({
  id: "w6-l4",
  titleHe: "עבר פשוט: yesterday I went",
  titleEn: "Past Simple: was / were, -ed and went, ate, saw, had, made",
  worldId: "w6",
  unitId: "w6u2",
  order: 4,
  level: 3,
  learningObjectives: ["להשתמש ב-was / were כדי לספר על העבר", "להוסיף ed לפעלים רגילים (played, walked, liked)", "להכיר חמישה פעלים יוצאי דופן: went, ate, saw, had, made"],
  vocabIds: ["play", "walk", "like", "go", "eat", "see", "have", "open", "house", "school", "park", "sea", "pizza", "cake", "bird", "tree", "dog", "day", "tired", "happy", "mother"],
  intro: {
    titleHe: "Past Simple – מה שכבר קרה",
    bodyHe: "Past Simple מספר על דברים שכבר קרו – אתמול (yesterday) או בשבוע שעבר. הפועל to be בעבר: was עם I, he, she, it, ו-were עם you, we, they. לרוב הפעלים פשוט מוסיפים ed: play ← played, walk ← walked, like ← liked. ויש פעלים 'עקשנים' שמשתנים לגמרי, וכדאי לזכור אותם: go ← went, eat ← ate, see ← saw, have ← had, make ← made.",
    examples: [
      { en: "Yesterday I was at home.", he: "אתמול הייתי בבית." },
      { en: "We were at the park.", he: "היינו בפארק." },
      { en: "I played with my dog.", he: "שיחקתי עם הכלב שלי." },
      { en: "We went to the sea and ate pizza.", he: "נסענו לים ואכלנו פיצה." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "Yesterday I ___ at home.", options: ["was", "were", "am"], correct: "was" },
      {
        explanationHe: "Yesterday = אתמול, לכן עבר. עם I בעבר אומרים was: I was at home.",
        hintsHe: ["yesterday = עבר.", "I בעבר – was."],
        vocabIds: ["house", "i"],
        followUp: ex.chooseInContext(
          { questionEn: "She ___ at school yesterday.", options: ["was", "were", "is"], correct: "was" },
          { promptHe: "בדיקה: בחרי את המילה הנכונה", explanationHe: "עם she בעבר – was: She was at school.", vocabIds: ["school", "she"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "We ___ at the park yesterday.", options: ["were", "was", "are"], correct: "were" },
      {
        explanationHe: "עם we (וגם you, they) בעבר אומרים were: We were at the park.",
        hintsHe: ["we = אנחנו.", "you/we/they בעבר – were."],
        vocabIds: ["park", "we"],
        followUp: ex.chooseInContext(
          { questionEn: "They ___ very tired yesterday.", options: ["were", "was", "are"], correct: "were" },
          { promptHe: "בדיקה: בחרי את המילה הנכונה", explanationHe: "עם they בעבר – were: They were tired.", vocabIds: ["tired", "they"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "Yesterday we ___ football.", options: ["played", "play", "plays"], correct: "played" },
      {
        explanationHe: "play הוא פועל רגיל: בעבר מוסיפים ed – played. אותה צורה לכל הגופים!",
        hintsHe: ["yesterday = עבר.", "פועל רגיל + ed."],
        vocabIds: ["play"],
        followUp: ex.chooseInContext(
          { questionEn: "I ___ to the park yesterday.", options: ["walked", "walk", "walks"], correct: "walked" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "walk + ed = walked. בעבר אין s, גם לא עם he/she.", vocabIds: ["walk", "park"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "Last week I ___ to the sea.", options: ["went", "go", "goed"], correct: "went" },
      {
        explanationHe: "go הוא פועל יוצא דופן: בעבר הוא הופך ל-went (לא goed!).",
        hintsHe: ["go לא מקבל ed.", "go ← went."],
        vocabIds: ["go", "sea", "week"],
        followUp: ex.chooseInContext(
          { questionEn: "She ___ to school yesterday.", options: ["went", "go", "goes"], correct: "went" },
          { promptHe: "בדיקה: בחרי את הצורה הנכונה", explanationHe: "go בעבר = went, לכל הגופים: She went to school.", vocabIds: ["go", "school"] },
        ),
      },
    ),
    ex.chooseInContext(
      { questionEn: "Yesterday she ___ a big pizza.", options: ["ate", "eat", "eated"], correct: "ate" },
      { explanationHe: "eat הוא פועל יוצא דופן: בעבר – ate (לא eated).", hintsHe: ["eat ← ate."], vocabIds: ["eat", "pizza", "big"] },
    ),
    ex.chooseInContext(
      { questionEn: "I ___ a bird in the tree yesterday.", options: ["saw", "see", "sees"], correct: "saw" },
      { explanationHe: "see הוא פועל יוצא דופן: בעבר – saw. I saw a bird = ראיתי ציפור.", hintsHe: ["see ← saw."], vocabIds: ["see", "bird", "tree"] },
    ),
    ex.fillBlank(
      { sentence: "Yesterday my mother ___ a cake.", translationHe: "אתמול אמא שלי הכינה עוגה.", bank: ["made", "make", "makes"], correct: "made" },
      { explanationHe: "make (להכין) הוא פועל יוצא דופן: בעבר – made.", hintsHe: ["make ← made."], vocabIds: ["mother", "cake"] },
    ),
    ex.fillBlank(
      { sentence: "We ___ a good day yesterday.", translationHe: "היה לנו יום טוב אתמול.", bank: ["had", "have", "has"], correct: "had" },
      { explanationHe: "have הוא פועל יוצא דופן: בעבר – had, לכל הגופים.", hintsHe: ["have ← had."], vocabIds: ["have", "good", "day"] },
    ),
    ex.fillBlank(
      { sentence: "He ___ with his dog yesterday.", translationHe: "הוא שיחק עם הכלב שלו אתמול.", bank: ["played", "play", "plays"], correct: "played" },
      { explanationHe: "פועל רגיל בעבר מקבל ed: played. שימי לב: בעבר אין s גם עם he.", hintsHe: ["yesterday = עבר. play + ed."], vocabIds: ["play", "dog", "he"] },
    ),
    ex.matchPairs(
      { pairs: [{ en: "go", he: "went" }, { en: "eat", he: "ate" }, { en: "see", he: "saw" }, { en: "have", he: "had" }, { en: "make", he: "made" }, { en: "play", he: "played" }] },
      { promptHe: "התאימי כל פועל לצורת העבר שלו", explanationHe: "go–went, eat–ate, see–saw, have–had, make–made. רק play הוא פועל רגיל: play–played.", hintsHe: ["רק פועל אחד כאן מקבל ed."], skillTags: ["grammar", "vocabulary"], vocabIds: ["go", "eat", "see", "have", "play"] },
    ),
    ex.sentenceBuilder(
      { sentence: "I went to the park yesterday.", translationHe: "הלכתי לפארק אתמול.", extraWords: ["go", "today"] },
      { explanationHe: "I went to the park yesterday: בעבר go הופך ל-went. yesterday בא בסוף.", hintsHe: ["בחרי went, לא go.", "yesterday בסוף המשפט."], vocabIds: ["go", "park", "i"] },
    ),
    ex.sentenceBuilder(
      { sentence: "We ate pizza yesterday.", translationHe: "אכלנו פיצה אתמול.", extraWords: ["eat", "eats"] },
      { explanationHe: "We ate pizza yesterday: eat בעבר = ate.", hintsHe: ["eat ← ate."], vocabIds: ["eat", "pizza", "we"] },
    ),
    ex.readRecord(
      { text: "Yesterday I saw a big dog in the park.", translationHe: "אתמול ראיתי כלב גדול בפארק." },
      { explanationHe: "קראי בקול: Yesterday I saw a big dog in the park. saw נשמע 'סוֹ'.", vocabIds: ["see", "big", "dog", "park"] },
    ),
  ],
});

const l5 = defineLesson({
  id: "w6-l5",
  titleHe: "סדר מילים: and, but, because",
  titleEn: "Word Order & Connectors",
  worldId: "w6",
  unitId: "w6u2",
  order: 5,
  level: 3,
  learningObjectives: ["לסדר משפט: מי – מה עושה – מה (I eat an apple)", "לשים את התואר לפני שם העצם: a big dog", "לחבר משפטים עם and, but, because"],
  vocabIds: ["and", "but", "because", "very", "big", "small", "white", "new", "happy", "tired", "hot", "cat", "dog", "pen", "bread", "milk", "apple", "banana", "elephant", "ice-cream", "pizza", "fish"],
  intro: {
    titleHe: "סדר המילים במשפט",
    bodyHe: "במשפט באנגלית יש סדר קבוע: קודם מי (I), אחר כך מה עושה (eat), ואז מה (an apple): I eat an apple. התואר בא לפני שם העצם – a big dog, ולא a dog big. כדי לחבר שני חלקים משתמשים ב-and (ו-, מוסיף), but (אבל, מנגיד) ו-because (כי, מסביר למה).",
    examples: [
      { en: "I have a big dog.", he: "יש לי כלב גדול." },
      { en: "We eat bread and drink milk.", he: "אנחנו אוכלים לחם ושותים חלב." },
      { en: "I like cats but not dogs.", he: "אני אוהבת חתולים אבל לא כלבים." },
      { en: "I am happy because it is Friday.", he: "אני שמחה כי יום שישי." },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "I have ___.", options: ["a big dog", "a dog big", "big a dog"], correct: "a big dog" },
      { promptHe: "איזה סדר נכון?", explanationHe: "באנגלית התואר בא לפני שם העצם: a big dog. קודם a, אחר כך התואר (big), ובסוף שם העצם (dog).", hintsHe: ["בעברית אומרים 'כלב גדול', אבל באנגלית הפוך.", "a + תואר + שם עצם."], vocabIds: ["have", "big", "dog"] },
    ),
    ex.sentenceBuilder(
      { sentence: "I have a big dog.", translationHe: "יש לי כלב גדול.", extraWords: ["is"] },
      { explanationHe: "I have a big dog: מי (I), מה (have), ואז a + big + dog. התואר לפני שם העצם.", hintsHe: ["התחילי עם I have.", "big בא לפני dog."], vocabIds: ["have", "big", "dog"] },
    ),
    ex.chooseInContext(
      { questionEn: "She has ___.", options: ["a new pen", "a pen new", "new a pen"], correct: "a new pen" },
      { promptHe: "איזה סדר נכון?", explanationHe: "a new pen: a, ואז התואר new, ואז שם העצם pen.", hintsHe: ["התואר (new) לפני שם העצם (pen)."], vocabIds: ["have", "new", "pen"] },
    ),
    ex.sentenceBuilder(
      { sentence: "The cat is small and white.", translationHe: "החתול קטן ולבן.", extraWords: ["cats"] },
      { explanationHe: "The cat is small and white: and מחבר בין שני תארים – small ו-white.", hintsHe: ["התחילי עם The cat is.", "and באמצע, בין small ל-white."], vocabIds: ["cat", "small", "and", "white"] },
    ),
    ex.sentenceBuilder(
      { sentence: "We eat bread and drink milk.", translationHe: "אנחנו אוכלים לחם ושותים חלב.", extraWords: ["eats"] },
      { explanationHe: "We eat bread and drink milk: and מחבר בין שתי פעולות. אחרי eat בא bread, ואחרי drink בא milk.", hintsHe: ["eat הולך עם bread, drink הולך עם milk."], vocabIds: ["eat", "bread", "and", "drink", "milk"] },
    ),
    ex.chooseInContext(
      { questionEn: "I like pizza ___ I don't like fish.", options: ["but", "because", "very"], correct: "but" },
      { explanationHe: "but = אבל. משתמשים בו כשיש ניגוד: אוהבת פיצה, אבל לא אוהבת דגים.", hintsHe: ["יש כאן ניגוד: כן פיצה, לא דגים.", "אבל = but."], vocabIds: ["but", "pizza", "fish", "like"] },
    ),
    ex.sentenceBuilder(
      { sentence: "I like cats but not dogs.", translationHe: "אני אוהבת חתולים אבל לא כלבים.", extraWords: ["likes"] },
      { explanationHe: "I like cats but not dogs: but מציג ניגוד. אחרי but בא not dogs.", hintsHe: ["עם I – like בלי s.", "but not dogs בסוף."], vocabIds: ["like", "cat", "but", "dog"] },
    ),
    ex.chooseInContext(
      { questionEn: "I am happy ___ it is my birthday.", options: ["because", "but", "very"], correct: "because" },
      { explanationHe: "because = כי. הוא מסביר למה: אני שמחה כי יום ההולדת שלי.", hintsHe: ["החלק השני מסביר למה אני שמחה.", "כי = because."], vocabIds: ["because", "happy"] },
    ),
    ex.sentenceBuilder(
      { sentence: "I am happy because it is Friday.", translationHe: "אני שמחה כי יום שישי.", extraWords: ["the"] },
      { explanationHe: "I am happy because it is Friday: קודם מה קורה (I am happy), ואז because והסיבה (it is Friday).", hintsHe: ["התחילי עם I am happy.", "because באמצע, ואחריו הסיבה."], vocabIds: ["happy", "because", "i"] },
    ),
    ex.sentenceBuilder(
      { sentence: "My cat sleeps because it is tired.", translationHe: "החתול שלי ישן כי הוא עייף.", extraWords: ["sleep"] },
      { explanationHe: "My cat sleeps because it is tired: My cat = it, לכן sleeps עם s. אחרי because באה הסיבה.", hintsHe: ["בחרי sleeps עם s, כי זה החתול (it).", "because it is tired בסוף."], vocabIds: ["cat", "sleep", "because", "tired"] },
    ),
    ex.fillBlank(
      { sentence: "I like apples ___ bananas.", translationHe: "אני אוהבת תפוחים ובננות.", bank: ["and", "but", "because"], correct: "and" },
      { explanationHe: "and = ו-. הוא מוסיף עוד דבר שאני אוהבת: תפוחים ובננות.", hintsHe: ["אין כאן ניגוד ואין סיבה, רק הוספה."], vocabIds: ["and", "apple", "banana"] },
    ),
    ex.fillBlank(
      { sentence: "The elephant is ___ big.", translationHe: "הפיל גדול מאוד.", bank: ["very", "and", "but"], correct: "very" },
      { explanationHe: "very = מאוד. הוא בא לפני התואר ומחזק אותו: very big = גדול מאוד.", hintsHe: ["איזו מילה מחזקת את big?"], vocabIds: ["very", "big", "elephant"] },
    ),
    ex.listenSentence(
      { audioText: "I want ice cream because I am hot.", transcript: "I want ice cream because I am hot.", transcriptHe: "אני רוצה גלידה כי חם לי.", questionHe: "למה היא רוצה גלידה?", options: ["כי חם לה", "כי היא רעבה", "כי יום שישי"], correct: "כי חם לה" },
      { explanationHe: "שמעת: because I am hot. because = כי, hot = חם. הסיבה באה אחרי because.", hintsHe: ["הקשיבי למה שבא אחרי because."], vocabIds: ["want", "ice-cream", "because", "hot"] },
    ),
  ],
});

export const WORLD6_LESSONS: Lesson[] = [l1, l2, l3, l4, l5];
