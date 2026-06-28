import Image from "next/image";
import { workAssets } from "@/sections/work/work-assets";

const CARD_WIDTH = 616.5;
const CARD_HEIGHT = 400;

function pctX(px: number) {
  return `${(px / CARD_WIDTH) * 100}%`;
}

function pctY(px: number) {
  return `${(px / CARD_HEIGHT) * 100}%`;
}

function pctW(px: number) {
  return `${(px / CARD_WIDTH) * 100}%`;
}

function pctH(px: number) {
  return `${(px / CARD_HEIGHT) * 100}%`;
}

/** Figma 981:1487 — Real time AI commentary mask group */
export default function AiCommentaryPreview() {
  const mask = workAssets.card1.mask;

  return (
    <div
      className="relative aspect-[616.5/400] w-full overflow-hidden rounded-[24px]"
      style={{ backgroundColor: "#f4f0e5" }}
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url("${mask}")`,
          WebkitMaskImage: `url("${mask}")`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <Image
          src={workAssets.card1.phone}
          alt=""
          width={479}
          height={860}
          className="pointer-events-none absolute max-w-none object-cover"
          style={{
            left: pctX(50),
            top: pctY(0),
            width: pctW(479),
            height: "auto",
          }}
          priority
        />
        <Image
          src={workAssets.card1.deco}
          alt=""
          width={151}
          height={151}
          className="pointer-events-none absolute max-w-none object-cover"
          style={{ left: pctX(0), top: pctY(287), width: pctW(151) }}
        />
        <Image
          src={workAssets.card1.shadow}
          alt=""
          width={454}
          height={55}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(43), top: pctY(365), width: pctW(454) }}
        />
        <Image
          src={workAssets.card1.ball}
          alt=""
          width={90}
          height={90}
          className="pointer-events-none absolute max-w-none object-cover"
          style={{ left: pctX(449), top: pctY(126), width: pctW(90) }}
        />
        <Image
          src={workAssets.card1.star}
          alt=""
          width={103}
          height={103}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(514), top: pctY(297), width: pctW(103) }}
        />
        <Image
          src={workAssets.card1.smiley}
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(546.92), top: pctY(332), width: pctW(64) }}
        />
      </div>
    </div>
  );
}
