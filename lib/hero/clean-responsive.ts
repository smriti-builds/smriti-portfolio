import {
  HERO_BASELINE_WIDTH,
  getHeroViewportGutter,
  isHeroWideViewport,
  resolveCollageViewportLeft,
} from "@/lib/hero/collage-viewport";

/** Desktop breakpoint — at and above this width clean mode uses viewport-anchored clusters. */
export const HERO_DESKTOP_BREAKPOINT = HERO_BASELINE_WIDTH;

export { HERO_BASELINE_WIDTH, getHeroViewportGutter, isHeroWideViewport };

/** @deprecated Use isHeroWideViewport. */
export function isCleanWideViewport(viewportWidth: number): boolean {
  return isHeroWideViewport(viewportWidth);
}

/** Hero dock width at Figma scale: two 60px buttons + 12px gap. */
export const HERO_CLEAN_DOCK_WIDTH = 132;

export type CleanCollagePosition = {
  left: number | string;
};

/** Clean collage position — delegates to shared viewport-edge anchoring. */
export function resolveCleanCollagePosition(
  x: number,
  width: number,
  viewportWidth: number,
): CleanCollagePosition {
  return { left: resolveCollageViewportLeft(x, width, viewportWidth) };
}

/** Center headline block on the viewport at desktop widths. */
export function cleanCenterLeft(
  x: number,
  width: number | undefined,
  viewportWidth: number,
): number | string {
  if (isHeroWideViewport(viewportWidth) && width !== undefined) {
    return viewportWidth / 2 - width / 2;
  }
  return x;
}

/** Center dock on the viewport at desktop widths. */
export function cleanDockLeft(viewportWidth: number): number {
  return viewportWidth / 2 - HERO_CLEAN_DOCK_WIDTH / 2;
}
