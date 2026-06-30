import Image from "next/image";
import { journalOpenSpread } from "@/lib/content/journal";
import { JOURNAL_PAPER_COLOR, spreadHeight, spreadWidth } from "@/sections/journal/constants";

export function OpenSpread() {
  return (
    <div
      className="size-full overflow-hidden rounded-[4px]"
      style={{ backgroundColor: JOURNAL_PAPER_COLOR }}
    >
      <Image
        src={journalOpenSpread.src}
        alt="Open journal spread with notes, sketches, and portfolio details"
        width={journalOpenSpread.intrinsicWidth}
        height={journalOpenSpread.intrinsicHeight}
        className="size-full rounded-[4px] object-cover object-center"
        draggable={false}
        priority
      />
    </div>
  );
}

export const openSpreadSize = {
  width: spreadWidth,
  height: spreadHeight,
};
