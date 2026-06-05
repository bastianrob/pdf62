import { useRef, useCallback } from "react"

export function usePDFWorker() {
  const workerRef = useRef<Worker | null>(null)

  const process = useCallback((action: string, payload: object) => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current && typeof window !== "undefined") {
        workerRef.current = new Worker("/pdf.worker.js")
      }

      const id = crypto.randomUUID()
      const handler = (e: MessageEvent) => {
        if (e.data.id !== id) return
        workerRef.current?.removeEventListener("message", handler)
        if (e.data.error) reject(new Error(e.data.error))
        else resolve(e.data.result)
      }
      workerRef.current?.addEventListener("message", handler)
      workerRef.current?.postMessage({ id, action, payload })
    })
  }, [])

  return { process }
}
