import { db } from "@/db"
import { bill, billItem, udhaari, samaan } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { grahakId, items, bhugtan, kul, gstRakam, mulyaBeforeGst } = await req.json()

  const billNo = `INV-${Date.now()}`

  const [newBill] = await db.insert(bill).values({
    billNumber: billNo,
    grahakId: grahakId,
    kulRakam: kul,
    gstRakam: gstRakam ?? 0,
    mulyaBeforeGst: mulyaBeforeGst ?? 0,
    bhugtanVidhi: bhugtan,
    sthiti: bhugtan,
  }).returning()

  for (const item of items) {
    await db.insert(billItem).values({
      billId: newBill.id,
      samaanId: item.id,
      matra: item.matra,
      mulya: item.mulya,
      gstDar: item.gstDar ?? 18,
      cgst: item.cgst ?? 0,
      sgst: item.sgst ?? 0,
      kul: item.kul,
    })

    await db.update(samaan)
      .set({ matra: sql`${samaan.matra} - ${item.matra}` })
      .where(eq(samaan.id, item.id))
  }

  if (bhugtan === "उधार" || bhugtan === "आंशिक") {
    await db.insert(udhaari).values({
      grahakId: grahakId,
      billId: newBill.id,
      rakam: kul,
      chukaya: bhugtan === "आंशिक" ? kul / 2 : 0,
    })
  }

  return NextResponse.json({ success: true, billNo })
}