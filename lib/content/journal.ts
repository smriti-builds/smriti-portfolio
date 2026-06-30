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

export const journalBookmark = {
  src: "/Journal/Bookmark.png",
  width: 22,
  height: 680,
  intrinsicWidth: 64,
  intrinsicHeight: 1408,
} as const;

/** @deprecated */
export const journalBookAssets = {
  cover: journalCover,
  bookmark: journalBookmark,
} as const;

export const journalOpenSpread = {
  src: "/Journal/open-spread.png",
  width: journalDimensions.spreadWidth,
  height: journalDimensions.spreadHeight,
  intrinsicWidth: 1975,
  intrinsicHeight: 1258,
} as const;

export const journalOpenWidth = journalDimensions.spreadWidth;
export const journalOpenHeight = journalDimensions.spreadHeight;

/** @deprecated Use journalOpenSpread */
export const journalOpenSpreadImage = {
  ...journalOpenSpread,
  figmaNode: "1084:16914",
  figmaUrl:
    "https://www.figma.com/design/IThTX6X20ZgpnFnbnNuj2H/Untitled?node-id=1084-16914",
} as const;

/** @deprecated */
export const journalClosedImage = {
  src: journalCover.src,
  width: journalCover.width,
  height: journalCover.height,
  intrinsicWidth: journalCover.intrinsicWidth,
  intrinsicHeight: journalCover.intrinsicHeight,
} as const;

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

export const journalSpreadDropShadow =
  "drop-shadow(0 2px 6px rgba(32, 44, 61, 0.04)) drop-shadow(0 12px 28px rgba(32, 44, 61, 0.07)) drop-shadow(0 28px 56px rgba(32, 44, 61, 0.09))";

/** Inside cover / back board leather tone. */
export const journalCoverInsideColor = "#1a4d38";

export const journalContent = {
  kicker: "JOURNAL",
  kickerAccent: "VISUAL JOURNALING",
  intro: "I make sense of the world through visuals & stories.",
  headline: "Write, you'll be a much better designer",
  body: "Notes, sketches, and reflections from ongoing design work — the messy middle between idea and ship.",
} as const;
