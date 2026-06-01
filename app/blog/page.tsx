// app/blog/page.tsx
import { getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';

const SITE_URL = 'https://www.maha-os.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Sovereign Intel | Maha OS Blog',
  description:
    'Deep dives into edge computing, on-device AI architectures, biometric privacy, and systemic data integrity from the Maha OS team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    siteName: 'Maha OS',
    title: 'Sovereign Intel | Maha OS Blog',
    description:
      'Technical dissections and architectural analyses on digital and biological sovereignty.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Maha OS — Sovereign Intel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Intel | Maha OS Blog',
    description:
      'Technical dissections and architectural analyses on digital and biological sovereignty.',
    images: ['/og-image.jpg'],
    creator: '@mayonemaha',
  },
};

export default function BlogIndex() {
  const allPosts = getSortedPostsData();

  // Blog + BlogPosting structured data. Helps search engines treat this as a
  // publication and helps AI engines enumerate the article set and attribute
  // it to the Maha OS brand.
  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog`,
    name: 'Sovereign Intel | Maha OS Blog',
    description:
      'Deep dives into edge computing, on-device AI architectures, biometric privacy, and systemic data integrity.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Maha Strategies LLC',
      url: 'https://www.mahastrategies.com',
    },
    blogPost: allPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-stone-300 py-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Sovereign Intel</h1>
          <p className="text-stone-400 max-w-xl">
            Technical dissections, framework updates, and architectural analyses on edge computing,
            on-device AI, and biometric privacy.
          </p>
        </header>

        <div className="space-y-12">
          {allPosts.map(({ slug, date, title, description }) => (
            <article key={slug} className="group border-b border-stone-800 pb-8">
              <time dateTime={date} className="text-xs font-mono text-amber-500 tracking-wider">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 className="text-2xl font-semibold mt-2 mb-3 tracking-tight">
                <Link
                  href={`/blog/${slug}`}
                  className="text-white group-hover:text-amber-400 transition-colors"
                >
                  {title}
                </Link>
              </h2>
              <p className="text-stone-400 leading-relaxed mb-4">{description}</p>
              <Link
                href={`/blog/${slug}`}
                className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                aria-label={`Read more: ${title}`}
              >
                Read deep dive{' '}
                <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </Link>
            </article>
          ))}

          {allPosts.length === 0 && (
            <p className="text-stone-500 italic">No publications have been deployed yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
