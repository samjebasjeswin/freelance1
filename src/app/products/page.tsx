import ProductCard, { Product } from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { getAllProductsAsync } from "@/lib/productsRepo";

export default async function ProductsPage() {
  const ALL_PRODUCTS: Product[] = await getAllProductsAsync();
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="flex flex-col items-center justify-center py-5 md:py-10 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-gray-900 sm:text-7xl uppercase">
            Our Collection
          </h1>
          <p className="mt-3 md:mt-5 max-w-xl text-base md:text-lg text-theme-faint font-sans font-light leading-relaxed tracking-wider uppercase px-2">
            Browse our entire collection of meticulously crafted bags.
          </p>
        </div>

        <div className="space-y-12">
          <ProductFilters count={ALL_PRODUCTS.length} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ALL_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
