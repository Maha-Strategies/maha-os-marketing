import React from 'react';
import { Metadata } from 'next';
import { Shield, Target, EyeOff, RefreshCw, Smartphone } from 'lucide-react';
import WaitlistForm from '../components/WaitlistForm';

export const metadata: Metadata = {
  title: 'Maha OS | Sovereign Ecosystem',
  description: 'Take back control of your health. A privacy-first ecosystem to eliminate toxins, optimize your metabolism, and protect your cognitive baseline.',
  alternates: { canonical: 'https://maha-os.com/' },
  openGraph: {
    type: 'website',
    url: 'https://maha-os.com/',
    title: 'Maha OS | Sovereign Ecosystem',
    description: 'A privacy-first ecosystem to eliminate toxins, optimize your metabolism, and protect your cognitive baseline.',
    images: [{ url: 'https://maha-os.com/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maha OS | Sovereign Ecosystem',
    description: 'A privacy-first ecosystem to eliminate toxins, optimize your metabolism, and protect your cognitive baseline.',
    images: ['https://maha-os.com/og-image.jpg'],
    creator: '@mayonemaha',
  }
};

export default function MahaOSLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Maha OS",
    "operatingSystem": "iOS, Android",
    "applicationCategory": "Health & Sovereignty Ecosystem",
    "description": "A privacy-first ecosystem designed to eliminate biological tracking, optimize local metabolic metrics, and build defensive cognitive firewalls."
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-stone-100 selection:bg-zinc-800 antialiased font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Visual Infrastructure */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 border-b border-zinc-900">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-sovereign2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-black/60 font-mono text-[10px] tracking-widest uppercase text-[#E6C687]">
            <Shield className="w-3 h-3 text-[#E6C687]" /> SYSTEM BROADCAST // MAHA_OS_LIVE
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tighter text-white uppercase leading-none">
            Your Biology <br />
            <span className="font-mono text-xl sm:text-3xl tracking-widest text-zinc-500 block mt-4">Is Being Extracted</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-stone-400 font-light tracking-wide leading-relaxed">
            The modern environment is systematically weaponized against human vitality. Industrial seed oils, artificial lighting, pervasive seed chemicals, and relentless algorithmic cycles hijack your metabolic efficiency and erode your focus. Maha OS is your perimeter defense.
          </p>

          <div className="pt-8 max-w-md mx-auto space-y-6">
            {/* Live Android Node */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.maha.os" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#E6C687] text-black font-bold text-sm tracking-widest uppercase py-4 px-8 hover:bg-yellow-500 transition-colors"
            >
              <Smartphone className="w-5 h-5" />
              Download for Android
            </a>

            {/* iOS Vanguard Protocol */}
            <div className="border-t border-zinc-800/50 pt-6">
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-4">iOS Architecture Pending // Join Vanguard</p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="border border-zinc-900 p-6 space-y-4 bg-zinc-950/30 hover:border-zinc-700 transition-colors">
            <Target className="w-5 h-5 text-[#C25E4E]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-white">01 / Metabolic Veto</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Identify and intercept systemic toxins. Track and exclude hidden industrial engine oils, synthetic additives, and endocrine disruptors from your micro-environment with zero friction.
            </p>
          </div>

          <div className="border border-zinc-900 p-6 space-y-4 bg-zinc-950/30 hover:border-zinc-700 transition-colors">
            <RefreshCw className="w-5 h-5 text-[#E6C687]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-white">02 / Circadian Alignment</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Synchronize your neural biology with terrestrial intervals. Program optimized solar integration workflows, biological shielding routines, and local blue-light exposure management.
            </p>
          </div>

          <div className="border border-zinc-900 p-6 space-y-4 bg-zinc-950/30 hover:border-zinc-700 transition-colors">
            <EyeOff className="w-5 h-5 text-indigo-400" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-white">03 / Zero-Telemetry Architecture</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Absolute hardware containment. Your deep biological metrics, intake profiles, and tactical journals are locked locally on-device using end-to-end edge encryption. Zero cloud leaks.
            </p>
          </div>

        </div>
      </section>

      {/* Footer System Node with SEO Cross-Linking */}
      <footer className="border-t border-zinc-900 py-12 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          <div className="flex gap-4">
            <a href="https://mahastrategies.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C687] transition-colors">Corporate Strategy</a>
            <span>//</span>
            <a href="https://publish.mahastrategies.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C687] transition-colors">The Maha Principle</a>
          </div>
          <div>© 2026 MAHA STRATEGIES LLC. SOVEREIGN SECTOR SECURED.</div>
        </div>
      </footer>
    </div>
  );
}