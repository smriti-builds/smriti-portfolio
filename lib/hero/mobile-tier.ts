/**
 * Mobile hero tiers within the site md breakpoint (<768px).
 * Layouts are authored at 760 / 420 / 360px reference widths.
 */

export type HeroMobileTier = "wide" | "medium" | "narrow";

/** Design reference viewport widths — one layout authored per size. */
export const HERO_MOBILE_DESIGN_WIDTH = {
  wide: 760,
  medium: 420,
  narrow: 360,
} as const;

/** wide tier: 590px+ (midpoint between 420 and 760). */
export const HERO_MOBILE_TIER_WIDE_MIN = 590;

/** medium tier: 390px+ (midpoint between 360 and 420). */
export const HERO_MOBILE_TIER_MEDIUM_MIN = 390;

export function getHeroMobileTier(viewportWidth: number): HeroMobileTier {
  if (viewportWidth >= HERO_MOBILE_TIER_WIDE_MIN) return "wide";
  if (viewportWidth >= HERO_MOBILE_TIER_MEDIUM_MIN) return "medium";
  return "narrow";
}
