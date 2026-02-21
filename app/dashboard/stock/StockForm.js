"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const shreniList = ["सेनेटरी", "नल", "PVC पाइप", "पेन्ट्स", "हार्डवेयर", "अन्य"]
const ikaaiList = ["नग", "मीटर", "किलो", "लीटर", "पैकेट", "बॉक्स"]

export default function StockForm() {
  const router = useRouter()
  const [form, setForm] = useState({ naam: "", shreni: "सेनेटरी", ikaai: "नग", kharidMulya: "", bikriMulya: "", matra: "" })
  const [msg, setMsg] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.naam || !form.kharidMulya || !form.bikriMulya) return setMsg("नाम और मूल्य जरूरी है")
    const res = await fetch("/api/samaan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setMsg("सामान जोड़ा गया ✓")
      setForm({ naam: "", shreni: "सेनेटरी", ikaai: "नग", kharidMulya: "", bikriMulya: "", matra: "" })
      router.refresh()
    } else {
      setMsg("कुछ गड़बड़ हुई")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 max-w-2xl">
      <div className="font-bold text-[#0f2d5e] mb-3">नया सामान जोड़ें</div>
      {msg && <p className="text-sm text-blue-600 mb-2">{msg}</p>}
      <div className="grid grid-cols-2 gap-3">
        <input className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e] col-span-2"
          placeholder="सामान का नाम *" value={form.naam} onChange={e => setForm({ ...form, naam: e.target.value })} />
        <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e]"
          value={form.shreni} onChange={e => setForm({ ...form, shreni: e.target.value })}>
          {shreniList.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e]"
          value={form.ikaai} onChange={e => setForm({ ...form, ikaai: e.target.value })}>
          {ikaaiList.map(i => <option key={i}>{i}</option>)}
        </select>
        <input type="number" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e]"
          placeholder="खरीद मूल्य *" value={form.kharidMulya} onChange={e => setForm({ ...form, kharidMulya: e.target.value })} />
        <input type="number" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e]"
          placeholder="बिक्री मूल्य *" value={form.bikriMulya} onChange={e => setForm({ ...form, bikriMulya: e.target.value })} />
        <input type="number" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0f2d5e]"
          placeholder="शुरुआती मात्रा" value={form.matra} onChange={e => setForm({ ...form, matra: e.target.value })} />
      </div>
      <button type="submit" className="mt-4 bg-[#0f2d5e] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1a3f7a]">
        जोड़ें
      </button>
    </form>
  )
}