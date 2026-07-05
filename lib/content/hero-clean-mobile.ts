/**
 * Mobile/tablet hero — Figma Clean mode frames.
 * narrow: node 1187:25856 (420×800), tablet: node 1189:26663 (760×800).
 * Rotations from relativeTransform matrix. Coordinates px on each frame artboard.
 * Narrow collage lives in Frame 45 (offset −170); positions below are artboard-relative.
 */

import type { CSSProperties } from "react";
import type { HeroMobileTier } from "@/lib/hero/mobile-tier";
import { HERO_MOBILE_DESIGN_HEIGHT, HERO_MOBILE_DESIGN_WIDTH } from "@/lib/hero/mobile-tier";

export type HeroMobileCollagePlacement = {
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  translateX?: number;
  translateY?: number;
  scale?: number;
  zIndex?: number;
};

export type HeroMobileTopRightLayer = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex: number;
};

export type HeroMobileTopRightCluster = {
  x: number;
  y: number;
  width: number;
  height: number;
  layers: HeroMobileTopRightLayer[];
};

export const heroMobileCopy = {
  name: "Smriti Rawat",
  role: "Product Design @Dream 11 | Ex- Dunzo",
  tagline: '6 years of asking "Why?" until the product gets better.',
};

export type HeroMobileTypography = {
  x: number;
  y: number;
  width: number;
  name: { fontSize: number; lineHeight: number };
  role: { x: number; y: number; fontSize: number };
  tagline: { x: number; y: number; width: number; fontSize: number; lineHeight: number };
};

/** Figma Frame 71 on Clean mode-420 — artboard-relative (20, 287) */
export const heroMobileTypography: Partial<Record<HeroMobileTier, HeroMobileTypography>> = {
  narrow: {
    x: 20,
    y: 287,
    width: 380,
    name: { fontSize: 44, lineHeight: 52 },
    role: { x: 118, y: 68, fontSize: 20 },
    tagline: { x: 18.5, y: 140, width: 343, fontSize: 18, lineHeight: 28 },
  },
};

function item(
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  zIndex: number,
  opts: Partial<Pick<HeroMobileCollagePlacement, "translateX" | "translateY" | "scale">> = {},
): HeroMobileCollagePlacement {
  return { visible: true, x, y, width, height, rotation, zIndex, ...opts };
}

function hidden(): HeroMobileCollagePlacement {
  return { visible: false, x: 0, y: 0, width: 0, height: 0 };
}

/** IDs rendered inside HeroMobileTopRightCluster — not in main render loop */
export const HERO_MOBILE_TOP_RIGHT_CLUSTER_IDS = [
  "sprint-book",
  "claude-icon",
  "figma-icon",
  "cursor",
  "folder-icons",
] as const;

/** Desktop-matched z-order: book back → folder front */
function topRightCluster(
  originX: number,
  originY: number,
  book: { x: number; y: number; w: number; h: number; rot: number },
  icons: Array<{ id: string; x: number; y: number; w: number; h: number; z: number }>,
  scale = 1,
): HeroMobileTopRightCluster {
  const layers: HeroMobileTopRightLayer[] = [
    {
      id: "sprint-book",
      x: book.x - originX,
      y: book.y - originY,
      width: book.w * scale,
      height: book.h * scale,
      rotation: book.rot,
      zIndex: 11,
    },
    ...icons.map((icon) => ({
      id: icon.id,
      x: icon.x - originX,
      y: icon.y - originY,
      width: icon.w * scale,
      height: icon.h * scale,
      rotation: 0,
      zIndex: icon.z,
    })),
  ];

  const maxX = Math.max(...layers.map((l) => l.x + l.width));
  const maxY = Math.max(...layers.map((l) => l.y + l.height));

  return {
    x: originX,
    y: originY,
    width: maxX + 8,
    height: maxY + 8,
    layers,
  };
}

const tabletTopRight = topRightCluster(
  533,
  -3,
  { x: 533, y: -3.15, w: 134, h: 166, rot: -27.49 },
  [
    { id: "claude-icon", x: 670, y: 16, w: 61, h: 61, z: 14 },
    { id: "figma-icon", x: 713, y: 0, w: 57, h: 57, z: 13 },
    { id: "cursor", x: 738, y: 28, w: 54, h: 49, z: 15 },
    { id: "folder-icons", x: 690, y: 34, w: 96, h: 90, z: 16 },
  ],
  1.06,
);

const narrowTopRight = topRightCluster(
  278,
  -1,
  { x: 281, y: 0.3, w: 102.5, h: 127.3, rot: -27.49 },
  [
    { id: "claude-icon", x: 349, y: 44.8, w: 41.2, h: 41.2, z: 14 },
    { id: "figma-icon", x: 378, y: 34, w: 38.5, h: 38.5, z: 13 },
    { id: "cursor", x: 395.1, y: 52.9, w: 36.3, h: 33.3, z: 15 },
    { id: "folder-icons", x: 362.5, y: 56.9, w: 64.8, h: 60.8, z: 16 },
  ],
);

