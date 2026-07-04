import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalSpine } from "@/lib/content/journal";
import { coverWidth, JOURNAL_SPINE_WIDTH } from "@/sections/journal/constants";

type SpineProps = {
  opacity: MotionValue<number>;
  scaleToContainer?: boolean;
};

/** Spine on the closed left edge — fades out early when opening, never moves. */
export function Spine({ opacity, scaleToContainer = false }: SpineProps) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 h-full"
      style={{
        width: scaleToContainer
          ? `${(JOURNAL_SPINE_WIDTH / coverWidth) * 100}%`
          : JOURNAL_SPINE_WIDTH,
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
