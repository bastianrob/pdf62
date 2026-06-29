import { MetadataRoute } from 'next'
import { getAllPostSlugsAndDates } from '@/lib/posts'

const BASE_URL = 'https://pdf62.skyhold.id'

// Stable lastmod dates. Using `new Date()` here would stamp every page with the
// build time on every deploy, which trains Google to distrust <lastmod>. Bump
// these only when the relevant pages actually change.
const CONTENT_UPDATED = new Date('2026-06-29') // tools + home — refreshed with how-to/FAQ content
const SITE_LAUNCH = new Date('2026-06-06') // stable date for the slower-moving info pages

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only value pages we want crawl budget spent on. Boilerplate/legal pages
  // (contact, privacy, terms, cookies) are intentionally omitted — they're still
  // reachable and crawlable via the footer, just not advertised for priority,
  // so a new low-authority domain's crawl budget concentrates on tools + content.
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/compress`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/merge`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/split`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/extract`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/convert`, lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: SITE_LAUNCH, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: SITE_LAUNCH, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/pricing`, lastModified: SITE_LAUNCH, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/donate`, lastModified: SITE_LAUNCH, changeFrequency: 'yearly', priority: 0.4 },
  ]

  const posts = await getAllPostSlugsAndDates()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
