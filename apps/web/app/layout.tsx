import { Footer } from "@pdf62/ui/components/Footer"
import { Header } from "@pdf62/ui/components/Header"
import "@pdf62/ui/globals.css"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

export const metadata: Metadata = {
  title: "PDF62 | Secure & Fast PDF Processing",
  description: "Cross-platform PDF manipulation suite. Split, merge, and compress securely on your machine.",
  icons: "/favicon.svg",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-slate-1 text-slate-12 antialiased font-sans min-h-screen">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
