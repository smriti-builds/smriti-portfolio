import type { HeroHeadline, HeroRect } from "@/types/hero";

/** Figma node 981:11113 — Clean hero layout (981:11114 artboard, 1440 × 1131). */
export const heroCleanHeadlines: HeroHeadline[] = [
  {
    id: "clean-name",
    text: "Smriti Rawat",
    x: 314,
    y: 289,
    width: 811,
    height: 64,
    variant: "display",
  },
  {
    id: "clean-role",
    text: "Product Design",
    x: 479,
    y: 369,
    width: 481,
    height: 33,
    variant: "mono-subtitle",
  },
  {
    id: "clean-tagline",
    text: '6 years of asking "Why?" until the product gets better.',
    x: 479,
    y: 471,
    width: 481,
    height: 72,
    lineHeight: 36,
    variant: "mono-body",
    lines: [
      { text: '6 years of asking "Why?" until' },
      { text: "the product gets better." },
    ],
  },
];

export type HeroCleanCollageLayout = HeroRect & {
  visible: boolean;
  /** Degrees clockwise — Figma node rotation (981:11114). */
  rotation?: number;
  /** Stacking order for scrapbook-style overlap in clean mode. */
  zIndex?: number;
};

/**
 * Per-item clean layout — px on the 1440 × 1168 artboard.
 * Unrotated frame coords from Figma node 981:11114; rotations applied in CSS.
 */
export const heroCleanCollageById: Record<string, HeroCleanCollageLayout> = {
  // Starry Night — 981:11121
  "starry-night": {
    visible: true,
    x: -68,
    y: 50.9,
    width: 184.285,
    height: 159,
    rotation: -22.67,
    zIndex: 11,
  },
  // Desk lamp — 981:11122, overlaps painting
  "desk-lamp": {
    visible: true,
    x: -125.21,
    y: 186.36,
    width: 234,
    height: 296,
    rotation: 33,
    zIndex: 14,
  },
  // Headphones — 981:11125
  headphones: {
    visible: true,
    x: -103,
    y: 689,
    width: 181.22,
    height: 183.05,
    rotation: -30,
    zIndex: 12,
  },
  // Vinyl record — 981:11123
  "vinyl-record": {
    visible: true,
    x: 96,
    y: 396,
    width: 193,
    height: 183,
    rotation: 0,
    zIndex: 13,
  },
  // Sprint book — 981:11126
  "sprint-book": {
    visible: true,
    x: 1210,
    y: 109,
    width: 134,
    height: 166,
    rotation: -27.49,
    zIndex: 11,
  },
  // CRT monitor — 981:11127
  "crt-monitor": {
    visible: true,
    x: 1320,
    y: 271,
    width: 158,
    height: 159,
    rotation: 0,
    zIndex: 13,
  },
  // Coffee — 981:11135
  "coffee-croissant": {
    visible: true,
    x: 1360,
    y: 454,
    width: 200,
    height: 109,
    rotation: 0,
    zIndex: 15,
  },
  // Folder — 981:11140 (overlaps figma, claude, cursor)
  "folder-icons": {
    visible: true,
    x: 1376,
    y: 96,
    width: 96,
    height: 90,
    rotation: 0,
    zIndex: 16,
  },
  // Figma icon — 981:11137
  "figma-icon": {
    visible: true,
    x: 1399,
    y: 62,
    width: 57,
    height: 57,
    rotation: 0,
    zIndex: 13,
  },
  // Claude icon — 981:11139
  "claude-icon": {
    visible: true,
    x: 1356,
    y: 78,
    width: 61,
    height: 61,
    rotation: 0,
    zIndex: 14,
  },
  // Plant — 981:11124, overlaps record
  plant: {
    visible: true,
    x: -86,
    y: 456,
    width: 211.149,
    height: 235.186,
    rotation: 30,
    zIndex: 16,
  },
  "blue-note": { visible: false, x: 418, y: 761, width: 90, height: 93 },
  "pink-note": { visible: false, x: 472.88, y: 689, width: 90, height: 93 },
  // Stamps cluster — 981:11128
  stamps: {
    visible: true,
    x: 1150,
    y: 396,
    width: 223,
    height: 202.36,
    rotation: 0,
    zIndex: 12,
  },
  // Camera — 981:11133
  "instax-camera": {
    visible: true,
    x: 1356,
    y: 543,
    width: 103,
    height: 109,
    rotation: -45,
    zIndex: 16,
  },
  // Journal — 981:11134
  journal: {
    visible: true,
    x: 1287,
    y: 618,
    width: 104.814,
    height: 142.463,
    rotation: -41.4,
    zIndex: 17,
  },
  "mouse-arrow": { visible: false, x: 1133, y: 840, width: 82, height: 110 },
  cursor: {
    visible: true,
    x: 1424,
    y: 90,
    width: 54,
    height: 49,
    rotation: 0,
    zIndex: 15,
  },
};
