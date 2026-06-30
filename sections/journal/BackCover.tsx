import Image from "next/image";
import { journalBackCover } from "@/lib/content/journal";
import { coverHeight, coverWidth } from "@/sections/journal/constants";

/** Exterior back board — sits beneath the spread, hidden when the journal is closed. */
export function BackCover() {
  return (
    <div
      className="pointer-events-none absolute top-0"
      style={{
        left: coverWidth,
        width: coverWidth,
        height: coverHeight,
        zIndex: 1,
      }}
      aria-hidden
    >
      <Image
        src={journalBackCover.src}
        alt=""
        width={journalBackCover.intrinsicWidth}
        height={journalBackCover.intrinsicHeight}
        className="size-full rounded-r-[6px] object-cover object-right"
        draggable={false}
      />
    </div>
  );
}
