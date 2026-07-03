/**
 * Mobile clean hero — four-corner collage composition (<768px).
 * Each corner is a scattered cluster of 2–4 cards at ~75% desktop clean scale.
 */

export type HeroMobileCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type HeroMobileCollagePlacement = {
  visible: boolean;
  corner: HeroMobileCorner;
  /** Position within the corner cluster box (px) */
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
  /** Subtle rotation wiggle on top of cluster drift (degrees) */
  wiggle?: number;
};

export type HeroMobileCornerConfig = {
  /** Cluster bounding box */
  width: number;
  height: number;
  /** Independent drift amplitude (px) */
  floatX: number;
  floatY: number;
  floatDuration: number;
  floatDelay: number;
};

export const HERO_MOBILE_EDGE_INSET = 20;

export const heroMobileCopy = {
  name: "Smriti Rawat",
  role: "Product Design",
  taglineLines: [
    '6 years of asking "Why?" until',
    "the product gets better.",
  ] as const,
};

export const heroMobileCornerConfigs: Record<HeroMobileCorner, HeroMobileCornerConfig> = {
  "top-left": {
    width: 158,
    height: 208,
    floatX: 2,
    floatY: 5,
    floatDuration: 5.6,
    floatDelay: 0,
  },
  "top-right": {
    width: 148,
    height: 198,
    floatX: -3,
    floatY: 4,
    floatDuration: 4.9,
    floatDelay: 0.45,
  },
  "bottom-left": {
    width: 152,
    height: 204,
    floatX: 3,
    floatY: -4,
    floatDuration: 5.3,
    floatDelay: 0.9,
  },
  "bottom-right": {
    width: 162,
    height: 216,
    floatX: -2,
    floatY: -5,
    floatDuration: 4.7,
    floatDelay: 0.25,
  },
};

/** ~390 × 844 viewport — offsets are within each corner cluster box. */
export const heroMobileCollageById: Record<string, HeroMobileCollagePlacement> = {
  // —— Top-left island: painting + lamp + small icon ——
  "starry-night": {
    visible: true,
    corner: "top-left",
    offsetX: 0,
    offsetY: 0,
    width: 132,
    height: 114,
    rotation: -5,
    zIndex: 11,
    wiggle: 1.5,
  },
  "desk-lamp": {
    visible: true,
    corner: "top-left",
    offsetX: 18,
    offsetY: 54,
    width: 138,
    height: 174,
    rotation: 6,
    zIndex: 14,
    wiggle: 1,
  },
  "figma-icon": {
    visible: true,
    corner: "top-left",
    offsetX: 88,
    offsetY: 12,
    width: 42,
    height: 42,
    rotation: -4,
    zIndex: 13,
    wiggle: 2,
  },

  // —— Top-right island: book + monitor + cursor ——
  "sprint-book": {
    visible: true,
    corner: "top-right",
    offsetX: 52,
    offsetY: 0,
    width: 96,
    height: 120,
    rotation: -6,
    zIndex: 11,
    wiggle: 1.5,
  },
  "crt-monitor": {
    visible: true,
    corner: "top-right",
    offsetX: 0,
    offsetY: 44,
    width: 92,
    height: 92,
    rotation: 4,
    zIndex: 13,
    wiggle: 1,
  },
  cursor: {
    visible: true,
    corner: "top-right",
    offsetX: 68,
    offsetY: 72,
    width: 38,
    height: 35,
    rotation: -3,
    zIndex: 15,
    wiggle: 2,
  },

  // —— Bottom-left island: plant + vinyl + headphones ——
  plant: {
    visible: true,
    corner: "bottom-left",
    offsetX: 0,
    offsetY: 28,
    width: 122,
    height: 136,
    rotation: 5,
    zIndex: 13,
    wiggle: 1.5,
  },
  "vinyl-record": {
    visible: true,
    corner: "bottom-left",
    offsetX: 48,
    offsetY: 0,
    width: 106,
    height: 100,
    rotation: -4,
    zIndex: 12,
    wiggle: 1,
  },
  headphones: {
    visible: true,
    corner: "bottom-left",
    offsetX: 12,
    offsetY: 98,
    width: 102,
    height: 104,
    rotation: -6,
    zIndex: 14,
    wiggle: 1.5,
  },

  // —— Bottom-right island: coffee + stamps + camera + journal ——
  "coffee-croissant": {
    visible: true,
    corner: "bottom-right",
    offsetX: 58,
    offsetY: 0,
    width: 132,
    height: 72,
    rotation: 3,
    zIndex: 14,
    wiggle: 1,
  },
  stamps: {
    visible: true,
    corner: "bottom-right",
    offsetX: 0,
    offsetY: 36,
    width: 118,
    height: 108,
    rotation: -5,
    zIndex: 12,
    wiggle: 1.5,
  },
  "instax-camera": {
    visible: true,
    corner: "bottom-right",
    offsetX: 78,
    offsetY: 58,
    width: 68,
    height: 72,
    rotation: -6,
    zIndex: 16,
    wiggle: 2,
  },
  journal: {
    visible: true,
    corner: "bottom-right",
    offsetX: 28,
    offsetY: 118,
    width: 64,
    height: 88,
    rotation: 5,
    zIndex: 17,
    wiggle: 1,
  },

  // Hidden on mobile
  "folder-icons": { visible: false, corner: "top-right", offsetX: 0, offsetY: 0, width: 0, height: 0 },
  "claude-icon": { visible: false, corner: "top-right", offsetX: 0, offsetY: 0, width: 0, height: 0 },
  "blue-note": { visible: false, corner: "bottom-left", offsetX: 0, offsetY: 0, width: 0, height: 0 },
  "pink-note": { visible: false, corner: "bottom-left", offsetX: 0, offsetY: 0, width: 0, height: 0 },
  "mouse-arrow": { visible: false, corner: "bottom-right", offsetX: 0, offsetY: 0, width: 0, height: 0 },
};

export const heroMobileCornerOrder: HeroMobileCorner[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

export function heroMobileItemsForCorner(corner: HeroMobileCorner): string[] {
  return Object.entries(heroMobileCollageById)
    .filter(([, placement]) => placement.visible && placement.corner === corner)
    .sort(([, a], [, b]) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
    .map(([id]) => id);
}
