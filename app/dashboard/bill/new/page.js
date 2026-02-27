import { db } from "@/db"
import { grahak, samaan } from "@/db/schema"
import NewBillForm from "@/components/NewBillForm"

export default async function NewBillPage() {
  const grahakSuchi = await db.select().from(grahak)
  const samaanSuchi = await db.select().from(samaan)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-[#0f2d5e]">🧾 नया बिल बनाएं</h1>
      <NewBillForm grahakSuchi={grahakSuchi} samaanSuchi={samaanSuchi} />
    </div>
  )
}
