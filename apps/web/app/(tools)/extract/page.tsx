import type { Metadata } from 'next'
import ExtractTool from './ExtractTool'
import { RelatedTools } from '../RelatedTools'
import { ToolSeoContent } from '@pdf62/ui/components/ToolSeoContent'

export const metadata: Metadata = {
  title: 'Extract PDF Pages — Pull Pages from PDF',
  description: 'Extract specific pages from a PDF document. No uploads, fully private, works offline.',
  keywords: ['extract pdf pages', 'pull pages from pdf', 'select pdf pages', 'extract specific pages online', 'pdf page extractor'],
  alternates: {
    canonical: '/extract',
  },
  openGraph: {
    title: 'Extract PDF Pages — Pull Pages from PDF | PDF62',
    description: 'Extract specific pages from a PDF document. No uploads, fully private.',
    url: 'https://pdf62.skyhold.id/extract',
    siteName: 'PDF62',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extract PDF Pages — Pull Pages from PDF | PDF62',
    description: 'Extract specific pages from a PDF document. No uploads, fully private.',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF62 — Extract PDF Pages',
  operatingSystem: 'Web Browser',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://pdf62.skyhold.id/extract',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pdf62.skyhold.id' },
    { '@type': 'ListItem', position: 2, name: 'Extract PDF Pages', item: 'https://pdf62.skyhold.id/extract' },
  ],
}

const seoContent = {
  howToHeading: 'How to extract pages from a PDF',
  intro:
    "When you only need part of a document, there's no reason to send the whole thing. PDF62 pulls a chosen range of pages out of a PDF into a new file, locally in your browser — no uploads, no accounts, and no watermark.",
  steps: [
    {
      title: 'Open the Extract tool',
      body: 'Drop your PDF onto the upload area, or click to browse for the source document.',
    },
    {
      title: 'Set the page range',
      body: 'Enter the first and last page of the section you want to pull out into a new PDF.',
    },
    {
      title: 'Extract the pages',
      body: 'Click Extract. PDF62 builds a new document from just those pages, on your device.',
    },
    {
      title: 'Download the new PDF',
      body: 'Save the extracted PDF — your original file is left untouched.',
    },
  ],
  benefitsHeading: 'Why extract PDF pages with PDF62',
  benefits: [
    'Local and private: pages are extracted in the browser, never uploaded.',
    'Precise: pull out exactly the page range you need.',
    'Non-destructive: your original PDF stays exactly as it was.',
    'Free and unlimited: no accounts, watermarks, or size caps.',
  ],
  faqs: [
    {
      q: 'What is the difference between extracting and splitting?',
      a: 'Extract creates one new PDF from a specific page range you choose — ideal when you need a single section. Split breaks the whole document into multiple files by page count. Reach for Extract when you want just one part of a file.',
    },
    {
      q: 'Does extracting pages change my original PDF?',
      a: 'No. Extraction creates a brand-new file containing only the selected pages and leaves your source document completely unchanged.',
    },
    {
      q: 'Can I extract a single page?',
      a: 'Yes. Set the start and end page to the same number to pull out an individual page as its own PDF.',
    },
    {
      q: 'Are my documents kept private?',
      a: 'Always. PDF62 extracts pages using WebAssembly in your browser, so your file is never uploaded to or stored on any server.',
    },
  ],
}

export default function ExtractPage() {
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
      <ExtractTool />
      <div className="mx-4 lg:mx-8">
        <ToolSeoContent {...seoContent} />
        <RelatedTools currentPath="/extract" />
      </div>
    </>
  )
}
