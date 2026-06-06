"use client"

import { usePDFWorker } from "@/hooks/usePDFWorker"
import { trackToolExecution } from "@/lib/analytics"
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DownloadIcon,
  ReloadIcon,
  ScissorsIcon,
} from "@radix-ui/react-icons"
import { Dropzone } from "@pdf62/ui/components/Dropzone"
import { FileCard } from "@pdf62/ui/components/FileCard"
import { ToolHeader } from "@pdf62/ui/components/ToolHeader"
import { useCallback, useState } from "react"

export default function SplitTool() {
  const { process } = usePDFWorker()
  const [file, setFile] = useState<File | null>(null)
  const [chunkSize, setChunkSize] = useState(1)
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const [resultCount, setResultCount] = useState(0)
  const [downloadUrls, setDownloadUrls] = useState<{ url: string; name: string }[]>([])

  const handleFiles = (files: File[]) => {
    setFile(files[0])
    setStatus("idle")
    setError("")
    setResultCount(0)
    revokeUrls()
  }

  const revokeUrls = () => {
    downloadUrls.forEach(({ url }) => URL.revokeObjectURL(url))
    setDownloadUrls([])
  }

  const handleReset = () => {
    revokeUrls()
    setFile(null)
    setStatus("idle")
    setError("")
    setResultCount(0)
    setChunkSize(1)
  }

  const handleReprocess = () => {
    revokeUrls()
    setResultCount(0)
    setStatus("idle")
  }

  const handleDownloadAll = useCallback(() => {
    downloadUrls.forEach(({ url, name }) => {
      const a = document.createElement("a")
      a.href = url
      a.download = name
      a.click()
    })
  }, [downloadUrls])

  const handleSplit = async () => {
    if (!file) return
    setStatus("processing")

    try {
      const buffer = await file.arrayBuffer()
      const uint8 = new Uint8Array(buffer)
      const result = await process("split", { file: uint8, pagesPerChunk: chunkSize }) as Uint8Array[]

      setResultCount(result.length)

      const urls = result.map((chunk, i) => {
        const blob = new Blob([new Uint8Array(chunk)], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)
        const name = `${file.name.replace(/\.pdf$/i, "")}_part${i + 1}.pdf`
        return { url, name }
      })
      setDownloadUrls(urls)

      trackToolExecution("split", {
        fileSizeBytes: file.size,
        pageCount: chunkSize,
        success: true,
      })

      setStatus("done")
    } catch (e: any) {
      trackToolExecution("split", {
        fileSizeBytes: file.size,
        pageCount: chunkSize,
        success: false,
        error: e.message,
      })
      setError(e.message)
      setStatus("error")
    }
  }

  const presets = [1, 5, 10, 25, 50]

  return (
    <div className="flex flex-col m-4 lg:m-8">
      {!file ? (
        <div className={`flex flex-col gap-8 py-8 ${!file ? "rounded-2xl border-2 border-dashed border-slate-6 bg-slate-2 hover:bg-slate-3" : ""
          }`}>
          <ToolHeader
            title="Split PDF"
            description="Divide a large PDF into smaller chunks by page count."
            icon={<ScissorsIcon className="w-8 h-8 text-white" />}
          />

          <Dropzone
            onFiles={handleFiles}
            label="Drop PDF here or click to browse file"
          />
        </div>
      ) : (
        <>
          {status === "processing" && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl p-10 text-center animate-scale-in">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-slate-6" />
                <div className="absolute inset-0 rounded-full border-2 border-red-9 border-t-transparent animate-spin-slow" />
                <ScissorsIcon className="w-8 h-8 text-red-9" />
              </div>
              <h2 className="text-lg font-semibold text-slate-12 mb-2">Splitting your PDF...</h2>
              <p className="text-sm text-slate-10">Creating chunks of {chunkSize} page{chunkSize !== 1 ? "s" : ""} each.</p>
              <div className="mt-6 mx-auto max-w-xs h-1.5 bg-slate-4 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-red-9 to-red-11 rounded-full animate-progress-indeterminate" />
              </div>
            </div>
          )}

          {status === "done" && file && (
            <div className="bg-slate-2 border border-slate-6 rounded-2xl overflow-hidden animate-scale-in">
              <div className="bg-gradient-to-r from-green-3 to-green-4 border-b border-green-6 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-9/15">
                    <CheckCircledIcon className="w-5 h-5 text-green-11" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-12">Split complete!</p>
                    <p className="text-xs text-green-11">{resultCount} file{resultCount !== 1 ? "s" : ""} ready to download.</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Source</p>
                    <p className="text-sm font-bold text-slate-12 truncate">{file.name}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-3 rounded-xl border border-slate-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Pages/chunk</p>
                    <p className="text-lg font-bold text-slate-12 tabular-nums">{chunkSize}</p>
                  </div>
                  <div className="text-center p-4 bg-red-3/40 rounded-xl border border-red-6">
                    <p className="text-xs text-slate-10 uppercase tracking-wider mb-1">Parts created</p>
                    <p className="text-lg font-bold text-red-11 tabular-nums">{resultCount}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadAll}
                    className="flex-1 py-3 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download All ({resultCount})
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
                    <p className="text-sm font-semibold text-red-11">Split failed</p>
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
                <FileCard file={file} onRemove={handleReset} />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-10 uppercase tracking-wider">
                    <div className="h-px flex-1 bg-slate-6" />
                    <span>Split settings</span>
                    <div className="h-px flex-1 bg-slate-6" />
                  </div>

                  <div className="bg-slate-3 rounded-xl p-5 border border-slate-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-slate-11">Pages per chunk</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-4 text-sm font-bold text-slate-12 tabular-nums">{chunkSize}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => setChunkSize(Math.max(1, chunkSize - 1))}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-4 text-slate-11 hover:bg-slate-5 hover:text-slate-12 active:scale-95 transition-all text-lg font-medium"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={chunkSize}
                        onChange={e => setChunkSize(Math.max(1, Math.min(500, Number(e.target.value))))}
                        className="flex-1 px-4 py-2.5 bg-slate-1 border border-slate-6 rounded-lg text-slate-12 text-base font-semibold text-center tabular-nums focus:outline-none focus:ring-2 focus:ring-red-8 transition-shadow"
                      />
                      <button
                        onClick={() => setChunkSize(Math.min(500, chunkSize + 1))}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-4 text-slate-11 hover:bg-slate-5 hover:text-slate-12 active:scale-95 transition-all text-lg font-medium"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-9 mr-1">Quick:</span>
                      {presets.map(p => (
                        <button
                          key={p}
                          onClick={() => setChunkSize(p)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${chunkSize === p
                              ? "bg-red-9 text-white shadow-sm"
                              : "bg-slate-4 text-slate-11 hover:bg-slate-5 hover:text-slate-12"
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSplit}
                  className="w-full py-3.5 bg-gradient-to-r from-red-9 to-red-10 text-white rounded-xl text-sm font-semibold hover:from-red-10 hover:to-red-11 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-red-9/25 flex items-center justify-center gap-2"
                >
                  Split PDF
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
