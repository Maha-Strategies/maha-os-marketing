// app/blog/page.tsx
import { getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
  title: 'The Maha Principle Blog | Digital & Biological Sovereignty',
  description: 'Deep dives into edge computing, on-device artificial intelligence architectures, network protection, and systemic data integrity.',
};

export default function BlogIndex() {
  const allPosts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-stone-300 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Sovereign Intel</h1>
          <p className="text-stone-400 max-w-xl">
            Technical dissections, framework updates, and architectural analyses regarding the future of user hardware execution.
          </p>
        </header>

        <div className="space-y-12">
          {allPosts.map(({ slug, date, title, description }) => (
            <article key={slug} className="group border-b border-stone-950 pb-8">
              <time className="text-xs font-mono text-amber-500 tracking-wider">{date}</time>
              <Link href={`/blog/${slug}`}>
                <h2 className="text-2xl font-semibold text-white group-hover:text-amber-400 transition-colors mt-2 mb-3 tracking-tight">
                  {title}
                </h2>
              </Link>
              <p className="text-stone-400 leading-relaxed mb-4">{description}</p>
              <Link 
                href={`/blog/${slug}`} 
                className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
              >
                Read deep dive <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </article>
          ))}
          
          {allPosts.length === 0 && (
            <p className="text-stone-500 italic">No publications have been deployed to the filesystem network directory yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}