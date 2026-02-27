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

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  const NavLinks = () => (
    <>
      {menu.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all border-l-4
            ${pathname === item.path
              ? "bg-white/10 text-white border-amber-400"
              : "text-white/60 border-transparent hover:bg-white/5 hover:text-white"
            }`}
        >
          <span>{item.icon}</span>
          <span>{item.naam}</span>
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/60 border-l-4 border-transparent hover:bg-white/5 hover:text-white transition-all"
      >
        <span>🚪</span>
        <span>लॉगआउट</span>
      </button>
    </>
  )

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f2d5e] flex items-center justify-between px-4 py-3 shadow-md">
        <div className="text-white font-bold text-sm">अमित हार्डवेयर</div>
        <button onClick={() => setOpen(!open)} className="text-white text-2xl">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed top-12 left-0 right-0 bottom-0 z-40 bg-[#0f2d5e] overflow-y-auto">
          <div className="py-2">
            <NavLinks />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
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
          <NavLinks />
        </nav>
      </aside>
    </>
  )
}
