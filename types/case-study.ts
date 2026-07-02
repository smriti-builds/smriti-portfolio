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

export type CaseStudyImageMedia = {
  type: "image";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type CaseStudyVideoMedia = {
  type: "video";
  src: string;
  alt: string;
  poster?: string;
  caption?: string;
  /** Defaults to false. Set true for short ambient demos (always pair with muted). */
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Defaults to true. */
  controls?: boolean;
};

export type CaseStudyMedia = CaseStudyImageMedia | CaseStudyVideoMedia;

export type CaseStudySection = {
  id: string;
  eyebrow: string;
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  closingParagraphs?: string[];
  media?: CaseStudyMedia[];
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
