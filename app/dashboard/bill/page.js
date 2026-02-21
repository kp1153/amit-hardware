import { db } from "@/db"
import { bill, grahak } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

const chip = {
  "नकद":    "bg-green-100 text-green-700",
  "UPI":    "bg-blue-100 text-blue-700",
  "उधार":   "bg-amber-100 text-amber-700",
  "आंशिक": "bg-purple-100 text-purple-700",
}

export default async function BillByoraPage() {
  const sabhiBill = await db
    .select()
    .from(bill)
    .leftJoin(grahak, eq(bill.grahakId, grahak.id))
    .orderBy(desc(bill.banaya))

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">📋 बिल ब्यौरा</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">बिल नं.</th>
              <th className="px-5 py-3 text-left">ग्राहक</th>
              <th className="px-5 py-3 text-right">रकम</th>
              <th className="px-5 py-3 text-left">भुगतान</th>
              <th className="px-5 py-3 text-left">तारीख</th>
            </tr>
          </thead>
          <tbody>
            {sabhiBill.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400">कोई बिल नहीं</td></tr>
            ) : (
              sabhiBill.map((row) => (
                <tr key={row.bill.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-bold text-[#0f2d5e]">{row.bill.billNumber}</td>
                  <td className="px-5 py-3">{row.grahak?.naam ?? "—"}</td>
                  <td className="px-5 py-3 text-right font-bold text-green-700">₹{row.bill.kulRakam}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${chip[row.bill.sthiti] ?? "bg-gray-100 text-gray-600"}`}>
                      {row.bill.sthiti}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{row.bill.banaya?.slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}