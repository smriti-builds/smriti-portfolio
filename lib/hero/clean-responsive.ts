/** Figma baseline artboard width — positions in hero-clean.ts are authored at this size. */
export const HERO_BASELINE_WIDTH = 1440;

/** Desktop breakpoint — at and above this width clean mode uses viewport-anchored clusters. */
export const HERO_DESKTOP_BREAKPOINT = HERO_BASELINE_WIDTH;

const HERO_BASELINE_CENTER = HERO_BASELINE_WIDTH / 2;

/** Hero dock width at Figma scale: two 60px buttons + 12px gap. */
export const HERO_CLEAN_DOCK_WIDTH = 132;

/**
 * Extra viewport width beyond the 1440px design.
 * Zero at 1440px; grows as the viewport widens.
 */
export const HERO_VIEWPORT_GUTTER_EXPR = `max(0px, 100vw - ${HERO_BASELINE_WIDTH}px)`;

export function isCleanWideViewport(viewportWidth: number): boolean {
  return viewportWidth >= HERO_DESKTOP_BREAKPOINT;
}

export function isCleanLeftCluster(x: number, width: number): boolean {
  return x + width / 2 < HERO_BASELINE_CENTER;
}

/** Extra width beyond 1440px — used for JS layout on wide desktops. */
export function getCleanViewportGutter(viewportWidth: number): number {
  return Math.max(0, viewportWidth - HERO_BASELINE_WIDTH);
}

export type CleanCollagePosition = {
  left: number | string;
};

/**
 * Clean collage horizontal position on wide desktops.
 *
 * Both clusters preserve their 1440px viewport-edge spacing (mirror strategy):
 * - Left cluster: distance from the left edge stays equal to canonical x.
 * - Right cluster: distance from the right edge stays equal to 1440 − x − width.
 *
 * Implemented as x for left, x + (100vw − 1440) for right — no left-side gutter
 * subtraction, which was over-clipping the left cluster.
 */
export function resolveCleanCollagePosition(
  x: number,
  width: number,
  viewportWidth: number,
): CleanCollagePosition {
  if (!isCleanWideViewport(viewportWidth)) {
    return { left: x };
  }

  if (isCleanLeftCluster(x, width)) {
    return { left: `${x}px` };
  }

  return { left: `calc(${x}px + ${HERO_VIEWPORT_GUTTER_EXPR})` };
}

/** Center headline block on the viewport at desktop widths. */
export function cleanCenterLeft(
  x: number,
  width: number | undefined,
  viewportWidth: number,
): number | string {
  if (isCleanWideViewport(viewportWidth) && width !== undefined) {
    return `calc(50vw - ${width / 2}px)`;
  }
  return x;
}

/** Center dock on the viewport at desktop widths. */
export function cleanDockLeft(): string {
  return `calc(50vw - ${HERO_CLEAN_DOCK_WIDTH / 2}px)`;
}

/** @deprecated Retained for type compatibility. */
export function getEffectiveSideOffset(
  _x: number,
  _width: number,
  viewportWidth: number,
): number {
  return getCleanViewportGutter(viewportWidth);
}

/** @deprecated Use resolveCleanCollagePosition. */
export function resolveCleanCollageScreenX(
  x: number,
  width: number,
  viewportWidth: number,
): number | string {
  return resolveCleanCollagePosition(x, width, viewportWidth).left;
}

/** @deprecated Use resolveCleanCollagePosition. */
export function applyCleanSideOffset(
  x: number,
  width: number,
  offset: number,
): number {
  if (offset === 0) return x;
  return isCleanLeftCluster(x, width) ? x - offset : x + offset;
}
