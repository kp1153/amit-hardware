// F:\amit-hardware\app\api\bill\[id]\route.js
import { db } from "@/db"
import { bill, billItem, grahak, samaan } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const { id } = await params

  const [billData] = await db
    .select()
    .from(bill)
    .leftJoin(grahak, eq(bill.grahakId, grahak.id))
    .where(eq(bill.id, Number(id)))

  if (!billData) return NextResponse.json({ error: "नहीं मिला" }, { status: 404 })

  const items = await db
    .select()
    .from(billItem)
    .leftJoin(samaan, eq(billItem.samaanId, samaan.id))
    .where(eq(billItem.billId, Number(id)))

  return NextResponse.json({ bill: billData.bill, grahak: billData.grahak, items })
}