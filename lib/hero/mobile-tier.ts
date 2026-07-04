/**
 * Mobile/tablet hero tiers — Figma Clean mode frames.
 * tablet: 640–767px (760 frame), narrow: <640px (420 frame, node 1187:25856).
 */

export type HeroMobileTier = "tablet" | "narrow";

export const HERO_MOBILE_DESIGN_WIDTH = {
  tablet: 760,
  narrow: 420,
} as const;

export const HERO_MOBILE_DESIGN_HEIGHT = 800;

export const HERO_MOBILE_TIER_TABLET_MIN = 640;

export function getHeroMobileTier(viewportWidth: number): HeroMobileTier {
  if (viewportWidth >= HERO_MOBILE_TIER_TABLET_MIN) return "tablet";
  return "narrow";
}
