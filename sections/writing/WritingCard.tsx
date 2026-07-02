"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { WritingPost } from "@/types/writing";

const CARD_TRANSITION = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

type WritingCardProps = {
  post: WritingPost;
  index: number;
};

function CardContent({
  post,
  priority,
}: {
  post: WritingPost;
  priority: boolean;
}) {
  const { image, title, date } = post;

  return (
    <>
      <div className="relative aspect-[348/240] w-full overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 85vw, 348px"
          priority={priority}
          draggable={false}
        />
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <h3 className="font-instrument-sans text-xl font-semibold leading-8 text-text-primary">
          {title}
        </h3>
        <p className="font-instrument-sans text-base font-medium text-text-secondary">
          {date}
        </p>
      </div>
    </>
  );
}

export default function WritingCard({ post, index }: WritingCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = {
    className:
      "group flex w-[min(348px,85vw)] shrink-0 flex-col rounded-[20px] bg-white p-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] md:w-[348px]",
    initial: prefersReducedMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { ...CARD_TRANSITION, delay: index * 0.1 },
  } as const;

  if (post.href) {
    const isExternal = post.href.startsWith("http");

    return (
      <motion.article {...motionProps}>
        <Link
          href={post.href}
          className="flex flex-col outline-offset-4 focus-visible:outline-2 focus-visible:outline-text-primary"
          aria-label={`Read article: ${post.title}`}
          draggable={false}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <CardContent post={post} priority={index === 0} />
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article {...motionProps}>
      <CardContent post={post} priority={index === 0} />
    </motion.article>
  );
}
