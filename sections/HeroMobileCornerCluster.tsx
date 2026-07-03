"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { HeroMobileCorner } from "@/lib/content/hero-clean-mobile";
import { useHeroMobileLayout } from "@/sections/hero-mobile-layout-context";

const CORNER_POSITION: Record<HeroMobileCorner, string> = {
  "top-left": "left-0 top-0",
  "top-right": "right-0 top-0",
  "bottom-left": "left-0 bottom-0",
  "bottom-right": "right-0 bottom-0",
};

export default function HeroMobileCornerCluster({
  corner,
  children,
}: {
  corner: HeroMobileCorner;
  children: ReactNode;
}) {
  const { layout } = useHeroMobileLayout();
  const config = layout.corners[corner];
  const reduceMotion = useReducedMotion();
  const pullX = config.edgePullX ?? 0;
  const pullY = config.edgePullY ?? 0;

  return (
    <motion.div
      className={`hero-mobile-collage-idle pointer-events-none absolute ${CORNER_POSITION[corner]}`}
      style={{
        width: config.width,
        height: config.height,
        margin: layout.edgeInset,
      }}
      animate={
        reduceMotion
          ? { x: pullX, y: pullY }
          : {
              x: [pullX, pullX + config.floatX, pullX],
              y: [pullY, pullY + config.floatY, pullY],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: config.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: config.floatDelay,
            }
      }
    >
      <div className="relative h-full w-full overflow-visible">{children}</div>
    </motion.div>
  );
}
