import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'PDF62 — Free & Private PDF Tools'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f12',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#e5484d',
              width: 160,
              height: 160,
              borderRadius: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 48,
              boxShadow: '0 8px 32px rgba(229, 72, 77, 0.2)',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 100,
                fontWeight: 800,
                fontFamily: 'sans-serif',
                marginTop: 8,
              }}
            >
              P
            </span>
          </div>
          <span
            style={{
              color: 'white',
              fontSize: 140,
              fontWeight: 800,
              fontFamily: 'sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            PDF62
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
