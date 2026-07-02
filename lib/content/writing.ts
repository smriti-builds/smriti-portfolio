import type { WritingPost } from "@/types/writing";

export const writingContent = {
  title: "A record of curiosity",
  subtitle: "The things I learn, question, & occasionally write about.",
} as const;

export const writingAssets = {
  topSeparator: {
    src: "/Blogs/Top_Separator.png",
    width: 2880,
    height: 424,
    alt: "",
  },
  bottomSeparator: {
    src: "/Blogs/Bottom_Separator.png",
    width: 2880,
    height: 424,
    alt: "",
  },
} as const;

/** Display width for each carousel card (Figma blog frame @1x). */
export const WRITING_CARD_WIDTH = 348;

/** Gap between carousel cards. */
export const WRITING_CARD_GAP = 32;

/** Right padding when the last card is fully scrolled into view. */
export const WRITING_CAROUSEL_END_PADDING = 52;

export const writingPosts: WritingPost[] = [
  {
    id: "machines-intelligence",
    title: "What if machines become more intelligent than human?",
    date: "Oct 1, 2019",
    image: {
      src: "/Blogs/blog1.png",
      width: 696,
      height: 480,
      alt: "Rolling green hills with wildflowers",
    },
  },
  {
    id: "money-heist-ux",
    title: "Similarities between Money Heist & UX Design",
    date: "May 28, 2020",
    image: {
      src: "/Blogs/blog2.png",
      width: 696,
      height: 480,
      alt: "Money Heist Dali mask illustration",
    },
  },
  {
    id: "paytm-phonepe",
    title: "Paytm or PhonePe : The age of digital money!",
    date: "Jan 3, 2020",
    image: {
      src: "/Blogs/blog3.png",
      width: 744,
      height: 480,
      alt: "Hand holding a smartphone near a payment terminal",
    },
  },
  {
    id: "agency-redesign",
    title: "Website redesign for a creative design agency",
    date: "Sep 01, 2021",
    image: {
      src: "/Blogs/blog4.png",
      width: 696,
      height: 480,
      alt: "Creative agency website redesign preview",
    },
  },
];
