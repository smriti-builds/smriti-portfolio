import Image from "next/image";
import { journalCover } from "@/lib/content/journal";
import { JOURNAL_BORDER_RADIUS } from "@/sections/journal/constants";

export function FrontCover() {
  return (
    <Image
      src={journalCover.src}
      alt="Closed journal with collage cover art"
      width={journalCover.intrinsicWidth}
      height={journalCover.intrinsicHeight}
      className="size-full object-cover object-left"
      style={{
        borderRadius: `0 ${JOURNAL_BORDER_RADIUS}px ${JOURNAL_BORDER_RADIUS}px 0`,
      }}
      priority
      draggable={false}
    />
  );
}
