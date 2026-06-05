# apps/web/Dockerfile

# ── Stage 1: Build Go WASM engine ──────────────────────────────────
FROM golang:1.26-alpine AS wasm-builder
WORKDIR /engine
COPY packages/engine/go.mod packages/engine/go.sum ./
RUN go mod download
COPY packages/engine ./
RUN GOOS=js GOARCH=wasm go build -o dist/processor.wasm main_wasm.go

# ── Stage 2: Build Next.js app ─────────────────────────────────────
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles and workspace config
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/engine/package.json ./packages/engine/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web ./apps/web
COPY packages/ui ./packages/ui
COPY packages/engine ./packages/engine

# Copy WASM binary from stage 1
COPY --from=wasm-builder /engine/dist/processor.wasm ./packages/engine/dist/processor.wasm

# Build the project
RUN npx turbo build --filter=@pdf62/web...

# ── Stage 3: Production runner ─────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/packages/engine/dist/processor.wasm ./packages/engine/dist/processor.wasm

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "apps/web/server.js"]
