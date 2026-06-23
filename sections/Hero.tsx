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
import { heroGridCutoutOutlineSegments, heroGridCutoutPaths } from "@/lib/hero/cutout-paths";
import { artboardCanvasStyle, artboardRect, px } from "@/lib/hero/layout";
import type {
  HeroCollageItem,
  HeroContent,
  HeroHeadline,
} from "@/types/hero";
import HeroDock from "@/sections/HeroDock";

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

const HERO_GRID_LINE_HEIGHT = 44;
/** Matches Figma text frame line spacing (981:1303–981:1308). */
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
    default:
      return "";
  }
}

function isGridHeadline(variant: HeroHeadline["variant"]): boolean {
  return variant === "statement" || variant === "tagline";
}

function HeroHeadlineBlock({ headline }: { headline: HeroHeadline }) {
  const className = headlineClassName(headline.variant);

  if (headline.lines?.length) {
    const blockWidth = headline.width ?? headline.lines[0]?.width;
    const rowHeight = isGridHeadline(headline.variant)
      ? HERO_GRID_ROW_HEIGHT
      : HERO_GRID_LINE_HEIGHT;
    const alignLeft = headline.align === "left";

    return (
      <>
        {headline.lines.map((line, index) => {
          const lineWidth = line.width ?? blockWidth;
          const lineX =
            alignLeft || blockWidth === undefined || lineWidth === undefined
              ? headline.x
              : lineWidth < blockWidth
                ? headline.x + (blockWidth - lineWidth) / 2
                : headline.x;
          const lineY = headline.y + index * rowHeight;

          return (
            <p
              key={line.text}
              className={`pointer-events-none z-40 flex items-center ${alignLeft ? "justify-start" : "justify-center"} ${className}`}
              style={{
                ...artboardRect(lineX, lineY, lineWidth, rowHeight),
                lineHeight: px(HERO_GRID_LINE_HEIGHT),
              }}
            >
              {line.text}
            </p>
          );
        })}
      </>
    );
  }

  return (
    <p
      className={`pointer-events-none z-40 ${headline.variant === "script" ? "whitespace-normal" : `flex items-center ${headline.align === "left" ? "justify-start" : "justify-center text-center"}`} ${className}`}
      style={{
        ...artboardRect(
          headline.x,
          headline.y,
          headline.width,
          headline.variant === "contact" ? 44 : undefined,
        ),
        ...(isGridHeadline(headline.variant)
          ? { lineHeight: px(HERO_GRID_LINE_HEIGHT) }
          : headline.variant === "script"
            ? { lineHeight: px(32) }
            : headline.variant === "contact"
              ? { lineHeight: px(44) }
              : {}),
      }}
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

function HeroGridCutoutShape({
  shape,
  lineColor,
}: {
  shape: HeroContent["grid"]["cutoutShape"];
  lineColor: string;
}) {
  const outlineSegments = heroGridCutoutOutlineSegments();

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute z-[1]"
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
    </svg>
  );
}

function HeroGrid({ grid }: { grid: HeroContent["grid"] }) {
  const lineColor = "rgba(200, 201, 196, 0.35)";

  return (
    <>
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
      <HeroGridCutoutShape shape={grid.cutoutShape} lineColor={lineColor} />
    </>
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
