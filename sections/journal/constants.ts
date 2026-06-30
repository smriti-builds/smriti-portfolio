/** Animation & layout constants for the premium journal opening. */
import { journalDimensions } from "@/lib/content/journal";

export const JOURNAL_SPINE_WIDTH = 17;

export const { coverWidth, coverHeight, spreadWidth, spreadHeight } =
  journalDimensions;

/** Closed journal footprint: one cover width, left-anchored in the spread stage. */
export const CLOSED_JOURNAL_WIDTH = coverWidth;

/** 3D perspective for the cover flip only. */
export const BOOK_PERSPECTIVE = 2000;

/** Front cover open angle — stops short of -180° for a natural hinge. */
export const COVER_OPEN_DEG = -175;

/** Camera push starting scale. */
export const CAMERA_PUSH_SCALE = 0.96;

/** Section cream — fills spread letterboxing to avoid visible seams. */
export const JOURNAL_PAPER_COLOR = "#F4F0E5";

/** Unified open/close duration (seconds). */
export const TIMING = {
  openDuration: 1.1,
  closeDuration: 0.95,
} as const;

/**
 * Smooth symmetric ease — no overshoot or bounce.
 * Works identically in both open and close directions.
 */
export const SMOOTH_EASE = [0.4, 0, 0.2, 1] as [
  number,
  number,
  number,
  number,
];

/** Ground shadow closed → open. */
export const SHADOW_CLOSED = { blur: 18, opacity: 0.1 };
export const SHADOW_OPEN = { blur: 38, opacity: 0.2 };

/** Bleed around the book so the animated ground shadow is never clipped. */
export const SHADOW_BLEED = 56;
