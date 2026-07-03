/**
 * Mobile hero tiers within the site md breakpoint (<768px).
 *
 * Tiers follow common device logical widths:
 * - wide  → iPhone Pro Max / large phones (430px class)
 * - medium → iPhone 14–15 / standard phones (390px class)
 * - narrow → compact phones & SE-class (360px class)
 */

export type HeroMobileTier = "wide" | "medium" | "narrow";

/** Layout authoring reference — matches real device logical widths. */
export const HERO_MOBILE_DESIGN_WIDTH = {
  /** iPhone 14 Pro Max, Pixel Pro, large Android */
  wide: 430,
  /** iPhone 14/15, Pixel standard */
  medium: 390,
  /** iPhone SE-class, compact Android */
  narrow: 360,
} as const;

/**
 * Large-phone tier — 428px matches iPhone 14 Pro Max / common phablet breakpoint.
 * Covers 428–767px (still below site `md` at 768px).
 */
export const HERO_MOBILE_TIER_WIDE_MIN = 428;

/**
 * Standard-phone tier — 375px is the long-standing iPhone base width.
 * Covers 375–427px.
 */
export const HERO_MOBILE_TIER_MEDIUM_MIN = 375;

/** Compact tier — below 375px (SE, small Android). */
export function getHeroMobileTier(viewportWidth: number): HeroMobileTier {
  if (viewportWidth >= HERO_MOBILE_TIER_WIDE_MIN) return "wide";
  if (viewportWidth >= HERO_MOBILE_TIER_MEDIUM_MIN) return "medium";
  return "narrow";
}
