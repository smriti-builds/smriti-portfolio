import Image from "next/image";
import { journalDimensions, journalOpenSpread } from "@/lib/content/journal";

export function OpenSpread() {
  return (
    <Image
      src={journalOpenSpread.src}
      alt="Open journal spread with portfolio notes and personal artifacts"
      width={journalOpenSpread.intrinsicWidth}
      height={journalOpenSpread.intrinsicHeight}
      className="size-full rounded-[6px] object-cover"
      draggable={false}
      priority
    />
  );
}

export const openSpreadSize = {
  width: journalDimensions.spreadWidth,
  height: journalDimensions.spreadHeight,
};
