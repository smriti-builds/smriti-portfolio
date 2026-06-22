import Image from "next/image";
import type { CSSProperties } from "react";
import type {
  HeroCollageItem,
  HeroContent,
  HeroDockItem,
  HeroHeadline,
} from "@/types/hero";
import { heroContent } from "@/lib/content/hero";

const content = heroContent;

function artboardPosition(
  left: number,
  top: number,
  width?: number,
  height?: number,
): CSSProperties {
  return {
    left: `${left}%`,
    top: `${top}%`,
    ...(width !== undefined ? { width: `${width}%` } : {}),
    ...(height !== undefined ? { height: `${height}%` } : {}),
  };
}

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
      return "font-inter text-[clamp(1.125rem,2.222vw,2rem)] font-semibold uppercase leading-[1.375] tracking-normal text-text-primary";
    case "script":
      return "font-playwrite text-[clamp(0.75rem,1.25vw,1.125rem)] leading-none text-text-secondary italic";
    case "tagline":
      return "font-inter text-[clamp(1.125rem,2.222vw,2rem)] font-semibold uppercase leading-[1.375] tracking-normal text-text-primary";
    case "contact":
      return "font-instrument-sans text-[clamp(0.75rem,1.25vw,1.125rem)] font-medium lowercase leading-none text-text-primary";
    default:
      return "";
  }
}

function HeroHeadlineBlock({ headline }: { headline: HeroHeadline }) {
  return (
    <p
      className={`pointer-events-none absolute z-40 ${headlineClassName(headline.variant)}`}
      style={artboardPosition(headline.left, headline.top, headline.width)}
    >
      {headline.text}
    </p>
  );
}

function HeroCollageItemView({ item }: { item: HeroCollageItem }) {
  const positionStyle: CSSProperties = {
    ...artboardPosition(item.left, item.top, item.width, item.height),
    ...collageTransform(item),
  };

  if (item.src) {
    return (
      <div
        className="pointer-events-none absolute z-10"
        style={positionStyle}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 1440px) 10vw, 110px"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      title={item.alt}
      className="absolute z-10 rounded-sm"
      style={{
        ...positionStyle,
        backgroundColor: item.placeholderColor,
      }}
    />
  );
}

function HeroGrid({ grid }: { grid: HeroContent["grid"] }) {
  const cellWidthPercent = (grid.cellSize / content.artboard.width) * 100;
  const cellHeightPercent = (grid.cellSize / content.artboard.height) * 100;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-0 rounded-sm border border-grid-gray/30"
      style={artboardPosition(grid.left, grid.top, grid.width, grid.height)}
    >
      <div
        className="h-full w-full opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c8c9c4 1px, transparent 1px),
            linear-gradient(to bottom, #c8c9c4 1px, transparent 1px)
          `,
          backgroundSize: `${cellWidthPercent}% ${cellHeightPercent}%`,
        }}
      />
    </div>
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
          ? "flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-[#ac7f5e] shadow-sm"
          : "flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm"
      }
    >
      {isPuzzle ? <PuzzleIcon /> : <BrushIcon />}
    </a>
  );
}

function HeroDock({ dock }: { dock: HeroContent["dock"] }) {
  return (
    <nav
      aria-label="Hero tools"
      className="absolute z-30 flex -translate-x-1/2 items-center gap-3 rounded-[72px] border border-white/60 bg-white/55 px-4 py-2 shadow-[0_8px_32px_rgba(51,51,51,0.08)] backdrop-blur-[10px]"
      style={{
        left: `${dock.left}%`,
        top: `${dock.top}%`,
      }}
    >
      {dock.items.map((item) => (
        <HeroDockButton key={item.id} item={item} />
      ))}
    </nav>
  );
}

export default function Hero() {
  const { artboard, headlines, collage, grid, dock } = content;

  return (
    <section aria-label="Hero" className="w-full bg-bg-cream">
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-bg-cream"
        style={{ aspectRatio: `${artboard.width} / ${artboard.height}` }}
      >
        <HeroGrid grid={grid} />

        {collage.map((item) => (
          <HeroCollageItemView key={item.id} item={item} />
        ))}

        {headlines.map((headline) => (
          <HeroHeadlineBlock key={headline.id} headline={headline} />
        ))}

        <HeroDock dock={dock} />
      </div>
    </section>
  );
}
