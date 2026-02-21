"use client"

import { useState } from "react"

const paymentMethods = ["नकद", "UPI", "उधार", "आंशिक"]

export default function NewBillForm({ grahakSuchi, samaanSuchi }) {
  const [selectedGrahak, setSelectedGrahak] = useState(null)
  const [items, setItems] = useState([])
  const [payment, setPayment] = useState("नकद")
  const [searchGrahak, setSearchGrahak] = useState("")
  const [searchSamaan, setSearchSamaan] = useState("")

  const total = items.reduce((acc, i) => acc + i.quantity * i.bikriMulya, 0)

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

  const filteredGrahak = grahakSuchi?.filter((g) =>
    g.naam.includes(searchGrahak) || g.mobile.includes(searchGrahak)
  )

  const filteredSamaan = samaanSuchi?.filter((s) =>
    s.naam.includes(searchSamaan)
  )

  async function saveBill() {
    if (!selectedGrahak || items.length === 0) return
    const res = await fetch("/api/bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grahakId: selectedGrahak.id,
        items: items.map((i) => ({ id: i.id, matra: i.quantity, mulya: i.bikriMulya })),
        bhugtan: payment,
        kul: total,
      }),
    })
    if (res.ok) {
      setItems([])
      setSelectedGrahak(null)
      setPayment("नकद")
      alert("बिल सेव हो गया!")
    }
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 space-y-4">
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
                      className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex justify-between">
                      <div>
                        <div className="font-semibold text-sm">{s.naam}</div>
                        <div className="text-xs text-gray-400">{s.shreni} · {s.matra} {s.ikaai} बचा</div>
                      </div>
                      <div className="text-sm font-bold text-[#0f2d5e]">₹{s.bikriMulya}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <table className="w-full mt-4">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500">
                  <th className="px-3 py-2 text-left">सामान</th>
                  <th className="px-3 py-2 text-center">मात्रा</th>
                  <th className="px-3 py-2 text-right">मूल्य</th>
                  <th className="px-3 py-2 text-right">कुल</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-t border-gray-50">
                    <td className="px-3 py-2 text-sm font-semibold">{i.naam}</td>
                    <td className="px-3 py-2 text-center">
                      <input type="number" min={1} value={i.quantity}
                        onChange={(e) => updateQty(i.id, Number(e.target.value))}
                        className="w-16 border border-gray-200 rounded px-2 py-1 text-center text-sm outline-none" />
                    </td>
                    <td className="px-3 py-2 text-right text-sm">₹{i.bikriMulya}</td>
                    <td className="px-3 py-2 text-right text-sm font-bold">₹{i.quantity * i.bikriMulya}</td>
                    <td className="px-3 py-2 text-center">
                      <button onClick={() => removeItem(i.id)} className="text-red-400 hover:text-red-600 text-lg">×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <div className="font-bold text-[#0f2d5e]">💰 बिल सारांश</div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">कुल आइटम</span>
            <span className="font-semibold">{items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">कुल रकम</span>
            <span className="font-bold text-[#0f2d5e] text-lg">₹{total.toLocaleString("hi-IN")}</span>
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
          <button
            onClick={saveBill}
            disabled={!selectedGrahak || items.length === 0}
            className="w-full bg-[#e63946] text-white py-3 rounded-lg font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#c1121f] transition-colors"
          >
            🧾 बिल सेव करें
          </button>
        </div>
      </div>
    </div>
  )
}