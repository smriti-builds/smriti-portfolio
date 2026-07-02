export type WritingImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type WritingPost = {
  id: string;
  title: string;
  date: string;
  image: WritingImage;
  href?: string;
};
