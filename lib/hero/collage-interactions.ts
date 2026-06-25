export type CollageInteractionId =
  | "desk-lamp"
  | "vinyl-record"
  | "plant"
  | "coffee-croissant"
  | "sprint-book"
  | "headphones"
  | "instax-camera"
  | "stamps"
  | "journal"
  | "crt-monitor";

export type CollageInteractionKind = "toggle" | "tap" | "spin";

export type CollageInteractionConfig = {
  kind: CollageInteractionKind;
  label: string;
  hint: string;
};

export const COLLAGE_INTERACTIONS: Partial<
  Record<CollageInteractionId, CollageInteractionConfig>
> = {
  "desk-lamp": {
    kind: "toggle",
    label: "Toggle desk lamp",
    hint: "Click to turn the lamp on",
  },
  "vinyl-record": {
    kind: "spin",
    label: "Spin vinyl record",
    hint: "Click to play a record",
  },
  plant: {
    kind: "tap",
    label: "Nudge plant",
    hint: "Click to say hello",
  },
  "coffee-croissant": {
    kind: "tap",
    label: "Sip coffee",
    hint: "Click for a warm sip",
  },
  "sprint-book": {
    kind: "tap",
    label: "Flip Sprint book",
    hint: "Click for a design sprint",
  },
  headphones: {
    kind: "tap",
    label: "Put on headphones",
    hint: "Click to listen in",
  },
  "instax-camera": {
    kind: "tap",
    label: "Take a photo",
    hint: "Click to snap a photo",
  },
  stamps: {
    kind: "tap",
    label: "Peel a stamp",
    hint: "Click to send post",
  },
  journal: {
    kind: "tap",
    label: "Open journal",
    hint: "Click to jot a note",
  },
  "crt-monitor": {
    kind: "toggle",
    label: "Toggle monitor",
    hint: "Click to power on",
  },
};

export function isCollageInteractive(id: string): id is CollageInteractionId {
  return id in COLLAGE_INTERACTIONS;
}
