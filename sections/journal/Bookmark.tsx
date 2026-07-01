import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  journalBookmark,
  journalBookmarkDisplay,
} from "@/lib/content/journal";

type BookmarkProps = {
  openProgress: MotionValue<number>;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
};

const { src, intrinsicWidth, intrinsicHeight, topPeek, closedCenterX } =
  journalBookmark;
const { width, height, openCenterX } = journalBookmarkDisplay;

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
        top: bookmarkTop,
        left: bookmarkLeft,
        width,
        height,
        zIndex: 6,
      }}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        width={intrinsicWidth}
        height={intrinsicHeight}
        className="size-full object-fill"
        draggable={false}
      />
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
        top: -topPeek,
        left: centerX - width / 2,
        width,
        height,
        zIndex: 6,
      }}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        width={intrinsicWidth}
        height={intrinsicHeight}
        className="size-full object-fill"
        draggable={false}
      />
    </div>
  );
}
