import type { Level, PartOfSpeech, Topic, VocabularyItem } from "@/lib/types";

function v(
  word: string,
  translationHe: string,
  emoji: string,
  topic: Topic,
  level: Level,
  partOfSpeech: PartOfSpeech,
  exampleEn: string,
  exampleHe: string,
  pronunciationHint?: string,
  id?: string,
): VocabularyItem {
  return {
    id: id ?? word.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    word,
    translationHe,
    emoji,
    topic,
    level,
    partOfSpeech,
    exampleEn,
    exampleHe,
    pronunciationHint,
  };
}

/**
 * Initial vocabulary bank. Every item was checked for Hebrew / English accuracy.
 * Pictures are emoji placeholders until original illustrations are added (imageUrl).
 */
export const VOCABULARY: VocabularyItem[] = [
  /* ---------- animals (level 0-1) ---------- */
  v("dog", "כלב", "🐶", "animals", 0, "noun", "The dog is big.", "הכלב גדול.", "דוֹג"),
  v("cat", "חתול", "🐱", "animals", 0, "noun", "The cat is sleeping.", "החתול ישן.", "קָאט"),
  v("fish", "דג", "🐟", "animals", 0, "noun", "A fish can swim.", "דג יכול לשחות.", "פִיש"),
  v("bird", "ציפור", "🐦", "animals", 0, "noun", "The bird can fly.", "הציפור יכולה לעוף.", "בֶּרְד"),
  v("cow", "פרה", "🐄", "animals", 1, "noun", "The cow eats grass.", "הפרה אוכלת עשב.", "קַאוּ"),
  v("horse", "סוס", "🐴", "animals", 1, "noun", "The horse is fast.", "הסוס מהיר.", "הוֹרְס"),
  v("rabbit", "ארנב", "🐰", "animals", 1, "noun", "The rabbit likes carrots.", "הארנב אוהב גזר.", "רָאבִּיט"),
  v("lion", "אריה", "🦁", "animals", 1, "noun", "The lion is strong.", "האריה חזק.", "לַיְאוֹן"),
  v("monkey", "קוף", "🐵", "animals", 1, "noun", "The monkey eats a banana.", "הקוף אוכל בננה.", "מַאנְקִי"),
  v("elephant", "פיל", "🐘", "animals", 1, "noun", "The elephant is very big.", "הפיל גדול מאוד.", "אֶלֶפַנְט"),
  v("frog", "צפרדע", "🐸", "animals", 1, "noun", "The frog is green.", "הצפרדע ירוקה.", "פְרוֹג"),
  v("duck", "ברווז", "🦆", "animals", 1, "noun", "The duck is in the water.", "הברווז במים.", "דַאק"),

  /* ---------- family (level 1) ---------- */
  v("mother", "אמא", "👩", "family", 1, "noun", "My mother is kind.", "אמא שלי נחמדה.", "מַאדֶ'ר"),
  v("father", "אבא", "👨", "family", 1, "noun", "My father likes football.", "אבא שלי אוהב כדורגל.", "פַאדֶ'ר"),
  v("sister", "אחות", "👧", "family", 1, "noun", "I have one sister.", "יש לי אחות אחת.", "סִיסְטֶר"),
  v("brother", "אח", "👦", "family", 1, "noun", "My brother is ten.", "אח שלי בן עשר.", "בְּרַאדֶ'ר"),
  v("grandmother", "סבתא", "👵", "family", 1, "noun", "My grandmother bakes cookies.", "סבתא שלי אופה עוגיות.", "גְרַנְדְמַאדֶ'ר"),
  v("grandfather", "סבא", "👴", "family", 1, "noun", "My grandfather tells stories.", "סבא שלי מספר סיפורים.", "גְרַנְדְפַאדֶ'ר"),
  v("baby", "תינוק", "👶", "family", 1, "noun", "The baby is sleeping.", "התינוק ישן.", "בֵּיְיבִּי"),
  v("family", "משפחה", "👨‍👩‍👧", "family", 1, "noun", "I love my family.", "אני אוהבת את המשפחה שלי.", "פֶמִילִי"),
  v("friend", "חבר / חברה", "🤝", "family", 1, "noun", "She is my best friend.", "היא החברה הכי טובה שלי.", "פְרֶנְד"),

  /* ---------- home (level 1) ---------- */
  v("house", "בית", "🏠", "home", 1, "noun", "My house is small.", "הבית שלי קטן.", "הַאוּס"),
  v("door", "דלת", "🚪", "home", 0, "noun", "Open the door, please.", "פתחי את הדלת, בבקשה.", "דוֹר"),
  v("window", "חלון", "🪟", "home", 1, "noun", "The window is open.", "החלון פתוח.", "וִוינְדוֹ"),
  v("bed", "מיטה", "🛏️", "home", 0, "noun", "I sleep in my bed.", "אני ישנה במיטה שלי.", "בֶּד"),
  v("table", "שולחן", "🪑", "home", 1, "noun", "The book is on the table.", "הספר על השולחן.", "טֵיְיבֶּל"),
  v("chair", "כיסא", "💺", "home", 1, "noun", "Sit on the chair.", "שבי על הכיסא.", "צֶ'ר"),
  v("kitchen", "מטבח", "🍳", "home", 1, "noun", "Mom is in the kitchen.", "אמא במטבח.", "קִיצֶ'ן"),
  v("room", "חדר", "🛋️", "home", 1, "noun", "This is my room.", "זה החדר שלי.", "רוּם"),
  v("key", "מפתח", "🔑", "home", 1, "noun", "Where is the key?", "איפה המפתח?", "קִי"),
  v("lamp", "מנורה", "💡", "home", 1, "noun", "Turn on the lamp.", "הדליקי את המנורה.", "לַמְפּ"),

  /* ---------- school (level 1) ---------- */
  v("school", "בית ספר", "🏫", "school", 1, "noun", "I go to school every day.", "אני הולכת לבית הספר כל יום.", "סְקוּל"),
  v("book", "ספר", "📘", "school", 0, "noun", "I read a book.", "אני קוראת ספר.", "בּוּק"),
  v("pen", "עט", "🖊️", "school", 0, "noun", "This is a blue pen.", "זה עט כחול.", "פֶּן"),
  v("pencil", "עיפרון", "✏️", "school", 1, "noun", "I write with a pencil.", "אני כותבת בעיפרון.", "פֶּנְסִיל"),
  v("bag", "תיק", "🎒", "school", 0, "noun", "My bag is heavy.", "התיק שלי כבד.", "בַּאג"),
  v("teacher", "מורה", "🧑‍🏫", "school", 1, "noun", "The teacher is nice.", "המורה נחמדה.", "טִיצֶ'ר"),
  v("class", "כיתה", "🏛️", "school", 1, "noun", "My class is big.", "הכיתה שלי גדולה.", "קְלַאס"),
  v("desk", "שולחן כתיבה", "🪵", "school", 1, "noun", "The pencil is on the desk.", "העיפרון על שולחן הכתיבה.", "דֶסְק"),
  v("student", "תלמיד / תלמידה", "🧒", "school", 1, "noun", "I am a student.", "אני תלמידה.", "סְטוּדֶנְט"),
  v("homework", "שיעורי בית", "📝", "school", 2, "noun", "I do my homework.", "אני מכינה שיעורי בית.", "הוֹמְוֶורְק"),

  /* ---------- colors (level 1) ---------- */
  v("red", "אדום", "🔴", "colors", 0, "adjective", "The apple is red.", "התפוח אדום.", "רֶד"),
  v("blue", "כחול", "🔵", "colors", 0, "adjective", "The sky is blue.", "השמיים כחולים.", "בְּלוּ"),
  v("green", "ירוק", "🟢", "colors", 1, "adjective", "The frog is green.", "הצפרדע ירוקה.", "גְרִין"),
  v("yellow", "צהוב", "🟡", "colors", 1, "adjective", "The sun is yellow.", "השמש צהובה.", "יֶלוֹ"),
  v("black", "שחור", "⚫", "colors", 1, "adjective", "The cat is black.", "החתול שחור.", "בְּלַאק"),
  v("white", "לבן", "⚪", "colors", 1, "adjective", "The snow is white.", "השלג לבן.", "וַוייט"),
  v("orange", "כתום", "🟠", "colors", 1, "adjective", "I have an orange ball.", "יש לי כדור כתום.", "אוֹרֶנְג'"),
  v("purple", "סגול", "🟣", "colors", 1, "adjective", "Her bag is purple.", "התיק שלה סגול.", "פֶּרְפֶּל"),
  v("pink", "ורוד", "🩷", "colors", 1, "adjective", "The flower is pink.", "הפרח ורוד.", "פִּינְק"),

  /* ---------- numbers (level 1) ---------- */
  v("one", "אחת / אחד", "1️⃣", "numbers", 0, "number", "I have one dog.", "יש לי כלב אחד.", "וַואן"),
  v("two", "שתיים / שניים", "2️⃣", "numbers", 0, "number", "I have two cats.", "יש לי שני חתולים.", "טוּ"),
  v("three", "שלוש / שלושה", "3️⃣", "numbers", 0, "number", "Three birds are flying.", "שלוש ציפורים עפות.", "תְ'רִי"),
  v("four", "ארבע / ארבעה", "4️⃣", "numbers", 1, "number", "The table has four legs.", "לשולחן יש ארבע רגליים.", "פוֹר"),
  v("five", "חמש / חמישה", "5️⃣", "numbers", 1, "number", "I have five fingers.", "יש לי חמש אצבעות.", "פַייב"),
  v("six", "שש / שישה", "6️⃣", "numbers", 1, "number", "There are six apples.", "יש שישה תפוחים.", "סִיקְס"),
  v("seven", "שבע / שבעה", "7️⃣", "numbers", 1, "number", "A week has seven days.", "בשבוע יש שבעה ימים.", "סֶבֶן"),
  v("eight", "שמונה", "8️⃣", "numbers", 1, "number", "The spider has eight legs.", "לעכביש יש שמונה רגליים.", "אֵייט"),
  v("nine", "תשע / תשעה", "9️⃣", "numbers", 1, "number", "My cousin is nine.", "בן הדוד שלי בן תשע.", "נַיין"),
  v("ten", "עשר / עשרה", "🔟", "numbers", 1, "number", "I have ten fingers.", "יש לי עשר אצבעות.", "טֶן"),

  /* ---------- food (level 1) ---------- */
  v("apple", "תפוח", "🍎", "food", 0, "noun", "I eat an apple.", "אני אוכלת תפוח.", "אַפֶּל"),
  v("banana", "בננה", "🍌", "food", 0, "noun", "The banana is yellow.", "הבננה צהובה.", "בַּנַאנָה"),
  v("bread", "לחם", "🍞", "food", 1, "noun", "I like bread with cheese.", "אני אוהבת לחם עם גבינה.", "בְּרֶד"),
  v("milk", "חלב", "🥛", "food", 1, "noun", "The baby drinks milk.", "התינוק שותה חלב.", "מִילְק"),
  v("water", "מים", "💧", "food", 0, "noun", "I drink water.", "אני שותה מים.", "ווֹטֶר"),
  v("egg", "ביצה", "🥚", "food", 0, "noun", "I eat an egg for breakfast.", "אני אוכלת ביצה לארוחת בוקר.", "אֶג"),
  v("pizza", "פיצה", "🍕", "food", 1, "noun", "We eat pizza on Friday.", "אנחנו אוכלים פיצה ביום שישי.", "פִּיצָה"),
  v("cake", "עוגה", "🍰", "food", 1, "noun", "The cake is sweet.", "העוגה מתוקה.", "קֵייק"),
  v("rice", "אורז", "🍚", "food", 1, "noun", "I like rice and chicken.", "אני אוהבת אורז ועוף.", "רַייס"),
  v("juice", "מיץ", "🧃", "food", 1, "noun", "Orange juice is tasty.", "מיץ תפוזים טעים.", "ג'וּס"),
  v("ice cream", "גלידה", "🍦", "food", 1, "noun", "I want ice cream!", "אני רוצה גלידה!", "אַייס קְרִים", "ice-cream"),
  v("cookie", "עוגייה", "🍪", "food", 1, "noun", "The cookie is yummy.", "העוגייה טעימה.", "קוּקִי"),

  /* ---------- body (level 1) ---------- */
  v("head", "ראש", "🙂", "body", 1, "noun", "I have a hat on my head.", "יש לי כובע על הראש.", "הֶד"),
  v("hand", "יד", "✋", "body", 0, "noun", "Wash your hands.", "שטפי ידיים.", "הַאנְד"),
  v("eye", "עין", "👁️", "body", 0, "noun", "I have two eyes.", "יש לי שתי עיניים.", "אַיי"),
  v("nose", "אף", "👃", "body", 1, "noun", "The clown has a red nose.", "לליצן יש אף אדום.", "נוֹז"),
  v("mouth", "פה", "👄", "body", 1, "noun", "Open your mouth.", "פתחי את הפה.", "מַאוּת'"),
  v("ear", "אוזן", "👂", "body", 1, "noun", "I hear with my ears.", "אני שומעת עם האוזניים.", "אִיר"),
  v("foot", "כף רגל", "🦶", "body", 1, "noun", "My foot hurts.", "כף הרגל שלי כואבת.", "פוּט"),
  v("hair", "שיער", "💇", "body", 1, "noun", "She has long hair.", "יש לה שיער ארוך.", "הֶר"),

  /* ---------- clothes (level 1) ---------- */
  v("hat", "כובע", "🧢", "clothes", 0, "noun", "I wear a hat in the sun.", "אני חובשת כובע בשמש.", "הַאט"),
  v("shoe", "נעל", "👟", "clothes", 1, "noun", "This shoe is new.", "הנעל הזאת חדשה.", "שוּ"),
  v("shirt", "חולצה", "👕", "clothes", 1, "noun", "My shirt is green.", "החולצה שלי ירוקה.", "שֶרְט"),
  v("dress", "שמלה", "👗", "clothes", 1, "noun", "She wears a pink dress.", "היא לובשת שמלה ורודה.", "דְרֶס"),
  v("sock", "גרב", "🧦", "clothes", 1, "noun", "I have one blue sock.", "יש לי גרב כחול אחד.", "סוֹק"),
  v("coat", "מעיל", "🧥", "clothes", 1, "noun", "It is cold. Take a coat.", "קר. קחי מעיל.", "קוֹט"),

  /* ---------- everyday objects / nature / places ---------- */
  v("ball", "כדור", "⚽", "everyday", 0, "noun", "Kick the ball!", "בעטי בכדור!", "בּוֹל"),
  v("car", "מכונית", "🚗", "everyday", 0, "noun", "The car is red.", "המכונית אדומה.", "קַאר"),
  v("bus", "אוטובוס", "🚌", "everyday", 1, "noun", "I take the bus to school.", "אני נוסעת באוטובוס לבית הספר.", "בַּאס"),
  v("phone", "טלפון", "📱", "everyday", 1, "noun", "Dad is on the phone.", "אבא מדבר בטלפון.", "פוֹן"),
  v("game", "משחק", "🎮", "everyday", 1, "noun", "Let's play a game.", "בואו נשחק משחק.", "גֵיים"),
  v("sun", "שמש", "☀️", "nature", 0, "noun", "The sun is hot.", "השמש חמה.", "סַאן"),
  v("moon", "ירח", "🌙", "nature", 0, "noun", "The moon is white.", "הירח לבן.", "מוּן"),
  v("star", "כוכב", "⭐", "nature", 0, "noun", "I see a star.", "אני רואה כוכב.", "סְטַאר"),
  v("tree", "עץ", "🌳", "nature", 0, "noun", "The tree is tall.", "העץ גבוה.", "טְרִי"),
  v("flower", "פרח", "🌸", "nature", 1, "noun", "The flower is pink.", "הפרח ורוד.", "פְלַאוּאֶר"),
  v("rain", "גשם", "🌧️", "nature", 1, "noun", "I like the rain.", "אני אוהבת את הגשם.", "רֵיין"),
  v("sea", "ים", "🌊", "nature", 1, "noun", "We swim in the sea.", "אנחנו שוחים בים.", "סִי"),
  v("park", "פארק", "🏞️", "places", 1, "noun", "We play in the park.", "אנחנו משחקים בפארק.", "פַּארְק"),
  v("shop", "חנות", "🏪", "places", 2, "noun", "The shop is open.", "החנות פתוחה.", "שוֹפּ"),
  v("city", "עיר", "🏙️", "places", 2, "noun", "I live in a big city.", "אני גרה בעיר גדולה.", "סִיטִי"),

  /* ---------- verbs (level 1-2) ---------- */
  v("run", "לרוץ", "🏃", "verbs", 1, "verb", "I run fast.", "אני רצה מהר.", "רַאן"),
  v("jump", "לקפוץ", "🤸", "verbs", 1, "verb", "The frog can jump.", "הצפרדע יכולה לקפוץ.", "גַ'אמְפּ"),
  v("eat", "לאכול", "🍽️", "verbs", 1, "verb", "I eat an apple.", "אני אוכלת תפוח.", "אִיט"),
  v("drink", "לשתות", "🥤", "verbs", 1, "verb", "I drink water.", "אני שותה מים.", "דְרִינְק"),
  v("sleep", "לישון", "😴", "verbs", 1, "verb", "Cats sleep a lot.", "חתולים ישנים הרבה.", "סְלִיפּ"),
  v("play", "לשחק", "🎲", "verbs", 1, "verb", "We play football.", "אנחנו משחקים כדורגל.", "פְּלֵיי"),
  v("read", "לקרוא", "📖", "verbs", 1, "verb", "I read a book.", "אני קוראת ספר.", "רִיד"),
  v("write", "לכתוב", "✍️", "verbs", 1, "verb", "I write my name.", "אני כותבת את השם שלי.", "רַייט"),
  v("sing", "לשיר", "🎤", "verbs", 1, "verb", "She likes to sing.", "היא אוהבת לשיר.", "סִינְג"),
  v("swim", "לשחות", "🏊", "verbs", 1, "verb", "Fish swim in the sea.", "דגים שוחים בים.", "סְוִוים"),
  v("like", "לאהוב / לחבב", "👍", "verbs", 1, "verb", "I like pizza.", "אני אוהבת פיצה.", "לַייק"),
  v("have", "יש ל... / להחזיק", "🎁", "verbs", 1, "verb", "I have a dog.", "יש לי כלב.", "הַאב"),
  v("go", "ללכת", "🚶", "verbs", 1, "verb", "I go to school.", "אני הולכת לבית הספר.", "גוֹ"),
  v("see", "לראות", "👀", "verbs", 1, "verb", "I see a bird.", "אני רואה ציפור.", "סִי"),
  v("want", "לרצות", "🙋", "verbs", 2, "verb", "I want ice cream.", "אני רוצה גלידה.", "ווֹנְט"),
  v("help", "לעזור", "🆘", "verbs", 2, "verb", "Can you help me?", "את יכולה לעזור לי?", "הֶלְפּ"),
  v("open", "לפתוח", "📂", "verbs", 2, "verb", "Open the window.", "פתחי את החלון.", "אוֹפֶּן"),
  v("look", "להסתכל", "🔍", "verbs", 2, "verb", "Look at the picture.", "הסתכלי על התמונה.", "לוּק"),
  v("walk", "ללכת ברגל", "🚶‍♀️", "verbs", 2, "verb", "I walk to the park.", "אני הולכת ברגל לפארק.", "ווֹק"),
  v("dance", "לרקוד", "💃", "verbs", 2, "verb", "We dance at the party.", "אנחנו רוקדים במסיבה.", "דַאנְס"),
  v("talk", "לדבר", "💬", "verbs", 2, "verb", "I talk with my friend.", "אני מדברת עם החברה שלי.", "טוֹק"),
  v("listen", "להקשיב", "🎧", "verbs", 2, "verb", "Listen to the song.", "הקשיבי לשיר.", "לִיסֶן"),

  /* ---------- adjectives (level 1-2) ---------- */
  v("big", "גדול", "🐘", "adjectives", 0, "adjective", "The elephant is big.", "הפיל גדול.", "בִּיג"),
  v("small", "קטן", "🐭", "adjectives", 0, "adjective", "The mouse is small.", "העכבר קטן.", "סְמוֹל"),
  v("hot", "חם", "🔥", "adjectives", 1, "adjective", "The soup is hot.", "המרק חם.", "הוֹט"),
  v("cold", "קר", "❄️", "adjectives", 1, "adjective", "Ice cream is cold.", "גלידה קרה.", "קוֹלְד"),
  v("happy", "שמח", "😊", "feelings", 1, "adjective", "I am happy today.", "אני שמחה היום.", "הַאפִּי"),
  v("sad", "עצוב", "😢", "feelings", 1, "adjective", "He is sad.", "הוא עצוב.", "סַאד"),
  v("tired", "עייף", "🥱", "feelings", 2, "adjective", "I am tired.", "אני עייפה.", "טַאיֶרְד"),
  v("hungry", "רעב", "😋", "feelings", 2, "adjective", "I am hungry. Let's eat!", "אני רעבה. בואו נאכל!", "הַאנְגְרִי"),
  v("fast", "מהיר", "🚀", "adjectives", 1, "adjective", "The car is fast.", "המכונית מהירה.", "פַאסְט"),
  v("slow", "איטי", "🐌", "adjectives", 1, "adjective", "The snail is slow.", "החילזון איטי.", "סְלוֹ"),
  v("new", "חדש", "✨", "adjectives", 1, "adjective", "I have a new bag.", "יש לי תיק חדש.", "נְיוּ"),
  v("old", "ישן / זקן", "🏺", "adjectives", 1, "adjective", "This book is old.", "הספר הזה ישן.", "אוֹלְד"),
  v("good", "טוב", "👍", "adjectives", 1, "adjective", "This is a good idea.", "זה רעיון טוב.", "גוּד"),
  v("nice", "נחמד", "🙂", "adjectives", 1, "adjective", "My teacher is nice.", "המורה שלי נחמדה.", "נַייס"),
  v("tall", "גבוה", "🦒", "adjectives", 2, "adjective", "The giraffe is tall.", "הג'ירפה גבוהה.", "טוֹל"),
  v("beautiful", "יפה", "🌈", "adjectives", 2, "adjective", "The flower is beautiful.", "הפרח יפה.", "בְּיוּטִיפוּל"),
  v("funny", "מצחיק", "🤣", "adjectives", 2, "adjective", "The monkey is funny.", "הקוף מצחיק.", "פַאנִי"),

  /* ---------- pronouns (level 2) ---------- */
  v("I", "אני", "🙋‍♀️", "pronouns", 1, "pronoun", "I am Dana.", "אני דנה.", "אַיי", "i"),
  v("you", "אתה / את / אתם", "👉", "pronouns", 1, "pronoun", "You are my friend.", "את החברה שלי.", "יוּ"),
  v("he", "הוא", "👦", "pronouns", 1, "pronoun", "He is my brother.", "הוא אח שלי.", "הִי"),
  v("she", "היא", "👧", "pronouns", 1, "pronoun", "She is my sister.", "היא אחותי.", "שִי"),
  v("it", "זה (לחפץ או חיה)", "📦", "pronouns", 1, "pronoun", "It is a ball.", "זה כדור.", "אִיט"),
  v("we", "אנחנו", "👫", "pronouns", 1, "pronoun", "We are happy.", "אנחנו שמחים.", "וִוי"),
  v("they", "הם / הן", "👨‍👩‍👧‍👦", "pronouns", 1, "pronoun", "They are at school.", "הם בבית הספר.", "דֵ'יי"),

  /* ---------- greetings / everyday phrases (level 1-2) ---------- */
  v("hello", "שלום (ברכה)", "👋", "greetings", 0, "phrase", "Hello! My name is Noa.", "שלום! קוראים לי נועה.", "הֶלוֹ"),
  v("goodbye", "להתראות", "🖐️", "greetings", 1, "phrase", "Goodbye! See you tomorrow.", "להתראות! נתראה מחר.", "גוּדְבַּיי"),
  v("please", "בבקשה", "🙏", "greetings", 1, "phrase", "Water, please.", "מים, בבקשה.", "פְּלִיז"),
  v("thank you", "תודה", "💐", "greetings", 1, "phrase", "Thank you very much!", "תודה רבה!", "תֶ'נְק יוּ", "thank-you"),
  v("sorry", "סליחה", "😳", "greetings", 1, "phrase", "Sorry, I am late.", "סליחה, איחרתי.", "סוֹרִי"),
  v("yes", "כן", "✅", "greetings", 0, "phrase", "Yes, I like cats.", "כן, אני אוהבת חתולים.", "יֶס"),
  v("no", "לא", "❌", "greetings", 0, "phrase", "No, thank you.", "לא, תודה.", "נוֹ"),
  v("good morning", "בוקר טוב", "🌅", "greetings", 1, "phrase", "Good morning, class!", "בוקר טוב, כיתה!", "גוּד מוֹרְנִינְג", "good-morning"),
  v("good night", "לילה טוב", "🌃", "greetings", 1, "phrase", "Good night, Mom.", "לילה טוב, אמא.", "גוּד נַייט", "good-night"),
  v("how are you", "מה שלומך", "🤗", "greetings", 1, "phrase", "Hi! How are you?", "היי! מה שלומך?", "הַאוּ אַר יוּ", "how-are-you"),
  v("my name is", "קוראים לי", "🏷️", "greetings", 1, "phrase", "My name is Alma.", "קוראים לי אלמה.", "מַיי נֵיים אִיז", "my-name-is"),

  /* ---------- question words (level 2) ---------- */
  v("what", "מה", "❓", "questions", 2, "question", "What is this?", "מה זה?", "ווֹט"),
  v("where", "איפה", "📍", "questions", 2, "question", "Where is my bag?", "איפה התיק שלי?", "וֶור"),
  v("who", "מי", "🧑", "questions", 2, "question", "Who is she?", "מי היא?", "הוּ"),
  v("when", "מתי", "⏰", "questions", 2, "question", "When is the party?", "מתי המסיבה?", "וֶון"),
  v("why", "למה", "🤔", "questions", 2, "question", "Why are you sad?", "למה את עצובה?", "ווַיי"),
  v("how", "איך", "🛠️", "questions", 2, "question", "How old are you?", "בת כמה את?", "הַאוּ"),

  /* ---------- time (level 2) ---------- */
  v("today", "היום", "📅", "time", 2, "other", "Today is Sunday.", "היום יום ראשון.", "טוּדֵיי"),
  v("tomorrow", "מחר", "⏭️", "time", 2, "other", "Tomorrow we go to the park.", "מחר אנחנו הולכים לפארק.", "טוּמוֹרוֹ"),
  v("morning", "בוקר", "🌄", "time", 2, "noun", "I eat eggs in the morning.", "אני אוכלת ביצים בבוקר.", "מוֹרְנִינְג"),
  v("night", "לילה", "🌙", "time", 2, "noun", "At night I sleep.", "בלילה אני ישנה.", "נַייט"),
  v("day", "יום", "🌞", "time", 1, "noun", "Have a nice day!", "שיהיה לך יום נעים!", "דֵיי"),
  v("week", "שבוע", "🗓️", "time", 2, "noun", "I swim twice a week.", "אני שוחה פעמיים בשבוע.", "וִויק"),

  /* ---------- prepositions / grammar words (level 2) ---------- */
  v("in", "בתוך / ב-", "📥", "grammar", 2, "preposition", "The cat is in the box.", "החתול בתוך הקופסה.", "אִין"),
  v("on", "על", "🔝", "grammar", 2, "preposition", "The book is on the table.", "הספר על השולחן.", "אוֹן"),
  v("under", "מתחת", "⬇️", "grammar", 2, "preposition", "The ball is under the bed.", "הכדור מתחת למיטה.", "אַנְדֶר"),
  v("with", "עם", "🤝", "grammar", 2, "preposition", "I play with my friend.", "אני משחקת עם החברה שלי.", "וִוית'"),
  v("and", "ו-", "➕", "grammar", 1, "other", "I like cats and dogs.", "אני אוהבת חתולים וכלבים.", "אֶנְד"),
  v("but", "אבל", "↔️", "grammar", 2, "other", "I like milk but not cheese.", "אני אוהבת חלב אבל לא גבינה.", "בַּאט"),
  v("because", "כי / בגלל ש", "💡", "grammar", 3, "other", "I am happy because it is Friday.", "אני שמחה כי יום שישי.", "בִּיקוֹז"),
  v("very", "מאוד", "💯", "grammar", 2, "other", "The cake is very good.", "העוגה טובה מאוד.", "וֶרִי"),
];

export const VOCAB_BY_ID: Record<string, VocabularyItem> = Object.fromEntries(VOCABULARY.map((item) => [item.id, item]));

export function getVocab(id: string): VocabularyItem {
  const item = VOCAB_BY_ID[id];
  if (!item) throw new Error(`Unknown vocabulary id: ${id}`);
  return item;
}

export function vocabByTopic(topic: Topic): VocabularyItem[] {
  return VOCABULARY.filter((item) => item.topic === topic);
}
