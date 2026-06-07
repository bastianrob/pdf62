"use client"

import React, { useEffect, useState } from "react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

const CONSENT_KEY = "pdf62_cookie_consent"
const CONSENT_DURATION_DAYS = 180
const MS_PER_DAY = 24 * 60 * 60 * 1000

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        const ageInDays = (Date.now() - data.timestamp) / MS_PER_DAY
        
        if (ageInDays > CONSENT_DURATION_DAYS) {
          setShowBanner(true)
          setIsRendered(true)
        } else if (data.consent === "granted") {
          if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("consent", "update", {
              analytics_storage: "granted",
              ad_storage: "granted",
            })
          }
        }
      } catch (e) {
        setShowBanner(true)
        setIsRendered(true)
      }
    } else {
      setShowBanner(true)
      setIsRendered(true)
    }
  }, [])

  const handleConsent = (consent: "granted" | "denied") => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        consent,
        timestamp: Date.now(),
      })
    )

    if (consent === "granted") {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
        })
      }
    }

    setShowBanner(false)
    setTimeout(() => setIsRendered(false), 300) // wait for transition
  }

  if (!isRendered) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300 ease-in-out ${
        showBanner ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="max-w-4xl mx-auto bg-slate-2 border border-slate-6 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-12 mb-1">
            We respect your privacy
          </h3>
          <p className="text-slate-11 text-sm leading-relaxed">
            We use anonymous analytics to understand how people use PDF62 so we can improve the tools. 
            We never track your personal data or read your files. Is it okay if we use cookies for analytics?
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => handleConsent("denied")}
            className="px-4 py-2 text-sm font-medium text-slate-11 bg-slate-3 hover:bg-slate-4 hover:text-slate-12 rounded-lg transition-colors border border-slate-6"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent("granted")}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  )
}
