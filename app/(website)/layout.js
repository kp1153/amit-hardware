// F:\amit-hardware\app\(website)\layout.js
import Navbar from "@/components/website/Navbar"
import Footer from "@/components/website/Footer"

export const metadata = {
  title: "हार्डवेयर एवं सेनेटरी स्टोर",
  description: "हार्डवेयर, सेनेटरी, नल, PVC पाइप, पेन्ट्स और बिल्डिंग मटेरियल के लिए आपका भरोसेमंद साथी।",
}

export default function WebsiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}