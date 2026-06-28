"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { WorkPreviewFloater as FloaterConfig } from "@/lib/content/work-preview-floaters";

type WorkPreviewFloaterProps = {
  floater: FloaterConfig;
};

export default function WorkPreviewFloater({ floater }: WorkPreviewFloaterProps) {
  const prefersReducedMotion = useReducedMotion();
  const distance = floater.distance ?? 10;
  const duration = floater.duration ?? 4;
  const delay = floater.delay ?? 0;

  return (
    <motion.div
      className="pointer-events-none absolute z-10"
      style={{
        left: floater.left,
        top: floater.top,
        width: floater.width,
        height: floater.height,
        rotate: floater.rotate ?? 0,
      }}
      aria-hidden
      animate={
        prefersReducedMotion
          ? undefined
          : { y: [0, -distance, 0] }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <Image
        src={floater.src}
        alt={floater.alt}
        fill
        sizes="20vw"
        quality={100}
        unoptimized
        className="object-contain"
        draggable={false}
      />
    </motion.div>
  );
}
