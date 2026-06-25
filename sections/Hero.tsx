"use client";

import { useEffect, useState } from "react";
import { heroContent } from "@/lib/content/hero";
import { artboardCanvasStyle } from "@/lib/hero/layout";
import HeroClient from "@/sections/HeroClient";

function HeroPlaceholder() {
  const { width, height } = heroContent.artboard;

  return (
    <section aria-label="Hero" className="w-full shrink-0 bg-bg-cream">
      <div className="mx-auto w-full max-w-[1440px] overflow-x-auto bg-bg-cream">
        <div className="relative shrink-0 bg-bg-cream" style={artboardCanvasStyle(width, height)} />
      </div>
    </section>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeroPlaceholder />;
  }

  return <HeroClient />;
}
