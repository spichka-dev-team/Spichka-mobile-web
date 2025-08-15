"use client";

import { Home, Search, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";

const CREATOR_ROLE_ID = "37a0bb0e-ca4c-4234-966e-c5fe212e9c60";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: User;
  }
}

export const TabBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const tabItems = [
    { icon: Home, href: "/homepage", label: "Главная" },
    {
      icon: Search,
      href: "/search",
      className: "scale-x-[-1]",
      label: "Поиск",
    },
    { icon: User, href: "/profile", label: "Профиль" },
  ];

  if (session?.user?.role === CREATOR_ROLE_ID) {
    tabItems.splice(3, 0, {
      icon: Plus,
      href: "/profile/creator/event_creation",
      label: "Создать",
    });
  }

  if (pathname.endsWith("/payment") || pathname.includes("/profile/update")) {
    return null;
  }

  return (
    <div
      className={cn(
        styles.TabBar,
        "fixed max-h-[128px] flex justify-center bottom-0 left-0 right-0 z-40 px-6 py-4"
      )}
    >
      <nav className="flex w-full max-w-[250px] items-center justify-center gap-2">
        {tabItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/homepage" && pathname.endsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200",
                item.className || "",
                isActive
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-gray-600/50"
              )}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
