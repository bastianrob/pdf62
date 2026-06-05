//go:build js && wasm

package main

import (
	"bytes"
	"fmt"
	"io"
	"syscall/js"

	pdf "github.com/bastianrob/skyhold-pdf/processor"
	"github.com/pdfcpu/pdfcpu/pkg/api"
)

func split(this js.Value, args []js.Value) any {
	handler := js.FuncOf(func(this js.Value, promiseArgs []js.Value) any {
		resolve := promiseArgs[0]
		reject := promiseArgs[1]

		go func() {
			if len(args) < 2 {
				reject.Invoke(js.ValueOf("Error: Missing arguments"))
				return
			}
			jsFile := args[0]
			pagesPerChunk := args[1].Int()

			fileBytes := make([]byte, jsFile.Get("length").Int())
			js.CopyBytesToGo(fileBytes, jsFile)

			var results [][]byte
			config := pdf.ChunkConfig{
				Input:    bytes.NewReader(fileBytes),
				PageSize: pagesPerChunk,
				CreateWriter: func(chunkIndex int, maxDigits int) (io.WriteCloser, error) {
					var chunkBuf bytes.Buffer
					return &wasmWriter{Buffer: &chunkBuf, onFinish: func(b []byte) {
						results = append(results, b)
					}}, nil
				},
			}

			if err := pdf.Chunk(config); err != nil {
				reject.Invoke(js.ValueOf(fmt.Sprintf("Error splitting PDF: %v", err)))
				return
			}

			jsResults := make([]any, len(results))
			for i, res := range results {
				arr := js.Global().Get("Uint8Array").New(len(res))
				js.CopyBytesToJS(arr, res)
				jsResults[i] = arr
			}
			resolve.Invoke(js.ValueOf(jsResults))
		}()
		return nil
	})

	promise := js.Global().Get("Promise").New(handler)
	return promise
}

func merge(this js.Value, args []js.Value) any {
	handler := js.FuncOf(func(this js.Value, promiseArgs []js.Value) any {
		resolve := promiseArgs[0]
		reject := promiseArgs[1]

		go func() {
			if len(args) < 1 {
				reject.Invoke(js.ValueOf("Error: Missing arguments"))
				return
			}
			jsFiles := args[0]
			length := jsFiles.Get("length").Int()

			readers := make([]io.ReadSeeker, length)
			for i := 0; i < length; i++ {
				jsFile := jsFiles.Index(i)
				fileBytes := make([]byte, jsFile.Get("length").Int())
				js.CopyBytesToGo(fileBytes, jsFile)
				readers[i] = bytes.NewReader(fileBytes)
			}

			var mergedResult []byte
			config := pdf.CombineConfig{
				Inputs: readers,
				CreateWriter: func() (io.WriteCloser, error) {
					var outBuf bytes.Buffer
					return &wasmWriter{Buffer: &outBuf, onFinish: func(b []byte) {
						mergedResult = b
					}}, nil
				},
			}

			if err := pdf.CombinePDFs(config); err != nil {
				reject.Invoke(js.ValueOf(fmt.Sprintf("Error merging PDF: %v", err)))
				return
			}

			arr := js.Global().Get("Uint8Array").New(len(mergedResult))
			js.CopyBytesToJS(arr, mergedResult)
			resolve.Invoke(arr)
		}()
		return nil
	})

	promise := js.Global().Get("Promise").New(handler)
	return promise
}

func compress(this js.Value, args []js.Value) any {
	handler := js.FuncOf(func(this js.Value, promiseArgs []js.Value) any {
		resolve := promiseArgs[0]
		reject := promiseArgs[1]

		go func() {
			if len(args) < 3 {
				reject.Invoke(js.ValueOf("Error: Missing arguments"))
				return
			}
			jsFile := args[0]
			quality := args[1].Int()
			scale := args[2].Int()

			fileBytes := make([]byte, jsFile.Get("length").Int())
			js.CopyBytesToGo(fileBytes, jsFile)

			var compressedResult []byte
			config := pdf.CompressConfig{
				Input:   bytes.NewReader(fileBytes),
				Quality: quality,
				Scale:   scale,
				CreateWriter: func() (io.WriteCloser, error) {
					var outBuf bytes.Buffer
					return &wasmWriter{Buffer: &outBuf, onFinish: func(b []byte) {
						compressedResult = b
					}}, nil
				},
			}

			if err := pdf.CompressPDF(config); err != nil {
				reject.Invoke(js.ValueOf(fmt.Sprintf("Error compressing PDF: %v", err)))
				return
			}

			arr := js.Global().Get("Uint8Array").New(len(compressedResult))
			js.CopyBytesToJS(arr, compressedResult)
			resolve.Invoke(arr)
		}()
		return nil
	})

	promise := js.Global().Get("Promise").New(handler)
	return promise
}

func extract(this js.Value, args []js.Value) any {
	handler := js.FuncOf(func(this js.Value, promiseArgs []js.Value) any {
		resolve := promiseArgs[0]
		reject := promiseArgs[1]

		go func() {
			if len(args) < 3 {
				reject.Invoke(js.ValueOf("Error: Missing arguments"))
				return
			}
			jsFile := args[0]
			startPage := args[1].Int()
			endPage := args[2].Int()

			fileBytes := make([]byte, jsFile.Get("length").Int())
			js.CopyBytesToGo(fileBytes, jsFile)

			var extractBuf bytes.Buffer
			config := pdf.ExtractConfig{
				Input:  bytes.NewReader(fileBytes),
				From:   startPage,
				To:     endPage,
				Output: &extractBuf,
			}

			if err := pdf.Extract(config); err != nil {
				reject.Invoke(js.ValueOf(fmt.Sprintf("Error extracting PDF: %v", err)))
				return
			}

			result := extractBuf.Bytes()
			arr := js.Global().Get("Uint8Array").New(len(result))
			js.CopyBytesToJS(arr, result)
			resolve.Invoke(arr)
		}()
		return nil
	})

	promise := js.Global().Get("Promise").New(handler)
	return promise
}

func getPageCount(this js.Value, args []js.Value) any {
	handler := js.FuncOf(func(this js.Value, promiseArgs []js.Value) any {
		resolve := promiseArgs[0]
		reject := promiseArgs[1]

		go func() {
			if len(args) < 1 {
				reject.Invoke(js.ValueOf("Error: Missing arguments"))
				return
			}
			jsFile := args[0]
			fileBytes := make([]byte, jsFile.Get("length").Int())
			js.CopyBytesToGo(fileBytes, jsFile)

			pageCount, err := api.PageCount(bytes.NewReader(fileBytes), nil)
			if err != nil {
				reject.Invoke(js.ValueOf(fmt.Sprintf("Error getting page count: %v", err)))
				return
			}

			resolve.Invoke(js.ValueOf(pageCount))
		}()
		return nil
	})

	promise := js.Global().Get("Promise").New(handler)
	return promise
}

type wasmWriter struct {
	*bytes.Buffer
	onFinish func([]byte)
}

func (w *wasmWriter) Close() error {
	if w.onFinish != nil {
		w.onFinish(w.Bytes())
	}
	return nil
}

func main() {
	api.DisableConfigDir()
	c := make(chan struct{}, 0)

	js.Global().Set("pdf62", map[string]interface{}{
		"split":    js.FuncOf(split),
		"merge":    js.FuncOf(merge),
		"compress": js.FuncOf(compress),
		"extract":  js.FuncOf(extract),
		"getPageCount": js.FuncOf(getPageCount),
	})

	fmt.Println("PDF62 Wasm Engine initialized.")
	<-c // Keep running
}
