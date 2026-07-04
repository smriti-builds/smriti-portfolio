"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { HeroMobileTier } from "@/lib/hero/mobile-tier";

type HeroMobileLayoutContextValue = {
  tier: HeroMobileTier;
};

const HeroMobileLayoutContext = createContext<HeroMobileLayoutContextValue | null>(null);

export function HeroMobileLayoutProvider({
  tier,
  children,
}: HeroMobileLayoutContextValue & { children: ReactNode }) {
  return (
    <HeroMobileLayoutContext.Provider value={{ tier }}>
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
