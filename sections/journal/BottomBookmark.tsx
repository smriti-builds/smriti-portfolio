"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { SHADOW_BLEED, spreadHeight } from "@/sections/journal/constants";
import {
  bookmarkLeftStatic,
  useBookmarkLeft,
} from "@/sections/journal/useBookmarkCenterX";

const { bottom, width } = journalBookmark;

type BottomBookmarkProps = {
  openProgress: MotionValue<number>;
  sceneOffsetX: MotionValue<number>;
};

/** Swallowtail ribbon hanging below the journal — behind the cover. */
export function BottomBookmark({
  openProgress,
  sceneOffsetX,
}: BottomBookmarkProps) {
  const left = useBookmarkLeft(openProgress, sceneOffsetX);

  return (
    <motion.div
      className="pointer-events-none absolute z-[1]"
      style={{
        left,
        top: SHADOW_BLEED + spreadHeight,
        width,
        height: bottom.intrinsicHeight,
      }}
      aria-hidden
    >
      <Image
        src={bottom.src}
        alt=""
        width={bottom.intrinsicWidth}
        height={bottom.intrinsicHeight}
        className="block size-auto max-w-none"
        draggable={false}
      />
    </motion.div>
  );
}

export function BottomBookmarkStatic({
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
        top: spreadHeight,
        width,
        height: bottom.intrinsicHeight,
      }}
      aria-hidden
    >
      <Image
        src={bottom.src}
        alt=""
        width={bottom.intrinsicWidth}
        height={bottom.intrinsicHeight}
        className="block size-auto max-w-none"
        draggable={false}
      />
    </div>
  );
}
