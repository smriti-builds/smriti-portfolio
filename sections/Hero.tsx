import HeroClient from "@/sections/HeroClient";
import HeroMobileClient from "@/sections/HeroMobileClient";

export default function Hero() {
  return (
    <div id="hero" className="min-w-0 max-w-[100vw]">
      <HeroMobileClient />
      {/* contents wrapper hides desktop below md without altering its layout at md+ */}
      <div className="hidden md:contents">
        <HeroClient />
      </div>
    </div>
  );
}
