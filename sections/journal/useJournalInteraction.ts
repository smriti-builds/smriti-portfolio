"use client";

import {
  animate,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
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

  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const idlePeekRunningRef = useRef(false);
  const autoOpenCancelledRef = useRef(false);
  const hasInitializedRef = useRef(false);

  const autoOpenTimerRef = useRef<number | null>(null);
  const idlePeekTimerRef = useRef<number | null>(null);
  const idleRestartTimerRef = useRef<number | null>(null);
  const idlePeekControlsRef = useRef<AnimationPlaybackControls | null>(null);
  const openCloseControlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

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
      !isOpenRef.current &&
      !isAnimatingRef.current &&
      !isHoveredRef.current &&
      !idlePeekRunningRef.current &&
      openProgress.get() < 0.01
    );
  }, [openProgress, reduceMotion]);

  const stopIdleActivity = useCallback(() => {
    clearIdlePeekTimer();
    clearIdleRestartTimer();
    idlePeekControlsRef.current?.stop();
    idlePeekControlsRef.current = null;
    idlePeekRunningRef.current = false;
    idlePeekDeg.set(0);
  }, [clearIdlePeekTimer, clearIdleRestartTimer, idlePeekDeg]);

  const runIdlePeek = useCallback(async () => {
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
    }
  }, [canRunIdle, idlePeekDeg]);

  const scheduleIdlePeek = useCallback(
    (delayMs: number) => {
      if (reduceMotion) return;

      clearIdlePeekTimer();
      idlePeekTimerRef.current = window.setTimeout(() => {
        idlePeekTimerRef.current = null;
        if (!canRunIdle()) return;

        void (async () => {
          await runIdlePeek();

          if (canRunIdle()) {
            scheduleIdlePeek(
              randomBetween(IDLE_PEEK_INTERVAL_MIN_MS, IDLE_PEEK_INTERVAL_MAX_MS),
            );
          }
        })();
      }, delayMs);
    },
    [canRunIdle, clearIdlePeekTimer, reduceMotion, runIdlePeek],
  );

  const startIdleLoop = useCallback(() => {
    if (reduceMotion || isOpenRef.current) return;

    clearIdleRestartTimer();
    idleRestartTimerRef.current = window.setTimeout(() => {
      idleRestartTimerRef.current = null;
      if (canRunIdle()) {
        scheduleIdlePeek(0);
      }
    }, randomBetween(IDLE_RESTART_DELAY_MIN_MS, IDLE_RESTART_DELAY_MAX_MS));
  }, [canRunIdle, clearIdleRestartTimer, reduceMotion, scheduleIdlePeek]);

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
    if (!isOpenRef.current && !isAnimatingRef.current && !reduceMotion) {
      startIdleLoop();
    }
  }, [reduceMotion, startIdleLoop]);

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

    return () => {
      clearAutoOpenTimer();
      stopIdleActivity();
    };
  }, [clearAutoOpenTimer, reduceMotion, stopIdleActivity]);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      if (!isOpen) {
        openProgress.set(0);
        startIdleLoop();
        return;
      }
    }

    stopIdleActivity();
    isAnimatingRef.current = true;

    openCloseControlsRef.current?.stop();
    const controls = animate(openProgress, isOpen ? 1 : 0, {
      duration: isOpen ? TIMING.openDuration : TIMING.closeDuration,
      ease: COVER_FLIP_EASE,
      onComplete: () => {
        isAnimatingRef.current = false;
        if (!isOpenRef.current && !isHoveredRef.current && !reduceMotion) {
          startIdleLoop();
        }
      },
    });
    openCloseControlsRef.current = controls;

    return () => {
      controls.stop();
      isAnimatingRef.current = false;
    };
  }, [isOpen, openProgress, reduceMotion, startIdleLoop, stopIdleActivity]);

  return {
    isOpen,
    handleClick,
    handlePointerEnter,
    handlePointerLeave,
  };
}
