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
  IDLE_CYCLE_DURATION_S,
  IDLE_RESTART_DELAY_MAX_MS,
  IDLE_RESTART_DELAY_MIN_MS,
  TIMING,
} from "@/sections/journal/constants";

function randomBetween(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

type UseJournalInteractionOptions = {
  openProgress: MotionValue<number>;
  idlePhase: MotionValue<number>;
  sectionInView: boolean;
  reduceMotion?: boolean | null;
};

export function useJournalInteraction({
  openProgress,
  idlePhase,
  sectionInView,
  reduceMotion = false,
}: UseJournalInteractionOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const sectionInViewRef = useRef(sectionInView);
  const autoOpenCancelledRef = useRef(false);
  const hasInitializedRef = useRef(false);

  const autoOpenTimerRef = useRef<number | null>(null);
  const idleRestartTimerRef = useRef<number | null>(null);
  const idleCycleControlsRef = useRef<AnimationPlaybackControls | null>(null);
  const openCloseControlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    sectionInViewRef.current = sectionInView;
  }, [sectionInView]);

  const clearAutoOpenTimer = useCallback(() => {
    if (autoOpenTimerRef.current) {
      window.clearTimeout(autoOpenTimerRef.current);
      autoOpenTimerRef.current = null;
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
      sectionInViewRef.current &&
      !isOpenRef.current &&
      !isAnimatingRef.current &&
      !isHoveredRef.current &&
      openProgress.get() < 0.01
    );
  }, [openProgress, reduceMotion]);

  const stopIdleActivity = useCallback(() => {
    clearIdleRestartTimer();
    idleCycleControlsRef.current?.stop();
    idleCycleControlsRef.current = null;
    idlePhase.set(0);
  }, [clearIdleRestartTimer, idlePhase]);

  const startIdleCycle = useCallback(() => {
    if (!canRunIdle()) return;

    idleCycleControlsRef.current?.stop();
    idlePhase.set(0);
    idleCycleControlsRef.current = animate(idlePhase, 1, {
      duration: IDLE_CYCLE_DURATION_S,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [canRunIdle, idlePhase]);

  const startIdleLoop = useCallback(() => {
    if (reduceMotion || isOpenRef.current || !sectionInViewRef.current) return;

    clearIdleRestartTimer();
    idleRestartTimerRef.current = window.setTimeout(() => {
      idleRestartTimerRef.current = null;
      startIdleCycle();
    }, randomBetween(IDLE_RESTART_DELAY_MIN_MS, IDLE_RESTART_DELAY_MAX_MS));
  }, [clearIdleRestartTimer, reduceMotion, startIdleCycle]);

  const scheduleAutoOpen = useCallback(() => {
    clearAutoOpenTimer();
    if (
      reduceMotion ||
      autoOpenCancelledRef.current ||
      isOpenRef.current ||
      !sectionInViewRef.current
    ) {
      return;
    }

    autoOpenTimerRef.current = window.setTimeout(() => {
      autoOpenTimerRef.current = null;
      if (
        autoOpenCancelledRef.current ||
        isOpenRef.current ||
        !sectionInViewRef.current
      ) {
        return;
      }
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);
  }, [clearAutoOpenTimer, reduceMotion]);

  const cancelAutoOpen = useCallback(() => {
    autoOpenCancelledRef.current = true;
    clearAutoOpenTimer();
  }, [clearAutoOpenTimer]);

  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (!isOpenRef.current && !isAnimatingRef.current && !reduceMotion) {
      startIdleLoop();
    }
  }, [reduceMotion, startIdleLoop]);

  const handlePointerEnterWithIdle = useCallback(() => {
    isHoveredRef.current = true;
    stopIdleActivity();
  }, [stopIdleActivity]);

  const handleClick = useCallback(() => {
    cancelAutoOpen();
    stopIdleActivity();
    setIsOpen((open) => !open);
  }, [cancelAutoOpen, stopIdleActivity]);

  /** Section visibility — auto-open & idle only while the journal is on screen. */
  useEffect(() => {
    if (!sectionInView) {
      clearAutoOpenTimer();
      stopIdleActivity();
      return;
    }

    if (!autoOpenCancelledRef.current && !isOpenRef.current && !reduceMotion) {
      scheduleAutoOpen();
    }

    if (
      !isOpenRef.current &&
      !isAnimatingRef.current &&
      !reduceMotion &&
      hasInitializedRef.current
    ) {
      startIdleLoop();
    }
  }, [
    clearAutoOpenTimer,
    reduceMotion,
    scheduleAutoOpen,
    sectionInView,
    startIdleLoop,
    stopIdleActivity,
  ]);

  useEffect(() => {
    return () => {
      clearAutoOpenTimer();
      stopIdleActivity();
    };
  }, [clearAutoOpenTimer, stopIdleActivity]);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      openProgress.set(0);
      idlePhase.set(0);
      setIsOpen(false);
      autoOpenCancelledRef.current = false;
      return;
    }

    stopIdleActivity();
    isAnimatingRef.current = true;

    openCloseControlsRef.current?.stop();
    const controls = animate(openProgress, isOpen ? 1 : 0, {
      duration: isOpen ? TIMING.openDuration : TIMING.closeDuration,
      ease: COVER_FLIP_EASE,
      onComplete: () => {
        isAnimatingRef.current = false;
        if (
          !isOpenRef.current &&
          !isHoveredRef.current &&
          !reduceMotion &&
          sectionInViewRef.current
        ) {
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
    handlePointerEnter: handlePointerEnterWithIdle,
    handlePointerLeave,
  };
}
