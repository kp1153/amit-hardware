import { db } from "@/db"
import { samaan } from "@/db/schema"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { naam, shreni, ikaai, kharidMulya, bikriMulya, matra } = await req.json()
  if (!naam || !kharidMulya || !bikriMulya) return NextResponse.json({ error: "जरूरी फील्ड खाली है" }, { status: 400 })
  const [newSamaan] = await db.insert(samaan).values({
    naam, shreni, ikaai,
    kharidMulya: parseFloat(kharidMulya),
    bikriMulya: parseFloat(bikriMulya),
    matra: parseInt(matra) || 0,
  }).returning()
  return NextResponse.json(newSamaan)
}

export async function GET() {
  const all = await db.select().from(samaan).orderBy(samaan.naam)
  return NextResponse.json(all)
}