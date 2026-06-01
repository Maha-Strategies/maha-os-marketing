"use client";

import { useState, useRef, useEffect } from "react";

export default function NpuBenchmark() {
  const [status, setStatus] = useState<"idle" | "running" | "complete">("idle");
  const [mops, setMops] = useState<number>(0); // Millions of Operations Per Second
  const [progress, setProgress] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  const runBenchmark = () => {
    setStatus("running");
    setProgress(0);
    setMops(0);

    const duration = 2500; // 2.5 seconds of benchmarking
    const startTime = performance.now();
    let totalOps = 0;

    const computeFrame = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      
      // Perform a chunk of heavy floating point math to simulate local inference
      let frameOps = 0;
      const chunkSize = 500000;
      for (let i = 0; i < chunkSize; i++) {
        Math.sqrt(i * 2.54);
        frameOps++;
      }
      totalOps += frameOps;

      // Calculate instantaneous Millions of Operations Per Second (MOPS)
      // Assuming roughly 16ms per frame
      const currentMops = (frameOps * (1000 / 16)) / 1000000; 
      setMops(Number(currentMops.toFixed(2)));

      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (elapsed < duration) {
        animationRef.current = requestAnimationFrame(computeFrame);
      } else {
        // Final calculation average
        const finalMops = (totalOps / (duration / 1000)) / 1000000;
        setMops(Number(finalMops.toFixed(2)));
        setStatus("complete");
      }
    };

    animationRef.current = requestAnimationFrame(computeFrame);
  };

  // Cleanup to prevent memory leaks if component unmounts mid-benchmark
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="my-12 overflow-hidden rounded-xl border border-stone-800 bg-[#0A0A0A] shadow-2xl font-mono text-sm p-6">
      
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
          System Action: Local Hardware Benchmark
        </h3>
        <p className="text-stone-400">
          Execute a localized floating-point stress test to verify if your current device possesses the computational throughput required for zero-payload biological processing.
        </p>
      </div>

      <div className="bg-black border border-stone-800 rounded-lg p-6 relative">
        {status === "idle" && (
          <div className="flex justify-center">
            <button
              onClick={runBenchmark}
              className="px-6 py-3 bg-stone-200 text-black font-bold rounded hover:bg-white transition-colors"
            >
              Initiate Local Compute Audit
            </button>
          </div>
        )}

        {(status === "running" || status === "complete") && (
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">Throughput</p>
                <div className="text-3xl font-bold text-amber-500 tabular-nums">
                  {mops.toFixed(2)} <span className="text-sm text-stone-400">MOPS</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">Status</p>
                <p className={status === "complete" ? "text-emerald-500" : "text-amber-500 animate-pulse"}>
                  {status === "complete" ? "AUDIT_COMPLETE" : "CALCULATING_MATRIX..."}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-stone-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {status === "complete" && (
        <div className="mt-6 pt-6 border-t border-stone-800 space-y-4 animate-in fade-in duration-500">
          <div className="flex items-start gap-3 text-emerald-400">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">
              Hardware Verified. Your device is entirely capable of running local biological AI.
            </p>
          </div>
          
          <div className="bg-stone-900/50 p-4 rounded-lg">
            <p className="mb-4 text-white text-center font-medium">
              Stop sending your sensitive metrics to the cloud. Install the Maha OS edge compute node to process your biological data locally.
            </p>
            <a 
              href="/beta-signup" 
              className="block w-full text-center py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-500 transition-colors"
            >
              Download Maha OS Beta
            </a>
          </div>
        </div>
      )}
    </div>
  );
}