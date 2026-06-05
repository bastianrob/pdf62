import { LightningBoltIcon, LockClosedIcon } from "@radix-ui/react-icons"
import React from "react"

interface ToolHeaderProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

export function ToolHeader({ title, description, icon, className = "" }: ToolHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 items-center text-center px-4 lg:px-8 ${className}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-red-9 to-red-11 shadow-xl">
        {icon}
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-12 tracking-tight">{title}</h1>
      <p className="text-base text-slate-11 mx-auto leading-relaxed">
        {description}
      </p>
      <div className="flex items-center justify-center gap-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-11 text-xs text-slate-11">
          <LockClosedIcon className="w-3 h-3" />
          100% Private
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-11 text-xs text-slate-11">
          <LightningBoltIcon className="w-3 h-3" />
          Runs Locally
        </span>
      </div>
    </div>
  )
}
