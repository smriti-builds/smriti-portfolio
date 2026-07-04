"use client";

import { heroContent } from "@/lib/content/hero";
import {
  getHeroMobileTopRightCluster,
  HERO_MOBILE_TOP_RIGHT_CLUSTER_IDS,
} from "@/lib/content/hero-clean-mobile";
import { useHeroMobileLayout } from "@/sections/hero-mobile-layout-context";
import HeroMobileCollageItem from "@/sections/HeroMobileCollageItem";

export default function HeroMobileTopRightCluster() {
  const { tier } = useHeroMobileLayout();
  const cluster = getHeroMobileTopRightCluster(tier);
  const collageById = new Map(heroContent.collage.map((entry) => [entry.id, entry]));

  return (
    <div
      className="pointer-events-none absolute overflow-visible"
      style={{
        left: cluster.x,
        top: cluster.y,
        width: cluster.width,
        height: cluster.height,
        zIndex: 15,
      }}
      data-hero-cluster="top-right"
    >
      {cluster.layers.map((layer) => {
        const item = collageById.get(layer.id);
        if (!item) return null;
        return (
          <HeroMobileCollageItem
            key={layer.id}
            item={item}
            clusterLayer={layer}
          />
        );
      })}
    </div>
  );
}

export { HERO_MOBILE_TOP_RIGHT_CLUSTER_IDS };
