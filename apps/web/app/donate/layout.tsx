import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate — Support PDF62',
  description: 'Support PDF62 development through cryptocurrency donations. Help us keep PDF tools free and private for everyone.',
  alternates: {
    canonical: 'https://pdf62.skyhold.id/donate',
  },
  openGraph: {
    title: 'Donate — Support PDF62',
    description: 'Support PDF62 development through cryptocurrency donations.',
    url: 'https://pdf62.skyhold.id/donate',
    siteName: 'PDF62',
    type: 'website',
  },
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children
}
