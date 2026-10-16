/**
 * Session engine shared by lessons, reviews and the placement test.
 * It is a pure reducer: the UI dispatches events, the engine returns new state.
 */
import type { Exercise, ExerciseResult } from "./types";
import { answerMode, grade, type Answer, type GradeResult } from "./grading";

export interface QueueItem {
  exercise: Exercise;
  /** True when this item was re-inserted after a mistake. */
  isRetry: boolean;
  /** True for follow-up checks inserted after a wrong answer. */
  isFollowUp: boolean;
}

export interface SessionState {
  queue: QueueItem[];
  index: number;
  /** Attempts on the current item. */
  attempts: number;
  hintsShown: number;
  /** Last grading result for the current item (null before answering). */
  last: GradeResult | null;
  results: ExerciseResult[];
  /** Exercise ids that were already re-queued once (never twice). */
  requeued: Set<string>;
  finished: boolean;
  startedAt: number;
}

export const MAX_ATTEMPTS = 2;

export function createSession(exercises: Exercise[], now = Date.now()): SessionState {
  return {
    queue: exercises.map((exercise) => ({ exercise, isRetry: false, isFollowUp: false })),
    index: 0,
    attempts: 0,
    hintsShown: 0,
    last: null,
    results: [],
    requeued: new Set(),
    finished: exercises.length === 0,
    startedAt: now,
  };
}

export function current(state: SessionState): QueueItem | null {
  return state.finished ? null : state.queue[state.index] ?? null;
}

export function progress(state: SessionState): { done: number; total: number } {
  return { done: Math.min(state.index, state.queue.length), total: state.queue.length };
}

function pushResult(state: SessionState, item: QueueItem, correct: boolean, res: GradeResult | null): ExerciseResult[] {
  const ex = item.exercise;
  return [
    ...state.results,
    {
      exerciseId: ex.id,
      type: ex.type,
      correct,
      firstTry: correct && state.attempts === 1 && state.hintsShown === 0,
      attempts: state.attempts,
      errorKind: res?.errorKind,
      vocabIds: ex.vocabIds ?? [],
      skillTags: ex.skillTags,
      mode: answerMode(ex.type),
    },
  ];
}

/** Submit an answer for the current exercise. */
export function submit(state: SessionState, answer: Answer): SessionState {
  const item = current(state);
  if (!item || state.last?.correct) return state;
  const res = grade(item.exercise, answer);
  const attempts = state.attempts + 1;
  const next: SessionState = { ...state, attempts, last: res };

  if (res.correct) {
    next.results = pushResult(next, item, true, res);
    return next;
  }

  if (attempts >= MAX_ATTEMPTS) {
    // Out of tries: record a miss, then re-queue once (and insert a follow-up if present).
    next.results = pushResult(next, item, false, res);
    next.queue = [...state.queue];
    const insertAt = Math.min(state.index + 3, next.queue.length);
    const inserts: QueueItem[] = [];
    if (item.exercise.followUp && !item.isFollowUp) inserts.push({ exercise: item.exercise.followUp, isRetry: false, isFollowUp: true });
    if (!state.requeued.has(item.exercise.id) && !item.isRetry) {
      inserts.push({ exercise: item.exercise, isRetry: true, isFollowUp: false });
      next.requeued = new Set([...state.requeued, item.exercise.id]);
    }
    next.queue.splice(insertAt, 0, ...inserts);
  }
  return next;
}

export function showHint(state: SessionState): SessionState {
  const item = current(state);
  if (!item) return state;
  const max = item.exercise.hintsHe?.length ?? 0;
  if (state.hintsShown >= max) return state;
  return { ...state, hintsShown: state.hintsShown + 1 };
}

/** Advance after the feedback was shown (correct, or out of attempts). */
export function advance(state: SessionState): SessionState {
  if (!state.last) return state;
  const canAdvance = state.last.correct || state.attempts >= MAX_ATTEMPTS;
  if (!canAdvance) return { ...state, last: null };
  const index = state.index + 1;
  return {
    ...state,
    index,
    attempts: 0,
    hintsShown: 0,
    last: null,
    finished: index >= state.queue.length,
  };
}

/** Skip the current exercise (counts as incorrect, no retry). Used for read-record when the mic is unavailable. */
export function skip(state: SessionState): SessionState {
  const item = current(state);
  if (!item) return state;
  const withAttempt = { ...state, attempts: Math.max(1, state.attempts) };
  const results = pushResult(withAttempt, item, false, null);
  const index = state.index + 1;
  return { ...state, results, index, attempts: 0, hintsShown: 0, last: null, finished: index >= state.queue.length };
}

/** Try again on the current item after a wrong answer (within attempts). */
export function retry(state: SessionState): SessionState {
  if (!state.last || state.last.correct || state.attempts >= MAX_ATTEMPTS) return state;
  return { ...state, last: null };
}
