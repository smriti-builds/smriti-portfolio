/**
 * Mobile clean hero — Figma node 1189:26663 (Clean mode-760 / 420 / 360).
 * All coordinates are px on the Figma frame (width × 800 height).
 */

import type { HeroMobileTier } from "@/lib/hero/mobile-tier";
import { HERO_MOBILE_DESIGN_HEIGHT, HERO_MOBILE_DESIGN_WIDTH } from "@/lib/hero/mobile-tier";

export type HeroMobileCollagePlacement = {
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
};

export type HeroMobileTextPlacement = {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  lineHeight?: number;
  align?: "left" | "center";
};

export type HeroMobileTierLayout = {
  designWidth: number;
  designHeight: number;
  name: HeroMobileTextPlacement;
  role: HeroMobileTextPlacement;
  tagline: HeroMobileTextPlacement;
  items: Record<string, HeroMobileCollagePlacement>;
};

/** Figma image layer name → hero collage id */
export const FIGMA_COLLAGE_ID: Record<string, string> = {
  "image 1770": "starry-night",
  "image 1765 1": "desk-lamp",
  "image 1784": "plant",
  "image 1794": "headphones",
  "image 1761 1": "sprint-book",
  "image 1777": "figma-icon",
  "image 1779": "cursor",
  "image 1778": "claude-icon",
  "image 1767 1": "folder-icons",
  "stamps-cluster": "stamps",
  "image 1764 1": "instax-camera",
  "image 1769": "journal",
  "image 1766 1": "vinyl-record",
  "image 1762 1": "coffee-croissant",
};

export const heroMobileCopy = {
  name: "Smriti Rawat",
  role: "Product Design",
  tagline: '6 years of asking "Why?" until the product gets better.',
};

function item(
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  zIndex: number,
): HeroMobileCollagePlacement {
  return { visible: true, x, y, width, height, rotation, zIndex };
}

function hidden(): HeroMobileCollagePlacement {
  return { visible: false, x: 0, y: 0, width: 0, height: 0 };
}

/** Paint order from Figma Frame 45 (back → front). */
const wideItems: Record<string, HeroMobileCollagePlacement> = {
  "starry-night": item(-71, 10.6, 144.2, 124.4, -141.06, 11),
  "desk-lamp": item(30.2, 0, 183.1, 231.6, -90.67, 12),
  plant: item(11.3, 645, 147.7, 164.6, 81.13, 13),
  headphones: item(74, 702.8, 115.6, 116.8, -81.13, 14),
  "sprint-book": item(533, -3.2, 134, 166, 134.83, 15),
  "figma-icon": item(713, 0, 57, 57, 0, 16),
  cursor: item(738, 28, 54, 49, 0, 17),
  "claude-icon": item(670, 16, 61, 61, 0, 18),
  "folder-icons": item(690, 34, 96, 90, 0, 19),
  stamps: item(509, 695.6, 183.3, 166.3, -122.48, 20),
  "instax-camera": item(651, 616.5, 89.7, 95.4, 15.04, 21),
  journal: item(645, 747.3, 104.8, 142.5, -147.71, 22),
  "vinyl-record": item(-55, 180, 169.9, 161, 0, 23),
  "coffee-croissant": item(643, 149.8, 147.2, 80.7, -33.74, 24),
  "crt-monitor": hidden(),
  "blue-note": hidden(),
  "pink-note": hidden(),
  "mouse-arrow": hidden(),
};

const mediumItems: Record<string, HeroMobileCollagePlacement> = {
  "starry-night": item(134, -18.3, 129.1, 111.4, -141.06, 11),
  "desk-lamp": item(181.1, 0, 136.6, 172.8, -90.67, 12),
  plant: item(165.7, 646, 130.6, 145.4, 81.13, 13),
  headphones: item(206, 743.1, 84.3, 85.1, -81.13, 14),
  "sprint-book": item(451, 0.3, 102.5, 127.3, 134.83, 15),
  "figma-icon": item(548, 34, 38.5, 38.5, 0, 16),
  cursor: item(565.1, 52.9, 36.3, 33.3, 0, 17),
  "claude-icon": item(519, 44.8, 41.2, 41.2, 0, 18),
  "folder-icons": item(532.5, 56.9, 64.8, 60.8, 0, 19),
  stamps: item(410, 724.3, 128.7, 116.8, -122.48, 20),
  "instax-camera": item(504, 646.2, 79.7, 84.9, 15.04, 21),
  journal: item(504, 761.7, 73.6, 100, -147.71, 22),
  "vinyl-record": item(150, 110, 130.1, 123.2, 0, 23),
  "coffee-croissant": item(494.6, 147.1, 109.5, 60, -33.74, 24),
  "crt-monitor": hidden(),
  "blue-note": hidden(),
  "pink-note": hidden(),
  "mouse-arrow": hidden(),
};

