export type HeroHeadlineVariant = "statement" | "script" | "tagline" | "contact";

export type HeroHeadline = {
  id: string;
  text: string;
  /** Horizontal position as % of the 1440px artboard width */
  left: number;
  /** Vertical position as % of the 1168px artboard height */
  top: number;
  /** Optional max width as % of artboard width */
  width?: number;
  variant: HeroHeadlineVariant;
};

export type HeroCollageItem = {
  id: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  /** Placeholder tint for development */
  placeholderColor: string;
  rotation?: number;
};

export type HeroDockItem = {
  id: string;
  label: string;
  href: string;
  kind: "social" | "action";
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
    width: number;
    height: number;
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
