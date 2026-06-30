import type { ReactNode } from "react";
import { spreadHeight, spreadWidth } from "@/sections/journal/constants";

/**
 * Fixed-size stage centered in the journal section.
 * Never resizes — only inner layers animate.
 */
export function JournalStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative mx-auto shrink-0 overflow-visible"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      {children}
    </div>
  );
}
