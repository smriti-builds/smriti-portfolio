"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { spreadHeight } from "@/sections/journal/constants";
import { bookmarkLeftFromProgress } from "@/sections/journal/useBookmarkCenterX";

const { top, width, topPeek } = journalBookmark;

type TopBookmarkProps = {
  left: MotionValue<number>;
};

/** Tab emerging from the page stack — not attached to the cover. */
export function TopBookmark({ left }: TopBookmarkProps) {
  return (
    <motion.div
      className="pointer-events-none absolute z-[3]"
      style={{
        left,
        top: -topPeek,
        width,
        height: top.intrinsicHeight,
      }}
      aria-hidden
    >
      <Image
        src={top.src}
        alt=""
        width={top.intrinsicWidth}
        height={top.intrinsicHeight}
        className="block size-auto max-w-none"
        draggable={false}
      />
    </motion.div>
  );
}

export function TopBookmarkStatic({ openProgress }: { openProgress: number }) {
  return (
    <div
      className="pointer-events-none absolute z-[3]"
      style={{
        left: bookmarkLeftFromProgress(openProgress),
        top: -topPeek,
        width,
        height: top.intrinsicHeight,
      }}
      aria-hidden
    >
      <Image
        src={top.src}
        alt=""
        width={top.intrinsicWidth}
        height={top.intrinsicHeight}
        className="block size-auto max-w-none"
        draggable={false}
      />
    </div>
  );
}
