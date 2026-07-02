type WaveSeparatorProps = {
  className?: string;
  cycles?: number;
};

function buildWavePath(cycles: number, period = 100, amplitude = 6, midY = 6) {
  let path = `M0 ${midY}`;

  for (let cycle = 0; cycle < cycles; cycle += 1) {
    const x = cycle * period;
    path += ` C ${x + 12.5} ${midY - amplitude}, ${x + 37.5} ${midY + amplitude}, ${x + 50} ${midY}`;
    path += ` C ${x + 62.5} ${midY - amplitude}, ${x + 87.5} ${midY + amplitude}, ${x + period} ${midY}`;
  }

  return path;
}

export default function WaveSeparator({
  className = "",
  cycles = 12,
}: WaveSeparatorProps) {
  const width = cycles * 100;
  const path = buildWavePath(cycles);

  return (
    <div className={`w-full leading-[0] text-neutral-200 ${className}`} aria-hidden>
      <svg
        className="block h-3 w-full"
        viewBox={`0 0 ${width} 12`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
