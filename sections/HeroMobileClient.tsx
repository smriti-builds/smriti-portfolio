"use client";

import { useState } from "react";
import {
  heroMobileCollageById,
  heroMobileCopy,
  heroMobileLeftFlankIds,
  heroMobileRightFlankIds,
} from "@/lib/content/hero-clean-mobile";
import { heroContent } from "@/lib/content/hero";
import {
  getHeroDockBorderRadius,
  getHeroDockButtonSize,
} from "@/lib/hero/dock-viewport";
import { px } from "@/lib/hero/layout";
import HeroMobileCollageItem from "@/sections/HeroMobileCollageItem";
import { HeroDockBrushIcon } from "@/sections/HeroDockIcons";

const MOBILE_DOCK_TOOLTIP_GAP = 10;

function HeroMobileDock() {
  const [hovered, setHovered] = useState(false);
  const buttonSize = getHeroDockButtonSize(375);
  const borderRadius = getHeroDockBorderRadius(375);
  const cleanItem = heroContent.dock.items.find((item) => item.mode === "clean");

  if (!cleanItem) return null;

  return (
    <nav aria-label="Hero tools" className="relative mt-8 flex items-center justify-center">
      <div
        className="relative shrink-0"
        style={{ width: px(buttonSize), height: px(buttonSize) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          id="dock-tooltip-mobile-clean"
          role="tooltip"
          aria-hidden={!hovered}
          className={`pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-[rgba(11,11,11,0.9)] p-[12px] font-instrument-sans text-[14px] leading-[14px] text-white shadow-[0px_3px_4px_rgba(32,44,61,0.12)] transition-opacity duration-150 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ bottom: `calc(100% + ${MOBILE_DOCK_TOOLTIP_GAP}px)` }}
        >
          {cleanItem.tooltip.text}
        </div>

        <button
          type="button"
          aria-label={cleanItem.label}
          aria-pressed
          data-dock-icon-version="figma-v3"
          className="flex h-full w-full cursor-default items-center justify-center overflow-hidden border border-white bg-[#ac7f5e]"
          style={{
            borderRadius: px(borderRadius),
            boxShadow: "0px 4px 12px 0px rgba(138, 107, 22, 0.3)",
            width: px(buttonSize),
            height: px(buttonSize),
          }}
        >
          <HeroDockBrushIcon active />
        </button>
      </div>
    </nav>
  );
}

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
        {/* Decorative flanks — left and right columns, vertically spaced */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-[34vw] max-w-[140px]">
            <HeroMobileFlank flankIds={heroMobileLeftFlankIds} />
          </div>
          <div className="absolute inset-y-0 right-0 w-[34vw] max-w-[140px]">
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

          <HeroMobileDock />
        </div>
      </div>
    </section>
  );
}
