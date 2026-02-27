import { db } from "@/db"
import { bill, grahak } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import Link from "next/link"

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

      {/* मोबाइल कार्ड */}
      <div className="space-y-3 lg:hidden">
        {sabhiBill.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 px-5 py-8 text-center text-gray-400 text-sm">कोई बिल नहीं</div>
        ) : sabhiBill.map((row) => (
          <div key={row.bill.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-[#0f2d5e]">{row.bill.billNumber}</div>
                <div className="font-semibold mt-0.5">{row.grahak?.naam ?? "—"}</div>
                <div className="text-xs text-gray-400 mt-0.5">{row.bill.banaya?.slice(0, 10)}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-700">₹{row.bill.kulRakam}</div>
                <div className="text-xs text-orange-600 mt-0.5">GST: ₹{row.bill.gstRakam ?? 0}</div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${chip[row.bill.sthiti] ?? "bg-gray-100 text-gray-600"}`}>
                  {row.bill.sthiti}
                </span>
              </div>
            </div>
            <Link href={`/dashboard/bill/${row.bill.id}`}
              className="mt-3 w-full block text-center bg-[#0f2d5e] text-white py-2 rounded-lg text-xs font-semibold">
              🖨️ प्रिंट करें
            </Link>
          </div>
        ))}
      </div>

      {/* डेस्कटॉप टेबल */}
      <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">बिल नं.</th>
              <th className="px-5 py-3 text-left">ग्राहक</th>
              <th className="px-5 py-3 text-right">GST से पहले</th>
              <th className="px-5 py-3 text-right">GST</th>
              <th className="px-5 py-3 text-right">कुल रकम</th>
              <th className="px-5 py-3 text-left">भुगतान</th>
              <th className="px-5 py-3 text-left">तारीख</th>
              <th className="px-5 py-3 text-center">प्रिंट</th>
            </tr>
          </thead>
          <tbody>
            {sabhiBill.length === 0 ? (
              <tr><td colSpan={8} className="px-5 py-8 text-center text-gray-400">कोई बिल नहीं</td></tr>
            ) : sabhiBill.map((row) => (
              <tr key={row.bill.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-bold text-[#0f2d5e]">{row.bill.billNumber}</td>
                <td className="px-5 py-3">{row.grahak?.naam ?? "—"}</td>
                <td className="px-5 py-3 text-right">₹{row.bill.mulyaBeforeGst ?? 0}</td>
                <td className="px-5 py-3 text-right text-orange-600 font-semibold">₹{row.bill.gstRakam ?? 0}</td>
                <td className="px-5 py-3 text-right font-bold text-green-700">₹{row.bill.kulRakam}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${chip[row.bill.sthiti] ?? "bg-gray-100 text-gray-600"}`}>
                    {row.bill.sthiti}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500">{row.bill.banaya?.slice(0, 10)}</td>
                <td className="px-5 py-3 text-center">
                  <Link href={`/dashboard/bill/${row.bill.id}`}
                    className="text-xs font-semibold text-[#0f2d5e] hover:underline">
                    🖨️ प्रिंट
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}