const narrowItems: Record<string, HeroMobileCollagePlacement> = {
  "starry-night": item(-37.8, -6.6, 104.9, 90.5, -141.06, 11),
  "desk-lamp": item(0.4, 8.2, 111, 140.4, -90.67, 12),
  plant: item(-8.3, 670, 121.5, 135.3, 81.13, 13),
  headphones: item(52, 730.2, 72.1, 72.8, -101.77, 14),
  "sprint-book": item(242.2, -0.5, 91.2, 113.3, 134.83, 15),
  "figma-icon": item(324.7, 33, 32.7, 32.7, 0, 16),
  cursor: item(339.2, 49.1, 30.8, 28.3, 0, 17),
  "claude-icon": item(300, 42.2, 35, 35, 0, 18),
  "folder-icons": item(311.5, 52.5, 55.1, 51.7, 0, 19),
  stamps: item(197, 733.4, 111.1, 100.9, -122.48, 20),
  "instax-camera": item(280, 660.9, 74.4, 79.2, 15.04, 21),
  journal: item(291, 761.7, 73.6, 100, -147.71, 22),
  "vinyl-record": item(-24.8, 97.6, 105.7, 100.1, 0, 23),
  "coffee-croissant": item(281, 124.4, 96.7, 53, -33.74, 24),
  "crt-monitor": hidden(),
  "blue-note": hidden(),
  "pink-note": hidden(),
  "mouse-arrow": hidden(),
};

export const heroMobileLayouts: Record<HeroMobileTier, HeroMobileTierLayout> = {
  wide: {
    designWidth: HERO_MOBILE_DESIGN_WIDTH.wide,
    designHeight: HERO_MOBILE_DESIGN_HEIGHT,
    name: { x: 110, y: 260, width: 541, height: 64, fontSize: 52, lineHeight: 64, align: "center" },
    role: { x: 140, y: 340, width: 481, height: 29, fontSize: 24, lineHeight: 29, align: "center" },
    tagline: { x: 177, y: 438, width: 407, height: 72, fontSize: 24, lineHeight: 36, align: "center" },
    items: wideItems,
  },
  medium: {
    designWidth: HERO_MOBILE_DESIGN_WIDTH.medium,
    designHeight: HERO_MOBILE_DESIGN_HEIGHT,
    name: { x: 190, y: 287, width: 380, height: 52, fontSize: 44, lineHeight: 52, align: "center" },
    role: { x: 308, y: 355, width: 144, height: 24, fontSize: 20, lineHeight: 24, align: "center" },
    tagline: { x: 208.5, y: 427, width: 343, height: 56, fontSize: 18, lineHeight: 28, align: "center" },
    items: mediumItems,
  },
  narrow: {
    designWidth: HERO_MOBILE_DESIGN_WIDTH.narrow,
    designHeight: HERO_MOBILE_DESIGN_HEIGHT,
    name: { x: 20, y: 313, width: 320, height: 52, fontSize: 44, lineHeight: 52, align: "center" },
    role: { x: 115.5, y: 381, width: 129, height: 22, fontSize: 18, lineHeight: 22, align: "center" },
    tagline: { x: 20, y: 439, width: 320, height: 48, fontSize: 16, lineHeight: 24, align: "center" },
    items: narrowItems,
  },
};

export const heroMobileCollageRenderOrder = [
  "starry-night",
  "desk-lamp",
  "plant",
  "headphones",
  "sprint-book",
  "figma-icon",
  "cursor",
  "claude-icon",
  "folder-icons",
  "stamps",
  "instax-camera",
  "journal",
  "vinyl-record",
  "coffee-croissant",
] as const;

export function getHeroMobileLayout(tier: HeroMobileTier): HeroMobileTierLayout {
  return heroMobileLayouts[tier];
}

export function getHeroMobileItemPlacement(
  tier: HeroMobileTier,
  itemId: string,
): HeroMobileCollagePlacement | undefined {
  return heroMobileLayouts[tier].items[itemId];
}

export function getHeroMobileCanvasScale(
  tier: HeroMobileTier,
  viewportWidth: number,
): number {
  const { designWidth } = heroMobileLayouts[tier];
  return viewportWidth / designWidth;
}
