"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { spreadHeight } from "@/sections/journal/constants";
import {
  bookmarkLeftFromProgress,
  useBookmarkLeft,
} from "@/sections/journal/useBookmarkCenterX";

const { top, bottom, width, topPeek, bottomTuckInset } = journalBookmark;

type BookmarkLayerProps = {
  left: MotionValue<number>;
};

/**
 * Page-stack ribbons — one top tab + one bottom tail.
 * Siblings behind the cover; no connecting strip.
 */
export function BookmarkLayer({ left }: BookmarkLayerProps) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute z-[1]"
        style={{ left, top: -topPeek, width, height: topPeek, overflow: "hidden" }}
        aria-hidden
      >
        <Image
          src={top.src}
          alt=""
          width={top.intrinsicWidth}
          height={top.intrinsicHeight}
          className="block max-w-none"
          style={{ width, height: top.intrinsicHeight }}
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute z-[1]"
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
          className="block max-w-none"
          style={{ width, height: bottom.intrinsicHeight }}
          draggable={false}
        />
      </motion.div>
    </>
  );
}

export function BookmarkLayerStatic({ openProgress }: { openProgress: number }) {
  const left = bookmarkLeftFromProgress(openProgress);

  return (
    <>
      <div
        className="pointer-events-none absolute z-[1]"
        style={{ left, top: -topPeek, width, height: topPeek, overflow: "hidden" }}
        aria-hidden
      >
        <Image
          src={top.src}
          alt=""
          width={top.intrinsicWidth}
          height={top.intrinsicHeight}
          className="block max-w-none"
          style={{ width, height: top.intrinsicHeight }}
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute z-[1]"
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
          className="block max-w-none"
          style={{ width, height: bottom.intrinsicHeight }}
          draggable={false}
        />
      </div>
    </>
  );
}
