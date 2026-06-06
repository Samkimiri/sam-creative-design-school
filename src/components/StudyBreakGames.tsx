"use client";

import { useMemo, useState } from "react";
import { Brain, CheckCircle2, Gamepad2, Palette, RotateCcw, Sparkles, Zap } from "lucide-react";

const memoryIcons = ["PS", "AI", "UX", "JS", "3D", "VE"];
const reflexColors = [
  { name: "Blue", value: "#0056FF" },
  { name: "Gold", value: "#E7A005" },
  { name: "Green", value: "#16A34A" },
  { name: "Rose", value: "#E11D48" },
];
const designWords = ["poster", "vector", "layers", "motion", "caption", "export", "mockup", "sketch"];

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function scramble(word: string) {
  const shuffled = shuffle(word.split("")).join("");
  return shuffled === word ? word.split("").reverse().join("") : shuffled;
}

export default function StudyBreakGames() {
  const [memoryDeck, setMemoryDeck] = useState(() => shuffle([...memoryIcons, ...memoryIcons]));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [targetColor, setTargetColor] = useState(() => reflexColors[0]);
  const [reflexScore, setReflexScore] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordAnswer, setWordAnswer] = useState("");
  const [wordScore, setWordScore] = useState(0);

  const scrambledWord = useMemo(() => scramble(designWords[wordIndex]), [wordIndex]);

  const pickCard = (index: number) => {
    if (selectedCards.includes(index) || matchedCards.includes(index) || selectedCards.length === 2) return;

    const nextSelected = [...selectedCards, index];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((current) => current + 1);
      const [first, second] = nextSelected;
      if (memoryDeck[first] === memoryDeck[second]) {
        setMatchedCards((current) => [...current, first, second]);
        setSelectedCards([]);
      } else {
        window.setTimeout(() => setSelectedCards([]), 650);
      }
    }
  };

  const resetMemory = () => {
    setMemoryDeck(shuffle([...memoryIcons, ...memoryIcons]));
    setSelectedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const chooseReflexColor = (name: string) => {
    if (name === targetColor.name) setReflexScore((score) => score + 1);
    else setReflexScore((score) => Math.max(0, score - 1));
    setTargetColor(shuffle(reflexColors)[0]);
  };

  const submitWord = () => {
    if (wordAnswer.trim().toLowerCase() === designWords[wordIndex]) {
      setWordScore((score) => score + 1);
      setWordAnswer("");
      setWordIndex((index) => (index + 1) % designWords.length);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <Brain className="h-4 w-4" aria-hidden="true" />
              Memory Match
            </p>
            <h2 className="text-xl font-extrabold text-dark">Match the creative skill cards</h2>
          </div>
          <button
            type="button"
            onClick={resetMemory}
            className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
            aria-label="Reset memory game"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {memoryDeck.map((card, index) => {
            const revealed = selectedCards.includes(index) || matchedCards.includes(index);
            return (
              <button
                key={`${card}-${index}`}
                type="button"
                onClick={() => pickCard(index)}
                className={`aspect-square rounded-xl border text-lg font-black transition-all duration-300 ${
                  revealed
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                    : "border-gray-100 bg-light-gray text-transparent hover:-translate-y-0.5 hover:border-primary/30"
                }`}
              >
                {revealed ? card : "S"}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">
          {matchedCards.length / 2}/{memoryIcons.length} pairs found - {moves} moves
        </p>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
          <Zap className="h-4 w-4" aria-hidden="true" />
          Color Reflex
        </p>
        <h2 className="text-xl font-extrabold text-dark">Tap the matching color</h2>
        <div className="my-6 rounded-2xl p-6 text-center text-white shadow-inner" style={{ backgroundColor: targetColor.value }}>
          <p className="text-sm font-bold uppercase tracking-widest">Find</p>
          <p className="text-3xl font-black">{targetColor.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {reflexColors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => chooseReflexColor(color.name)}
              className="rounded-xl px-4 py-4 text-sm font-black text-white transition hover:-translate-y-0.5"
              style={{ backgroundColor: color.value }}
            >
              {color.name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">Score: {reflexScore}</p>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
          <Palette className="h-4 w-4" aria-hidden="true" />
          Design Word
        </p>
        <h2 className="text-xl font-extrabold text-dark">Unscramble the design word</h2>
        <div className="my-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-4xl font-black tracking-[0.25em] text-primary">{scrambledWord.toUpperCase()}</p>
        </div>
        <div className="flex flex-col gap-3">
          <input
            value={wordAnswer}
            onChange={(event) => setWordAnswer(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submitWord();
            }}
            className="rounded-xl border border-gray-200 px-4 py-3 font-bold outline-none transition focus:border-primary"
            placeholder="Type the correct word"
          />
          <button
            type="button"
            onClick={submitWord}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-dark px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Check Word
          </button>
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">Score: {wordScore}</p>
      </section>

      <section className="rounded-2xl border border-primary/20 bg-primary/10 p-5 lg:col-span-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <Gamepad2 className="h-4 w-4" aria-hidden="true" />
              Refresh Rule
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-dark">Play for 3 to 5 minutes, then return to class.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              These quick games are designed to rest your eyes and reset focus without pulling you away from learning for too long.
            </p>
          </div>
          <Sparkles className="h-10 w-10 text-primary" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}
