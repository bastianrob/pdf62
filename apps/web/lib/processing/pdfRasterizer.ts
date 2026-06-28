// Lazily-loaded pdf.js rasterizer. Renders PDF pages to PNG/JPEG blobs entirely
// in the browser — the file never leaves the device. Imported only by the Convert
// tool and dynamically `import()`-ed, so pdf.js stays out of every other bundle.

type Pdfjs = typeof import("pdfjs-dist")
export type PdfDocument = Awaited<ReturnType<Pdfjs["getDocument"]>["promise"]>

let pdfjsPromise: Promise<Pdfjs> | null = null

function getPdfjs(): Promise<Pdfjs> {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((pdfjs) => {
      // Self-hosted worker (copied into /public by `prep:pdfjs`). Must be
      // same-origin to satisfy the site CSP and to keep processing fully local —
      // never point this at a CDN.
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs.worker.min.mjs"
      return pdfjs
    })
  }
  return pdfjsPromise
}

export type ImageFormat = "png" | "jpeg"

export interface RasterPage {
  blob: Blob
  width: number
  height: number
}

export interface LoadedPdf {
  doc: PdfDocument
  numPages: number
  // Aborts the worker and frees the document. Safe to call more than once.
  destroy: () => Promise<void>
}

// Browsers cap canvas dimensions/area; keep the long edge under this so oversized
// pages at high DPI don't silently render blank.
const MAX_EDGE_PX = 8000

export async function loadPdf(data: ArrayBuffer): Promise<LoadedPdf> {
  const pdfjs = await getPdfjs()
  // pdf.js v6 no longer uses eval, so it runs under the site CSP without
  // 'unsafe-eval'. The byte array is handed off to the worker for parsing.
  //
  // The *Url options point at support assets self-hosted under /public/pdfjs
  // (copied by `prep:pdfjs`). They're fetched on demand and same-origin, so they
  // satisfy the CSP `connect-src 'self'` and keep everything local:
  //   - standard_fonts: render the base-14 fonts when a PDF doesn't embed them
  //   - cmaps:          CJK / custom character encodings
  //   - wasm:           JBIG2 / JPEG2000 image decoders (common in scanned PDFs)
  //   - iccs:           ICC colour profiles for accurate colour
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(data),
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
    wasmUrl: "/pdfjs/wasm/",
    iccUrl: "/pdfjs/iccs/",
  })
  const doc = await loadingTask.promise
  return {
    doc,
    numPages: doc.numPages,
    // `destroy()` lives on the loading task, not the document proxy.
    destroy: () => loadingTask.destroy(),
  }
}

export async function renderPage(
  doc: PdfDocument,
  pageNumber: number,
  opts: { dpi: number; format: ImageFormat; quality: number },
): Promise<RasterPage> {
  const page = await doc.getPage(pageNumber)
  try {
    // pdf.js viewports are sized at 72 DPI (1 PDF point = 1px at scale 1).
    let scale = opts.dpi / 72
    const base = page.getViewport({ scale: 1 })
    const longEdge = Math.max(base.width, base.height) * scale
    if (longEdge > MAX_EDGE_PX) scale *= MAX_EDGE_PX / longEdge

    const viewport = page.getViewport({ scale })
    const canvas = document.createElement("canvas")
    canvas.width = Math.ceil(viewport.width)
    canvas.height = Math.ceil(viewport.height)
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Could not acquire a 2D canvas context")

    // pdf.js defaults to an opaque white background, so JPEG output won't turn
    // transparent regions black.
    await page.render({ canvas, viewport }).promise

    const mime = opts.format === "png" ? "image/png" : "image/jpeg"
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Canvas image export failed"))),
        mime,
        opts.format === "jpeg" ? opts.quality / 100 : undefined,
      )
    })

    const result: RasterPage = { blob, width: canvas.width, height: canvas.height }
    // Release the bitmap promptly — large documents are rendered page-by-page so
    // peak memory stays at roughly one page, not the whole file.
    canvas.width = 0
    canvas.height = 0
    return result
  } finally {
    page.cleanup()
  }
}
