/** Animation & layout constants for the premium journal opening. */
import { journalDimensions } from "@/lib/content/journal";

export const JOURNAL_SPINE_WIDTH = 17;

export const { coverWidth, coverHeight, spreadWidth, spreadHeight } =
  journalDimensions;

export const CLOSED_JOURNAL_WIDTH = coverWidth;

export const BOOK_PERSPECTIVE = 2000;

export const COVER_OPEN_DEG = -175;

export const CAMERA_PUSH_SCALE = 0.96;

export const JOURNAL_PAPER_COLOR = "#F4F0E5";

export const TIMING = {
  openDuration: 1.05,
  closeDuration: 0.9,
} as const;

export const SMOOTH_EASE = [0.4, 0, 0.2, 1] as [
  number,
  number,
  number,
  number,
];

/** Cover flip — fast start, long deceleration for physical weight. */
export const COVER_FLIP_EASE = [0.22, 0.9, 0.2, 1] as [
  number,
  number,
  number,
  number,
];

export const SHADOW_CLOSED = { blur: 24, opacity: 0.16, spreadY: 10 };
export const SHADOW_OPEN = { blur: 52, opacity: 0.3, spreadY: 26 };

export const SHADOW_BLEED = 64;

/** Max Z-lift of the cover mid-flip (px). */
export const COVER_LIFT_Z = 16;
