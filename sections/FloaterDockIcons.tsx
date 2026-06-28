import Image from "next/image";

const ICON_SIZE = 56;

const dockImages = {
  notes: "/Dock/notes.png",
  linkedin: "/Dock/linkedin.png",
  phone: "/Dock/phone.png",
  medium: "/Dock/medium.png",
} as const;

type FloaterDockIconProps = {
  icon: keyof typeof dockImages | "email";
};

export function FloaterDockEmailIcon() {
  return (
    <div
      className="relative size-full overflow-hidden rounded-[12px]"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-[#3b7ef2] to-[#46bee2]" />
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-b from-[32.812%] from-white/20 to-black/[0.02] mix-blend-soft-light" />
      <div
        className="absolute inset-0 rounded-[12px]"
        style={{
          boxShadow:
            "inset -0.45px -0.45px 0.45px rgba(0,0,0,0.05), inset 0.45px 0.45px 0.45px rgba(255,255,255,0.2)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Dock/email-envelope.svg"
          alt=""
          className="h-[26px] w-[41px]"
        />
      </div>
    </div>
  );
}

export function FloaterDockIconImage({
  icon,
}: {
  icon: keyof typeof dockImages;
}) {
  return (
    <Image
      src={dockImages[icon]}
      alt=""
      width={ICON_SIZE}
      height={ICON_SIZE}
      className="size-full rounded-[12px] object-cover"
    />
  );
}

export function FloaterDockIconView({ icon }: FloaterDockIconProps) {
  if (icon === "email") {
    return <FloaterDockEmailIcon />;
  }

  return <FloaterDockIconImage icon={icon} />;
}
