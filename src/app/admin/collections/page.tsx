import { getAllCollectionsAsync } from "@/lib/collectionsRepo";
import { getAllProductsAsync } from "@/lib/productsRepo";
import CreateCollectionForm from "@/components/admin/CreateCollectionForm";
import Link from "next/link";

export default async function AdminCollectionsPage({
  searchParams,
}: {
  searchParams?: { created?: string };
}) {
  const collections = await getAllCollectionsAsync();
  const products = await getAllProductsAsync();
  const created = searchParams?.created === "1";

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">Collections</h1>
        <p className="text-theme-faint text-sm">Create a collection name and link it with products.</p>
      </div>

      {created && (
        <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-700">
          Collection created successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-theme-border/50 rounded-3xl bg-white/60 p-6">
          <CreateCollectionForm products={products} />
        </div>

        <div className="space-y-4">
          {collections.length === 0 ? (
            <div className="p-6 border border-theme-border/50 rounded-3xl bg-white/60 text-theme-faint">
              No collections yet.
            </div>
          ) : (
            collections.map((c) => (
              <div key={c.id} className="p-6 border border-theme-border/50 rounded-3xl bg-white/60 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[13px] font-bold tracking-widest text-theme-faint uppercase">
                      Collection #{c.id}
                    </div>
                    <div className="text-lg font-serif font-bold text-theme-text uppercase">{c.name}</div>
                  </div>
                  <div className="text-theme-faint text-sm">
                    Products: <span className="font-semibold">{c.productIds.length}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {c.productIds.map((pid) => {
                    const prod = products.find((p) => Number(p.id) === pid);
                    if (!prod) return null;
                    return (
                      <Link
                        key={`${c.id}-${pid}`}
                        href={`/products/${pid}`}
                        className="px-3 py-1 rounded-full bg-theme-bg/30 border border-theme-border/50 text-[12px] font-bold tracking-[0.1em] uppercase text-theme-text hover:bg-theme-bg/50 transition-all"
                      >
                        {prod.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

