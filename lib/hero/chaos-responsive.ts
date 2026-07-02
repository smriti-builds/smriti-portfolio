import type { HeroContent } from "@/types/hero";
import { HERO_BASELINE_WIDTH } from "@/lib/hero/clean-responsive";

const GRID_SIDE_MARGIN = 115;

/** Chaos artboard grows with the viewport so the grid can fill wider screens. */
export function getChaosArtboardWidth(viewportWidth: number): number {
  return Math.max(HERO_BASELINE_WIDTH, viewportWidth);
}

export function getResponsiveHeroGrid(
  artboardWidth: number,
  grid: HeroContent["grid"],
): HeroContent["grid"] {
  if (artboardWidth <= HERO_BASELINE_WIDTH) {
    return grid;
  }

  return {
    ...grid,
    x: GRID_SIDE_MARGIN,
    width: artboardWidth - GRID_SIDE_MARGIN * 2,
  };
}
