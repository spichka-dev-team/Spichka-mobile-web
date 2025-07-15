"use client";

import { Home, Search, Compass, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";

const tabItems = [
  {
    icon: Home,
    href: "/homepage",
    label: "Главная",
  },
  {
    icon: Search,
    href: "/search",
    label: "Поиск",
  },
  {
    icon: Compass,
    href: "/explore",
    label: "Обзор",
  },
  {
    icon: User,
    href: "/profile",
    label: "Профиль",
  },
];

export const TabBar = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        styles.TabBar,
        "fixed max-h-[128px] flex justify-center bottom-0 left-0 right-0 z-50  px-6 py-4"
      )}
    >
      <nav className="flex w-full max-w-[250px] items-center justify-between">
        {tabItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/homepage" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200",
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
