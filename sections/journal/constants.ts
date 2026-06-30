import { journalOpenSpreadImage } from "@/lib/content/journal";

export const JOURNAL_COVER_SRC = "/Journal/journal-cover.png";

export const JOURNAL_OPEN_WIDTH = journalOpenSpreadImage.width;
export const JOURNAL_OPEN_HEIGHT = journalOpenSpreadImage.height;
export const JOURNAL_COVER_WIDTH = JOURNAL_OPEN_WIDTH / 2;
export const JOURNAL_COVER_HEIGHT = JOURNAL_OPEN_HEIGHT;

export const BOOK_PERSPECTIVE = 1800;
export const SPINE_WIDTH = 12;
export const PAGE_DEPTH = 10;
export const COVER_ROTATE_OPEN = -175;

export const OPEN_EASE = [0.22, 0.61, 0.36, 1] as [number, number, number, number];
export const OPEN_DURATION = 1.1;
export const CONTENT_FADE_DELAY_MS = 250;
export const CONTENT_FADE_DURATION = 0.45;
export const CONTENT_FADE_OUT_DURATION = 0.28;

export const OPEN_TRANSITION = {
  duration: OPEN_DURATION,
  ease: OPEN_EASE,
};

export const LEATHER_GREEN = "#1B5E44";
export const LEATHER_GREEN_DARK = "#123d2d";
export const LEATHER_GREEN_LIGHT = "#2a7a5c";
export const PAGE_DOT_COLOR = "#d8d6d0";
export const BOOKMARK_RED = "#b83a3a";
