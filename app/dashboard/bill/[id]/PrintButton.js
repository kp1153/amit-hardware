// F:\amit-hardware\app\dashboard\bill\[id]\PrintButton.js
"use client"
export default function PrintButton() {
  return (
    <button onClick={() => window.print()}
      className="bg-[#0f2d5e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1a3f7a]">
      🖨️ प्रिंट करें
    </button>
  )
}