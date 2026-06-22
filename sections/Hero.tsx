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

function headlineClassName(variant: HeroHeadline["variant"]): string {
  switch (variant) {
    case "statement":
      return "font-inter text-[clamp(1.25rem,2.222vw,2rem)] font-semibold uppercase leading-[1.375] tracking-normal text-text-primary";
    case "script":
      return "font-playwrite text-[clamp(1rem,1.667vw,1.5rem)] leading-[1.167] text-text-primary";
    case "tagline":
      return "font-inter text-[clamp(1.25rem,2.222vw,2rem)] font-semibold uppercase leading-[1.375] tracking-normal text-text-primary";
    case "contact":
      return "font-instrument-sans text-[clamp(0.875rem,1.25vw,1.125rem)] font-medium lowercase leading-[2.444] text-text-primary";
    default:
      return "";
  }
}

function HeroHeadlineBlock({ headline }: { headline: HeroHeadline }) {
  return (
    <p
      className={`absolute ${headlineClassName(headline.variant)}`}
      style={artboardPosition(headline.left, headline.top, headline.width)}
    >
      {headline.text}
    </p>
  );
}

function HeroCollagePlaceholder({ item }: { item: HeroCollageItem }) {
  return (
    <div
      aria-hidden="true"
      className="absolute overflow-hidden rounded-sm shadow-sm"
      style={{
        ...artboardPosition(item.left, item.top, item.width, item.height),
        backgroundColor: item.placeholderColor,
        transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined,
      }}
    />
  );
}

function HeroGrid({ grid }: { grid: HeroContent["grid"] }) {
  const cellPercent = (grid.cellSize / content.artboard.width) * 100;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute overflow-hidden opacity-40"
      style={{
        ...artboardPosition(grid.left, grid.top, grid.width, grid.height),
        perspective: "900px",
      }}
    >
      <div
        className="h-[140%] w-full origin-bottom-left"
        style={{
          transform: "rotateX(58deg) rotateZ(-32deg)",
          backgroundImage: `
            linear-gradient(to right, #c8c9c4 1px, transparent 1px),
            linear-gradient(to bottom, #c8c9c4 1px, transparent 1px)
          `,
          backgroundSize: `${cellPercent}% ${(grid.cellSize / content.artboard.height) * 100}%`,
        }}
      />
    </div>
  );
}

function DockIcon({ item }: { item: HeroDockItem }) {
  const isAction = item.kind === "action";

  return (
    <a
      href={item.href}
      aria-label={item.label}
      className={
        isAction
          ? "flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-white/90 text-[11px] font-medium uppercase tracking-wide text-text-primary shadow-sm"
          : "flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-2xl bg-neutral-100 text-[10px] font-medium text-text-secondary"
      }
    >
      {item.label.slice(0, 2)}
    </a>
  );
}

function HeroDock({ dock }: { dock: HeroContent["dock"] }) {
  const socialItems = dock.items.filter((item) => item.kind === "social");
  const actionItems = dock.items.filter((item) => item.kind === "action");

  return (
    <nav
      aria-label="Social and contact links"
      className="absolute flex h-auto min-h-0 items-center gap-3 rounded-[72px] border border-white/60 bg-white/55 px-[18px] py-2 shadow-[0_8px_32px_rgba(51,51,51,0.08)] backdrop-blur-[10px]"
      style={artboardPosition(dock.left, dock.top, dock.width)}
    >
      <div className="flex items-center gap-[18px]">
        {socialItems.map((item) => (
          <DockIcon key={item.id} item={item} />
        ))}
      </div>
      <span
        aria-hidden="true"
        className="mx-1 h-[46px] w-px shrink-0 bg-neutral-300/80"
      />
      <div className="flex items-center gap-3">
        {actionItems.map((item) => (
          <DockIcon key={item.id} item={item} />
        ))}
      </div>
    </nav>
  );
}

export default function Hero() {
  const { artboard, headlines, collage, grid, dock } = content;

  return (
    <section
      aria-label="Hero"
      className="relative w-full bg-bg-cream"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-bg-cream"
        style={{ aspectRatio: `${artboard.width} / ${artboard.height}` }}
      >
        {/* Background wash — Figma image 1782 placeholder */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#f7f3ea] via-bg-cream to-[#efebe1]"
        />

        <HeroGrid grid={grid} />

        {collage.map((item) => (
          <HeroCollagePlaceholder key={item.id} item={item} />
        ))}

        {headlines.map((headline) => (
          <HeroHeadlineBlock key={headline.id} headline={headline} />
        ))}

        <HeroDock dock={dock} />

        {/* Mobile: keep readable stack without breaking desktop proportions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-cream to-transparent md:hidden" />
      </div>
    </section>
  );
}
