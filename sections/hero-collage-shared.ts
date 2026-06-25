import type { HeroCollageItem } from "@/types/hero";

export function collageTransformOrigin(item: HeroCollageItem): string {
  return item.transformOrigin ?? "center center";
}
