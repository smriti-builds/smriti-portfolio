import Image from "next/image";
import { journalBookmark } from "@/lib/content/journal";
import { JOURNAL_SPINE_WIDTH, spreadHeight } from "@/sections/journal/constants";

const { width, topPeek, bottomHang, src, intrinsicWidth, intrinsicHeight } =
  journalBookmark;

/**
 * Ribbon bookmark tucked into the journal spine.
 * Only the top tab and bottom swallowtail tail are visible.
 */
export function Bookmark() {
  const left = Math.round((JOURNAL_SPINE_WIDTH - width) / 2);
  const ribbonHeight = spreadHeight + topPeek + bottomHang;

  return (
    <>
      <div
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
      </div>

      <div
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
      </div>
    </>
  );
}
