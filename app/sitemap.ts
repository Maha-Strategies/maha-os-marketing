import { MetadataRoute } from 'next'

// Single canonical host everywhere. Must match the page canonical tag,
// the robots sitemap URL, and a 301 redirect from the non-www host.
const baseUrl = 'https://www.maha-os.com'

// Blog posts. Dates reflect the published date shown on each article where
// known; others default to the most recent known publish date. Update the
// `lastModified` values when you materially revise a post.
//
// Better long-term: replace this array by fetching slugs + updated_at from
// your CMS/Supabase so new posts appear automatically (see commented example).
const blogPosts: { slug: string; lastModified: string }[] = [
  { slug: 'local-ai-vs-cloud-biometrics', lastModified: '2026-05-31' },
  { slug: 'cloud-health-telemetry-risks', lastModified: '2026-05-31' },
  { slug: 'biological-digital-sovereignty-defined', lastModified: '2026-05-31' },
  { slug: 'optimize-metabolism-software', lastModified: '2026-06-02' },
  { slug: 'cognitive-scanner', lastModified: '2026-06-02' },
  { slug: 'health-wellness-ai-ecosystem-alternatives', lastModified: '2026-06-02' },
  { slug: 'agentic-health-system', lastModified: '2026-06-02' },
  { slug: 'best-personalized-health-wellness-ai-ecosystem', lastModified: '2026-06-02' },
  { slug: 'voice-stress-reset-app-alternative', lastModified: '2026-06-02' },
  { slug: 'enterprise-health-platform-alternatives', lastModified: '2026-06-02' },
  { slug: 'zero-payload-biometric-tracking', lastModified: '2026-06-02' },
]

// Example dynamic version (Supabase):
//   import { supabase } from '@/lib/supabase'
//   const { data } = await supabase
//     .from('posts').select('slug, updated_at').eq('published', true)
//   const blogPosts = (data ?? []).map(p => ({ slug: p.slug, lastModified: p.updated_at }))

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}