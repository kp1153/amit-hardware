export default function HomePage() {
  return (
    <div>
      <section className="bg-[#0f2d5e] text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">अमित इण्टरप्राइजेज एण्ड हार्डवेयर</h1>
        <p className="text-white/70 text-lg mb-8">अमेठी का भरोसेमंद हार्डवेयर एवं सेनेटरी स्टोर</p>
        <a href="/contact" className="bg-amber-400 text-[#0f2d5e] font-bold px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors">
          संपर्क करें
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#0f2d5e] text-center mb-10">हमारे उत्पाद</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["🚿 सेनेटरी", "🔧 नल एवं फिटिंग", "🪠 PVC पाइप", "🎨 पेन्ट्स", "🔩 हार्डवेयर", "📦 बिल्डिंग मटेरियल"].map((item) => (
            <div key={item} className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{item.split(" ")[0]}</div>
              <div className="font-semibold text-[#0f2d5e] text-sm">{item.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0f2d5e] mb-4">हमसे क्यों खरीदें?</h2>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[["✅", "गुणवत्तापूर्ण सामान", "हर सामान उच्च गुणवत्ता का"],
              ["💰", "उचित मूल्य", "किफायती दाम, बेहतर सामान"],
              ["🤝", "विश्वसनीय सेवा", "वर्षों का अनुभव और विश्वास"]].map(([icon, title, desc]) => (
              <div key={title} className="p-6">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="font-bold text-[#0f2d5e] mb-2">{title}</div>
                <div className="text-gray-500 text-sm">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}