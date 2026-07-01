"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { SHADOW_BLEED } from "@/sections/journal/constants";
import {
  bookmarkLeftStatic,
  useBookmarkLeft,
} from "@/sections/journal/useBookmarkCenterX";

const { top, width, topPeek } = journalBookmark;

type TopBookmarkProps = {
  openProgress: MotionValue<number>;
  sceneOffsetX: MotionValue<number>;
};

/** Small tab peeking above the journal — tucked behind the cover. */
export function TopBookmark({ openProgress, sceneOffsetX }: TopBookmarkProps) {
  const left = useBookmarkLeft(openProgress, sceneOffsetX);

  return (
    <motion.div
      className="pointer-events-none absolute z-[1]"
      style={{
        left,
        top: SHADOW_BLEED - topPeek,
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

export function TopBookmarkStatic({
  open,
  sceneOffsetX = 0,
}: {
  open: boolean;
  sceneOffsetX?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute z-[1]"
      style={{
        left: bookmarkLeftStatic(open, sceneOffsetX),
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
