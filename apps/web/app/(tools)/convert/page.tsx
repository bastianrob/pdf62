import type { Metadata } from 'next'
import ConvertTool from './ConvertTool'
import { RelatedTools } from '../RelatedTools'
import { ToolSeoContent } from '@pdf62/ui/components/ToolSeoContent'

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

const seoContent = {
  howToHeading: 'How to convert a PDF to images',
  intro:
    'Sometimes you need a picture of a page rather than a PDF — for a slide, a chat, or a site that only accepts images. PDF62 renders each PDF page to a crisp PNG or JPEG right in your browser, with no upload and no quality watermark.',
  steps: [
    {
      title: 'Open the PDF to Image tool',
      body: 'Drop your PDF onto the upload area above. PDF62 reads it locally and shows how many pages it contains.',
    },
    {
      title: 'Pick a format and resolution',
      body: 'Choose PNG for lossless, sharp text or JPEG for smaller photo-friendly files, then set the resolution (DPI) for the level of detail you need.',
    },
    {
      title: 'Select the pages',
      body: 'Convert every page, or set a page range to export only the pages you want.',
    },
    {
      title: 'Convert and download',
      body: 'Click Convert to Images, then download each page individually or grab them all at once.',
    },
  ],
  benefitsHeading: 'Why convert PDFs to images with PDF62',
  benefits: [
    'Fully local: pages are rendered on your device and never uploaded.',
    'PNG or JPEG: pick lossless quality or smaller file size for each job.',
    'Adjustable DPI: from lightweight screen images to print-ready 300 DPI.',
    'Page ranges: export a single page or the whole document.',
  ],
  faqs: [
    {
      q: 'Should I choose PNG or JPEG?',
      a: 'Use PNG for documents with text, line art, or screenshots where you want razor-sharp edges and lossless quality. Use JPEG for scanned pages and photo-heavy content where smaller files matter more than perfect edges.',
    },
    {
      q: 'What DPI should I use?',
      a: '72–96 DPI is fine for on-screen use, 150 DPI is a balanced default, and 300 DPI is best for printing. Higher DPI means sharper but larger images and slightly longer processing.',
    },
    {
      q: 'Can I convert just one page?',
      a: 'Yes. Switch the page selection to a custom range and enter the same start and end page to export a single page as an image.',
    },
    {
      q: 'Can I extract the images embedded in a PDF?',
      a: 'This tool renders each full page to an image rather than pulling out individual embedded graphics. It is ideal when you want a faithful picture of the page as it appears.',
    },
    {
      q: 'Are my files uploaded anywhere?',
      a: 'No. The conversion runs entirely in your browser, so your PDF and the resulting images stay on your device.',
    },
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
        <ToolSeoContent {...seoContent} />
        <RelatedTools currentPath="/convert" />
      </div>
    </>
  )
}
