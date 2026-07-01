import type { CaseStudy } from "@/types/case-study";
import CaseStudyExperimentNav from "@/components/case-study/CaseStudyExperimentNav";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import CaseStudySidebar from "@/components/case-study/CaseStudySidebar";
import Footer from "@/sections/Footer";

type CaseStudyPageProps = {
  study: CaseStudy;
  prev?: CaseStudy;
  next?: CaseStudy;
};

export default function CaseStudyPage({
  study,
  prev,
  next,
}: CaseStudyPageProps) {
  return (
    <>
      <CaseStudyHeader />
      <main className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1920px] px-6 py-10 md:px-12 md:py-16 lg:px-[120px] lg:py-20">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-[120px]">
            <CaseStudySidebar
              meta={study.meta}
              categories={study.categories}
              liveUrl={study.liveUrl}
              className="order-2 lg:order-1"
            />

            <div className="order-1 min-w-0 lg:order-2">
              <CaseStudyHero
                title={study.title}
                subtitle={study.subtitle}
                lede={study.lede}
                heroImage={study.heroImage}
              />

              <div className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-16 lg:mt-24 lg:gap-20">
                {study.sections.map((section, index) => (
                  <CaseStudySection
                    key={section.id}
                    section={section}
                    index={index}
                  />
                ))}
              </div>

              <CaseStudyExperimentNav prev={prev} next={next} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
