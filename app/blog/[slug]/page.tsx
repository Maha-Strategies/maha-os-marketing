// app/blog/[slug]/page.tsx
import { getPostData, getSortedPostsData } from '../../../lib/blog';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import widgets to ensure they are only client-loaded when requested by the frontmatter
const SovereigntyPledge = dynamic(() => import('@/components/widgets/SovereigntyPledge'), {
  loading: () => (
    <div className="p-6 border border-stone-800 bg-[#121212] rounded-lg animate-pulse h-64 mt-12 flex items-center justify-center">
      <span className="text-stone-600 font-mono text-sm">Initializing Secure Enclave...</span>
    </div>
  )
});

const McpTerminal = dynamic(() => import('@/components/widgets/McpTerminal'), {
    loading: () => (
      <div className="p-6 border border-stone-800 bg-[#121212] rounded-lg animate-pulse h-64 mt-12 flex items-center justify-center">
        <span className="text-stone-600 font-mono text-sm">Initializing MCP Sandbox...</span>
      </div>
    )
});

const NpuBenchmark = dynamic(() => import('@/components/widgets/NpuBenchmark'), {
    loading: () => (
      <div className="p-6 border border-stone-800 bg-[#121212] rounded-lg animate-pulse h-64 mt-12 flex items-center justify-center">
        <span className="text-stone-600 font-mono text-sm">Loading NPU Simulator...</span>
      </div>
    )
});

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

  // Router to map frontmatter strings to Client Components
  const renderWidget = (widgetName?: string) => {
    switch (widgetName) {
      case 'manifesto-pledge':
        return <SovereigntyPledge />;
      case 'mcp-agent-simulator':
        return <McpTerminal />;
      case 'local-compute-benchmark':
        return <NpuBenchmark />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-stone-300 py-20 px-6 selection:bg-amber-500 selection:text-black">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-stone-950 pb-8">
          <time className="text-sm text-amber-500 font-mono tracking-wider">{post.date}</time>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-2 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* The 'prose' tags apply structural typography rules globally. prose-quotes:none removes the default blockquote marks. */}
        <div 
          className="prose prose-invert prose-quotes:none max-w-none prose-headings:text-white prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-white prose-a:text-amber-500 hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />

        {/* Dynamic Widget Injection based on markdown frontmatter */}
        {post.widget && (
          <div className="mt-16 border-t border-stone-900 pt-12">
            {renderWidget(post.widget)}
          </div>
        )}
      </article>
    </main>
  );
}