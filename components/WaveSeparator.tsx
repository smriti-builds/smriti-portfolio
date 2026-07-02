type WaveSeparatorProps = {
  className?: string;
};

const VIEW_WIDTH = 1440;
const CYCLES = 11;
const AMPLITUDE = 5;
const VIEW_HEIGHT = AMPLITUDE * 2 + 4;
const MID_Y = VIEW_HEIGHT / 2;
const PERIOD = VIEW_WIDTH / CYCLES;

function buildSineWavePath() {
  let path = `M 0 ${MID_Y}`;

  for (let cycle = 0; cycle < CYCLES; cycle += 1) {
    const x = cycle * PERIOD;

    path += ` C ${x + PERIOD * 0.125} ${MID_Y - AMPLITUDE}, ${x + PERIOD * 0.375} ${MID_Y + AMPLITUDE}, ${x + PERIOD * 0.5} ${MID_Y}`;
    path += ` C ${x + PERIOD * 0.625} ${MID_Y - AMPLITUDE}, ${x + PERIOD * 0.875} ${MID_Y + AMPLITUDE}, ${x + PERIOD} ${MID_Y}`;
  }

  return path;
}

const SINE_WAVE_PATH = buildSineWavePath();

export default function WaveSeparator({ className = "" }: WaveSeparatorProps) {
  return (
    <div
      className={`w-full bg-white leading-[0] text-neutral-900 ${className}`}
      aria-hidden
    >
      <svg
        className="block h-4 w-full"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={SINE_WAVE_PATH}
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
