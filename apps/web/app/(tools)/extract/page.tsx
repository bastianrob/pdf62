"use client"

import { usePDFWorker } from "@/hooks/usePDFWorker"
import { trackToolExecution } from "@/lib/analytics"
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DownloadIcon,
  ReaderIcon,
  ReloadIcon,
} from "@radix-ui/react-icons"
import { Dropzone } from "@pdf62/ui/components/Dropzone"
import { FileCard } from "@pdf62/ui/components/FileCard"
import { ToolHeader } from "@pdf62/ui/components/ToolHeader"
import { useCallback, useState } from "react"

export default function ExtractPage() {
  const { process } = usePDFWorker()
  const [file, setFile] = useState<File | null>(null)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [totalPageCount, setTotalPageCount] = useState<number | null>(null)
  const [isReadingPageCount, setIsReadingPageCount] = useState(false)

  const handleFiles = async (files: File[]) => {
    const selected = files[0]
    setFile(selected)
    setStatus("idle")
    setError("")
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setDownloadUrl(null)
    setTotalPageCount(null)

    setIsReadingPageCount(true)
    try {
      const buffer = await selected.arrayBuffer()
      const uint8 = new Uint8Array(buffer)
      const count = await process("getPageCount", { file: uint8 }) as number
      setTotalPageCount(count)
      setEndPage(count) // Pre-fill end page
    } catch (e: any) {
      console.error("Failed to read page count:", e)
    } finally {
      setIsReadingPageCount(false)
    }
  }

  const handleReset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setFile(null)
    setStatus("idle")
    setError("")
    setDownloadUrl(null)
    setStartPage(1)
    setEndPage(1)
    setTotalPageCount(null)
  }

  const handleReprocess = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setDownloadUrl(null)
    setStatus("idle")
  }

  const handleDownload = useCallback(() => {
    if (!downloadUrl || !file) return
    const a = document.createElement("a")
    a.href = downloadUrl
    a.download = `extracted_${file.name}`
    a.click()
  }, [downloadUrl, file])

  const handleExtract = async () => {
    if (!file) return
    setStatus("processing")

    try {
      const buffer = await file.arrayBuffer()
      const uint8 = new Uint8Array(buffer)
      const result = await process("extract", { file: uint8, startPage, endPage }) as Uint8Array

      const blob = new Blob([new Uint8Array(result)], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

      trackToolExecution("extract", {
        fileSizeBytes: file.size,
        pageCount: endPage - startPage + 1,
        success: true,
      })

      setStatus("done")
    } catch (e: any) {
      trackToolExecution("extract", {
        fileSizeBytes: file.size,
        pageCount: endPage - startPage + 1,
        success: false,
        error: e.message,
      })
      setError(e.message)
      setStatus("error")
    }
  }

  const pageCount = startPage <= endPage ? endPage - startPage + 1 : 0
  const isValid = startPage >= 1 && endPage >= 1 && startPage <= endPage && (totalPageCount ? endPage <= totalPageCount : true)

  return (
    <div className="flex flex-col m-4 lg:m-8">
      {/* Main workspace */}
      {!file ? (
        <div className={`flex flex-col gap-8 py-8 ${!file ? "rounded-2xl border-2 border-dashed border-slate-6 bg-slate-2 hover:bg-slate-3" : ""
          }`}>
          <ToolHeader
            title="Extract Pages"
            description="Pull a targeted page range into a new PDF document."
            icon={<ReaderIcon className="w-8 h-8 text-white" />}
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
                <ReaderIcon className="w-8 h-8 text-red-9" />
              </div>
              <h2 className="text-lg font-semibold text-slate-12 mb-2">Extracting pages...</h2>
              <p className="text-sm text-slate-10">Pulling pages {startPage}–{endPage} into a new document.</p>
              <div className="mt-6 mx-auto max-w-xs h-1.5 bg-slate-4 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-red-9 to-red-11 rounded-full animate-progress-indeterminate" />
              </div>
            </div>
          )}

          {/* Done state */}
          {status === "done" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl overflow-hidden animate-scale-in">
              <div className="bg-gradient-to-r from-green-3 to-green-4 border-b border-green-6 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-9/15">
                    <CheckCircledIcon className="w-5 h-5 text-green-11" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-12">Extraction complete!</p>
                    <p className="text-xs text-green-11">
                      {pageCount} page{pageCount !== 1 ? "s" : ""} extracted and ready to download.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Page range</p>
                    <p className="text-lg font-bold text-slate-12 tabular-nums">{startPage} – {endPage}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Pages extracted</p>
                    <p className="text-lg font-bold text-red-11 tabular-nums">{pageCount}</p>
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
                    title="Extract different pages"
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
                    <p className="text-sm font-semibold text-red-11">Extraction failed</p>
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

          {/* Idle state */}
          {status === "idle" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 space-y-5">
                <FileCard file={file} onRemove={handleReset} />

                {/* Page range panel */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-10 uppercase tracking-wider">
                    <div className="h-px flex-1 bg-slate-6" />
                    <span>Page range {totalPageCount ? `(Total: ${totalPageCount})` : ''}</span>
                    <div className="h-px flex-1 bg-slate-6" />
                  </div>

                  <div className="bg-slate-3 rounded-xl p-5 border border-slate-6">
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-10 mb-2">From page</label>
                        <input
                          type="number"
                          min={1}
                          value={startPage}
                          onChange={e => setStartPage(Math.max(1, Number(e.target.value)))}
                          className="w-full px-4 py-2.5 bg-slate-1 border border-slate-6 rounded-lg text-slate-12 text-base font-semibold text-center tabular-nums focus:outline-none focus:ring-2 focus:ring-red-8 transition-shadow"
                        />
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 mb-0.5">
                        <span className="text-slate-8 text-lg">→</span>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-10 mb-2">To page</label>
                        <input
                          type="number"
                          min={1}
                          value={endPage}
                          onChange={e => setEndPage(Math.max(1, Number(e.target.value)))}
                          className="w-full px-4 py-2.5 bg-slate-1 border border-slate-6 rounded-lg text-slate-12 text-base font-semibold text-center tabular-nums focus:outline-none focus:ring-2 focus:ring-red-8 transition-shadow"
                        />
                      </div>
                    </div>
                    {isValid ? (
                      <p className="text-xs text-slate-10 mt-3 text-center">
                        <span className="font-semibold text-slate-12">{pageCount}</span> page{pageCount !== 1 ? "s" : ""} will be extracted
                      </p>
                    ) : (
                      <p className="text-xs text-red-10 mt-3 text-center">
                        Start page must be ≤ end page
                      </p>
                    )}
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={handleExtract}
                  disabled={!isValid}
                  className="w-full py-3.5 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2"
                >
                  Extract {isValid ? `${pageCount} page${pageCount !== 1 ? "s" : ""}` : "Pages"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
