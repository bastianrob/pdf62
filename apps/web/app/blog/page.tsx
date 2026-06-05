import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'News, Tips & Tutorials | PDF62 Blog',
  description: 'General news, tips, and tutorials for working with PDFs and online privacy.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="max-w-4xl mx-auto p-8 animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-12 mb-4 tracking-tight">PDF62 Blog</h1>
      <p className="text-lg text-slate-11 mb-8 leading-relaxed">
        News, tips, tutorials, and privacy guides to help you securely manage your data.
      </p>

      <ul className="space-y-4">
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
      </ul>
    </main>
  )
}
