import { CheckIcon } from "@radix-ui/react-icons"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | PDF62",
  description: "PDF62 is 100% free and ad-supported. Support us by making a donation.",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-1 p-8">
      <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-12 mb-6 tracking-tight">100% Free. No Strings Attached.</h1>
        <p className="text-lg text-slate-11 leading-relaxed">
          We believe that basic document utilities should be accessible to everyone without paying exorbitant subscription fees. That's why PDF62 is completely free and provided "as is".
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ad-Supported Card */}
        <div className="bg-slate-2 border border-slate-6 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Ad-Supported</h2>
          <p className="text-slate-11 mb-8">
            To keep our servers running and continue developing new features, we support ourselves through non-intrusive advertisements on the platform.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-red-9 mt-0.5 shrink-0" />
              <span className="text-slate-11">Unlimited file processing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-red-9 mt-0.5 shrink-0" />
              <span className="text-slate-11">Local, secure WebAssembly engine</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-red-9 mt-0.5 shrink-0" />
              <span className="text-slate-11">No registration required</span>
            </li>
          </ul>
          <Link
            href="/"
            className="block w-full text-center py-3 rounded-xl bg-slate-12 text-slate-1 hover:bg-slate-11 transition-colors font-bold"
          >
            Start Using PDF62
          </Link>
        </div>

        {/* Donation Card */}
        <div className="bg-slate-2 border border-red-7 rounded-3xl p-8 shadow-xl shadow-red-9/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <div className="bg-red-9/10 text-red-11 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Support Us
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-12 mb-4">Consider Donating</h2>
          <p className="text-slate-11 mb-8">
            If you find our tools valuable for your daily workflow, consider making a donation. Your support directly funds server costs and new feature development.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-red-9 mt-0.5 shrink-0" />
              <span className="text-slate-11">Help keep the platform free for everyone</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-red-9 mt-0.5 shrink-0" />
              <span className="text-slate-11">Support independent software engineers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-red-9 mt-0.5 shrink-0" />
              <span className="text-slate-11">Accepting major cryptocurrencies</span>
            </li>
          </ul>
          <Link
            href="/donate"
            className="block w-full text-center py-3 rounded-xl bg-red-9 text-white hover:bg-red-10 transition-colors font-bold shadow-md shadow-red-9/20"
          >
            Make a Donation
          </Link>
        </div>
      </div>
    </div>
  )
}
