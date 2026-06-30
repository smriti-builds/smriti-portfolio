import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { spreadHeight, spreadWidth } from "@/sections/journal/constants";

type JournalViewportProps = {
  width: number | MotionValue<number>;
  children: ReactNode;
};

/**
 * Clips the journal horizontally. Closed = one cover width (front cover only).
 * Expands to full spread width as the cover opens.
 */
export function JournalViewport({ width, children }: JournalViewportProps) {
  return (
    <motion.div
      className="relative overflow-hidden"
      style={{ width, height: spreadHeight }}
    >
      <div
        className="relative left-0 top-0"
        style={{ width: spreadWidth, height: spreadHeight }}
      >
        {children}
      </div>
    </motion.div>
  );
}
