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

/** Figma 1084:15781 — journal cover within closed section */
export const journalClosedImage = {
  src: "/Journal/journal-cover.png",
  width: 280,
  height: 380,
  intrinsicWidth: 560,
  intrinsicHeight: 760,
} as const;

/** Figma 1084:16914 — open journal spread (two pages, same height as closed cover) */
export const journalOpenSpreadImage = {
  src: "/Journal/journal-open-spread.png",
  /** Display size in the journal flip (closed cover width × 2). */
  width: 988,
  height: 704,
  /** Expected 2× export from Figma node 1084:16914. */
  intrinsicWidth: 1976,
  intrinsicHeight: 1408,
  figmaNode: "1084:16914",
  figmaUrl:
    "https://www.figma.com/design/IThTX6X20ZgpnFnbnNuj2H/Untitled?node-id=1084-16914",
} as const;

export const journalSectionFrame = {
  background: "#F4F0E5",
  tornEdgeTop: "/Journal/Paper-torn-border.png",
  tornEdgeBottom: "/Journal/Paper-torn-border.png",
} as const;

/** Soft elevation shadow for the open journal spread (Figma 1084:16914). */
export const journalSpreadDropShadow =
  "drop-shadow(0 2px 6px rgba(32, 44, 61, 0.04)) drop-shadow(0 12px 28px rgba(32, 44, 61, 0.07)) drop-shadow(0 28px 56px rgba(32, 44, 61, 0.09)) drop-shadow(0 48px 96px rgba(32, 44, 61, 0.05))";

/** Figma 1084:16914 — open section copy */
export const journalContent = {
  kicker: "JOURNAL",
  kickerAccent: "VISUAL JOURNALING",
  intro: "I make sense of the world through visuals & stories.",
  headline: "Write, you'll be a much better designer",
  body: "Notes, sketches, and reflections from ongoing design work — the messy middle between idea and ship.",
} as const;
