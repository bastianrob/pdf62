# PDF62 Processor Suite

PDF62 is a high-performance, secure, and privacy-first PDF manipulation suite. It supports splitting, merging, extracting, and compressing PDFs, plus converting PDF pages to PNG/JPEG images, with 100% local processing powered by WebAssembly (Wasm). No files are ever uploaded to a server, ensuring absolute privacy for your documents.

## Architecture
This project is built as a **Polyglot Monorepo** using **Turborepo**:
- **`apps/web`**: Next.js frontend processing PDFs locally in the browser via Wasm. PDF-to-image conversion is rendered client-side by a self-hosted [pdf.js](https://mozilla.github.io/pdf.js/) engine (copied into `public/` at build time by the `prep:pdfjs` script).
- **`packages/engine`**: Go core wrapping `pdfcpu` and compiled to WebAssembly (`dist/processor.wasm`) — powers split, merge, extract, and compress.
- **`packages/ui`**: Shared Radix UI Primitives and Tailwind v4 design system.

---

## Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
- [pnpm](https://pnpm.io/installation) (Node Package Manager)
- [Go 1.26+](https://go.dev/doc/install) (Only required if you want to rebuild the WebAssembly core engine)

### Local Development

1. **Install Dependencies**
   Run the following from the repository root:
   ```bash
   pnpm install
   ```

2. **Run the Web App**
   Start the Next.js development server:
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:3000`.

3. **Build the Application**
   Compile the Wasm engine and build Next.js for production:
   ```bash
   pnpm run build
   ```

---

## Deployment

PDF62 supports two deployment modes: **Static Export** and **Docker**. Both modes run all PDF processing client-side via WebAssembly — no server-side PDF computation occurs in either mode.

### Static Export (CDN / Static Hosting)

Produces a fully self-contained `out/` directory with HTML, CSS, JS, and the WASM binary. No running server is required.

**Prerequisites:** Node.js ≥ 20, pnpm, Go ≥ 1.26

```bash
# Build the Go WASM engine
cd packages/engine && GOOS=js GOARCH=wasm go build -o dist/processor.wasm main_wasm.go && cd ../..

# Copy WASM into public/ and build static export
pnpm --filter @pdf62/web build:static

# Output is in apps/web/out/
```

Upload `apps/web/out/` to any static host: **Cloudflare Pages**, **Netlify**, **Vercel**, **GitHub Pages**, **AWS S3 + CloudFront**, **Nginx**, or **Caddy**.

> **Note:** Your hosting provider must serve `.wasm` files with `Content-Type: application/wasm`.

### Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Or build and run directly
docker build -f apps/web/Dockerfile -t pdf62 .
docker run -p 3000:3000 pdf62
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server listening port | `3000` |
| `NODE_ENV` | Node.js environment | `production` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics tracking ID | *(none)* |

### Comparison

| Aspect | Static Export | Docker |
|---|---|---|
| Server required | No | Yes (Node.js) |
| Scaling | Infinite (CDN) | Horizontal (container replicas) |
| Cost | Near-zero | Server instance cost |
| Caching | CDN edge caching (optimal) | Requires reverse proxy |

For detailed troubleshooting and hosting provider setup, see `/tmp/DEPLOYMENT.md`.

## Licensing
This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
