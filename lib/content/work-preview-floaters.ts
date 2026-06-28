import type { WorkProjectPreview } from "@/types/work";

/** Figma mask group artboard — 1060:14653+ */
const ARTBOARD_WIDTH = 616.5;
const ARTBOARD_HEIGHT = 400;

export type WorkPreviewFloater = {
  src: string;
  alt: string;
  /** Percentage placement within the 616.5×400 preview frame */
  left: string;
  top: string;
  width: string;
  height: string;
  rotate?: number;
  /** Seconds — stagger so elements don't move in sync */
  delay?: number;
  duration?: number;
  /** Peak vertical travel in px at display size */
  distance?: number;
};

function pct(value: number, base: number): string {
  return `${(value / base) * 100}%`;
}

/** Side decorative assets — Figma node positions converted to % */
export const workPreviewFloaters: Record<
  WorkProjectPreview,
  WorkPreviewFloater[]
> = {
  "ai-commentary": [
    {
      src: "/Work/floaters/ai-commentary-ball-top.png",
      alt: "",
      left: pct(449, ARTBOARD_WIDTH),
      top: pct(126, ARTBOARD_HEIGHT),
      width: pct(90, ARTBOARD_WIDTH),
      height: pct(90, ARTBOARD_HEIGHT),
      delay: 0,
      duration: 3.8,
      distance: 9,
    },
    {
      src: "/Work/floaters/ai-commentary-bat.png",
      alt: "",
      left: pct(0, ARTBOARD_WIDTH),
      top: pct(287, ARTBOARD_HEIGHT),
      width: pct(151, ARTBOARD_WIDTH),
      height: pct(151, ARTBOARD_HEIGHT),
      delay: 0.6,
      duration: 4.2,
      distance: 11,
    },
  ],
  "padel-platform": [
    {
      src: "/Work/floaters/padel-ball-top.png",
      alt: "",
      left: pct(448.5, ARTBOARD_WIDTH),
      top: pct(25, ARTBOARD_HEIGHT),
      width: pct(92, ARTBOARD_WIDTH),
      height: pct(92, ARTBOARD_HEIGHT),
      delay: 0.2,
      duration: 3.6,
      distance: 8,
    },
    {
      src: "/Work/floaters/padel-ball-bottom.png",
      alt: "",
      left: pct(73.5, ARTBOARD_WIDTH),
      top: pct(291, ARTBOARD_HEIGHT),
      width: pct(90, ARTBOARD_WIDTH),
      height: pct(90, ARTBOARD_HEIGHT),
      delay: 0.9,
      duration: 4,
      distance: 10,
    },
  ],
  checkout: [
    {
      src: "/Work/floaters/checkout-grocery-bag.png",
      alt: "",
      left: pct(18.81, ARTBOARD_WIDTH),
      top: pct(247.31, ARTBOARD_HEIGHT),
      width: pct(215.38, ARTBOARD_WIDTH),
      height: pct(215.38, ARTBOARD_HEIGHT),
      rotate: -9.97,
      delay: 0,
      duration: 4.4,
      distance: 12,
    },
    {
      src: "/Work/floaters/checkout-receipt.png",
      alt: "",
      left: pct(426.51, ARTBOARD_WIDTH),
      top: pct(103.01, ARTBOARD_HEIGHT),
      width: pct(138.98, ARTBOARD_WIDTH),
      height: pct(138.98, ARTBOARD_HEIGHT),
      rotate: 12.14,
      delay: 0.7,
      duration: 3.9,
      distance: 9,
    },
  ],
  "interview-scheduler": [],
};
