import {
  ImageIcon,
  LayersIcon,
  ReaderIcon,
  ScissorsIcon,
  ValueNoneIcon
} from "@radix-ui/react-icons"
import Link from "next/link"

const features = [
  {
    href: "/split",
    icon: ScissorsIcon,
    title: "Split PDF",
    description: "Separate one page or a whole set for easy conversion into independent PDF files.",
    color: "red",
  },
  {
    href: "/merge",
    icon: LayersIcon,
    title: "Merge PDF",
    description: "Combine PDFs in the order you want with the easiest PDF merger available.",
    color: "red",
  },
  {
    href: "/compress",
    icon: ValueNoneIcon,
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    color: "red",
  },
  {
    href: "/extract",
    icon: ReaderIcon,
    title: "Extract Pages",
    description: "Extract specific pages from your PDF file into a new document.",
    color: "red",
  },
  {
    href: "/convert",
    icon: ImageIcon,
    title: "PDF to Image",
    description: "Convert each PDF page into a high-quality PNG or JPEG image.",
    color: "red",
  },
]

export function ToolSection() {
  return (
    <section className="mx-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="p-8 rounded-xl bg-slate-1 border border-slate-6 hover:border-red-8 hover:shadow-xl hover:shadow-red-9/5 hover:scale-105 transition-all duration-200 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Card Header: Icon and Title side-by-side */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl text-red-9 group-hover:text-red-10 transition-colors duration-200 shrink-0">
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-12 leading-snug">
                  {feature.title}
                </h3>
              </div>
              {/* Card Content: Description */}
              <p className="text-sm text-slate-11 leading-relaxed">{feature.description}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
