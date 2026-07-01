"use client";

import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useCallback, type PointerEvent as ReactPointerEvent } from "react";
import { HOVER_SPRING } from "@/sections/journal/constants";

export function useJournalHoverParallax(reduceMotion: boolean) {
  const hoverPointerX = useMotionValue(0);
  const hoverPointerY = useMotionValue(0);

  const hoverX = useSpring(hoverPointerX, HOVER_SPRING);
  const hoverY = useSpring(hoverPointerY, HOVER_SPRING);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reduceMotion) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      hoverPointerX.set(Math.max(-1, Math.min(1, nx)));
      hoverPointerY.set(Math.max(-1, Math.min(1, ny)));
    },
    [hoverPointerX, hoverPointerY, reduceMotion],
  );

  const resetHoverParallax = useCallback(() => {
    hoverPointerX.set(0);
    hoverPointerY.set(0);
  }, [hoverPointerX, hoverPointerY]);

  return {
    hoverX,
    hoverY,
    handlePointerMove,
    resetHoverParallax,
  };
}

export type HoverParallaxMotion = {
  hoverX: MotionValue<number>;
  hoverY: MotionValue<number>;
};
