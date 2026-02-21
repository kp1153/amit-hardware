import { Suspense } from "react"
import StatCard from "@/components/StatCard"
import BillTable from "@/components/BillTable"
import UdhaariList from "@/components/UdhaariList"
import { getStats } from "@/lib/stats"

export default async function Dashboard() {
  const { sale, bills, udhaari, lowStock } = await getStats()

  const ankde = [
    { icon: "💰", label: "आज की बिक्री", value: `₹${Number(sale).toLocaleString("hi-IN")}`, trend: "आज", type: "up" },
    { icon: "💳", label: "कुल उधारी बाकी", value: `₹${Number(udhaari).toLocaleString("hi-IN")}`, trend: "बाकी", type: "warn" },
    { icon: "🧾", label: "आज के बिल", value: `${bills}`, trend: "आज", type: "up" },
    { icon: "⚠️", label: "कम स्टॉक आइटम", value: `${lowStock}`, trend: "5 से कम", type: "down" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">📊 आज का डैशबोर्ड</h1>
      <div className="grid grid-cols-4 gap-4">
        {ankde.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <Suspense fallback={<div className="text-sm text-gray-400">लोड हो रहा है...</div>}>
            <BillTable />
          </Suspense>
        </div>
        <Suspense fallback={<div className="text-sm text-gray-400">लोड हो रहा है...</div>}>
          <UdhaariList />
        </Suspense>
      </div>
    </div>
  )
}