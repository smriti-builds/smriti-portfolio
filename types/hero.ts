/** Layout coordinates are always px on the 1440 × 1168 artboard (Figma x/y/width/height). Do not convert units. */
export type HeroRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HeroPoint = {
  x: number;
  y: number;
};

export type HeroHeadlineVariant = "statement" | "script" | "tagline" | "contact";

export type HeroHeadline = {
  id: string;
  text: string;
  x: number;
  y: number;
  /** Text box width in px */
  width?: number;
  variant: HeroHeadlineVariant;
};

export type HeroCollageVariant = "asset" | "sticky-note";

export type HeroCollageItem = HeroRect & {
  id: string;
  alt: string;
  /** Path under /public, e.g. /Hero/hero-image-painting.png */
  src?: string;
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
  dock: HeroPoint & {
    items: HeroDockItem[];
  };
  grid: HeroRect & {
    cellSize: number;
  };
};
