import Experiments from "@/sections/Experiments";
import FeaturedWork from "@/sections/FeaturedWork";
import FloaterDock from "@/sections/FloaterDock";
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
      <div id="floater-dock-trigger" className="h-px w-full" aria-hidden />
      <Journal />
      <Experiments />
      <Writing />
      <Testimonials />
      <Footer />
      <FloaterDock />
    </main>
  );
}
