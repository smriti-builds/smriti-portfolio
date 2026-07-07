import Image from "next/image";
import type { CSSProperties } from "react";
import type { CaseStudySummaryCard } from "@/types/case-study";
import type { CaseStudyHeroVideoOverlay } from "@/types/case-study";
import type { ExperimentImage } from "@/types/experiments";
import CaseStudySummaryCards from "@/components/case-study/CaseStudySummaryCards";

type CaseStudyHeroProps = {
  title: string;
  subtitle: string;
  lede: string;
  objective?: string;
  summaryCards?: CaseStudySummaryCard[];
  heroImage: ExperimentImage;
  heroVideoOverlay?: CaseStudyHeroVideoOverlay;
};

const DEFAULT_HERO_VIDEO_VIEWPORT = {
  desktop: {
    top: 8.6,
    left: 38.1,
    width: 23.8,
    height: 82.8,
    borderRadius: 9.5,
  },
  mobile: {
    top: 8.8,
    left: 38,
    width: 24,
    height: 82.4,
    borderRadius: 9,
  },
} as const;

function viewportStyle(viewport: {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
}): CSSProperties {
  return {
    top: `${viewport.top}%`,
    left: `${viewport.left}%`,
    width: `${viewport.width}%`,
    height: `${viewport.height}%`,
    borderTopLeftRadius: `${viewport.borderRadius}%`,
    borderTopRightRadius: `${viewport.borderRadius}%`,
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  };
}

function renderIntroParagraphs(content: string) {
  return content.split(/\n\n+/).map((paragraph) => {
    const trimmed = paragraph.trim();
    const isHighlight = trimmed.startsWith(">>");
    const isBold = trimmed.startsWith("!!");

    if (isHighlight) {
      return (
        <blockquote
          key={trimmed.slice(0, 48)}
          className="border-l-2 border-text-primary py-1 pl-5 md:pl-6"
        >
          <p className="font-instrument-sans text-[14px] font-medium leading-[22px] text-text-primary md:text-[16px] md:leading-[24px]">
            {trimmed.slice(2).trim()}
          </p>
        </blockquote>
      );
    }

    if (isBold) {
      return (
        <p
          key={trimmed.slice(0, 48)}
          className="font-instrument-sans text-[14px] font-semibold leading-[22px] text-text-secondary md:text-[16px] md:leading-[24px]"
        >
          {trimmed.slice(2).trim()}
        </p>
      );
    }

    return (
      <p
        key={trimmed.slice(0, 48)}
        className="font-instrument-sans text-[14px] leading-[22px] text-text-secondary md:text-[16px] md:leading-[24px]"
      >
        {trimmed}
      </p>
    );
  });
}

function CaseStudyIntroBlock({
  eyebrow,
  content,
  className = "",
}: {
  eyebrow: string;
  content: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d]">
        {eyebrow}
      </p>
      <div className="mt-3 flex flex-col gap-4">{renderIntroParagraphs(content)}</div>
    </div>
  );
}

export default function CaseStudyHero({
  title,
  subtitle,
  lede,
  objective,
  summaryCards,
  heroImage,
  heroVideoOverlay,
}: CaseStudyHeroProps) {
  const frameImage = heroVideoOverlay?.frameImage ?? heroImage;
  const desktopViewport =
    heroVideoOverlay?.desktopViewport ?? DEFAULT_HERO_VIDEO_VIEWPORT.desktop;
  const mobileViewport =
    heroVideoOverlay?.mobileViewport ?? DEFAULT_HERO_VIDEO_VIEWPORT.mobile;
  const videoTopCropPercent = heroVideoOverlay?.videoTopCropPercent ?? 0;
  const videoCropStyle: CSSProperties =
    videoTopCropPercent > 0
      ? {
          height: `calc(100% + ${videoTopCropPercent}%)`,
          transform: `translateY(-${videoTopCropPercent}%)`,
        }
      : {};

  return (
    <header className="flex flex-col">
      <p className="order-1 font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d] lg:order-2 lg:mt-20">
        {subtitle}
      </p>
      <h1 className="type-case-study-hero-title order-1 mt-3 font-instrument-sans font-bold text-text-primary lg:order-2">
        {title}
      </h1>

      <div className="relative order-2 mt-10 w-full overflow-hidden rounded-2xl bg-neutral-100 md:max-h-[420px] md:rounded-[20px] lg:order-1 lg:mt-0 lg:max-h-none lg:rounded-[24px]">
        <div
          className="relative h-auto w-full"
          style={{
            aspectRatio: `${frameImage.width} / ${frameImage.height}`,
          }}
        >
          {heroVideoOverlay ? (
            <>
              <div
                className="absolute overflow-hidden md:hidden"
                style={viewportStyle(mobileViewport)}
              >
                <video
                  className="h-full w-full object-cover object-top"
                  src={heroVideoOverlay.videoSrc}
                  aria-label={heroVideoOverlay.videoAlt}
                  style={videoCropStyle}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                />
              </div>
              <div
                className="absolute hidden overflow-hidden md:block"
                style={viewportStyle(desktopViewport)}
              >
                <video
                  className="h-full w-full object-cover object-top"
                  src={heroVideoOverlay.videoSrc}
                  aria-label={heroVideoOverlay.videoAlt}
                  style={videoCropStyle}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                />
              </div>
            </>
          ) : null}

          <Image
            src={frameImage.src}
            alt={frameImage.alt}
            width={frameImage.width}
            height={frameImage.height}
            className="h-full w-full object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1920px) 60vw, 1100px"
            priority
          />
        </div>
      </div>

      <div className="order-3 mt-10 flex w-full flex-col gap-10 md:mt-14 md:gap-12 lg:order-2 lg:mt-0">
        <CaseStudyIntroBlock
          eyebrow="Overview"
          content={lede}
          className="lg:mt-10"
        />
        {objective ? (
          <CaseStudyIntroBlock eyebrow="Objective" content={objective} />
        ) : null}
        {summaryCards?.length ? (
          <CaseStudySummaryCards cards={summaryCards} />
        ) : null}
      </div>
    </header>
  );
}
