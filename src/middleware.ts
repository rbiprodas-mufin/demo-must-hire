import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { AUTH_SECRET } from "./constants";

const adminRoutes = ["/admin"];
const userRoutes = ["/user"];
const authPages = ["/login", "/signup", "/verify-email"];
const onboardingPage = "/onboarding";

// export { authSession as middleware } from "~/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: AUTH_SECRET,
  });
  console.log("🔥 MIDDLEWARE SESSION", token, process.env.AUTH_SECRET, AUTH_SECRET);

  const isAuthenticated = !!token;
  const user = token?.user;
  const userRole = user?.role;
  const isProfileComplete = user?.is_profile_complete;

  // console.log("pathname", pathname, token);

  // 🔐 ADMIN ROUTES
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "admin" && userRole !== "hr") {
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
    if (!isProfileComplete && pathname !== onboardingPage) {
      return NextResponse.redirect(new URL(onboardingPage, request.url));
    }

    // If profile is complete, allow access to dashboard
    if (isProfileComplete && pathname === onboardingPage) {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  if (authPages.includes(pathname) && isAuthenticated) {
    const redirectUrl =
      userRole === "admin" || userRole === "hr"
        ? "/admin/dashboard"
        : userRole === "candidate"
        ? "/user/dashboard"
        : "/";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
