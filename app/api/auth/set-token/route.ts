import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { access_token, refresh_token, expires } = body;

  if (!access_token || !refresh_token || !expires) {
    return NextResponse.json({ error: "Missing token data" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set("spichka_token", access_token, {
    httpOnly: true,
    path: "/",
    maxAge: expires / 1000, // если приходит в миллисекундах
  });

  response.cookies.set("spichka_refresh", refresh_token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // например, 30 дней
  });

  return response;
}
