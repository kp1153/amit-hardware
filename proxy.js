import { NextResponse } from "next/server"

export function proxy(req) {
  const auth = req.cookies.get("auth")?.value
  if (auth !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}