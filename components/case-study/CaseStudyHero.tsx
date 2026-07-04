import Image from "next/image";
import type { ExperimentImage } from "@/types/experiments";

type CaseStudyHeroProps = {
  title: string;
  subtitle: string;
  lede: string;
  heroImage: ExperimentImage;
};

export default function CaseStudyHero({
  title,
  subtitle,
  lede,
  heroImage,
}: CaseStudyHeroProps) {
  return (
    <header className="flex flex-col">
      <p className="order-1 font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d] lg:order-2 lg:mt-20">
        {subtitle}
      </p>
      <h1 className="type-case-study-hero-title order-1 mt-3 font-instrument-sans font-bold text-text-primary lg:order-2">
        {title}
      </h1>

      <div className="relative order-2 mt-10 aspect-[804/556] w-full overflow-hidden rounded-2xl bg-neutral-100 md:max-h-[420px] md:rounded-[20px] lg:order-1 lg:mt-0 lg:aspect-auto lg:h-[556px] lg:max-h-none lg:rounded-[24px]">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          className="h-full w-full object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1920px) 60vw, 1100px"
          priority
        />
      </div>

      <div className="order-3 mt-10 flex w-full flex-col md:mt-14 lg:order-2 lg:mt-0">
        <p className="font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d] lg:mt-10">
          Overview
        </p>
        <div className="mt-3 flex flex-col gap-4">
          {lede.split(/\n\n+/).map((paragraph) => {
            const trimmed = paragraph.trim();
            const isHighlight = trimmed.startsWith(">>");
            const isBold = trimmed.startsWith("!!");

            if (isHighlight) {
              return (
                <blockquote
                  key={trimmed.slice(0, 48)}
                  className="border-l-2 border-text-primary py-1 pl-5 md:pl-6"
                >
                  <p className="font-instrument-sans text-[14px] font-medium leading-[22px] md:text-[16px] md:leading-[24px] text-text-primary">
                    {trimmed.slice(2).trim()}
                  </p>
                </blockquote>
              );
            }

            if (isBold) {
              return (
                <p
                  key={trimmed.slice(0, 48)}
                  className="font-instrument-sans text-[14px] font-semibold leading-[22px] md:text-[16px] md:leading-[24px] text-text-secondary"
                >
                  {trimmed.slice(2).trim()}
                </p>
              );
            }

            return (
              <p
                key={trimmed.slice(0, 48)}
                className="font-instrument-sans text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] text-text-secondary"
              >
                {trimmed}
              </p>
            );
          })}
        </div>
      </div>
    </header>
  );
}
