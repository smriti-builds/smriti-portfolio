import Image from "next/image";
import { journalCover } from "@/lib/content/journal";
import { coverHeight, coverWidth } from "@/sections/journal/constants";

export function FrontCover() {
  return (
    <Image
      src={journalCover.src}
      alt="Closed journal with collage cover art"
      width={journalCover.intrinsicWidth}
      height={journalCover.intrinsicHeight}
      className="size-full rounded-r-[4px] object-cover object-left"
      priority
      draggable={false}
    />
  );
}

export const frontCoverSize = {
  width: coverWidth,
  height: coverHeight,
};
