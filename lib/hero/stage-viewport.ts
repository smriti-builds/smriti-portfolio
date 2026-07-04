/** Matches FloatingNavbar top inset at wide desktop (`top-6`). */
export const HERO_NAV_TOP = 24;

/** Breathing room between nav bottom and the hero grid top edge. */
export const HERO_NAV_CONTENT_GAP = 4;

/** Hero grid origin Y — anchors the main composition below the nav. */
export const HERO_GRID_TOP_Y = 87;

/** Wide-desktop layout breakpoint — matches clean wide artboard layout. */
export const HERO_WIDE_DESKTOP_BREAKPOINT = 1440;

export function getHeroNavTop(viewportWidth: number): number {
  if (viewportWidth >= 768 && viewportWidth < 1440) return 16;
  return 24;
}

export function getHeroNavHeight(viewportWidth: number): number {
  if (viewportWidth >= 768 && viewportWidth < 1440) return 52;
  if (viewportWidth >= 1024) return 76;
  if (viewportWidth >= 768) return 72;
  return 56;
}

export function getHeroNavClearance(viewportWidth: number): number {
  return getHeroNavTop(viewportWidth) + getHeroNavHeight(viewportWidth) + HERO_NAV_CONTENT_GAP;
}

/**
 * Downward shift from pure vertical centering so the hero clears the floating nav.
 * Uses a single offset for both chaos and clean so mode toggling does not jump layout.
 * Returns 0 on mobile (separate hero layout) and when already below the nav.
 */
export function getHeroArtboardVerticalOffset(
  viewportWidth: number,
  viewportHeight: number,
  artboardHeight: number,
  viewportScale: number,
): number {
  if (viewportWidth < 768) return 0;

  const isWideDesktop = viewportWidth >= HERO_WIDE_DESKTOP_BREAKPOINT;
  const renderedHeight = isWideDesktop
    ? artboardHeight
    : artboardHeight * viewportScale;
  const gridTopY = isWideDesktop
    ? HERO_GRID_TOP_Y
    : HERO_GRID_TOP_Y * viewportScale;

  const centeredTop = (viewportHeight - renderedHeight) / 2;
  const desiredTop = getHeroNavClearance(viewportWidth) - gridTopY;

  return Math.max(0, desiredTop - centeredTop);
}
