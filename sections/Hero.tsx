import HeroClient from "@/sections/HeroClient";
import HeroMobileClient from "@/sections/HeroMobileClient";

export default function Hero() {
  return (
    <>
      <HeroMobileClient />
      {/* contents wrapper hides desktop below md without altering its layout at md+ */}
      <div className="hidden md:contents">
        <HeroClient />
      </div>
    </>
  );
}
