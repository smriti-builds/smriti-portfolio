"use client";

import {
  heroMobileCopy,
  heroMobileCornerOrder,
  heroMobileItemsForCorner,
} from "@/lib/content/hero-clean-mobile";
import { heroContent } from "@/lib/content/hero";
import HeroMobileCollageItem from "@/sections/HeroMobileCollageItem";
import HeroMobileCornerCluster from "@/sections/HeroMobileCornerCluster";

export default function HeroMobileClient() {
  const { collage } = heroContent;

  return (
    <section
      aria-label="Hero"
      data-hero-mode="clean"
      data-hero-scroll-stage="1"
      className="hero-mobile-track relative h-svh min-h-0 overflow-hidden bg-bg-cream md:hidden"
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        {/* Four corner collage islands */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {heroMobileCornerOrder.map((corner) => {
            const itemIds = heroMobileItemsForCorner(corner);
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

        {/* Center content — kept clear of corner clusters */}
        <div className="relative z-20 flex max-w-[min(280px,72vw)] flex-col items-center px-6 py-8 text-center">
          <h1 className="font-yellowtail text-[40px] leading-[48px] tracking-[2px] text-[#3e3e42]">
            {heroMobileCopy.name}
          </h1>

          <p className="font-instrument-sans mt-3 text-[18px] leading-[24px] text-[rgba(0,0,0,0.8)]">
            {heroMobileCopy.role}
          </p>

          <p className="font-instrument-sans mt-5 text-[16px] font-medium leading-[26px] text-[#2e2d2b]">
            {heroMobileCopy.taglineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
