import { db } from "@/db"
import { samaan } from "@/db/schema"
import StockForm from "./StockForm"

export default async function StockPage() {
  const suchi = await db.select().from(samaan).orderBy(samaan.naam)
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">📦 स्टॉक</h1>
      <StockForm />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">नाम</th>
              <th className="px-5 py-3 text-left">श्रेणी</th>
              <th className="px-5 py-3 text-left">इकाई</th>
              <th className="px-5 py-3 text-right">खरीद मूल्य</th>
              <th className="px-5 py-3 text-right">बिक्री मूल्य</th>
              <th className="px-5 py-3 text-right">मात्रा</th>
            </tr>
          </thead>
          <tbody>
            {suchi.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-400">कोई सामान नहीं</td></tr>
            ) : (
              suchi.map((s) => (
                <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold">{s.naam}</td>
                  <td className="px-5 py-3">{s.shreni}</td>
                  <td className="px-5 py-3">{s.ikaai}</td>
                  <td className="px-5 py-3 text-right">₹{s.kharidMulya}</td>
                  <td className="px-5 py-3 text-right">₹{s.bikriMulya}</td>
                  <td className={`px-5 py-3 text-right font-bold ${s.matra < 5 ? "text-red-600" : "text-green-700"}`}>
                    {s.matra}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}