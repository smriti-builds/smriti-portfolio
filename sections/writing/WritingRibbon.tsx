"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type WritingRibbonProps = {
  src: string;
  width: number;
  height: number;
  variant: "top" | "bottom";
  priority?: boolean;
};

const RIBBON_IDLE_MOTION = {
  top: {
    y: [0, -4, 0, 2, 0] as number[],
    rotate: [0, 0.12, 0, -0.08, 0] as number[],
    transition: {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
    transformOrigin: "18% 55%",
  },
  bottom: {
    y: [0, 3, 0, -4, 0] as number[],
    rotate: [0, -0.1, 0, 0.08, 0] as number[],
    transition: {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1.4,
    },
    transformOrigin: "82% 45%",
  },
};

export default function WritingRibbon({
  src,
  width,
  height,
  variant,
  priority = false,
}: WritingRibbonProps) {
  const prefersReducedMotion = useReducedMotion();
  const idleMotion = RIBBON_IDLE_MOTION[variant];

  return (
    <div className="pointer-events-none w-full select-none" aria-hidden>
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: idleMotion.y,
                rotate: idleMotion.rotate,
              }
        }
        transition={prefersReducedMotion ? undefined : idleMotion.transition}
        style={{ transformOrigin: idleMotion.transformOrigin }}
      >
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          className="block h-auto w-full max-w-none"
          sizes="100vw"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
