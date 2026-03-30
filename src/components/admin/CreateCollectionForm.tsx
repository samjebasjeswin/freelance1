"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/components/ProductCard";

type Props = {
  products: Product[];
};

export default function CreateCollectionForm({ products }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const toggleProduct = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);
    try {
      if (!name.trim()) throw new Error("Collection name is required");

      const res = await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), productIds: selected }),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string };
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to create collection");
      }

      router.push("/admin/collections?created=1");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create collection";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700">{error}</div>
      )}

      <div className="space-y-2">
        <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
          Collection Name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
          placeholder="e.g. Handbags Summer"
        />
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
          Link Products
        </div>
        <div className="max-h-[360px] overflow-auto border border-theme-border/50 rounded-3xl bg-white/60 p-4 space-y-3">
          {products.map((p) => {
            const id = Number(p.id);
            const checked = selected.includes(id);
            return (
              <label key={String(p.id)} className="flex items-center justify-between gap-3 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleProduct(id)}
                  />
                  <span className="text-[13px] font-bold text-theme-text uppercase">{p.name}</span>
                </div>
                <span className="text-[12px] text-theme-faint">{p.price}</span>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-theme-faint pt-2">
          Selected: <span className="font-semibold">{selected.length}</span>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all shadow-xl disabled:opacity-60"
      >
        {isSaving ? "Saving..." : "Create Collection"}
      </button>
    </form>
  );
}

