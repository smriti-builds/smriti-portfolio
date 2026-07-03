"use client";

import { useState } from "react";
import { artboardRect, px } from "@/lib/hero/layout";
import { cleanDockLeft, isCleanWideViewport } from "@/lib/hero/clean-responsive";
import { HeroDockBrushIcon, HeroDockPuzzleIcon } from "@/sections/HeroDockIcons";
import type { HeroContent, HeroDockItem, HeroMode } from "@/types/hero";

const DOCK_BUTTON_SIZE = 60;
const TOOLTIP_GAP = 10;

function HeroDockIcon({ item, active }: { item: HeroDockItem; active: boolean }) {
  return item.icon === "puzzle" ? (
    <HeroDockPuzzleIcon active={active} />
  ) : (
    <HeroDockBrushIcon active={active} />
  );
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
        data-dock-icon-version="figma-v3"
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
        <HeroDockIcon item={item} active={active} />
      </button>
    </div>
  );
}

export default function HeroDock({
  dock,
  mode,
  viewportWidth,
  pinnedToViewport = false,
  onModeChange,
}: {
  dock: HeroContent["dock"];
  mode: HeroMode;
  viewportWidth: number;
  pinnedToViewport?: boolean;
  onModeChange: (mode: HeroMode) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const dockX =
    mode === "clean" && isCleanWideViewport(viewportWidth)
      ? cleanDockLeft()
      : dock.x;

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
        ...artboardRect(dockX, dock.y),
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
