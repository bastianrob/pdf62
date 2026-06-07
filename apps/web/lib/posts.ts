import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const GITHUB_OWNER = 'bastianrob'
const GITHUB_REPO = 'pdf62'
const POSTS_PATH = 'apps/web/posts'

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export interface Post extends PostMeta {
  contentHtml: string
}

const fetchOptions = {
  next: { revalidate: 3600 },
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'PDF62-Blog',
  },
}

interface TreeItem {
  path: string
  url: string
}

async function getBlogTree(): Promise<TreeItem[]> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/main?recursive=1`
    const res = await fetch(url, fetchOptions)
    if (!res.ok) return []
    const data = await res.json()
    return data.tree.filter(
      (item: any) =>
        item.path.startsWith(`${POSTS_PATH}/`) &&
        item.path.endsWith('.md')
    )
  } catch (error) {
    console.error('Failed to fetch tree:', error)
    return []
  }
}

// Helper to parse filename: [YYYYMMDD]_slug.md
function parseFilename(filename: string) {
  const match = filename.match(/^\[(\d{4})(\d{2})(\d{2})\]_(.+)\.md$/)
  if (!match) return null
  const [, year, month, day, slug] = match
  return { date: `${year}-${month}-${day}`, slug, fullPath: filename }
}

export async function getPaginatedPosts(page: number = 1, limit: number = 10): Promise<{ posts: PostMeta[], totalPosts: number }> {
  const tree = await getBlogTree()

  // Extract filenames and sort
  const allFiles = tree
    .map(item => item.path.replace(`${POSTS_PATH}/`, ''))
    .map(parseFilename)
    .filter(Boolean) as { date: string, slug: string, fullPath: string }[]

  // Sort descending by date
  allFiles.sort((a, b) => b.date.localeCompare(a.date))

  const totalPosts = allFiles.length
  const startIndex = (page - 1) * limit
  const paginatedFiles = allFiles.slice(startIndex, startIndex + limit)

  const postsMeta = await Promise.all(
    paginatedFiles.map(async (file) => {
      const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${POSTS_PATH}/${encodeURIComponent(file.fullPath)}`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) return null

      const fileContents = await res.text()
      const { data } = matter(fileContents)

      return {
        slug: file.slug,
        title: data.title || '',
        date: data.date || file.date,
        description: data.description || '',
        tags: data.tags ?? [],
      } as PostMeta
    })
  )

  const validPosts = postsMeta.filter((p): p is PostMeta => p !== null)
  return { posts: validPosts, totalPosts }
}

export async function getAllSlugs(): Promise<string[]> {
  const tree = await getBlogTree()
  return tree
    .map(item => item.path.replace(`${POSTS_PATH}/`, ''))
    .map(parseFilename)
    .filter(Boolean)
    .map(f => f!.slug)
}

export async function getAllPostSlugsAndDates(): Promise<{ slug: string; date: string }[]> {
  const tree = await getBlogTree()
  return tree
    .map(item => item.path.replace(`${POSTS_PATH}/`, ''))
    .map(parseFilename)
    .filter(Boolean) as { slug: string; date: string }[]
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const tree = await getBlogTree()
  
  const fileInfo = tree
    .map(item => item.path.replace(`${POSTS_PATH}/`, ''))
    .map(parseFilename)
    .find(f => f?.slug === slug)

  if (!fileInfo) throw new Error(`Post not found: ${slug}`)

  const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${POSTS_PATH}/${encodeURIComponent(fileInfo.fullPath)}`
  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${slug}`)
  }

  const fileContents = await res.text()
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || '',
    date: data.date || fileInfo.date,
    description: data.description || '',
    tags: data.tags ?? [],
    contentHtml,
  }
}
