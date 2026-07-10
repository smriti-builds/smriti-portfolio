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

  const match = css.match(/src: url\((.+)\) format\('(?:opentype|truetype)'\)/);
  if (!match?.[1]) {
    throw new Error(`Failed to load font: ${family}`);
  }

  return fetch(match[1]).then((response) => response.arrayBuffer());
}

export default async function Image() {
  const [yellowtail, instrumentSans, painting, journal] = await Promise.all([
    loadGoogleFont("Yellowtail", 400),
    loadGoogleFont("Instrument+Sans", 500),
    readFile(join(process.cwd(), "public/Hero/hero-image-painting.png")),
    readFile(join(process.cwd(), "public/Hero/hero-image-journal.png")),
  ]);

  const paintingSrc = `data:image/png;base64,${painting.toString("base64")}`;
  const journalSrc = `data:image/png;base64,${journal.toString("base64")}`;

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

        <img
          src={paintingSrc}
          alt=""
          width={220}
          height={220}
          style={{
            position: "absolute",
            left: 72,
            top: 96,
            transform: "rotate(-8deg)",
            objectFit: "contain",
          }}
        />
        <img
          src={journalSrc}
          alt=""
          width={180}
          height={180}
          style={{
            position: "absolute",
            left: 250,
            top: 300,
            transform: "rotate(10deg)",
            objectFit: "contain",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: 500,
            paddingRight: 80,
            height: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "Yellowtail",
              fontSize: 88,
              lineHeight: 1.1,
              color: "#3e3e42",
              letterSpacing: "2px",
            }}
          >
            Smriti Rawat
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "Instrument Sans",
              fontSize: 30,
              lineHeight: 1.3,
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Product Design @Dream 11 | Ex- Dunzo
          </div>
          <div
            style={{
              marginTop: 24,
              maxWidth: 560,
              fontFamily: "Instrument Sans",
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.45,
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
