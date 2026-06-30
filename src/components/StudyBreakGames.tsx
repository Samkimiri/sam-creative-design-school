"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  CheckCircle2,
  Gamepad2,
  LayoutTemplate,
  Medal,
  Palette,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const memoryIcons = ["PS", "AI", "UX", "JS", "3D", "VE"];
const reflexColors = [
  { name: "Blue", value: "#0056FF" },
  { name: "Gold", value: "#E7A005" },
  { name: "Green", value: "#16A34A" },
  { name: "Rose", value: "#E11D48" },
];
const designWords = ["poster", "vector", "layers", "motion", "caption", "export", "mockup", "sketch"];
const sequenceItems = ["PS", "UX", "AI", "3D", "JS", "VE"];
const layoutBlocks = ["Header", "Hero", "CTA", "Gallery", "Footer"];
const sudokuPuzzle = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
const sudokuSolution = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
const snakeBoardSize = 12;

type Direction = "up" | "down" | "left" | "right";
type SnakePoint = { x: number; y: number };

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function scramble(word: string) {
  const shuffled = shuffle(word.split("")).join("");
  return shuffled === word ? word.split("").reverse().join("") : shuffled;
}

function randomFood(snake: SnakePoint[]) {
  const openCells: SnakePoint[] = [];

  for (let y = 0; y < snakeBoardSize; y += 1) {
    for (let x = 0; x < snakeBoardSize; x += 1) {
      if (!snake.some((part) => part.x === x && part.y === y)) openCells.push({ x, y });
    }
  }

  return openCells[Math.floor(Math.random() * openCells.length)] || { x: 8, y: 6 };
}

