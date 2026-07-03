"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { HeroMobileTierLayout } from "@/lib/content/hero-clean-mobile";
import type { HeroMobileTier } from "@/lib/hero/mobile-tier";

type HeroMobileLayoutContextValue = {
  tier: HeroMobileTier;
  layout: HeroMobileTierLayout;
};

const HeroMobileLayoutContext = createContext<HeroMobileLayoutContextValue | null>(
  null,
);

export function HeroMobileLayoutProvider({
  tier,
  layout,
  children,
}: HeroMobileLayoutContextValue & { children: ReactNode }) {
  return (
    <HeroMobileLayoutContext.Provider value={{ tier, layout }}>
      {children}
    </HeroMobileLayoutContext.Provider>
  );
}

export function useHeroMobileLayout(): HeroMobileLayoutContextValue {
  const value = useContext(HeroMobileLayoutContext);
  if (!value) {
    throw new Error("useHeroMobileLayout must be used within HeroMobileLayoutProvider");
  }
  return value;
}
