"use client"
import { useState } from "react"

const paymentMethods = ["नकद", "UPI", "उधार", "आंशिक"]

function gstCalc(mulya, matra, gstDar) {
  const base = mulya * matra
  const gst = parseFloat(((base * gstDar) / 100).toFixed(2))
  const cgst = parseFloat((gst / 2).toFixed(2))
  const sgst = parseFloat((gst / 2).toFixed(2))
  return { base, gst, cgst, sgst, kul: parseFloat((base + gst).toFixed(2)) }
}

export default function NewBillForm({ grahakSuchi, samaanSuchi }) {
  const [selectedGrahak, setSelectedGrahak] = useState(null)
  const [items, setItems] = useState([])
  const [payment, setPayment] = useState("नकद")
  const [searchGrahak, setSearchGrahak] = useState("")
  const [searchSamaan, setSearchSamaan] = useState("")
  const [saving, setSaving] = useState(false)

  const summary = items.reduce(
    (acc, i) => {
      const { base, cgst, sgst, kul } = gstCalc(i.bikriMulya, i.quantity, i.gstDar ?? 18)
      return { base: acc.base + base, cgst: acc.cgst + cgst, sgst: acc.sgst + sgst, kul: acc.kul + kul }
    },
    { base: 0, cgst: 0, sgst: 0, kul: 0 }
  )

  function addItem(s) {
    const exists = items.find((i) => i.id === s.id)
    if (exists) {
      setItems(items.map((i) => i.id === s.id ? { ...i, quantity: i.quantity + 1 } : i))
    } else {
      setItems([...items, { ...s, quantity: 1 }])
    }
    setSearchSamaan("")
  }

  function updateQty(id, val) {
    if (val < 1) return
    setItems(items.map((i) => i.id === id ? { ...i, quantity: val } : i))
  }

  function removeItem(id) {
    setItems(items.filter((i) => i.id !== id))
  }

  const filteredGrahak = grahakSuchi?.filter(
    (g) => g.naam.includes(searchGrahak) || g.mobile.includes(searchGrahak)
  )

  const filteredSamaan = samaanSuchi?.filter((s) => s.naam.includes(searchSamaan))

  async function saveBill() {
    if (!selectedGrahak || items.length === 0) return
    setSaving(true)
    const res = await fetch("/api/bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grahakId: selectedGrahak.id,
        items: items.map((i) => {
          const { base, cgst, sgst, kul } = gstCalc(i.bikriMulya, i.quantity, i.gstDar ?? 18)
          return { id: i.id, matra: i.quantity, mulya: i.bikriMulya, gstDar: i.gstDar ?? 18, cgst, sgst, kul }
        }),
        bhugtan: payment,
        kul: parseFloat(summary.kul.toFixed(2)),
        gstRakam: parseFloat((summary.cgst + summary.sgst).toFixed(2)),
        mulyaBeforeGst: parseFloat(summary.base.toFixed(2)),
      }),
    })
    setSaving(false)
    if (res.ok) {
      setItems([])
      setSelectedGrahak(null)
      setPayment("नकद")
      alert("बिल सेव हो गया!")
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* बायाँ हिस्सा */}
      <div className="flex-1 space-y-4">

        {/* ग्राहक */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="font-bold text-[#0f2d5e] mb-3">👤 ग्राहक चुनें</div>
          {selectedGrahak ? (
            <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-3">
              <div>
                <div className="font-semibold text-[#0f2d5e]">{selectedGrahak.naam}</div>
                <div className="text-xs text-gray-500">{selectedGrahak.mobile}</div>
              </div>
              <button onClick={() => setSelectedGrahak(null)} className="text-xs text-red-500 font-semibold">बदलें</button>
            </div>
          ) : (
            <div className="relative">
              <input
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e]"
                placeholder="नाम या मोबाइल से खोजें"
                value={searchGrahak}
                onChange={(e) => setSearchGrahak(e.target.value)}
              />
              {searchGrahak && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                  {filteredGrahak?.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-400">कोई ग्राहक नहीं मिला</div>
                  ) : (
                    filteredGrahak?.map((g) => (
                      <div key={g.id} onClick={() => { setSelectedGrahak(g); setSearchGrahak("") }}
                        className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer">
                        <div className="font-semibold text-sm">{g.naam}</div>
                        <div className="text-xs text-gray-400">{g.mobile}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* सामान */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="font-bold text-[#0f2d5e] mb-3">📦 सामान जोड़ें</div>
          <div className="relative">
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e]"
              placeholder="सामान का नाम लिखें"
              value={searchSamaan}
              onChange={(e) => setSearchSamaan(e.target.value)}
            />
            {searchSamaan && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                {filteredSamaan?.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-400">सामान नहीं मिला</div>
                ) : (
                  filteredSamaan?.map((s) => (
                    <div key={s.id} onClick={() => addItem(s)}
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-sm">{s.naam}</div>
                        <div className="text-xs text-gray-400">{s.shreni} · {s.matra} {s.ikaai} बचा · GST {s.gstDar ?? 18}%</div>
                      </div>
                      <div className="text-sm font-bold text-[#0f2d5e]">₹{s.bikriMulya}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* मोबाइल पर कार्ड, डेस्कटॉप पर टेबल */}
          {items.length > 0 && (
            <>
              {/* मोबाइल कार्ड */}
              <div className="mt-4 space-y-2 lg:hidden">
                {items.map((i) => {
                  const { cgst, sgst, kul } = gstCalc(i.bikriMulya, i.quantity, i.gstDar ?? 18)
                  return (
                    <div key={i.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="font-semibold text-sm text-[#0f2d5e]">{i.naam}</div>
                        <button onClick={() => removeItem(i.id)} className="text-red-400 text-lg leading-none">×</button>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">HSN: {i.hsnCode ?? "—"} · GST: {i.gstDar ?? 18}%</div>
                      <div className="flex items-center gap-3 mt-2">
                        <input type="number" min={1} value={i.quantity}
                          onChange={(e) => updateQty(i.id, Number(e.target.value))}
                          className="w-16 border border-gray-200 rounded px-2 py-1 text-center text-sm outline-none" />
                        <span className="text-xs text-gray-500">× ₹{i.bikriMulya}</span>
                        <span className="ml-auto text-sm font-bold text-green-700">₹{kul}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">CGST: ₹{cgst} + SGST: ₹{sgst}</div>
                    </div>
                  )
                })}
              </div>

              {/* डेस्कटॉप टेबल */}
              <div className="mt-4 hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500">
                      <th className="px-3 py-2 text-left">सामान</th>
                      <th className="px-3 py-2 text-left">HSN</th>
                      <th className="px-3 py-2 text-center">मात्रा</th>
                      <th className="px-3 py-2 text-right">मूल्य</th>
                      <th className="px-3 py-2 text-right">GST%</th>
                      <th className="px-3 py-2 text-right">CGST</th>
                      <th className="px-3 py-2 text-right">SGST</th>
                      <th className="px-3 py-2 text-right">कुल</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((i) => {
                      const { cgst, sgst, kul } = gstCalc(i.bikriMulya, i.quantity, i.gstDar ?? 18)
                      return (
                        <tr key={i.id} className="border-t border-gray-50">
                          <td className="px-3 py-2 font-semibold">{i.naam}</td>
                          <td className="px-3 py-2 text-gray-400">{i.hsnCode ?? "—"}</td>
                          <td className="px-3 py-2 text-center">
                            <input type="number" min={1} value={i.quantity}
                              onChange={(e) => updateQty(i.id, Number(e.target.value))}
                              className="w-16 border border-gray-200 rounded px-2 py-1 text-center text-sm outline-none" />
                          </td>
                          <td className="px-3 py-2 text-right">₹{i.bikriMulya}</td>
                          <td className="px-3 py-2 text-right">{i.gstDar ?? 18}%</td>
                          <td className="px-3 py-2 text-right text-orange-600">₹{cgst}</td>
                          <td className="px-3 py-2 text-right text-orange-600">₹{sgst}</td>
                          <td className="px-3 py-2 text-right font-bold">₹{kul}</td>
                          <td className="px-3 py-2 text-center">
                            <button onClick={() => removeItem(i.id)} className="text-red-400 hover:text-red-600 text-lg">×</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* दायाँ हिस्सा — बिल सारांश */}
      <div className="w-full lg:w-72 space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="font-bold text-[#0f2d5e]">💰 बिल सारांश</div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">कुल आइटम</span>
            <span className="font-semibold">{items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">मूल्य (GST से पहले)</span>
            <span className="font-semibold">₹{summary.base.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">CGST</span>
            <span className="text-orange-600 font-semibold">₹{summary.cgst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">SGST</span>
            <span className="text-orange-600 font-semibold">₹{summary.sgst.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-100 pt-2 flex justify-between">
            <span className="text-gray-500 text-sm">कुल रकम</span>
            <span className="font-bold text-[#0f2d5e] text-lg">₹{summary.kul.toFixed(2)}</span>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-2">भुगतान विधि</div>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((v) => (
                <button key={v} onClick={() => setPayment(v)}
                  className={`py-2 rounded-lg text-sm font-semibold border transition-all ${payment === v ? "bg-[#0f2d5e] text-white border-[#0f2d5e]" : "bg-white text-gray-600 border-gray-200 hover:border-[#0f2d5e]"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <button onClick={saveBill}
            disabled={!selectedGrahak || items.length === 0 || saving}
            className="w-full bg-[#e63946] text-white py-3 rounded-lg font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#c1121f] transition-colors">
            {saving ? "सेव हो रहा है..." : "🧾 बिल सेव करें"}
          </button>
        </div>
      </div>
    </div>
  )
}