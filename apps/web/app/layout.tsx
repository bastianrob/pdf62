import { Footer } from "@pdf62/ui/components/Footer"
import { Header } from "@pdf62/ui/components/Header"
import { CookieBanner } from "@pdf62/ui/components/CookieBanner"
import "@pdf62/ui/globals.css"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

const BASE_URL = "https://pdf62.skyhold.id"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PDF62 | Secure & Fast PDF Processing",
    template: "%s | PDF62",
  },
  description: "Cross-platform PDF manipulation suite. Split, merge, and compress securely on your machine.",
  icons: "/favicon.svg",
  manifest: "/manifest.json",
  alternates: {
    languages: {
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    siteName: "PDF62",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "jQ2GozPrzxE_8QRNK-DuJ8q-qPxoza9boUqPN4H5134",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-RL55HZBSVC"

  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-slate-1 text-slate-12 antialiased font-sans min-h-screen">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <CookieBanner />
        {gaId && (
          <>
            <Script id="cookie-consent-default" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'wait_for_update': 500
                });
              `}
            </Script>
            <GoogleAnalytics gaId={gaId} />
          </>
        )}
      </body>
    </html>
  )
}
