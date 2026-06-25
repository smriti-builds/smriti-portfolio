import { heroCleanCollageById } from "@/lib/content/hero-clean";

/** Figma baseline artboard width — positions in hero-clean.ts are authored at this size. */
export const HERO_BASELINE_WIDTH = 1440;

/** Max outward shift for decorative clusters. */
export const HERO_MAX_EDGE_SHIFT = 120;

/** Minimum px of an asset that must remain visible at the viewport edge. */
export const HERO_MIN_ASSET_VISIBLE = 48;

const HERO_BASELINE_CENTER = HERO_BASELINE_WIDTH / 2;

/**
 * Capped outward shift — grows from 0 at 1440px, plateaus at HERO_MAX_EDGE_SHIFT.
 * Used for center content only when a CSS calc offset is needed; clean headlines stay fixed.
 */
export const HERO_EDGE_OFFSET_EXPR = `clamp(0px, (100vw - ${HERO_BASELINE_WIDTH}px) / 2, ${HERO_MAX_EDGE_SHIFT}px)`;

export function isCleanLeftCluster(x: number, width: number): boolean {
  return x + width / 2 < HERO_BASELINE_CENTER;
}

/** Global capped offset: min(120px, max(0px, (viewportWidth - 1440) / 2)). */
export function getGlobalEdgeOffset(viewportWidth: number): number {
  return Math.min(
    HERO_MAX_EDGE_SHIFT,
    Math.max(0, (viewportWidth - HERO_BASELINE_WIDTH) / 2),
  );
}

/** Max outward shift before a left-cluster asset loses partial visibility. */
function getLeftAssetMaxShift(x: number, width: number): number {
  return Math.max(0, x + width - HERO_MIN_ASSET_VISIBLE);
}

/**
 * Max outward shift before a right-cluster asset loses partial visibility.
 * Edge-bleed assets (authored past the 1440 artboard) are not capped individually.
 */
function getRightAssetMaxShift(
  x: number,
  width: number,
  viewportWidth: number,
): number {
  if (x + width > HERO_BASELINE_WIDTH && viewportWidth > HERO_BASELINE_WIDTH) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.max(0, viewportWidth - x - HERO_MIN_ASSET_VISIBLE);
}

/**
 * Single symmetric offset shared by left and right decorative clusters.
 * Both sides subtract/add this same value; visibility limits apply once globally.
 */
export function getSymmetricEdgeOffset(viewportWidth: number): number {
  const global = getGlobalEdgeOffset(viewportWidth);
  if (global === 0) return 0;

  let limit = global;

  for (const item of Object.values(heroCleanCollageById)) {
    if (!item.visible) continue;

    if (isCleanLeftCluster(item.x, item.width)) {
      limit = Math.min(limit, getLeftAssetMaxShift(item.x, item.width));
    } else {
      const rightMax = getRightAssetMaxShift(item.x, item.width, viewportWidth);
      if (Number.isFinite(rightMax)) {
        limit = Math.min(limit, rightMax);
      }
    }
  }

  return limit;
}

/**
 * Outward shift for a decorative asset — same symmetric value for every cluster item.
 */
export function getEffectiveSideOffset(
  _x: number,
  _width: number,
  viewportWidth: number,
): number {
  return getSymmetricEdgeOffset(viewportWidth);
}

/** Side-cluster asset — canonical x from hero-clean.ts ± symmetric offset. */
export function applyCleanSideOffset(
  x: number,
  width: number,
  offset: number,
): number {
  if (offset === 0) return x;
  return isCleanLeftCluster(x, width) ? x - offset : x + offset;
}

/** Center content — fixed at canonical 1440 positions (no responsive offset). */
export function applyCleanCenterOffset(x: number): number {
  return x;
}

/** Center content CSS position — fixed at canonical x. */
export function cleanCenterLeft(x: number): string {
  return `${x}px`;
}

/** @deprecated Use getGlobalEdgeOffset — kept for clarity in callers. */
export function getHeroEdgeOffset(viewportWidth: number): number {
  return getGlobalEdgeOffset(viewportWidth);
}
