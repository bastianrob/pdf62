import type { Metadata } from 'next'
import MergeTool from './MergeTool'
import { RelatedTools } from '../RelatedTools'

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
        <RelatedTools currentPath="/merge" />
      </div>
    </>
  )
}
