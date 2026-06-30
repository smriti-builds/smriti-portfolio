import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalSpine } from "@/lib/content/journal";
import { JOURNAL_SPINE_WIDTH, spreadHeight } from "@/sections/journal/constants";

type SpineProps = {
  opacity: MotionValue<number>;
};

/** Spine on the closed left edge — fades out early when opening, never moves. */
export function Spine({ opacity }: SpineProps) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0"
      style={{
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
