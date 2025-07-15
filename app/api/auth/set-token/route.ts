import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  console.log("Получен токен:", token);

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set("spichka_token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
