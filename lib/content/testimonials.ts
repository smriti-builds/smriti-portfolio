import type { Testimonial } from "@/types/testimonials";

export const testimonialsContent = {
  title: "Recommendations",
} as const;

/** Display width for each carousel card. */
export const TESTIMONIAL_CARD_WIDTH = 560;

/** Card corner radius from Figma. */
export const TESTIMONIAL_CARD_BORDER_RADIUS = 40;

/** Gap between carousel cards. */
export const TESTIMONIAL_CARD_GAP = 32;

/** Index of the card centered on first paint (Vikram in Figma). */
export const TESTIMONIAL_INITIAL_INDEX = 1;

/** Right padding so the last card can scroll into view with a peek. */
export const TESTIMONIAL_CAROUSEL_END_PADDING = 52;


export const testimonialsLayout = {
  /** Space between the writing bottom ribbon and the heading. */
  ribbonToHeadingPx: 32,
  ribbonToHeadingMdPx: 40,
  headingToCardsPx: 64,
  sectionBottomPx: 100,
} as const;

export const testimonials: Testimonial[] = [
  {
    id: "haziq-mir",
    quote:
      "In her short time at Dunzo, Smriti has delivered quality work with precision and care. She has proven to be someone whom the team can rely on.",
    name: "Haziq Mir",
    role: "Design Director, Dunzo",
    avatar: {
      src: "/Recommendations/Haziq.png",
      width: 156,
      height: 156,
      alt: "Portrait of Haziq Mir",
    },
  },
  {
    id: "vikram-shah",
    quote:
      "A talented designer with a sharp eye for detail and a great balance of usability and aesthetics. She will add tremendous value to any team she joins",
    name: "Vikram Shah",
    role: "Co-Founder & CTO, Internshala",
    avatar: {
      src: "/Recommendations/Vikram.png",
      width: 156,
      height: 156,
      alt: "Portrait of Vikram Shah",
    },
  },
  {
    id: "shivani-gaur",
    quote:
      "Smriti is one of the most reliable team member who is hard working and have great ownership to deliver projects. She has led the entire recruitment product single handedly",
    name: "Shivani Gaur",
    role: "Lead Product Designer, PhonePe",
    avatar: {
      src: "/Recommendations/Shivani.png",
      width: 156,
      height: 156,
      alt: "Portrait of Shivani Gaur",
    },
  },
];
