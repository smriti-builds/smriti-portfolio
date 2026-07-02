"use client";

import { useId } from "react";

type WaveSeparatorProps = {
  className?: string;
};

const TILE_WIDTH = 132;
const TILE_HEIGHT = 28;

// One seamless tile: smooth symmetric wave with visible crests and troughs.
const WAVE_TILE_PATH = "M0 14 C16.5 6 49.5 22 66 14 C82.5 6 115.5 22 132 14";

export default function WaveSeparator({ className = "" }: WaveSeparatorProps) {
  const patternId = `footer-wave${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      className={`block w-full bg-transparent text-neutral-300 ${className}`}
      width="100%"
      height={TILE_HEIGHT}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width={TILE_WIDTH}
          height={TILE_HEIGHT}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={WAVE_TILE_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
