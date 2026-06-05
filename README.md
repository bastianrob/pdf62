# PDF62 Processor Suite

PDF62 is a high-performance, secure, and privacy-first PDF manipulation suite. It supports splitting, merging, extracting, and compressing PDFs with 100% local processing powered by WebAssembly (Wasm). No files are ever uploaded to a server, ensuring absolute privacy for your documents.

## Architecture
This project is built as a **Polyglot Monorepo** using **Turborepo**:
- **`apps/web`**: Next.js frontend processing PDFs locally in the browser via Wasm.
- **`packages/engine`**: Go core wrapping `pdfcpu` and compiled to WebAssembly (`dist/processor.wasm`).
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
For detailed instructions on deploying the application to staging or production, please refer to the [Deployment Guide](file:///Users/robinbastian/OSS/pdf62.skyhold.id/deployment_guide.md).

## Licensing
This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
