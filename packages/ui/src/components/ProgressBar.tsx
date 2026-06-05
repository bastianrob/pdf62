interface ProgressBarProps {
  value: number // 0–100
  label?: string
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-slate-11 font-medium">{label}</span>
          <span className="text-xs text-slate-11 tabular-nums">{clamped}%</span>
        </div>
      )}
      <div className="h-2 bg-slate-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-9 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {/* Subtle glow beneath the progress */}
      <div
        className="h-3 -mt-2.5 bg-indigo-9/10 blur-md rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
