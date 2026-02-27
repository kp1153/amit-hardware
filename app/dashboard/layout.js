"use client"

import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="w-full md:ml-64 flex-1 p-6 pt-16 md:pt-6">
        {children}
      </main>
    </div>
  )
}