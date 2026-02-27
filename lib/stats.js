import { db } from "@/db"
import { bill, udhaari, samaan } from "@/db/schema"
import { sql, lt } from "drizzle-orm"

export async function getStats() {
  const [sale] = await db
    .select({ total: sql`SUM(${bill.kulRakam})` })
    .from(bill)
    .where(sql`DATE(${bill.banaya}) = DATE('now')`)

  const [bills] = await db
    .select({ count: sql`COUNT(*)` })
    .from(bill)
    .where(sql`DATE(${bill.banaya}) = DATE('now')`)

  const [pendingUdhaari] = await db
    .select({ pending: sql`SUM(${udhaari.rakam} - ${udhaari.chukaya})` })
    .from(udhaari)
    .where(sql`${udhaari.rakam} > ${udhaari.chukaya}`)

  const [stock] = await db
    .select({ low: sql`COUNT(*)` })
    .from(samaan)
    .where(lt(samaan.matra, 5))

  return {
    sale: sale?.total ?? 0,
    bills: bills?.count ?? 0,
    udhaari: pendingUdhaari?.pending ?? 0,
    lowStock: stock?.low ?? 0,
  }
}
