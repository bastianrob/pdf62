import type { Metadata } from 'next'
import ConvertTool from './ConvertTool'
import { RelatedTools } from '../RelatedTools'

export const metadata: Metadata = {
  title: 'PDF to Image — Convert PDF Pages to PNG or JPEG',
  description: 'Convert PDF pages to PNG or JPEG images locally in your browser. No uploads, no servers — free, private, and instant.',
  keywords: ['pdf to image', 'pdf to png', 'pdf to jpg', 'convert pdf to image online free', 'pdf to image without upload'],
  alternates: {
    canonical: '/convert',
  },
  openGraph: {
    title: 'PDF to Image — Convert PDF Pages to PNG or JPEG | PDF62',
    description: 'Convert PDF pages to PNG or JPEG images locally in your browser. No uploads, no servers. Free, private, and instant.',
    url: 'https://pdf62.skyhold.id/convert',
    siteName: 'PDF62',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Image — Convert PDF Pages to PNG or JPEG | PDF62',
    description: 'Convert PDF pages to PNG or JPEG images locally in your browser. No uploads, no servers. Free, private, and instant.',
  },
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PDF62 — PDF to Image',
  operatingSystem: 'Web Browser',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://pdf62.skyhold.id/convert',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pdf62.skyhold.id' },
    { '@type': 'ListItem', position: 2, name: 'PDF to Image', item: 'https://pdf62.skyhold.id/convert' },
  ],
}

export default function ConvertPage() {
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
      <ConvertTool />
      <div className="mx-4 lg:mx-8">
        <RelatedTools currentPath="/convert" />
      </div>
    </>
  )
}
