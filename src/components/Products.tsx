"use client";

import Link from "next/link";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "./ProductCard";
import ScrollReveal from "./ScrollReveal";
import { useRef } from "react";

const HOME_PRODUCTS: Product[] = [
  { id: 1, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_1.png", badge: "20% OFF", timer: "3011H 04M 17S" },
  { id: 2, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_2.png", badge: null, timer: null },
  { id: 3, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_3.png", badge: null, timer: null },
];

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <ScrollReveal>
      <div className="w-full min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto space-y-12">
          {/* Header */}
          <div className="reveal flex flex-col sm:flex-row justify-between sm:items-baseline border-b border-theme-border pb-6 gap-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight uppercase">
              Special Combos
            </h2>
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
              {/* Mobile Carousel Controls */}
              <div className="flex sm:hidden gap-3">
                <button
                  onClick={scrollLeft}
                  className="w-10 h-10 border border-theme-border rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-white hover:border-theme-accent active:scale-95 transition-all text-theme-text shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={scrollRight}
                  className="w-10 h-10 border border-theme-border rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-white hover:border-theme-accent active:scale-95 transition-all text-theme-text shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <Link
                href="/products"
                className="group flex items-center gap-2 text-[14px] font-sans font-medium hover:text-theme-accent transition-colors uppercase"
              >
                View All <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Product grid — each card stagger-reveals */}
          <div 
            ref={scrollRef}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth"
          >
            {HOME_PRODUCTS.map((product, i) => (
              <div
                key={product.id}
                className="reveal flex-none w-[85%] sm:w-auto snap-center"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
