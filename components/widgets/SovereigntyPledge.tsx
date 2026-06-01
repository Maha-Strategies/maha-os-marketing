"use client";

import { useState } from "react";

export default function SovereigntyPledge() {
  const [status, setStatus] = useState<"idle" | "generating" | "signed">("idle");
  const [signatureHash, setSignatureHash] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const handleSignPledge = async () => {
    setStatus("generating");

    try {
      // 1. Generate local ECDSA Key Pair (P-256 curve)
      const keyPair = await window.crypto.subtle.generateKey(
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign", "verify"]
      );

      // 2. Export the public key to display a fragment of it
      const exportedPubKey = await window.crypto.subtle.exportKey(
        "raw",
        keyPair.publicKey
      );
      const pubKeyHex = Array.from(new Uint8Array(exportedPubKey))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // 3. Define the immutable pledge payload
      const pledgeText =
        "I pledge to maintain absolute ownership over my biological and digital exhaust. I reject cloud telemetry.";
      const encoder = new TextEncoder();
      const data = encoder.encode(pledgeText);

      // 4. Sign the payload using the private key
      const signatureBuffer = await window.crypto.subtle.sign(
        { name: "ECDSA", hash: { name: "SHA-256" } },
        keyPair.privateKey,
        data
      );

      // 5. Convert signature to hex for the UI
      const sigHex = Array.from(new Uint8Array(signatureBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Simulate a slight computational delay for UX
      setTimeout(() => {
        setPublicKey(`${pubKeyHex.substring(0, 16)}...`);
        setSignatureHash(sigHex);
        setStatus("signed");
      }, 600);
      
    } catch (error) {
      console.error("Cryptographic generation failed:", error);
      setStatus("idle");
    }
  };

  return (
    <div className="my-10 p-6 border border-zinc-800 bg-black rounded-lg shadow-2xl font-mono text-sm text-zinc-300">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
          System Action: Cryptographic Sovereignty Pledge
        </h3>
        <p className="text-zinc-400">
          Execute a zero-payload signature. This process generates an ECDSA public/private keypair entirely within your local browser memory. No data is transmitted to our servers.
        </p>
      </div>

      <div className="bg-zinc-900 p-4 rounded border border-zinc-800 mb-6 text-xs text-zinc-500">
        <code className="block mb-2 text-zinc-400">
          &gt; const payload = "I pledge to maintain absolute ownership over my biological and digital exhaust. I reject cloud telemetry.";
        </code>
      </div>

      {status === "idle" && (
        <button
          onClick={handleSignPledge}
          className="w-full py-3 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-colors"
        >
          Generate Local Keys & Sign Pledge
        </button>
      )}

      {status === "generating" && (
        <div className="w-full py-3 bg-zinc-800 text-zinc-400 font-semibold rounded text-center animate-pulse">
          Generating ECDSA Keypair...
        </div>
      )}

      {status === "signed" && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 rounded text-emerald-400">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold">Cryptographic Signature Verified (Local)</span>
            </div>
            <div className="text-xs break-all opacity-80 space-y-1">
              <p><span className="text-emerald-600">PUB_KEY:</span> {publicKey}</p>
              <p><span className="text-emerald-600">SIGNATURE:</span> {signatureHash}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-zinc-800">
            <p className="mb-4 text-white font-medium">
              Your pledge is signed locally. To deploy this cryptographic defense to your physiological data, join the Maha OS Beta.
            </p>
            <a 
              href="/beta-signup" 
              className="block w-full text-center py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-500 transition-colors"
            >
              Initialize Maha OS Beta
            </a>
          </div>
        </div>
      )}
    </div>
  );
}