import type React from "react";
import { getServerSession } from "next-auth";
import { TabBar } from "@/components/widgets/";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Spichka - главная",
  description: "Просмотр событий, организаторов и исполнителей",
};

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("Session in PlatformLayout:", session);

  return (
    <>
      {children}

      {/* Tab Bar */}
      <TabBar role={session?.user?.role} />
    </>
  );
}
