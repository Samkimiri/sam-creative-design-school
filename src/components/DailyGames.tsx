"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Brain,
  CalendarDays,
  Check,
  Delete,
  Flame,
  HelpCircle,
  Share2,
  Sparkles,
  Trophy,
} from "lucide-react";
import { DAILY_WORDS, TRIVIA_POOL, type TriviaQuestion } from "@/lib/dailyGamesData";

const WORD_STORAGE_KEY = "scds-daily-wordle-v1";
const TRIVIA_STORAGE_KEY = "scds-daily-trivia-v1";
const STREAK_STORAGE_KEY = "scds-daily-streak-v1";
const MAX_GUESSES = 6;
const KEYBOARD_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

// A student's "today" - normalized to local midnight so the daily puzzle changes
// exactly once per calendar day on their own device, not at a fixed UTC hour.
function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function dateKey(date: Date): string {
  // Built from local date fields, not toISOString() (which converts to UTC and would
  // shift the day for any student not on UTC - e.g. local midnight in UTC+3 becomes
  // 21:00 the previous day in UTC, silently breaking the daily reset and streak count).
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const EPOCH = startOfDay(new Date(2026, 0, 1));
function getDayIndex(date: Date): number {
  return Math.max(0, Math.floor((startOfDay(date) - EPOCH) / 86400000));
}

// Deterministic PRNG (mulberry32) so "today's" trivia set is the same for every
// student and reproducible from the day index alone - no server round trip needed.
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const random = mulberry32(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type LetterStatus = "correct" | "present" | "absent";

function evaluateGuess(guess: string, answer: string): LetterStatus[] {
  const result: LetterStatus[] = Array(answer.length).fill("absent");
  const answerLetters = answer.split("");
  const used = Array(answer.length).fill(false);

  for (let i = 0; i < guess.length; i += 1) {
    if (guess[i] === answerLetters[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  for (let i = 0; i < guess.length; i += 1) {
    if (result[i] === "correct") continue;
    const matchIndex = answerLetters.findIndex((letter, j) => letter === guess[i] && !used[j]);
    if (matchIndex !== -1) {
      result[i] = "present";
      used[matchIndex] = true;
    }
  }

  return result;
}

function letterClass(status: LetterStatus | undefined): string {
  if (status === "correct") return "bg-emerald-500 border-emerald-500 text-white";
  if (status === "present") return "bg-amber-400 border-amber-400 text-white";
  if (status === "absent") return "bg-slate-700 border-slate-700 text-white/70";
  return "border-white/20 bg-white/5 text-white";
}

interface WordleSave {
  dateKey: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
}

interface TriviaSave {
  dateKey: string;
  answers: (number | null)[];
  revealed: boolean;
}

interface StreakSave {
  count: number;
  longest: number;
  lastDateKey: string;
}

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing or storage quota - the games still work without saved records.
  }
}

export default function DailyGames() {
  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => dateKey(today), [today]);
  const dayIndex = useMemo(() => getDayIndex(today), [today]);

  const dailyWord = DAILY_WORDS[dayIndex % DAILY_WORDS.length];
  const dailyTrivia = useMemo<TriviaQuestion[]>(
    () => seededShuffle(TRIVIA_POOL, dayIndex + 1).slice(0, 5),
    [dayIndex]
  );

  const [wordSave, setWordSave] = useState<WordleSave>({ dateKey: todayKey, guesses: [], status: "playing" });
  const [triviaSave, setTriviaSave] = useState<TriviaSave>({
    dateKey: todayKey,
    answers: Array(5).fill(null),
    revealed: false,
  });
  const [streak, setStreak] = useState<StreakSave>({ count: 0, longest: 0, lastDateKey: "" });
  const [currentGuess, setCurrentGuess] = useState("");
  const [wordMessage, setWordMessage] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const savedWord = loadJson<WordleSave>(WORD_STORAGE_KEY, { dateKey: "", guesses: [], status: "playing" });
    setWordSave(savedWord.dateKey === todayKey ? savedWord : { dateKey: todayKey, guesses: [], status: "playing" });

    const savedTrivia = loadJson<TriviaSave>(TRIVIA_STORAGE_KEY, { dateKey: "", answers: Array(5).fill(null), revealed: false });
    setTriviaSave(
      savedTrivia.dateKey === todayKey ? savedTrivia : { dateKey: todayKey, answers: Array(5).fill(null), revealed: false }
    );

    setStreak(loadJson<StreakSave>(STREAK_STORAGE_KEY, { count: 0, longest: 0, lastDateKey: "" }));
  }, [todayKey]);

  const registerDailyActivity = useCallback(() => {
    setStreak((current) => {
      if (current.lastDateKey === todayKey) return current;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = current.lastDateKey === dateKey(yesterday);
      const nextCount = wasYesterday ? current.count + 1 : 1;
      const next: StreakSave = { count: nextCount, longest: Math.max(current.longest, nextCount), lastDateKey: todayKey };
      saveJson(STREAK_STORAGE_KEY, next);
      return next;
    });
  }, [todayKey, today]);

  const guessesUpper = wordSave.guesses;
  const wordFinished = wordSave.status !== "playing";

  const submitGuess = useCallback(() => {
    if (wordFinished) return;
    if (currentGuess.length !== 5) {
      setWordMessage("Enter a 5-letter word.");
      return;
    }

    const guess = currentGuess.toUpperCase();
    const nextGuesses = [...guessesUpper, guess];
    const won = guess === dailyWord.word;
    const lost = !won && nextGuesses.length >= MAX_GUESSES;
    const nextStatus: WordleSave["status"] = won ? "won" : lost ? "lost" : "playing";

    const next: WordleSave = { dateKey: todayKey, guesses: nextGuesses, status: nextStatus };
    setWordSave(next);
    saveJson(WORD_STORAGE_KEY, next);
    setCurrentGuess("");
    setWordMessage(won ? "Solved! Nice work." : lost ? `Out of guesses. The word was ${dailyWord.word}.` : "");

    if (won || lost) registerDailyActivity();
  }, [currentGuess, dailyWord.word, guessesUpper, registerDailyActivity, todayKey, wordFinished]);

  const handleKey = useCallback(
    (key: string) => {
      if (wordFinished) return;
      if (key === "ENTER") {
        submitGuess();
        return;
      }
      if (key === "BACKSPACE") {
        setCurrentGuess((value) => value.slice(0, -1));
        return;
      }
      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((value) => (value + key).slice(0, 5));
      }
    },
    [currentGuess.length, submitGuess, wordFinished]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.length === 1 ? event.key.toUpperCase() : event.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        event.preventDefault();
        handleKey(key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const letterStatuses = useMemo(() => {
    const map = new Map<string, LetterStatus>();
    const rank: Record<LetterStatus, number> = { absent: 0, present: 1, correct: 2 };
    for (const guess of guessesUpper) {
      const statuses = evaluateGuess(guess, dailyWord.word);
      statuses.forEach((status, index) => {
        const letter = guess[index];
        const existing = map.get(letter);
        if (!existing || rank[status] > rank[existing]) map.set(letter, status);
      });
    }
    return map;
  }, [guessesUpper, dailyWord.word]);

  const shareResult = async () => {
    const rows = guessesUpper
      .map((guess) =>
        evaluateGuess(guess, dailyWord.word)
          .map((status) => (status === "correct" ? "\u{1F7E9}" : status === "present" ? "\u{1F7E8}" : "⬛"))
          .join("")
      )
      .join("\n");
    const scoreLabel = wordSave.status === "won" ? `${guessesUpper.length}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`;
    const text = `SCDS Term Guess #${dayIndex} - ${scoreLabel}\n${rows}\nsamcreativedesignschool.com/games`;

    try {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 2000);
    } catch {
      setWordMessage("Could not copy - your browser may block clipboard access.");
    }
  };

  const answerTrivia = (questionIndex: number, optionIndex: number) => {
    if (triviaSave.answers[questionIndex] !== null) return;
    const nextAnswers = [...triviaSave.answers];
    nextAnswers[questionIndex] = optionIndex;
    const allAnswered = nextAnswers.every((value) => value !== null);
    const next: TriviaSave = { dateKey: todayKey, answers: nextAnswers, revealed: allAnswered };
    setTriviaSave(next);
    saveJson(TRIVIA_STORAGE_KEY, next);
    if (allAnswered) registerDailyActivity();
  };

  const triviaScore = triviaSave.answers.reduce<number>(
    (score, answer, index) => score + (answer === dailyTrivia[index]?.answer ? 1 : 0),
    0
  );
  const triviaAllAnswered = triviaSave.answers.every((value) => value !== null);

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-white bg-gradient-to-br from-slate-950 via-slate-900 to-primary/20 p-6 text-white shadow-[0_24px_70px_rgba(10,15,30,0.1)] md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-light">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Daily Challenge - new puzzle every day
            </p>
            <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">One Term Guess and 5 trivia questions, refreshed daily.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
              Come back once a day to keep your streak alive. Everyone gets the same puzzle on the same day.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
            <Flame className={`h-6 w-6 ${streak.count > 0 ? "text-amber-400" : "text-white/40"}`} aria-hidden="true" />
            <div>
              <p className="text-xl font-black leading-none">{streak.count}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Day streak</p>
            </div>
            {streak.longest > streak.count && (
              <span className="ml-2 rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold text-white/60">Best {streak.longest}</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-white/80 bg-white/95 p-5 shadow-[0_18px_55px_rgba(10,15,30,0.08)] ring-1 ring-slate-900/5 md:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="mb-1.5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Term Guess #{dayIndex}
              </p>
              <h3 className="text-xl font-extrabold text-dark">Guess today&apos;s 5-letter design or code term</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowHint((value) => !value)}
              className="shrink-0 rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
              aria-label="Toggle hint"
            >
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {showHint && (
            <p className="mb-4 rounded-xl bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary">
              {dailyWord.category} hint: {dailyWord.hint}
            </p>
          )}

          <div className="mb-4 grid gap-1.5">
            {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
              const guess = guessesUpper[rowIndex];
              const isCurrentRow = rowIndex === guessesUpper.length && !wordFinished;
              const rowLetters = guess
                ? guess.split("")
                : isCurrentRow
                ? currentGuess.padEnd(5, " ").split("")
                : Array(5).fill(" ");
              const statuses = guess ? evaluateGuess(guess, dailyWord.word) : [];

              return (
                <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                  {rowLetters.map((letter, colIndex) => (
                    <div
                      key={colIndex}
                      className={`flex aspect-square items-center justify-center rounded-lg border-2 text-lg font-black uppercase transition-colors ${letterClass(statuses[colIndex])}`}
                    >
                      {letter.trim()}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {wordMessage && (
            <p className={`mb-3 text-sm font-bold ${wordSave.status === "won" ? "text-emerald-600" : "text-gray-600"}`}>{wordMessage}</p>
          )}

          {wordFinished ? (
            <button
              type="button"
              onClick={shareResult}
              className="premium-button inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
            >
              {shareCopied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
              {shareCopied ? "Copied!" : "Share result"}
            </button>
          ) : (
            <div className="space-y-1.5">
              {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={row} className={`flex justify-center gap-1 ${rowIndex === 2 ? "px-4" : ""}`}>
                  {row.split("").map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKey(key)}
                      className={`h-10 min-w-[2rem] flex-1 rounded-md text-xs font-black uppercase transition-colors ${letterClass(letterStatuses.get(key))}`}
                    >
                      {key}
                    </button>
                  ))}
                  {rowIndex === 2 && (
                    <button
                      type="button"
                      onClick={() => handleKey("BACKSPACE")}
                      className="flex h-10 min-w-[3rem] flex-1 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                      aria-label="Backspace"
                    >
                      <Delete className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={submitGuess}
                className="mt-2 w-full rounded-xl bg-dark py-2.5 text-sm font-black text-white transition hover:bg-primary"
              >
                Enter
              </button>
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-white/80 bg-white/95 p-5 shadow-[0_18px_55px_rgba(10,15,30,0.08)] ring-1 ring-slate-900/5 md:p-6">
          <div className="mb-4">
            <p className="mb-1.5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <Brain className="h-4 w-4" aria-hidden="true" />
              Daily Trivia
            </p>
            <h3 className="text-xl font-extrabold text-dark">5 quick questions from across your courses</h3>
          </div>

          <div className="space-y-4">
            {dailyTrivia.map((question, questionIndex) => {
              const selected = triviaSave.answers[questionIndex];
              const isAnswered = selected !== null;

              return (
                <div key={question.question} className="rounded-2xl border border-gray-100 bg-light-gray p-4">
                  <p className="mb-3 text-sm font-bold text-dark">
                    {questionIndex + 1}. {question.question}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => {
                      const isCorrectOption = optionIndex === question.answer;
                      const isSelected = selected === optionIndex;
                      let optionClass = "border-gray-200 bg-white hover:border-primary/40 hover:bg-primary/5";
                      if (isAnswered && isCorrectOption) optionClass = "border-emerald-400 bg-emerald-50 text-emerald-800";
                      else if (isAnswered && isSelected) optionClass = "border-red-300 bg-red-50 text-red-700";
                      else if (isAnswered) optionClass = "border-gray-100 bg-white text-gray-400";

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => answerTrivia(questionIndex, optionIndex)}
                          className={`rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${optionClass}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && <p className="mt-2 text-xs font-medium text-gray-500">{question.explanation}</p>}
                </div>
              );
            })}
          </div>

          {triviaAllAnswered && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary/10 px-4 py-3">
              <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="text-sm font-black text-primary">
                Today&apos;s score: {triviaScore}/{dailyTrivia.length} - come back tomorrow for a new set.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
