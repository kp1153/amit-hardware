// F:\amit-hardware\app\(website)\contact\page.js
export const metadata = {
  title: "संपर्क करें | हार्डवेयर एवं सेनेटरी स्टोर",
  description: "हार्डवेयर एवं सेनेटरी स्टोर से संपर्क करें।",
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#0f2d5e] mb-6">संपर्क करें</h1>
      <div className="grid grid-cols-2 gap-6">
        {[
          ["📍", "पता", "—"],
          ["📞", "मोबाइल", "—"],
          ["🕐", "समय", "सुबह 8 बजे – रात 9 बजे"],
          ["📅", "अवकाश", "रविवार — आधा दिन"],
        ].map(([icon, title, value]) => (
          <div key={title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex gap-4 items-start">
            <div className="text-3xl">{icon}</div>
            <div>
              <div className="font-bold text-[#0f2d5e]">{title}</div>
              <div className="text-gray-600 mt-1">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}