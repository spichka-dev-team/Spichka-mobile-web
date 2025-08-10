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

  const accessToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", req.url));
}
