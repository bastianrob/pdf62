import type { Metadata } from 'next'
import ExtractTool from './ExtractTool'
import { RelatedTools } from '../RelatedTools'

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
        <RelatedTools currentPath="/extract" />
      </div>
    </>
  )
}
