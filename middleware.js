// middleware.js
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
// Removed 'type' keyword

export async function middleware(req) {
  // Removed type annotation for req
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session and the user is trying to access /admin
  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    const redirectUrl = new URL("/adminlogin", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If there's no session and the user is trying to access /submit
  if (!session && req.nextUrl.pathname.startsWith("/submit")) {
    const redirectUrl = new URL("/signup", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/adminlogin"],
};
