export default function Footer() {
  return (
    <footer className="bg-[#0f2d5e] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="font-bold mb-2">अमित इंटरप्राइजेज एंड हार्डवेयर</div>
            <div className="text-white/50 text-sm">कोरियानी, भूसियावाँ, अमेठी, उत्तर प्रदेश</div>
          </div>
          <div>
            <div className="font-bold mb-2">संपर्क</div>
            <div className="text-white/50 text-sm">मो: —</div>
            <div className="text-white/50 text-sm">समय: सुबह 8 बजे – रात 9 बजे</div>
          </div>
          <div>
            <div className="font-bold mb-2">हमारे उत्पाद</div>
            <div className="text-white/50 text-sm">सेनेटरी · नल · PVC पाइप · पेन्ट्स · हार्डवेयर</div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} अमित इंटरप्राइजेज एंड हार्डवेयर</span>
          <a href="https://www.web-developer-kp.com" target="_blank" rel="noopener noreferrer"
            className="text-amber-400/60 hover:text-amber-400 transition-colors">
            Designed & Developed by Creative Solutions
          </a>
        </div>
      </div>
    </footer>
  )
}