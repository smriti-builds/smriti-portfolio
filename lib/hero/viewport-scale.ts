import { isHeroWideViewport } from "@/lib/hero/collage-viewport";
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
 * On wide desktops both modes keep full-width collage at scale 1 and only
 * shrink when the viewport height is shorter than the artboard.
 */
export function getHeroWideViewportScale(viewportHeight: number): number {
  const { height } = heroContent.artboard;
  return Math.min(1, viewportHeight / height);
}

export function getHeroCanvasScale(
  mode: HeroMode,
  viewportWidth: number,
  viewportHeight: number,
): number {
  if (isHeroWideViewport(viewportWidth)) {
    return getHeroWideViewportScale(viewportHeight);
  }

  return getHeroViewportScale(viewportWidth, viewportHeight);
}
