import type { ReactNode } from "react";
import { spreadHeight, spreadWidth } from "@/sections/journal/constants";

/** Fixed full-spread stage — closed centering handled via scene offset in JournalBook. */
export function JournalViewport({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative overflow-visible"
      style={{ width: spreadWidth, height: spreadHeight }}
    >
      {children}
    </div>
  );
}
