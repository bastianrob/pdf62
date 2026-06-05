"use client"

import { ReactNode } from "react"

export interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  subLabel?: string | ReactNode
  valueSuffix?: string
  minDescription?: string
  maxDescription?: string
  className?: string
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  subLabel,
  valueSuffix = "",
  minDescription,
  maxDescription,
  className = "",
}: SliderProps) {
  return (
    <div className={`bg-slate-3 rounded-xl p-4 border border-slate-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-11">{label}</span>
        <div className="flex items-center gap-2">
          {subLabel && <span className="text-xs text-slate-10">{subLabel}</span>}
          <span className="px-2 py-0.5 rounded-md text-sm font-bold text-slate-12 tabular-nums">
            {value}
            {valueSuffix}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      {(minDescription || maxDescription) && (
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-slate-9">{minDescription ?? ""}</span>
          <span className="text-[11px] text-slate-9">{maxDescription ?? ""}</span>
        </div>
      )}
    </div>
  )
}
