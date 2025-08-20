import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const PRIVATE_PATHS = ["/profile", "/settings", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPrivatePath = PRIVATE_PATHS.some((p) => pathname.startsWith(p));

  if (!isPrivatePath) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token?.error === "RefreshAccessTokenError") {
    console.log(
      "🚫 Middleware: Обнаружена ошибка рефреша токена, перенаправляем на логин"
    );
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /*
prompt:
after login to my account as creator,
sometimes when i click /profile icon,
it is redirecting me to /login page but i have already logined,
there is some errors with my profile button or this middleware

ai copilot suggestion:
if (token) {
  return NextResponse.next();
} else {
  console.log("🚫 Middleware: Нет токена, перенаправляем на логин");
  return NextResponse.redirect(new URL("/login", req.url));
}
  */ 
  if (token) return NextResponse.next();

  console.log("🚫 Middleware: Нет токена, перенаправляем на логин");
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
