"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("root");
  const [password, setPassword] = useState("root");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 animate-reveal">
      <div className="container mx-auto px-6 max-w-md space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">
            Admin Login
          </h1>
          <p className="text-sm text-theme-faint">
            Username: <span className="font-semibold">root</span>, Password: <span className="font-semibold">root</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="root"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="root"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all shadow-xl disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

