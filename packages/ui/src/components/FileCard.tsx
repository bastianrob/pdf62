import { FileTextIcon, Cross1Icon } from "@radix-ui/react-icons"

interface FileCardProps {
  file: File
  onRemove?: () => void
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <div className="group flex items-center gap-3 px-4 py-3 bg-slate-2 border border-slate-6 rounded-lg hover:bg-slate-3 hover:border-slate-7 transition-all duration-200">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-3 shrink-0">
        <FileTextIcon className="w-4 h-4 text-indigo-11" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-12 truncate">{file.name}</p>
        <p className="text-xs text-slate-10">{formatBytes(file.size)}</p>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex items-center justify-center w-7 h-7 rounded-md text-slate-9 hover:text-red-500 hover:bg-red-3 transition-all duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Remove file"
        >
          <Cross1Icon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
