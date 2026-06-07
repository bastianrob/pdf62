import { getPaginatedPosts } from '@/lib/posts'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

export const metadata: Metadata = {
  title: 'News, Tips & Tutorials',
  description: 'General news, tips, and tutorials for working with PDFs and online privacy.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'News, Tips & Tutorials | PDF62 Blog',
    description: 'General news, tips, and tutorials for working with PDFs and online privacy.',
    type: 'website',
  },
}

export const revalidate = 3600
const POSTS_PER_PAGE = 10

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))
  
  const { posts, totalPosts } = await getPaginatedPosts(currentPage, POSTS_PER_PAGE)
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return (
    <main className="max-w-4xl mx-auto p-8 animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-12 mb-4 tracking-tight">PDF62 Blog</h1>
      <p className="text-lg text-slate-11 mb-8 leading-relaxed">
        News, tips, tutorials, and privacy guides to help you securely manage your data.
      </p>

      <ul className="space-y-4 mb-12">
        {posts.map((post, i) => (
          <li key={post.slug} className="hover:translate-x-1 duration-200">
            {i >= 1 && <hr className="border-slate-6 mb-4" />}
            <Link href={`/blog/${post.slug}`} className="block group">
              <h2 className="text-2xl font-bold text-slate-12 group-hover:text-[#E5322D] transition-colors mb-2">
                {post.title}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-sm font-medium text-slate-10">{post.date}</p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-3 text-slate-11">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-base text-slate-11 leading-relaxed">{post.description}</p>
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <p className="text-slate-11 italic">No posts found on this page.</p>
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-between border-t border-slate-6 pt-8">
          {currentPage > 1 ? (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-12 bg-slate-2 hover:bg-slate-3 border border-slate-6 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Previous
            </Link>
          ) : (
            <div /> // Placeholder for flex spacing
          )}

          <span className="text-sm text-slate-11 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-12 bg-slate-2 hover:bg-slate-3 border border-slate-6 rounded-lg transition-colors"
            >
              Next
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          ) : (
            <div /> // Placeholder
          )}
        </nav>
      )}
    </main>
  )
}
