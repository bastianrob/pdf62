import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | PDF62",
  description: "Get in touch with the PDF62 team.",
}

export default function ContactPage() {
  return (
    <div className="p-8 text-slate-11">
      <h1 className="text-4xl font-bold text-slate-12 tracking-tight">Contact Us</h1>
      <p className="mb-10 text-sm">We'd love to hear from you.</p>

      <div className="space-y-10 text-base leading-relaxed max-w-2xl">
        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Get In Touch</h2>
          <p className="mb-6">
            If you have any questions, feedback, bug reports, or feature requests regarding PDF62, please don't hesitate to reach out. Our team is always looking to improve our tools and provide the best secure PDF processing experience possible.
          </p>
          
          <div className="bg-slate-2 border border-slate-6 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-12 mb-2">Email Us</h3>
            <p className="mb-4">
              The best way to reach us is via email. We aim to respond to all inquiries as soon as possible.
            </p>
            <a 
              href="mailto:contact@pdf62.id" 
              className="inline-flex items-center justify-center font-bold text-[#E5322D] hover:text-[#C53030] transition-colors"
            >
              contact@pdf62.id
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Business Inquiries</h2>
          <p>
            For partnership opportunities, press inquiries, or other business-related matters, please use the same email address provided above and include a descriptive subject line.
          </p>
        </section>
      </div>
    </div>
  )
}
