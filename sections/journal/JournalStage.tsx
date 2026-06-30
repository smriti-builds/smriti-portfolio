import type { ReactNode } from "react";
import { SHADOW_BLEED, spreadHeight, spreadWidth } from "@/sections/journal/constants";

/**
 * Stage fills the section frame and vertically centers the journal.
 */
export function JournalStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative mx-auto flex items-center justify-center overflow-visible"
      style={{
        width: spreadWidth,
        height: spreadHeight + SHADOW_BLEED * 2,
      }}
    >
      {children}
    </div>
  );
}
