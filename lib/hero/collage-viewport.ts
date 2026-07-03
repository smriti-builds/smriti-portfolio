/** Figma baseline artboard width — positions in hero-clean.ts are authored at this size. */
export const HERO_BASELINE_WIDTH = 1440;

const HERO_BASELINE_CENTER = HERO_BASELINE_WIDTH / 2;

/** At and above 1440px collage clusters use viewport-edge anchoring (both modes). */
export function isHeroWideViewport(viewportWidth: number): boolean {
  return viewportWidth >= HERO_BASELINE_WIDTH;
}

export function isCollageLeftCluster(x: number, width: number): boolean {
  return x + width / 2 < HERO_BASELINE_CENTER;
}

/** Extra viewport width beyond the 1440px design baseline. */
export function getHeroViewportGutter(viewportWidth: number): number {
  return Math.max(0, viewportWidth - HERO_BASELINE_WIDTH);
}

/**
 * Viewport-edge anchoring for decorative collage items on wide screens.
 *
 * - Left cluster: canonical x from the 1440px design (distance from left edge).
 * - Right cluster: x + (viewport − 1440) (distance from right edge preserved).
 *
 * Below 1440px callers should use artboard coordinates inside the scaled canvas.
 */
export function resolveCollageViewportLeft(
  x: number,
  width: number,
  viewportWidth: number,
): number {
  if (!isHeroWideViewport(viewportWidth)) {
    return x;
  }

  if (isCollageLeftCluster(x, width)) {
    return x;
  }

  return x + getHeroViewportGutter(viewportWidth);
}
