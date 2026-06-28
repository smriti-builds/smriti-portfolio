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

/** Figma 981:1510 — Padel intelligence platform mask group */
export default function PadelPlatformPreview() {
  const mask = workAssets.card2.phoneMask;

  return (
    <div
      className="relative aspect-[616.5/400] w-full overflow-hidden rounded-[24px]"
      style={{ backgroundColor: "#ececff" }}
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
        <div
          className="pointer-events-none absolute shadow-[0px_6.91px_30.312px_0px_rgba(0,0,0,0.1),0px_20.21px_21.271px_0px_rgba(255,255,255,0.1),0px_-43.61px_66.473px_0px_rgba(0,0,0,0.15),0px_-19.68px_19.676px_0px_rgba(0,0,0,0.25)]"
          style={{
            left: pctX(146.5),
            top: pctY(-288),
            width: pctW(322.992),
            height: pctH(665),
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={workAssets.card2.stroke}
              alt=""
              fill
              className="object-fill"
            />
            <div
              className="absolute overflow-hidden rounded-[44px]"
              style={{
                left: "3.5%",
                top: "27.8%",
                width: "93.5%",
                height: "70.2%",
              }}
            >
              <Image
                src={workAssets.card2.screen}
                alt=""
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
        <Image
          src={workAssets.card2.shadow}
          alt=""
          width={454}
          height={55}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(91.5), top: pctY(-27), width: pctW(454) }}
        />
        <Image
          src={workAssets.card2.ball}
          alt=""
          width={92}
          height={92}
          className="pointer-events-none absolute max-w-none object-cover"
          style={{ left: pctX(448.5), top: pctY(25), width: pctW(92) }}
        />
        <Image
          src={workAssets.card2.ball}
          alt=""
          width={90}
          height={90}
          className="pointer-events-none absolute max-w-none object-cover"
          style={{ left: pctX(73.5), top: pctY(291), width: pctW(90) }}
        />
        <Image
          src={workAssets.shared.star}
          alt=""
          width={103}
          height={103}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(513.5), top: pctY(297), width: pctW(103) }}
        />
        <Image
          src={workAssets.card2.smiley}
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(548.5), top: pctY(332), width: pctW(64) }}
        />
      </div>
    </div>
  );
}
