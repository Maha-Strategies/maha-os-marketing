"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase'; // Updated path
import { ShieldCheck, Terminal, AlertTriangle } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ type: 'loading', message: 'VALIDATING SYSTEM NODE...' });

    try {
      const { error } = await supabase
        .from('ios_vanguard_waitlist')
        .insert([{ email: email }]);

      if (error) {
        console.error("Supabase Rejection:", error);
        setStatus({
          type: 'error',
          message: '[SYSTEM ERROR] Data rejected. You may already be initialized.'
        });
      } else {
        setStatus({
          type: 'success',
          message: '[NODE SECURED] You are registered on the iOS Vanguard list.'
        });
        setEmail('');
      }
    } catch (fatalError) {
      console.error("Fatal Architecture Error:", fatalError);
      setStatus({
        type: 'error',
        message: '[FATAL ERROR] Connection blocked by browser shields. Disable to join Vanguard.'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border border-zinc-800 bg-neutral-900/50 p-6 sm:p-8 font-mono">
      <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-3">
        <Terminal className="w-4 h-4 text-[#E6C687]" />
        <span className="text-xs text-stone-400 uppercase tracking-widest">INITIALIZE VANGUARD PROTOCOL</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status.type === 'loading' || status.type === 'success'}
            placeholder="ENTER ENCRYPTED EMAIL"
            required
            className="w-full bg-black border border-zinc-800 text-stone-100 placeholder-zinc-600 px-4 py-3 text-xs focus:outline-none focus:border-zinc-500 font-mono tracking-wider transition-colors disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={status.type === 'loading' || status.type === 'success'}
          className="w-full bg-stone-100 text-black font-bold text-xs tracking-widest uppercase py-4 hover:bg-stone-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status.type === 'loading' ? 'INITIALIZING...' : status.type === 'success' ? 'SECURED' : 'INITIALIZE NODE ↗'}
        </button>
      </form>

      {status.type !== 'idle' && (
        <div className={`mt-4 text-[10px] sm:text-xs uppercase tracking-wider flex items-start gap-2 p-3 border ${
          status.type === 'success' ? 'bg-emerald-950/20 border-emerald-900/50 text-[#E6C687]' :
          status.type === 'error' ? 'bg-rose-950/20 border-rose-900/50 text-[#C25E4E]' :
          'bg-zinc-950 border-zinc-800 text-stone-500'
        }`}>
          {status.type === 'success' && <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />}
          {status.type === 'error' && <AlertTriangle className="w-4 h-4 shrink-0 text-[#C25E4E]" />}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}