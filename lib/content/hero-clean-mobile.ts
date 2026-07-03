/**
 * Mobile clean hero layout (<768px).
 * Four decorative items per flank, spaced on ~22% vertical bands
 * so tall objects (lamp, plant) don't overlap neighbours.
 */

export type HeroMobileCollagePlacement = {
  visible: boolean;
  flank: "left" | "right";
  left?: number;
  right?: number;
  top: number | string;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
  floatDistance?: number;
  floatDuration?: number;
};

export const heroMobileCopy = {
  name: "Smriti Rawat",
  role: "Product Design",
  taglineLines: [
    '6 years of asking "Why?" until',
    "the product gets better.",
  ] as const,
};

/** ~390 × 844 reference viewport — four items per side, ~22% apart. */
export const heroMobileCollageById: Record<string, HeroMobileCollagePlacement> = {
  // —— Left flank ——
  "starry-night": {
    visible: true,
    flank: "left",
    left: -18,
    top: "2%",
    width: 108,
    height: 93,
    rotation: -22.67,
    zIndex: 11,
    floatDistance: 4,
    floatDuration: 5.2,
  },
  "desk-lamp": {
    visible: true,
    flank: "left",
    left: -42,
    top: "24%",
    width: 112,
    height: 142,
    rotation: 33,
    zIndex: 14,
    floatDistance: 3,
    floatDuration: 4.8,
  },
  plant: {
    visible: true,
    flank: "left",
    left: -24,
    top: "48%",
    width: 100,
    height: 112,
    rotation: 30,
    zIndex: 13,
    floatDistance: 4,
    floatDuration: 5.4,
  },
  headphones: {
    visible: true,
    flank: "left",
    left: -30,
    top: "72%",
    width: 92,
    height: 94,
    rotation: -30,
    zIndex: 12,
    floatDistance: 3,
    floatDuration: 4.7,
  },

  // —— Right flank ——
  "sprint-book": {
    visible: true,
    flank: "right",
    right: -16,
    top: "3%",
    width: 76,
    height: 94,
    rotation: -27.49,
    zIndex: 11,
    floatDistance: 4,
    floatDuration: 5,
  },
  "crt-monitor": {
    visible: true,
    flank: "right",
    right: -22,
    top: "25%",
    width: 84,
    height: 84,
    rotation: 0,
    zIndex: 13,
    floatDistance: 3,
    floatDuration: 4.6,
  },
  "coffee-croissant": {
    visible: true,
    flank: "right",
    right: -26,
    top: "49%",
    width: 96,
    height: 52,
    rotation: 0,
    zIndex: 14,
    floatDistance: 3,
    floatDuration: 4.3,
  },
  stamps: {
    visible: true,
    flank: "right",
    right: -20,
    top: "73%",
    width: 104,
    height: 95,
    rotation: 0,
    zIndex: 12,
    floatDistance: 4,
    floatDuration: 4.9,
  },

  // Hidden — keeps flanks airy
  "vinyl-record": { visible: false, flank: "left", top: 0, width: 0, height: 0 },
  "instax-camera": { visible: false, flank: "right", top: 0, width: 0, height: 0 },
  journal: { visible: false, flank: "right", top: 0, width: 0, height: 0 },
  "folder-icons": { visible: false, flank: "right", top: 0, width: 0, height: 0 },
  "figma-icon": { visible: false, flank: "right", top: 0, width: 0, height: 0 },
  "claude-icon": { visible: false, flank: "right", top: 0, width: 0, height: 0 },
  cursor: { visible: false, flank: "right", top: 0, width: 0, height: 0 },
  "blue-note": { visible: false, flank: "left", top: 0, width: 0, height: 0 },
  "pink-note": { visible: false, flank: "left", top: 0, width: 0, height: 0 },
  "mouse-arrow": { visible: false, flank: "right", top: 0, width: 0, height: 0 },
};

export const heroMobileLeftFlankIds = [
  "starry-night",
  "desk-lamp",
  "plant",
  "headphones",
] as const;

export const heroMobileRightFlankIds = [
  "sprint-book",
  "crt-monitor",
  "coffee-croissant",
  "stamps",
] as const;
