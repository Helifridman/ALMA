import type { Exercise } from "@/lib/types";
import type { Answer, GradeResult } from "@/lib/grading";

export interface ExerciseProps<E extends Exercise = Exercise> {
  exercise: E;
  /** Increments when the learner retries; components reset their local state. */
  attemptKey: number;
  /** Grading result after submit (null while answering). */
  result: GradeResult | null;
  /** Whether to reveal the correct answer (after the last allowed attempt). */
  revealAnswer: boolean;
  /** Called whenever the learner's pending answer changes (null = nothing selected yet). */
  onChange: (answer: Answer | null) => void;
  /** Immediately submit (used by exercises that complete on their own, like match-pairs). */
  onSubmit: (answer: Answer) => void;
  hintsShown: number;
}
