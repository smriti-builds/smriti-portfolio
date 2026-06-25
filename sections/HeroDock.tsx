"use client";

import Image from "next/image";
import { useState } from "react";
import { artboardRect, px } from "@/lib/hero/layout";
import type { HeroContent, HeroDockItem, HeroMode } from "@/types/hero";

const DOCK_BUTTON_SIZE = 60;
const TOOLTIP_GAP = 10;

function dockIconSrc(item: HeroDockItem, active: boolean): string {
  if (item.icon === "puzzle") {
    return active ? "/Hero/dock-puzzle-icon.svg" : "/Hero/dock-puzzle-icon-inactive.svg";
  }
  return active ? "/Hero/dock-brush-icon-active.svg" : "/Hero/dock-brush-icon.svg";
}

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
  active,
  visible,
  onHoverChange,
  onSelect,
}: {
  item: HeroDockItem;
  active: boolean;
  visible: boolean;
  onHoverChange: (hovered: boolean) => void;
  onSelect: (mode: HeroMode) => void;
}) {
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

      <button
        type="button"
        aria-label={item.label}
        aria-pressed={active}
        onFocus={() => onHoverChange(true)}
        onBlur={() => onHoverChange(false)}
        onClick={() => onSelect(item.mode)}
        className={
          active
            ? "flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-[12px] border border-white bg-[#ac7f5e]"
            : "flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-[12px] border border-[#dad3c0] bg-white"
        }
        style={{
          boxShadow: active
            ? "0px 4px 12px 0px rgba(138, 107, 22, 0.3)"
            : "0px 8px 24px 0px rgba(184, 170, 132, 0.4)",
        }}
      >
        <Image
          src={dockIconSrc(item, active)}
          alt=""
          width={36}
          height={36}
          className="block"
          aria-hidden
        />
      </button>
    </div>
  );
}

export default function HeroDock({
  dock,
  mode,
  pinnedToViewport = false,
  onModeChange,
}: {
  dock: HeroContent["dock"];
  mode: HeroMode;
  pinnedToViewport?: boolean;
  onModeChange: (mode: HeroMode) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (pinnedToViewport) {
    return (
      <nav
        aria-label="Hero tools"
        className="relative z-50 flex shrink-0 items-center justify-center pb-6 pt-3"
        style={{ gap: px(12) }}
      >
        {dock.items.map((item) => (
          <HeroDockItemView
            key={item.id}
            item={item}
            active={mode === item.mode}
            visible={hoveredId === item.id}
            onHoverChange={(hovered) => setHoveredId(hovered ? item.id : null)}
            onSelect={onModeChange}
          />
        ))}
      </nav>
    );
  }

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
          active={mode === item.mode}
          visible={hoveredId === item.id}
          onHoverChange={(hovered) => setHoveredId(hovered ? item.id : null)}
          onSelect={onModeChange}
        />
      ))}
    </nav>
  );
}
