import Image from "next/image";
import { journalSpine } from "@/lib/content/journal";
import { JOURNAL_SPINE_WIDTH, spreadHeight } from "@/sections/journal/constants";

/** Stationary spine — hinge visual only; never rotates. */
export function Spine() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{
        width: JOURNAL_SPINE_WIDTH,
        height: spreadHeight,
        zIndex: 3,
      }}
      aria-hidden
    >
      <Image
        src={journalSpine.src}
        alt=""
        width={journalSpine.intrinsicWidth}
        height={journalSpine.intrinsicHeight}
        className="size-full object-cover object-left"
        draggable={false}
      />
    </div>
  );
}
