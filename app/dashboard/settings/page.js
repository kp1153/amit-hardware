// F:\amit-hardware\app\dashboard\settings\page.js
export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-xl font-bold text-[#0f2d5e]">⚙️ सेटिंग्स</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
        <div className="font-bold text-[#0f2d5e] border-b pb-2">दुकान की जानकारी</div>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">दुकान का नाम</div>
          <div className="font-semibold">—</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">पता</div>
          <div className="font-semibold">—</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-gray-500">मालिक</div>
          <div className="font-semibold">—</div>
        </div>
        <p className="text-xs text-gray-400">सेटिंग्स बदलने की सुविधा अगले अपडेट में आएगी।</p>
      </div>
    </div>
  )
}