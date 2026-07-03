/**
 * Mobile clean hero layout (<768px).
 * Positions are viewport px — corner accents that crop off screen edges.
 * Decorative sizes are ~72% of desktop clean mode; rotations match hero-clean.ts.
 */

/** Scale factor applied to clean-mode decorative dimensions on mobile. */
export const HERO_MOBILE_COLLAGE_SCALE = 0.72;

export type HeroMobileCollagePlacement = {
  visible: boolean;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
  /** Subtle idle float amplitude in px */
  floatDistance?: number;
  /** Idle float cycle duration in seconds */
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
 * Corner-accent collage placements for mobile clean hero.
 * Authored on a ~390px-wide reference; positions use viewport edges.
 */
export const heroMobileCollageById: Record<string, HeroMobileCollagePlacement> = {
  // Top-left cluster
  "starry-night": {
    visible: true,
    left: -50,
    top: 28,
    width: 133,
    height: 114,
    rotation: -22.67,
    zIndex: 11,
    floatDistance: 5,
    floatDuration: 5.2,
  },
  "desk-lamp": {
    visible: true,
    left: -78,
    top: 96,
    width: 168,
    height: 213,
    rotation: 33,
    zIndex: 14,
    floatDistance: 4,
    floatDuration: 4.8,
  },
  // Top-right cluster
  "folder-icons": {
    visible: true,
    right: -16,
    top: 24,
    width: 69,
    height: 65,
    rotation: 0,
    zIndex: 16,
    floatDistance: 3,
    floatDuration: 4.5,
  },
  "figma-icon": {
    visible: true,
    right: 20,
    top: 10,
    width: 41,
    height: 41,
    rotation: 0,
    zIndex: 13,
    floatDistance: 2,
    floatDuration: 3.8,
  },
  "claude-icon": {
    visible: true,
    right: 58,
    top: 20,
    width: 44,
    height: 44,
    rotation: 0,
    zIndex: 14,
    floatDistance: 3,
    floatDuration: 4.2,
  },
  cursor: {
    visible: true,
    right: 6,
    top: 48,
    width: 39,
    height: 35,
    rotation: 0,
    zIndex: 15,
    floatDistance: 2,
    floatDuration: 3.5,
  },
  "sprint-book": {
    visible: true,
    right: -34,
    top: 68,
    width: 96,
    height: 119,
    rotation: -27.49,
    zIndex: 11,
    floatDistance: 5,
    floatDuration: 5,
  },
  "crt-monitor": {
    visible: true,
    right: -28,
    top: 140,
    width: 114,
    height: 114,
    rotation: 0,
    zIndex: 13,
    floatDistance: 4,
    floatDuration: 4.6,
  },
  // Bottom-left accent (above plant)
  "vinyl-record": {
    visible: true,
    left: -48,
    bottom: 220,
    width: 139,
    height: 132,
    rotation: 0,
    zIndex: 12,
    floatDistance: 4,
    floatDuration: 4.4,
  },
  // Bottom-left cluster
  plant: {
    visible: true,
    left: -48,
    bottom: 132,
    width: 152,
    height: 169,
    rotation: 30,
    zIndex: 16,
    floatDistance: 5,
    floatDuration: 5.4,
  },
  headphones: {
    visible: true,
    left: -58,
    bottom: 64,
    width: 130,
    height: 132,
    rotation: -30,
    zIndex: 12,
    floatDistance: 4,
    floatDuration: 4.7,
  },
  // Bottom-right cluster
  "coffee-croissant": {
    visible: true,
    right: -44,
    bottom: 156,
    width: 144,
    height: 78,
    rotation: 0,
    zIndex: 15,
    floatDistance: 3,
    floatDuration: 4.3,
  },
  stamps: {
    visible: true,
    right: -38,
    bottom: 84,
    width: 160,
    height: 146,
    rotation: 0,
    zIndex: 12,
    floatDistance: 4,
    floatDuration: 4.9,
  },
  "instax-camera": {
    visible: true,
    right: -18,
    bottom: 44,
    width: 74,
    height: 78,
    rotation: -45,
    zIndex: 16,
    floatDistance: 3,
    floatDuration: 4.1,
  },
  journal: {
    visible: true,
    right: -24,
    bottom: 4,
    width: 75,
    height: 102,
    rotation: -41.4,
    zIndex: 17,
    floatDistance: 4,
    floatDuration: 5.1,
  },
  "blue-note": { visible: false, left: 0, top: 0, width: 0, height: 0 },
  "pink-note": { visible: false, left: 0, top: 0, width: 0, height: 0 },
  "mouse-arrow": { visible: false, left: 0, top: 0, width: 0, height: 0 },
};
