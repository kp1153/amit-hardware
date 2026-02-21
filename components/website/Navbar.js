"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "होम" },
  { href: "/about", label: "हमारे बारे में" },
  { href: "/contact", label: "संपर्क करें" },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <header className="bg-[#0f2d5e] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <div className="font-bold text-lg leading-tight">अमित इण्टरप्राइजेज एण्ड हार्डवेयर</div>
          <div className="text-white/50 text-xs">कोरियानी, भुसियावाँ, अमेठी</div>
        </div>
        <nav className="flex gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors ${pathname === l.href ? "text-amber-400" : "text-white/70 hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}