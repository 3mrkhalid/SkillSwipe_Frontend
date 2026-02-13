import { NextResponse } from "next/server";

/** Decode JWT manually (Edge compatible) */
const decodeJWT = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
};


/** The required middleware function export */
export function middleware(req) {
  const { pathname } = req.nextUrl;

  // PUBLIC PAGES
  const publicPaths = ["/login", "/signup", "/"];
  if (publicPaths.includes(pathname)) {
    const token = req.cookies.get("jwt")?.value;
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded?.UserInfo?.isAdmin) {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  // PROTECTED PAGES
  const token = req.cookies.get("jwt")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded = decodeJWT(token);
  if (!decoded?.UserInfo) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User pages
  if (pathname.startsWith("/dashboard") && decoded.UserInfo.isAdmin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Admin pages
  if (pathname.startsWith("/admin") && !decoded.UserInfo.isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
};
