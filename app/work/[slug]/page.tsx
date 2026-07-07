import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import {
  getAdjacentWorkCaseStudies,
  getAllWorkCaseStudySlugs,
  getWorkCaseStudy,
  workCaseStudyPageContext,
} from "@/lib/content/work-case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllWorkCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getWorkCaseStudy(slug);

  if (!study) {
    return { title: "Case study not found" };
  }

  const description = study.lede.replace(/^>>|^!!/gm, "").trim();

  return {
    title: `${study.title} — Smriti Rawat`,
    description,
    openGraph: {
      title: study.title,
      description,
      images: [{ url: study.heroImage.src, alt: study.heroImage.alt }],
    },
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getWorkCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const { prev, next } = getAdjacentWorkCaseStudies(slug);

  return (
    <CaseStudyPage
      study={study}
      prev={prev}
      next={next}
      context={workCaseStudyPageContext}
    />
  );
}
