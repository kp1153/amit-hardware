import Navbar from "@/components/website/Navbar"
import Footer from "@/components/website/Footer"

export const metadata = {
  title: "अमित इण्टरप्राइजेज एण्ड हार्डवेयर | अमेठी",
  description: "अमेठी, उत्तर प्रदेश में सेनेटरी, नल, PVC पाइप, पेन्ट्स और हार्डवेयर सामान के लिए अमित इण्टरप्राइजेज एण्ड हार्डवेयर, कोरियानी।",
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