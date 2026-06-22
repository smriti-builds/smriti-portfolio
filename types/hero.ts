export type HeroHeadlineVariant = "statement" | "script" | "tagline" | "contact";

export type HeroHeadline = {
  id: string;
  text: string;
  /** Horizontal position as % of the artboard width */
  left: number;
  /** Vertical position as % of the artboard height */
  top: number;
  /** Optional max width as % of artboard width */
  width?: number;
  variant: HeroHeadlineVariant;
};

export type HeroCollageVariant = "asset" | "sticky-note";

export type HeroCollageItem = {
  id: string;
  alt: string;
  /** Path under /public, e.g. /Hero/hero-image-painting.png */
  src?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  placeholderColor: string;
  /** Degrees, clockwise — matches Figma rotation */
  rotation?: number;
  /** CSS transform-origin, defaults to center (Figma default) */
  transformOrigin?: string;
  variant?: HeroCollageVariant;
  noteLines?: string[];
};

export type HeroDockItem = {
  id: string;
  label: string;
  href: string;
  /** puzzle = brown icon button, brush = white icon button */
  icon: "puzzle" | "brush";
};

export type HeroContent = {
  artboard: {
    width: number;
    height: number;
  };
  headlines: HeroHeadline[];
  collage: HeroCollageItem[];
  dock: {
    left: number;
    top: number;
    items: HeroDockItem[];
  };
  grid: {
    left: number;
    top: number;
    width: number;
    height: number;
    cellSize: number;
  };
};
