"use client";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  async function logout() {
    // Вызываем наш роут
    await fetch("/api/auth/logout", { method: "POST" });

    // Редиректим на страницу логина или главную
    router.push("/homepage");
  }

  return logout;
}
