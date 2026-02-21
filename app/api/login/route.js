import { NextResponse } from "next/server"

export async function POST(req) {
  const { pass } = await req.json()
  if (pass !== process.env.SHOP_PASSWORD) {
    return NextResponse.json({ error: "गलत पासवर्ड" }, { status: 401 })
  }
  const res = NextResponse.json({ success: true })
  res.cookies.set("auth", process.env.SHOP_PASSWORD, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}