type WaveSeparatorProps = {
  className?: string;
};

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 22;
const BASELINE = VIEW_HEIGHT / 2;

function organicWaveY(x: number) {
  const t = x / VIEW_WIDTH;

  return (
    BASELINE +
    Math.sin(t * Math.PI * 2 * 18.5) * 3.6 +
    Math.sin(t * Math.PI * 2 * 12.2 + 1.15) * 2.3 +
    Math.sin(t * Math.PI * 2 * 28.4 + 2.45) * 1.0 +
    Math.sin(t * Math.PI * 2 * 8.4 + 0.65) * 1.65 +
    Math.sin(t * Math.PI * 2 * 23.2 + 3.8) * 0.75
  );
}

function clampY(y: number) {
  return Math.min(VIEW_HEIGHT - 2, Math.max(2, y));
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
  const sampleCount = 240;
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
        className="block h-5 w-full"
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
