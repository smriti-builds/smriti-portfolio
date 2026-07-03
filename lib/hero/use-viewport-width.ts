import { useLayoutEffect, useState } from "react";
import { HERO_BASELINE_WIDTH } from "@/lib/hero/clean-responsive";

/** Figma clean artboard height (981:11114). */
export const HERO_CLEAN_ARTBOARD_HEIGHT = 1131;

/** Tracks viewport width for capped decorative-asset positioning. */
export function useViewportWidth(defaultWidth = HERO_BASELINE_WIDTH): number {
  const [width, setWidth] = useState(defaultWidth);

  useLayoutEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

/** Tracks viewport height for clean-hero scale-to-fit. */
export function useViewportHeight(defaultHeight = 800): number {
  const [height, setHeight] = useState(defaultHeight);

  useLayoutEffect(() => {
    const update = () => setHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return height;
}
