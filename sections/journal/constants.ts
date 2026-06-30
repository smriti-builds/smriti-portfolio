/** Animation & layout constants for the premium journal opening. */
import { journalDimensions } from "@/lib/content/journal";

export const JOURNAL_SPINE_WIDTH = 17;

export const { coverWidth, coverHeight, spreadWidth, spreadHeight } =
  journalDimensions;

/** Closed journal footprint: one cover width, left-anchored in the spread stage. */
export const CLOSED_JOURNAL_WIDTH = coverWidth;

/** 3D perspective. */
export const BOOK_PERSPECTIVE = 2000;

/** Front cover open angle — stops short of -180° for a natural hinge. */
export const COVER_OPEN_DEG = -175;

/** Slight closed-book tilt preserved throughout the motion. */
export const CLOSED_ROTATE_X = 4;
export const CLOSED_ROTATE_Z = -1;

/** Camera push starting scale. */
export const CAMERA_PUSH_SCALE = 0.94;

/** Motion timing (seconds). */
export const TIMING = {
  /** Scale 0.94 → 1 on mount. */
  scaleDuration: 0.3,
  /** Cover rotation begins after scale completes. */
  coverOpenDelay: 0.3,
  coverOpenDuration: 0.9,
  /** Pages settle after cover is ~80% open. */
  pagesSettleDelay: 1.02,
  pagesSettleDuration: 0.25,
} as const;

export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as [
  number,
  number,
  number,
  number,
];

export const COVER_OPEN_EASE = [0.22, 0.9, 0.2, 1] as [
  number,
  number,
  number,
  number,
];

export const PAGES_SETTLE_EASE = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

/** Ground shadow closed → open. */
export const SHADOW_CLOSED = { blur: 20, opacity: 0.12 };
export const SHADOW_OPEN = { blur: 42, opacity: 0.24 };

/** Pages micro-expansion after the cover is almost fully open. */
export const PAGES_SETTLE_SCALE_X = 0.985;

/** Bleed around the book so the animated ground shadow is never clipped. */
export const SHADOW_BLEED = 56;
