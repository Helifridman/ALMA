"use client";

/**
 * Unified audio service.
 * - speak(): browser TTS (Web Speech API) with an English voice, rate control and word boundaries.
 * - If a vocabulary item has audioUrl, playUrl() is used instead.
 * - Recorder: MediaRecorder with explicit permission, local only (nothing is uploaded).
 * The interface is small so a cloud TTS / speech-recognition provider can be plugged in later.
 */

export interface SpeakOptions {
  rate?: number;
  onBoundary?: (charIndex: number) => void;
  onEnd?: () => void;
  lang?: string;
}

export interface AudioProvider {
  isSupported(): boolean;
  speak(text: string, opts?: SpeakOptions): Promise<void>;
  stop(): void;
}

let cachedVoice: SpeechSynthesisVoice | null | undefined;

const PREFERRED = [/google us english/i, /samantha/i, /microsoft (aria|jenny|zira|guy)/i, /daniel/i, /karen/i, /moira/i, /en[-_]us/i, /en[-_]gb/i, /^en/i];

export function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (cachedVoice !== undefined) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null; // not loaded yet; don't cache
  const english = voices.filter((v) => /^en/i.test(v.lang));
  let chosen: SpeechSynthesisVoice | null = null;
  for (const re of PREFERRED) {
    chosen = english.find((v) => re.test(v.name) || re.test(v.lang)) ?? null;
    if (chosen) break;
  }
  cachedVoice = chosen ?? english[0] ?? null;
  return cachedVoice;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoice = undefined;
  });
}

export const browserTTS: AudioProvider = {
  isSupported: () => typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
  speak(text, opts = {}) {
    return new Promise<void>((resolve) => {
      if (!browserTTS.isSupported()) return resolve();
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang ?? "en-US";
      u.rate = opts.rate ?? 0.9;
      u.pitch = 1;
      const voice = pickEnglishVoice();
      if (voice) u.voice = voice;
      u.onboundary = (e) => opts.onBoundary?.(e.charIndex);
      u.onend = () => { opts.onEnd?.(); resolve(); };
      u.onerror = () => { opts.onEnd?.(); resolve(); };
      // Safari sometimes needs a tick after cancel().
      setTimeout(() => synth.speak(u), 10);
    });
  },
  stop() {
    if (browserTTS.isSupported()) window.speechSynthesis.cancel();
  },
};

let currentAudio: HTMLAudioElement | null = null;

export async function playUrl(url: string, opts: SpeakOptions = {}): Promise<void> {
  return new Promise((resolve) => {
    try {
      currentAudio?.pause();
      const a = new Audio(url);
      currentAudio = a;
      a.playbackRate = opts.rate ?? 1;
      a.onended = () => { opts.onEnd?.(); resolve(); };
      a.onerror = () => { opts.onEnd?.(); resolve(); };
      void a.play().catch(() => { opts.onEnd?.(); resolve(); });
    } catch {
      opts.onEnd?.();
      resolve();
    }
  });
}

/** Speak English text (or play a recorded file when available). */
export function speak(text: string, opts: SpeakOptions & { audioUrl?: string } = {}): Promise<void> {
  if (opts.audioUrl) return playUrl(opts.audioUrl, opts);
  return browserTTS.speak(text, opts);
}

export function stopSpeaking() {
  browserTTS.stop();
  currentAudio?.pause();
}

export function ttsSupported(): boolean {
  return browserTTS.isSupported();
}

/* ---------- recording (local only) ---------- */

export function recordingSupported(): boolean {
  return typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined";
}

export interface Recorder {
  stop(): Promise<Blob>;
  cancel(): void;
}

/** Starts recording after the user explicitly pressed the record button. Audio never leaves the device. */
export async function startRecording(): Promise<Recorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const chunks: BlobPart[] = [];
  const rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  rec.start();
  const release = () => stream.getTracks().forEach((t) => t.stop());
  return {
    stop: () =>
      new Promise<Blob>((resolve) => {
        rec.onstop = () => { release(); resolve(new Blob(chunks, { type: rec.mimeType || "audio/webm" })); };
        rec.stop();
      }),
    cancel: () => { try { rec.stop(); } catch { /* ignore */ } release(); },
  };
}

/**
 * Placeholder for a future speech-recognition provider. v1 deliberately does not
 * grade pronunciation: the learner listens, records and compares herself.
 */
export interface SpeechAssessmentProvider {
  isAvailable(): boolean;
  assess(expectedText: string, recording: Blob): Promise<{ score: number; feedbackHe: string } | null>;
}

export const noSpeechAssessment: SpeechAssessmentProvider = {
  isAvailable: () => false,
  assess: async () => null,
};
