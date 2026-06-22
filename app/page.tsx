import Experiments from "@/sections/Experiments";
import FeaturedWork from "@/sections/FeaturedWork";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Journal from "@/sections/Journal";
import Testimonials from "@/sections/Testimonials";
import Writing from "@/sections/Writing";

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
