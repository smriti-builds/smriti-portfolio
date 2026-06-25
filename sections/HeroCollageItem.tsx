"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroCleanCollageById } from "@/lib/content/hero-clean";
import {
  COLLAGE_INTERACTIONS,
  isCollageInteractive,
  type CollageInteractionId,
} from "@/lib/hero/collage-interactions";
import {
  applyCleanSideOffset,
  getEffectiveSideOffset,
} from "@/lib/hero/clean-responsive";
import { useViewportWidth } from "@/lib/hero/use-viewport-width";
import { playCollageClick } from "@/lib/hero/play-collage-click";
import { playVinylJazz, stopVinylJazz } from "@/lib/hero/play-vinyl-jazz";
import { collageTransformOrigin } from "@/sections/hero-collage-shared";
import type { HeroCollageItem, HeroMode } from "@/types/hero";

const HERO_LAYOUT_TRANSITION = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const HERO_TAP_TRANSITION = {
  duration: 0.35,
  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

const VINYL_SPIN_DURATION = 2.4;

function resolveCollageLayout(
  item: HeroCollageItem,
  mode: HeroMode,
  viewportWidth: number,
) {
  const chaos = {
    x: item.x as number | string,
    y: item.y,
    width: item.width,
    height: item.height,
    opacity: 1,
    rotation: item.rotation ?? 0,
  };

  if (mode === "chaos") return chaos;

  const clean = heroCleanCollageById[item.id];
  if (!clean?.visible) return { ...chaos, opacity: 0 };

  const offset = getEffectiveSideOffset(clean.x, clean.width, viewportWidth);

  return {
    x: applyCleanSideOffset(clean.x, clean.width, offset),
    y: clean.y,
    width: clean.width,
    height: clean.height,
    opacity: 1,
    rotation: clean.rotation ?? 0,
    zIndex: clean.zIndex,
  };
}

export default function HeroCollageItemView({
  item,
  mode,
}: {
  item: HeroCollageItem;
  mode: HeroMode;
}) {
  const viewportWidth = useViewportWidth();
  const layout = resolveCollageLayout(item, mode, viewportWidth);
  const cleanZIndex = mode === "clean" ? (layout as { zIndex?: number }).zIndex : undefined;
  const interactive = isCollageInteractive(item.id);
  const config = interactive ? COLLAGE_INTERACTIONS[item.id as CollageInteractionId] : undefined;

  const [toggleOn, setToggleOn] = useState(false);
  const [vinylSpinning, setVinylSpinning] = useState(false);
  const [tapPulse, setTapPulse] = useState(false);
  const vinylRotation = useMotionValue(0);
  const vinylSpinRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    return () => {
      vinylSpinRef.current?.stop();
      stopVinylJazz();
    };
  }, []);

  const toggleVinylSpin = () => {
    if (vinylSpinning) {
      vinylSpinRef.current?.stop();
      vinylSpinRef.current = null;
      setVinylSpinning(false);
      stopVinylJazz();
      return;
    }

    setVinylSpinning(true);
    playVinylJazz();
    const from = vinylRotation.get();
    vinylSpinRef.current = animate(vinylRotation, from + 360, {
      duration: VINYL_SPIN_DURATION,
      ease: "linear",
      repeat: Infinity,
    });
  };

  const handleClick = () => {
    if (!config) return;

    playCollageClick();

    switch (config.kind) {
      case "toggle":
        setToggleOn((on) => !on);
        break;
      case "spin":
        toggleVinylSpin();
        break;
      case "tap":
        setTapPulse(true);
        window.setTimeout(() => setTapPulse(false), 400);
        break;
    }
  };

  const isLamp = item.id === "desk-lamp";
  const isMonitor = item.id === "crt-monitor";
  const isVinyl = item.id === "vinyl-record";
  const isToggleOn = toggleOn;

  return (
    <motion.div
      initial={false}
      className={`absolute overflow-visible ${
        item.id === "mouse-arrow" ? "z-50" : cleanZIndex === undefined ? "z-10" : ""
      } ${interactive ? "cursor-pointer" : "pointer-events-none"}`}
      animate={{
        left: layout.x,
        top: layout.y,
        width: layout.width,
        height: layout.height,
        opacity: layout.opacity,
        rotate: layout.rotation,
      }}
      transition={HERO_LAYOUT_TRANSITION}
      style={{
        position: "absolute",
        transformOrigin: collageTransformOrigin(item),
        ...(cleanZIndex !== undefined ? { zIndex: cleanZIndex } : {}),
      }}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={config?.label}
      aria-pressed={
        config?.kind === "toggle"
          ? toggleOn
          : config?.kind === "spin"
            ? vinylSpinning
            : undefined
      }
      whileHover={interactive ? { scale: 1.04 } : undefined}
      whileTap={interactive ? { scale: 0.97 } : undefined}
    >
      <motion.div
        className="relative h-full w-full"
        style={isVinyl ? { rotate: vinylRotation } : undefined}
        animate={{
          scale:
            isLamp && isToggleOn
              ? 1.02
              : isMonitor && isToggleOn
                ? 1.03
                : tapPulse
                  ? 1.07
                  : 1,
          rotate: isVinyl ? undefined : tapPulse && config?.kind === "tap" ? -5 : 0,
          filter:
            isLamp && isToggleOn
              ? "brightness(1.18) saturate(1.08)"
              : isMonitor && isToggleOn
                ? "brightness(1.12)"
                : isMonitor
                  ? "brightness(0.94) saturate(0.92)"
                  : "brightness(1)",
        }}
        transition={HERO_TAP_TRANSITION}
      >
        {isLamp && isToggleOn && (
          <div
            aria-hidden
            className="hero-lamp-glow pointer-events-none absolute left-[18%] top-[8%] h-[55%] w-[65%] rounded-full"
          />
        )}

        {isMonitor && isToggleOn && (
          <div
            aria-hidden
            className="hero-monitor-glow pointer-events-none absolute left-[12%] top-[18%] h-[42%] w-[76%] rounded-sm"
          />
        )}

        {config?.kind === "tap" && item.id === "coffee-croissant" && tapPulse && (
          <div
            aria-hidden
            className="hero-coffee-steam pointer-events-none absolute -top-4 left-1/2 h-8 w-6 -translate-x-1/2"
          />
        )}

        {item.src ? (
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="block h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div
            aria-hidden="true"
            title={item.alt}
            className="h-full w-full rounded-sm"
            style={{ backgroundColor: item.placeholderColor }}
          />
        )}
      </motion.div>

      {interactive && config && <span className="sr-only">{config.hint}</span>}
    </motion.div>
  );
}
