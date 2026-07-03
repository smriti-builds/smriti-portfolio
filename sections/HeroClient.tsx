import HeroDesktopClient from "@/sections/HeroDesktopClient";
import HeroMobileClient from "@/sections/HeroMobileClient";

export default function HeroClient() {
  return (
    <div id="hero">
      <HeroMobileClient />
      <HeroDesktopClient />
    </div>
  );
}
