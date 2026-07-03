import { HERO_BASELINE_WIDTH } from "@/lib/hero/clean-responsive";

/** Extra grid width to add on each side of the hero grid on viewports wider than 1440px. */
export function getHeroGridSideExtension(viewportWidth: number): number {
  return Math.max(0, (viewportWidth - HERO_BASELINE_WIDTH) / 2);
}
