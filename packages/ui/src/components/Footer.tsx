import Link from "next/link"

const stats = [
  { label: "100% Private", value: "Local processing" },
  { label: "100% Unlimited", value: "No limit on file size" },
  { label: "100% Anonymous", value: "No sign-up required" },
]

const productLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Donate", href: "/donate" },
  { label: "FAQ", href: "/faq" },
]

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-6 bg-slate-2 py-8 transition-colors">
      <div className="mx-8">
        {/* Links Grid */}
        <div className="footer-links-grid text-left animate-fade-in-up delay-100">
          {/* Product Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-12 uppercase tracking-wider">Product</h4>
            <ul className="space-y-1">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-11 hover:text-red-9 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-12 uppercase tracking-wider">Company</h4>
            <ul className="space-y-1">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-11 hover:text-red-9 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-12 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-11 hover:text-red-9 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="h-px bg-slate-6 my-8" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-10">
          <p>© {new Date().getFullYear()} PDF62. All rights reserved.</p>
          <p>Your Private PDF Editor</p>
        </div>
      </div>
    </footer>
  )
}
