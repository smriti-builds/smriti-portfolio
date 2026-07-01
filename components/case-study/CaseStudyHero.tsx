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
      <div className="relative aspect-[804/556] w-full overflow-hidden rounded-[24px] bg-neutral-100 shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={heroImage.width}
          height={heroImage.height}
          className="h-full w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 720px"
          priority
        />
      </div>

      <div className="mt-16 flex max-w-2xl flex-col md:mt-20">
        <p className="font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d]">
          {subtitle}
        </p>
        <h1 className="mt-3 font-instrument-sans text-[36px] font-bold leading-[1.15] text-text-primary md:text-[44px] md:leading-[52px]">
          {title}
        </h1>
        <p className="mt-8 font-instrument-sans text-xs font-medium uppercase tracking-[1.5px] text-[#525d6d] md:mt-10">
          Overview
        </p>
        <p className="mt-3 font-instrument-sans text-[18px] leading-[28px] text-text-secondary">
          {lede}
        </p>
      </div>
    </header>
  );
}
