"use client"

import { UploadIcon } from "@radix-ui/react-icons"
import { useCallback, useRef, useState } from "react"

interface DropzoneProps {
  onFiles: (files: File[]) => void
  multiple?: boolean
  accept?: string
  label?: string
  className?: string
}

export function Dropzone({
  onFiles,
  multiple = false,
  accept = "application/pdf",
  label = "Drop PDF here or click to browse",
  className = "",
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragOver(false)
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type === "application/pdf")
      if (files.length > 0) onFiles(files)
    },
    [onFiles]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? [])
      if (files.length > 0) onFiles(files)
      // Reset so the same file can be re-selected
      e.target.value = ""
    },
    [onFiles]
  )

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      className={`group relative rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300 ${className}`}
    >
      {/* Icon container with gradient accent */}
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 bg-red-3 border border-red-8 shadow-xl shadow-red border-dotted cursor-pointer hover:scale-110`}
      >
        <UploadIcon className="w-7 h-7 transition-all duration-300 text-red-10" />
      </div>

      {/* Hidden file input - triggered via outer div click handler */}
      <input
        id="file"
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
      />

      {/* Text */}
      <div className="text-center">
        <p className="text-slate-12 text-sm font-medium">
          {isDragOver ? "Release to upload" : label}
        </p>
        <p className="text-slate-10 text-xs mt-1.5">
          {multiple ? "Supports multiple PDF files" : "Supports PDF files only"}
        </p>
      </div>
    </div>
  )
}
