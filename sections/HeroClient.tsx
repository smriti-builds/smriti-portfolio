"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroCleanHeadlines } from "@/lib/content/hero-clean";
import { heroContent } from "@/lib/content/hero";
import { heroGridCutoutOutlineSegments, heroGridCutoutPaths } from "@/lib/hero/cutout-paths";
import {
  artboardCanvasStyle,
  artboardRect,
  px,
} from "@/lib/hero/layout";
import {
  HERO_CLEAN_ARTBOARD_HEIGHT,
  useViewportHeight,
  useViewportWidth,
} from "@/lib/hero/use-viewport-width";
import HeroCollageItemView from "@/sections/HeroCollageItem";
import HeroDock from "@/sections/HeroDock";
import { cleanCenterLeft } from "@/lib/hero/clean-responsive";
import { getHeroGridSideExtension } from "@/lib/hero/chaos-responsive";
import {
  scrollToHeroStage,
  useHeroScrollStage,
  type HeroScrollStage,
} from "@/lib/hero/use-hero-scroll-stage";
import type { HeroContent, HeroHeadline, HeroMode } from "@/types/hero";

const content = heroContent;

const HERO_FADE_TRANSITION = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const HERO_GRID_LINE_HEIGHT = 44;
const HERO_GRID_ROW_HEIGHT = 44;

function headlineClassName(variant: HeroHeadline["variant"]): string {
  switch (variant) {
    case "statement":
    case "tagline":
      return "font-inter text-[32px] font-semibold uppercase leading-[44px] tracking-normal text-text-primary";
    case "script":
      return "font-instrument-serif text-[24px] font-normal leading-[32px] tracking-normal text-text-primary";
    case "contact":
      return "font-inter text-center text-[18px] font-medium lowercase leading-[44px] text-[#1e1e1e]";
    case "display":
      return "font-yellowtail text-center text-[52px] leading-[64px] tracking-[2.6px] text-[#3e3e42]";
    case "mono-subtitle":
      return "font-instrument-sans text-center text-[24px] leading-normal text-[rgba(0,0,0,0.8)]";
    case "mono-body":
      return "font-instrument-sans text-center text-[24px] font-medium leading-[36px] text-[#2e2d2b] whitespace-normal";
    default:
      return "";
  }
}

function isGridHeadline(variant: HeroHeadline["variant"]): boolean {
  return variant === "statement" || variant === "tagline";
}

function HeroHeadlineBlock({
  headline,
  visible,
  responsiveCenter = false,
}: {
  headline: HeroHeadline;
  visible: boolean;
  responsiveCenter?: boolean;
}) {
  const className = headlineClassName(headline.variant);
  const headlineX = responsiveCenter ? cleanCenterLeft(headline.x) : headline.x;

  if (headline.lines?.length) {
    const blockWidth = headline.width ?? headline.lines[0]?.width;
    const rowHeight =
      headline.lineHeight ??
      (isGridHeadline(headline.variant) ? HERO_GRID_ROW_HEIGHT : HERO_GRID_LINE_HEIGHT);
    const alignLeft = headline.align === "left";

    return (
      <>
        {headline.lines.map((line, index) => {
          const lineWidth = line.width ?? blockWidth;
          const lineX =
            typeof headlineX === "string"
              ? headlineX
              : alignLeft || blockWidth === undefined || lineWidth === undefined
                ? headlineX
                : lineWidth < blockWidth
                  ? headlineX + (blockWidth - lineWidth) / 2
                  : headlineX;
          const lineY = headline.y + index * rowHeight;

          return (
            <motion.p
              key={line.text}
              initial={false}
              aria-hidden={!visible}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={HERO_FADE_TRANSITION}
              className={`pointer-events-none absolute z-40 flex items-center ${alignLeft ? "justify-start" : "justify-center"} ${className}`}
              style={{
                ...artboardRect(lineX, lineY, lineWidth, rowHeight),
                lineHeight: px(rowHeight),
              }}
            >
              {line.text}
            </motion.p>
          );
        })}
      </>
    );
  }

  const isScript = headline.variant === "script";
  const isContact = headline.variant === "contact";
  const isCleanCopy =
    headline.variant === "display" ||
    headline.variant === "mono-subtitle" ||
    headline.variant === "mono-body";

  return (
    <motion.p
      initial={false}
      aria-hidden={!visible}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={HERO_FADE_TRANSITION}
      className={`pointer-events-none absolute z-40 ${
        isScript || isCleanCopy
          ? "whitespace-normal"
          : `flex items-center ${headline.align === "left" ? "justify-start" : "justify-center text-center"}`
      } ${className}`}
      style={{
        ...artboardRect(
          headlineX,
          headline.y,
          headline.width,
          headline.height ?? (isContact ? 44 : undefined),
        ),
        ...(headline.fontSize !== undefined ? { fontSize: px(headline.fontSize) } : {}),
        ...(headline.lineHeight !== undefined
          ? { lineHeight: px(headline.lineHeight) }
          : isGridHeadline(headline.variant)
            ? { lineHeight: px(HERO_GRID_LINE_HEIGHT) }
            : isScript
              ? { lineHeight: px(32) }
              : isContact
                ? { lineHeight: px(44) }
                : headline.variant === "display"
                  ? { lineHeight: px(64) }
                  : headline.variant === "mono-body"
                    ? { lineHeight: px(36) }
                    : {}),
      }}
    >
      {headline.text}
    </motion.p>
  );
}

