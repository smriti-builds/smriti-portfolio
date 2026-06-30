import Image from "next/image";
import { journalCover } from "@/lib/content/journal";

export function FrontCover() {
  return (
    <Image
      src={journalCover.src}
      alt="Closed journal with collage cover art"
      width={journalCover.intrinsicWidth}
      height={journalCover.intrinsicHeight}
      className="size-full object-cover object-left"
      priority
      draggable={false}
    />
  );
}
