import React from "react";
import { ProfilePageClient } from "@/components/pages/ProfilePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spichka - профиль",
  description: "Спичка — платформа камерных событий и живых встреч",
};

export default function ProfileRoute() {
  return <ProfilePageClient />;
}
