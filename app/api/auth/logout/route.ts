import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("spichka_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("spichka_refresh", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
