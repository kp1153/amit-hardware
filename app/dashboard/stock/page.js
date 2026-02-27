import { db } from "@/db"
import { samaan } from "@/db/schema"

export default async function StockPage() {
  const suchi = await db.select().from(samaan).orderBy(samaan.naam)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">📦 स्टॉक</h1>

      {/* मोबाइल कार्ड */}
      <div className="space-y-3 lg:hidden">
        {suchi.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 px-5 py-8 text-center text-gray-400 text-sm">कोई सामान नहीं</div>
        ) : suchi.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-[#0f2d5e]">{s.naam}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.shreni} · {s.ikaai}</div>
                <div className="text-xs text-gray-400 mt-0.5">HSN: {s.hsnCode ?? "—"} · GST: {s.gstDar ?? 18}%</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${s.matra < 5 ? "text-red-600" : "text-green-700"}`}>{s.matra}</div>
                <div className="text-xs text-gray-400">{s.ikaai} बचा</div>
              </div>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-gray-100 text-sm">
              <span className="text-gray-500">खरीद: <span className="font-semibold text-gray-700">₹{s.kharidMulya}</span></span>
              <span className="text-gray-500">बिक्री: <span className="font-semibold text-[#0f2d5e]">₹{s.bikriMulya}</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* डेस्कटॉप टेबल */}
      <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">नाम</th>
              <th className="px-5 py-3 text-left">श्रेणी</th>
              <th className="px-5 py-3 text-left">इकाई</th>
              <th className="px-5 py-3 text-left">HSN</th>
              <th className="px-5 py-3 text-right">GST%</th>
              <th className="px-5 py-3 text-right">खरीद मूल्य</th>
              <th className="px-5 py-3 text-right">बिक्री मूल्य</th>
              <th className="px-5 py-3 text-right">मात्रा</th>
            </tr>
          </thead>
          <tbody>
            {suchi.length === 0 ? (
              <tr><td colSpan={8} className="px-5 py-8 text-center text-gray-400">कोई सामान नहीं</td></tr>
            ) : suchi.map((s) => (
              <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-semibold">{s.naam}</td>
                <td className="px-5 py-3">{s.shreni}</td>
                <td className="px-5 py-3">{s.ikaai}</td>
                <td className="px-5 py-3 text-gray-400">{s.hsnCode ?? "—"}</td>
                <td className="px-5 py-3 text-right">{s.gstDar ?? 18}%</td>
                <td className="px-5 py-3 text-right">₹{s.kharidMulya}</td>
                <td className="px-5 py-3 text-right">₹{s.bikriMulya}</td>
                <td className={`px-5 py-3 text-right font-bold ${s.matra < 5 ? "text-red-600" : "text-green-700"}`}>
                  {s.matra}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}