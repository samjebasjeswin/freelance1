"use client";

import { useState } from "react";

export default function InitDbButton() {
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const runInit = async () => {
    setStatus("running");
    setError(null);
    try {
      const res = await fetch("/api/admin/db/init", { method: "POST", credentials: "include" });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Init failed");
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Init failed");
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={runInit}
        disabled={status === "running" || status === "done"}
        className="bg-theme-text text-theme-bg px-6 py-3 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all disabled:opacity-60"
      >
        {status === "running" ? "Initializing..." : status === "done" ? "DB Initialized" : "Initialize Database"}
      </button>
      {status === "error" && (
        <div className="text-sm text-red-700 bg-red-500/10 border border-red-500/30 p-3 rounded-2xl">
          {error}
        </div>
      )}
      {status === "done" && (
        <div className="text-sm text-green-700 bg-green-500/10 border border-green-500/30 p-3 rounded-2xl">
          Tables created successfully.
        </div>
      )}
    </div>
  );
}

