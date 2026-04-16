import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    return [
      // 301 redirects from old Wix URLs → new clean URLs
      { source: '/the-center-1',                    destination: '/about',             permanent: true },
      { source: '/copy-of-news',                    destination: '/about#calendar',    permanent: true },
      { source: '/copy-of-2024-summer-schedule',    destination: '/schedule',  permanent: true },
      { source: '/copy-of-register',                destination: '/enroll',            permanent: true },
      { source: '/copy-of-policies',                destination: '/about#dress-code',  permanent: true },
      { source: '/services-4',                      destination: '/classes',           permanent: true },
      { source: '/tuition',                         destination: '/enroll#pricing',    permanent: true },
      { source: '/the-faculty',                     destination: '/faculty',           permanent: true },
      { source: '/newsletter',                      destination: '/about#news',        permanent: true },
      { source: '/about-3',                         destination: '/the-project',       permanent: true },
      { source: '/about-us',                        destination: '/about',             permanent: true },
      { source: '/policies',                        destination: '/about#policies',    permanent: true },
      { source: '/register',                        destination: '/enroll',            permanent: true },
    ]
  },
}

export default nextConfig
