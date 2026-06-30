import Image from "next/image";
import { journalOpenSpread } from "@/lib/content/journal";

export function OpenSpread() {
  return (
    <Image
      src={journalOpenSpread.src}
      alt="Open journal spread with notes, sketches, and portfolio details"
      width={journalOpenSpread.intrinsicWidth}
      height={journalOpenSpread.intrinsicHeight}
      className="size-full object-cover object-center"
      draggable={false}
      priority
    />
  );
}
