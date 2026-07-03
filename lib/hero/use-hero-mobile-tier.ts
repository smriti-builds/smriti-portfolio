import { useLayoutEffect, useState } from "react";
import {
  getHeroMobileTier,
  HERO_MOBILE_DESIGN_WIDTH,
  type HeroMobileTier,
} from "@/lib/hero/mobile-tier";

export function useHeroMobileTier(
  defaultWidth = HERO_MOBILE_DESIGN_WIDTH.medium,
): HeroMobileTier {
  const [tier, setTier] = useState<HeroMobileTier>(() => getHeroMobileTier(defaultWidth));

  useLayoutEffect(() => {
    const update = () => setTier(getHeroMobileTier(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return tier;
}
