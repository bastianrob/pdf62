import Link from "next/link"
import { RocketIcon } from "@radix-ui/react-icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subscription Active",
  description: "Your PDF62 Pro subscription is now active.",
  robots: { index: false, follow: false },
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-1 flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-3 mx-auto mb-6">
          <RocketIcon className="w-8 h-8 text-indigo-11" />
        </div>
        <h1 className="text-2xl font-bold text-slate-12 mb-3">Welcome to Pro!</h1>
        <p className="text-slate-11 mb-8 leading-relaxed">
          Your subscription is active. If you purchased the Unlimited plan, your license key has been sent to your email.
        </p>
        <Link
          href="/split"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-9 text-white rounded-xl font-medium hover:bg-indigo-10 active:scale-[0.97] transition-all duration-150 shadow-lg shadow-indigo-9/20"
        >
          <RocketIcon className="w-4 h-4" />
          Start Processing
        </Link>
      </div>
    </div>
  )
}
