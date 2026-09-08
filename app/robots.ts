import type { MetadataRoute } from 'next'
const host = 'https://www.maha-os.com'
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/operator/', '/private/'] }, host, sitemap: [`${host}/sitemap-index.xml`, `${host}/sitemap.xml`] } }