function nextSnakeHead(head: SnakePoint, direction: Direction) {
  if (direction === "up") return { x: head.x, y: head.y - 1 };
  if (direction === "down") return { x: head.x, y: head.y + 1 };
  if (direction === "left") return { x: head.x - 1, y: head.y };
  return { x: head.x + 1, y: head.y };
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
  const [sequence, setSequence] = useState(() => shuffle(sequenceItems).slice(0, 4));
  const [sequenceInput, setSequenceInput] = useState<string[]>([]);
  const [sequenceScore, setSequenceScore] = useState(0);
  const [sequenceMessage, setSequenceMessage] = useState("Repeat the creative stack in the same order.");
  const [layoutOptions, setLayoutOptions] = useState(() => shuffle(layoutBlocks));
  const [layoutPlaced, setLayoutPlaced] = useState<string[]>([]);
  const [layoutScore, setLayoutScore] = useState(0);
  const [layoutMessage, setLayoutMessage] = useState("Build the landing page from top to bottom.");
  const [sudokuCells, setSudokuCells] = useState(() => sudokuPuzzle.split(""));
  const [sudokuMessage, setSudokuMessage] = useState("Fill the missing numbers without breaking the grid.");
  const [sudokuScore, setSudokuScore] = useState(0);
  const [snake, setSnake] = useState<SnakePoint[]>([
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
  ]);
  const [snakeFood, setSnakeFood] = useState<SnakePoint>({ x: 8, y: 6 });
  const [snakeDirection, setSnakeDirection] = useState<Direction>("right");
  const [snakeRunning, setSnakeRunning] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeMessage, setSnakeMessage] = useState("Press start, then guide the learner line to collect focus dots.");

  const scrambledWord = useMemo(() => scramble(designWords[wordIndex]), [wordIndex]);
  const totalScore = reflexScore + wordScore + sequenceScore + layoutScore + sudokuScore + snakeScore + Math.floor(matchedCards.length / 2);
  const gameCardClass = "group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_55px_rgba(10,15,30,0.08)] ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,143,227,0.16)]";
  const gameStats = [
    { label: "Total Arcade Points", value: totalScore, Icon: Trophy },
    { label: "Memory Pairs", value: `${matchedCards.length / 2}/${memoryIcons.length}`, Icon: Brain },
    { label: "Snake Streak", value: snakeScore, Icon: Gamepad2 },
    { label: "Logic Solves", value: sudokuScore, Icon: Medal },
  ];

  useEffect(() => {
    if (!snakeRunning) return;

    const interval = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = nextSnakeHead(currentSnake[0], snakeDirection);
        const hitWall = head.x < 0 || head.x >= snakeBoardSize || head.y < 0 || head.y >= snakeBoardSize;
        const hitSelf = currentSnake.some((part) => part.x === head.x && part.y === head.y);

        if (hitWall || hitSelf) {
          setSnakeRunning(false);
          setSnakeMessage("Nice run. Reset and try for a longer focus streak.");
          return currentSnake;
        }

        const ateFood = head.x === snakeFood.x && head.y === snakeFood.y;
        const nextSnake = ateFood ? [head, ...currentSnake] : [head, ...currentSnake.slice(0, -1)];

        if (ateFood) {
          setSnakeScore((score) => score + 1);
          setSnakeFood(randomFood(nextSnake));
          setSnakeMessage("Focus dot collected. Keep the rhythm.");
        }

        return nextSnake;
      });
    }, 180);

    return () => window.clearInterval(interval);
  }, [snakeDirection, snakeFood.x, snakeFood.y, snakeRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") changeSnakeDirection("up");
      if (event.key === "ArrowDown") changeSnakeDirection("down");
      if (event.key === "ArrowLeft") changeSnakeDirection("left");
      if (event.key === "ArrowRight") changeSnakeDirection("right");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const resetSequence = () => {
    setSequence(shuffle(sequenceItems).slice(0, 4));
    setSequenceInput([]);
    setSequenceMessage("Repeat the creative stack in the same order.");
  };

  const chooseSequenceItem = (item: string) => {
    const nextInput = [...sequenceInput, item];
    const isCorrectSoFar = nextInput.every((value, index) => value === sequence[index]);
    setSequenceInput(nextInput);

    if (!isCorrectSoFar) {
      setSequenceMessage("Close. Reset and try the order again.");
      return;
    }

    if (nextInput.length === sequence.length) {
      setSequenceScore((score) => score + 1);
      setSequenceMessage("Nice focus. New sequence loaded.");
      window.setTimeout(resetSequence, 500);
    } else {
      setSequenceMessage(`${sequence.length - nextInput.length} step${sequence.length - nextInput.length === 1 ? "" : "s"} remaining.`);
    }
  };

  const resetLayout = () => {
    setLayoutOptions(shuffle(layoutBlocks));
    setLayoutPlaced([]);
    setLayoutMessage("Build the landing page from top to bottom.");
  };

  const placeLayoutBlock = (block: string) => {
    const nextPlaced = [...layoutPlaced, block];
    setLayoutPlaced(nextPlaced);
    setLayoutOptions((options) => options.filter((item) => item !== block));

    if (nextPlaced.length === layoutBlocks.length) {
      const isCorrect = nextPlaced.every((item, index) => item === layoutBlocks[index]);
      if (isCorrect) {
        setLayoutScore((score) => score + 1);
        setLayoutMessage("Perfect structure. That page would scan beautifully.");
      } else {
        setLayoutMessage("Almost. Reset and arrange the flow like a real homepage.");
      }
    }
  };

  const setSudokuValue = (index: number, value: string) => {
    if (sudokuPuzzle[index] !== "0") return;

    const nextValue = value.replace(/\D/g, "").slice(-1);
    setSudokuCells((cells) => cells.map((cell, cellIndex) => cellIndex === index ? nextValue || "0" : cell));
    setSudokuMessage("Keep going. Check the grid when every box is filled.");
  };

  const checkSudoku = () => {
    const answer = sudokuCells.join("");
    if (answer.includes("0")) {
      setSudokuMessage("There are still empty boxes. Fill them before checking.");
      return;
    }

    if (answer === sudokuSolution) {
      setSudokuScore((score) => score + 1);
      setSudokuMessage("Excellent logic. Puzzle solved cleanly.");
    } else {
      setSudokuMessage("Something is off. Review each row, column, and 3x3 box.");
    }
  };

  const resetSudoku = () => {
    setSudokuCells(sudokuPuzzle.split(""));
    setSudokuMessage("Fill the missing numbers without breaking the grid.");
  };

  const resetSnake = () => {
    const initialSnake = [
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 3, y: 6 },
    ];
    setSnake(initialSnake);
    setSnakeFood(randomFood(initialSnake));
    setSnakeDirection("right");
    setSnakeRunning(false);
    setSnakeScore(0);
    setSnakeMessage("Press start, then guide the learner line to collect focus dots.");
  };

  const changeSnakeDirection = (direction: Direction) => {
    const opposite: Record<Direction, Direction> = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    setSnakeDirection((current) => opposite[current] === direction ? current : direction);
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-white bg-white p-5 shadow-[0_24px_70px_rgba(10,15,30,0.08)] md:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div className="rounded-[26px] bg-slate-950 p-6 text-white">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-light">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Modern Arcade Dashboard
            </p>
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">Choose a game, build a streak, then jump back into class.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
              Scores reset per visit, so every break feels fresh. The games are designed for quick focus, speed, logic, and creative thinking.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {gameStats.map(({ Icon, ...stat }) => (
              <div key={stat.label} className="rounded-2xl border border-gray-100 bg-light-gray p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Target className="h-5 w-5 text-primary/50" aria-hidden="true" />
                </div>
                <p className="text-3xl font-black text-dark">{stat.value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
      <section className={gameCardClass}>
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
                className={`aspect-square rounded-2xl border text-lg font-black transition-all duration-300 ${
                  revealed
                    ? "border-primary bg-gradient-to-br from-primary to-primary-light text-white shadow-lg shadow-primary/20"
                    : "border-gray-100 bg-slate-950 text-transparent shadow-inner hover:-translate-y-0.5 hover:border-primary/30"
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

      <section className={gameCardClass}>
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
          <Zap className="h-4 w-4" aria-hidden="true" />
          Color Reflex
        </p>
        <h2 className="text-xl font-extrabold text-dark">Tap the matching color</h2>
        <div className="my-6 rounded-[26px] p-6 text-center text-white shadow-2xl shadow-slate-900/10 ring-1 ring-white/20" style={{ backgroundColor: targetColor.value }}>
          <p className="text-sm font-bold uppercase tracking-widest">Find</p>
          <p className="text-3xl font-black">{targetColor.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {reflexColors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => chooseReflexColor(color.name)}
              className="rounded-2xl px-4 py-4 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5"
              style={{ backgroundColor: color.value }}
            >
              {color.name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">Score: {reflexScore}</p>
      </section>

      <section className={gameCardClass}>
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
          <Palette className="h-4 w-4" aria-hidden="true" />
          Design Word
        </p>
        <h2 className="text-xl font-extrabold text-dark">Unscramble the design word</h2>
        <div className="my-6 rounded-[26px] border border-dashed border-primary/30 bg-gradient-to-br from-primary/10 to-white p-6 text-center shadow-inner">
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

      <section className={gameCardClass}>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Creative Sequence
            </p>
            <h2 className="text-xl font-extrabold text-dark">Repeat the tool stack</h2>
          </div>
          <button
            type="button"
            onClick={resetSequence}
            className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
            aria-label="Reset sequence game"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 rounded-[26px] border border-dashed border-primary/30 bg-primary/5 p-4">
          {sequence.map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-xl bg-white px-4 py-3 text-sm font-black text-primary shadow-sm">
              {index + 1}. {item}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {sequenceItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => chooseSequenceItem(item)}
              disabled={sequenceInput.length === sequence.length}
              className="rounded-xl border border-gray-100 bg-light-gray px-4 py-4 text-sm font-black text-dark transition hover:-translate-y-0.5 hover:border-primary hover:text-primary disabled:opacity-50"
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">{sequenceMessage}</p>
        <p className="mt-1 text-sm font-bold text-gray-500">Score: {sequenceScore}</p>
      </section>

      <section className={gameCardClass}>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
              Layout Builder
            </p>
            <h2 className="text-xl font-extrabold text-dark">Arrange the homepage flow</h2>
          </div>
          <button
            type="button"
            onClick={resetLayout}
            className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
            aria-label="Reset layout game"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mb-4 min-h-24 rounded-[26px] border border-dashed border-gray-200 bg-light-gray p-3">
          <div className="grid gap-2">
            {layoutPlaced.length === 0 ? (
              <p className="py-6 text-center text-sm font-bold text-gray-400">Tap blocks below to build the page.</p>
            ) : (
              layoutPlaced.map((item, index) => (
                <div key={`${item}-${index}`} className="rounded-xl bg-white px-4 py-3 text-sm font-black text-dark shadow-sm">
                  {index + 1}. {item}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {layoutOptions.map((block) => (
            <button
              key={block}
              type="button"
              onClick={() => placeLayoutBlock(block)}
              className="rounded-xl bg-dark px-4 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-primary"
            >
              {block}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">{layoutMessage}</p>
        <p className="mt-1 text-sm font-bold text-gray-500">Score: {layoutScore}</p>
      </section>

      <section className={gameCardClass}>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <Brain className="h-4 w-4" aria-hidden="true" />
              Sudoku Focus
            </p>
            <h2 className="text-xl font-extrabold text-dark">Solve the 9x9 logic grid</h2>
          </div>
          <button
            type="button"
            onClick={resetSudoku}
            className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
            aria-label="Reset sudoku game"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-9 overflow-hidden rounded-[26px] border-2 border-dark bg-dark shadow-2xl shadow-slate-900/10">
          {sudokuCells.map((cell, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const fixed = sudokuPuzzle[index] !== "0";
            const borderClasses = [
              col === 2 || col === 5 ? "border-r-2 border-r-dark" : "border-r border-r-gray-200",
              row === 2 || row === 5 ? "border-b-2 border-b-dark" : "border-b border-b-gray-200",
            ].join(" ");

            return (
              <input
                key={`sudoku-${index}`}
                value={cell === "0" ? "" : cell}
                onChange={(event) => setSudokuValue(index, event.target.value)}
                disabled={fixed}
                inputMode="numeric"
                aria-label={`Sudoku row ${row + 1} column ${col + 1}`}
                className={`aspect-square min-w-0 bg-white text-center text-sm font-black outline-none transition focus:bg-primary/10 sm:text-base ${fixed ? "text-dark" : "text-primary"} ${borderClasses}`}
              />
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={checkSudoku}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-dark px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Check Puzzle
          </button>
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">{sudokuMessage}</p>
        <p className="mt-1 text-sm font-bold text-gray-500">Solved: {sudokuScore}</p>
      </section>

      <section className={gameCardClass}>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
              <Gamepad2 className="h-4 w-4" aria-hidden="true" />
              Modern Snake
            </p>
            <h2 className="text-xl font-extrabold text-dark">Collect focus dots</h2>
          </div>
          <button
            type="button"
            onClick={resetSnake}
            className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
            aria-label="Reset snake game"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="grid aspect-square grid-cols-12 gap-1 rounded-[26px] bg-slate-950 p-3 shadow-inner">
          {Array.from({ length: snakeBoardSize * snakeBoardSize }).map((_, index) => {
            const x = index % snakeBoardSize;
            const y = Math.floor(index / snakeBoardSize);
            const snakeIndex = snake.findIndex((part) => part.x === x && part.y === y);
            const isFood = snakeFood.x === x && snakeFood.y === y;

            return (
              <div
                key={`snake-${index}`}
                className={`aspect-square rounded-md transition ${
                  snakeIndex === 0
                    ? "bg-primary shadow-lg shadow-primary/50 ring-2 ring-white/40"
                    : snakeIndex > -1
                    ? "bg-sky-300"
                    : isFood
                    ? "bg-yellow-400 shadow-lg shadow-yellow-400/40"
                    : "bg-white/8"
                }`}
              />
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <span />
          <button type="button" onClick={() => changeSnakeDirection("up")} className="rounded-xl bg-light-gray px-4 py-3 text-sm font-black text-dark transition hover:bg-primary hover:text-white">Up</button>
          <span />
          <button type="button" onClick={() => changeSnakeDirection("left")} className="rounded-xl bg-light-gray px-4 py-3 text-sm font-black text-dark transition hover:bg-primary hover:text-white">Left</button>
          <button type="button" onClick={() => setSnakeRunning((running) => !running)} className="rounded-xl bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-primary/90">
            {snakeRunning ? "Pause" : "Start"}
          </button>
          <button type="button" onClick={() => changeSnakeDirection("right")} className="rounded-xl bg-light-gray px-4 py-3 text-sm font-black text-dark transition hover:bg-primary hover:text-white">Right</button>
          <span />
          <button type="button" onClick={() => changeSnakeDirection("down")} className="rounded-xl bg-light-gray px-4 py-3 text-sm font-black text-dark transition hover:bg-primary hover:text-white">Down</button>
          <span />
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500">{snakeMessage}</p>
        <p className="mt-1 text-sm font-bold text-gray-500">Score: {snakeScore}</p>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-primary/20 bg-primary/10 p-5 lg:col-span-3">
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
    </div>
  );
}