function HeroGridCutoutShape({
  shape,
  lineColor,
  mode,
}: {
  shape: HeroContent["grid"]["cutoutShape"];
  lineColor: string;
  mode: HeroMode;
}) {
  const outlineSegments = heroGridCutoutOutlineSegments();

  return (
    <motion.svg
      initial={false}
      aria-hidden="true"
      className="pointer-events-none absolute z-[1]"
      animate={{ opacity: mode === "chaos" ? 1 : 0 }}
      transition={HERO_FADE_TRANSITION}
      style={artboardRect(shape.x, shape.y, shape.width, shape.height)}
      viewBox={`0 0 ${shape.width} ${shape.height}`}
      fill="none"
      overflow="visible"
    >
      {heroGridCutoutPaths.map((d) => (
        <path key={d} d={d} fill="var(--bg-cream)" />
      ))}
      {outlineSegments.map(([x1, y1, x2, y2]) => (
        <line
          key={`${x1}-${y1}-${x2}-${y2}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={lineColor}
          strokeWidth={1}
          shapeRendering="crispEdges"
        />
      ))}
    </motion.svg>
  );
}

function heroGridPatternStyle({
  left,
  top,
  width,
  height,
  cellSize,
  lineColor,
  gridOriginX,
  gridOriginY,
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  cellSize: number;
  lineColor: string;
  gridOriginX: number;
  gridOriginY: number;
}) {
  return {
    ...artboardRect(left, top, width, height),
    borderRight: `${px(1)} solid ${lineColor}`,
    borderBottom: `${px(1)} solid ${lineColor}`,
    backgroundImage: `
      linear-gradient(to right, ${lineColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
    `,
    backgroundSize: `${px(cellSize)} ${px(cellSize)}`,
    backgroundPosition: `${px(gridOriginX - left)} ${px(gridOriginY - top)}`,
  };
}

function HeroGrid({
  grid,
  mode,
  sideExtension,
}: {
  grid: HeroContent["grid"];
  mode: HeroMode;
  sideExtension: number;
}) {
  const lineColor = "rgba(200, 201, 196, 0.35)";

  return (
    <>
      <motion.div
        initial={false}
        aria-hidden="true"
        className="pointer-events-none absolute z-0 box-border"
        animate={{ opacity: mode === "chaos" ? 1 : 0 }}
        transition={HERO_FADE_TRANSITION}
        style={heroGridPatternStyle({
          left: grid.x - sideExtension,
          top: grid.y,
          width: grid.width + sideExtension * 2,
          height: grid.height,
          cellSize: grid.cellSize,
          lineColor,
          gridOriginX: grid.x,
          gridOriginY: grid.y,
        })}
      />
      <HeroGridCutoutShape shape={grid.cutoutShape} lineColor={lineColor} mode={mode} />
    </>
  );
}

function HeroArtboardCanvas({
  children,
  mode,
  cleanScale = 1,
}: {
  children: ReactNode;
  mode: HeroMode;
  cleanScale?: number;
}) {
  const { width, height } = content.artboard;
  const isClean = mode === "clean";
  const cleanFrameHeight = HERO_CLEAN_ARTBOARD_HEIGHT * cleanScale;

  return (
    <div
      className={
        isClean
          ? "hero-clean-frame hero-artboard-viewport bg-bg-cream"
          : "hero-artboard-viewport mx-auto w-full max-w-[1440px] overflow-visible bg-bg-cream"
      }
      style={isClean ? { height: cleanFrameHeight, flex: "none" } : undefined}
    >
      <div
        className={`relative shrink-0 overflow-visible bg-bg-cream ${isClean ? "hero-clean-canvas" : ""}`}
        style={{
          ...(isClean
            ? artboardCanvasStyle(width, HERO_CLEAN_ARTBOARD_HEIGHT)
            : artboardCanvasStyle(width, height)),
          ...(isClean
            ? {
                transform: `scale(${cleanScale})`,
                transformOrigin: "top center",
              }
            : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}

function scrollStageToMode(stage: HeroScrollStage): HeroMode {
  return stage >= 1 ? "clean" : "chaos";
}

export default function HeroClient() {
  const heroTrackRef = useRef<HTMLElement>(null);
  const scrollStage = useHeroScrollStage(heroTrackRef);
  const [manualMode, setManualMode] = useState<HeroMode | null>(null);
  const { headlines, collage, grid, dock } = content;
  const viewportWidth = useViewportWidth();
  const viewportHeight = useViewportHeight();

  const mode = manualMode ?? scrollStageToMode(scrollStage);
  const isChaos = mode === "chaos";
  const cleanScale = Math.min(
    1,
    viewportWidth / content.artboard.width,
    viewportHeight / HERO_CLEAN_ARTBOARD_HEIGHT,
  );
  const cleanFrameHeight = HERO_CLEAN_ARTBOARD_HEIGHT * cleanScale;
  const gridSideExtension = getHeroGridSideExtension(viewportWidth);

  const handleModeChange = useCallback((nextMode: HeroMode) => {
    setManualMode(nextMode);
    scrollToHeroStage(nextMode === "chaos" ? 0 : 1, heroTrackRef.current);
  }, []);

  useEffect(() => {
    if (manualMode === null) return;
    const expected = scrollStageToMode(scrollStage);
    if (manualMode === expected) {
      setManualMode(null);
    }
  }, [manualMode, scrollStage]);

  return (
    <section
      ref={heroTrackRef}
      id="hero"
      aria-label="Hero"
      data-hero-mode={mode}
      data-hero-scroll-stage={scrollStage}
      className="hero-scroll-track relative min-w-0 max-w-[100vw] overflow-x-clip bg-bg-cream"
    >
      <div
        className={`sticky top-0 flex w-full min-w-0 max-w-[100vw] flex-col overflow-x-clip bg-bg-cream ${isChaos ? "h-svh min-h-[640px]" : ""}`}
        style={isChaos ? undefined : { height: cleanFrameHeight }}
      >
        <HeroArtboardCanvas mode={mode} cleanScale={cleanScale}>
          <HeroGrid grid={grid} mode={mode} sideExtension={gridSideExtension} />

          {collage
            .filter((item) => item.id !== "mouse-arrow")
            .map((item) => (
              <HeroCollageItemView key={item.id} item={item} mode={mode} />
            ))}

          {headlines.map((headline) => (
            <HeroHeadlineBlock key={headline.id} headline={headline} visible={isChaos} />
          ))}

          {heroCleanHeadlines.map((headline) => (
            <HeroHeadlineBlock
              key={headline.id}
              headline={headline}
              visible={!isChaos}
              responsiveCenter
            />
          ))}

          {collage
            .filter((item) => item.id === "mouse-arrow")
            .map((item) => (
              <HeroCollageItemView key={item.id} item={item} mode={mode} />
            ))}

          <HeroDock dock={dock} mode={mode} onModeChange={handleModeChange} />
        </HeroArtboardCanvas>
      </div>
    </section>
  );
}
