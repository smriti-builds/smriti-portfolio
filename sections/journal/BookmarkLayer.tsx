"use client";

import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { spreadHeight } from "@/sections/journal/constants";
import { bookmarkLeftFromProgress } from "@/sections/journal/useBookmarkCenterX";

const { top, bottom, width, topPeek, bottomTuckInset } = journalBookmark;

type BookmarkLayerProps = {
  left: MotionValue<number>;
};

/**
 * Exactly two ribbons on the page stack — top tab + bottom tail.
 * Transform positioning on a flat plane behind the cover.
 */
export function BookmarkLayer({ left }: BookmarkLayerProps) {
  const bottomY = spreadHeight - bottomTuckInset;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transformStyle: "flat", backfaceVisibility: "hidden" }}
      aria-hidden
    >
      <motion.div
        className="absolute overflow-hidden"
        style={{
          x: left,
          y: -topPeek,
          width,
          height: topPeek,
          backfaceVisibility: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
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
        className="absolute"
        style={{
          x: left,
          y: bottomY,
          width,
          height: bottom.intrinsicHeight,
          backfaceVisibility: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bottom.src}
          alt=""
          width={bottom.intrinsicWidth}
          height={bottom.intrinsicHeight}
          className="block max-w-none"
          style={{ width, height: bottom.intrinsicHeight }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

export function BookmarkLayerStatic({ openProgress }: { openProgress: number }) {
  const x = bookmarkLeftFromProgress(openProgress);
  const bottomY = spreadHeight - bottomTuckInset;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transformStyle: "flat" }}
      aria-hidden
    >
      <div
        className="absolute overflow-hidden"
        style={{ left: x, top: -topPeek, width, height: topPeek }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
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
        className="absolute"
        style={{
          left: x,
          top: bottomY,
          width,
          height: bottom.intrinsicHeight,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bottom.src}
          alt=""
          width={bottom.intrinsicWidth}
          height={bottom.intrinsicHeight}
          className="block max-w-none"
          style={{ width, height: bottom.intrinsicHeight }}
          draggable={false}
        />
      </div>
    </div>
  );
}
