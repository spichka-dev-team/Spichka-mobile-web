import {
  Jost,
  Libre_Franklin,
  Comfortaa,
  Unbounded,
  Geologica,
} from "next/font/google";

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

export const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

export const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geologica",
  display: "swap",
});
