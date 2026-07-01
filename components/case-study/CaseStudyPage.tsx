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
        <div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-[88px] md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
            <CaseStudySidebar
              meta={study.meta}
              categories={study.categories}
              liveUrl={study.liveUrl}
            />

            <div className="min-w-0">
              <CaseStudyHero
                title={study.title}
                subtitle={study.subtitle}
                lede={study.lede}
                heroImage={study.heroImage}
              />

              <div className="mt-16 flex flex-col gap-12">
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
