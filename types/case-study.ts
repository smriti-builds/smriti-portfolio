import type { ExperimentImage } from "@/types/experiments";

export type CaseStudyCalloutType = "learning" | "hiccup" | "decision" | "impact";

export type CaseStudyCallout = {
  type: CaseStudyCalloutType;
  title: string;
  body: string | string[];
  hideEyebrow?: boolean;
  /** When set, shows #N in the badge instead of the type icon. */
  number?: number;
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
  /** Cap display width (px) so low-res assets are not upscaled. */
  maxWidth?: number;
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
  /** Zoom past embedded letterboxing; container overflow clips the edges. */
  videoScale?: number;
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

export type CaseStudyBeforeAfter = {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
};

export type CaseStudyFunnelMetric = {
  label: string;
  value: string;
};

export type CaseStudyFlowChangeRow = {
  label: string;
  steps: string[];
  note?: string;
  tone?: "pre" | "post";
};

export type CaseStudyFunnelFollowUp =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "spacer" };

export type CaseStudyHypothesis = {
  title: string;
  body: string;
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

export type CaseStudyCalloutLayout = "default" | "three-column";

export type CaseStudyArchitectureNode = {
  label: string;
  /** Nested context items shown under this node (e.g. Context Engine inputs). */
  detailItems?: string[];
  /** Highlights the terminal/output node. */
  emphasis?: boolean;
};

export type CaseStudyArchitectureDiagram = {
  nodes: CaseStudyArchitectureNode[];
  ariaLabel: string;
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
  funnelMetrics?: CaseStudyFunnelMetric[];
  flowChanges?: CaseStudyFlowChangeRow[];
  funnelFollowUp?: CaseStudyFunnelFollowUp[];
  hypothesis?: CaseStudyHypothesis;
  hypotheses?: CaseStudyHypothesis[];
  /** When "end", hypothesis renders after gallery/closing content. Default: after paragraphs. */
  hypothesisPlacement?: "afterParagraphs" | "end";
  researchStats?: CaseStudyFunnelMetric[];
  researchInsights?: CaseStudyResearchInsight[];
  researchGallery?: CaseStudyResearchGallery;
  /** Subheading shown between research stats and insight cards. */
  insightsTitle?: string;
  comparisonTable?: CaseStudyComparisonTable;
  architectureDiagram?: CaseStudyArchitectureDiagram;
  media?: CaseStudyMedia[];
  mediaGrid?: CaseStudyMediaGrid;
  beforeAfter?: CaseStudyBeforeAfter;
  callouts?: CaseStudyCallout[];
  /** Controls callout grid layout. "three-column" renders equal cards in a row. */
  calloutLayout?: CaseStudyCalloutLayout;
  additionalCallouts?: CaseStudyCallout[];
  /** When "afterParagraphs", callouts render before continuedParagraphs and bullets. */
  calloutPlacement?: "afterParagraphs" | "default";
  continuedParagraphs?: string[];
  timeline?: CaseStudyTimelineItem[];
  /** Reduces space above this section relative to the previous one. */
  spacing?: "default" | "compact";
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

export type CaseStudyHeroVideoViewport = {
  top: number;
  left: number;
  width: number;
  height: number;
  borderRadius: number;
};

export type CaseStudyHeroVideoOverlay = {
  frameImage: ExperimentImage;
  videoSrc: string;
  videoAlt: string;
  desktopViewport: CaseStudyHeroVideoViewport;
  mobileViewport?: CaseStudyHeroVideoViewport;
  /** Crops only the top of the video content by this percentage. */
  videoTopCropPercent?: number;
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
  /** Shown directly under Overview in the case study hero. */
  whyItMattered?: string;
  objective?: string;
  summaryCards?: CaseStudySummaryCard[];
  categories: string[];
  heroImage: ExperimentImage;
  heroVideoOverlay?: CaseStudyHeroVideoOverlay;
  meta: CaseStudyMeta;
  sections: CaseStudySection[];
  relatedSlugs: string[];
  liveUrl?: string;
};
