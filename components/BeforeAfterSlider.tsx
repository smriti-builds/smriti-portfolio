"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

const SPRING_CONFIG = { stiffness: 400, damping: 40, mass: 0.6 };
const KEYBOARD_STEP = 5;

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
};

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const prefersReducedMotion = useReducedMotion();

  const progress = useMotionValue(0.5);
  const smoothProgress = useSpring(progress, SPRING_CONFIG);
  const containerWidth = useMotionValue(0);
  const isDragging = useMotionValue(0);

  const activeProgress = useTransform(
    [progress, smoothProgress, isDragging],
    ([raw, smooth, dragging]) => ((dragging as number) > 0 ? raw : smooth) as number,
  );

  const handleX = useTransform(
    [activeProgress, containerWidth],
    ([p, width]) => (p as number) * (width as number),
  );

  const beforeClipPath = useTransform(
    activeProgress,
    (p) => `inset(0 ${(1 - p) * 100}% 0 0)`,
  );

  const [ariaValue, setAriaValue] = useState(50);

  const syncAriaValue = useCallback(() => {
    setAriaValue(Math.round(activeProgress.get() * 100));
  }, [activeProgress]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      containerWidth.set(element.getBoundingClientRect().width);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, [containerWidth]);

  const clampProgress = useCallback((value: number) => {
    return Math.max(0, Math.min(1, value));
  }, []);

  const setProgressFromClientX = useCallback(
    (clientX: number) => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const next = clampProgress((clientX - rect.left) / rect.width);
      progress.jump(next);
    },
    [clampProgress, progress],
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      isDragging.set(1);
      setProgressFromClientX(event.clientX);

      const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
        setProgressFromClientX(moveEvent.clientX);
      };

      const handlePointerUp = (upEvent: globalThis.PointerEvent) => {
        isDragging.set(0);
        event.currentTarget.releasePointerCapture(upEvent.pointerId);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerUp);

        if (!prefersReducedMotion) {
          const element = containerRef.current;
          if (element) {
            const rect = element.getBoundingClientRect();
            const next = clampProgress((upEvent.clientX - rect.left) / rect.width);
            progress.set(next);
          }
        }

        syncAriaValue();
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    },
    [clampProgress, isDragging, prefersReducedMotion, progress, setProgressFromClientX, syncAriaValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      event.preventDefault();

      const delta = event.key === "ArrowLeft" ? -KEYBOARD_STEP : KEYBOARD_STEP;
      const next = clampProgress(progress.get() + delta / 100);

      if (prefersReducedMotion) {
        progress.jump(next);
      } else {
        progress.set(next);
      }

      syncAriaValue();
    },
    [clampProgress, prefersReducedMotion, progress, syncAriaValue],
  );

  return (
    <div
      ref={containerRef}
      className={`relative h-[450px] w-full touch-none overflow-hidden rounded-[24px] select-none md:h-[650px] md:rounded-[32px] ${className}`}
    >
      <Image
        src={afterImage}
        alt=""
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 100vw, 1100px"
        className="pointer-events-none select-none object-cover"
        draggable={false}
        aria-hidden
      />

      <motion.div
        className="absolute inset-0"
        style={{ clipPath: beforeClipPath }}
        aria-hidden
      >
        <Image
          src={beforeImage}
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 1100px"
          className="pointer-events-none select-none object-cover"
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.25)]"
        style={{ left: handleX }}
        aria-hidden
      />

      <motion.button
        type="button"
        className="absolute top-1/2 z-30 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/70 bg-white text-neutral-700 shadow-[0_8px_24px_rgba(15,23,42,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-14"
        style={{ left: handleX }}
        aria-label={`${beforeLabel} and ${afterLabel} comparison slider`}
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValue}
        aria-valuetext={`${100 - ariaValue}% ${afterLabel} revealed`}
        role="slider"
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <span id={labelId} className="sr-only">
          {beforeLabel} versus {afterLabel}
        </span>
        <span className="flex items-center gap-0.5" aria-hidden>
          <ChevronLeft className="size-3.5 md:size-4" strokeWidth={2.5} />
          <ChevronRight className="size-3.5 md:size-4" strokeWidth={2.5} />
        </span>
      </motion.button>
    </div>
  );
}
