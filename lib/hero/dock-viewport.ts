import { heroContent } from "@/lib/content/hero";

/** Figma dock button size — never scaled with the artboard. */
export const HERO_DOCK_BUTTON_SIZE = 60;

/** Gap between dock buttons at Figma scale. */
export const HERO_DOCK_GAP = 12;

/** Total dock width: two buttons + gap. */
export const HERO_DOCK_WIDTH =
  HERO_DOCK_BUTTON_SIZE * 2 + HERO_DOCK_GAP;

/** Minimum inset from the hero stage bottom on short viewports. */
export const HERO_DOCK_MIN_BOTTOM_OFFSET = 24;

/**
 * Viewport bottom inset for the hero dock when the artboard is vertically centered.
 * Keeps the dock aligned with Figma y=890 on a 1168px-tall artboard without artboard scaling.
 */
export function getHeroDockBottomOffset(viewportHeight: number): number {
  const { height: artboardHeight } = heroContent.artboard;
  const { y: dockY } = heroContent.dock;
  const centeredOffset =
    (viewportHeight + artboardHeight) / 2 - dockY - HERO_DOCK_BUTTON_SIZE;

  return Math.max(HERO_DOCK_MIN_BOTTOM_OFFSET, centeredOffset);
}
