import dynamic from "next/dynamic";
import Hero from "@/sections/Hero";

const FeaturedWork = dynamic(() => import("@/sections/FeaturedWork"));
const Journal = dynamic(() => import("@/sections/Journal"));
const Experiments = dynamic(() => import("@/sections/Experiments"));
const Writing = dynamic(() => import("@/sections/Writing"));
const Testimonials = dynamic(() => import("@/sections/Testimonials"));
const Footer = dynamic(() => import("@/sections/Footer"));

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <FeaturedWork />
      <Journal />
      <Experiments />
      <Writing />
      <Testimonials />
      <Footer />
    </main>
  );
}
