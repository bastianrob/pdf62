import Link from 'next/link'
import { LayersIcon, ScissorsIcon, ValueNoneIcon, ReaderIcon } from '@radix-ui/react-icons'

const tools = [
  { name: 'Compress PDF', path: '/compress', description: 'Reduce file size', icon: ValueNoneIcon },
  { name: 'Merge PDFs', path: '/merge', description: 'Combine files', icon: LayersIcon },
  { name: 'Split PDF', path: '/split', description: 'Divide by pages', icon: ScissorsIcon },
  { name: 'Extract Pages', path: '/extract', description: 'Pull page ranges', icon: ReaderIcon },
]

interface RelatedToolsProps {
  currentPath: string
}

export function RelatedTools({ currentPath }: RelatedToolsProps) {
  const related = tools.filter((t) => t.path !== currentPath)

  return (
    <section className="mt-12 pt-8 border-t border-slate-6">
      <h2 className="text-sm font-semibold text-slate-10 uppercase tracking-wider mb-4">
        More PDF Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {related.map((tool) => {
          const Icon = tool.icon
          return (
            <Link
              key={tool.path}
              href={tool.path}
              className="flex items-center gap-3 p-4 bg-slate-2 border border-slate-6 rounded-xl hover:border-red-7 hover:bg-slate-3 transition-all group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-4 group-hover:bg-red-9/15 transition-colors shrink-0">
                <Icon className="w-4 h-4 text-slate-11 group-hover:text-red-9 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-12 group-hover:text-[#E5322D] transition-colors">
                  {tool.name}
                </p>
                <p className="text-xs text-slate-10">{tool.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
