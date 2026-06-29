// Server-rendered SEO content block for each tool page: a "How to" guide, a
// benefits list, and an FAQ. It is intentionally NOT a client component so the
// text is present in the static HTML for crawlers (the interactive tool above it
// is JS-only). The FAQ also emits matching FAQPage structured data.

export interface HowToStep {
  title: string
  body: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface ToolSeoContentProps {
  howToHeading: string
  intro: string
  steps: HowToStep[]
  benefitsHeading: string
  benefits: string[]
  faqs: FaqItem[]
}

export function ToolSeoContent({
  howToHeading,
  intro,
  steps,
  benefitsHeading,
  benefits,
  faqs,
}: ToolSeoContentProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="max-w-3xl mx-auto mt-12 mb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* How-to guide */}
      <h2 className="text-2xl font-bold text-slate-12 tracking-tight mb-4">{howToHeading}</h2>
      <p className="text-base text-slate-11 leading-relaxed mb-6">{intro}</p>
      <ol className="space-y-4 mb-12">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-red-9/15 text-red-11 text-sm font-bold tabular-nums">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-12">{step.title}</p>
              <p className="text-sm text-slate-11 leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Benefits */}
      <h2 className="text-2xl font-bold text-slate-12 tracking-tight mb-4">{benefitsHeading}</h2>
      <ul className="space-y-2.5 mb-12">
        {benefits.map((b, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-11 leading-relaxed">
            <span className="text-red-9 mt-0.5 shrink-0" aria-hidden>
              ✓
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 className="text-2xl font-bold text-slate-12 tracking-tight mb-6">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-slate-6 border-t border-slate-6">
        {faqs.map((f, i) => (
          <div key={i} className="py-5">
            <h3 className="text-base font-semibold text-slate-12 mb-2">{f.q}</h3>
            <p className="text-sm text-slate-11 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
