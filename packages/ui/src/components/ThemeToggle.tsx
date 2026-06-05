"use client"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useCallback, useEffect, useState } from "react"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // Initialize from system preference or stored preference
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("theme", next ? "dark" : "light")
      return next
    })
  }, [])

  return (
    <button
      onClick={toggleDark}
      className="flex items-center justify-center w-9 h-9 rounded-full text-slate-11 hover:text-slate-12 hover:bg-slate-3 transition-all duration-200"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  )
}
