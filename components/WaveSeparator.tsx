type WaveSeparatorProps = {
  className?: string;
};

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 14;
const BASELINE = VIEW_HEIGHT / 2;

function organicWaveY(x: number) {
  const t = x / VIEW_WIDTH;

  return (
    BASELINE +
    Math.sin(t * Math.PI * 2 * 12.4) * 2.1 +
    Math.sin(t * Math.PI * 2 * 7.9 + 1.15) * 1.35 +
    Math.sin(t * Math.PI * 2 * 18.6 + 2.45) * 0.55 +
    Math.sin(t * Math.PI * 2 * 5.3 + 0.65) * 0.95 +
    Math.sin(t * Math.PI * 2 * 15.1 + 3.8) * 0.4
  );
}

function clampY(y: number) {
  return Math.min(VIEW_HEIGHT - 1.5, Math.max(1.5, y));
}

function pointsToSmoothPath(points: Array<[number, number]>) {
  if (points.length < 2) return "";

  let path = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[Math.max(0, index - 1)];
    const current = points[index];
    const next = points[index + 1];
    const following = points[Math.min(points.length - 1, index + 2)];

    const control1X = current[0] + (next[0] - previous[0]) / 6;
    const control1Y = current[1] + (next[1] - previous[1]) / 6;
    const control2X = next[0] - (following[0] - current[0]) / 6;
    const control2Y = next[1] - (following[1] - current[1]) / 6;

    path += ` C ${control1X.toFixed(2)} ${control1Y.toFixed(2)}, ${control2X.toFixed(2)} ${control2Y.toFixed(2)}, ${next[0].toFixed(2)} ${next[1].toFixed(2)}`;
  }

  return path;
}

function buildOrganicWavePath() {
  const sampleCount = 180;
  const points: Array<[number, number]> = [];

  for (let index = 0; index <= sampleCount; index += 1) {
    const x = (index / sampleCount) * VIEW_WIDTH;
    const y = clampY(organicWaveY(x));
    points.push([x, y]);
  }

  return pointsToSmoothPath(points);
}

const ORGANIC_WAVE_PATH = buildOrganicWavePath();

export default function WaveSeparator({ className = "" }: WaveSeparatorProps) {
  return (
    <div
      className={`w-full bg-white leading-[0] text-neutral-200/90 ${className}`}
      aria-hidden
    >
      <svg
        className="block h-3.5 w-full"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={ORGANIC_WAVE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
