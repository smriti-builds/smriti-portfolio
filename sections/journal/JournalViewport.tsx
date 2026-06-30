import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { spreadHeight } from "@/sections/journal/constants";

type JournalViewportProps = {
  width: number | MotionValue<number>;
  children: ReactNode;
};

/**
 * Clips the journal wrapper horizontally. Width animates closed → open reveal;
 * the hero-centered stage itself never resizes.
 */
export function JournalViewport({ width, children }: JournalViewportProps) {
  if (typeof width === "number") {
    return (
      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width, height: spreadHeight }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute left-0 top-0 overflow-hidden"
      style={{ width, height: spreadHeight }}
    >
      {children}
    </motion.div>
  );
}
