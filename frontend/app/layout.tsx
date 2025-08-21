import type { Metadata } from "next";
import {
  jost,
  libreFranklin,
  comfortaa,
  unbounded,
  geologica,
} from "./ui/fonts";
import "./globals.css";
import Providers from "@/components/shared/ui/Providers";
import { NotificationProvider } from "@/components/features";

export const metadata: Metadata = {
  title: "Spichka App",
  description: "Спичка — платформа камерных событий и живых встреч",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Spichka" />
      </head>
      <body
        className={`${jost.variable} ${comfortaa.variable} ${libreFranklin.variable} ${unbounded.variable} ${geologica.variable}`}
      >
        <Providers>{children}</Providers>
        <NotificationProvider />
      </body>
    </html>
  );
}
