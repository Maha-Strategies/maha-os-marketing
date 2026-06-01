import { MetadataRoute } from 'next'

// Canonical host must match the sitemap and the page canonical tag.
const SITE_URL = 'https://www.maha-os.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard search engines: full access to public content,
        // operational routes withheld.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      {
        // LLM crawlers & generative engines: allowed, to maximize AIO reach
        // for the public site and blog.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'anthropic-ai',
          'ClaudeBot',
          'Claude-Web',
          'Claude-SearchBot',
          'Google-Extended',
          'PerplexityBot',
          'Perplexity-User',
          'CCBot',
          'cohere-ai',
          'Applebot-Extended',
          'Bytespider',
          'Meta-ExternalAgent',
          'Amazonbot',
          'OmgiliBot',
        ],
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}