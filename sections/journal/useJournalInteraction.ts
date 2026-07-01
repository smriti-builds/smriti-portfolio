"use client";

import { animate, type AnimationPlaybackControls, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AUTO_OPEN_DELAY_MS,
  COVER_FLIP_EASE,
  IDLE_PEEK_DEG,
  IDLE_PEEK_DURATION_S,
  IDLE_PEEK_INTERVAL_MAX_MS,
  IDLE_PEEK_INTERVAL_MIN_MS,
  IDLE_PEEK_OPEN_EASE,
  IDLE_PEEK_SETTLE_EASE,
  IDLE_RESTART_DELAY_MAX_MS,
  IDLE_RESTART_DELAY_MIN_MS,
  TIMING,
} from "@/sections/journal/constants";

function randomBetween(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

type UseJournalInteractionOptions = {
  openProgress: MotionValue<number>;
  idlePeekDeg: MotionValue<number>;
  reduceMotion?: boolean | null;
};

export function useJournalInteraction({
  openProgress,
  idlePeekDeg,
  reduceMotion = false,
}: UseJournalInteractionOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const isAnimatingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const idlePeekRunningRef = useRef(false);
  const autoOpenCancelledRef = useRef(false);

  const autoOpenTimerRef = useRef<number | null>(null);
  const idlePeekTimerRef = useRef<number | null>(null);
  const idleRestartTimerRef = useRef<number | null>(null);
  const idlePeekControlsRef = useRef<AnimationPlaybackControls | null>(null);
  const openCloseControlsRef = useRef<AnimationPlaybackControls | null>(null);

  const clearAutoOpenTimer = useCallback(() => {
    if (autoOpenTimerRef.current) {
      window.clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
    }
  }, []);

  const clearIdlePeekTimer = useCallback(() => {
    if (idlePeekTimerRef.current) {
      window.clearTimeout(idlePeekTimerRef.current);
      idlePeekTimerRef.current = null;
    }
  }, []);

  const clearIdleRestartTimer = useCallback(() => {
    if (idleRestartTimerRef.current) {
      window.clearTimeout(idleRestartTimerRef.current);
      idleRestartTimerRef.current = null;
    }
  }, []);

  const canRunIdle = useCallback(() => {
    return (
      !reduceMotion &&
      !isOpen &&
      !isAnimatingRef.current &&
      !isHoveredRef.current &&
      !idlePeekRunningRef.current &&
      openProgress.get() <= 0.001
    );
  }, [isOpen, openProgress, reduceMotion]);

  const stopIdleActivity = useCallback(() => {
    clearIdlePeekTimer();
    clearIdleRestartTimer();
    idlePeekControlsRef.current?.stop();
    idlePeekControlsRef.current = null;
    idlePeekRunningRef.current = false;
    idlePeekDeg.set(0);
  }, [clearIdlePeekTimer, clearIdleRestartTimer, idlePeekDeg]);

  const scheduleIdlePeek = useCallback(
    (delayMs: number) => {
      if (reduceMotion) return;

      clearIdlePeekTimer();
      idlePeekTimerRef.current = window.setTimeout(() => {
        idlePeekTimerRef.current = null;
        if (!canRunIdle()) return;

        void (async () => {
          if (!canRunIdle() || idlePeekRunningRef.current) return;

          idlePeekRunningRef.current = true;
          const half = IDLE_PEEK_DURATION_S / 2;

          try {
            idlePeekControlsRef.current?.stop();
            const openPeek = animate(idlePeekDeg, IDLE_PEEK_DEG, {
              duration: half,
              ease: IDLE_PEEK_OPEN_EASE,
            });
            idlePeekControlsRef.current = openPeek;
            await openPeek;

            if (!canRunIdle()) return;

            const settlePeek = animate(idlePeekDeg, 0, {
              duration: half,
              ease: IDLE_PEEK_SETTLE_EASE,
            });
            idlePeekControlsRef.current = settlePeek;
            await settlePeek;
          } finally {
            idlePeekRunningRef.current = false;
            idlePeekControlsRef.current = null;

            if (canRunIdle()) {
              scheduleIdlePeek(
                randomBetween(IDLE_PEEK_INTERVAL_MIN_MS, IDLE_PEEK_INTERVAL_MAX_MS),
              );
            }
          }
        })();
      }, delayMs);
    },
    [canRunIdle, clearIdlePeekTimer, idlePeekDeg, reduceMotion],
  );

  const scheduleIdleRestart = useCallback(() => {
    if (reduceMotion || isOpen) return;

    clearIdleRestartTimer();
    idleRestartTimerRef.current = window.setTimeout(() => {
      idleRestartTimerRef.current = null;
      if (canRunIdle()) {
        scheduleIdlePeek(
          randomBetween(IDLE_PEEK_INTERVAL_MIN_MS, IDLE_PEEK_INTERVAL_MAX_MS),
        );
      }
    }, randomBetween(IDLE_RESTART_DELAY_MIN_MS, IDLE_RESTART_DELAY_MAX_MS));
  }, [canRunIdle, clearIdleRestartTimer, isOpen, reduceMotion, scheduleIdlePeek]);

  const cancelAutoOpen = useCallback(() => {
    autoOpenCancelledRef.current = true;
    clearAutoOpenTimer();
  }, [clearAutoOpenTimer]);

  const handlePointerEnter = useCallback(() => {
    isHoveredRef.current = true;
    stopIdleActivity();
  }, [stopIdleActivity]);

  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (!isOpen && !isAnimatingRef.current && !reduceMotion) {
      scheduleIdleRestart();
    }
  }, [isOpen, reduceMotion, scheduleIdleRestart]);

  const handleClick = useCallback(() => {
    cancelAutoOpen();
    stopIdleActivity();
    setIsOpen((open) => !open);
  }, [cancelAutoOpen, stopIdleActivity]);

  useEffect(() => {
    if (reduceMotion) return;

    autoOpenCancelledRef.current = false;
    autoOpenTimerRef.current = window.setTimeout(() => {
      autoOpenTimerRef.current = null;
      if (autoOpenCancelledRef.current) return;
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    idleRestartTimerRef.current = window.setTimeout(() => {
      idleRestartTimerRef.current = null;
      if (canRunIdle()) {
        scheduleIdlePeek(
          randomBetween(IDLE_PEEK_INTERVAL_MIN_MS, IDLE_PEEK_INTERVAL_MAX_MS),
        );
      }
    }, randomBetween(IDLE_RESTART_DELAY_MIN_MS, IDLE_RESTART_DELAY_MAX_MS));

    return () => {
      clearAutoOpenTimer();
      stopIdleActivity();
    };
    // Session lifecycle: always start closed, auto-open once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useEffect(() => {
    stopIdleActivity();
    isAnimatingRef.current = true;

    openCloseControlsRef.current?.stop();
    const controls = animate(openProgress, isOpen ? 1 : 0, {
      duration: isOpen ? TIMING.openDuration : TIMING.closeDuration,
      ease: COVER_FLIP_EASE,
      onComplete: () => {
        isAnimatingRef.current = false;
        if (!isOpen && !isHoveredRef.current && !reduceMotion) {
          scheduleIdleRestart();
        }
      },
    });
    openCloseControlsRef.current = controls;

    return () => {
      controls.stop();
      isAnimatingRef.current = false;
    };
  }, [isOpen, openProgress, reduceMotion, scheduleIdleRestart, stopIdleActivity]);

  return {
    isOpen,
    handleClick,
    handlePointerEnter,
    handlePointerLeave,
  };
}
