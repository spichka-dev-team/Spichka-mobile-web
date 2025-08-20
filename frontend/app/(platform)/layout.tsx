import type React from "react";
import { TabBar } from "@/components/widgets/";

export const metadata = {
  title: "Spichka - главная",
  description: "Просмотр событий, организаторов и исполнителей",
};

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* Tab Bar */}
      <TabBar />
    </>
  );
}
