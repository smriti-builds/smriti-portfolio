"use client";

import {
  heroMobileCollageById,
  heroMobileCopy,
  heroMobileLeftFlankIds,
  heroMobileRightFlankIds,
} from "@/lib/content/hero-clean-mobile";
import { heroContent } from "@/lib/content/hero";
import HeroMobileCollageItem from "@/sections/HeroMobileCollageItem";

function HeroMobileFlank({
  flankIds,
}: {
  flankIds: readonly string[];
}) {
  const { collage } = heroContent;
  const items = flankIds
    .map((id) => collage.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  return (
    <>
      {items.map((item) => (
        <HeroMobileCollageItem
          key={item.id}
          item={item}
          placement={heroMobileCollageById[item.id]}
        />
      ))}
    </>
  );
}

export default function HeroMobileClient() {
  return (
    <section
      aria-label="Hero"
      data-hero-mode="clean"
      data-hero-scroll-stage="1"
      className="hero-mobile-only hero-mobile-track relative h-svh min-h-0 overflow-hidden bg-bg-cream"
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-[38vw] max-w-[150px]">
            <HeroMobileFlank flankIds={heroMobileLeftFlankIds} />
          </div>
          <div className="absolute inset-y-0 right-0 w-[38vw] max-w-[150px]">
            <HeroMobileFlank flankIds={heroMobileRightFlankIds} />
          </div>
        </div>

        <div className="relative z-20 flex max-w-[min(300px,78vw)] flex-col items-center px-4 text-center">
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
