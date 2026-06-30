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

/** Desaturated shadow tone — blends into cream background. */
export const JOURNAL_SHADOW_RGB = "32, 44, 61";

/** Auto-open delay after mount (ms). */
export const AUTO_OPEN_DELAY_MS = 5000;

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

export const COVER_FLIP_EASE = [0.22, 0.9, 0.2, 1] as [
  number,
  number,
  number,
  number,
];

/** Ground shadow — closed = tight contact; open = wide diffuse halo. */
export const SHADOW_CLOSED = { blur: 40, peakAlpha: 0.07, widthRatio: 0.9 };
export const SHADOW_OPEN = { blur: 68, peakAlpha: 0.11, widthRatio: 0.92 };

export const SHADOW_BLEED = 72;

/** Subtle Z-lift mid-flip — keeps shadow soft, not floating. */
export const COVER_LIFT_Z = 10;
