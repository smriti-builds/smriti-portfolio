import type { ReactNode } from "react";
import { spreadHeight, spreadWidth } from "@/sections/journal/constants";

/**
 * Fixed-size centering slot for the journal.
 * Parent flex/grid centers this box; inner layers animate width without shifting.
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
