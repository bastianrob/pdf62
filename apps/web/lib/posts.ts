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

// Get all posts sorted by date (newest first)
export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${POSTS_PATH}`
    const res = await fetch(url, fetchOptions)

    if (!res.ok) {
      console.error(`Failed to fetch posts list: ${res.status} ${res.statusText}`)
      return []
    }

    const files: any[] = await res.json()
    const mdFiles = files.filter((file) => file.name.endsWith('.md'))

    const postsMeta = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = file.name.replace(/\.md$/, '')
        const rawRes = await fetch(file.download_url, { next: { revalidate: 3600 } })
        
        if (!rawRes.ok) return null

        const fileContents = await rawRes.text()
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          description: data.description || '',
          tags: data.tags ?? [],
        } as PostMeta
      })
    )

    const validPosts = postsMeta.filter((p): p is PostMeta => p !== null)
    return validPosts.sort((a, b) => b.date.localeCompare(a.date))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post> {
  const url = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${POSTS_PATH}/${slug}.md`
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
    date: data.date || '',
    description: data.description || '',
    tags: data.tags ?? [],
    contentHtml,
  }
}
