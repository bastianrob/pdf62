"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ThemeToggle } from "./ThemeToggle"
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Merge PDF", path: "/merge", title: "Merge multiple PDF files into one" },
    { name: "Split PDF", path: "/split", title: "Split a PDF file into separate page ranges" },
    { name: "Compress PDF", path: "/compress", title: "Reduce the file size of a PDF" },
    { name: "Extract PDF", path: "/extract", title: "Extract specific pages from a PDF document" },
    { name: "Blog", path: "/blog", title: "Tips, tutorials, and PDF privacy guides" },
  ]

  return (
    <header className="z-50 h-16 bg-white dark:bg-slate-1 border-b border-slate-6 transition-colors select-none relative">
      <div className="h-full mx-4 md:mx-8 flex items-center justify-between">
        {/* Left Section: Logo & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-12">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-slate-12 tracking-tight hover:opacity-80 transition-opacity shrink-0"
            title="PDF62 Home"
            aria-label="PDF62 Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-9 text-white text-sm font-bold shadow-sm shadow-red-9/20">
              P
            </span>
            <span className="text-lg">PDF62</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  title={item.title}
                  className={`text-sm font-medium transition-colors shrink-0 ${
                    active
                      ? "text-[#E5322D] font-semibold"
                      : "text-slate-11 hover:text-[#E5322D] dark:text-slate-12 dark:hover:text-red-400"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Section: Theme Toggle & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          
          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 -mr-2 rounded-md text-slate-11 hover:text-slate-12 hover:bg-slate-3 transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <Cross1Icon className="w-5 h-5" />
            ) : (
              <HamburgerMenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-1 border-b border-slate-6 shadow-lg md:hidden z-40">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  title={item.title}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? "bg-red-9/10 text-[#E5322D]"
                      : "text-slate-11 hover:bg-slate-3 hover:text-slate-12 dark:text-slate-12"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
