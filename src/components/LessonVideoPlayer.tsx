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
  /**
   * isReset is true only for an explicit restart/end-of-video reset to 0 -
   * everything else (periodic reports while playing, pause, unmount) is
   * false. The backend uses this to distinguish "the user deliberately
   * restarted" from an ordinary progress tick, since ordinary ticks must
   * never move the saved resume position backward (a second tab open on
   * the same lesson, further behind, would otherwise silently undo real
   * progress made in another tab).
   */
  onProgress: (lessonId: string, positionSeconds: number, durationSeconds: number, isReset: boolean) => void;
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
    // The YouTube IFrame API's player methods aren't safe to call until
    // onReady has actually fired - calling them earlier (e.g. during an
    // unmount that races ahead of player initialization, which happens
    // often when a student switches lessons quickly) can throw, and an
    // exception thrown from a useEffect cleanup crashes the whole page.
    if (!player || !isReadyRef.current) return;
    try {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      if (Number.isFinite(currentTime) && currentTime >= 0) {
        onProgressRef.current(lessonId, currentTime, Number.isFinite(duration) ? duration : 0, false);
      }
    } catch {
      // Player was mid-teardown or otherwise not queryable - nothing to report.
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
      if (!player || !isReadyRef.current) return;
      try {
        player.seekTo(0, true);
        onProgressRef.current(lessonId, 0, player.getDuration() || 0, true);
      } catch {
        // Player wasn't in a queryable state - nothing to restart.
      }
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
              try {
                onProgressRef.current(lessonId, 0, playerRef.current?.getDuration() || 0, true);
              } catch {
                onProgressRef.current(lessonId, 0, 0, true);
              }
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      stopPolling();
      reportProgress();
      try {
        playerRef.current?.destroy();
      } catch {
        // Iframe may already be gone by the time destroy() runs during a fast unmount.
      }
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
