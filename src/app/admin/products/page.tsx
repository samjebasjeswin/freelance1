import Link from "next/link";
import { getAllProductsAsync } from "@/lib/productsRepo";
import type { Product } from "@/components/ProductCard";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: { created?: string };
}) {
  const ALL_PRODUCTS: Product[] = await getAllProductsAsync();
  const created = searchParams?.created === "1";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">
            Products
          </h1>
          <p className="text-sm text-theme-faint">
            Total: <span className="font-semibold">{ALL_PRODUCTS.length}</span>
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="shrink-0 bg-theme-text text-theme-bg px-6 py-3 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all"
        >
          Add Product
        </Link>
      </div>

      {created && (
        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-700">
          Product created successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {ALL_PRODUCTS.map((p) => (
          <div key={String(p.id)} className="border border-theme-border/50 rounded-3xl bg-white/70 overflow-hidden">
            <div className="relative aspect-[4/3] bg-theme-bg/20">
              {/* Using a simple img tag for admin preview */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif font-bold text-theme-text uppercase">{p.name}</h3>
                <span className="text-[11px] font-bold tracking-widest text-theme-faint uppercase">
                  ID {p.id}
                </span>
              </div>
              <div className="text-theme-faint text-sm">Price: {p.price}</div>
              <div className="flex gap-2 pt-1">
                <Link
                  href={`/products/${p.id}`}
                  className="text-[12px] font-bold tracking-[0.1em] text-theme-accent hover:underline uppercase"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

