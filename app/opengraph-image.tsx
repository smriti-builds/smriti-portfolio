import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Smriti Rawat — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, weight: number) {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
      { next: { revalidate: 60 * 60 * 24 } },
    )
  ).text();

  const match = css.match(
    /src: url\((.+)\) format\('(?:opentype|truetype|woff2)'\)/,
  );
  if (!match?.[1]) {
    throw new Error(`Failed to load font: ${family}`);
  }

  return fetch(match[1]).then((response) => response.arrayBuffer());
}

async function loadHeroImage(filename: string) {
  const buffer = await readFile(
    join(process.cwd(), "public/Hero", filename),
  );
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

type CollageItem = {
  src: string;
  width: number;
  height: number;
  left: number;
  top: number;
  rotate?: number;
};

export default async function Image() {
  const [
    yellowtail,
    instrumentSans,
    painting,
    lamp,
    vinyl,
    plant,
    headphones,
    book,
    computer,
    stamps,
    coffee,
    camera,
    journal,
    folder,
    figma,
    claude,
    cursor,
  ] = await Promise.all([
    loadGoogleFont("Yellowtail", 400),
    loadGoogleFont("Instrument+Sans", 500),
    loadHeroImage("hero-image-painting.png"),
    loadHeroImage("hero-image-lamp.png"),
    loadHeroImage("hero-image-disk.png"),
    loadHeroImage("hero-image-plant.png"),
    loadHeroImage("hero-image-headphone.png"),
    loadHeroImage("hero-image-book.png"),
    loadHeroImage("hero-image-computer.png"),
    loadHeroImage("hero-image-stamps.png"),
    loadHeroImage("hero-image-coffee.png"),
    loadHeroImage("hero-image-camera.png"),
    loadHeroImage("hero-image-journal.png"),
    loadHeroImage("hero-image-folder.png"),
    loadHeroImage("hero-image-figma.png"),
    loadHeroImage("hero-image-claude.png"),
    loadHeroImage("hero-image-cursor.png"),
  ]);

  const leftCollage: CollageItem[] = [
    { src: painting, width: 176, height: 152, left: 28, top: 36, rotate: -18 },
    { src: lamp, width: 188, height: 238, left: -28, top: 148, rotate: 28 },
    { src: vinyl, width: 158, height: 150, left: 148, top: 268 },
    { src: plant, width: 152, height: 170, left: 18, top: 360, rotate: 24 },
    {
      src: headphones,
      width: 118,
      height: 120,
      left: 198,
      top: 455,
      rotate: -28,
    },
  ];

  const rightCollage: CollageItem[] = [
    { src: book, width: 118, height: 146, left: 910, top: 28, rotate: -22 },
    { src: claude, width: 52, height: 52, left: 1028, top: 42 },
    { src: figma, width: 48, height: 48, left: 1072, top: 28 },
    { src: cursor, width: 46, height: 42, left: 1102, top: 58 },
    { src: folder, width: 86, height: 80, left: 1040, top: 62 },
    { src: computer, width: 132, height: 132, left: 1055, top: 168 },
    { src: stamps, width: 172, height: 156, left: 880, top: 255 },
    { src: coffee, width: 156, height: 86, left: 1035, top: 395 },
    { src: camera, width: 96, height: 102, left: 955, top: 465, rotate: -38 },
    {
      src: journal,
      width: 98,
      height: 132,
      left: 1085,
      top: 455,
      rotate: -32,
    },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#f4f0e5",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #DFDBCD 1px, transparent 1px), linear-gradient(to bottom, #DFDBCD 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            opacity: 0.45,
          }}
        />

        {[...leftCollage, ...rightCollage].map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt=""
            width={item.width}
            height={item.height}
            style={{
              position: "absolute",
              left: item.left,
              top: item.top,
              transform: `rotate(${item.rotate ?? 0}deg)`,
              objectFit: "contain",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: 340,
            right: 300,
            top: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Yellowtail",
              fontSize: 78,
              lineHeight: 1.1,
              color: "#3e3e42",
              letterSpacing: "2px",
            }}
          >
            Smriti Rawat
          </div>
          <div
            style={{
              marginTop: 22,
              fontFamily: "Instrument Sans",
              fontSize: 24,
              lineHeight: 1.3,
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Product Design @Dream 11 | Ex- Dunzo
          </div>
          <div
            style={{
              marginTop: 18,
              maxWidth: 460,
              fontFamily: "Instrument Sans",
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#2e2d2b",
            }}
          >
            6 years of asking &quot;Why?&quot; until the product gets better.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Yellowtail",
          data: yellowtail,
          style: "normal",
          weight: 400,
        },
        {
          name: "Instrument Sans",
          data: instrumentSans,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
