import type { ReactNode } from "react";
import { SHADOW_BLEED, spreadHeight, spreadWidth } from "@/sections/journal/constants";

/**
 * Fixed-size stage centered in the journal section.
 * Extra vertical room so shadows are never clipped by the stage.
 */
export function JournalStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative mx-auto shrink-0 overflow-visible"
      style={{
        width: spreadWidth,
        minHeight: spreadHeight + SHADOW_BLEED * 2,
      }}
    >
      {children}
    </div>
  );
}
