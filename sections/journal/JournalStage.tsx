import type { ReactNode } from "react";
import { spreadHeight, spreadWidth } from "@/sections/journal/constants";

/**
 * Fixed-size, fixed-position viewport in the hero section.
 * Never resizes or re-centers — only inner clip + wrapper animate.
 */
export function JournalStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative shrink-0 overflow-visible"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      {children}
    </div>
  );
}
