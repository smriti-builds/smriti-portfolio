import Image from "next/image";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import type {
  CaseStudyImageMedia,
  CaseStudyMedia,
  CaseStudyResearchFeedbackClip,
  CaseStudyResearchGallery as CaseStudyResearchGalleryData,
  CaseStudyVideoMedia,
} from "@/types/case-study";
import {
  CASE_STUDY_ICON_CLASS,
  CASE_STUDY_ICON_SIZE_SM,
} from "@/components/case-study/case-study-icons";

const GALLERY_GAP = "gap-4";

const SMALL_BENTO_HEIGHT = "h-[232px]";

const BENTO_IMAGE_SIZES = {
  tall: "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 420px",
  short: "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px",
} as const;

/** Column stacks: portrait tall cells + fixed-height landscape cells */
const BENTO_COLUMNS: { index: number; size: "tall" | "short" }[][] = [
  [
    { index: 0, size: "tall" },
    { index: 2, size: "short" },
  ],
  [
    { index: 1, size: "short" },
    { index: 3, size: "tall" },
  ],
];

const BENTO_SIZE_CLASS = {
  tall: "aspect-[4/5]",
  short: SMALL_BENTO_HEIGHT,
} as const;

function FeedbackClip({ clip }: { clip: CaseStudyResearchFeedbackClip }) {
  return (
    <article className="rounded-[16px] bg-[#E7E7E7] px-4 py-3.5">
      <div className="mb-2.5 flex items-center gap-2.5">
        <MdOutlineChatBubbleOutline
          size={CASE_STUDY_ICON_SIZE_SM}
          aria-hidden
          className={CASE_STUDY_ICON_CLASS}
        />
        <span className="font-instrument-sans text-[13px] font-semibold leading-5 text-text-primary">
          {clip.name}
        </span>
      </div>
      <p className="font-instrument-sans text-[13px] leading-[20px] text-[#525d6d]">
        {clip.quote}
      </p>
    </article>
  );
}

function BentoMedia({
  media,
  sizeClass,
  isTall,
  priority,
}: {
  media: CaseStudyMedia;
  sizeClass: string;
  isTall: boolean;
  priority?: boolean;
}) {
  if (media.type === "video") {
    return <BentoVideo video={media} sizeClass={sizeClass} />;
  }

  return (
    <BentoImage
      image={media}
      sizeClass={sizeClass}
      isTall={isTall}
      priority={priority}
    />
  );
}

function BentoVideo({ video, sizeClass }: { video: CaseStudyVideoMedia; sizeClass: string }) {
  const autoPlay = video.autoPlay ?? false;
  const muted = video.muted ?? autoPlay;
  const showControls = video.controls ?? !autoPlay;

  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden rounded-[16px] bg-[#E7E7E7] ${sizeClass}`}
    >
      <video
        src={video.src}
        poster={video.poster}
        aria-label={video.alt}
        className="absolute inset-0 h-full w-full object-cover"
        controls={showControls}
        autoPlay={autoPlay}
        muted={muted}
        loop={video.loop ?? autoPlay}
        playsInline
        preload="auto"
      />
    </div>
  );
}

function BentoImage({
  image,
  sizeClass,
  isTall,
  priority = false,
}: {
  image: CaseStudyImageMedia;
  sizeClass: string;
  isTall: boolean;
  priority?: boolean;
}) {
  const useContain = image.fit === "contain";
  const objectPosition = image.objectPosition === "top" ? "object-top" : "object-center";

  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden rounded-[16px] ${sizeClass}`}
      style={{ backgroundColor: image.backgroundColor ?? "#E7E7E7" }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        quality={100}
        unoptimized={image.unoptimized ?? image.src.endsWith(".png")}
        className={
          useContain
            ? "object-contain"
            : `object-cover ${objectPosition}`
        }
        style={
          image.imageScale
            ? { transform: `scale(${image.imageScale})` }
            : undefined
        }
        sizes={BENTO_IMAGE_SIZES[isTall ? "tall" : "short"]}
      />
    </div>
  );
}

function splitFeedbackColumns(clips: CaseStudyResearchFeedbackClip[]) {
  const left: CaseStudyResearchFeedbackClip[] = [];
  const right: CaseStudyResearchFeedbackClip[] = [];

  clips.forEach((clip, index) => {
    if (index % 2 === 0) {
      left.push(clip);
    } else {
      right.push(clip);
    }
  });

  return { left, right };
}

type CaseStudyResearchGalleryProps = {
  gallery: CaseStudyResearchGalleryData;
};

export default function CaseStudyResearchGallery({
  gallery,
}: CaseStudyResearchGalleryProps) {
  const { left, right } = splitFeedbackColumns(gallery.feedbackClips);

  return (
    <div className="mt-8 w-full md:mt-10">
      <div className="rounded-[24px] bg-[#F5F5F5] p-4 md:p-5">
        <div className={`flex flex-col ${GALLERY_GAP} lg:flex-row lg:items-start`}>
          <div
            className={`grid w-full shrink-0 grid-cols-2 ${GALLERY_GAP} lg:w-[48%] lg:min-w-0`}
          >
            {BENTO_COLUMNS.map((column, columnIndex) => (
              <div key={columnIndex} className={`flex flex-col ${GALLERY_GAP}`}>
                {column.map(({ index, size }) => {
                  const media = gallery.items[index];
                  if (!media) return null;

                  return (
                    <BentoMedia
                      key={media.src}
                      media={media}
                      sizeClass={BENTO_SIZE_CLASS[size]}
                      isTall={size === "tall"}
                      priority={index === 0}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className={`flex min-w-0 flex-1 ${GALLERY_GAP}`}>
            <div className={`flex flex-1 flex-col ${GALLERY_GAP}`}>
              {left.map((clip) => (
                <FeedbackClip key={`${clip.name}-${clip.quote}`} clip={clip} />
              ))}
            </div>
            <div className={`flex flex-1 flex-col ${GALLERY_GAP}`}>
              {right.map((clip) => (
                <FeedbackClip key={`${clip.name}-${clip.quote}`} clip={clip} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
