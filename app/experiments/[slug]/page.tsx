import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import {
  getAdjacentCaseStudies,
  getAllCaseStudySlugs,
  getCaseStudy,
} from "@/lib/content/case-studies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case study not found" };
  }

  return {
    title: `${study.title} — Smriti Rawat`,
    description: study.lede,
    openGraph: {
      title: study.title,
      description: study.lede,
      images: [{ url: study.heroImage.src, alt: study.heroImage.alt }],
    },
  };
}

export default async function ExperimentCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const { prev, next } = getAdjacentCaseStudies(slug);

  return <CaseStudyPage study={study} prev={prev} next={next} />;
}
