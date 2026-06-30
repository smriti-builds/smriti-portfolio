import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalBackCover } from "@/lib/content/journal";
import { coverHeight, coverWidth, JOURNAL_BORDER_RADIUS } from "@/sections/journal/constants";

type BackCoverProps = {
  opacity?: MotionValue<number>;
};

/** Exterior back board — hidden when the journal is closed. */
export function BackCover({ opacity }: BackCoverProps) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0"
      style={{
        left: coverWidth,
        width: coverWidth,
        height: coverHeight,
        opacity: opacity ?? 0,
        zIndex: 1,
      }}
      aria-hidden
    >
      <Image
        src={journalBackCover.src}
        alt=""
        width={journalBackCover.intrinsicWidth}
        height={journalBackCover.intrinsicHeight}
        className="size-full object-cover object-right"
        style={{
          borderRadius: `0 ${JOURNAL_BORDER_RADIUS}px ${JOURNAL_BORDER_RADIUS}px 0`,
        }}
        draggable={false}
      />
    </motion.div>
  );
}
