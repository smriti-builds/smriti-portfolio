"use client";

import Image from "next/image";
import { useState } from "react";
import { artboardRect, px } from "@/lib/hero/layout";
import type { HeroContent, HeroDockItem } from "@/types/hero";

const DOCK_BUTTON_SIZE = 60;
/** Gap between tooltip and icon — Figma Frame 75 (981:1333) spacing. */
const TOOLTIP_GAP = 10;

function HeroDockTooltip({
  item,
  visible,
}: {
  item: HeroDockItem;
  visible: boolean;
}) {
  return (
    <div
      id={`dock-tooltip-${item.id}`}
      role="tooltip"
      aria-hidden={!visible}
      className={`pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-[rgba(11,11,11,0.9)] p-[12px] font-instrument-sans text-[14px] leading-[14px] text-white shadow-[0px_3px_4px_rgba(32,44,61,0.12)] transition-opacity duration-150 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ bottom: `calc(100% + ${TOOLTIP_GAP}px)` }}
    >
      {item.tooltip.text}
    </div>
  );
}

function HeroDockItemView({
  item,
  visible,
  onHoverChange,
}: {
  item: HeroDockItem;
  visible: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const isPuzzle = item.icon === "puzzle";

  return (
    <div
      className="relative shrink-0"
      style={{
        width: px(DOCK_BUTTON_SIZE),
        height: px(DOCK_BUTTON_SIZE),
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <HeroDockTooltip item={item} visible={visible} />

      <a
        href={item.href}
        aria-label={item.label}
        onFocus={() => onHoverChange(true)}
        onBlur={() => onHoverChange(false)}
        className={
          isPuzzle
            ? "flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] border border-white bg-[#ac7f5e]"
            : "flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] border border-[#dad3c0] bg-white"
        }
        style={{
          boxShadow: isPuzzle
            ? "0px 4px 12px 0px rgba(138, 107, 22, 0.3)"
            : "0px 8px 24px 0px rgba(184, 170, 132, 0.4)",
        }}
      >
        <Image
          src={isPuzzle ? "/Hero/dock-puzzle-icon.svg" : "/Hero/dock-brush-icon.svg"}
          alt=""
          width={36}
          height={36}
          className="block"
          aria-hidden
        />
      </a>
    </div>
  );
}

export default function HeroDock({ dock }: { dock: HeroContent["dock"] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <nav
      aria-label="Hero tools"
      className="z-30 flex items-center"
      style={{
        ...artboardRect(dock.x, dock.y),
        gap: px(12),
      }}
    >
      {dock.items.map((item) => (
        <HeroDockItemView
          key={item.id}
          item={item}
          visible={hoveredId === item.id}
          onHoverChange={(hovered) => setHoveredId(hovered ? item.id : null)}
        />
      ))}
    </nav>
  );
}
