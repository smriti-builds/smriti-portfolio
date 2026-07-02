type WaveSeparatorProps = {
  className?: string;
};

const TILE_WIDTH = 144;
const TILE_HEIGHT = 18;

export default function WaveSeparator({ className = "" }: WaveSeparatorProps) {
  return (
    <div
      className={`w-full bg-white ${className}`}
      style={{
        height: TILE_HEIGHT,
        backgroundImage: "url(/footer-wave-tile.svg)",
        backgroundRepeat: "repeat-x",
        backgroundSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
        backgroundPosition: "top center",
      }}
      aria-hidden
    />
  );
}
