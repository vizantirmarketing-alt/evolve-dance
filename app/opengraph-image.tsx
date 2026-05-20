import { ImageResponse } from 'next/og'

import { siteConfig } from '@/data/site'

export const runtime = 'edge'
export const alt = 'Evolve Dance Center'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1F1F1C 0%, #0d1211 55%, #1a2e2c 100%)',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#0ABAB5',
            }}
          />
          <span
            style={{
              fontSize: 18,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#81D8D0',
            }}
          >
            Las Vegas Dance Studio
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#F7F5F1',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 300,
              color: 'rgba(247, 245, 241, 0.75)',
              fontStyle: 'italic',
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(247, 245, 241, 0.55)',
              maxWidth: 720,
              lineHeight: 1.5,
            }}
          >
            Ballet, jazz, hip hop, contemporary & more — ages 18 months to 18 years
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 20, color: '#0ABAB5' }}>evolvedancecenter.com</span>
          <span style={{ fontSize: 18, color: 'rgba(247, 245, 241, 0.45)' }}>Est. 2016 · Southwest Las Vegas</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
