import type { CaseStudy, CaseStudyPageContext } from "@/types/case-study";
import CaseStudyProjectNav from "@/components/case-study/CaseStudyExperimentNav";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import CaseStudySidebar from "@/components/case-study/CaseStudySidebar";
import Footer from "@/sections/Footer";

type CaseStudyPageProps = {
  study: CaseStudy;
  prev?: CaseStudy;
  next?: CaseStudy;
  context?: CaseStudyPageContext;
};

const DEFAULT_CONTEXT: CaseStudyPageContext = {
  backHref: "/#experiments",
  backLabel: "Back to experiments",
  navBasePath: "/experiments",
  navAriaLabel: "Other experiments",
};

export default function CaseStudyPage({
  study,
  prev,
  next,
  context = DEFAULT_CONTEXT,
}: CaseStudyPageProps) {
  return (
    <>
      <CaseStudyHeader
        backHref={context.backHref}
        backLabel={context.backLabel}
      />
      <main className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1920px] px-5 py-10 md:px-12 md:py-16 lg:px-[120px] lg:py-20">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-[120px]">
            <CaseStudySidebar
              meta={study.meta}
              categories={study.categories}
              liveUrl={study.liveUrl}
              className="order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2"
            />

            <div className="order-1 min-w-0 lg:col-start-2 lg:row-start-1">
              <CaseStudyHero
                title={study.title}
                subtitle={study.subtitle}
                lede={study.lede}
                objective={study.objective}
                summaryCards={study.summaryCards}
                heroImage={study.heroImage}
                heroVideoOverlay={study.heroVideoOverlay}
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
            </div>

            <div className="order-3 min-w-0 lg:col-start-2 lg:row-start-2">
              <CaseStudyProjectNav
                prev={prev}
                next={next}
                basePath={context.navBasePath}
                ariaLabel={context.navAriaLabel}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
