export const HERO_MOBILE_BREAKPOINT = 768;

/** @deprecated Use mobile-tier.ts */
export function isHeroMobileViewport(viewportWidth: number): boolean {
  return viewportWidth < HERO_MOBILE_BREAKPOINT;
}

export {
  getHeroMobileTier,
  HERO_MOBILE_TIER_MEDIUM_MIN,
  HERO_MOBILE_TIER_WIDE_MIN,
  type HeroMobileTier,
} from "@/lib/hero/mobile-tier";
