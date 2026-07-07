import type { ExperimentImage } from "@/types/experiments";

export type CaseStudyCalloutType = "learning" | "hiccup" | "decision" | "impact";

export type CaseStudyCallout = {
  type: CaseStudyCalloutType;
  title: string;
  body: string | string[];
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
  fit?: "cover" | "contain";
  /** Vertical focal point when fit is cover. Defaults to center. */
  objectPosition?: "top" | "center";
  /** Slight zoom to crop edge artifacts when using object-cover. e.g. 1.06 */
  imageScale?: number;
  /** Optional cell background behind the image. */
  backgroundColor?: string;
  /** Serve the file directly without Next.js image optimization (avoids stale caches). */
  unoptimized?: boolean;
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

export type CaseStudyComparisonTableRow = {
  stage: string;
  traditional: string;
  aiAssisted: string;
};

export type CaseStudyComparisonTable = {
  headers: {
    stage: string;
    traditional: string;
    aiAssisted: string;
  };
  rows: CaseStudyComparisonTableRow[];
};

export type CaseStudyMediaGrid = {
  columns?: 1 | 2;
  items: CaseStudyMedia[];
};

export type CaseStudyResearchStat = {
  label: string;
  value: string;
};

export type CaseStudyResearchInsight = {
  quoteRegular: string;
  quoteItalic?: string;
};

export type CaseStudyResearchFeedbackClip = {
  name: string;
  quote: string;
};

export type CaseStudyResearchGallery = {
  items: CaseStudyMedia[];
  feedbackClips: CaseStudyResearchFeedbackClip[];
};

export type CaseStudySection = {
  id: string;
  eyebrow: string;
  title?: string;
  variant?: "default" | "immersive";
  paragraphs?: string[];
  bullets?: string[];
  closingParagraphs?: string[];
  postCalloutParagraphs?: string[];
  researchStats?: CaseStudyResearchStat[];
  researchInsights?: CaseStudyResearchInsight[];
  researchGallery?: CaseStudyResearchGallery;
  /** Subheading shown between research stats and insight cards. */
  insightsTitle?: string;
  comparisonTable?: CaseStudyComparisonTable;
  media?: CaseStudyMedia[];
  mediaGrid?: CaseStudyMediaGrid;
  callouts?: CaseStudyCallout[];
  /** When "afterParagraphs", callouts render before continuedParagraphs and bullets. */
  calloutPlacement?: "afterParagraphs" | "default";
  continuedParagraphs?: string[];
  timeline?: CaseStudyTimelineItem[];
};

export type CaseStudyMeta = {
  duration: string;
  status: "Shipped" | "In progress";
  role: string[];
  team?: string[];
  tools: string[];
  impact?: string;
};

export type CaseStudySummaryCardType =
  | "challenge"
  | "breakthrough"
  | "outcome";

export type CaseStudySummaryCard = {
  type: CaseStudySummaryCardType;
  title: string;
  body: string;
};

export type CaseStudyPageContext = {
  backHref: string;
  backLabel: string;
  navBasePath: string;
  navAriaLabel: string;
};

export type CaseStudy = {
  slug: string;
  experimentId: string;
  title: string;
  subtitle: string;
  lede: string;
  objective?: string;
  summaryCards?: CaseStudySummaryCard[];
  categories: string[];
  heroImage: ExperimentImage;
  meta: CaseStudyMeta;
  sections: CaseStudySection[];
  relatedSlugs: string[];
  liveUrl?: string;
};
