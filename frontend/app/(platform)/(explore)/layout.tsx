// app/platform/layout.tsx
import React from "react";
import { PlatformHeader } from "@/components/widgets";

export const metadata = {
  title: "Платформа мероприятий",
  description: "Просмотр событий, организаторов и исполнителей",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PlatformHeader />

      {/* Контент */}
      {children}
    </>
  );
}
