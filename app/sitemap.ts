import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/site-url'
import { getAllPostSlugs } from '@/sanity/lib/queries'

type StaticRoute = {
  path: string
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
}

const staticRoutes: StaticRoute[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/classes', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/schedule', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/events', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faculty', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/the-project', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/free-trial', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/policies', priority: 0.5, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = slugs
    .filter(Boolean)
    .map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticEntries, ...blogEntries]
}
