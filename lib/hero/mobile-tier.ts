/**
 * Mobile hero tiers — layouts synced from Figma node 1189:26663.
 * Frames: Clean mode-760, Clean mode-420, Clean mode-360 (800px tall).
 */

export type HeroMobileTier = "wide" | "medium" | "narrow";

/** Figma frame widths — one authored layout per breakpoint. */
export const HERO_MOBILE_DESIGN_WIDTH = {
  wide: 760,
  medium: 420,
  narrow: 360,
} as const;

export const HERO_MOBILE_DESIGN_HEIGHT = 800;

/** wide tier: 590px+ (midpoint between 420 and 760). */
export const HERO_MOBILE_TIER_WIDE_MIN = 590;

/** medium tier: 390px+ (midpoint between 360 and 420). */
export const HERO_MOBILE_TIER_MEDIUM_MIN = 390;

export function getHeroMobileTier(viewportWidth: number): HeroMobileTier {
  if (viewportWidth >= HERO_MOBILE_TIER_WIDE_MIN) return "wide";
  if (viewportWidth >= HERO_MOBILE_TIER_MEDIUM_MIN) return "medium";
  return "narrow";
}
