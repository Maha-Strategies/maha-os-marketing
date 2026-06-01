import { MetadataRoute } from 'next'

// Use ONE canonical host everywhere. The live site resolves to www, so this
// uses www — make sure your canonical tag and any redirects agree, and that
// the non-www host 301-redirects here.
const baseUrl = 'https://www.maha-os.com'

// ---------------------------------------------------------------------------
// OPTION A (preferred): generate blog entries dynamically from your data source
// so new posts appear in the sitemap automatically. Replace the body of
// getBlogPosts() with a real fetch from your CMS / Supabase. It should return
// one object per post with a URL slug and a last-modified date.
//
// Example (Supabase):
//   import { supabase } from '@/lib/supabase'
//   const { data } = await supabase
//     .from('posts')
//     .select('slug, updated_at')
//     .eq('published', true)
//   return (data ?? []).map(p => ({ slug: p.slug, lastModified: new Date(p.updated_at) }))
// ---------------------------------------------------------------------------
async function getBlogPosts(): Promise<{ slug: string; lastModified: Date }[]> {
  // TODO: replace with a real fetch. Until then, fill OPTION B below by hand.
  return []
}

// OPTION B (fallback): if you are not fetching dynamically, list real slugs here.
// Delete this once getBlogPosts() is wired up.
const MANUAL_BLOG_SLUGS: string[] = [
  // 'the-hateful-eight-seed-oils',
  // 'circadian-alignment-protocol',
  // 'zero-telemetry-architecture',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const dynamicPosts = await getBlogPosts()

  const blogRoutes: MetadataRoute.Sitemap =
    dynamicPosts.length > 0
      ? dynamicPosts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.lastModified,
          changeFrequency: 'monthly',
          priority: 0.7,
        }))
      : MANUAL_BLOG_SLUGS.map((slug) => ({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        }))

  return [...staticRoutes, ...blogRoutes]
}
