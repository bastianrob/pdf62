"use client"

import { trackToolExecution } from "@/lib/analytics"
import {
  loadPdf,
  renderPage,
  type ImageFormat,
  type LoadedPdf,
} from "@/lib/processing/pdfRasterizer"
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DownloadIcon,
  ImageIcon,
  ReloadIcon,
} from "@radix-ui/react-icons"
import { Dropzone } from "@pdf62/ui/components/Dropzone"
import { FileCard } from "@pdf62/ui/components/FileCard"
import { Slider } from "@pdf62/ui/components/Slider"
import { ToolHeader } from "@pdf62/ui/components/ToolHeader"
import { useCallback, useEffect, useRef, useState } from "react"

interface ResultImage {
  url: string
  name: string
  page: number
  width: number
  height: number
  size: number
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ConvertTool() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [format, setFormat] = useState<ImageFormat>("png")
  const [dpi, setDpi] = useState(150)
  const [quality, setQuality] = useState(80)
  const [rangeMode, setRangeMode] = useState<"all" | "custom">("all")
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [results, setResults] = useState<ResultImage[]>([])

  const docRef = useRef<LoadedPdf | null>(null)

  const revokeResults = useCallback(() => {
    setResults((prev) => {
      prev.forEach((r) => URL.revokeObjectURL(r.url))
      return []
    })
  }, [])

  const destroyDoc = useCallback(() => {
    docRef.current?.destroy().catch(() => {})
    docRef.current = null
  }, [])

  // Clean up object URLs and the pdf.js document on unmount.
  useEffect(() => {
    return () => {
      revokeResults()
      destroyDoc()
    }
  }, [revokeResults, destroyDoc])

  const handleFiles = async (files: File[]) => {
    const next = files[0]
    revokeResults()
    destroyDoc()
    setFile(next)
    setStatus("idle")
    setError("")
    setProgress({ done: 0, total: 0 })
    setPageCount(0)

    try {
      const loaded = await loadPdf(await next.arrayBuffer())
      docRef.current = loaded
      setPageCount(loaded.numPages)
      setStartPage(1)
      setEndPage(loaded.numPages)
    } catch {
      setError("Could not read this PDF. It may be corrupted or password-protected.")
      setStatus("error")
    }
  }

  const handleReset = () => {
    revokeResults()
    destroyDoc()
    setFile(null)
    setPageCount(0)
    setStatus("idle")
    setError("")
    setProgress({ done: 0, total: 0 })
    setFormat("png")
    setDpi(150)
    setQuality(80)
    setRangeMode("all")
  }

  const handleReprocess = () => {
    revokeResults()
    setProgress({ done: 0, total: 0 })
    setStatus("idle")
  }

  const handleDownload = useCallback((r: ResultImage) => {
    const a = document.createElement("a")
    a.href = r.url
    a.download = r.name
    a.click()
  }, [])

  const handleDownloadAll = useCallback(() => {
    results.forEach((r) => {
      const a = document.createElement("a")
      a.href = r.url
      a.download = r.name
      a.click()
    })
  }, [results])

  const selectedPages = (): number[] => {
    if (rangeMode === "all") {
      return Array.from({ length: pageCount }, (_, i) => i + 1)
    }
    const from = Math.max(1, Math.min(startPage, endPage))
    const to = Math.min(pageCount, Math.max(startPage, endPage))
    const pages: number[] = []
    for (let p = from; p <= to; p++) pages.push(p)
    return pages
  }

