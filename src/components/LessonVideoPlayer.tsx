"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface YouTubePlayerLike {
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

interface YouTubePlayerEvent {
  data: number;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          events: {
            onReady?: () => void;
            onStateChange?: (event: YouTubePlayerEvent) => void;
          };
        }
      ) => YouTubePlayerLike;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youTubeApiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.YT?.Player) return Promise.resolve();

  if (!youTubeApiPromise) {
    youTubeApiPromise = new Promise((resolve) => {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        resolve();
      };

      if (!document.getElementById("youtube-iframe-api")) {
        const script = document.createElement("script");
        script.id = "youtube-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }
    });
  }

  return youTubeApiPromise;
}

function withJsApiEnabled(url: string) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("enablejsapi", "1");
    return parsed.toString();
  } catch {
    return url;
  }
}

const PROGRESS_REPORT_INTERVAL_MS = 5000;
const MIN_RESUME_SECONDS = 5;

export interface LessonVideoPlayerHandle {
  restart: () => void;
}

interface LessonVideoPlayerProps {
  lessonId: string;
  title: string;
  videoUrl: string;
  /** null means "not loaded yet" - resume seeking waits for a real value. */
  initialPositionSeconds: number | null;
  onProgress: (lessonId: string, positionSeconds: number, durationSeconds: number) => void;
}

const LessonVideoPlayer = forwardRef<LessonVideoPlayerHandle, LessonVideoPlayerProps>(function LessonVideoPlayer(
  { lessonId, title, videoUrl, initialPositionSeconds, onProgress },
  ref
) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YouTubePlayerLike | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isReadyRef = useRef(false);
  const hasSeekedRef = useRef(false);
  const positionRef = useRef<number | null>(initialPositionSeconds);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const stopPolling = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reportProgress = () => {
    const player = playerRef.current;
    if (!player) return;
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    if (Number.isFinite(currentTime) && currentTime >= 0) {
      onProgressRef.current(lessonId, currentTime, Number.isFinite(duration) ? duration : 0);
    }
  };

  const maybeSeekToSavedPosition = () => {
    if (hasSeekedRef.current || !isReadyRef.current) return;
    const savedPosition = positionRef.current;
    if (savedPosition === null) return;

    hasSeekedRef.current = true;
    if (savedPosition >= MIN_RESUME_SECONDS) {
      playerRef.current?.seekTo(savedPosition, true);
    }
  };

  useImperativeHandle(ref, () => ({
    restart: () => {
      const player = playerRef.current;
      if (!player) return;
      player.seekTo(0, true);
      onProgressRef.current(lessonId, 0, player.getDuration() || 0);
    },
  }), [lessonId]);

  useEffect(() => {
    positionRef.current = initialPositionSeconds;
    maybeSeekToSavedPosition();
  }, [initialPositionSeconds]);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !iframeRef.current || !window.YT) return;

      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            isReadyRef.current = true;
            maybeSeekToSavedPosition();
          },
          onStateChange: (event) => {
            const state = window.YT?.PlayerState;
            if (!state) return;

            if (event.data === state.PLAYING) {
              stopPolling();
              intervalRef.current = setInterval(reportProgress, PROGRESS_REPORT_INTERVAL_MS);
            } else if (event.data === state.PAUSED) {
              stopPolling();
              reportProgress();
            } else if (event.data === state.ENDED) {
              stopPolling();
              onProgressRef.current(lessonId, 0, playerRef.current?.getDuration() || 0);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      stopPolling();
      reportProgress();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  return (
    <iframe
      ref={iframeRef}
      className="h-full w-full"
      src={withJsApiEnabled(videoUrl)}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
});

export default LessonVideoPlayer;
