"use client";

import {
  getHeroMobileLayout,
  heroMobileCopy,
  heroMobileCornerOrder,
  heroMobileItemsForCorner,
} from "@/lib/content/hero-clean-mobile";
import { useHeroMobileTier } from "@/lib/hero/use-hero-mobile-tier";
import { heroContent } from "@/lib/content/hero";
import HeroMobileCollageItem from "@/sections/HeroMobileCollageItem";
import HeroMobileCornerCluster from "@/sections/HeroMobileCornerCluster";
import { HeroMobileLayoutProvider } from "@/sections/hero-mobile-layout-context";

export default function HeroMobileClient() {
  const tier = useHeroMobileTier();
  const layout = getHeroMobileLayout(tier);
  const { collage } = heroContent;

  return (
    <HeroMobileLayoutProvider tier={tier} layout={layout}>
      <section
        aria-label="Hero"
        data-hero-mode="clean"
        data-hero-scroll-stage="1"
        data-hero-mobile-tier={tier}
        className="hero-mobile-track relative h-svh min-h-0 overflow-hidden bg-bg-cream md:hidden"
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-10">
            {heroMobileCornerOrder.map((corner) => {
              const itemIds = heroMobileItemsForCorner(tier, corner);
              return (
                <HeroMobileCornerCluster key={corner} corner={corner}>
                  {itemIds.map((id) => {
                    const item = collage.find((entry) => entry.id === id);
                    if (!item) return null;
                    return <HeroMobileCollageItem key={id} item={item} />;
                  })}
                </HeroMobileCornerCluster>
              );
            })}
          </div>

          <div
            className="relative z-20 flex flex-col items-center px-6 py-8 text-center"
            style={{ maxWidth: layout.contentMaxWidth }}
          >
            <h1
              className={`font-yellowtail text-[#3e3e42] ${layout.nameClass}`}
            >
              {heroMobileCopy.name}
            </h1>

            <p
              className={`font-instrument-sans mt-3 text-[rgba(0,0,0,0.8)] ${layout.roleClass}`}
            >
              {heroMobileCopy.role}
            </p>

            <p
              className={`font-instrument-sans mt-5 font-medium text-[#2e2d2b] ${layout.taglineClass}`}
            >
              {heroMobileCopy.taglineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </HeroMobileLayoutProvider>
  );
}
