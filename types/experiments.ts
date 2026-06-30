export type ExperimentImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ExperimentCard = {
  id: string;
  label: string;
  headline: string;
  image: ExperimentImage;
  /** Set when the card should link to a live artifact or case study. */
  href?: string;
};
