/**
 * Mobile clean hero — four-corner collage per tier (<768px).
 * Compositions match the design reference: layered clusters with
 * specific tilts (vertical lamp, clockwise book, counter-clockwise journal).
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
  tagline: '6 years of asking "Why?" until the product gets better.',
};

export const heroMobileCornerOrder: HeroMobileCorner[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const hidden = (corner: HeroMobileCorner): HeroMobileCollagePlacement => ({
  visible: false,
  corner,
  offsetX: 0,
  offsetY: 0,
  width: 0,
  height: 0,
});

function scalePlacement(
  placement: HeroMobileCollagePlacement,
  scale: number,
): HeroMobileCollagePlacement {
  if (!placement.visible) return placement;
  return {
    ...placement,
    offsetX: Math.round(placement.offsetX * scale),
    offsetY: Math.round(placement.offsetY * scale),
    width: Math.round(placement.width * scale),
    height: Math.round(placement.height * scale),
  };
}

function scaleCornerConfig(
  config: HeroMobileCornerConfig,
  scale: number,
): HeroMobileCornerConfig {
  return {
    ...config,
    width: Math.round(config.width * scale),
    height: Math.round(config.height * scale),
    floatX: config.floatX * scale,
    floatY: config.floatY * scale,
  };
}

/**
 * Reference composition — authored at 390px (standard iPhone).
 *
 * Top-left:  lamp vertical (foreground), painting + vinyl behind
 * Top-right: SPRINT book tilted clockwise, folder on book, figma left, coffee below
 * Bottom-left: headphones behind plant framing leaves
 * Bottom-right: camera above, stamps on journal, journal tilted counter-clockwise
 */
const referenceItems: Record<string, HeroMobileCollagePlacement> = {
  // Top-left — lamp foreground, art + vinyl recede
  "starry-night": {
    visible: true,
    corner: "top-left",
    offsetX: 0,
    offsetY: 14,
    width: 118,
    height: 101,
    rotation: -11,
    zIndex: 11,
    wiggle: 0,
  },
  "vinyl-record": {
    visible: true,
    corner: "top-left",
    offsetX: 76,
    offsetY: 0,
    width: 100,
    height: 94,
    rotation: 0,
    zIndex: 12,
    wiggle: 0,
  },
  "desk-lamp": {
    visible: true,
    corner: "top-left",
    offsetX: 22,
    offsetY: 36,
    width: 128,
    height: 162,
    rotation: 0,
    zIndex: 14,
    wiggle: 0,
  },

  // Top-right — dense overlapping stack
  "figma-icon": {
    visible: true,
    corner: "top-right",
    offsetX: 0,
    offsetY: 20,
    width: 40,
    height: 40,
    rotation: 0,
    zIndex: 13,
    wiggle: 0,
  },
  "sprint-book": {
    visible: true,
    corner: "top-right",
    offsetX: 36,
    offsetY: 0,
    width: 90,
    height: 112,
    rotation: 12,
    zIndex: 11,
    wiggle: 0,
  },
  "folder-icons": {
    visible: true,
    corner: "top-right",
    offsetX: 50,
    offsetY: 20,
    width: 62,
    height: 58,
    rotation: 6,
    zIndex: 15,
    wiggle: 0,
  },
  "coffee-croissant": {
    visible: true,
    corner: "top-right",
    offsetX: 2,
    offsetY: 66,
    width: 124,
    height: 67,
    rotation: 2,
    zIndex: 14,
    wiggle: 0,
  },

  // Bottom-left — headphones frame plant from behind
  headphones: {
    visible: true,
    corner: "bottom-left",
    offsetX: 6,
    offsetY: 0,
    width: 98,
    height: 100,
    rotation: -3,
    zIndex: 12,
    wiggle: 0,
  },
  plant: {
    visible: true,
    corner: "bottom-left",
    offsetX: 0,
    offsetY: 18,
    width: 112,
    height: 125,
    rotation: 3,
    zIndex: 13,
    wiggle: 0,
  },

  // Bottom-right — fanned journal + stamps + camera
  "instax-camera": {
    visible: true,
    corner: "bottom-right",
    offsetX: 58,
    offsetY: 0,
    width: 64,
    height: 68,
    rotation: -4,
    zIndex: 16,
    wiggle: 0,
  },
  stamps: {
    visible: true,
    corner: "bottom-right",
    offsetX: 0,
    offsetY: 30,
    width: 108,
    height: 98,
    rotation: -2,
    zIndex: 12,
    wiggle: 0,
  },
  journal: {
    visible: true,
    corner: "bottom-right",
    offsetX: 18,
    offsetY: 88,
    width: 58,
    height: 80,
    rotation: -8,
    zIndex: 17,
    wiggle: 0,
  },

  "crt-monitor": hidden("top-right"),
  cursor: hidden("top-right"),
  "claude-icon": hidden("top-right"),
  "blue-note": hidden("bottom-left"),
  "pink-note": hidden("bottom-left"),
  "mouse-arrow": hidden("bottom-right"),
};

