import { db } from "@/db"
import { grahak } from "@/db/schema"
import GrahakForm from "./GrahakForm"

export default async function GrahakPage() {
  const suchi = await db.select().from(grahak).orderBy(grahak.naam)
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#0f2d5e]">👥 ग्राहक सूची</h1>
      <GrahakForm />
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-3 text-left">नाम</th>
              <th className="px-5 py-3 text-left">मोबाइल</th>
              <th className="px-5 py-3 text-left">पता</th>
            </tr>
          </thead>
          <tbody>
            {suchi.length === 0 ? (
              <tr><td colSpan={3} className="px-5 py-8 text-center text-gray-400">कोई ग्राहक नहीं</td></tr>
            ) : (
              suchi.map((g) => (
                <tr key={g.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold">{g.naam}</td>
                  <td className="px-5 py-3">{g.mobile}</td>
                  <td className="px-5 py-3 text-gray-500">{g.pata ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}