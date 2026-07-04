export const HERO_MOBILE_BREAKPOINT = 768;

/** @deprecated Use mobile-tier.ts */
export function isHeroMobileViewport(viewportWidth: number): boolean {
  return viewportWidth < HERO_MOBILE_BREAKPOINT;
}

export {
  getHeroMobileTier,
  HERO_MOBILE_DESIGN_WIDTH,
  HERO_MOBILE_TIER_TABLET_MIN,
  type HeroMobileTier,
} from "@/lib/hero/mobile-tier";

/** @deprecated Use HERO_MOBILE_TIER_TABLET_MIN */
export { HERO_MOBILE_TIER_TABLET_MIN as HERO_MOBILE_TIER_WIDE_MIN } from "@/lib/hero/mobile-tier";

/** @deprecated Removed — below 640 uses narrow (360) frame */
export const HERO_MOBILE_TIER_MOBILE_MIN = 640;
/** @deprecated Alias for removed mobile tier */
export const HERO_MOBILE_TIER_MEDIUM_MIN = 640;
