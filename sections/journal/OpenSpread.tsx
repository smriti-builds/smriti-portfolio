import Image from "next/image";
import { journalOpenSpread } from "@/lib/content/journal";
import { spreadHeight, spreadWidth } from "@/sections/journal/constants";

export function OpenSpread() {
  return (
    <Image
      src={journalOpenSpread.src}
      alt="Open journal spread with notes, sketches, and portfolio details"
      width={journalOpenSpread.intrinsicWidth}
      height={journalOpenSpread.intrinsicHeight}
      className="size-full rounded-[6px] object-contain object-center"
      draggable={false}
      priority
    />
  );
}

export const openSpreadSize = {
  width: spreadWidth,
  height: spreadHeight,
};
