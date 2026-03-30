"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminNewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [badge, setBadge] = useState("");
  const [timer, setTimer] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          image,
          badge: badge.trim() ? badge : null,
          timer: timer.trim() ? timer : null,
          category: category.trim() ? category : undefined,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/admin/products?created=1");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create product";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 animate-reveal">
      <div className="max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">
            Create Product
          </h1>
          <p className="text-theme-faint text-sm">
            Add product details. Image should be an existing public URL (example: <code>/assets/bag_1.png</code>).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Product Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="e.g. Aj Bags"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Price
            </label>
            <input
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder='e.g. ₹ 1,599.00'
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Image URL
            </label>
            <input
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="/assets/bag_1.png"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                Badge (optional)
              </label>
              <input
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                placeholder="e.g. NEW"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                Timer (optional)
              </label>
              <input
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                placeholder="e.g. 3011H 04M 17S"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Category (optional)
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="e.g. handbags"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all shadow-xl disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

