import { db } from "@/db"
import { bill } from "@/db/schema"
import { sql } from "drizzle-orm"

export default async function GSTPage() {
  const mahwari = await db
    .select({
      mahina: sql`strftime('%Y-%m', ${bill.banaya})`,
      bikri: sql`SUM(${bill.kulRakam})`,
      count: sql`COUNT(*)`,
    })
    .from(bill)
    .groupBy(sql`strftime('%Y-%m', ${bill.banaya})`)
    .orderBy(sql`strftime('%Y-%m', ${bill.banaya}) DESC`)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">📄 GST रिपोर्ट</h1>
      <p className="text-sm text-gray-500">नोट: GST कैलकुलेशन के लिए स्कीमा में GST फील्ड जोड़ना होगा। अभी कुल बिक्री दिखाई जा रही है।</p>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">महीना</th>
              <th className="px-5 py-3 text-right">बिल</th>
              <th className="px-5 py-3 text-right">कुल बिक्री</th>
              <th className="px-5 py-3 text-right">अनुमानित GST (18%)</th>
            </tr>
          </thead>
          <tbody>
            {mahwari.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400">कोई डेटा नहीं</td></tr>
            ) : mahwari.map((row) => {
              const bikri = Number(row.bikri)
              const gst = (bikri * 18) / 118
              return (
                <tr key={row.mahina} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold">{row.mahina}</td>
                  <td className="px-5 py-3 text-right">{row.count}</td>
                  <td className="px-5 py-3 text-right font-bold">₹{bikri.toLocaleString("hi-IN")}</td>
                  <td className="px-5 py-3 text-right font-bold text-blue-700">₹{gst.toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}