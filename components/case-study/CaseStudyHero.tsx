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
    <header className="flex flex-col gap-8">
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

      <div className="flex max-w-3xl flex-col gap-4">
        <p className="font-instrument-serif text-xl uppercase tracking-[2px] text-text-secondary md:text-2xl">
          {subtitle}
        </p>
        <h1 className="font-inter text-4xl font-semibold leading-tight text-text-primary md:text-5xl md:leading-[1.15]">
          {title}
        </h1>
        <p className="font-instrument-sans text-lg leading-8 text-text-secondary md:text-xl md:leading-9">
          {lede}
        </p>
      </div>
    </header>
  );
}
