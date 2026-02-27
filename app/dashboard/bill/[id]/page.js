import { db } from "@/db"
import { bill, billItem, grahak, samaan } from "@/db/schema"
import { eq } from "drizzle-orm"

const DUKAN = {
  naam: "अमित इंटरप्राइजेज एंड हार्डवेयर",
  pata: "कोरियानी, भूसियावाह",
  shahar: "अमेठी, उत्तर प्रदेश",
  mobile: "",
  gstin: "",
}

export default async function BillPrintPage({ params }) {
  const { id } = await params
  const [billData] = await db.select().from(bill).where(eq(bill.id, parseInt(id)))
  if (!billData) return <div className="p-8 text-red-600">बिल नहीं मिला</div>

  const [grahakData] = await db.select().from(grahak).where(eq(grahak.id, billData.grahakId))

  const items = await db
    .select()
    .from(billItem)
    .leftJoin(samaan, eq(billItem.samaanId, samaan.id))
    .where(eq(billItem.billId, parseInt(id)))

  const cgstKul = items.reduce((a, i) => a + (i.bill_item.cgst ?? 0), 0)
  const sgstKul = items.reduce((a, i) => a + (i.bill_item.sgst ?? 0), 0)

  return (
    <div className="min-h-screen bg-gray-100 p-4 print:bg-white print:p-0">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow print:shadow-none print:rounded-none p-8">

        {/* प्रिंट बटन */}
        <div className="flex justify-end mb-6 print:hidden gap-2">
          <button onClick={() => window.print()}
            className="bg-[#0f2d5e] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1a3f7a]">
            🖨️ प्रिंट करें
          </button>
          <a href="/dashboard/bill"
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200">
            ← वापस
          </a>
        </div>

        {/* दुकान का हेडर */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
          <div className="text-xl font-bold text-gray-900">{DUKAN.naam}</div>
          <div className="text-sm text-gray-600 mt-1">{DUKAN.pata}, {DUKAN.shahar}</div>
          {DUKAN.mobile && <div className="text-sm text-gray-600">मो: {DUKAN.mobile}</div>}
          {DUKAN.gstin && <div className="text-sm font-semibold text-gray-700 mt-1">GSTIN: {DUKAN.gstin}</div>}
        </div>

        {/* बिल की जानकारी */}
        <div className="flex justify-between mb-4 text-sm">
          <div>
            <div className="font-bold text-gray-700">ग्राहक:</div>
            <div className="font-semibold">{grahakData?.naam ?? "—"}</div>
            <div className="text-gray-500">{grahakData?.mobile ?? ""}</div>
            {grahakData?.gstin && <div className="text-gray-500">GSTIN: {grahakData.gstin}</div>}
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-700">बिल नं: <span className="text-[#0f2d5e]">{billData.billNumber}</span></div>
            <div className="text-gray-500">तारीख: {billData.banaya?.slice(0, 10)}</div>
            <div className="text-gray-500">भुगतान: {billData.bhugtanVidhi}</div>
          </div>
        </div>

        {/* आइटम टेबल */}
        <table className="w-full text-sm border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100 text-xs text-gray-600 uppercase">
              <th className="border border-gray-300 px-3 py-2 text-left">सामान</th>
              <th className="border border-gray-300 px-3 py-2 text-left">HSN</th>
              <th className="border border-gray-300 px-3 py-2 text-center">मात्रा</th>
              <th className="border border-gray-300 px-3 py-2 text-right">मूल्य</th>
              <th className="border border-gray-300 px-3 py-2 text-right">GST%</th>
              <th className="border border-gray-300 px-3 py-2 text-right">CGST</th>
              <th className="border border-gray-300 px-3 py-2 text-right">SGST</th>
              <th className="border border-gray-300 px-3 py-2 text-right">कुल</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="border border-gray-300 px-3 py-2">{row.samaan?.naam ?? "—"}</td>
                <td className="border border-gray-300 px-3 py-2 text-gray-500">{row.samaan?.hsnCode ?? "—"}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{row.bill_item.matra}</td>
                <td className="border border-gray-300 px-3 py-2 text-right">₹{row.bill_item.mulya}</td>
                <td className="border border-gray-300 px-3 py-2 text-right">{row.bill_item.gstDar}%</td>
                <td className="border border-gray-300 px-3 py-2 text-right text-orange-600">₹{row.bill_item.cgst}</td>
                <td className="border border-gray-300 px-3 py-2 text-right text-orange-600">₹{row.bill_item.sgst}</td>
                <td className="border border-gray-300 px-3 py-2 text-right font-bold">₹{row.bill_item.kul}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* सारांश */}
        <div className="flex justify-end">
          <div className="w-64 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">GST से पहले</span>
              <span>₹{billData.mulyaBeforeGst}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CGST</span>
              <span className="text-orange-600">₹{cgstKul.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SGST</span>
              <span className="text-orange-600">₹{sgstKul.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2 font-bold text-base">
              <span>कुल रकम</span>
              <span className="text-[#0f2d5e]">₹{billData.kulRakam}</span>
            </div>
          </div>
        </div>

        {/* फुटर */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
          धन्यवाद — फिर आइए
        </div>
      </div>
    </div>
  )
}