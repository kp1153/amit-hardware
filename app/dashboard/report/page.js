import { db } from "@/db"
import { bill, grahak } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { sql } from "drizzle-orm"

export default async function ReportPage() {
  const mahwari = await db
    .select({
      mahina: sql`strftime('%Y-%m', ${bill.banaya})`,
      bikri: sql`SUM(${bill.kulRakam})`,
      count: sql`COUNT(*)`,
    })
    .from(bill)
    .groupBy(sql`strftime('%Y-%m', ${bill.banaya})`)
    .orderBy(sql`strftime('%Y-%m', ${bill.banaya}) DESC`)

  const top = await db
    .select({
      naam: grahak.naam,
      kul: sql`SUM(${bill.kulRakam})`,
    })
    .from(bill)
    .leftJoin(grahak, eq(bill.grahakId, grahak.id))
    .groupBy(bill.grahakId)
    .orderBy(sql`SUM(${bill.kulRakam}) DESC`)
    .limit(5)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">📊 बिक्री रिपोर्ट</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 font-bold text-[#0f2d5e]">माहवारी बिक्री</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">महीना</th>
              <th className="px-5 py-3 text-right">बिल संख्या</th>
              <th className="px-5 py-3 text-right">कुल बिक्री</th>
            </tr>
          </thead>
          <tbody>
            {mahwari.length === 0 ? (
              <tr><td colSpan={3} className="px-5 py-8 text-center text-gray-400">कोई डेटा नहीं</td></tr>
            ) : mahwari.map((row) => (
              <tr key={row.mahina} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-semibold">{row.mahina}</td>
                <td className="px-5 py-3 text-right">{row.count}</td>
                <td className="px-5 py-3 text-right font-bold text-green-700">₹{Number(row.bikri).toLocaleString("hi-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 font-bold text-[#0f2d5e]">शीर्ष 5 ग्राहक</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">ग्राहक</th>
              <th className="px-5 py-3 text-right">कुल खरीद</th>
            </tr>
          </thead>
          <tbody>
            {top.map((row, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-semibold">{row.naam ?? "—"}</td>
                <td className="px-5 py-3 text-right font-bold text-[#0f2d5e]">₹{Number(row.kul).toLocaleString("hi-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}