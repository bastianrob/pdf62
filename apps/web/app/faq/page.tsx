import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ | PDF62",
  description: "Frequently Asked Questions about PDF62.",
}

export default function FAQPage() {
  const faqs = [
    {
      question: "Is PDF62 really free?",
      answer: "Yes, our core tools are completely free to use. We support the service through advertising."
    },
    {
      question: "Are my files uploaded to your servers?",
      answer: "No. Unlike traditional PDF tools, PDF62 processes all your files locally on your own device using WebAssembly technology. Your sensitive documents never leave your browser."
    },
    {
      question: "Is there a file size limit?",
      answer: "Because processing happens on your device, there are no artificial file size limits. However, very large files may be constrained by your computer's available memory (RAM)."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account or registration is required to use the free tools."
    },
    {
      question: "What browsers are supported?",
      answer: "We support all modern web browsers that support WebAssembly, including recent versions of Chrome, Edge, Firefox, and Safari."
    }
  ]

  return (
    <div className="p-8 text-slate-11">
      <h1 className="text-4xl font-bold text-slate-12 tracking-tight">Frequently Asked Questions</h1>
      <p className="mb-10 text-sm">Have a question? We're here to help.</p>

      <div className="space-y-8 max-w-3xl">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-slate-2 border border-slate-6 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-12 mb-2">{faq.question}</h3>
            <p className="text-base leading-relaxed text-slate-11">{faq.answer}</p>
          </div>
        ))}

        <div className="mt-12 pt-8 border-t border-slate-6">
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Still have questions?</h2>
          <p className="text-base">
            If you couldn't find the answer to your question, feel free to reach out to us directly through our <Link href="/contact" className="text-[#E5322D] hover:underline font-semibold">Contact Us</Link> page.
          </p>
        </div>
      </div>
    </div>
  )
}
