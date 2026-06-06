// This is a dedicated Web Worker that securely fetches and instantiates the Wasm engine.

let wasmInstance: any = null;

self.onmessage = async (e) => {
  const { action, payload } = e.data;

  if (action === 'INIT') {
    try {
      // The worker authenticates against the same domain, meaning cookies/sessions are passed.
      // This will hit the Wasm Gatekeeper route.
      const go = new (self as any).Go(); // Assumes wasm_exec.js is loaded
      const result = await WebAssembly.instantiateStreaming(fetch('/processor.wasm'), go.importObject);
      go.run(result.instance);
      wasmInstance = true;
      self.postMessage({ status: 'READY' });
    } catch (err) {
      self.postMessage({ status: 'ERROR', error: 'Failed to initialize WASM (Unauthorized or Network Error)' });
    }
  }

  if (action === 'PROCESS' && wasmInstance) {
    try {
        const { type, data } = payload;
        // Call the natively bound Go functions
        let outBlob;
        if (type === 'merge') {
            outBlob = (self as any).pdf62.merge(data);
        } else if (type === 'split') {
            outBlob = (self as any).pdf62.split(data, payload.size);
        } else if (type === 'compress') {
            outBlob = (self as any).pdf62.compress(data, payload.quality, payload.scale);
        }
        
        self.postMessage({ status: 'SUCCESS', result: outBlob });
    } catch (err) {
        self.postMessage({ status: 'ERROR', error: err });
    }
  }
};
