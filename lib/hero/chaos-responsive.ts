import { HERO_BASELINE_WIDTH } from "@/lib/hero/clean-responsive";

/**
 * Extra grid width on each side of the hero grid for viewports wider than 1440px.
 * Snapped to whole cells so extended columns match the modular grid.
 */
export function getHeroGridSideExtension(
  viewportWidth: number,
  cellSize: number,
): number {
  const raw = Math.max(0, (viewportWidth - HERO_BASELINE_WIDTH) / 2);
  const wholeCells = Math.floor(raw / cellSize);

  return wholeCells * cellSize;
}
