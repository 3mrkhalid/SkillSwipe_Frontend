import { NextResponse } from "next/server";

/** Edge-safe Base64 decode */
const decodeJWT = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    );
    return decoded;
  } catch {
    return null;
  }
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("jwt")?.value;

  // ===== PUBLIC PAGES =====
  const publicPaths = ["/login", "/signup", "/"];
  if (publicPaths.includes(pathname)) {
    if (token) {
      const decoded = decodeJWT(token);

      if (decoded?.UserInfo?.isAdmin) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      if (decoded?.UserInfo) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  // ===== PROTECTED PAGES =====
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded = decodeJWT(token);
  if (!decoded?.UserInfo) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

//   // ===== ADMIN PROTECTION =====
//   if (pathname.startsWith("/admin") && !decoded.UserInfo.isAdmin) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

  // ===== USER PROTECTION =====
 

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
};