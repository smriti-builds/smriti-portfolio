import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalSpine } from "@/lib/content/journal";
import { JOURNAL_SPINE_WIDTH, spreadHeight } from "@/sections/journal/constants";

type SpineProps = {
  left: MotionValue<number>;
  opacity: MotionValue<number>;
};

/**
 * Stationary spine — visible on the closed left edge, moves to the center
 * gutter while opening, then fades out when fully open.
 */
export function Spine({ left, opacity }: SpineProps) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0"
      style={{
        left,
        width: JOURNAL_SPINE_WIDTH,
        height: spreadHeight,
        opacity,
        zIndex: 3,
      }}
      aria-hidden
    >
      <Image
        src={journalSpine.src}
        alt=""
        width={journalSpine.intrinsicWidth}
        height={journalSpine.intrinsicHeight}
        className="size-full object-cover object-left"
        draggable={false}
      />
    </motion.div>
  );
}
