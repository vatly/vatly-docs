import { MetadataRoute } from 'next'
import { siteNavigation } from '@/lib/navigation'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docs.vatly.com'

  // Collect all routes from the navigation
  const routes = siteNavigation.flatMap((group) => group.links.map((link) => link.href))

  // Create sitemap entries
  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }))

  return sitemapEntries
}
