"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Brain,
  CheckCircle2,
  Flame,
  Gamepad2,
  Layers3,
  MousePointerClick,
  Music2,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const glowTiles = ["PS", "AI", "UX", "JS", "3D", "CC"];
const reflexColors = [
  { name: "Blue", value: "#0056FF" },
  { name: "Gold", value: "#F59E0B" },
  { name: "Mint", value: "#10B981" },
  { name: "Pink", value: "#EC4899" },
];
const rhythmPads = [
  { key: "A", color: "from-cyan-400 to-blue-600" },
  { key: "S", color: "from-fuchsia-500 to-rose-500" },
  { key: "D", color: "from-amber-400 to-orange-500" },
  { key: "F", color: "from-emerald-400 to-teal-600" },
];
const trendCards = [
  { label: "Hook", value: "Before / After", good: true },
  { label: "Hook", value: "Plain Intro", good: false },
  { label: "Caption", value: "Save this idea", good: true },
  { label: "Caption", value: "Untitled file", good: false },
  { label: "Visual", value: "Bold Contrast", good: true },
  { label: "Visual", value: "Low Quality", good: false },
];
const snakeBoardSize = 12;
const progressStorageKey = "scds-games-player-progress-v1";

type PlayerProgress = {
  xp: number;
  bestScore: number;
  totalPlays: number;
  lastGame: string;
  lastPlayed: string;
};

type Direction = "up" | "down" | "left" | "right";
type SnakePoint = { x: number; y: number };

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
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

function getLevelFromXp(xp: number) {
  return Math.min(12, Math.floor(Math.max(0, xp) / 60) + 1);
}

function getLevelConfig(level: number) {
  return {
    memoryPairs: Math.min(glowTiles.length, 3 + Math.floor(level / 2)),
    rhythmLength: Math.min(6, 3 + Math.floor(level / 2)),
    snakeSpeed: Math.max(80, 175 - level * 8),
    tapGridSize: level >= 7 ? 16 : 9,
    tapTime: Math.max(8, 16 - Math.floor(level / 2)),
    trendOptions: Math.min(4, 2 + Math.floor(level / 3)),
    xpGoal: getLevelFromXp(level * 60) >= 12 ? 60 : 60,
  };
}

function formatLastPlayed(value: string) {
  if (!value) return "New player";

  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Saved";
  }
}

