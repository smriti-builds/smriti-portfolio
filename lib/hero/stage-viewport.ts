import { isCleanWideViewport } from "@/lib/hero/collage-viewport";
import type { HeroMode } from "@/types/hero";

/** Matches FloatingNavbar `top-6`. */
export const HERO_NAV_TOP = 24;

/** Breathing room between nav bottom and hero content. */
export const HERO_NAV_CONTENT_GAP = 12;

/** Highest collage Y in clean mode (starry-night). */
export const HERO_TOP_CONTENT_Y_CLEAN = 50.9;

/** Highest collage Y in chaos mode (figma-icon). */
export const HERO_TOP_CONTENT_Y_CHAOS = 73;

export function getHeroNavHeight(viewportWidth: number): number {
  if (viewportWidth >= 1024) return 76;
  if (viewportWidth >= 768) return 72;
  return 68;
}

export function getHeroNavClearance(viewportWidth: number): number {
  return HERO_NAV_TOP + getHeroNavHeight(viewportWidth) + HERO_NAV_CONTENT_GAP;
}

/**
 * Downward shift from pure vertical centering so the hero clears the floating nav.
 * Returns 0 on mobile (separate hero layout) and when already below the nav.
 */
export function getHeroArtboardVerticalOffset(
  viewportWidth: number,
  viewportHeight: number,
  mode: HeroMode,
  artboardHeight: number,
  viewportScale: number,
): number {
  if (viewportWidth < 768) return 0;

  const isCleanWide = mode === "clean" && isCleanWideViewport(viewportWidth);
  const renderedHeight = isCleanWide ? artboardHeight : artboardHeight * viewportScale;
  const topContentY =
    (mode === "clean" ? HERO_TOP_CONTENT_Y_CLEAN : HERO_TOP_CONTENT_Y_CHAOS) *
    (isCleanWide ? 1 : viewportScale);

  const centeredTop = (viewportHeight - renderedHeight) / 2;
  const desiredTop = getHeroNavClearance(viewportWidth) - topContentY;

  return Math.max(0, desiredTop - centeredTop);
}
