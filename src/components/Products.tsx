import Link from "next/link";
import { MoveRight } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";

const HOME_PRODUCTS: Product[] = [
  { id: 1, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_1.png", badge: "20% OFF", timer: "3011H 04M 17S" },
  { id: 2, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_2.png", badge: null, timer: null },
  { id: 3, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_3.png", badge: null, timer: null },
];

export default function Products() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto space-y-12">
        <div className="flex justify-between items-baseline border-b border-theme-border pb-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight uppercase">
            Special Combos
          </h2>
          <Link href="/products" className="group flex items-center gap-2 text-[14px] font-sans font-medium hover:text-theme-accent transition-colors uppercase">
            View All <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOME_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
