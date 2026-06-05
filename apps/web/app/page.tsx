import { HeroSection } from "@pdf62/ui/components/HeroSection"
import { ToolSection } from "@pdf62/ui/components/ToolSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF62 | Free & Private Local PDF Tools",
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
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 my-8">
      <HeroSection />
      <ToolSection />
    </div>
  )
}
