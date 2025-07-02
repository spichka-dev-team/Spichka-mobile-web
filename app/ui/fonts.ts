import { Jost, Libre_Franklin } from "next/font/google";

export const jost = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

export const libreFranklin = Libre_Franklin({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-libre-franklin",
  display: "swap",
});
