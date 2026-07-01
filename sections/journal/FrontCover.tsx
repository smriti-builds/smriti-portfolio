import Image from "next/image";
import { journalCover, journalCoverInsideColor } from "@/lib/content/journal";

export function FrontCover() {
  return (
    <div className="relative size-full">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: journalCoverInsideColor }}
        aria-hidden
      />
      <Image
        src={journalCover.src}
        alt="Closed journal with collage cover art"
        width={journalCover.intrinsicWidth}
        height={journalCover.intrinsicHeight}
        className="relative size-full object-cover object-left"
        priority
        draggable={false}
      />
    </div>
  );
}
