"use client"

import { usePDFWorker } from "@/hooks/usePDFWorker"
import { trackToolExecution } from "@/lib/analytics"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  DownloadIcon,
  LayersIcon,
  ReloadIcon,
} from "@radix-ui/react-icons"
import { Dropzone } from "@pdf62/ui/components/Dropzone"
import { FileCard } from "@pdf62/ui/components/FileCard"
import { ToolHeader } from "@pdf62/ui/components/ToolHeader"
import { useCallback, useState } from "react"

export default function MergeTool() {
  const { process } = usePDFWorker()
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleFiles = (incoming: File[]) => {
    setFiles(prev => [...prev, ...incoming])
    setStatus("idle")
    setError("")
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(null)
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setStatus("idle")
    setError("")
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(null)
    }
  }

  const moveFileUp = (index: number) => {
    if (index === 0) return
    setFiles(prev => {
      const newFiles = [...prev]
      const temp = newFiles[index - 1]
      newFiles[index - 1] = newFiles[index]
      newFiles[index] = temp
      return newFiles
    })
  }

  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return
    setFiles(prev => {
      const newFiles = [...prev]
      const temp = newFiles[index + 1]
      newFiles[index + 1] = newFiles[index]
      newFiles[index] = temp
      return newFiles
    })
  }

  const handleReset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setFiles([])
    setStatus("idle")
    setError("")
    setDownloadUrl(null)
  }

  const handleReprocess = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setDownloadUrl(null)
    setStatus("idle")
  }

  const handleDownload = useCallback(() => {
    if (!downloadUrl) return
    const a = document.createElement("a")
    a.href = downloadUrl
    a.download = "merged.pdf"
    a.click()
  }, [downloadUrl])

  const handleMerge = async () => {
    if (files.length < 2) return
    setStatus("processing")

    const totalSize = files.reduce((acc, f) => acc + f.size, 0)

    try {
      const fileArrays = await Promise.all(
        files.map(async (f) => {
          const buffer = await f.arrayBuffer()
          return new Uint8Array(buffer)
        })
      )

      const result = await process("merge", { files: fileArrays }) as Uint8Array

      const blob = new Blob([new Uint8Array(result)], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

      trackToolExecution("merge", {
        fileSizeBytes: totalSize,
        pageCount: files.length,
        success: true,
      })

      setStatus("done")
    } catch (e: any) {
      trackToolExecution("merge", {
        fileSizeBytes: totalSize,
        pageCount: files.length,
        success: false,
        error: e.message,
      })
      setError(e.message)
      setStatus("error")
    }
  }

  return (
    <div className="flex flex-col m-4 lg:m-8">
      {files.length === 0 ? (
        <div className={`flex flex-col gap-8 py-8 ${files.length === 0 ? "rounded-2xl border-2 border-dashed border-slate-6 bg-slate-2 hover:bg-slate-3" : ""
          }`}>
          <ToolHeader
            title="Merge PDFs"
            description="Combine multiple PDF files into a single unified document."
            icon={<LayersIcon className="w-8 h-8 text-white" />}
          />

          <Dropzone
            onFiles={handleFiles}
            multiple
            label="Drop PDFs here or click to browse files"
          />
        </div>
      ) : (
        <>
          {status === "processing" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl p-10 text-center animate-scale-in">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-slate-6" />
                <div className="absolute inset-0 rounded-full border-2 border-red-9 border-t-transparent animate-spin-slow" />
                <LayersIcon className="w-8 h-8 text-red-9" />
              </div>
              <h2 className="text-lg font-semibold text-slate-12 mb-2">Merging {files.length} PDFs...</h2>
              <p className="text-sm text-slate-10">Combining your documents into a single file.</p>
              <div className="mt-6 mx-auto max-w-xs h-1.5 bg-slate-4 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-red-9 to-red-11 rounded-full animate-progress-indeterminate" />
              </div>
            </div>
          )}

          {status === "done" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl overflow-hidden animate-scale-in">
              <div className="bg-gradient-to-r from-green-3 to-green-4 border-b border-green-6 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-9/15">
                    <CheckCircledIcon className="w-5 h-5 text-green-11" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-12">Merge complete!</p>
                    <p className="text-xs text-green-11">{files.length} files combined and ready to download.</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Files merged</p>
                    <p className="text-lg font-bold text-slate-12 tabular-nums">{files.length}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Output</p>
                    <p className="text-lg font-bold text-red-11">merged.pdf</p>
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

          {status === "error" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl overflow-hidden animate-scale-in">
              <div className="bg-red-3/60 border-b border-red-6 px-6 py-4">
                <div className="flex items-center gap-3">
                  <CrossCircledIcon className="w-5 h-5 text-red-9 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-11">Merge failed</p>
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

          {status === "idle" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 space-y-5">
                <Dropzone
                  onFiles={handleFiles}
                  multiple
                  label="Drop more PDFs to add"
                  className="py-5"
                />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-10 uppercase tracking-wider">
                    <div className="h-px flex-1 bg-slate-6" />
                    <span>{files.length} file{files.length !== 1 ? "s" : ""} in queue</span>
                    <div className="h-px flex-1 bg-slate-6" />
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {files.map((f, i) => (
                      <div key={`${f.name}-${f.lastModified}-${i}`} className="flex items-center gap-2">
                        <div className="flex flex-col bg-slate-3 rounded-lg border border-slate-6 overflow-hidden">
                          <button
                            onClick={() => moveFileUp(i)}
                            disabled={i === 0}
                            className="p-1 text-slate-10 hover:text-slate-12 hover:bg-slate-4 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          >
                            <ArrowUpIcon className="w-4 h-4" />
                          </button>
                          <div className="h-px bg-slate-6" />
                          <button
                            onClick={() => moveFileDown(i)}
                            disabled={i === files.length - 1}
                            className="p-1 text-slate-10 hover:text-slate-12 hover:bg-slate-4 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          >
                            <ArrowDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <FileCard file={f} onRemove={() => removeFile(i)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleMerge}
                  disabled={files.length < 2}
                  className="w-full py-3.5 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2"
                >
                  {files.length < 2
                    ? "Add at least 2 PDFs"
                    : `Merge ${files.length} PDFs`}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
