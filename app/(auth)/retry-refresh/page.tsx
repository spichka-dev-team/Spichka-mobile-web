"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LocationPageSkeleton } from "@/components/pages/LocationPage";

export default function RetryRefreshPage() {
  const router = useRouter();

  useEffect(() => {
    async function refreshAndRetry() {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Не удалось обновить токен");
        }

        // Успешно — вернемся на профиль
        router.replace("/profile");
      } catch (err) {
        console.error("Ошибка обновления токена:", err);
        router.replace("/login");
      }
    }

    refreshAndRetry();
  }, []);

  return <LocationPageSkeleton />;
}
