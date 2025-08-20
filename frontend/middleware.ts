import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const PRIVATE_PATHS = ["/profile", "/settings", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const userAgent = req.headers.get("user-agent") || "";
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  // Если это не мобильное устройство и не страница для десктопа
  if (!isMobile && !pathname.startsWith("/desktop-blocked")) {
    return NextResponse.redirect(new URL("/desktop-blocked", req.url));
  }

  // Если мобильное устройство пытается зайти на страницу блокировки
  if (isMobile && pathname.startsWith("/desktop-blocked")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Получаем токен
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ✅ Если пользователь авторизован и заходит на "/", редиректим на /homepage
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/homepage", req.url));
  }

  const isPrivatePath = PRIVATE_PATHS.some((p) => pathname.startsWith(p));

  // Если не приватный роут → пропускаем
  if (!isPrivatePath) return NextResponse.next();

  // Если есть ошибка обновления токена → редирект на логин
  if (token?.error === "RefreshAccessTokenError") {
    console.log(
      "🚫 Middleware: Обнаружена ошибка рефреша токена, перенаправляем на логин"
    );
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если токен есть → пропускаем
  if (token) return NextResponse.next();

  // Иначе редиректим на логин
  console.log("🚫 Middleware: Нет токена, перенаправляем на логин");
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