/** tablet 640–767: 760 frame + tightened clusters */
const tabletItems: Record<string, HeroMobileCollagePlacement> = {
  "starry-night": item(-71, 10.6, 144.2, 124.4, -22.67, 10),
  "vinyl-record": item(-55, 180, 169.9, 161, 0, 11),
  "desk-lamp": item(30.2, 0, 183.1, 231.6, 33, 12),
  plant: item(11.3, 645, 147.7, 164.6, 30, 13),
  headphones: item(55, 686, 115.6, 116.8, -30, 14),
  "coffee-croissant": item(643, 149.8, 147.2, 80.7, -37.11, 20),
  journal: item(632, 729, 104.8, 142.5, -41.4, 21),
  stamps: item(538, 693, 183.3, 166.3, -23, 22),
  "instax-camera": item(636, 637, 89.7, 95.4, -25.4, 23),
  "sprint-book": hidden(),
  "figma-icon": hidden(),
  cursor: hidden(),
  "claude-icon": hidden(),
  "folder-icons": hidden(),
  "crt-monitor": hidden(),
  "blue-note": hidden(),
  "pink-note": hidden(),
  "mouse-arrow": hidden(),
};

/** narrow <640: Figma Clean mode-420 (node 1187:25856) */
const narrowItems: Record<string, HeroMobileCollagePlacement> = {
  "starry-night": item(-36, -18.3, 129.1, 111.4, -22.67, 10),
  "vinyl-record": item(-20, 110, 130.1, 123.2, 0, 11),
  "desk-lamp": item(11.1, 0, 136.6, 172.8, 33, 12),
  plant: item(-4.3, 646, 130.6, 145.4, 30, 13),
  headphones: item(36, 743.1, 84.3, 85.1, -30, 14),
  "coffee-croissant": item(324.6, 147.1, 109.5, 60, -37.11, 20),
  journal: item(334, 761.7, 73.6, 100, -41.4, 21),
  stamps: item(240, 724.3, 128.7, 116.8, -23, 22),
  "instax-camera": item(334, 646.2, 79.7, 84.9, -25.4, 23),
  "sprint-book": hidden(),
  "figma-icon": hidden(),
  cursor: hidden(),
  "claude-icon": hidden(),
  "folder-icons": hidden(),
  "crt-monitor": hidden(),
  "blue-note": hidden(),
  "pink-note": hidden(),
  "mouse-arrow": hidden(),
};

export const heroMobileTopRightClusters: Record<HeroMobileTier, HeroMobileTopRightCluster> = {
  tablet: tabletTopRight,
  narrow: narrowTopRight,
};

export const heroMobileLayouts: Record<
  HeroMobileTier,
  { designWidth: number; designHeight: number; items: Record<string, HeroMobileCollagePlacement> }
> = {
  tablet: {
    designWidth: HERO_MOBILE_DESIGN_WIDTH.tablet,
    designHeight: HERO_MOBILE_DESIGN_HEIGHT,
    items: tabletItems,
  },
  narrow: {
    designWidth: HERO_MOBILE_DESIGN_WIDTH.narrow,
    designHeight: HERO_MOBILE_DESIGN_HEIGHT,
    items: narrowItems,
  },
};

export const heroMobileCollageRenderOrder = [
  "starry-night",
  "vinyl-record",
  "desk-lamp",
  "plant",
  "headphones",
  "coffee-croissant",
  "journal",
  "stamps",
  "instax-camera",
] as const;

export function getHeroMobileLayout(tier: HeroMobileTier) {
  return heroMobileLayouts[tier];
}

export function getHeroMobileTopRightCluster(tier: HeroMobileTier): HeroMobileTopRightCluster {
  return heroMobileTopRightClusters[tier];
}

export function getHeroMobileItemPlacement(
  tier: HeroMobileTier,
  itemId: string,
): HeroMobileCollagePlacement | undefined {
  return heroMobileLayouts[tier].items[itemId];
}

/**
 * narrow (<640): width-fill so corners hug viewport edges; bottom may crop.
 * tablet: fit inside viewport to keep all clusters visible.
 */
export function getHeroMobileCanvasScale(
  tier: HeroMobileTier,
  viewportWidth: number,
  viewportHeight: number,
): number {
  const { designWidth, designHeight } = heroMobileLayouts[tier];
  const scaleW = viewportWidth / designWidth;
  if (tier === "narrow") return scaleW;
  const scaleH = viewportHeight / designHeight;
  return Math.min(scaleW, scaleH);
}

export function getHeroMobileArtboardOrigin(tier: HeroMobileTier): string {
  return tier === "narrow" ? "top left" : "top center";
}

export function getHeroMobileArtboardStyle(
  placement: HeroMobileCollagePlacement,
): CSSProperties {
  const scale = placement.scale ?? 1;
  const tx = placement.translateX ?? 0;
  const ty = placement.translateY ?? 0;
  const transforms = [
    scale !== 1 ? `scale(${scale})` : null,
    tx || ty ? `translate(${tx}px, ${ty}px)` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    position: "absolute",
    left: placement.x,
    top: placement.y,
    width: placement.width,
    height: placement.height,
    zIndex: placement.zIndex,
    transformOrigin: "center center",
    transform: transforms || undefined,
  };
}

export function getHeroMobileClusterLayerStyle(layer: HeroMobileTopRightLayer): CSSProperties {
  return {
    position: "absolute",
    left: layer.x,
    top: layer.y,
    width: layer.width,
    height: layer.height,
    zIndex: layer.zIndex,
    transformOrigin: "center center",
  };
}