  const handleConvert = async () => {
    const loaded = docRef.current
    if (!file || !loaded) return

    const pages = selectedPages()
    if (pages.length === 0) return

    revokeResults()
    setStatus("processing")
    setProgress({ done: 0, total: pages.length })

    const ext = format === "png" ? "png" : "jpg"
    const baseName = file.name.replace(/\.pdf$/i, "")
    const collected: ResultImage[] = []

    try {
      // Render sequentially: peak memory stays at roughly one rasterized page.
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const { blob, width, height } = await renderPage(loaded.doc, page, { dpi, format, quality })
        collected.push({
          url: URL.createObjectURL(blob),
          name: `${baseName}_page${page}.${ext}`,
          page,
          width,
          height,
          size: blob.size,
        })
        setProgress({ done: i + 1, total: pages.length })
      }

      setResults(collected)
      trackToolExecution("convert", {
        fileSizeBytes: file.size,
        pageCount: pages.length,
        success: true,
      })
      setStatus("done")
    } catch (e: any) {
      collected.forEach((r) => URL.revokeObjectURL(r.url))
      trackToolExecution("convert", {
        fileSizeBytes: file.size,
        pageCount: pages.length,
        success: false,
        error: e?.message,
      })
      setError(e?.message ?? "Conversion failed")
      setStatus("error")
    }
  }

  const dpiLabel = dpi <= 96 ? "Screen" : dpi <= 150 ? "Standard" : dpi <= 220 ? "High" : "Print"

  return (
    <div className="flex flex-col m-4 lg:m-8">
      {!file ? (
        <div className="flex flex-col gap-8 py-8 rounded-2xl border-2 border-dashed border-slate-6 bg-slate-2 hover:bg-slate-3">
          <ToolHeader
            title="PDF to Image"
            description="Convert PDF pages into crisp PNG or JPEG images — rendered locally in your browser."
            icon={<ImageIcon className="w-8 h-8 text-white" />}
          />

          <Dropzone onFiles={handleFiles} label="Drop PDF here or click to browse file" />
        </div>
      ) : (
        <>
          {/* Processing state */}
          {status === "processing" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl p-10 text-center animate-scale-in">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-slate-6" />
                <div className="absolute inset-0 rounded-full border-2 border-red-9 border-t-transparent animate-spin-slow" />
                <ImageIcon className="w-8 h-8 text-red-9" />
              </div>
              <h2 className="text-lg font-semibold text-slate-12 mb-2">Rendering your pages...</h2>
              <p className="text-sm text-slate-10">
                Page {progress.done} of {progress.total} — everything stays on your device.
              </p>
              <div className="mt-6 mx-auto max-w-xs h-1.5 bg-slate-4 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-9 to-red-11 rounded-full transition-all duration-200"
                  style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
                />
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
                    <p className="text-sm font-semibold text-green-12">Conversion complete!</p>
                    <p className="text-xs text-green-11">
                      {results.length} image{results.length !== 1 ? "s" : ""} ready to download.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={handleDownloadAll}
                    className="flex-1 py-3 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download All ({results.length})
                  </button>
                  <button
                    onClick={handleReprocess}
                    className="py-3 px-4 bg-slate-4 text-slate-12 rounded-xl text-sm font-semibold hover:bg-slate-5 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <ReloadIcon className="w-4 h-4" />
                    Reprocess
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {results.map((r) => (
                    <button
                      key={r.page}
                      onClick={() => handleDownload(r)}
                      className="group text-left bg-slate-3 border border-slate-6 rounded-xl overflow-hidden hover:border-red-7 transition-all"
                    >
                      <div className="aspect-[3/4] bg-white overflow-hidden flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.url}
                          alt={`Page ${r.page}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-12">Page {r.page}</p>
                          <p className="text-[11px] text-slate-10 tabular-nums">
                            {r.width}×{r.height} · {formatBytes(r.size)}
                          </p>
                        </div>
                        <DownloadIcon className="w-4 h-4 text-slate-9 group-hover:text-red-9 transition-colors shrink-0" />
                      </div>
                    </button>
                  ))}
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
                    <p className="text-sm font-semibold text-red-11">Conversion failed</p>
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
                    <span>Image settings</span>
                    <div className="h-px flex-1 bg-slate-6" />
                  </div>

                  {/* Format toggle */}
                  <div className="bg-slate-3 rounded-xl p-4 border border-slate-6">
                    <span className="text-sm font-medium text-slate-11">Output format</span>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {(["png", "jpeg"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFormat(f)}
                          className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            format === f
                              ? "bg-red-9 text-white shadow-sm"
                              : "bg-slate-4 text-slate-11 hover:bg-slate-5 hover:text-slate-12"
                          }`}
                        >
                          {f === "png" ? "PNG" : "JPEG"}
                          <span className="block text-[11px] font-normal opacity-80">
                            {f === "png" ? "Lossless · larger" : "Smaller · photos"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider
                    label="Resolution"
                    min={72}
                    max={300}
                    step={6}
                    value={dpi}
                    onChange={setDpi}
                    subLabel={dpiLabel}
                    valueSuffix=" DPI"
                    minDescription="Smaller files"
                    maxDescription="Sharper / print"
                  />

                  {format === "jpeg" && (
                    <Slider
                      label="JPEG quality"
                      min={10}
                      max={100}
                      value={quality}
                      onChange={setQuality}
                      valueSuffix="%"
                      minDescription="Smaller file"
                      maxDescription="Higher fidelity"
                    />
                  )}

                  {/* Page range */}
                  <div className="bg-slate-3 rounded-xl p-4 border border-slate-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-11">Pages</span>
                      <span className="text-xs text-slate-10 tabular-nums">
                        {pageCount} page{pageCount !== 1 ? "s" : ""} total
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {(["all", "custom"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setRangeMode(m)}
                          className={`py-2 rounded-lg text-sm font-semibold transition-all ${
                            rangeMode === m
                              ? "bg-red-9 text-white shadow-sm"
                              : "bg-slate-4 text-slate-11 hover:bg-slate-5 hover:text-slate-12"
                          }`}
                        >
                          {m === "all" ? "All pages" : "Page range"}
                        </button>
                      ))}
                    </div>
                    {rangeMode === "custom" && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={pageCount}
                          value={startPage}
                          onChange={(e) =>
                            setStartPage(Math.max(1, Math.min(pageCount, Number(e.target.value))))
                          }
                          className="flex-1 px-3 py-2 bg-slate-1 border border-slate-6 rounded-lg text-slate-12 text-sm font-semibold text-center tabular-nums focus:outline-none focus:ring-2 focus:ring-red-8"
                          aria-label="First page"
                        />
                        <span className="text-slate-9 text-sm">to</span>
                        <input
                          type="number"
                          min={1}
                          max={pageCount}
                          value={endPage}
                          onChange={(e) =>
                            setEndPage(Math.max(1, Math.min(pageCount, Number(e.target.value))))
                          }
                          className="flex-1 px-3 py-2 bg-slate-1 border border-slate-6 rounded-lg text-slate-12 text-sm font-semibold text-center tabular-nums focus:outline-none focus:ring-2 focus:ring-red-8"
                          aria-label="Last page"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleConvert}
                  disabled={pageCount === 0}
                  className="w-full py-3.5 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pageCount === 0 ? "Reading PDF..." : "Convert to Images"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
