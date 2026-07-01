import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  journalBookmark,
  journalBookmarkDisplay,
} from "@/lib/content/journal";
import { spreadHeight } from "@/sections/journal/constants";

type BookmarkProps = {
  openProgress: MotionValue<number>;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
};

const {
  top,
  bottom,
  width,
  topPeek,
  bottomHang,
  bodyGradient,
  closedCenterX,
} = journalBookmark;
const { openCenterX } = journalBookmarkDisplay;

function BookmarkPieces() {
  return (
    <>
      <Image
        src={top.src}
        alt=""
        width={top.intrinsicWidth}
        height={top.intrinsicHeight}
        className="block w-full object-fill"
        style={{ height: topPeek }}
        draggable={false}
      />
      <div
        style={{
          width,
          height: spreadHeight,
          background: bodyGradient,
        }}
      />
      <Image
        src={bottom.src}
        alt=""
        width={bottom.intrinsicWidth}
        height={bottom.intrinsicHeight}
        className="block w-full object-fill"
        style={{ height: bottomHang }}
        draggable={false}
      />
    </>
  );
}

/** Sage ribbon — spine-adjacent when closed, centered on spine when open. */
export function Bookmark({
  openProgress,
  parallaxX,
  parallaxY,
}: BookmarkProps) {
  const bookmarkLeft = useTransform(() => {
    const p = openProgress.get();
    const centerX = closedCenterX + (openCenterX - closedCenterX) * p;
    const parallax = parallaxX ? parallaxX.get() * 0.4 : 0;
    return centerX - width / 2 + parallax;
  });

  const bookmarkTop = useTransform(() => {
    const parallax = parallaxY ? parallaxY.get() * 0.35 : 0;
    return -topPeek + parallax;
  });

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: bookmarkLeft,
        top: bookmarkTop,
        width,
        zIndex: 6,
      }}
      aria-hidden
    >
      <BookmarkPieces />
    </motion.div>
  );
}

/** Static bookmark for reduced-motion fallbacks. */
export function BookmarkStatic({ open }: { open: boolean }) {
  const centerX = open ? openCenterX : closedCenterX;

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: centerX - width / 2,
        top: -topPeek,
        width,
        zIndex: 6,
      }}
      aria-hidden
    >
      <BookmarkPieces />
    </div>
  );
}
