import React from 'react';
import { Metadata } from 'next';
import { Shield, Target, EyeOff, RefreshCw, Smartphone } from 'lucide-react';

// Single canonical host used everywhere. Must match the sitemap, the robots
// sitemap URL, and a 301 redirect from the non-www host.
const SITE_URL = 'https://www.maha-os.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Maha OS | Private Health Routines and Food Scanner',
  description:
    'A privacy-first mobile app for scanning product labels, maintaining health routines, and keeping personal data on your device.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Maha OS',
    title: 'Maha OS | Private Health Routines and Food Scanner',
    description:
      'Scan product labels, maintain health routines, and keep personal data on your device.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Maha OS — Sovereign Ecosystem' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maha OS | Private Health Routines and Food Scanner',
    description:
      'Scan product labels, maintain health routines, and keep personal data on your device.',
    images: ['/og-image.jpg'],
    creator: '@mayonemaha',
  },
};

export default function MahaOSLandingPage() {
  // SoftwareApplication is the schema Google uses for app rich results.
  // NOTE: only include aggregateRating if you have real, displayed ratings —
  // inventing them violates Google's structured-data policy. Left out here.
  const appLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Maha OS',
    operatingSystem: 'ANDROID, IOS',
    applicationCategory: 'HealthApplication',
    description:
      'A privacy-first mobile app for scanning product labels, maintaining health routines, and keeping personal data on your device.',
    url: SITE_URL,
    installUrl: [
      'https://play.google.com/store/apps/details?id=com.maha.os',
      'https://apps.apple.com/us/app/maha-os/id6778333838',
    ],
    downloadUrl: [
      'https://play.google.com/store/apps/details?id=com.maha.os',
      'https://apps.apple.com/us/app/maha-os/id6778333838',
    ],
    sameAs: ['https://apps.apple.com/us/app/maha-os/id6778333838'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maha Strategies LLC',
      url: 'https://www.mahastrategies.com',
    },
  };

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Maha Strategies LLC',
    url: 'https://www.mahastrategies.com',
    brand: { '@type': 'Brand', name: 'Maha OS' },
    sameAs: [
      'https://www.maha-os.com',
      'https://publish.mahastrategies.com',
      'https://twitter.com/mayonemaha',
    ],
  };

  // FAQ schema is among the most reliably extracted structures for AI answers.
  // Keep answers factual and matching the on-page copy.
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Maha OS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Maha OS is a privacy-first mobile app for scanning product labels, maintaining health routines, and keeping personal data on your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data private?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Maha OS is designed to keep personal health information on your device rather than sell it to advertising networks. Review the in-app privacy information for the current technical details and permissions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What platforms is Maha OS available on?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Maha OS is available for Android on Google Play and for iPhone on the Apple App Store.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-stone-100 selection:bg-zinc-800 antialiased font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero Visual Infrastructure */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 border-b border-zinc-900">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/images/hero-poster.jpg"
            aria-hidden="true"
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
            Build a Health Routine <br />
            <span className="font-mono text-xl sm:text-3xl tracking-widest text-zinc-500 block mt-4">That Stays Yours</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-stone-400 font-light tracking-wide leading-relaxed">
            Scan product labels, maintain daily routines, and keep your personal health information on your device. Maha OS is a private companion for deliberate everyday choices, not medical advice.
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

            {/* Live iOS Node */}
            <a
              href="https://apps.apple.com/us/app/maha-os/id6778333838"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full border border-[#E6C687] text-[#E6C687] font-bold text-sm tracking-widest uppercase py-4 px-8 hover:bg-[#E6C687] hover:text-black transition-colors"
            >
              <Smartphone className="w-5 h-5" />
              Download for iPhone
            </a>
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
              Identify and intercept systemic toxins. Track and exclude hidden industrial seed oils, synthetic additives, and endocrine disruptors from your micro-environment with zero friction.
            </p>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed">
              In plain terms: scan a product&rsquo;s barcode and Maha OS flags industrial seed oils and questionable additives before you buy.
            </p>
          </div>

          <div className="border border-zinc-900 p-6 space-y-4 bg-zinc-950/30 hover:border-zinc-700 transition-colors">
            <RefreshCw className="w-5 h-5 text-[#E6C687]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-white">02 / Circadian Alignment</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Synchronize your neural biology with terrestrial intervals. Program optimized solar integration workflows, biological shielding routines, and local blue-light exposure management.
            </p>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed">
              In plain terms: get timed reminders for morning light, daylight exposure, and reducing blue light at night to support your sleep-wake cycle.
            </p>
          </div>

          <div className="border border-zinc-900 p-6 space-y-4 bg-zinc-950/30 hover:border-zinc-700 transition-colors">
            <EyeOff className="w-5 h-5 text-indigo-400" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-white">03 / Zero-Telemetry Architecture</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Absolute hardware containment. Your deep biological metrics, intake profiles, and tactical journals are locked locally on-device using end-to-end edge encryption. Zero cloud leaks.
            </p>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed">
              In plain terms: your health data is encrypted and stays on your phone &mdash; it isn&rsquo;t uploaded to our servers.
            </p>
          </div>

        </div>
      </section>

      <section className="border-y border-zinc-900 bg-black/30 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#E6C687]">The framework behind the protocol</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight text-white">Built from <span className="italic">The Maha Principle</span></h2>
          <p className="mt-5 text-sm leading-relaxed text-stone-400 max-w-2xl mx-auto">
            Read the ideas behind the practice, then use Maha OS to make the routines your own. The book and the app are companions: one offers the framework; the other supports daily action.
          </p>
          <a
            href="https://themahaprinciple.com/?utm_source=maha-os.com&utm_medium=referral&utm_campaign=app_to_book"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-8 border border-[#E6C687] px-6 py-3 text-xs font-bold tracking-widest uppercase text-[#E6C687] transition-colors hover:bg-[#E6C687] hover:text-black"
          >
            Explore The Maha Principle
          </a>
        </div>
      </section>

      {/* Footer System Node with SEO Cross-Linking */}
      <footer className="border-t border-zinc-900 py-12 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          <div className="flex gap-4">
            <a href="https://www.mahastrategies.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C687] transition-colors">Corporate Strategy</a>
            <span>//</span>
            <a href="https://themahaprinciple.com/?utm_source=maha-os.com&utm_medium=referral&utm_campaign=app_to_book" target="_blank" rel="noopener noreferrer" className="hover:text-[#E6C687] transition-colors">The Maha Principle</a>
          </div>
          <div>© 2026 MAHA STRATEGIES LLC. SOVEREIGN SECTOR SECURED.</div>
        </div>
      </footer>
    </div>
  );
}
