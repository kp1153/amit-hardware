export default function StatCard({ icon, label, value, trend, type }) {
  const trendColor =
    type === "up" ? "bg-green-100 text-green-700" :
    type === "down" ? "bg-red-100 text-red-700" :
    "bg-amber-100 text-amber-700"

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trendColor}`}>
          {trend}
        </span>
      </div>
      <div className="text-2xl font-bold text-[#0f2d5e]">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}