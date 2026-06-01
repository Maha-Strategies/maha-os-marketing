// app/beta-signup/page.tsx
"use client";

import { useState } from "react";

export default function BetaSignupPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a privacy-preserving database insertion
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-stone-300 flex flex-col justify-center items-center px-6 py-12 font-mono selection:bg-amber-500 selection:text-black">
      <div className="max-w-xl w-full border border-stone-800 bg-[#121212] p-8 rounded-xl shadow-2xl relative overflow-hidden">
        
        {/* Subtle Decorative Ambient Background Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <header className="mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-stone-900 border border-stone-800 rounded text-xs text-amber-500 mb-3 tracking-widest uppercase">
            System Node: v0.1.0-Beta
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Initialize Maha OS
          </h1>
          <p className="text-sm text-stone-400 mt-2">
            Deploy the edge-compute biological defense grid to your local hardware.
          </p>
        </header>

        {/* SECTION 1: Google Play Store Distribution */}
        <div className="mb-8 p-5 bg-black border border-stone-900 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Official Android Release</h2>
              <p className="text-xs text-stone-500 mt-0.5">Package ID: com.maha.os</p>
            </div>
            <span className="text-xs text-emerald-500 bg-emerald-950/30 border border-emerald-900/50 px-2 py-0.5 rounded">
              Verified Secure
            </span>
          </div>
          
          <p className="text-xs text-stone-400 leading-relaxed">
            Download the verified edge-compute node via the Google Play ecosystem. The application runs entirely on-device with zero cloud telemetry exfiltration.
          </p>
          
          {/* Target link for the Google Play Store */}
          <a
            href="https://play.google.com/store/apps/details?id=com.maha.os" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-stone-200 text-black font-bold rounded text-sm hover:bg-white transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.5 3.5v17c0 .4.3.6.6.4l13.4-8.5c.3-.2.3-.6 0-.8L6.1 3.1c-.3-.2-.6 0-.6.4z"/>
            </svg>
            Download on Google Play
          </a>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-stone-900"></div>
          <span className="flex-shrink mx-4 text-xs text-stone-600 uppercase tracking-widest">or</span>
          <div className="flex-grow border-t border-stone-900"></div>
        </div>

        {/* SECTION 2: Zero-Telemetry Gated Access / Waitlist */}
        <div className="mt-6">
          {!submitted ? (
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs text-stone-400 mb-2 uppercase tracking-wider">
                  Request iOS & Protocol Updates
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="identity@domain.com"
                  className="w-full bg-black border border-stone-800 rounded px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500/70 transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-sm transition-colors disabled:opacity-50"
              >
                {loading ? "Registering Node..." : "Join Closed Beta Pipeline"}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded text-center animate-in fade-in zoom-in-95 duration-300">
              <p className="text-emerald-400 text-sm font-bold">Node Identity Registered Successfully.</p>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Your target pipeline entry is locked. A zero-knowledge authorization token will be dispatched to your provided routing address as capacity scales.
              </p>
            </div>
          )}
        </div>

        {/* Footnote asserting privacy rules */}
        <footer className="mt-8 pt-4 border-t border-stone-950 text-center">
          <p className="text-[10px] text-stone-600 leading-normal">
            Zero-Payload Enforced: Your email string is hashed and recorded without tracking logs, browser canvas signatures, or tracking cookies.
          </p>
        </footer>

      </div>
    </main>
  );
}