import Image from "next/image";
import type { CaseStudyMedia } from "@/types/case-study";

const MEDIA_CONTAINER_CLASS =
  "relative w-full overflow-hidden rounded-2xl bg-neutral-100 md:rounded-[20px] lg:rounded-[24px]";

const CAPTION_CLASS =
  "mt-3 font-instrument-sans text-sm leading-5 text-text-secondary";

type CaseStudyMediaBlockProps = {
  media: CaseStudyMedia;
};

export default function CaseStudyMediaBlock({ media }: CaseStudyMediaBlockProps) {
  const aspectRatio = media.width / media.height;

  if (media.type === "image") {
    return (
      <figure className="w-full">
        <div
          className={MEDIA_CONTAINER_CLASS}
          style={{ aspectRatio: `${media.width} / ${media.height}` }}
        >
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1920px) 60vw, 1100px"
          />
        </div>
        {media.caption ? (
          <figcaption className={CAPTION_CLASS}>{media.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  const showControls = media.controls ?? true;
  const autoPlay = media.autoPlay ?? false;
  const muted = media.muted ?? autoPlay;

  return (
    <figure className="w-full">
      <div
        className={MEDIA_CONTAINER_CLASS}
        style={{ aspectRatio }}
      >
        <video
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          width={media.width}
          height={media.height}
          className="h-full w-full object-contain"
          controls={showControls}
          autoPlay={autoPlay}
          muted={muted}
          loop={media.loop ?? false}
          playsInline
          preload="metadata"
        />
      </div>
      {media.caption ? (
        <figcaption className={CAPTION_CLASS}>{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
