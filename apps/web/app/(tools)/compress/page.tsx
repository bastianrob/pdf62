import type { Metadata } from 'next'
import CompressTool from './CompressTool'
import { RelatedTools } from '../RelatedTools'
import { ToolSeoContent } from '@pdf62/ui/components/ToolSeoContent'

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

const seoContent = {
  howToHeading: 'How to compress a PDF online',
  intro:
    "Large PDFs are slow to email and awkward to upload. PDF62's compressor shrinks them by optimizing the document structure and downsampling embedded images — all inside your browser, so the file never leaves your device. There's no sign-up, no watermark, and no size cap.",
  steps: [
    {
      title: 'Open the Compress tool',
      body: 'Drop your PDF onto the upload area above, or click to browse for a file on your device.',
    },
    {
      title: 'Choose your quality',
      body: 'Use the JPEG quality slider to balance sharpness against size, and the image scale slider to downsample high-resolution images.',
    },
    {
      title: 'Compress the file',
      body: 'Click Compress PDF. The work happens locally on your device, so even large files are processed without waiting on an upload.',
    },
    {
      title: 'Download the result',
      body: 'Compare the original and compressed sizes, then download your smaller PDF. Re-run with different settings any time.',
    },
  ],
  benefitsHeading: 'Why compress PDFs with PDF62',
  benefits: [
    '100% private: your file is processed in your browser and is never uploaded to a server.',
    'No limits: compress as many PDFs as you like, with no file-size caps or accounts.',
    'Adjustable quality: fine-tune image quality and scale to hit your target size.',
    'Works offline: once the page has loaded, you can compress without an internet connection.',
  ],
  faqs: [
    {
      q: 'Does compressing a PDF reduce its quality?',
      a: "It can, depending on your settings. Text and vector content stay crisp, but images are re-encoded — lowering the JPEG quality or image scale shrinks the file more at the cost of some image detail. For most documents the balanced range is visually lossless.",
    },
    {
      q: 'How much smaller will my PDF get?',
      a: 'It depends on what is inside. Scanned or image-heavy PDFs often shrink by 50–80%, while text-only files that are already optimized may only drop a little. Try a couple of quality levels to find the best trade-off.',
    },
    {
      q: 'Is it safe to compress confidential documents?',
      a: 'Yes. PDF62 compresses your file entirely in the browser using WebAssembly, so the document never leaves your computer — nothing is uploaded, stored, or seen by us.',
    },
    {
      q: 'Is there a file size limit?',
      a: "There is no hard limit imposed by PDF62. Because processing happens on your own device, the practical ceiling is your computer's available memory.",
    },
    {
      q: 'Why is my PDF so large in the first place?',
      a: 'Usually high-resolution scanned pages or embedded images. Compressing downsamples those images to bring the size down without changing the text.',
    },
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
        <ToolSeoContent {...seoContent} />
        <RelatedTools currentPath="/compress" />
      </div>
    </>
  )
}
