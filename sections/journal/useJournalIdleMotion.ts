"use client";

import { useTransform, type MotionValue } from "framer-motion";
import { journalClosedDropShadow } from "@/lib/content/journal";
import {
  HOVER_COVER_PARALLAX_X_PX,
  HOVER_COVER_PARALLAX_Y_PX,
  HOVER_PAGE_PARALLAX_X_PX,
  HOVER_PAGE_PARALLAX_Y_PX,
  HOVER_PARALLAX_X_PX,
  HOVER_PARALLAX_Y_PX,
  HOVER_SHADOW_X_PX,
  HOVER_SHADOW_Y_PX,
  HOVER_SPECULAR_BOOST,
  HOVER_TILT_DEG_X,
  HOVER_TILT_DEG_Y,
  IDLE_PAGE_LAG_Y_PX,
  IDLE_SETTLE_Y_PX,
  IDLE_SHADOW_BLUR_BOOST,
  IDLE_SHADOW_SHIFT_PX,
  IDLE_SHADOW_X_PX,
  IDLE_TILT_DEG_X,
  IDLE_TILT_DEG_Y,
  JOURNAL_SHADOW_RGB,
} from "@/sections/journal/constants";
import type { HoverParallaxMotion } from "@/sections/journal/useJournalHoverParallax";

function idleWeight(openProgress: number) {
  return Math.max(0, 1 - openProgress / 0.08);
}

/** Hover + idle strength — full when closed, softer when open. */
function ambientWeight(openProgress: number) {
  if (openProgress < 0.08) return 1;
  if (openProgress > 0.92) return 0.7;
  return Math.max(0.35, 1 - openProgress * 0.65);
}

function wave(phase: number, offset = 0) {
  return Math.sin((phase + offset) * Math.PI * 2);
}

function buildAmbientDropShadow(
  phase: number,
  openProgress: number,
  hoverX: number,
  hoverY: number,
) {
  const iw = idleWeight(openProgress);
  const aw = ambientWeight(openProgress);

  if (iw <= 0 && Math.hypot(hoverX, hoverY) < 0.02) {
    return openProgress > 0.08 ? journalClosedDropShadow : journalClosedDropShadow;
  }

  const sway = wave(phase, 0.15);
  const px = (sway * IDLE_SHADOW_X_PX * iw + hoverX * HOVER_SHADOW_X_PX) * aw;
  const py =
    (3 + sway * IDLE_SHADOW_SHIFT_PX * iw + hoverY * HOVER_SHADOW_Y_PX) * aw;
  const blur = (IDLE_SHADOW_BLUR_BOOST * iw + Math.hypot(hoverX, hoverY) * 4) * aw;
  const c = JOURNAL_SHADOW_RGB;

  return `drop-shadow(${px.toFixed(1)}px ${py.toFixed(1)}px ${(16 + blur).toFixed(0)}px rgba(${c}, 0.07)) drop-shadow(${(px * 2.5).toFixed(1)}px ${(py + 5).toFixed(1)}px ${(28 + blur).toFixed(0)}px rgba(${c}, 0.09)) drop-shadow(${(px * 4).toFixed(1)}px ${(py + 12).toFixed(1)}px ${(44 + blur).toFixed(0)}px rgba(${c}, 0.07))`;
}

