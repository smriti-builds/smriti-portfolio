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
      <h1 className="order-1 mt-3 font-instrument-sans text-[28px] font-bold leading-[1.15] text-text-primary sm:text-[32px] md:text-[36px] lg:order-2 lg:text-[44px] lg:leading-[52px]">
        {title}
      </h1>

      <div className="relative order-2 mt-6 aspect-[804/556] w-full overflow-hidden rounded-2xl bg-neutral-100 md:max-h-[420px] md:rounded-[20px] lg:order-1 lg:mt-0 lg:aspect-auto lg:h-[556px] lg:max-h-none lg:rounded-[24px]">
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
        <p className="mt-3 font-instrument-sans text-[16px] leading-[24px] text-text-secondary">
          {lede}
        </p>
      </div>
    </header>
  );
}
