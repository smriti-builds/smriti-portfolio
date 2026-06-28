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

/** Figma 1084:16914 — open journal spread */
export const journalOpenSpreadImage = {
  src: "/Journal/journal-open-spread.png",
  width: 493,
  height: 628,
  intrinsicWidth: 986,
  intrinsicHeight: 1256,
  figmaNode: "1084:16914",
  figmaUrl:
    "https://www.figma.com/design/IThTX6X20ZgpnFnbnNuj2H/Untitled?node-id=1084-16914",
} as const;

export const journalSectionFrame = {
  background: "#d9d9d9",
  tornEdgeTop: "/Journal/torn-edge-top.svg",
  tornEdgeBottom: "/Journal/torn-edge-bottom.svg",
} as const;

/** Figma 1084:16914 — open section copy */
export const journalContent = {
  kicker: "JOURNAL",
  kickerAccent: "VISUAL JOURNALING",
  intro: "I make sense of the world through visuals & stories.",
  headline: "Write, you'll be a much better designer",
  body: "Notes, sketches, and reflections from ongoing design work — the messy middle between idea and ship.",
} as const;
