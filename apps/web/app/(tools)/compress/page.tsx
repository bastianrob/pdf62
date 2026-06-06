import type { Metadata } from 'next'
import CompressTool from './CompressTool'
import { RelatedTools } from '../RelatedTools'

export const metadata: Metadata = {
  title: 'Compress PDF — Reduce File Size Online',
  description: 'Compress PDF files locally in your browser. Reduce file size without uploading to any server. Free, private, and instant.',
  keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf compressor online free', 'compress pdf without upload'],
  alternates: {
    canonical: '/compress',
  },
  openGraph: {
    title: 'Compress PDF — Reduce File Size Online | PDF62',
    description: 'Compress PDF files locally in your browser. Reduce file size without uploading. Free, private, and instant.',
    url: 'https://pdf62.skyhold.id/compress',
    siteName: 'PDF62',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF — Reduce File Size Online | PDF62',
    description: 'Compress PDF files locally in your browser. Reduce file size without uploading. Free, private, and instant.',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF62 — Compress PDF',
  operatingSystem: 'Web Browser',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://pdf62.skyhold.id/compress',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pdf62.skyhold.id' },
    { '@type': 'ListItem', position: 2, name: 'Compress PDF', item: 'https://pdf62.skyhold.id/compress' },
  ],
}

export default function CompressPage() {
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
      <CompressTool />
      <div className="mx-4 lg:mx-8">
        <RelatedTools currentPath="/compress" />
      </div>
    </>
  )
}
