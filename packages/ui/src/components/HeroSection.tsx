import { RocketIcon } from "@radix-ui/react-icons"
import { Badge } from "./Badge"

export function HeroSection() {
  return (
    <section className="mx-8 flex flex-col items-start justify-start text-left relative overflow-hidden">
      <div className="relative animate-fade-in-up w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-3 border border-red-6 text-xs font-medium text-red-11 mb-2">
          <RocketIcon className="w-3.5 h-3.5" />
          Powered by WebAssembly — everything runs locally
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-12 tracking-tight leading-tight mb-2">
          Process PDFs with absolute privacy. Zero file uploads, ever.
        </h1>

        <div className="flex flex-wrap gap-2">
          <Badge variant="default">100% Private!</Badge>
          <Badge variant="default">100% Unlimited!</Badge>
          <Badge variant="default">100% Free!</Badge>
        </div>
      </div>
    </section>
  )
}
