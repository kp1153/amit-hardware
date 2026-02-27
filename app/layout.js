import { Baloo_2, Noto_Sans_Devanagari } from "next/font/google"
import "./globals.css"

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["devanagari"],
})

const noto = Noto_Sans_Devanagari({
  variable: "--font-noto",
  subsets: ["devanagari"],
})

export const metadata = {
  title: "अमित इण्टरप्राइजेज एण्ड हार्डवेयर",
  description: "सेनेटरी, नल, PVC पाइप, पेन्ट्स — कोरियानी, अमेठी",
}

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className={`${baloo.variable} ${noto.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
