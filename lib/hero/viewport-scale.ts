import { isCleanWideViewport } from "@/lib/hero/collage-viewport";
import { heroContent } from "@/lib/content/hero";
import type { HeroMode } from "@/types/hero";

/** Scale-to-fit factor shared by chaos and clean so both modes match at the same breakpoint. */
export function getHeroViewportScale(
  viewportWidth: number,
  viewportHeight: number,
): number {
  const { width, height } = heroContent.artboard;
  return Math.min(1, viewportWidth / width, viewportHeight / height);
}

/**
 * Clean mode on wide desktops keeps full width (no horizontal shrink) and only
 * scales down when the viewport height is shorter than the artboard.
 */
export function getCleanViewportScale(
  viewportWidth: number,
  viewportHeight: number,
): number {
  const { height } = heroContent.artboard;

  if (isCleanWideViewport(viewportWidth)) {
    return Math.min(1, viewportHeight / height);
  }

  return getHeroViewportScale(viewportWidth, viewportHeight);
}

export function getHeroCanvasScale(
  mode: HeroMode,
  viewportWidth: number,
  viewportHeight: number,
): number {
  return mode === "clean"
    ? getCleanViewportScale(viewportWidth, viewportHeight)
    : getHeroViewportScale(viewportWidth, viewportHeight);
}
