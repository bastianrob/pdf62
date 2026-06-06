import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "About PDF62 — we build free, privacy-first PDF tools powered by WebAssembly. Learn about our mission and the team behind the tools.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | PDF62",
    description: "About PDF62 — we build free, privacy-first PDF tools powered by WebAssembly. Learn about our mission and the team behind the tools.",
  },
}

export default function AboutPage() {
  return (
    <div className="p-8 text-slate-11">
      <h1 className="text-4xl font-bold text-slate-12 tracking-tight">About Us</h1>
      <p className="mb-10 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <div className="space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Our Mission</h2>
          <p>
            At PDF62, our mission is to empower users with fast, secure, and intuitive PDF tools. We believe that manipulating your important documents should not come at the cost of your privacy. That's why we built a platform focused entirely on on-device processing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Privacy by Design</h2>
          <p>
            Traditional online PDF tools force you to upload your files to external servers, exposing sensitive information to potential breaches. PDF62 changes the paradigm by utilizing advanced WebAssembly (Wasm) technology. Every operation—whether it's merging, splitting, compressing, or extracting—happens locally inside your web browser. Your files never leave your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Who We Are</h2>
          <p>
            PDF62 is developed by independent software engineers passionate about web technologies and data security. We strive to provide professional-grade PDF tools that are accessible to everyone, without the need for expensive software licenses or compromised security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Contact Us</h2>
          <p>
            We love hearing from our users. Whether you have feedback, a feature request, or just want to say hello, feel free to get in touch with us through our Contact page.
          </p>
        </section>
      </div>
    </div>
  )
}
