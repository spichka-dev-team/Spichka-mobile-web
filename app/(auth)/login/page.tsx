import React from "react";
import { AuthPage } from "@/components/pages/AuthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spichka - авторизация",
  description: "Спичка — платформа камерных событий и живых встреч",
};

const Page = () => {
  return (
    <div>
      <AuthPage />
    </div>
  );
};

export default Page;
