import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { journalBookmark } from "@/lib/content/journal";
import { spreadHeight } from "@/sections/journal/constants";

const { width, topPeek, bottomHang, src, intrinsicWidth, intrinsicHeight } =
  journalBookmark;

type BookmarkProps = {
  left: MotionValue<number>;
};

/**
 * Ribbon bookmark — starts on the closed spine, slides to the center gutter
 * between both pages when the journal is open.
 */
export function Bookmark({ left }: BookmarkProps) {
  const ribbonHeight = spreadHeight + topPeek + bottomHang;

  return (
    <>
      <motion.div
        className="pointer-events-none absolute overflow-hidden"
        style={{ left, top: -topPeek, width, height: topPeek, zIndex: 6 }}
        aria-hidden
      >
        <Image
          src={src}
          alt=""
          width={intrinsicWidth}
          height={intrinsicHeight}
          draggable={false}
          className="absolute left-0 top-0 w-full max-w-none"
          style={{ height: ribbonHeight }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left,
          top: spreadHeight,
          width,
          height: bottomHang,
          zIndex: 6,
        }}
        aria-hidden
      >
        <Image
          src={src}
          alt=""
          width={intrinsicWidth}
          height={intrinsicHeight}
          draggable={false}
          className="absolute bottom-0 left-0 w-full max-w-none"
          style={{ height: ribbonHeight }}
        />
      </motion.div>
    </>
  );
}
