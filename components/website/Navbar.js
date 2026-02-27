"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
  { href: "/", label: "होम" },
  { href: "/about", label: "हमारे बारे में" },
  { href: "/contact", label: "संपर्क करें" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[#0f2d5e] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg leading-tight">अमित इंटरप्राइजेज एंड हार्डवेयर</div>
          <div className="text-white/50 text-xs">कोरियानी, भूसियावाँ, अमेठी</div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors ${pathname === l.href ? "text-amber-400" : "text-white/70 hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a2050] px-6 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-2 border-b border-white/10 transition-colors ${pathname === l.href ? "text-amber-400" : "text-white/70"}`}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}