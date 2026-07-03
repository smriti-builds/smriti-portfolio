import { heroContent } from "@/lib/content/hero";

/** Matches site `md` breakpoint — dock uses 32px buttons below this width. */
export const HERO_DOCK_MOBILE_BREAKPOINT = 768;

export const HERO_DOCK_BUTTON_SIZE_MOBILE = 32;
export const HERO_DOCK_BUTTON_SIZE_DESKTOP = 48;

export const HERO_DOCK_GAP_MOBILE = 8;
export const HERO_DOCK_GAP_DESKTOP = 10;

/** Minimum inset from the hero stage bottom on short viewports. */
export const HERO_DOCK_MIN_BOTTOM_OFFSET = 24;

export function isHeroDockMobileViewport(viewportWidth: number): boolean {
  return viewportWidth < HERO_DOCK_MOBILE_BREAKPOINT;
}

export function getHeroDockButtonSize(viewportWidth: number): number {
  return isHeroDockMobileViewport(viewportWidth)
    ? HERO_DOCK_BUTTON_SIZE_MOBILE
    : HERO_DOCK_BUTTON_SIZE_DESKTOP;
}

export function getHeroDockGap(viewportWidth: number): number {
  return isHeroDockMobileViewport(viewportWidth)
    ? HERO_DOCK_GAP_MOBILE
    : HERO_DOCK_GAP_DESKTOP;
}

export function getHeroDockWidth(viewportWidth: number): number {
  const buttonSize = getHeroDockButtonSize(viewportWidth);
  return buttonSize * 2 + getHeroDockGap(viewportWidth);
}

export function getHeroDockBorderRadius(viewportWidth: number): number {
  return getHeroDockButtonSize(viewportWidth) * 0.2;
}

/**
 * Viewport bottom inset for the hero dock when the artboard is vertically centered.
 * Keeps the dock aligned with Figma y=890 on a 1168px-tall artboard without artboard scaling.
 */
export function getHeroDockBottomOffset(
  viewportHeight: number,
  viewportWidth: number,
): number {
  const { height: artboardHeight } = heroContent.artboard;
  const { y: dockY } = heroContent.dock;
  const buttonSize = getHeroDockButtonSize(viewportWidth);
  const centeredOffset =
    (viewportHeight + artboardHeight) / 2 - dockY - buttonSize;

  return Math.max(HERO_DOCK_MIN_BOTTOM_OFFSET, centeredOffset);
}

/** @deprecated Use getHeroDockButtonSize. */
export const HERO_DOCK_BUTTON_SIZE = HERO_DOCK_BUTTON_SIZE_DESKTOP;

/** @deprecated Use getHeroDockGap. */
export const HERO_DOCK_GAP = HERO_DOCK_GAP_DESKTOP;

/** @deprecated Use getHeroDockWidth. */
export const HERO_DOCK_WIDTH =
  HERO_DOCK_BUTTON_SIZE_DESKTOP * 2 + HERO_DOCK_GAP_DESKTOP;
