/** Animation & layout constants for the premium journal opening. */
import { journalDimensions } from "@/lib/content/journal";

export const JOURNAL_SPINE_WIDTH = 17;

export const { coverWidth, coverHeight, spreadWidth, spreadHeight } =
  journalDimensions;

export const CLOSED_JOURNAL_WIDTH = coverWidth;

export const BOOK_PERSPECTIVE = 2000;

export const COVER_OPEN_DEG = -175;

export const CAMERA_PUSH_SCALE = 0.96;

/** Subtle zoom when fully open — cleaner reveal transition. */
export const OPEN_ZOOM_SCALE = 1.06;

/** Shared corner radius — matches baked PNG corner curve at display scale (~47px @ 2×). */
export const JOURNAL_BORDER_RADIUS = 24;

export const JOURNAL_PAPER_COLOR = "#F4F0E5";

/** Desaturated shadow tone — blends into cream background. */
export const JOURNAL_SHADOW_RGB = "32, 44, 61";

/** Auto-open delay after mount (ms). */
export const AUTO_OPEN_DELAY_MS = 5000;

/** Closed-state premium idle cycle — slow, coordinated object motion. */
export const IDLE_CYCLE_DURATION_S = 7;
export const IDLE_RESTART_DELAY_MIN_MS = 800;
export const IDLE_RESTART_DELAY_MAX_MS = 1500;
export const IDLE_TILT_DEG_Y = 2;
export const IDLE_TILT_DEG_X = 0.4;
export const IDLE_SETTLE_Y_PX = 5;
export const IDLE_PAGE_LAG_Y_PX = 1.5;
export const IDLE_SHADOW_SHIFT_PX = 3;

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

/** Subtle Z-lift mid-flip — keeps shadow soft, not floating. */
export const COVER_LIFT_Z = 10;

/** Vertical bleed for clip-path so drop-shadows are not cut off. */
export const SHADOW_BLEED = 96;
