import type { ExperimentImage } from "@/types/experiments";

export type CaseStudyCalloutType = "learning" | "hiccup" | "decision" | "impact";

export type CaseStudyCallout = {
  type: CaseStudyCalloutType;
  title: string;
  body: string;
};

export type CaseStudyTimelineItem = {
  date: string;
  title: string;
  description: string;
};

export type CaseStudySection = {
  id: string;
  eyebrow: string;
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  callouts?: CaseStudyCallout[];
  timeline?: CaseStudyTimelineItem[];
};

export type CaseStudyMeta = {
  duration: string;
  status: "Shipped" | "In progress";
  role: string[];
  tools: string[];
  impact?: string;
};

export type CaseStudy = {
  slug: string;
  experimentId: string;
  title: string;
  subtitle: string;
  lede: string;
  categories: string[];
  heroImage: ExperimentImage;
  meta: CaseStudyMeta;
  sections: CaseStudySection[];
  relatedSlugs: string[];
  liveUrl?: string;
};
