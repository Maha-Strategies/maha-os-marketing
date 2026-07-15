// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0A0A0A]/75 border-b border-stone-900/50 raw-transition">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Core Architecture Link */}
        <Link href="/" className="font-bold text-white tracking-wider text-lg hover:opacity-90 transition-opacity">
          MAHA <span className="text-[#D4AF37]">OS</span>
        </Link>

        {/* Global Routing Nodes */}
        <div className="flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/" className="text-stone-300 hover:text-white transition-colors">
            System
          </Link>
          
          <Link href="/blog" className="text-stone-300 hover:text-[#D4AF37] transition-colors">
            Intel
          </Link>

          {/* Action Optimization Target */}
          <a 
            href="https://play.google.com/store/apps/details?id=com.maha.os"
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#D4AF37] text-black px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-widest hover:bg-[#B7410E] hover:text-white transition-all duration-300"
          >
            Deploy Node
          </a>
        </div>

      </div>
    </nav>
  );
}
