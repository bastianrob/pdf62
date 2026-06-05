// pdf.worker.js — Web Worker that loads the Wasm binary and exposes pdf62
importScripts('/wasm_exec.js')

let wasmReady = false

self.onmessage = async (e) => {
  const { id, action, payload } = e.data

  if (!wasmReady) {
    const go = new Go()
    const wasmResp = await fetch('/api/wasm?v=2')
    const { instance } = await WebAssembly.instantiateStreaming(wasmResp, go.importObject)
    go.run(instance)
    wasmReady = true
  }

  try {
    let result
    switch (action) {
      case 'split':
        result = await pdf62.split(payload.file, payload.pagesPerChunk)
        break
      case 'merge':
        result = await pdf62.merge(payload.files)
        break
      case 'compress':
        result = await pdf62.compress(payload.file, payload.quality, payload.scale)
        break
      case 'extract':
        result = await pdf62.extract(payload.file, payload.startPage, payload.endPage)
        break
      case 'getPageCount':
        result = await pdf62.getPageCount(payload.file)
        break
      default:
        throw new Error(`Unknown action: ${action}`)
    }
    self.postMessage({ id, result })
  } catch (err) {
    self.postMessage({ id, error: err.message })
  }
}
