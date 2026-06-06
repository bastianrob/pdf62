import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "PDF62 cookie policy — learn about essential cookies, analytics, and advertising cookies used on our site.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Cookie Policy | PDF62",
    description: "PDF62 cookie policy — learn about essential cookies, analytics, and advertising cookies used on our site.",
  },
}

export default function CookiesPage() {
  return (
    <div className="p-8 text-slate-11">
      <h1 className="text-4xl font-bold text-slate-12 tracking-tight">Cookie Policy</h1>
      <p className="mb-10 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <div className="space-y-10 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">1. What are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">2. How We Use Cookies</h2>
          <p className="mb-4">
            PDF62 uses cookies for several purposes, primarily to ensure the smooth operation of our website. These include:
          </p>
          <ul className="list-disc pl-6 space-y-3 marker:text-slate-8">
            <li>
              <strong className="text-slate-12 font-semibold">Essential Cookies:</strong> These are required for the operation of our website. They include cookies that enable you to log into secure areas of our website or remember your theme preferences (e.g., light or dark mode).
            </li>
            <li>
              <strong className="text-slate-12 font-semibold">Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">3. Third-Party Advertising Cookies</h2>
          <p>
            As our service is free and supported by advertisements, our third-party advertising partners may place and access cookies on your browser. These cookies are used to track your browsing habits across different websites in order to deliver advertisements that are more relevant to your interests. 
          </p>
          <p className="mt-4">
            These third-party vendors use technologies like cookies, JavaScript, and Web Beacons to measure the effectiveness of their campaigns and to personalize advertising content. We do not have access to or control over these cookies used by third-party advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">4. Managing Your Cookie Preferences</h2>
          <p>
            Most web browsers allow you to manage cookies through their settings preferences. You can configure your browser to accept or reject all cookies, or notify you when a cookie is set. However, if you choose to disable cookies, please note that some parts of our website may not function properly or may become inaccessible.
          </p>
          <p className="mt-4">
            For more information on how to manage and delete cookies, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#E5322D] hover:underline">allaboutcookies.org</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please refer to our Privacy Policy or contact us through our website.
          </p>
        </section>
      </div>
    </div>
  )
}
