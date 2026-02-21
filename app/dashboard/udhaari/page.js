import { db } from "@/db"
import { udhaari, grahak } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export default async function UdhaariPage() {
  const baaki = await db
    .select()
    .from(udhaari)
    .leftJoin(grahak, eq(udhaari.grahakId, grahak.id))
    .where(sql`${udhaari.rakam} > ${udhaari.chukaya}`)

  const kul = baaki.reduce((acc, r) => acc + r.udhaari.rakam - r.udhaari.chukaya, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">💳 उधारी</h1>
      <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 inline-block">
        <div className="text-sm text-red-600">कुल बकाया</div>
        <div className="text-3xl font-bold text-red-700">₹{kul.toLocaleString("hi-IN")}</div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">ग्राहक</th>
              <th className="px-5 py-3 text-left">मोबाइल</th>
              <th className="px-5 py-3 text-right">कुल रकम</th>
              <th className="px-5 py-3 text-right">चुकाया</th>
              <th className="px-5 py-3 text-right">बाकी</th>
            </tr>
          </thead>
          <tbody>
            {baaki.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400">कोई उधारी बाकी नहीं</td></tr>
            ) : (
              baaki.map((row) => (
                <tr key={row.udhaari.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold">{row.grahak?.naam ?? "—"}</td>
                  <td className="px-5 py-3">{row.grahak?.mobile ?? "—"}</td>
                  <td className="px-5 py-3 text-right">₹{row.udhaari.rakam}</td>
                  <td className="px-5 py-3 text-right text-green-700">₹{row.udhaari.chukaya}</td>
                  <td className="px-5 py-3 text-right font-bold text-red-600">₹{row.udhaari.rakam - row.udhaari.chukaya}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}