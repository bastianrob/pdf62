import { HeroSection } from "@pdf62/ui/components/HeroSection"
import { ToolSection } from "@pdf62/ui/components/ToolSection"
import type { Metadata } from "next"

const BASE_URL = "https://pdf62.skyhold.id"

export const metadata: Metadata = {
  title: "Free & Private Local PDF Tools",
  description: "Merge, split, compress, and extract pages from PDF files 100% privately in your browser. Powered by WebAssembly, no files are uploaded to any server.",
  keywords: [
    "PDF tools",
    "private PDF processing",
    "compress PDF locally",
    "merge PDF files",
    "split PDF",
    "extract PDF pages",
    "WebAssembly PDF",
    "secure PDF tools"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PDF62 | Free & Private Local PDF Tools",
    description: "Merge, split, compress, and extract pages from PDF files 100% privately in your browser. Powered by WebAssembly, no files are uploaded to any server.",
    url: BASE_URL,
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PDF62",
  url: BASE_URL,
  description: "Free, private PDF tools — merge, split, compress, and extract pages locally in your browser.",
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 my-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <ToolSection />
    </div>
  )
}
