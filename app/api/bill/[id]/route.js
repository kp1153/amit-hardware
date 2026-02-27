import { db } from "@/db"
import { bill, billItem, grahak, samaan } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const { id } = await params
  const [billData] = await db.select().from(bill).where(eq(bill.id, parseInt(id)))
  if (!billData) return NextResponse.json({ error: "नहीं मिला" }, { status: 404 })

  const [grahakData] = await db.select().from(grahak).where(eq(grahak.id, billData.grahakId))

  const items = await db
    .select()
    .from(billItem)
    .leftJoin(samaan, eq(billItem.samaanId, samaan.id))
    .where(eq(billItem.billId, parseInt(id)))

  return NextResponse.json({ bill: billData, grahak: grahakData, items })
}