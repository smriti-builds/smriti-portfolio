type CarouselEdgeFadeProps = {
  side: "left" | "right";
};

export default function CarouselEdgeFade({ side }: CarouselEdgeFadeProps) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 z-10 w-[120px] md:w-[160px] ${isLeft ? "left-0" : "right-0"}`}
      style={{
        background: isLeft
          ? "linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0.92) 38%, transparent 100%)"
          : "linear-gradient(to left, #ffffff 0%, rgba(255, 255, 255, 0.92) 38%, transparent 100%)",
      }}
    />
  );
}
