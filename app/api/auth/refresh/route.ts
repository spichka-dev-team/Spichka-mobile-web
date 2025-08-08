// app/api/refresh/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("spichka_refresh")?.value;

  console.log("Refresh_token: ", refreshToken);

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token not found" },
      { status: 401 }
    );
  }

  try {
    const backendResponse = await fetch(
      "http://185.47.167.116:8055/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          mode: "json",
        }),
        // credentials: 'include' — НЕ нужно, мы на сервере
      }
    );

    if (!backendResponse.ok) {
      const err = await backendResponse.text();
      console.error("Ошибка при обращении к бекенду /auth/refresh:", err);
      return NextResponse.json(
        { error: "Failed to refresh token" },
        { status: 401 }
      );
    }

    const result = await backendResponse.json();

    const accessToken = result.data?.access_token || result.access_token;
    const newRefreshToken = result.data?.refresh_token || result.refresh_token;

    if (!accessToken) {
      return NextResponse.json(
        { error: "No access token in response" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("spichka_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15 * 24, // 15 минут
    });

    response.cookies.set("spichka_refresh", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 15, // 15 дней
    });

    return response;
  } catch (error) {
    console.error("Ошибка на proxy роуте /api/refresh:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
