"use client";

import { useTransform, type MotionValue } from "framer-motion";
import {
  IDLE_PAGE_LAG_Y_PX,
  IDLE_SETTLE_Y_PX,
  IDLE_SHADOW_SHIFT_PX,
  IDLE_TILT_DEG_X,
  IDLE_TILT_DEG_Y,
  JOURNAL_SHADOW_RGB,
} from "@/sections/journal/constants";

function idleWeight(openProgress: number) {
  return Math.max(0, 1 - openProgress / 0.08);
}

function wave(phase: number, offset = 0) {
  return Math.sin((phase + offset) * Math.PI * 2);
}

/** Derived closed-state idle transforms — whole book moves as one object. */
export function useJournalIdleMotion(
  idlePhase: MotionValue<number>,
  openProgress: MotionValue<number>,
) {
  const shellRotateY = useTransform([idlePhase, openProgress], ([phase, p]) =>
    wave(phase as number) * IDLE_TILT_DEG_Y * idleWeight(p as number),
  );

  const shellRotateX = useTransform([idlePhase, openProgress], ([phase, p]) =>
    wave(phase as number, 0.25) * IDLE_TILT_DEG_X * idleWeight(p as number),
  );

  const shellY = useTransform([idlePhase, openProgress], ([phase, p]) =>
    wave(phase as number, 0.15) * IDLE_SETTLE_Y_PX * idleWeight(p as number),
  );

  const pageLagY = useTransform([idlePhase, openProgress], ([phase, p]) =>
    wave(phase as number, 0.1) * IDLE_PAGE_LAG_Y_PX * idleWeight(p as number),
  );

  const shadowOffsetY = useTransform([idlePhase, openProgress], ([phase, p]) => {
    const w = idleWeight(p as number);
    return w * (1.5 + wave(phase as number, 0.15) * IDLE_SHADOW_SHIFT_PX);
  });

  const shadowBlurBoost = useTransform([idlePhase, openProgress], ([phase, p]) => {
    const w = idleWeight(p as number);
    return w * (3 + wave(phase as number, 0.15) * 2);
  });

  const closedDropShadow = useTransform(
    [shadowOffsetY, shadowBlurBoost, openProgress],
    ([y, blurBoost, p]) => {
      if ((p as number) > 0.08) return "none";
      const py = y as number;
      const b = blurBoost as number;
      const c = JOURNAL_SHADOW_RGB;
      return `drop-shadow(1px ${2 + py}px ${14 + b}px rgba(${c}, 0.05)) drop-shadow(3px ${6 + py}px ${22 + b}px rgba(${c}, 0.06)) drop-shadow(6px ${12 + py}px ${32 + b}px rgba(${c}, 0.05))`;
    },
  );

  const specularOpacity = useTransform(openProgress, (p) =>
    Math.max(0, 1 - p / 0.06) * 0.2,
  );

  const specularBackground = useTransform(idlePhase, (phase) => {
    const x = 15 + phase * 58;
    return `linear-gradient(108deg, transparent ${x - 14}%, rgba(255,255,255,0.32) ${x}%, rgba(255,255,255,0.06) ${x + 10}%, transparent ${x + 26}%)`;
  });

  const closedGroundShadowY = useTransform([shellY, openProgress], ([y, p]) => {
    const w = idleWeight(p as number);
    return -6 + (y as number) * 0.45 * w;
  });

  const closedGroundShadowOpacity = useTransform(openProgress, (p) =>
    Math.max(0, 1 - p / 0.1) * 0.32,
  );

  const closedGroundShadowScale = useTransform([idlePhase, openProgress], ([phase, p]) => {
    const w = idleWeight(p as number);
    return 1 + w * wave(phase as number, 0.15) * 0.03;
  });

  return {
    shellRotateY,
    shellRotateX,
    shellY,
    pageLagY,
    closedDropShadow,
    specularOpacity,
    specularBackground,
    closedGroundShadowY,
    closedGroundShadowOpacity,
    closedGroundShadowScale,
  };
}
