/**
 * Mobile clean hero — four-corner collage per tier (<768px).
 * wide: 480–767px | medium: 390–479px | narrow: <390px
 */

import type { HeroMobileTier } from "@/lib/hero/mobile-tier";

export type HeroMobileCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type HeroMobileCollagePlacement = {
  visible: boolean;
  corner: HeroMobileCorner;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
  wiggle?: number;
};

export type HeroMobileCornerConfig = {
  width: number;
  height: number;
  floatX: number;
  floatY: number;
  floatDuration: number;
  floatDelay: number;
  /** Pull cluster toward the viewport corner (px) */
  edgePullX?: number;
  edgePullY?: number;
};

export type HeroMobileTierLayout = {
  edgeInset: number;
  contentMaxWidth: string;
  nameClass: string;
  roleClass: string;
  taglineClass: string;
  corners: Record<HeroMobileCorner, HeroMobileCornerConfig>;
  items: Record<string, HeroMobileCollagePlacement>;
};

export const heroMobileCopy = {
  name: "Smriti Rawat",
  role: "Product Design",
  taglineLines: [
    '6 years of asking "Why?" until',
    "the product gets better.",
  ] as const,
};

export const heroMobileCornerOrder: HeroMobileCorner[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const hidden = (
  corner: HeroMobileCorner,
): HeroMobileCollagePlacement => ({
  visible: false,
  corner,
  offsetX: 0,
  offsetY: 0,
  width: 0,
  height: 0,
});

/** Wide mobile — full clusters, generous padding (reference: leftmost frame). */
const wideLayout: HeroMobileTierLayout = {
  edgeInset: 24,
  contentMaxWidth: "min(300px, 68vw)",
  nameClass: "text-[40px] leading-[48px] tracking-[2px]",
  roleClass: "text-[18px] leading-[24px]",
  taglineClass: "text-[16px] leading-[26px]",
  corners: {
    "top-left": {
      width: 182,
      height: 258,
      floatX: 2,
      floatY: 5,
      floatDuration: 5.6,
      floatDelay: 0,
    },
    "top-right": {
      width: 170,
      height: 232,
      floatX: -3,
      floatY: 4,
      floatDuration: 4.9,
      floatDelay: 0.45,
    },
    "bottom-left": {
      width: 148,
      height: 178,
      floatX: 3,
      floatY: -4,
      floatDuration: 5.3,
      floatDelay: 0.9,
    },
    "bottom-right": {
      width: 162,
      height: 214,
      floatX: -2,
      floatY: -5,
      floatDuration: 4.7,
      floatDelay: 0.25,
    },
  },
  items: {
    "starry-night": {
      visible: true,
      corner: "top-left",
      offsetX: 0,
      offsetY: 0,
      width: 142,
      height: 122,
      rotation: -5,
      zIndex: 11,
      wiggle: 1.5,
    },
    "desk-lamp": {
      visible: true,
      corner: "top-left",
      offsetX: 18,
      offsetY: 66,
      width: 150,
      height: 190,
      rotation: 6,
      zIndex: 14,
      wiggle: 1,
    },
    "vinyl-record": {
      visible: true,
      corner: "top-left",
      offsetX: 98,
      offsetY: 2,
      width: 120,
      height: 114,
      rotation: -4,
      zIndex: 12,
      wiggle: 1,
    },
    "sprint-book": {
      visible: true,
      corner: "top-right",
      offsetX: 56,
      offsetY: 0,
      width: 104,
      height: 128,
      rotation: -6,
      zIndex: 11,
      wiggle: 1.5,
    },
    "figma-icon": {
      visible: true,
      corner: "top-right",
      offsetX: 6,
      offsetY: 20,
      width: 46,
      height: 46,
      rotation: -3,
      zIndex: 13,
      wiggle: 2,
    },
    "folder-icons": {
      visible: true,
      corner: "top-right",
      offsetX: 50,
      offsetY: 36,
      width: 72,
      height: 68,
      rotation: 4,
      zIndex: 15,
      wiggle: 1,
    },
    "coffee-croissant": {
      visible: true,
      corner: "top-right",
      offsetX: 0,
      offsetY: 76,
      width: 140,
      height: 76,
      rotation: 3,
      zIndex: 14,
      wiggle: 1,
    },
    plant: {
      visible: true,
      corner: "bottom-left",
      offsetX: 0,
      offsetY: 22,
      width: 130,
      height: 145,
      rotation: 5,
      zIndex: 13,
      wiggle: 1.5,
    },
    headphones: {
      visible: true,
      corner: "bottom-left",
      offsetX: 22,
      offsetY: 0,
      width: 110,
      height: 112,
      rotation: -6,
      zIndex: 12,
      wiggle: 1.5,
    },
    "instax-camera": {
      visible: true,
      corner: "bottom-right",
      offsetX: 76,
      offsetY: 0,
      width: 74,
      height: 78,
      rotation: -6,
      zIndex: 16,
      wiggle: 2,
    },
    stamps: {
      visible: true,
      corner: "bottom-right",
      offsetX: 0,
      offsetY: 30,
      width: 125,
      height: 115,
      rotation: -5,
      zIndex: 12,
      wiggle: 1.5,
    },
    journal: {
      visible: true,
      corner: "bottom-right",
      offsetX: 40,
      offsetY: 110,
      width: 68,
      height: 92,
      rotation: 5,
      zIndex: 17,
      wiggle: 1,
    },
    "crt-monitor": hidden("top-right"),
    cursor: hidden("top-right"),
    "claude-icon": hidden("top-right"),
    "blue-note": hidden("bottom-left"),
    "pink-note": hidden("bottom-left"),
    "mouse-arrow": hidden("bottom-right"),
  },
};

/** Medium mobile — clusters shift toward edges, light crop (reference: center frame). */
const mediumLayout: HeroMobileTierLayout = {
  edgeInset: 20,
  contentMaxWidth: "min(280px, 72vw)",
  nameClass: "text-[38px] leading-[46px] tracking-[1.8px]",
  roleClass: "text-[17px] leading-[23px]",
  taglineClass: "text-[15px] leading-[25px]",
  corners: {
    "top-left": {
      width: 168,
      height: 238,
      floatX: 2,
      floatY: 4,
      floatDuration: 5.4,
      floatDelay: 0,
      edgePullX: -10,
      edgePullY: -6,
    },
    "top-right": {
      width: 158,
      height: 216,
      floatX: -3,
      floatY: 3,
      floatDuration: 4.8,
      floatDelay: 0.4,
      edgePullX: 10,
      edgePullY: -6,
    },
    "bottom-left": {
      width: 136,
      height: 166,
      floatX: 2,
      floatY: -3,
      floatDuration: 5.1,
      floatDelay: 0.85,
      edgePullX: -10,
      edgePullY: 6,
    },
    "bottom-right": {
      width: 150,
      height: 198,
      floatX: -2,
      floatY: -4,
      floatDuration: 4.6,
      floatDelay: 0.2,
      edgePullX: 10,
      edgePullY: 6,
    },
  },
  items: {
    "starry-night": {
      visible: true,
      corner: "top-left",
      offsetX: -4,
      offsetY: 0,
      width: 128,
      height: 110,
      rotation: -5,
      zIndex: 11,
      wiggle: 1.5,
    },
    "desk-lamp": {
      visible: true,
      corner: "top-left",
      offsetX: 12,
      offsetY: 58,
      width: 136,
      height: 172,
      rotation: 6,
      zIndex: 14,
      wiggle: 1,
    },
    "vinyl-record": {
      visible: true,
      corner: "top-left",
      offsetX: 86,
      offsetY: 0,
      width: 108,
      height: 102,
      rotation: -4,
      zIndex: 12,
      wiggle: 1,
    },
    "sprint-book": {
      visible: true,
      corner: "top-right",
      offsetX: 48,
      offsetY: 0,
      width: 94,
      height: 116,
      rotation: -6,
      zIndex: 11,
      wiggle: 1.5,
    },
    "figma-icon": {
      visible: true,
      corner: "top-right",
      offsetX: 0,
      offsetY: 16,
      width: 42,
      height: 42,
      rotation: -3,
      zIndex: 13,
      wiggle: 2,
    },
    "folder-icons": {
      visible: true,
      corner: "top-right",
      offsetX: 42,
      offsetY: 30,
      width: 66,
      height: 62,
      rotation: 4,
      zIndex: 15,
      wiggle: 1,
    },
    "coffee-croissant": {
      visible: true,
      corner: "top-right",
      offsetX: -6,
      offsetY: 68,
      width: 128,
      height: 70,
      rotation: 3,
      zIndex: 14,
      wiggle: 1,
    },
    plant: {
      visible: true,
      corner: "bottom-left",
      offsetX: -4,
      offsetY: 18,
      width: 118,
      height: 132,
      rotation: 5,
      zIndex: 13,
      wiggle: 1.5,
    },
    headphones: {
      visible: true,
      corner: "bottom-left",
      offsetX: 14,
      offsetY: 0,
      width: 100,
      height: 102,
      rotation: -6,
      zIndex: 12,
      wiggle: 1.5,
    },
    "instax-camera": {
      visible: true,
      corner: "bottom-right",
      offsetX: 68,
      offsetY: 0,
      width: 68,
      height: 72,
      rotation: -6,
      zIndex: 16,
      wiggle: 2,
    },
    stamps: {
      visible: true,
      corner: "bottom-right",
      offsetX: -4,
      offsetY: 26,
      width: 114,
      height: 104,
      rotation: -5,
      zIndex: 12,
      wiggle: 1.5,
    },
    journal: {
      visible: true,
      corner: "bottom-right",
      offsetX: 32,
      offsetY: 98,
      width: 62,
      height: 84,
      rotation: 5,
      zIndex: 17,
      wiggle: 1,
    },
    "crt-monitor": hidden("top-right"),
    cursor: hidden("top-right"),
    "claude-icon": hidden("top-right"),
    "blue-note": hidden("bottom-left"),
    "pink-note": hidden("bottom-left"),
    "mouse-arrow": hidden("bottom-right"),
  },
};

/** Narrow mobile — scaled down, intentional edge crop (reference: rightmost frame). */
const narrowLayout: HeroMobileTierLayout = {
  edgeInset: 16,
  contentMaxWidth: "min(260px, 76vw)",
  nameClass: "text-[36px] leading-[44px] tracking-[1.6px]",
  roleClass: "text-[16px] leading-[22px]",
  taglineClass: "text-[15px] leading-[24px]",
  corners: {
    "top-left": {
      width: 148,
      height: 210,
      floatX: 2,
      floatY: 3,
      floatDuration: 5.2,
      floatDelay: 0,
      edgePullX: -18,
      edgePullY: -10,
    },
    "top-right": {
      width: 140,
      height: 192,
      floatX: -2,
      floatY: 3,
      floatDuration: 4.6,
      floatDelay: 0.35,
      edgePullX: 18,
      edgePullY: -10,
    },
    "bottom-left": {
      width: 122,
      height: 148,
      floatX: 2,
      floatY: -2,
      floatDuration: 4.9,
      floatDelay: 0.75,
      edgePullX: -18,
      edgePullY: 10,
    },
    "bottom-right": {
      width: 134,
      height: 176,
      floatX: -2,
      floatY: -3,
      floatDuration: 4.4,
      floatDelay: 0.15,
      edgePullX: 18,
      edgePullY: 10,
    },
  },
  items: {
    "starry-night": {
      visible: true,
      corner: "top-left",
      offsetX: -12,
      offsetY: 0,
      width: 108,
      height: 93,
      rotation: -5,
      zIndex: 11,
      wiggle: 1.5,
    },
    "desk-lamp": {
      visible: true,
      corner: "top-left",
      offsetX: 4,
      offsetY: 50,
      width: 114,
      height: 144,
      rotation: 6,
      zIndex: 14,
      wiggle: 1,
    },
    "vinyl-record": {
      visible: true,
      corner: "top-left",
      offsetX: 72,
      offsetY: -2,
      width: 92,
      height: 87,
      rotation: -4,
      zIndex: 12,
      wiggle: 1,
    },
    "sprint-book": {
      visible: true,
      corner: "top-right",
      offsetX: 38,
      offsetY: 0,
      width: 80,
      height: 98,
      rotation: -6,
      zIndex: 11,
      wiggle: 1.5,
    },
    "figma-icon": {
      visible: true,
      corner: "top-right",
      offsetX: -4,
      offsetY: 12,
      width: 36,
      height: 36,
      rotation: -3,
      zIndex: 13,
      wiggle: 2,
    },
    "folder-icons": {
      visible: true,
      corner: "top-right",
      offsetX: 34,
      offsetY: 24,
      width: 56,
      height: 53,
      rotation: 4,
      zIndex: 15,
      wiggle: 1,
    },
    "coffee-croissant": {
      visible: true,
      corner: "top-right",
      offsetX: -12,
      offsetY: 58,
      width: 108,
      height: 59,
      rotation: 3,
      zIndex: 14,
      wiggle: 1,
    },
    plant: {
      visible: true,
      corner: "bottom-left",
      offsetX: -10,
      offsetY: 14,
      width: 100,
      height: 112,
      rotation: 5,
      zIndex: 13,
      wiggle: 1.5,
    },
    headphones: {
      visible: true,
      corner: "bottom-left",
      offsetX: 6,
      offsetY: 0,
      width: 86,
      height: 88,
      rotation: -6,
      zIndex: 12,
      wiggle: 1.5,
    },
    "instax-camera": {
      visible: true,
      corner: "bottom-right",
      offsetX: 58,
      offsetY: 0,
      width: 58,
      height: 62,
      rotation: -6,
      zIndex: 16,
      wiggle: 2,
    },
    stamps: {
      visible: true,
      corner: "bottom-right",
      offsetX: -10,
      offsetY: 22,
      width: 98,
      height: 90,
      rotation: -5,
      zIndex: 12,
      wiggle: 1.5,
    },
    journal: {
      visible: true,
      corner: "bottom-right",
      offsetX: 24,
      offsetY: 86,
      width: 54,
      height: 74,
      rotation: 5,
      zIndex: 17,
      wiggle: 1,
    },
    "crt-monitor": hidden("top-right"),
    cursor: hidden("top-right"),
    "claude-icon": hidden("top-right"),
    "blue-note": hidden("bottom-left"),
    "pink-note": hidden("bottom-left"),
    "mouse-arrow": hidden("bottom-right"),
  },
};

export const heroMobileLayouts: Record<HeroMobileTier, HeroMobileTierLayout> = {
  wide: wideLayout,
  medium: mediumLayout,
  narrow: narrowLayout,
};

export function getHeroMobileLayout(tier: HeroMobileTier): HeroMobileTierLayout {
  return heroMobileLayouts[tier];
}

export function heroMobileItemsForCorner(
  tier: HeroMobileTier,
  corner: HeroMobileCorner,
): string[] {
  const { items } = heroMobileLayouts[tier];
  return Object.entries(items)
    .filter(([, placement]) => placement.visible && placement.corner === corner)
    .sort(([, a], [, b]) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
    .map(([id]) => id);
}

export function getHeroMobileItemPlacement(
  tier: HeroMobileTier,
  itemId: string,
): HeroMobileCollagePlacement | undefined {
  return heroMobileLayouts[tier].items[itemId];
}

/** @deprecated Use getHeroMobileLayout(tier).edgeInset */
export const HERO_MOBILE_EDGE_INSET = wideLayout.edgeInset;

/** @deprecated Use getHeroMobileLayout(tier).corners */
export const heroMobileCornerConfigs = wideLayout.corners;

/** @deprecated Use getHeroMobileLayout(tier).items */
export const heroMobileCollageById = wideLayout.items;
