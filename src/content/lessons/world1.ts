import { defineLesson } from "../builders";
import type { Lesson } from "@/lib/types";

/**
 * World 1 – English Starter.
 * Letters, upper/lower case, letter sounds and first words.
 * Letter exercises use "choose-in-context" / "choose-word" with letters as options,
 * and the vocabulary bank for first words.
 */

const l1 = defineLesson({
  id: "w1-l1",
  titleHe: "האותיות הראשונות: A, B, C, D",
  titleEn: "First Letters: A, B, C, D",
  worldId: "w1",
  unitId: "w1u1",
  order: 1,
  level: 0,
  learningObjectives: ["לזהות את האותיות A, B, C, D", "להתאים אות גדולה לאות קטנה", "לשמוע את שם האות ולזהות אותה"],
  vocabIds: ["apple", "ball", "cat", "dog"],
  intro: {
    titleHe: "האלף-בית באנגלית",
    bodyHe: "באנגלית יש 26 אותיות. לכל אות יש צורה גדולה (A) וצורה קטנה (a). כותבים וקוראים משמאל לימין. נתחיל בארבע הראשונות.",
    examples: [
      { en: "A a — apple", he: "תפוח" },
      { en: "B b — ball", he: "כדור" },
      { en: "C c — cat", he: "חתול" },
      { en: "D d — dog", he: "כלב" },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext(
      { questionEn: "A", options: ["a", "b", "d", "c"], correct: "a" },
      { promptHe: "איזו אות קטנה מתאימה לאות הגדולה A?", explanationHe: "האות הגדולה A נכתבת בקטן כך: a. שתיהן אותה אות.", skillTags: ["reading"], hintsHe: ["האות הקטנה נראית כמו עיגול עם זנב קטן."] },
    ),
    ex.chooseInContext(
      { questionEn: "B", options: ["d", "b", "p", "a"], correct: "b" },
      { promptHe: "איזו אות קטנה מתאימה לאות הגדולה B?", explanationHe: "B גדולה נכתבת בקטן כ-b. שימי לב: ל-b הבטן פונה ימינה, ול-d הבטן פונה שמאלה.", skillTags: ["reading"], hintsHe: ["הקו של b למעלה, והבטן בצד ימין."] },
    ),
    ex.chooseInContext(
      { questionEn: "c", options: ["C", "G", "O", "D"], correct: "C" },
      { promptHe: "איזו אות גדולה מתאימה לאות הקטנה c?", explanationHe: "c קטנה ו-C גדולה נראות כמעט אותו דבר, רק בגודל שונה.", skillTags: ["reading"] },
    ),
    ex.chooseInContext(
      { questionEn: "d", options: ["B", "D", "P", "O"], correct: "D" },
      { promptHe: "איזו אות גדולה מתאימה לאות הקטנה d?", explanationHe: "d קטנה היא D גדולה. D נראית כמו חצי עיגול עם קו.", skillTags: ["reading"] },
    ),
    ex.chooseTranslation(
      { questionEn: "A", options: ["A", "B", "C", "D"], correct: "A", audioText: "A" },
      { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות A נשמע כמו 'אֵיי'.", skillTags: ["listening"], hintsHe: ["זו האות הראשונה באלף-בית."] },
    ),
    ex.chooseTranslation(
      { questionEn: "D", options: ["B", "C", "D", "A"], correct: "D", audioText: "D" },
      { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות D נשמע כמו 'דִי'. B נשמעת 'בִּי' ו-C נשמעת 'סִי'.", skillTags: ["listening"] },
    ),
    ex.chooseTranslation(
      { questionEn: "B", options: ["B", "D", "A", "C"], correct: "B", audioText: "B" },
      { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות B נשמע כמו 'בִּי'.", skillTags: ["listening"] },
    ),
    ex.wordToImage({ vocabId: "apple", options: ["apple", "ball", "dog", "cat"] }, { explanationHe: "apple = תפוח. המילה מתחילה באות A.", hintsHe: ["המילה מתחילה ב-A, כמו... תפוח!"] }),
    ex.wordToImage({ vocabId: "dog", options: ["cat", "dog", "ball", "apple"] }, { explanationHe: "dog = כלב. המילה מתחילה באות D." }),
    ex.missingLetter({ word: "cat", missingIndex: 0, options: ["c", "b", "d", "a"], vocabId: "cat" }, { explanationHe: "cat (חתול) מתחילה באות c.", hintsHe: ["הצליל הראשון במילה הוא 'ק'."] }),
    ex.missingLetter({ word: "ball", missingIndex: 0, options: ["d", "b", "c", "a"], vocabId: "ball" }, { explanationHe: "ball (כדור) מתחילה באות b.", hintsHe: ["הצליל הראשון במילה הוא 'בּ'."] }),
  ],
});

const l2 = defineLesson({
  id: "w1-l2",
  titleHe: "האותיות E, F, G, H",
  titleEn: "Letters E, F, G, H",
  worldId: "w1",
  unitId: "w1u1",
  order: 2,
  level: 0,
  learningObjectives: ["לזהות את האותיות E, F, G, H", "לקשר אות לצליל ולמילה"],
  vocabIds: ["egg", "fish", "green", "hat"],
  intro: {
    titleHe: "עוד ארבע אותיות",
    bodyHe: "E נשמעת כמו 'אִי', F כמו 'אֶף', G כמו 'גִ'י' ו-H כמו 'אֵייץ''. בתוך מילים הן נשמעות קצת אחרת, ונתרגל את זה.",
    examples: [
      { en: "E e — egg", he: "ביצה" },
      { en: "F f — fish", he: "דג" },
      { en: "G g — green", he: "ירוק" },
      { en: "H h — hat", he: "כובע" },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext({ questionEn: "E", options: ["e", "f", "a", "c"], correct: "e" }, { promptHe: "איזו אות קטנה מתאימה לאות הגדולה E?", explanationHe: "E גדולה היא e קטנה.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "G", options: ["q", "g", "p", "y"], correct: "g" }, { promptHe: "איזו אות קטנה מתאימה לאות הגדולה G?", explanationHe: "G גדולה היא g קטנה. ל-g יש זנב שיורד למטה.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "h", options: ["N", "H", "K", "M"], correct: "H" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה h?", explanationHe: "h קטנה היא H גדולה.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "f", options: ["F", "E", "T", "P"], correct: "F" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה f?", explanationHe: "f קטנה היא F גדולה. ל-F יש שני קווים אופקיים, ל-E שלושה.", skillTags: ["reading"] }),
    ex.chooseTranslation({ questionEn: "E", options: ["E", "F", "G", "H"], correct: "E", audioText: "E" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות E נשמע 'אִי'.", skillTags: ["listening"] }),
    ex.chooseTranslation({ questionEn: "H", options: ["G", "E", "H", "F"], correct: "H", audioText: "H" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות H נשמע 'אֵייץ''.", skillTags: ["listening"] }),
    ex.chooseTranslation({ questionEn: "G", options: ["G", "E", "F", "H"], correct: "G", audioText: "G" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות G נשמע 'גִ'י'.", skillTags: ["listening"] }),
    ex.wordToImage({ vocabId: "fish", options: ["fish", "hat", "egg", "dog"] }, { explanationHe: "fish = דג. המילה מתחילה באות F.", hintsHe: ["המילה מתחילה ב-F."] }),
    ex.wordToImage({ vocabId: "hat", options: ["egg", "fish", "hat", "cat"] }, { explanationHe: "hat = כובע. המילה מתחילה באות H." }),
    ex.missingLetter({ word: "egg", missingIndex: 0, options: ["e", "a", "o", "g"], vocabId: "egg" }, { explanationHe: "egg (ביצה) מתחילה באות e.", hintsHe: ["הצליל הראשון הוא 'אֶ'."] }),
    ex.missingLetter({ word: "hat", missingIndex: 0, options: ["b", "h", "f", "n"], vocabId: "hat" }, { explanationHe: "hat (כובע) מתחילה באות h.", hintsHe: ["הצליל הראשון הוא 'ה'."] }),
  ],
});

const l3 = defineLesson({
  id: "w1-l3",
  titleHe: "האותיות I עד P",
  titleEn: "Letters I to P",
  worldId: "w1",
  unitId: "w1u1",
  order: 3,
  level: 0,
  learningObjectives: ["לזהות את האותיות I, J, K, L, M, N, O, P", "להבחין בין אותיות דומות"],
  vocabIds: ["key", "lion", "moon", "nose", "pen"],
  intro: {
    titleHe: "מ-I עד P",
    bodyHe: "הפעם נכיר שמונה אותיות בבת אחת, אבל אל דאגה: נתרגל כל אחת לאט. שימי לב ל-I (אַיי) ול-J (גֵ'יי) שנראות דומות.",
    examples: [
      { en: "I i — ice cream", he: "גלידה" },
      { en: "K k — key", he: "מפתח" },
      { en: "L l — lion", he: "אריה" },
      { en: "M m — moon", he: "ירח" },
      { en: "N n — nose", he: "אף" },
      { en: "P p — pen", he: "עט" },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext({ questionEn: "I", options: ["i", "j", "l", "t"], correct: "i" }, { promptHe: "איזו אות קטנה מתאימה לאות הגדולה I?", explanationHe: "I גדולה היא i קטנה, עם נקודה למעלה.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "J", options: ["i", "j", "g", "y"], correct: "j" }, { promptHe: "איזו אות קטנה מתאימה לאות הגדולה J?", explanationHe: "J גדולה היא j קטנה: כמו i, אבל עם זנב שיורד למטה.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "m", options: ["N", "W", "M", "H"], correct: "M" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה m?", explanationHe: "m קטנה היא M גדולה. ל-M יש שני 'גבעות', ל-N רק אחת.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "n", options: ["M", "N", "H", "U"], correct: "N" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה n?", explanationHe: "n קטנה היא N גדולה.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "p", options: ["B", "D", "P", "R"], correct: "P" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה p?", explanationHe: "p קטנה היא P גדולה. ל-P יש בטן אחת למעלה, ל-B שתיים.", skillTags: ["reading"] }),
    ex.chooseTranslation({ questionEn: "L", options: ["L", "I", "O", "M"], correct: "L", audioText: "L" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות L נשמע 'אֶל'.", skillTags: ["listening"] }),
    ex.chooseTranslation({ questionEn: "O", options: ["P", "O", "K", "I"], correct: "O", audioText: "O" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות O נשמע 'אוֹ'.", skillTags: ["listening"] }),
    ex.chooseTranslation({ questionEn: "K", options: ["K", "J", "P", "L"], correct: "K", audioText: "K" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות K נשמע 'קֵיי'.", skillTags: ["listening"] }),
    ex.wordToImage({ vocabId: "moon", options: ["moon", "key", "lion", "pen"] }, { explanationHe: "moon = ירח. המילה מתחילה באות M.", hintsHe: ["רואים אותו בלילה."] }),
    ex.wordToImage({ vocabId: "lion", options: ["nose", "lion", "key", "moon"] }, { explanationHe: "lion = אריה. המילה מתחילה באות L." }),
    ex.missingLetter({ word: "pen", missingIndex: 0, options: ["p", "b", "d", "n"], vocabId: "pen" }, { explanationHe: "pen (עט) מתחילה באות p.", hintsHe: ["הצליל הראשון הוא 'פּ'."] }),
    ex.missingLetter({ word: "key", missingIndex: 0, options: ["c", "k", "g", "y"], vocabId: "key" }, { explanationHe: "key (מפתח) מתחילה באות k. היא נשמעת כמו 'ק', אבל זו k ולא c.", hintsHe: ["האות נראית כמו קו עם שתי רגליים."] }),
    ex.missingLetter({ word: "nose", missingIndex: 0, options: ["m", "n", "h", "o"], vocabId: "nose" }, { explanationHe: "nose (אף) מתחילה באות n." }),
  ],
});

const l4 = defineLesson({
  id: "w1-l4",
  titleHe: "האותיות Q עד Z",
  titleEn: "Letters Q to Z",
  worldId: "w1",
  unitId: "w1u1",
  order: 4,
  level: 0,
  learningObjectives: ["להשלים את כל האלף-בית", "לזהות את האותיות Q, R, S, T, U, V, W, X, Y, Z"],
  vocabIds: ["rabbit", "sun", "tree", "water", "yellow"],
  intro: {
    titleHe: "סוף האלף-בית",
    bodyHe: "עשר האותיות האחרונות: Q, R, S, T, U, V, W, X, Y, Z. אחרי השיעור הזה את מכירה את כל 26 האותיות!",
    examples: [
      { en: "R r — rabbit", he: "ארנב" },
      { en: "S s — sun", he: "שמש" },
      { en: "T t — tree", he: "עץ" },
      { en: "W w — water", he: "מים" },
      { en: "Y y — yellow", he: "צהוב" },
    ],
  },
  exercises: (ex) => [
    ex.chooseInContext({ questionEn: "R", options: ["r", "n", "v", "p"], correct: "r" }, { promptHe: "איזו אות קטנה מתאימה לאות הגדולה R?", explanationHe: "R גדולה היא r קטנה.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "T", options: ["f", "t", "l", "i"], correct: "t" }, { promptHe: "איזו אות קטנה מתאימה לאות הגדולה T?", explanationHe: "T גדולה היא t קטנה. ל-t יש קו שחוצה אותה, כמו צלב קטן.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "u", options: ["V", "U", "N", "W"], correct: "U" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה u?", explanationHe: "u קטנה היא U גדולה, מעוגלת למטה. V מחודדת.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "w", options: ["M", "W", "V", "U"], correct: "W" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה w?", explanationHe: "w קטנה היא W גדולה: כמו שני V ביחד.", skillTags: ["reading"] }),
    ex.chooseInContext({ questionEn: "y", options: ["Y", "V", "X", "J"], correct: "Y" }, { promptHe: "איזו אות גדולה מתאימה לאות הקטנה y?", explanationHe: "y קטנה היא Y גדולה.", skillTags: ["reading"] }),
    ex.chooseTranslation({ questionEn: "S", options: ["S", "C", "X", "Z"], correct: "S", audioText: "S" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות S נשמע 'אֶס'.", skillTags: ["listening"] }),
    ex.chooseTranslation({ questionEn: "Z", options: ["S", "Z", "X", "C"], correct: "Z", audioText: "Z" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות Z נשמע 'זִי'.", skillTags: ["listening"] }),
    ex.chooseTranslation({ questionEn: "Q", options: ["Q", "U", "W", "K"], correct: "Q", audioText: "Q" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות Q נשמע 'קְיוּ'.", skillTags: ["listening"] }),
    ex.chooseTranslation({ questionEn: "V", options: ["B", "W", "V", "P"], correct: "V", audioText: "V" }, { promptHe: "הקשיבי לשם האות ובחרי אותה", explanationHe: "שם האות V נשמע 'וִי', עם שפתיים על השיניים.", skillTags: ["listening"] }),
    ex.wordToImage({ vocabId: "sun", options: ["sun", "tree", "rabbit", "water"] }, { explanationHe: "sun = שמש. המילה מתחילה באות S." }),
    ex.wordToImage({ vocabId: "tree", options: ["rabbit", "sun", "tree", "water"] }, { explanationHe: "tree = עץ. המילה מתחילה באות T." }),
    ex.missingLetter({ word: "rabbit", missingIndex: 0, options: ["r", "b", "p", "n"], vocabId: "rabbit" }, { explanationHe: "rabbit (ארנב) מתחילה באות r.", hintsHe: ["הצליל הראשון הוא 'ר'."] }),
    ex.missingLetter({ word: "water", missingIndex: 0, options: ["v", "w", "u", "m"], vocabId: "water" }, { explanationHe: "water (מים) מתחילה באות w.", hintsHe: ["האות נראית כמו שני V."] }),
    ex.missingLetter({ word: "yellow", missingIndex: 0, options: ["j", "y", "g", "u"], vocabId: "yellow" }, { explanationHe: "yellow (צהוב) מתחילה באות y." }),
  ],
});

const l5 = defineLesson({
  id: "w1-l5",
  titleHe: "צלילים: תנועות קצרות",
  titleEn: "Sounds: Short Vowels",
  worldId: "w1",
  unitId: "w1u2",
  order: 5,
  level: 0,
  learningObjectives: ["לזהות את התנועות a, e, i, o, u בתוך מילים", "לשמוע מילה ולזהות את האות החסרה"],
  vocabIds: ["cat", "bed", "fish", "dog", "sun", "hat", "pen", "egg"],
  intro: {
    titleHe: "חמש התנועות",
    bodyHe: "האותיות a, e, i, o, u נקראות תנועות. במילים קצרות הן נשמעות כך: a כמו 'אַ' (cat), e כמו 'אֶ' (bed), i כמו 'אִ' (fish), o כמו 'אוֹ' (dog), u כמו 'אַ' קצרה (sun).",
    examples: [
      { en: "c-a-t", he: "חתול" },
      { en: "b-e-d", he: "מיטה" },
      { en: "f-i-sh", he: "דג" },
      { en: "d-o-g", he: "כלב" },
      { en: "s-u-n", he: "שמש" },
    ],
  },
  exercises: (ex) => [
    ex.missingLetter({ word: "cat", missingIndex: 1, options: ["a", "e", "o", "u"], vocabId: "cat" }, { explanationHe: "cat נשמעת 'קַאט'. הצליל באמצע הוא 'אַ', ולכן האות a.", hintsHe: ["הקשיבי לצליל שבאמצע המילה."] }),
    ex.missingLetter({ word: "bed", missingIndex: 1, options: ["a", "e", "i", "o"], vocabId: "bed" }, { explanationHe: "bed נשמעת 'בֶּד'. הצליל 'אֶ' נכתב באות e." }),
    ex.missingLetter({ word: "dog", missingIndex: 1, options: ["u", "a", "o", "e"], vocabId: "dog" }, { explanationHe: "dog נשמעת 'דוֹג'. הצליל 'אוֹ' נכתב באות o." }),
    ex.missingLetter({ word: "sun", missingIndex: 1, options: ["a", "u", "o", "i"], vocabId: "sun" }, { explanationHe: "sun נשמעת 'סַאן'. במילים קצרות רבות הצליל 'אַ' נכתב ב-u (sun, bus, cup).", hintsHe: ["זו לא a, למרות שזה נשמע דומה."] }),
    ex.missingLetter({ word: "fish", missingIndex: 1, options: ["e", "i", "a", "u"], vocabId: "fish" }, { explanationHe: "fish נשמעת 'פִיש'. הצליל 'אִ' נכתב באות i." }),
    ex.listenChooseImage({ audioText: "hat", options: ["hat", "cat", "bed", "egg"], correct: "hat" }, { explanationHe: "שמעת hat (כובע). hat ו-cat נשמעות דומה, שימי לב לצליל הראשון: 'ה' ולא 'ק'.", hintsHe: ["המילה מתחילה בצליל 'ה'."] }),
    ex.listenChooseImage({ audioText: "pen", options: ["pen", "egg", "sun", "dog"], correct: "pen" }, { explanationHe: "שמעת pen (עט)." }),
    ex.listenChooseImage({ audioText: "egg", options: ["bed", "egg", "fish", "hat"], correct: "egg" }, { explanationHe: "שמעת egg (ביצה). המילה מתחילה בצליל 'אֶ'." }),
    ex.spellWord({ word: "cat", vocabId: "cat", meaningHe: "חתול", tiles: ["c", "a", "t", "e", "k"] }, { explanationHe: "חתול = cat. האותיות: c, a, t.", hintsHe: ["האות הראשונה היא c.", "הצליל באמצע הוא 'אַ'."] }),
    ex.spellWord({ word: "dog", vocabId: "dog", meaningHe: "כלב", tiles: ["d", "o", "g", "a", "b"] }, { explanationHe: "כלב = dog. האותיות: d, o, g.", hintsHe: ["האות הראשונה היא d.", "הצליל באמצע הוא 'אוֹ'."] }),
  ],
});

const l6 = defineLesson({
  id: "w1-l6",
  titleHe: "מילים ראשונות: שומעים ורואים",
  titleEn: "First Words: Listen and Look",
  worldId: "w1",
  unitId: "w1u2",
  order: 6,
  level: 0,
  learningObjectives: ["לזהות 8 מילים ראשונות בשמיעה ובקריאה", "להתאים מילה לתמונה ולתרגום"],
  vocabIds: ["ball", "car", "book", "sun", "moon", "star", "hand", "eye"],
  exercises: (ex) => [
    ex.wordToImage({ vocabId: "ball", options: ["ball", "car", "book", "star"] }, { explanationHe: "ball = כדור." }),
    ex.wordToImage({ vocabId: "book", options: ["sun", "book", "hand", "moon"] }, { explanationHe: "book = ספר." }),
    ex.wordToImage({ vocabId: "star", options: ["moon", "sun", "star", "eye"] }, { explanationHe: "star = כוכב. sun = שמש, moon = ירח.", hintsHe: ["רואים הרבה כאלה בשמיים בלילה."] }),
    ex.listenChooseImage({ audioText: "car", options: ["car", "ball", "book", "hand"], correct: "car" }, { explanationHe: "שמעת car (מכונית)." }),
    ex.listenChooseImage({ audioText: "eye", options: ["hand", "eye", "sun", "star"], correct: "eye" }, { explanationHe: "שמעת eye (עין). היא נשמעת בדיוק כמו האות I." }),
    ex.listenChooseImage({ audioText: "hand", options: ["eye", "car", "hand", "moon"], correct: "hand" }, { explanationHe: "שמעת hand (יד)." }),
    ex.chooseTranslation({ questionEn: "moon", options: ["ירח", "שמש", "כוכב", "כדור"], correct: "ירח" }, { explanationHe: "moon = ירח. שמש = sun, כוכב = star.", vocabIds: ["moon"] }),
    ex.chooseTranslation({ questionEn: "sun", options: ["ירח", "שמש", "יד", "ספר"], correct: "שמש" }, { explanationHe: "sun = שמש.", vocabIds: ["sun"] }),
    ex.chooseWord({ questionHe: "מכונית", pictureVocabId: "car", options: ["car", "cat", "ball", "bus"], correct: "car" }, { explanationHe: "מכונית = car. שימי לב: cat = חתול, זה דומה אבל שונה.", vocabIds: ["car"] }),
    ex.matchPairs({ pairs: [{ en: "ball", he: "כדור" }, { en: "book", he: "ספר" }, { en: "hand", he: "יד" }, { en: "eye", he: "עין" }] }, { explanationHe: "ball = כדור, book = ספר, hand = יד, eye = עין.", vocabIds: ["ball", "book", "hand", "eye"] }),
    ex.spellWord({ word: "sun", vocabId: "sun", meaningHe: "שמש", tiles: ["s", "u", "n", "a", "o"] }, { explanationHe: "שמש = sun. האותיות: s, u, n.", hintsHe: ["מתחיל ב-s.", "הצליל באמצע נכתב ב-u."] }),
  ],
});

export const WORLD1_LESSONS: Lesson[] = [l1, l2, l3, l4, l5, l6];
