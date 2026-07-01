/** Cover & spread dimensions (display px). */
export const journalDimensions = {
  coverWidth: 494,
  coverHeight: 629,
  spreadWidth: 988,
  spreadHeight: 629,
} as const;

export const journalCover = {
  src: "/Journal/Cover.png",
  ...journalDimensions,
  width: journalDimensions.coverWidth,
  height: journalDimensions.coverHeight,
  intrinsicWidth: 988,
  intrinsicHeight: 1258,
} as const;

export const journalBackCover = {
  src: "/Journal/Back cover.png",
  width: journalDimensions.coverWidth,
  height: journalDimensions.coverHeight,
  intrinsicWidth: 986,
  intrinsicHeight: 1256,
} as const;

/** Sage ribbon — split top tab + bottom swallowtail SVGs with spine strip between. */
export const journalBookmark = {
  top: {
    src: "/Journal/Bookmark top.svg",
    intrinsicWidth: 40,
    intrinsicHeight: 20,
  },
  bottom: {
    src: "/Journal/Bookmark bottom.svg",
    intrinsicWidth: 40,
    intrinsicHeight: 72,
  },
  width: 40,
  /** Visible ribbon tab above the journal top edge. */
  topPeek: 28,
  /** Visible ribbon tail (with swallowtail notch) below the journal bottom edge. */
  bottomHang: 112,
  /** Matches Figma SVG fill gradient between top and bottom pieces. */
  bodyGradient: "linear-gradient(180deg, #80B289 0%, #6A9672 100%)",
  /** Horizontal center on closed cover — spine-adjacent (px from spread left). */
  closedCenterX: 24,
} as const;

export const journalBookmarkDisplay = {
  openCenterX: journalDimensions.spreadWidth / 2,
} as const;

export const journalSpine = {
  src: "/Journal/spine.png",
  width: 17,
  height: journalDimensions.spreadHeight,
  intrinsicWidth: 36,
  intrinsicHeight: 1256,
} as const;

export const journalOpenSpread = {
  src: "/Journal/open-spread.png",
  width: journalDimensions.spreadWidth,
  height: journalDimensions.spreadHeight,
  intrinsicWidth: 1975,
  intrinsicHeight: 1258,
  figmaNode: "1084:16914",
  figmaUrl:
    "https://www.figma.com/design/IThTX6X20ZgpnFnbnNuj2H/Untitled?node-id=1084-16914",
} as const;

/** @deprecated Use journalOpenSpread */
export const journalOpenSpreadImage = journalOpenSpread;

/** @deprecated Use journalCover */
export const journalClosedImage = {
  src: journalCover.src,
  width: journalCover.width,
  height: journalCover.height,
  intrinsicWidth: journalCover.intrinsicWidth,
  intrinsicHeight: journalCover.intrinsicHeight,
} as const;

/** Figma 1084:15781 — closed journal section (full frame) */
export const journalClosedSection = {
  src: "/Journal/journal-closed-section.png",
  width: 1440,
  height: 820,
  intrinsicWidth: 2880,
  intrinsicHeight: 1640,
  figmaNode: "1084:15781",
  figmaUrl:
    "https://www.figma.com/design/IThTX6X20ZgpnFnbnNuj2H/Untitled?node-id=1084-15781",
} as const;

export const journalSectionFrame = {
  background: "#F4F0E5",
  tornEdgeTop: "/Journal/Paper-torn-border.png",
  tornEdgeBottom: "/Journal/Paper-torn-border.png",
} as const;

/**
 * Figma 1084:15781 — closed journal contact shadow (soft, bottom-right bias).
 */
export const journalClosedDropShadow =
  "drop-shadow(1px 2px 4px rgba(32, 44, 61, 0.05)) drop-shadow(3px 8px 18px rgba(32, 44, 61, 0.06)) drop-shadow(6px 16px 36px rgba(32, 44, 61, 0.05))";

/**
 * Figma 1084:16914 — open spread elevation (wide diffuse halo, heavier below).
 */
export const journalSpreadDropShadow =
  "drop-shadow(0 2px 6px rgba(32, 44, 61, 0.04)) drop-shadow(0 12px 28px rgba(32, 44, 61, 0.07)) drop-shadow(0 28px 56px rgba(32, 44, 61, 0.09)) drop-shadow(0 48px 96px rgba(32, 44, 61, 0.05))";

/** Inside cover / back board leather tone. */
export const journalCoverInsideColor = "#1a4d38";

/** Figma 1084:16914 — open section copy */
export const journalContent = {
  kicker: "JOURNAL",
  kickerAccent: "VISUAL JOURNALING",
  intro: "I make sense of the world through visuals & stories.",
  headline: "Write, you'll be a much better designer",
  body: "Notes, sketches, and reflections from ongoing design work — the messy middle between idea and ship.",
} as const;
