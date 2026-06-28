/** Figma 1084:15781 — closed journal card */
export const journalClosedImage = {
  src: "/Journal/journal-closed.png",
  /** Tight crop of white journal card — display at 1× */
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
} as const;

/** Figma 1084:16914 — open section copy */
export const journalContent = {
  kicker: "JOURNAL",
  kickerAccent: "VISUAL JOURNALING",
  intro:
    "I make sense of the world through visuals & stories.",
  headline: "Write, you'll be a much better designer",
  body: "Notes, sketches, and reflections from ongoing design work — the messy middle between idea and ship.",
} as const;

export const journalClosedLabels = [
  { label: "JOURNAL", icon: "grid" as const },
  { label: "ABOUT ME", icon: "user" as const },
  { label: "2024", icon: "calendar" as const },
] as const;
