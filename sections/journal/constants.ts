/** Animation & layout constants for the premium journal opening. */
import { journalDimensions } from "@/lib/content/journal";

export const JOURNAL_SPINE_WIDTH = 17;

export const { coverWidth, coverHeight, spreadWidth, spreadHeight } =
  journalDimensions;

/** Closed journal footprint: one cover width, left-anchored in the spread stage. */
export const CLOSED_JOURNAL_WIDTH = coverWidth;

/** 3D perspective — middle of the 1800–2200px spec range. */
export const BOOK_PERSPECTIVE = 2000;

/** Front cover open angle — stops short of -180° for a natural hinge. */
export const COVER_OPEN_DEG = -175;

/** Slight closed-book tilt preserved throughout the motion. */
export const CLOSED_ROTATE_X = 4;
export const CLOSED_ROTATE_Z = -1;

/** Camera push starting scale / offset. */
export const CAMERA_PUSH_SCALE = 0.94;
export const CAMERA_PUSH_Y = 20;

/** Motion timing (ms) — see animation spec. */
export const TIMING = {
  cameraPushDelay: 200,
  cameraPushDuration: 300,
  coverOpenDelay: 350,
  coverOpenDuration: 900,
  pagesExpandDelay: 1250,
  pagesExpandDuration: 250,
  settleDelay: 1450,
  settleDuration: 160,
} as const;

/** Easing curves from the motion spec. */
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

/** Pages micro-expansion after the cover is ~80% open. */
export const PAGES_CLOSED = { scaleX: 0.985, x: 2, opacity: 0.96 };
export const PAGES_OPEN = { scaleX: 1, x: 0, opacity: 1 };

/** Final overshoot settle. */
export const SETTLE_SCALE_PEAK = 1.01;
export const SETTLE_COVER_OVERSHOOT = -172;

/** Bleed around the book so the animated ground shadow is never clipped. */
export const SHADOW_BLEED = 56;
