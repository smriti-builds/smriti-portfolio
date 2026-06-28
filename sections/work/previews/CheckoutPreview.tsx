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

/** Figma 981:1559 — Checkout drop-off mask group */
export default function CheckoutPreview() {
  const mask = workAssets.card3.phoneMask;

  return (
    <div
      className="relative aspect-[616.5/400] w-full overflow-hidden rounded-[24px]"
      style={{ backgroundColor: "#e5f2ff" }}
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
          className="pointer-events-none absolute shadow-[0px_-6.913px_30.312px_0px_rgba(0,0,0,0.1),0px_-20.208px_21.271px_0px_rgba(255,255,255,0.1),0px_43.607px_66.473px_0px_rgba(0,0,0,0.15),0px_19.676px_19.676px_0px_rgba(0,0,0,0.25)]"
          style={{
            left: pctX(156.5),
            top: pctY(51),
            width: pctW(322.992),
            height: pctH(665),
          }}
        >
          <div
            className="absolute overflow-hidden rounded-[44px] bg-black"
            style={{
              left: "3.5%",
              top: "3%",
              width: "93%",
              height: "94%",
            }}
          >
            <Image
              src={workAssets.card3.screen}
              alt=""
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute"
          style={{
            left: pctX(18.81),
            top: pctY(247.31),
            width: pctW(215.384),
            height: pctH(215.384),
          }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="-rotate-[9.97deg]">
              <Image
                src={workAssets.card3.deco1}
                alt=""
                width={186}
                height={186}
                className="max-w-none object-cover"
                style={{ width: pctW(186) }}
              />
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute"
          style={{
            left: pctX(426.51),
            top: pctY(103.01),
            width: pctW(138.982),
            height: pctH(138.982),
          }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="rotate-[12.14deg]">
              <Image
                src={workAssets.card3.deco2}
                alt=""
                width={117}
                height={117}
                className="max-w-none object-cover"
                style={{ width: pctW(117) }}
              />
            </div>
          </div>
        </div>
        <Image
          src={workAssets.card3.shadow}
          alt=""
          width={454}
          height={55}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(63.5), top: pctY(365), width: pctW(454) }}
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
          src={workAssets.card3.smiley}
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
