import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminRoutes = ["/admin"];
const userRoutes = ["/user"];
const authPages = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const userRole = token?.role;
  const { pathname } = request.nextUrl;

  // 🔐 ADMIN ROUTES
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (userRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "candidate") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (authPages.includes(pathname) && isAuthenticated) {
    const redirectUrl =
      userRole === "admin"
        ? "/admin"
        : userRole === "candidate"
        ? "/user/dashboard"
        : "/";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}
