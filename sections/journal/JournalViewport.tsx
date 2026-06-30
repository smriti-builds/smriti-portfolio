import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { SHADOW_BLEED, spreadHeight } from "@/sections/journal/constants";

type JournalViewportProps = {
  width: number | MotionValue<number>;
  children: ReactNode;
};

/** Width wrapper for the closed → open journal footprint. Never clips shadows. */
export function JournalViewport({ width, children }: JournalViewportProps) {
  return (
    <motion.div
      className="relative overflow-visible"
      style={{ width, minHeight: spreadHeight + SHADOW_BLEED }}
    >
      {children}
    </motion.div>
  );
}
