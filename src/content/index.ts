import type { Exercise, Lesson, Unit, World } from "@/lib/types";
import { WORLD1_LESSONS } from "./lessons/world1";
import { WORLD2_LESSONS } from "./lessons/world2";
import { WORLD3_LESSONS } from "./lessons/world3";
import { WORLD4_LESSONS } from "./lessons/world4";
import { WORLD5_LESSONS } from "./lessons/world5";
import { WORLD6_LESSONS } from "./lessons/world6";
import { UNITS, WORLDS, UNIT_BY_ID, WORLD_BY_ID } from "./worlds";

export { VOCABULARY, VOCAB_BY_ID, getVocab, vocabByTopic } from "./vocabulary";
export { WORLDS, UNITS, WORLD_BY_ID, UNIT_BY_ID };

export const LESSONS: Lesson[] = [
  ...WORLD1_LESSONS,
  ...WORLD2_LESSONS,
  ...WORLD3_LESSONS,
  ...WORLD4_LESSONS,
  ...WORLD5_LESSONS,
  ...WORLD6_LESSONS,
];

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

export function getLesson(id: string): Lesson | undefined {
  return LESSON_BY_ID[id];
}

/** Lessons ordered by world order, then lesson order. */
export function orderedLessons(): Lesson[] {
  const worldOrder = Object.fromEntries(WORLDS.map((w) => [w.id, w.order]));
  return [...LESSONS].sort((a, b) => worldOrder[a.worldId] - worldOrder[b.worldId] || a.order - b.order);
}

export function lessonsForWorld(worldId: string): Lesson[] {
  return orderedLessons().filter((l) => l.worldId === worldId);
}

export function lessonsForUnit(unitId: string): Lesson[] {
  return orderedLessons().filter((l) => l.unitId === unitId);
}

export function unitsForWorld(worldId: string): Unit[] {
  return UNITS.filter((u) => u.worldId === worldId).sort((a, b) => a.order - b.order);
}

export function worldOf(lesson: Lesson): World {
  return WORLD_BY_ID[lesson.worldId];
}

export function allExercises(): Exercise[] {
  return LESSONS.flatMap((l) => l.exercises);
}
