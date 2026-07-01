"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { spreadHeight } from "@/sections/journal/constants";
import { bookmarkLeftFromProgress } from "@/sections/journal/useBookmarkCenterX";

const { bottom, width, bottomTuckInset } = journalBookmark;

type BottomBookmarkProps = {
  left: MotionValue<number>;
};

/** Swallowtail ribbon inserted into the page stack at the bottom edge. */
export function BottomBookmark({ left }: BottomBookmarkProps) {
  return (
    <motion.div
      className="pointer-events-none absolute z-[3]"
      style={{
        left,
        top: spreadHeight - bottomTuckInset,
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

export function BottomBookmarkStatic({ openProgress }: { openProgress: number }) {
  return (
    <div
      className="pointer-events-none absolute z-[3]"
      style={{
        left: bookmarkLeftFromProgress(openProgress),
        top: spreadHeight - bottomTuckInset,
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
