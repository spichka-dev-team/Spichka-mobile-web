import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

const PRIVATE_PATHS = ["/profile", "/settings", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivatePath = PRIVATE_PATHS.some((privatePath) =>
    pathname.startsWith(privatePath)
  );

  if (!isPrivatePath) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("spichka_token")?.value;
  const refreshToken = req.cookies.get("spichka_refresh")?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    try {
      const refreshResponse = await fetch(
        "https://d.vencera.tech/auth/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken, mode: "json" }),
        }
      );

      if (!refreshResponse.ok) {
        throw new Error("Не удалось обновить токен");
      }

      const result = await refreshResponse.json();
      const newAccessToken = result.data?.access_token || result.access_token;
      if (!newAccessToken) {
        throw new Error("В ответе нет нового access token");
      }

      const response = NextResponse.next();
      response.cookies.set("spichka_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return response;
    } catch (error) {
      console.error("Ошибка при обновлении токена:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.redirect(new URL("/login", req.url));
}
