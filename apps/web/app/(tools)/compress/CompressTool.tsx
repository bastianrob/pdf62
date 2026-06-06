"use client"

import { usePDFWorker } from "@/hooks/usePDFWorker"
import { trackToolExecution } from "@/lib/analytics"
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DownloadIcon,
  ReloadIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons"
import { Dropzone } from "@pdf62/ui/components/Dropzone"
import { FileCard } from "@pdf62/ui/components/FileCard"
import { Slider } from "@pdf62/ui/components/Slider"
import { ToolHeader } from "@pdf62/ui/components/ToolHeader"
import { useCallback, useState } from "react"

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function CompressTool() {
  const { process } = usePDFWorker()
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(85)
  const [scale, setScale] = useState(100)
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const [resultSize, setResultSize] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    setFile(files[0])
    setStatus("idle")
    setError("")
    setResultSize(0)
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(null)
    }
  }

  const handleReset = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(null)
    }
    setFile(null)
    setStatus("idle")
    setError("")
    setResultSize(0)
    setQuality(85)
    setScale(100)
  }

  const handleReprocess = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setDownloadUrl(null)
    setResultSize(0)
    setStatus("idle")
  }

  const handleDownload = useCallback(() => {
    if (!downloadUrl || !file) return
    const a = document.createElement("a")
    a.href = downloadUrl
    a.download = `compressed_${file.name}`
    a.click()
  }, [downloadUrl, file])

  const handleCompress = async () => {
    if (!file) return
    setStatus("processing")

    try {
      const buffer = await file.arrayBuffer()
      const uint8 = new Uint8Array(buffer)
      const result = await process("compress", { file: uint8, quality, scale }) as Uint8Array

      const outputBytes = new Uint8Array(result)
      setResultSize(outputBytes.byteLength)

      const blob = new Blob([outputBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

      trackToolExecution("compress", {
        fileSizeBytes: file.size,
        quality,
        scale,
        success: true,
      })

      setStatus("done")
    } catch (e: any) {
      trackToolExecution("compress", {
        fileSizeBytes: file.size,
        quality,
        scale,
        success: false,
        error: e.message,
      })
      setError(e.message)
      setStatus("error")
    }
  }

  const qualityLevel = quality <= 30 ? "Maximum" : quality <= 60 ? "High" : quality <= 85 ? "Balanced" : "Lossless"
  const scaleLabel = scale <= 25 ? "Aggressive" : scale <= 50 ? "High" : scale <= 75 ? "Moderate" : "Original"

  const savings = file && resultSize > 0 ? Math.max(0, Math.round((1 - resultSize / file.size) * 100)) : 0

  return (
    <div className="flex flex-col m-4 lg:m-8">
      {/* Main workspace */}
      {!file ? (
        <div className={`flex flex-col gap-8 py-8 ${!file ? "rounded-2xl border-2 border-dashed border-slate-6 bg-slate-2 hover:bg-slate-3" : ""
          }`}>
          <ToolHeader
            title="Compress PDF"
            description="Optimize structure and downsample images for aggressive size reduction."
            icon={<ValueNoneIcon className="w-8 h-8 text-white" />}
          />

          <Dropzone
            onFiles={handleFiles}
            label="Drop PDF here or click to browse file"
          />
        </div>
      ) : (
        <>
          {/* Processing state */}
          {status === "processing" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl p-10 text-center animate-scale-in">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-slate-6" />
                <div className="absolute inset-0 rounded-full border-2 border-red-9 border-t-transparent animate-spin-slow" />
                <ValueNoneIcon className="w-8 h-8 text-red-9" />
              </div>
              <h2 className="text-lg font-semibold text-slate-12 mb-2">Compressing your PDF...</h2>
              <p className="text-sm text-slate-10">Optimizing structure and downsampling images locally.</p>
              <div className="mt-6 mx-auto max-w-xs h-1.5 bg-slate-4 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-red-9 to-red-11 rounded-full animate-progress-indeterminate" />
              </div>
            </div>
          )}

          {/* Done state */}
          {status === "done" && file && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl overflow-hidden animate-scale-in">
              <div className="bg-gradient-to-r from-green-3 to-green-4 border-b border-green-6 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-9/15">
                    <CheckCircledIcon className="w-5 h-5 text-green-11" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-12">Compression complete!</p>
                    <p className="text-xs text-green-11">Your optimized PDF is ready to download.</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Original</p>
                    <p className="text-lg font-bold text-slate-12 tabular-nums">{formatBytes(file.size)}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Compressed</p>
                    <p className="text-lg font-bold text-green-11 tabular-nums">{formatBytes(resultSize)}</p>
                  </div>
                  <div className="text-center p-4 bg-red-3/40 rounded-xl border border-red-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Saved</p>
                    <p className="text-lg font-bold text-red-11 tabular-nums">{savings}%</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-3 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={handleReprocess}
                    className="py-3 px-4 bg-slate-4 text-slate-12 rounded-xl text-sm font-semibold hover:bg-slate-5 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <ReloadIcon className="w-4 h-4" />
                    Reprocess
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl overflow-hidden animate-scale-in">
              <div className="bg-red-3/60 border-b border-red-6 px-6 py-4">
                <div className="flex items-center gap-3">
                  <CrossCircledIcon className="w-5 h-5 text-red-9 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-11">Compression failed</p>
                    <p className="text-xs text-red-10">{error}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-slate-4 text-slate-12 rounded-xl text-sm font-semibold hover:bg-slate-5 active:scale-[0.98] transition-all duration-150"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Idle state — configure */}
          {status === "idle" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 space-y-5">
                <FileCard file={file} onRemove={handleReset} />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-10 uppercase tracking-wider">
                    <div className="h-px flex-1 bg-slate-6" />
                    <span>Compression settings</span>
                    <div className="h-px flex-1 bg-slate-6" />
                  </div>

                  <Slider
                    label="JPEG quality"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={setQuality}
                    subLabel={qualityLevel}
                    minDescription="Smaller file"
                    maxDescription="Higher fidelity"
                  />

                  <Slider
                    label="Image scale"
                    min={10}
                    max={100}
                    value={scale}
                    onChange={setScale}
                    subLabel={scaleLabel}
                    valueSuffix="%"
                    minDescription="Downsample aggressively"
                    maxDescription="Keep original"
                  />
                </div>

                <button
                  onClick={handleCompress}
                  className="w-full py-3.5 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2"
                >
                  Compress PDF
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
