export type TestimonialAvatar = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: TestimonialAvatar;
};
