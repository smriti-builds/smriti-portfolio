"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import {
  getHeroMobileCanvasScale,
  getHeroMobileLayout,
  heroMobileCollageRenderOrder,
  heroMobileCopy,
  type HeroMobileTextPlacement,
} from "@/lib/content/hero-clean-mobile";
import { heroContent } from "@/lib/content/hero";
import { useHeroMobileTier } from "@/lib/hero/use-hero-mobile-tier";
import HeroMobileCollageItem from "@/sections/HeroMobileCollageItem";
import { HeroMobileLayoutProvider } from "@/sections/hero-mobile-layout-context";

function HeroMobileTextBlock({
  placement,
  className,
  children,
}: {
  placement: HeroMobileTextPlacement;
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: placement.x,
        top: placement.y,
        width: placement.width,
        height: placement.height,
        fontSize: placement.fontSize,
        lineHeight: placement.lineHeight ? `${placement.lineHeight}px` : undefined,
        textAlign: placement.align ?? "center",
      }}
    >
      {children}
    </div>
  );
}

export default function HeroMobileClient() {
  const tier = useHeroMobileTier();
  const layout = getHeroMobileLayout(tier);
  const { collage } = heroContent;
  const [viewport, setViewport] = useState({
    width: layout.designWidth,
    height: layout.designHeight,
  });

  useLayoutEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale = getHeroMobileCanvasScale(
    tier,
    viewport.width,
    viewport.height,
  );

  const collageById = new Map(collage.map((entry) => [entry.id, entry]));

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
          <div
            className="relative shrink-0"
            style={{
              width: layout.designWidth,
              height: layout.designHeight,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <div className="pointer-events-none absolute inset-0 z-10">
              {heroMobileCollageRenderOrder.map((id) => {
                const item = collageById.get(id);
                if (!item) return null;
                return <HeroMobileCollageItem key={id} item={item} />;
              })}
            </div>

            <div className="pointer-events-none absolute inset-0 z-20">
              <HeroMobileTextBlock
                placement={layout.name}
                className="font-yellowtail text-[#3e3e42]"
              >
                {heroMobileCopy.name}
              </HeroMobileTextBlock>

              <HeroMobileTextBlock
                placement={layout.role}
                className="font-instrument-sans text-[rgba(0,0,0,0.8)]"
              >
                {heroMobileCopy.role}
              </HeroMobileTextBlock>

              <HeroMobileTextBlock
                placement={layout.tagline}
                className="font-instrument-sans font-medium text-[#2e2d2b]"
              >
                {heroMobileCopy.tagline}
              </HeroMobileTextBlock>
            </div>
          </div>
        </div>
      </section>
    </HeroMobileLayoutProvider>
  );
}
