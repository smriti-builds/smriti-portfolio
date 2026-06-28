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

/** Figma 981:1607 — Interview scheduler mask group */
export default function InterviewSchedulerPreview() {
  const mask = workAssets.card4.phoneMask;

  return (
    <div
      className="relative aspect-[616.5/400] w-full overflow-hidden rounded-[24px]"
      style={{ backgroundColor: "#d4efdd" }}
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
          className="pointer-events-none absolute"
          style={{
            left: pctX(183.5),
            top: pctY(16),
            width: pctW(507.728),
            height: pctH(642.304),
          }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="rotate-[10.42deg]">
              <div className="relative h-[577.678px] w-[410.014px] max-w-none overflow-hidden rounded-2xl shadow-[-12px_0px_12px_0px_rgba(0,0,0,0.12)]">
                <Image
                  src={workAssets.card4.main}
                  alt=""
                  fill
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute"
          style={{ left: pctX(71.5), top: pctY(29) }}
        >
          <div className="relative h-[355px] w-[322px] rounded-[11.538px] bg-[#4e89ff]">
            <span className="absolute left-[40px] top-[52px] rounded-[72px] bg-[#edf3ff] px-[17px] py-[9px] font-instrument-sans text-[14px] font-bold uppercase tracking-[0.14px] text-[#6393f8]">
              apply
            </span>
            <span className="absolute left-[40px] top-[114px] rounded-[72px] bg-white px-[17px] py-[9px] font-instrument-sans text-[14px] font-bold uppercase tracking-[0.14px] text-[#6393f8]">
              Notification
            </span>
            <span className="absolute left-[40px] top-[176px] rounded-[72px] bg-white px-[17px] py-[9px] font-instrument-sans text-[14px] font-bold uppercase tracking-[0.14px] text-[#6393f8]">
              Chat
            </span>
            <div className="absolute left-[218px] top-[206px] -rotate-[8.74deg] rounded-[11.538px] border border-[#282828] bg-[#ffcd37] px-[23px] py-[6px] font-inter text-[23px] font-semibold text-[#434242]">
              Designer
            </div>
          </div>
          <div className="absolute left-0 top-[49px]">
            <div className="-rotate-[8.74deg] rounded-[11.538px] border border-[#414141] bg-[#d760f0] px-[23px] py-[6px] font-inter text-xl font-semibold text-white">
              You
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute -rotate-[8.74deg] rounded-[11.538px] border border-[#414141] bg-[#ffcd37] px-[23px] py-[6px] font-inter text-xl font-semibold text-[#434242]"
          style={{ left: pctX(114.5), top: pctY(299) }}
        >
          Recruiter
        </div>
        <Image
          src={workAssets.card4.shadow}
          alt=""
          width={454}
          height={55}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(63.5), top: pctY(365), width: pctW(454) }}
        />
        <Image
          src={workAssets.card4.star}
          alt=""
          width={103}
          height={103}
          className="pointer-events-none absolute max-w-none"
          style={{ left: pctX(513.5), top: pctY(297), width: pctW(103) }}
        />
        <Image
          src={workAssets.card4.smiley}
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