export default function StudyBreakGames() {
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress>({
    xp: 0,
    bestScore: 0,
    totalPlays: 0,
    lastGame: "New player",
    lastPlayed: "",
  });
  const playerLevel = getLevelFromXp(playerProgress.xp);
  const levelConfig = useMemo(() => getLevelConfig(playerLevel), [playerLevel]);
  const activeGlowTiles = useMemo(() => glowTiles.slice(0, levelConfig.memoryPairs), [levelConfig.memoryPairs]);
  const [memoryDeck, setMemoryDeck] = useState(() => shuffle([...glowTiles.slice(0, 3), ...glowTiles.slice(0, 3)]));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [targetColor, setTargetColor] = useState(() => reflexColors[0]);
  const [reflexScore, setReflexScore] = useState(0);
  const [tapTarget, setTapTarget] = useState(() => Math.floor(Math.random() * 9));
  const [tapScore, setTapScore] = useState(0);
  const [tapCombo, setTapCombo] = useState(0);
  const [tapTime, setTapTime] = useState(16);
  const [tapRunning, setTapRunning] = useState(false);
  const [rhythmSequence, setRhythmSequence] = useState(() => shuffle(rhythmPads.map((pad) => pad.key)).slice(0, 3));
  const [rhythmInput, setRhythmInput] = useState<string[]>([]);
  const [rhythmScore, setRhythmScore] = useState(0);
  const [rhythmMessage, setRhythmMessage] = useState("Tap the pads in the glowing order.");
  const [trendDeck, setTrendDeck] = useState(() => shuffle(trendCards));
  const [trendScore, setTrendScore] = useState(0);
  const [trendMessage, setTrendMessage] = useState("Pick the card that would perform best online.");
  const [snake, setSnake] = useState<SnakePoint[]>([
    { x: 5, y: 6 },
    { x: 4, y: 6 },
    { x: 3, y: 6 },
  ]);
  const [snakeFood, setSnakeFood] = useState<SnakePoint>({ x: 8, y: 6 });
  const [snakeDirection, setSnakeDirection] = useState<Direction>("right");
  const [snakeRunning, setSnakeRunning] = useState(false);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeMessage, setSnakeMessage] = useState("Press start and collect glow dots.");

  const memoryPairs = matchedCards.length / 2;
  const totalScore = tapScore + reflexScore + rhythmScore + trendScore + snakeScore + memoryPairs;
  const xpInLevel = playerProgress.xp % 60;
  const levelProgressPercent = Math.min(100, Math.round((xpInLevel / levelConfig.xpGoal) * 100));
  const gameCardClass = "group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_55px_rgba(10,15,30,0.08)] ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,143,227,0.16)]";
  const rhythmProgress = rhythmInput.length;
  const gameStats = [
    { label: "Level", value: playerLevel, Icon: Trophy },
    { label: "Saved XP", value: playerProgress.xp, Icon: Sparkles },
    { label: "Best Score", value: playerProgress.bestScore, Icon: Target },
    { label: "Last Game", value: playerProgress.lastGame, Icon: Gamepad2 },
  ];

  const recordProgress = useCallback((game: string, xpEarned: number) => {
    setPlayerProgress((current) => ({
      xp: current.xp + xpEarned,
      bestScore: Math.max(current.bestScore, totalScore + xpEarned),
      totalPlays: current.totalPlays + 1,
      lastGame: game,
      lastPlayed: new Date().toISOString(),
    }));
  }, [totalScore]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(progressStorageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Partial<PlayerProgress>;
      setPlayerProgress({
        xp: Number(parsed.xp) || 0,
        bestScore: Number(parsed.bestScore) || 0,
        totalPlays: Number(parsed.totalPlays) || 0,
        lastGame: typeof parsed.lastGame === "string" ? parsed.lastGame : "New player",
        lastPlayed: typeof parsed.lastPlayed === "string" ? parsed.lastPlayed : "",
      });
    } catch {
      // Local storage may be unavailable in private browsing. The games still work without saved records.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(progressStorageKey, JSON.stringify(playerProgress));
    } catch {
      // Saving progress is a convenience feature, not required for gameplay.
    }
  }, [playerProgress]);

  useEffect(() => {
    setMemoryDeck(shuffle([...activeGlowTiles, ...activeGlowTiles]));
    setSelectedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setRhythmSequence(shuffle(rhythmPads.map((pad) => pad.key)).slice(0, levelConfig.rhythmLength));
    setRhythmInput([]);
    setTapTime(levelConfig.tapTime);
    setTapTarget(Math.floor(Math.random() * levelConfig.tapGridSize));
  }, [activeGlowTiles, levelConfig.rhythmLength, levelConfig.tapGridSize, levelConfig.tapTime, playerLevel]);

  useEffect(() => {
    if (!tapRunning) return;

    const interval = window.setInterval(() => {
      setTapTime((time) => {
        if (time <= 1) {
          setTapRunning(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [tapRunning]);

  useEffect(() => {
    if (!snakeRunning) return;

    const interval = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = nextSnakeHead(currentSnake[0], snakeDirection);
        const hitWall = head.x < 0 || head.x >= snakeBoardSize || head.y < 0 || head.y >= snakeBoardSize;
        const hitSelf = currentSnake.some((part) => part.x === head.x && part.y === head.y);

        if (hitWall || hitSelf) {
          setSnakeRunning(false);
          setSnakeMessage("Nice run. Reset and chase a longer streak.");
          return currentSnake;
        }

        const ateFood = head.x === snakeFood.x && head.y === snakeFood.y;
        const nextSnake = ateFood ? [head, ...currentSnake] : [head, ...currentSnake.slice(0, -1)];

        if (ateFood) {
          setSnakeScore((score) => score + 1);
          recordProgress("Glow Snake", 7);
          setSnakeFood(randomFood(nextSnake));
          setSnakeMessage("Glow dot collected.");
        }

        return nextSnake;
      });
    }, levelConfig.snakeSpeed);

    return () => window.clearInterval(interval);
  }, [levelConfig.snakeSpeed, recordProgress, snakeDirection, snakeFood.x, snakeFood.y, snakeRunning]);

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

  const activeTrendCards = useMemo(() => trendDeck.slice(0, levelConfig.trendOptions), [levelConfig.trendOptions, trendDeck]);

  const resetMemory = () => {
    setMemoryDeck(shuffle([...activeGlowTiles, ...activeGlowTiles]));
    setSelectedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const pickCard = (index: number) => {
    if (selectedCards.includes(index) || matchedCards.includes(index) || selectedCards.length === 2) return;

    const nextSelected = [...selectedCards, index];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((current) => current + 1);
      const [first, second] = nextSelected;
      if (memoryDeck[first] === memoryDeck[second]) {
        setMatchedCards((current) => [...current, first, second]);
        recordProgress("Glow Match", 6);
        setSelectedCards([]);
      } else {
        window.setTimeout(() => setSelectedCards([]), 550);
      }
    }
  };

  const chooseReflexColor = (name: string) => {
    if (name === targetColor.name) {
      setReflexScore((score) => score + 1);
      recordProgress("Color Reflex", 4);
    } else {
      setReflexScore((score) => Math.max(0, score - 1));
    }
    setTargetColor(shuffle(reflexColors)[0]);
  };

  const resetTapRush = () => {
    setTapScore(0);
    setTapCombo(0);
    setTapTime(levelConfig.tapTime);
    setTapTarget(Math.floor(Math.random() * levelConfig.tapGridSize));
    setTapRunning(true);
  };

  const hitTapTarget = (index: number) => {
    if (!tapRunning || tapTime === 0) return;
    if (index === tapTarget) {
      setTapCombo((combo) => combo + 1);
      setTapScore((score) => score + 1 + Math.min(tapCombo, 5));
      recordProgress("Neon Tap Rush", 3 + Math.min(tapCombo, 4));
      setTapTarget(Math.floor(Math.random() * levelConfig.tapGridSize));
    } else {
      setTapCombo(0);
      setTapScore((score) => Math.max(0, score - 1));
    }
  };

  const resetRhythm = () => {
    setRhythmSequence(shuffle(rhythmPads.map((pad) => pad.key)).slice(0, levelConfig.rhythmLength));
    setRhythmInput([]);
    setRhythmMessage("Tap the pads in the glowing order.");
  };

  const chooseRhythmPad = (key: string) => {
    const nextInput = [...rhythmInput, key];
    const isCorrectSoFar = nextInput.every((value, index) => value === rhythmSequence[index]);
    setRhythmInput(nextInput);

    if (!isCorrectSoFar) {
      setRhythmMessage("Missed the beat. Reset and replay it.");
      return;
    }

    if (nextInput.length === rhythmSequence.length) {
      setRhythmScore((score) => score + 1);
      recordProgress("Beat Match", 12 + playerLevel);
      setRhythmMessage("Clean beat. New combo loaded.");
      window.setTimeout(resetRhythm, 550);
      return;
    }

    setRhythmMessage(`${rhythmSequence.length - nextInput.length} tap${rhythmSequence.length - nextInput.length === 1 ? "" : "s"} left.`);
  };

  const pickTrendCard = (good: boolean) => {
    if (good) {
      setTrendScore((score) => score + 1);
      recordProgress("Trend Picker", 8);
      setTrendMessage("Good pick. That idea has stronger attention.");
    } else {
      setTrendScore((score) => Math.max(0, score - 1));
      setTrendMessage("Too flat. Pick the more scroll-stopping option.");
    }
    setTrendDeck(shuffle(trendCards));
  };

  const resetTrend = () => {
    setTrendDeck(shuffle(trendCards));
    setTrendScore(0);
    setTrendMessage("Pick the card that would perform best online.");
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
    setSnakeMessage("Press start and collect glow dots.");
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
              Gen Z Arcade
            </p>
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">Fast games, bright visuals, instant scores.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
              Your level, XP, best score, and last game are saved on this device so you can continue where you stopped.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-black uppercase tracking-widest text-white/50">Level {playerLevel} Progress</span>
                <span className="text-xs font-black text-primary-light">{xpInLevel}/{levelConfig.xpGoal} XP</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${levelProgressPercent}%` }} />
              </div>
              <p className="mt-3 text-xs font-bold text-white/55">
                Last saved: {formatLastPlayed(playerProgress.lastPlayed)} - {playerProgress.totalPlays} scored play{playerProgress.totalPlays === 1 ? "" : "s"}
              </p>
            </div>
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
        <section className={`${gameCardClass} bg-slate-950 text-white lg:col-span-2`}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-light">
                <MousePointerClick className="h-4 w-4" aria-hidden="true" />
                Neon Tap Rush
              </p>
              <h2 className="text-2xl font-extrabold">Hit the glowing tile before time runs out</h2>
            </div>
            <button
              type="button"
              onClick={resetTapRush}
              className="rounded-xl border border-white/15 p-2 text-white/70 transition hover:border-primary-light hover:text-primary-light"
              aria-label="Reset tap rush game"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className={`mb-5 grid gap-3 rounded-[26px] bg-white/5 p-3 ${levelConfig.tapGridSize > 9 ? "grid-cols-4" : "grid-cols-3"}`}>
            {Array.from({ length: levelConfig.tapGridSize }).map((_, index) => (
              <button
                key={`tap-${index}`}
                type="button"
                onClick={() => hitTapTarget(index)}
                className={`aspect-square rounded-2xl border transition duration-200 ${
                  index === tapTarget && tapRunning
                    ? "border-cyan-200 bg-cyan-300 shadow-[0_0_34px_rgba(34,211,238,0.8)]"
                    : "border-white/10 bg-white/10 hover:bg-white/15"
                }`}
                aria-label={index === tapTarget && tapRunning ? "Active glowing tile" : "Inactive tap tile"}
              />
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-black">{tapScore}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Score</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-black">{tapCombo}x</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Combo</p>
            </div>
            <button
              type="button"
              onClick={() => setTapRunning((running) => !running)}
              className="rounded-2xl bg-primary px-4 py-4 text-sm font-black text-white transition hover:bg-primary-light"
            >
              {tapRunning ? `${tapTime}s Left` : tapTime === 0 ? "Play Again" : `Level ${playerLevel}`}
            </button>
          </div>
        </section>

        <section className={gameCardClass}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <Music2 className="h-4 w-4" aria-hidden="true" />
                Beat Match
              </p>
              <h2 className="text-xl font-extrabold text-dark">Replay the pad combo</h2>
            </div>
            <button
              type="button"
              onClick={resetRhythm}
              className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
              aria-label="Reset beat match game"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mb-4 flex flex-wrap gap-2 rounded-[26px] border border-primary/10 bg-primary/5 p-4">
            {rhythmSequence.map((item, index) => (
              <span key={`${item}-${index}`} className={`rounded-xl px-4 py-3 text-sm font-black ${index < rhythmProgress ? "bg-primary text-white" : "bg-white text-primary shadow-sm"}`}>
                {index + 1}. {item}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {rhythmPads.map((pad) => (
              <button
                key={pad.key}
                type="button"
                onClick={() => chooseRhythmPad(pad.key)}
                className={`rounded-2xl bg-gradient-to-br ${pad.color} px-4 py-6 text-xl font-black text-white shadow-lg transition hover:-translate-y-0.5`}
              >
                {pad.key}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold text-gray-500">{rhythmMessage}</p>
          <p className="mt-1 text-sm font-bold text-gray-500">Score: {rhythmScore} - Level length: {levelConfig.rhythmLength}</p>
        </section>

        <section className={gameCardClass}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <Brain className="h-4 w-4" aria-hidden="true" />
                Glow Match
              </p>
              <h2 className="text-xl font-extrabold text-dark">Match the creative tiles</h2>
            </div>
            <button
              type="button"
              onClick={resetMemory}
              className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
              aria-label="Reset glow match game"
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
            {memoryPairs}/{activeGlowTiles.length} pairs found - {moves} moves
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
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <Flame className="h-4 w-4" aria-hidden="true" />
                Trend Picker
              </p>
              <h2 className="text-xl font-extrabold text-dark">Choose the strongest post idea</h2>
            </div>
            <button
              type="button"
              onClick={resetTrend}
              className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:border-primary hover:text-primary"
              aria-label="Reset trend picker game"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="grid gap-3">
            {activeTrendCards.map((card) => (
              <button
                key={`${card.label}-${card.value}`}
                type="button"
                onClick={() => pickTrendCard(card.good)}
                className="rounded-2xl border border-gray-100 bg-light-gray p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-widest text-primary">{card.label}</p>
                <p className="mt-1 text-lg font-black text-dark">{card.value}</p>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold text-gray-500">{trendMessage}</p>
          <p className="mt-1 text-sm font-bold text-gray-500">Score: {trendScore} - Choices: {levelConfig.trendOptions}</p>
        </section>

        <section className={gameCardClass}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <Gamepad2 className="h-4 w-4" aria-hidden="true" />
                Glow Snake
              </p>
              <h2 className="text-xl font-extrabold text-dark">Collect glow dots</h2>
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
          <p className="mt-1 text-sm font-bold text-gray-500">Score: {snakeScore} - Speed: level {playerLevel}</p>
        </section>

        <section className="overflow-hidden rounded-[28px] border border-primary/20 bg-primary/10 p-5 lg:col-span-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                <Layers3 className="h-4 w-4" aria-hidden="true" />
                Fresh Game Mix
              </p>
              <h2 className="mt-2 text-xl font-extrabold text-dark">Levels get harder automatically and your progress is saved.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                Higher levels add more memory pairs, longer beat patterns, tighter tap time, extra trend choices, and faster snake movement.
              </p>
            </div>
            <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
        </section>
      </div>
    </div>
  );
}
