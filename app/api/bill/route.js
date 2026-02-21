import { db } from "@/db"
import { bill, billItem, udhaari, samaan } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { grahakId, items, bhugtan, kul } = await req.json()

  const billNo = `INV-${Date.now()}`

  const [newBill] = await db.insert(bill).values({
    billNumber: billNo,
    grahakId: grahakId,
    kulRakam: kul,
    bhugtanVidhi: bhugtan,
    sthiti: bhugtan,
  }).returning()

  for (const item of items) {
    await db.insert(billItem).values({
      billId: newBill.id,
      samaanId: item.id,
      matra: item.matra,
      mulya: item.mulya,
      kul: item.matra * item.mulya,
    })

    await db.update(samaan)
      .set({ matra: sql`${samaan.matra} - ${item.matra}` })
      .where(eq(samaan.id, item.id))
  }

  if (bhugtan === "udhar" || bhugtan === "aanshik") {
    await db.insert(udhaari).values({
      grahakId: grahakId,
      billId: newBill.id,
      rakam: kul,
      chukaya: bhugtan === "aanshik" ? kul / 2 : 0,
    })
  }

  return NextResponse.json({ success: true, billNo })
}