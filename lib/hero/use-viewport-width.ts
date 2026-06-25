import { useEffect, useState } from "react";
import { HERO_BASELINE_WIDTH } from "@/lib/hero/clean-responsive";

/** Tracks viewport width for capped decorative-asset positioning. */
export function useViewportWidth(defaultWidth = HERO_BASELINE_WIDTH): number {
  const [width, setWidth] = useState(defaultWidth);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
