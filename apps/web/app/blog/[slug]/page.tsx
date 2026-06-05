import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

// Pre-generate all post pages at build time
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// Dynamic metadata per post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return {
    title: `${post.title} | pdf62 Blog`,
    description: post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return (
    <main className="max-w-4xl mx-auto p-8 animate-fade-in-up">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-11 hover:text-slate-12 transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Blog
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-12 tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-slate-10">{post.date}</p>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-3 text-slate-11">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <article
        className="prose max-w-none text-slate-11 prose-headings:font-bold prose-headings:text-slate-12 prose-strong:text-slate-12 prose-code:text-slate-12 prose-a:text-[#E5322D] hover:prose-a:text-[#C53030]"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  )
}
