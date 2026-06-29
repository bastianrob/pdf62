import type { Metadata } from 'next'
import MergeTool from './MergeTool'
import { RelatedTools } from '../RelatedTools'
import { ToolSeoContent } from '@pdf62/ui/components/ToolSeoContent'

export const metadata: Metadata = {
  title: 'Merge PDF — Combine Multiple PDFs Online',
  description: 'Merge multiple PDF files into one document. 100% private, no file uploads required. Free and instant.',
  keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'merge pdf online free', 'combine pdf without upload'],
  alternates: {
    canonical: '/merge',
  },
  openGraph: {
    title: 'Merge PDF — Combine Multiple PDFs Online | PDF62',
    description: 'Merge multiple PDF files into one document. 100% private, no file uploads required.',
    url: 'https://pdf62.skyhold.id/merge',
    siteName: 'PDF62',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge PDF — Combine Multiple PDFs Online | PDF62',
    description: 'Merge multiple PDF files into one document. 100% private, no file uploads required.',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF62 — Merge PDF',
  operatingSystem: 'Web Browser',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://pdf62.skyhold.id/merge',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pdf62.skyhold.id' },
    { '@type': 'ListItem', position: 2, name: 'Merge PDF', item: 'https://pdf62.skyhold.id/merge' },
  ],
}

const seoContent = {
  howToHeading: 'How to merge PDF files',
  intro:
    "Combining several PDFs into one document makes them easier to send, print, and archive. PDF62's merge tool joins your files in the order you choose, locally in your browser — no uploads, no accounts, and no watermark on the result.",
  steps: [
    {
      title: 'Open the Merge tool',
      body: 'Drop the PDFs you want to combine onto the upload area, or click to browse and select multiple files.',
    },
    {
      title: 'Set the order',
      body: 'Arrange the files into the sequence you want them to appear in the final document.',
    },
    {
      title: 'Merge the files',
      body: 'Click Merge PDFs. The files are combined on your device, so there is no waiting on uploads even for large documents.',
    },
    {
      title: 'Download the result',
      body: 'Save your single combined PDF, ready to share or print.',
    },
  ],
  benefitsHeading: 'Why merge PDFs with PDF62',
  benefits: [
    'Private by design: your files are combined in the browser and never uploaded.',
    'Unlimited: merge as many files as you need, with no size caps or sign-up.',
    'Keeps your order: control exactly how the documents are sequenced.',
    'Works offline: combine files without an internet connection once loaded.',
  ],
  faqs: [
    {
      q: 'How many PDFs can I merge at once?',
      a: "There is no fixed limit. You can combine as many files as your device's memory comfortably handles, since the merging happens locally rather than on a server.",
    },
    {
      q: 'Can I control the order of the files?',
      a: 'Yes. You choose the sequence before merging, so the pages appear in exactly the order you want in the final document.',
    },
    {
      q: 'Will merging change the quality of my PDFs?',
      a: 'No. Merging combines the pages as-is without re-compressing them, so text and images keep their original quality. If you also want a smaller file, run the result through the compressor afterwards.',
    },
    {
      q: 'Is merging private?',
      a: 'Completely. PDF62 merges your files using WebAssembly inside your browser, so nothing is uploaded, stored, or visible to anyone but you.',
    },
  ],
}

export default function MergePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MergeTool />
      <div className="mx-4 lg:mx-8">
        <ToolSeoContent {...seoContent} />
        <RelatedTools currentPath="/merge" />
      </div>
    </>
  )
}
