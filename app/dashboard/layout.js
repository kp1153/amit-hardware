"use client"

import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-64 flex-1 p-6">
        {children}
      </main>
    </div>
  )
}