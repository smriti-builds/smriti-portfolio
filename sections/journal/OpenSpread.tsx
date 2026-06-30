import Image from "next/image";
import { journalOpenSpread } from "@/lib/content/journal";
import {
  JOURNAL_BORDER_RADIUS,
  JOURNAL_PAPER_COLOR,
} from "@/sections/journal/constants";

export function OpenSpread() {
  return (
    <div
      className="size-full overflow-hidden"
      style={{
        backgroundColor: JOURNAL_PAPER_COLOR,
        borderRadius: JOURNAL_BORDER_RADIUS,
      }}
    >
      <Image
        src={journalOpenSpread.src}
        alt="Open journal spread with notes, sketches, and portfolio details"
        width={journalOpenSpread.intrinsicWidth}
        height={journalOpenSpread.intrinsicHeight}
        className="size-full object-cover object-center"
        style={{ borderRadius: JOURNAL_BORDER_RADIUS }}
        draggable={false}
        priority
      />
    </div>
  );
}
