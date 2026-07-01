"use client";

import { useTransform, type MotionValue } from "framer-motion";
import { journalClosedDropShadow } from "@/lib/content/journal";
import {
  IDLE_PAGE_LAG_Y_PX,
  IDLE_SETTLE_Y_PX,
  IDLE_SHADOW_BLUR_BOOST,
  IDLE_SHADOW_SHIFT_PX,
  IDLE_SHADOW_X_PX,
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

function buildIdleDropShadow(phase: number, openProgress: number) {
  const w = idleWeight(openProgress);
  if (w <= 0) return journalClosedDropShadow;

  const sway = wave(phase, 0.15);
  const px = sway * IDLE_SHADOW_X_PX * w;
  const py = 3 + sway * IDLE_SHADOW_SHIFT_PX * w;
  const blur = IDLE_SHADOW_BLUR_BOOST * w * (1 + sway * 0.35);
  const c = JOURNAL_SHADOW_RGB;

  return `drop-shadow(${px.toFixed(1)}px ${py.toFixed(1)}px ${(16 + blur).toFixed(0)}px rgba(${c}, 0.07)) drop-shadow(${(px * 2.5).toFixed(1)}px ${(py + 5).toFixed(1)}px ${(28 + blur).toFixed(0)}px rgba(${c}, 0.09)) drop-shadow(${(px * 4).toFixed(1)}px ${(py + 12).toFixed(1)}px ${(44 + blur).toFixed(0)}px rgba(${c}, 0.07))`;
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

  const idleBookDropShadow = useTransform([idlePhase, openProgress], ([phase, p]) =>
    buildIdleDropShadow(phase as number, p as number),
  );

  const specularOpacity = useTransform(openProgress, (p) =>
    Math.max(0, 1 - p / 0.06) * 0.2,
  );

  const specularBackground = useTransform(idlePhase, (phase) => {
    const x = 15 + phase * 58;
    return `linear-gradient(108deg, transparent ${x - 14}%, rgba(255,255,255,0.32) ${x}%, rgba(255,255,255,0.06) ${x + 10}%, transparent ${x + 26}%)`;
  });

  const closedGroundShadowX = useTransform([idlePhase, openProgress], ([phase, p]) => {
    const w = idleWeight(p as number);
    return wave(phase as number, 0.15) * IDLE_SHADOW_X_PX * 1.2 * w;
  });

  const closedGroundShadowY = useTransform([idlePhase, openProgress], ([phase, p]) => {
    const w = idleWeight(p as number);
    return 8 + wave(phase as number, 0.15) * IDLE_SHADOW_SHIFT_PX * w;
  });

  const closedGroundShadowOpacity = useTransform(
    [idlePhase, openProgress],
    ([phase, p]) => {
      const w = idleWeight(p as number);
      return w * (0.24 + wave(phase as number, 0.15) * 0.14);
    },
  );

  const closedGroundShadowScale = useTransform([idlePhase, openProgress], ([phase, p]) => {
    const w = idleWeight(p as number);
    return 1 + w * wave(phase as number, 0.15) * 0.06;
  });

  const closedGroundShadowBlur = useTransform([idlePhase, openProgress], ([phase, p]) => {
    const w = idleWeight(p as number);
    return 20 + w * (6 + wave(phase as number, 0.15) * 4);
  });

  return {
    shellRotateY,
    shellRotateX,
    shellY,
    pageLagY,
    idleBookDropShadow,
    specularOpacity,
    specularBackground,
    closedGroundShadowX,
    closedGroundShadowY,
    closedGroundShadowOpacity,
    closedGroundShadowScale,
    closedGroundShadowBlur,
  };
}
