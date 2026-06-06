/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development'
const isStatic = process.env.DEPLOY_MODE === 'static'
const scriptSrc = `'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ''}`

const nextConfig = {
  output: isStatic ? 'export' : 'standalone',
  // Turbopack (default in Next.js 16) supports WebAssembly natively — no webpack config needed
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self' http://localhost:8080 https://oauth.pdf62.skyhold.id; frame-ancestors 'none'; upgrade-insecure-requests;`,
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
