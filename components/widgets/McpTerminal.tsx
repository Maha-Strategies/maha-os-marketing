"use client";

import { useState, useEffect, useRef } from "react";

export default function McpTerminal() {
  const [phase, setPhase] = useState<"idle" | "simulating" | "intervention" | "converted">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [breathText, setBreathText] = useState("Inhale...");
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the terminal to the bottom as new logs appear
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleSimulate = () => {
    setPhase("simulating");
    setLogs([]);

    const simulationSteps = [
      { delay: 400, text: "> Initiating local MCP handshake..." },
      { delay: 1200, text: "> Connected to edge stream: https://mcp.maha-os.com/mcp/sse" },
      { delay: 2000, text: "> Authorized agent connected. Awaiting telemetry..." },
      { delay: 2800, text: "> Reading resource: maha://telemetry/current" },
      { delay: 3500, text: "> BASELINE: RHR 62bpm | HRV 85ms | Decision Velocity: 8/10" },
      { delay: 5000, text: "> [USER ACTION] Continuous doomscrolling detected (Duration: 14m)." },
      { delay: 6500, text: "> WARNING: Focus Fragmentation signature matched." },
      { delay: 7200, text: "> TELEMETRY SPIKE: RHR 98bpm | HRV plummeting." },
      { delay: 8000, text: "> Executing tool: trigger_circuit_breaker({ severity: 'critical' })" },
    ];

    // Play terminal sequence
    simulationSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
        // Trigger the breathing intervention exactly after the last log
        if (index === simulationSteps.length - 1) {
          setTimeout(() => initiateIntervention(), 800);
        }
      }, step.delay);
    });
  };

  const initiateIntervention = () => {
    setPhase("intervention");
    
    // Manage the 4-second breathing text logic
    setTimeout(() => setBreathText("Exhale..."), 2000);
    
    // Complete intervention and show CTA after 4 seconds
    setTimeout(() => {
      setPhase("converted");
    }, 4000);
  };

  return (
    <div className="relative my-12 overflow-hidden rounded-xl border border-stone-800 bg-[#0A0A0A] shadow-2xl font-mono text-sm">
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800 bg-[#121212]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-stone-600"></div>
          <div className="w-3 h-3 rounded-full bg-stone-600"></div>
          <div className="w-3 h-3 rounded-full bg-stone-600"></div>
        </div>
        <span className="text-stone-500 text-xs">maha-os-agent-node</span>
      </div>

      {/* Terminal Window */}
      <div className="p-6 h-64 overflow-y-auto bg-black text-stone-300">
        {phase === "idle" && (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-stone-400 text-center max-w-sm">
              Initialize an MCP local agent simulation to test the Cognitive Circuit Breaker.
            </p>
            <button
              onClick={handleSimulate}
              className="px-6 py-2 bg-stone-200 text-black font-bold rounded hover:bg-white transition-colors"
            >
              Simulate Bio-Stress Event
            </button>
          </div>
        )}

        {(phase === "simulating" || phase === "intervention") && (
          <div className="space-y-2 font-mono text-xs md:text-sm">
            {logs.map((log, i) => (
              <div 
                key={i} 
                className={`${log.includes('WARNING') || log.includes('SPIKE') ? 'text-amber-500' : 'text-stone-300'}`}
              >
                {log}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}

        {phase === "converted" && (
          <div className="flex flex-col items-center justify-center h-full space-y-6 animate-in fade-in zoom-in duration-500">
             <div className="text-emerald-500 font-bold text-center">
               <p>Simulation Complete.</p>
               <p className="text-stone-300 font-normal mt-2">
                 This was a simulation. To protect your real biological telemetry from algorithmic extraction, connect Maha OS to your local health data.
               </p>
             </div>
             <a 
               href="/beta-signup" 
               className="px-8 py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-500 transition-colors"
             >
               Install Maha OS Beta
             </a>
          </div>
        )}
      </div>

      {/* INTERVENTION OVERLAY: The 4-Second Breathing Audit */}
      {phase === "intervention" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center space-y-8">
            <h3 className="text-amber-500 font-bold tracking-widest text-xs uppercase animate-pulse">
              Mandatory Parasympathetic Audit
            </h3>
            
            {/* CSS-based expanding/contracting circle */}
            <div className="relative flex items-center justify-center w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-stone-200 opacity-20 animate-[ping_2s_ease-in-out_infinite]" />
              <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center transition-transform duration-[2000ms] ease-in-out scale-100 peer-checked:scale-150">
                 <span className="text-black font-bold text-xs">{breathText}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}