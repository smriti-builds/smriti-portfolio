import { motion, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { spreadHeight } from "@/sections/journal/constants";

type JournalViewportProps = {
  width: number | MotionValue<number>;
  children: ReactNode;
};

/** Width wrapper for the closed → open journal footprint. */
export function JournalViewport({ width, children }: JournalViewportProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center overflow-visible"
      style={{ width, height: spreadHeight }}
    >
      {children}
    </motion.div>
  );
}
