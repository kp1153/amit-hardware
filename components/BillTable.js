import { db } from "@/db"
import { bill, grahak } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

const chip = {
  "नकद":    "bg-green-100 text-green-700",
  "UPI":    "bg-blue-100 text-blue-700",
  "उधार":   "bg-amber-100 text-amber-700",
  "आंशिक": "bg-purple-100 text-purple-700",
}

export default async function BillTable() {
  const aajKeBill = await db
    .select()
    .from(bill)
    .leftJoin(grahak, eq(bill.grahakId, grahak.id))
    .orderBy(desc(bill.banaya))
    .limit(10)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <span className="font-bold text-[#0f2d5e]">🧾 आज के बिल</span>
        <button className="text-xs font-semibold text-[#1a3f7a]">सभी देखें →</button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
            <th className="px-5 py-3 text-left">बिल नं.</th>
            <th className="px-5 py-3 text-left">ग्राहक</th>
            <th className="px-5 py-3 text-left">रकम</th>
            <th className="px-5 py-3 text-left">स्थिति</th>
          </tr>
        </thead>
        <tbody>
          {aajKeBill.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-5 py-8 text-center text-gray-400 text-sm">
                आज कोई बिल नहीं बना
              </td>
            </tr>
          ) : (
            aajKeBill.map((row) => (
              <tr key={row.bill.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 text-xs font-bold text-[#0f2d5e]">{row.bill.billNumber}</td>
                <td className="px-5 py-3 text-sm font-semibold">{row.grahak?.naam ?? "—"}</td>
                <td className="px-5 py-3 text-sm font-bold text-green-700">₹{row.bill.kulRakam}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${chip[row.bill.sthiti]}`}>
                    {row.bill.sthiti}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}