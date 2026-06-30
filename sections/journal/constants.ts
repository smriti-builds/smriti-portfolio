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

/** Slight closed-book tilt; eases flat as the journal opens. */
export const CLOSED_ROTATE_X = 4;
export const CLOSED_ROTATE_Z = -1;
export const OPEN_ROTATE_X = 0.8;
export const OPEN_ROTATE_Z = 0;

/** Camera push starting scale. */
export const CAMERA_PUSH_SCALE = 0.96;

/** Section cream — fills spread letterboxing to avoid visible seams. */
export const JOURNAL_PAPER_COLOR = "#F4F0E5";

/** Motion timing (seconds). */
export const TIMING = {
  scaleDuration: 0.42,
  coverOpenDelay: 0.18,
  coverOpenDuration: 1.05,
  pagesSettleDelay: 0.92,
  pagesSettleDuration: 0.38,
  closeCoverDuration: 0.82,
  closeScaleDuration: 0.36,
} as const;

/** Apple / Airbnb-style deceleration curves. */
export const PREMIUM_EASE = [0.32, 0.72, 0, 1] as [
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

export const PAGES_SETTLE_EASE = [0.25, 1, 0.4, 1] as [
  number,
  number,
  number,
  number,
];

/** Ground shadow closed → open. */
export const SHADOW_CLOSED = { blur: 18, opacity: 0.1 };
export const SHADOW_OPEN = { blur: 38, opacity: 0.2 };

/** Pages micro-expansion after the cover is almost fully open. */
export const PAGES_SETTLE_SCALE_X = 0.992;

/** Bleed around the book so the animated ground shadow is never clipped. */
export const SHADOW_BLEED = 56;
