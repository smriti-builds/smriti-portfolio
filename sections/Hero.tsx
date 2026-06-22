/**
 * Hero section — layout safeguardrails
 *
 * PRIORITY: Visual accuracy over code refactoring.
 * This is a fragile Figma-mapped layout. When something looks wrong, fix coordinates
 * in lib/content/hero.ts from Figma — do not "clean up" or restructure the system.
 *
 * This file uses Figma-mapped px-based positioning (node 981:938, 1440 × 1168 artboard).
 * Coordinates live in lib/content/hero.ts (x/y/width/height in px) and render via
 * lib/hero/layout.ts helpers (artboardRect, px, artboardCanvasStyle).
 *
 * DO NOT:
 * - Refactor this layout system into flex or grid for collage/headline placement
 * - Convert positioning or sizing units (no %, rem, or vw for x/y/width/height)
 * - Replace absolute artboard positioning with flow-based layout
 * - Prefer DRY/abstraction changes that alter rendered positions or sizes
 *
 * Safe changes: copy, assets, z-index, typography classes, dock button styling.
 * Layout fixes: re-export x/y/width/height from Figma (981:938), keep px units, verify visually.
 */
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { heroContent } from "@/lib/content/hero";
import {
  artboardCanvasStyle,
  artboardRect,
  px,
} from "@/lib/hero/layout";
import type {
  HeroCollageItem,
  HeroContent,
  HeroDockItem,
  HeroHeadline,
} from "@/types/hero";

const content = heroContent;

function collageTransform(item: HeroCollageItem): CSSProperties {
  if (item.rotation === undefined) {
    return {};
  }

  return {
    transform: `rotate(${item.rotation}deg)`,
    transformOrigin: item.transformOrigin ?? "center center",
  };
}

function headlineClassName(variant: HeroHeadline["variant"]): string {
  switch (variant) {
    case "statement":
      return "font-inter text-[32px] font-semibold uppercase leading-[1.375] tracking-normal text-text-primary";
    case "script":
      return "font-playwrite text-[18px] leading-none text-text-secondary italic";
    case "tagline":
      return "font-inter text-[32px] font-semibold uppercase leading-[1.375] tracking-normal text-text-primary";
    case "contact":
      return "font-instrument-sans text-[18px] font-medium lowercase leading-none text-text-primary";
    default:
      return "";
  }
}

function HeroHeadlineBlock({ headline }: { headline: HeroHeadline }) {
  return (
    <p
      className={`pointer-events-none z-40 ${headlineClassName(headline.variant)}`}
      style={artboardRect(headline.x, headline.y, headline.width)}
    >
      {headline.text}
    </p>
  );
}

function HeroCollageItemView({ item }: { item: HeroCollageItem }) {
  const positionStyle: CSSProperties = {
    ...artboardRect(item.x, item.y, item.width, item.height),
    ...collageTransform(item),
  };

  if (item.src) {
    return (
      <div
        className={`pointer-events-none overflow-hidden ${item.id === "mouse-arrow" ? "z-50" : "z-10"}`}
        style={positionStyle}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="block h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      title={item.alt}
      className="z-10 rounded-sm"
      style={{
        ...positionStyle,
        backgroundColor: item.placeholderColor,
      }}
    />
  );
}

function HeroGrid({ grid }: { grid: HeroContent["grid"] }) {
  const lineColor = "rgba(200, 201, 196, 0.35)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 box-border"
      style={{
        ...artboardRect(grid.x, grid.y, grid.width, grid.height),
        borderRight: `${px(1)} solid ${lineColor}`,
        borderBottom: `${px(1)} solid ${lineColor}`,
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${px(grid.cellSize)} ${px(grid.cellSize)}`,
      }}
    />
  );
}

function PuzzleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-9 w-9 fill-white"
    >
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-2 .9-2 2v4h1.5c1.38 0 2.5 1.12 2.5 2.5S4.88 16 3.5 16H2v4c0 1.1.9 2 2 2h4v-1.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V22h4c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
    </svg>
  );
}

function BrushIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 stroke-text-secondary"
      fill="none"
      strokeWidth="1.5"
    >
      <path d="M14.5 5.5l4 4M5 19l3-1 9.5-9.5a2.12 2.12 0 0 0-3-3L5 15l-1 3z" />
    </svg>
  );
}

function HeroDockButton({ item }: { item: HeroDockItem }) {
  const isPuzzle = item.icon === "puzzle";

  return (
    <a
      href={item.href}
      aria-label={item.label}
      className={
        isPuzzle
          ? "flex shrink-0 items-center justify-center rounded-2xl bg-[#ac7f5e] shadow-sm"
          : "flex shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"
      }
      style={{ width: px(60), height: px(60) }}
    >
      {isPuzzle ? <PuzzleIcon /> : <BrushIcon />}
    </a>
  );
}

function HeroDock({ dock }: { dock: HeroContent["dock"] }) {
  return (
    <nav
      aria-label="Hero tools"
      className="z-30 flex items-center rounded-[72px] border border-white/60 bg-white/55 shadow-[0_8px_32px_rgba(51,51,51,0.08)] backdrop-blur-[10px]"
      style={{
        ...artboardRect(dock.x, dock.y),
        gap: px(12),
        padding: `${px(8)} ${px(16)}`,
      }}
    >
      {dock.items.map((item) => (
        <HeroDockButton key={item.id} item={item} />
      ))}
    </nav>
  );
}

function HeroArtboardCanvas({ children }: { children: ReactNode }) {
  const { width, height } = content.artboard;

  // Fixed 1440×1168 px frame — no viewport scale; origin top-left matches Figma.
  return (
    <div className="mx-auto w-full max-w-[1440px] overflow-x-auto bg-bg-cream">
      <div className="relative shrink-0 bg-bg-cream" style={artboardCanvasStyle(width, height)}>
        {children}
      </div>
    </div>
  );
}

export default function Hero() {
  const { headlines, collage, grid, dock } = content;

  // All children below use artboardRect() — px absolute coords, not flex/grid placement.
  return (
    <section aria-label="Hero" className="w-full shrink-0 bg-bg-cream">
      <HeroArtboardCanvas>
        <HeroGrid grid={grid} />

        {collage
          .filter((item) => item.id !== "mouse-arrow")
          .map((item) => (
            <HeroCollageItemView key={item.id} item={item} />
          ))}

        {headlines.map((headline) => (
          <HeroHeadlineBlock key={headline.id} headline={headline} />
        ))}

        {collage
          .filter((item) => item.id === "mouse-arrow")
          .map((item) => (
            <HeroCollageItemView key={item.id} item={item} />
          ))}

        <HeroDock dock={dock} />
      </HeroArtboardCanvas>
    </section>
  );
}
