// app/blog/[slug]/page.tsx
import { getPostData, getSortedPostsData } from '../../../lib/blog';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

// Next.js Search Engine Optimization Injection
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);
  
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Maha OS Blog`,
    description: post.description,
  };
}

// Pre-render the markdown pages into static files at compilation time for zero loading delay
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-stone-300 py-20 px-6 selection:bg-amber-500 selection:text-black">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-stone-950 pb-8">
          <time className="text-sm text-amber-500 font-mono tracking-wider">{post.date}</time>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-2 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* The 'prose' tags apply structural typography rules globally */}
        <div 
          className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white prose-a:text-amber-500 hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </article>
    </main>
  );
}