const referenceCorners: Record<HeroMobileCorner, HeroMobileCornerConfig> = {
  "top-left": {
    width: 188,
    height: 208,
    floatX: 2,
    floatY: 4,
    floatDuration: 5.5,
    floatDelay: 0,
  },
  "top-right": {
    width: 168,
    height: 142,
    floatX: -2,
    floatY: 3,
    floatDuration: 4.8,
    floatDelay: 0.4,
  },
  "bottom-left": {
    width: 118,
    height: 148,
    floatX: 2,
    floatY: -3,
    floatDuration: 5.2,
    floatDelay: 0.85,
  },
  "bottom-right": {
    width: 132,
    height: 176,
    floatX: -2,
    floatY: -3,
    floatDuration: 4.6,
    floatDelay: 0.2,
  },
};

const WIDE_SCALE = 430 / 390;
const NARROW_SCALE = 360 / 390;

function buildTierLayout(
  scale: number,
  edgeInset: number,
  contentMaxWidth: string,
  nameClass: string,
  roleClass: string,
  taglineClass: string,
  edgePull = 0,
): HeroMobileTierLayout {
  const items = Object.fromEntries(
    Object.entries(referenceItems).map(([id, placement]) => [
      id,
      scalePlacement(placement, scale),
    ]),
  );

  const corners = Object.fromEntries(
    Object.entries(referenceCorners).map(([corner, config]) => [
      corner,
      {
        ...scaleCornerConfig(config, scale),
        ...(edgePull !== 0
          ? {
              edgePullX:
                corner.includes("left")
                  ? -edgePull
                  : corner.includes("right")
                    ? edgePull
                    : 0,
              edgePullY:
                corner.includes("top")
                  ? -edgePull
                  : corner.includes("bottom")
                    ? edgePull
                    : 0,
            }
          : {}),
      },
    ]),
  ) as Record<HeroMobileCorner, HeroMobileCornerConfig>;

  return {
    edgeInset,
    contentMaxWidth,
    nameClass,
    roleClass,
    taglineClass,
    corners,
    items,
  };
}

const mediumLayout: HeroMobileTierLayout = {
  ...buildTierLayout(
    1,
    24,
    "min(280px, 70vw)",
    "text-[38px] leading-[46px] tracking-[1.8px]",
    "text-[17px] leading-[23px]",
    "text-[15px] leading-[25px]",
  ),
};

const wideLayout: HeroMobileTierLayout = {
  ...buildTierLayout(
    WIDE_SCALE,
    24,
    "min(300px, 66vw)",
    "text-[40px] leading-[48px] tracking-[2px]",
    "text-[18px] leading-[24px]",
    "text-[16px] leading-[26px]",
  ),
};

const narrowLayout: HeroMobileTierLayout = {
  ...buildTierLayout(
    NARROW_SCALE,
    20,
    "min(260px, 74vw)",
    "text-[36px] leading-[44px] tracking-[1.6px]",
    "text-[16px] leading-[22px]",
    "text-[15px] leading-[24px]",
    4,
  ),
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
