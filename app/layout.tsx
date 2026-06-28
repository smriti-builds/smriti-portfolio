import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  Yellowtail,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Smriti Rawat — Product Designer",
  description: "Senior product designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${yellowtail.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-instrument-sans">
        {children}
      </body>
    </html>
  );
}
