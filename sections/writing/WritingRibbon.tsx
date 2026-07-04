"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTime,
  useTransform,
} from "framer-motion";

type WritingRibbonProps = {
  src: string;
  width: number;
  height: number;
  variant: "top" | "bottom";
  priority?: boolean;
};

const RIBBON_DRIFT = {
  top: {
    xAmplitude: 14,
    yAmplitude: 6,
    xPeriodSec: 11,
    yPeriodSec: 8.5,
    phase: 0,
  },
  bottom: {
    xAmplitude: 12,
    yAmplitude: 5,
    xPeriodSec: 13,
    yPeriodSec: 9.5,
    phase: Math.PI * 0.65,
  },
} as const;

function ribbonOffset(
  timeMs: number,
  periodSec: number,
  amplitude: number,
  phase: number,
) {
  const theta = (timeMs / 1000) * ((2 * Math.PI) / periodSec) + phase;
  return Math.sin(theta) * amplitude;
}

function WritingRibbonImage({
  src,
  width,
  height,
  priority,
}: Pick<WritingRibbonProps, "src" | "width" | "height" | "priority">) {
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className="block h-[clamp(100px,calc(100vw*424/2880*1.55),212px)] w-full max-w-none object-cover object-center md:h-auto"
      sizes="100vw"
      priority={priority}
    />
  );
}

function DriftingRibbon({
  src,
  width,
  height,
  variant,
  priority = false,
}: WritingRibbonProps) {
  const drift = RIBBON_DRIFT[variant];
  const time = useTime();

  const x = useTransform(time, (current) =>
    ribbonOffset(current, drift.xPeriodSec, drift.xAmplitude, drift.phase),
  );
  const y = useTransform(time, (current) =>
    ribbonOffset(
      current,
      drift.yPeriodSec,
      drift.yAmplitude,
      drift.phase + Math.PI * 0.35,
    ),
  );

  return (
    <div className="pointer-events-none w-full overflow-hidden select-none" aria-hidden>
      <motion.div className="w-[104%] -ml-[2%] will-change-transform" style={{ x, y }}>
        <WritingRibbonImage
          src={src}
          width={width}
          height={height}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

export default function WritingRibbon(props: WritingRibbonProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none w-full select-none" aria-hidden>
        <WritingRibbonImage
          src={props.src}
          width={props.width}
          height={props.height}
          priority={props.priority}
        />
      </div>
    );
  }

  return <DriftingRibbon {...props} />;
}
