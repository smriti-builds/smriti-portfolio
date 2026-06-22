import type { Metadata } from "next";
import {
  Instrument_Sans,
  Inter,
  Playwrite_US_Modern,
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
  weight: ["400", "500", "600"],
});

const playwrite = Playwrite_US_Modern({
  variable: "--font-playwrite",
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
      className={`${inter.variable} ${instrumentSans.variable} ${playwrite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-instrument-sans">
        {children}
      </body>
    </html>
  );
}
