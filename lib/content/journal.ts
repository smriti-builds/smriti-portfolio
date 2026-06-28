/** Figma 1084:15781 — closed journal */
export const journalClosedImage = {
  src: "/Journal/journal-closed.png",
  /** Display size at 1× — Figma artboard */
  width: 494,
  height: 629,
  /** 2× export for retina */
  intrinsicWidth: 988,
  intrinsicHeight: 1258,
} as const;

/** Figma 1084:16914 — open journal spread (right column). Export 2× PNG with transparency. */
export const journalOpenSpreadImage = {
  src: "/Journal/journal-open-spread.png",
  width: 493,
  height: 628,
  intrinsicWidth: 986,
  intrinsicHeight: 1256,
} as const;

/** Figma 1084:16914 — open section copy */
export const journalContent = {
  headline: "Write, you'll be a much better designer",
  body: "Notes, sketches, and reflections from ongoing design work — the messy middle between idea and ship.",
} as const;
