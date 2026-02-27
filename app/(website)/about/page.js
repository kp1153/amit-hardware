// F:\amit-hardware\app\(website)\about\page.js
export const metadata = {
  title: "हमारे बारे में | हार्डवेयर एवं सेनेटरी स्टोर",
  description: "हार्डवेयर एवं सेनेटरी स्टोर के बारे में जानें — आपका भरोसेमंद हार्डवेयर स्टोर।",
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-[#0f2d5e] mb-6">हमारे बारे में</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm space-y-4 text-gray-700 leading-relaxed">
        <p>हम एक विश्वसनीय हार्डवेयर एवं सेनेटरी स्टोर हैं।</p>
        <p>हम सेनेटरी सामान, नल-फिटिंग, PVC पाइप, पेन्ट्स और हार्डवेयर उत्पादों की विस्तृत श्रृंखला प्रदान करते हैं।</p>
        <p>मालिक: <strong>—</strong></p>
        <p>पता: <strong>—</strong></p>
      </div>
    </div>
  )
}