"use client";

import { useLayoutEffect, useState } from "react";
import {
  getHeroMobileArtboardOrigin,
  getHeroMobileCanvasScale,
  getHeroMobileLayout,
  heroMobileCollageRenderOrder,
  heroMobileCopy,
  heroMobileTypography,
} from "@/lib/content/hero-clean-mobile";
import { heroContent } from "@/lib/content/hero";
import { HERO_MOBILE_DESIGN_HEIGHT } from "@/lib/hero/mobile-tier";
import { useHeroMobileTier } from "@/lib/hero/use-hero-mobile-tier";
import HeroMobileCollageItem from "@/sections/HeroMobileCollageItem";
import { HeroMobileLayoutProvider } from "@/sections/hero-mobile-layout-context";
import HeroMobileTopRightCluster from "@/sections/HeroMobileTopRightCluster";

export default function HeroMobileClient() {
  const tier = useHeroMobileTier();
  const layout = getHeroMobileLayout(tier);
  const { collage } = heroContent;
  const [viewport, setViewport] = useState({
    width: layout.designWidth,
    height: HERO_MOBILE_DESIGN_HEIGHT,
  });

  useLayoutEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale = getHeroMobileCanvasScale(tier, viewport.width, viewport.height);
  const artboardOrigin = getHeroMobileArtboardOrigin(tier);
  const collageById = new Map(collage.map((entry) => [entry.id, entry]));
  const narrowTypography = tier === "narrow" ? heroMobileTypography.narrow : undefined;

  return (
    <HeroMobileLayoutProvider tier={tier}>
      <section
        aria-label="Hero"
        data-hero-mode="clean"
        data-hero-scroll-stage="1"
        data-hero-mobile-tier={tier}
        className="hero-mobile-track relative w-full min-h-[100vh] overflow-x-hidden overflow-y-hidden bg-bg-cream md:hidden"
      >
        {/* Figma artboard — narrow: width-fill + top-left anchor for edge bleed */}
        <div
          className={`pointer-events-none absolute inset-0 z-10 flex items-start overflow-hidden ${
            tier === "narrow" ? "justify-start" : "justify-center"
          }`}
        >
          <div
            className="relative shrink-0"
            style={{
              width: layout.designWidth,
              height: layout.designHeight,
              transform: `scale(${scale})`,
              transformOrigin: artboardOrigin,
            }}
          >
            {heroMobileCollageRenderOrder.map((id) => {
              const item = collageById.get(id);
              if (!item) return null;
              return <HeroMobileCollageItem key={id} item={item} />;
            })}
            <HeroMobileTopRightCluster />

            {narrowTypography && (
              <div
                className="pointer-events-none absolute z-30 text-center"
                style={{
                  left: narrowTypography.x,
                  top: narrowTypography.y,
                  width: narrowTypography.width,
                  height: 196,
                }}
              >
                <h1
                  className="font-yellowtail text-[#3e3e42]"
                  style={{
                    fontSize: narrowTypography.name.fontSize,
                    lineHeight: `${narrowTypography.name.lineHeight}px`,
                  }}
                >
                  {heroMobileCopy.name}
                </h1>

                <p
                  className="font-instrument-sans absolute text-[rgba(0,0,0,0.8)]"
                  style={{
                    left: narrowTypography.role.x,
                    top: narrowTypography.role.y,
                    fontSize: narrowTypography.role.fontSize,
                    lineHeight: "24px",
                  }}
                >
                  {heroMobileCopy.role}
                </p>

                <p
                  className="font-instrument-sans absolute font-medium text-[#2e2d2b]"
                  style={{
                    left: narrowTypography.tagline.x,
                    top: narrowTypography.tagline.y,
                    width: narrowTypography.tagline.width,
                    fontSize: narrowTypography.tagline.fontSize,
                    lineHeight: `${narrowTypography.tagline.lineHeight}px`,
                  }}
                >
                  {heroMobileCopy.tagline}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tablet: fluid typography overlay; narrow uses Figma positions on artboard */}
        {tier === "tablet" && (
          <div className="pointer-events-none relative z-20 flex min-h-[100vh] w-full items-center justify-center px-5 sm:px-8">
            <div className="mx-auto w-full max-w-[90%] text-center sm:max-w-[85%]">
              <h1 className="font-yellowtail text-[clamp(1.75rem,7.5vw,3.25rem)] leading-[1.15] text-[#3e3e42]">
                {heroMobileCopy.name}
              </h1>

              <p className="font-instrument-sans mt-2 text-[clamp(0.875rem,3.5vw,1.25rem)] leading-snug text-[rgba(0,0,0,0.8)]">
                {heroMobileCopy.role}
              </p>

              <p className="font-instrument-sans mx-auto mt-4 max-w-[32ch] text-[clamp(0.8125rem,3.2vw,1.125rem)] font-medium leading-relaxed text-[#2e2d2b] sm:max-w-[36ch]">
                {heroMobileCopy.tagline}
              </p>
            </div>
          </div>
        )}
      </section>
    </HeroMobileLayoutProvider>
  );
}
