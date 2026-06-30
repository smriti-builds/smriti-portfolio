/** Animation & layout constants for the journal. */
import { journalDimensions } from "@/lib/content/journal";

export const JOURNAL_SPINE_WIDTH = 17;

export const { coverWidth, coverHeight, spreadWidth, spreadHeight } =
  journalDimensions;

export const BOOK_PERSPECTIVE = 1800;
export const COVER_OPEN_DEG = -179.5;

export const OPEN_DELAY_MS = 700;
export const OPEN_DURATION = 1.1;
export const OPEN_EASE = [0.22, 0.61, 0.36, 1] as [number, number, number, number];

export const OPEN_TRANSITION = {
  duration: OPEN_DURATION,
  ease: OPEN_EASE,
};

/** Closed journal footprint: one cover width. Left edge anchors the spread. */
export const CLOSED_JOURNAL_WIDTH = coverWidth;