/** Idle cycle + hover parallax — whole book moves as one physical object. */
export function useJournalIdleMotion(
  idlePhase: MotionValue<number>,
  openProgress: MotionValue<number>,
  { hoverX, hoverY }: HoverParallaxMotion,
) {
  const shellRotateY = useTransform(
    [idlePhase, openProgress, hoverX, hoverY],
    ([phase, p, hx, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        wave(phase as number) * IDLE_TILT_DEG_Y * iw +
        (hx as number) * HOVER_TILT_DEG_Y * aw
      );
    },
  );

  const shellRotateX = useTransform(
    [idlePhase, openProgress, hoverX, hoverY],
    ([phase, p, hx, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        wave(phase as number, 0.25) * IDLE_TILT_DEG_X * iw +
        (hy as number) * HOVER_TILT_DEG_X * aw
      );
    },
  );

  const shellX = useTransform([openProgress, hoverX], ([p, hx]) => {
    return (hx as number) * HOVER_PARALLAX_X_PX * ambientWeight(p as number);
  });

  const shellY = useTransform(
    [idlePhase, openProgress, hoverY],
    ([phase, p, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        wave(phase as number, 0.15) * IDLE_SETTLE_Y_PX * iw +
        (hy as number) * HOVER_PARALLAX_Y_PX * aw
      );
    },
  );

  const pageLagX = useTransform([openProgress, hoverX], ([p, hx]) => {
    return (hx as number) * HOVER_PAGE_PARALLAX_X_PX * ambientWeight(p as number) * 0.55;
  });

  const pageLagY = useTransform(
    [idlePhase, openProgress, hoverY],
    ([phase, p, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        wave(phase as number, 0.1) * IDLE_PAGE_LAG_Y_PX * iw +
        (hy as number) * HOVER_PAGE_PARALLAX_Y_PX * aw * 0.5
      );
    },
  );

  const coverParallaxX = useTransform([openProgress, hoverX], ([p, hx]) => {
    return (hx as number) * HOVER_COVER_PARALLAX_X_PX * ambientWeight(p as number);
  });

  const coverParallaxY = useTransform([openProgress, hoverY], ([p, hy]) => {
    return (hy as number) * HOVER_COVER_PARALLAX_Y_PX * ambientWeight(p as number);
  });

  const idleBookDropShadow = useTransform(
    [idlePhase, openProgress, hoverX, hoverY],
    ([phase, p, hx, hy]) =>
      buildAmbientDropShadow(
        phase as number,
        p as number,
        hx as number,
        hy as number,
      ),
  );

  const specularOpacity = useTransform(
    [openProgress, hoverX, hoverY],
    ([p, hx, hy]) => {
      const aw = ambientWeight(p as number);
      const hoverBoost =
        Math.hypot(hx as number, hy as number) * HOVER_SPECULAR_BOOST;
      return Math.max(0, 1 - (p as number) / 0.06) * (0.2 + hoverBoost) * aw;
    },
  );

  const specularBackground = useTransform(
    [idlePhase, hoverX, hoverY],
    ([phase, hx, hy]) => {
      const hoverMag = Math.hypot(hx as number, hy as number);
      const x =
        hoverMag > 0.04
          ? 18 + ((hx as number) + 1) * 32
          : 15 + (phase as number) * 58;
      return `linear-gradient(108deg, transparent ${x - 14}%, rgba(255,255,255,0.34) ${x}%, rgba(255,255,255,0.07) ${x + 10}%, transparent ${x + 26}%)`;
    },
  );

  const closedGroundShadowX = useTransform(
    [idlePhase, openProgress, hoverX],
    ([phase, p, hx]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        wave(phase as number, 0.15) * IDLE_SHADOW_X_PX * 1.2 * iw +
        (hx as number) * HOVER_SHADOW_X_PX * 1.1 * aw
      );
    },
  );

  const closedGroundShadowY = useTransform(
    [idlePhase, openProgress, hoverY],
    ([phase, p, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        8 +
        wave(phase as number, 0.15) * IDLE_SHADOW_SHIFT_PX * iw +
        (hy as number) * HOVER_SHADOW_Y_PX * aw
      );
    },
  );

  const closedGroundShadowOpacity = useTransform(
    [idlePhase, openProgress, hoverX, hoverY],
    ([phase, p, hx, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      const hoverLift = Math.hypot(hx as number, hy as number) * 0.1;
      return aw * (iw * (0.24 + wave(phase as number, 0.15) * 0.14) + hoverLift);
    },
  );

  const closedGroundShadowScale = useTransform(
    [idlePhase, openProgress, hoverX, hoverY],
    ([phase, p, hx, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        1 +
        iw * wave(phase as number, 0.15) * 0.06 +
        aw * Math.hypot(hx as number, hy as number) * 0.04
      );
    },
  );

  const closedGroundShadowBlur = useTransform(
    [idlePhase, openProgress, hoverX, hoverY],
    ([phase, p, hx, hy]) => {
      const iw = idleWeight(p as number);
      const aw = ambientWeight(p as number);
      return (
        20 +
        iw * (6 + wave(phase as number, 0.15) * 4) +
        aw * Math.hypot(hx as number, hy as number) * 5
      );
    },
  );

  return {
    shellRotateY,
    shellRotateX,
    shellX,
    shellY,
    pageLagX,
    pageLagY,
    coverParallaxX,
    coverParallaxY,
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
