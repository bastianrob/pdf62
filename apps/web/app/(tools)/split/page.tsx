import type { Metadata } from 'next'
import SplitTool from './SplitTool'
import { RelatedTools } from '../RelatedTools'

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
        <RelatedTools currentPath="/split" />
      </div>
    </>
  )
}
