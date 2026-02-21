import { db } from "@/db"
import { grahak } from "@/db/schema"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { naam, mobile, pata } = await req.json()
  if (!naam || !mobile) return NextResponse.json({ error: "नाम और मोबाइल जरूरी है" }, { status: 400 })
  const [newGrahak] = await db.insert(grahak).values({ naam, mobile, pata: pata || null }).returning()
  return NextResponse.json(newGrahak)
}

export async function GET() {
  const all = await db.select().from(grahak).orderBy(grahak.naam)
  return NextResponse.json(all)
}