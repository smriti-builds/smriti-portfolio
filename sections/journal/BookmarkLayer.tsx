"use client";

import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { coverHeight, coverWidth, spreadHeight, spreadWidth } from "@/sections/journal/constants";
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

export function BookmarkLayerStatic({
  openProgress,
  responsive = false,
}: {
  openProgress: number;
  responsive?: boolean;
}) {
  const x = bookmarkLeftFromProgress(openProgress);
  const referenceWidth = openProgress >= 0.5 ? spreadWidth : coverWidth;
  const referenceHeight = openProgress >= 0.5 ? spreadHeight : coverHeight;
  const left = responsive ? `${(x / referenceWidth) * 100}%` : x;
  const bookmarkWidth = responsive ? `${(width / referenceWidth) * 100}%` : width;
  const topOffset = responsive ? `-${(topPeek / referenceHeight) * 100}%` : -topPeek;
  const topHeight = responsive ? `${(topPeek / referenceHeight) * 100}%` : topPeek;
  const bottomTop = responsive
    ? `calc(100% - ${(bottomTuckInset / referenceHeight) * 100}%)`
    : spreadHeight - bottomTuckInset;
  const bottomHeight = responsive
    ? `${(bottom.intrinsicHeight / referenceHeight) * 100}%`
    : bottom.intrinsicHeight;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transformStyle: "flat" }}
      aria-hidden
    >
      <div
        className="absolute overflow-hidden"
        style={{ left, top: topOffset, width: bookmarkWidth, height: topHeight }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={top.src}
          alt=""
          width={top.intrinsicWidth}
          height={top.intrinsicHeight}
          className="block size-full max-w-none object-fill"
          draggable={false}
        />
      </div>
      <div
        className="absolute"
        style={{
          left,
          top: bottomTop,
          width: bookmarkWidth,
          height: bottomHeight,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bottom.src}
          alt=""
          width={bottom.intrinsicWidth}
          height={bottom.intrinsicHeight}
          className="block size-full max-w-none object-fill"
          draggable={false}
        />
      </div>
    </div>
  );
}
