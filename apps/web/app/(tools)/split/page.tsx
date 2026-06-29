import type { Metadata } from 'next'
import SplitTool from './SplitTool'
import { RelatedTools } from '../RelatedTools'
import { ToolSeoContent } from '@pdf62/ui/components/ToolSeoContent'

export const metadata: Metadata = {
  title: 'Split PDF — Separate Pages Online',
  description: 'Split a PDF into smaller files by page count. Free and secure — runs entirely in your browser.',
  keywords: ['split pdf', 'separate pdf pages', 'divide pdf', 'split pdf online free', 'extract pages from pdf'],
  alternates: {
    canonical: '/split',
  },
  openGraph: {
    title: 'Split PDF — Separate Pages Online | PDF62',
    description: 'Split a PDF into smaller files by page count. Free and secure — runs in your browser.',
    url: 'https://pdf62.skyhold.id/split',
    siteName: 'PDF62',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split PDF — Separate Pages Online | PDF62',
    description: 'Split a PDF into smaller files by page count. Free and secure — runs in your browser.',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF62 — Split PDF',
  operatingSystem: 'Web Browser',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://pdf62.skyhold.id/split',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pdf62.skyhold.id' },
    { '@type': 'ListItem', position: 2, name: 'Split PDF', item: 'https://pdf62.skyhold.id/split' },
  ],
}

const seoContent = {
  howToHeading: 'How to split a PDF',
  intro:
    "A large PDF is easier to manage when it's broken into smaller pieces. PDF62 splits your document into chunks by page count — turning one big file into several smaller ones — entirely in your browser, with no uploads and no limits.",
  steps: [
    {
      title: 'Open the Split tool',
      body: 'Drop your PDF onto the upload area, or click to browse for the file you want to split.',
    },
    {
      title: 'Choose pages per chunk',
      body: 'Set how many pages each resulting file should contain — for example, 1 to turn every page into its own PDF, or 10 for ten-page chunks.',
    },
    {
      title: 'Split the document',
      body: 'Click Split PDF. PDF62 divides the document locally and shows how many files were created.',
    },
    {
      title: 'Download the pieces',
      body: 'Download each piece individually, or use Download All to save them in one go.',
    },
  ],
  benefitsHeading: 'Why split PDFs with PDF62',
  benefits: [
    'Stays on your device: the split happens in the browser with no uploads.',
    'Flexible chunks: from single pages to any page count you choose.',
    'No limits: split documents of any length, free and without an account.',
    'Batch download: grab every resulting file with one click.',
  ],
  faqs: [
    {
      q: 'Can I split a PDF into single pages?',
      a: 'Yes. Set the pages-per-chunk value to 1 and each page of your document becomes its own separate PDF file.',
    },
    {
      q: 'How are the split files named?',
      a: 'Each piece is named after your original file with a part number appended, so they stay in order and are easy to identify after downloading.',
    },
    {
      q: 'What is the difference between Split and Extract?',
      a: 'Split divides the whole document into multiple files by page count. Extract pulls a single chosen page range out into one new PDF. Use Split to break a file apart, and Extract when you only need a specific section.',
    },
    {
      q: 'Is splitting private?',
      a: 'Yes. The entire operation runs in your browser via WebAssembly, so your document is never uploaded or stored anywhere.',
    },
  ],
}

export default function SplitPage() {
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
      <SplitTool />
      <div className="mx-4 lg:mx-8">
        <ToolSeoContent {...seoContent} />
        <RelatedTools currentPath="/split" />
      </div>
    </>
  )
}
