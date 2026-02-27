"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const menu = [
  { naam: "डैशबोर्ड", path: "/dashboard", icon: "🏠" },
  { naam: "नया बिल", path: "/dashboard/bill/new", icon: "🧾" },
  { naam: "बिल ब्यौरा", path: "/dashboard/bill", icon: "📋" },
  { naam: "उधारी", path: "/dashboard/udhaari", icon: "💳" },
  { naam: "स्टॉक देखें", path: "/dashboard/stock", icon: "📦" },
  { naam: "स्टॉक जोड़ें", path: "/dashboard/stock/add", icon: "➕" },
  { naam: "ग्राहक सूची", path: "/dashboard/grahak", icon: "👥" },
  { naam: "बिक्री रिपोर्ट", path: "/dashboard/report", icon: "📊" },
  { naam: "GST रिपोर्ट", path: "/dashboard/gst", icon: "📄" },
  { naam: "सेटिंग्स", path: "/dashboard/settings", icon: "⚙️" },
]

const bottomNav = [
  { naam: "होम", path: "/dashboard", icon: "🏠" },
  { naam: "नया बिल", path: "/dashboard/bill/new", icon: "🧾" },
  { naam: "उधारी", path: "/dashboard/udhaari", icon: "💳" },
  { naam: "स्टॉक", path: "/dashboard/stock", icon: "📦" },
  { naam: "और", path: null, icon: "☰" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex w-64 min-h-screen bg-[#0f2d5e] flex-col fixed top-0 left-0">
        <div className="p-4 border-b border-white/10">
          <div className="text-white font-bold text-sm leading-snug">
            अमित इंटरप्राइजेज<br />एंड हार्डवेयर
          </div>
          <div className="text-white/40 text-xs mt-1">कोरियानी, अमेठी</div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-[#0f2d5e] font-bold text-sm">अ</div>
            <div>
              <div className="text-white text-xs font-semibold">अमित तिवारी</div>
              <div className="text-white/40 text-[10px]">प्रोप्राइटर</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-2">
          {menu.map((item) => (
            <Link key={item.path} href={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all border-l-4
                ${pathname === item.path
                  ? "bg-white/10 text-white border-amber-400"
                  : "text-white/60 border-transparent hover:bg-white/5 hover:text-white"}`}>
              <span>{item.icon}</span>
              <span>{item.naam}</span>
            </Link>
          ))}
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/60 border-l-4 border-transparent hover:bg-white/5 hover:text-white transition-all">
            <span>🚪</span><span>लॉगआउट</span>
          </button>
        </nav>
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f2d5e] flex items-center justify-between px-4 py-3 shadow-md">
        <div className="text-white font-bold text-sm">अमित हार्डवेयर</div>
        <div className="text-white/40 text-xs">कोरियानी, अमेठी</div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f2d5e] border-t border-white/10 flex">
        {bottomNav.map((item) =>
          item.path ? (
            <Link key={item.path} href={item.path}
              className={`flex-1 flex flex-col items-center justify-center py-2 text-[10px] font-medium transition-all
                ${pathname === item.path ? "text-amber-400" : "text-white/50 hover:text-white"}`}>
              <span className="text-xl mb-0.5">{item.icon}</span>
              {item.naam}
            </Link>
          ) : (
            <button key="meer" onClick={() => setDrawerOpen(true)}
              className="flex-1 flex flex-col items-center justify-center py-2 text-[10px] font-medium text-white/50 hover:text-white transition-all">
              <span className="text-xl mb-0.5">{item.icon}</span>
              {item.naam}
            </button>
          )
        )}
      </div>

      {/* ── MOBILE DRAWER (और वाला) ── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="relative bg-[#0f2d5e] rounded-t-2xl p-4 pb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white font-semibold">सभी विकल्प</div>
              <button onClick={() => setDrawerOpen(false)} className="text-white/50 text-xl">✕</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {menu.map((item) => (
                <Link key={item.path} href={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-medium transition-all
                    ${pathname === item.path
                      ? "bg-amber-400 text-[#0f2d5e]"
                      : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
                  <span className="text-2xl">{item.icon}</span>
                  {item.naam}
                </Link>
              ))}
            </div>
            <button onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-all">
              <span>🚪</span> लॉगआउट
            </button>
          </div>
        </div>
      )}
    </>
  )
}