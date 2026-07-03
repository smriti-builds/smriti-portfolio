/**
 * Mobile hero tiers within the site md breakpoint (<768px).
 * Matches the three reference compositions: wide → medium → narrow.
 */

export type HeroMobileTier = "wide" | "medium" | "narrow";

/** Wide mobile — phablets / large phones (480px–767px). */
export const HERO_MOBILE_TIER_WIDE_MIN = 480;

/** Medium mobile — standard phones (390px–479px). */
export const HERO_MOBILE_TIER_MEDIUM_MIN = 390;

export function getHeroMobileTier(viewportWidth: number): HeroMobileTier {
  if (viewportWidth >= HERO_MOBILE_TIER_WIDE_MIN) return "wide";
  if (viewportWidth >= HERO_MOBILE_TIER_MEDIUM_MIN) return "medium";
  return "narrow";
}
