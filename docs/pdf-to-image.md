# PDF to Image — Feature Summary & Guide

A client-side tool that converts PDF pages into PNG or JPEG images. Everything
runs in the browser — the file is never uploaded to a server.

- **Route:** `/convert`
- **Branch:** `feat/rasterize-pages`
- **Status:** built and verified end-to-end in a real browser (2-page PDF → 2 PNGs, no console/CSP errors)

---

## Part 1 — Technical Summary

### Why a new engine was needed

PDF62's existing engine (`packages/engine`, Go compiled to WASM via `pdfcpu`)
handles **structural** operations — split, merge, compress, extract. It has **no
rasterizer**, and Go can't cross-compile a usable PDF renderer to `GOOS=js/wasm`.
Turning a page into pixels therefore requires a separate rendering engine.

### Library used

| | |
|---|---|
| **Library** | [pdf.js](https://mozilla.github.io/pdf.js/) — `pdfjs-dist@6.1.200` |
| **License** | Apache-2.0 (compatible with the project's MIT license) |
| **Role** | Parses the PDF and renders each page to an HTML canvas |
| **Loaded** | Lazily via dynamic `import()`, only on the `/convert` route — stays out of every other bundle |

pdf.js was chosen over the originally-planned PDFium wrapper because it is the
idiomatic browser tool for "render a page to a canvas," is lighter, ships its own
parsing worker, and integrates cleanly. (See deviations below.)

### How it works

1. The user drops a PDF. `loadPdf()` hands the bytes to pdf.js, which parses them
   **off the main thread** in its own worker, and reports the page count.
2. On **Convert**, pages are rendered **one at a time**: each page is drawn to a
   freshly-created canvas at the chosen DPI, exported with `canvas.toBlob()` to a
   PNG/JPEG blob, and the canvas is then released. Peak memory stays at roughly
   one page rather than the whole document.
3. Each blob becomes an object URL shown as a thumbnail with a download button,
   plus a "Download All" action.

```
PDF file ──▶ pdf.js worker (parse) ──▶ per-page canvas render ──▶ toBlob ──▶ <a download>
                                         (DPI / format applied here)
```

### Privacy & CSP

- All processing is local; no network upload. This preserves the site's
  "100% private / runs locally" promise.
- The pdf.js worker and all support assets are **self-hosted** under `/public`
  (never a CDN), so they satisfy the site's strict Content-Security-Policy
  (`connect-src 'self'`, `script-src 'self' … 'wasm-unsafe-eval'`).
- pdf.js v6 removed its `eval` code path entirely, so it runs under the CSP
  **without** needing `'unsafe-eval'`.

### Self-hosted assets

Copied into `apps/web/public/` by the `prep:pdfjs` npm script (and gitignored,
like the existing `processor.wasm`). The browser only fetches what a given PDF
needs:

| Asset | Purpose |
|---|---|
| `pdfjs.worker.min.mjs` | The pdf.js parsing/render worker |
| `pdfjs/standard_fonts/` | Renders the base-14 fonts (Helvetica, Times, …) when a PDF doesn't embed them |
| `pdfjs/cmaps/` | CJK / custom character encodings |
| `pdfjs/wasm/` | JBIG2 / JPEG2000 image decoders (common in **scanned** PDFs) + ICC color |
| `pdfjs/iccs/` | ICC color profiles for accurate color |

### Files

**Added**
- `apps/web/lib/processing/pdfRasterizer.ts` — the pdf.js wrapper (`loadPdf`, `renderPage`)
- `apps/web/app/(tools)/convert/page.tsx` — route, metadata, JSON-LD
- `apps/web/app/(tools)/convert/ConvertTool.tsx` — the tool UI

**Modified**
- `apps/web/package.json` — `pdfjs-dist` dependency + `prep:pdfjs` script wired into `dev`/`build`
- `apps/web/lib/analytics.ts` — added the `'convert'` action
- `apps/web/app/sitemap.ts`, `apps/web/app/(tools)/RelatedTools.tsx`,
  `packages/ui/src/components/ToolSection.tsx`, `packages/ui/src/components/Header.tsx` — site integration
- `.gitignore` — ignore the copied pdf.js artifacts

**Removed**
- `apps/web/lib/processing/wasmWorker.ts` — dead/stale worker (unused; the live worker is `public/pdf.worker.js`)

### Build / run notes

- `pnpm --filter @pdf62/web dev` (or `build`) automatically runs `prep:pdfjs`
  first, copying the worker + support assets into `public/`.
- No `next.config.js` change was required — Next 16's Turbopack serves WASM natively.

---

## Part 2 — Deviations from the original plan

The original plan described a generic PDFium + pdf-lib tutorial stack. It was
adapted to PDF62's actual architecture (Next 16 / Turbopack monorepo with an
existing Go-WASM engine and worker pattern).

| # | Original plan | What was built | Why |
|---|---|---|---|
| 1 | Render with `@embedpdf/pdfium` (PDFium C++ WASM) | **pdf.js** (`pdfjs-dist`) | Idiomatic page→canvas renderer; lighter; mature; ships its own worker. PDFium is heavier and more low-level. |
| 2 | Add `pdf-lib` for split/merge | **Nothing added** | Split/merge/extract/compress already exist in the Go engine; pdf-lib would duplicate them and can't rasterize anyway. |
| 3 | Edit `next.config.js` so Webpack serves `.wasm` | **No config change** | Next 16 uses Turbopack, which handles WASM natively; a webpack block could break the build. |
| 4 | Create a new `pdf-worker.ts`; pass an `ArrayBuffer` in and copy raw RGBA pixels back to the main thread | **Reused pdf.js's own worker** for parsing; render to canvas directly | pdf.js already parses off-thread; shipping raw RGBA between threads is wasteful and unnecessary. |
| 5 | Hand-paint pixels via the `ImageData` API onto an off-screen canvas | **pdf.js renders straight to the canvas**, then `toBlob()` | pdf.js draws to the canvas for you; manual `ImageData` painting isn't needed. |
| 6 | Open question: bulk-rasterize everything vs. lazy per-page | **On-demand, page-by-page, memory-bounded** | A full-res RGBA page is ~tens of MB; rendering all pages at once risks an out-of-memory crash on large PDFs. |
| 7 | Trigger a hidden `<a>` download | **Kept as-is** | Matches the existing tools' download pattern. |

**Added beyond the plan:** self-hosting the pdf.js support assets (standard
fonts, cmaps, wasm decoders, ICC profiles). This makes scanned PDFs (JBIG2 /
JPEG2000) and PDFs that rely on non-embedded standard fonts render correctly,
while keeping everything local.

---

## Part 3 — How to convert a PDF to images (user guide)

1. **Open the tool.** Click **PDF to Image** in the top navigation, or go to
   `/convert`.

2. **Add your PDF.** Drag a PDF onto the drop zone, or click it to browse. The
   tool reads the file locally and shows how many pages it has
   (e.g. *"12 pages total"*).

3. **Choose your settings:**
   - **Output format**
     - **PNG** — lossless, sharp text and line art, larger files.
     - **JPEG** — smaller files, best for scans and photos.
   - **Resolution (DPI)** — drag the slider (72–300):
     - **72–96** *(Screen)* — small files for on-screen use.
     - **150** *(Standard, default)* — a good balance.
     - **300** *(Print)* — sharpest, largest files.
   - **JPEG quality** *(only shown for JPEG)* — higher = better looking but larger.
   - **Pages** — **All pages**, or **Page range** to enter a `from`–`to` range.

4. **Convert.** Click **Convert to Images**. A progress bar shows
   *"Page X of Y"* as each page is rendered on your device.

5. **Download.** When it finishes you'll see a thumbnail of every page with its
   dimensions and file size. Either:
   - Click an individual thumbnail to download that single image, or
   - Click **Download All** to save every page.

   Files are named `<original>_page<N>.png` / `.jpg`.

6. **Start over.** Use **Reprocess** to re-run with different settings, or remove
   the file to convert a different PDF.

> **Your files stay on your device.** The conversion happens entirely in your
> browser — nothing is uploaded to any server.

### Tips

- For **text documents** you want to keep crisp, use **PNG at 150–300 DPI**.
- For **scanned documents or photos**, **JPEG at 150 DPI** keeps file sizes down.
- Converting **many pages at high DPI** produces large images and takes longer —
  narrow the page range if you only need a few pages.
