/**
 * Mobile clean hero layout (<768px).
 * Decorative items are arranged in left / right vertical flanks —
 * evenly spaced, partially cropped at the edges, not piled in corners.
 */

export type HeroMobileCollagePlacement = {
  visible: boolean;
  /** Which screen flank this item belongs to */
  flank: "left" | "right";
  left?: number;
  right?: number;
  /** Viewport-relative vertical position */
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

/**
 * Left / right flank placements authored on a ~390 × 844 viewport.
 * ~65% of clean-mode sizes; each item sits on its own vertical band.
 */
export const heroMobileCollageById: Record<string, HeroMobileCollagePlacement> = {
  // —— Left flank (top → bottom) ——
  "starry-night": {
    visible: true,
    flank: "left",
    left: -28,
    top: "5%",
    width: 118,
    height: 102,
    rotation: -22.67,
    zIndex: 11,
    floatDistance: 4,
    floatDuration: 5.2,
  },
  "desk-lamp": {
    visible: true,
    flank: "left",
    left: -48,
    top: "22%",
    width: 128,
    height: 162,
    rotation: 33,
    zIndex: 14,
    floatDistance: 3,
    floatDuration: 4.8,
  },
  "vinyl-record": {
    visible: true,
    flank: "left",
    left: -36,
    top: "40%",
    width: 98,
    height: 93,
    rotation: 0,
    zIndex: 12,
    floatDistance: 4,
    floatDuration: 4.4,
  },
  plant: {
    visible: true,
    flank: "left",
    left: -32,
    top: "57%",
    width: 112,
    height: 125,
    rotation: 30,
    zIndex: 13,
    floatDistance: 4,
    floatDuration: 5.4,
  },
  headphones: {
    visible: true,
    flank: "left",
    left: -38,
    top: "76%",
    width: 100,
    height: 102,
    rotation: -30,
    zIndex: 12,
    floatDistance: 3,
    floatDuration: 4.7,
  },

  // —— Right flank (top → bottom) ——
  "sprint-book": {
    visible: true,
    flank: "right",
    right: -22,
    top: "6%",
    width: 82,
    height: 102,
    rotation: -27.49,
    zIndex: 11,
    floatDistance: 4,
    floatDuration: 5,
  },
  "crt-monitor": {
    visible: true,
    flank: "right",
    right: -26,
    top: "24%",
    width: 92,
    height: 92,
    rotation: 0,
    zIndex: 13,
    floatDistance: 3,
    floatDuration: 4.6,
  },
  "coffee-croissant": {
    visible: true,
    flank: "right",
    right: -30,
    top: "42%",
    width: 108,
    height: 59,
    rotation: 0,
    zIndex: 14,
    floatDistance: 3,
    floatDuration: 4.3,
  },
  stamps: {
    visible: true,
    flank: "right",
    right: -24,
    top: "58%",
    width: 118,
    height: 108,
    rotation: 0,
    zIndex: 12,
    floatDistance: 4,
    floatDuration: 4.9,
  },
  "instax-camera": {
    visible: true,
    flank: "right",
    right: -12,
    top: "74%",
    width: 60,
    height: 64,
    rotation: -45,
    zIndex: 15,
    floatDistance: 3,
    floatDuration: 4.1,
  },
  journal: {
    visible: true,
    flank: "right",
    right: -26,
    top: "82%",
    width: 58,
    height: 79,
    rotation: -41.4,
    zIndex: 16,
    floatDistance: 3,
    floatDuration: 5.1,
  },

  // Hidden on mobile — too small / clutter the flanks
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
  "vinyl-record",
  "plant",
  "headphones",
] as const;

export const heroMobileRightFlankIds = [
  "sprint-book",
  "crt-monitor",
  "coffee-croissant",
  "stamps",
  "instax-camera",
  "journal",
] as const;
