import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("spichka_token");
  const { pathname } = req.nextUrl;

  // если путь /profile и нет токена то редирект на /login
  if (pathname === "/profile" && !token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  const publicPaths = ["/login", "/signup", "/"];
  if (publicPaths.includes(pathname) && token) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/homepage";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/signup", "/"],
};
