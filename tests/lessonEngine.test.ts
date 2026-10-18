import { describe, expect, it } from "vitest";
import { advance, createSession, current, retry, showHint, submit, MAX_ATTEMPTS } from "@/lib/lessonEngine";
import { createFactory } from "@/content/builders";

const ex = createFactory("eng");
const follow = ex.chooseInContext({ questionEn: "He ___ tall.", options: ["am", "is", "are"], correct: "is" }, { explanationHe: "f" });
const q1 = ex.chooseInContext({ questionEn: "She ___ happy.", options: ["am", "is", "are"], correct: "is" }, { explanationHe: "x", followUp: follow, hintsHe: ["h1", "h2"] });
const q2 = ex.chooseWord({ questionHe: "כלב", options: ["dog", "cat"], correct: "dog" }, { explanationHe: "y", vocabIds: ["dog"] });
const q3 = ex.chooseWord({ questionHe: "חתול", options: ["dog", "cat"], correct: "cat" }, { explanationHe: "z" });

describe("lesson engine", () => {
  it("walks through exercises and records first-try results", () => {
    let s = createSession([q1, q2]);
    expect(current(s)?.exercise.id).toBe(q1.id);
    s = submit(s, { type: "choice", value: "is" });
    expect(s.last?.correct).toBe(true);
    s = advance(s);
    expect(current(s)?.exercise.id).toBe(q2.id);
    s = submit(s, { type: "choice", value: "dog" });
    s = advance(s);
    expect(s.finished).toBe(true);
    expect(s.results).toHaveLength(2);
    expect(s.results.every((r) => r.correct && r.firstTry)).toBe(true);
    expect(s.results[1].vocabIds).toEqual(["dog"]);
  });

  it("allows a retry, and a correct retry is not first-try", () => {
    let s = createSession([q2]);
    s = submit(s, { type: "choice", value: "cat" });
    expect(s.last?.correct).toBe(false);
    expect(s.attempts).toBe(1);
    s = retry(s);
    expect(s.last).toBeNull();
    s = submit(s, { type: "choice", value: "dog" });
    expect(s.last?.correct).toBe(true);
    s = advance(s);
    expect(s.results[0]).toMatchObject({ correct: true, firstTry: false, attempts: 2 });
  });

  it("after max attempts it records a miss, inserts the follow-up and re-queues once", () => {
    let s = createSession([q1, q2, q3]);
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      s = submit(s, { type: "choice", value: "are" });
      if (i < MAX_ATTEMPTS - 1) s = retry(s);
    }
    expect(s.results[0]).toMatchObject({ correct: false, errorKind: "grammar" });
    const ids = s.queue.map((q) => q.exercise.id);
    expect(ids).toEqual([q1.id, q2.id, q3.id, follow.id, q1.id]);
    expect(s.queue[4].isRetry).toBe(true);
    expect(s.queue[3].isFollowUp).toBe(true);
    s = advance(s);
    expect(current(s)?.exercise.id).toBe(q2.id);
  });

  it("a hint makes a later correct answer count as not-first-try", () => {
    let s = createSession([q1]);
    s = showHint(s);
    expect(s.hintsShown).toBe(1);
    s = showHint(s);
    s = showHint(s); // capped at available hints
    expect(s.hintsShown).toBe(2);
    s = submit(s, { type: "choice", value: "is" });
    s = advance(s);
    expect(s.results[0].firstTry).toBe(false);
  });

  it("does not re-queue a retry item twice", () => {
    let s = createSession([q2]);
    const fail = () => {
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        s = submit(s, { type: "choice", value: "cat" });
        if (i < MAX_ATTEMPTS - 1) s = retry(s);
      }
      s = advance(s);
    };
    fail();
    expect(s.queue).toHaveLength(2);
    fail();
    expect(s.queue).toHaveLength(2);
    expect(s.finished).toBe(true);
  });
});
