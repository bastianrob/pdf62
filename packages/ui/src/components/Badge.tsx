import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseStyle =
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-8 focus:ring-offset-2"

  const variantStyles = {
    default: "border-transparent bg-red-9 text-white hover:bg-red-10 shadow-sm",
    secondary: "border-transparent bg-slate-3 text-slate-12 hover:bg-slate-4",
    destructive: "border-transparent bg-red-3 border-red-6 text-red-11",
    outline: "text-slate-11 border-slate-6 hover:bg-slate-3 hover:text-slate-12",
  }

  return <div className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props} />
}
