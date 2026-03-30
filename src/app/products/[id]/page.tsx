"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Heart, Share2, ShieldCheck, Truck, RefreshCcw, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Product } from "@/components/ProductCard";

const ALL_PRODUCTS: Product[] = [
  { id: 1, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_1.png", badge: "20% OFF", timer: "3011H 04M 17S", category: "handbags" },
  { id: 2, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_2.png", badge: null, timer: null, category: "handbags" },
  { id: 3, name: "Aj Bags", price: "₹ 1,599.00", image: "/assets/bag_3.png", badge: null, timer: null, category: "handbags" },
  { id: 4, name: "Luxury Tote", price: "₹ 2,499.00", image: "/assets/hero_bag.png", badge: "NEW", timer: null, category: "handbags" },
  { id: 5, name: "Work Hour Bag", price: "₹ 1,899.00", image: "/assets/promo_banner.png", badge: null, timer: null, category: "handbags" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen pt-24 pb-20 animate-reveal">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-10 flex items-center gap-4">
          <Link href="/products" className="group flex items-center gap-2 text-[11px] font-bold tracking-widest text-theme-faint hover:text-theme-accent transition-colors uppercase">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>
          <div className="w-1 h-1 rounded-full bg-theme-border" />
          <span className="text-[11px] font-bold tracking-widest text-theme-text uppercase">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-premium">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
              {product.badge && (
                <div className="absolute top-8 left-8 bg-black text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase">
                  {product.badge}
                </div>
              )}
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-theme-bg/50 border border-theme-border/30 overflow-hidden cursor-pointer hover:border-theme-accent transition-all">
                  <Image src={product.image} alt="thumbnail" width={100} height={100} className="object-cover opacity-50 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-[12px] font-bold tracking-[0.4em] text-theme-accent uppercase">Handcrafted Legacy</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-theme-text leading-tight uppercase">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mt-4">
                <span className="text-3xl font-serif font-bold text-theme-text">{product.price}</span>
                <span className="text-[14px] text-theme-faint font-light line-through uppercase">₹ 1,999.00</span>
              </div>
            </div>

            <p className="text-[15px] font-sans text-theme-faint leading-relaxed font-light">
              Meticulously handcrafted using our signature crochet technique, this piece embodies timeless elegance and enduring craftsmanship. Each stitch is a testament to the artisan's dedication, featuring premium cotton-blend fibers and reinforced structural padding for a silhouette that retains its form through daily journeys.
            </p>

            <div className="space-y-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-6">
                <span className="text-[12px] font-bold tracking-widest uppercase">Quantity</span>
                <div className="flex items-center border border-theme-border rounded-full px-4 py-2 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-theme-faint hover:text-theme-text transition-colors">-</button>
                  <span className="w-12 text-center text-[13px] font-bold tracking-widest">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-theme-faint hover:text-theme-text transition-colors">+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-grow bg-theme-text text-theme-bg py-5 rounded-full text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all flex items-center justify-center gap-3">
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>
                <button className="p-5 border border-theme-border rounded-full hover:bg-theme-bg transition-all group">
                  <Heart size={20} className="text-theme-faint group-hover:text-red-500 transition-colors" />
                </button>
                <button className="p-5 border border-theme-border rounded-full hover:bg-theme-bg transition-all group">
                  <Share2 size={20} className="text-theme-faint group-hover:text-theme-accent transition-colors" />
                </button>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-theme-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-bg rounded-xl text-theme-accent">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold tracking-wider uppercase">Authenticity Guaranteed</h4>
                  <p className="text-[11px] text-theme-faint mt-1">Certified artisan handicraft</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-bg rounded-xl text-theme-accent">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold tracking-wider uppercase">Express Delivery</h4>
                  <p className="text-[11px] text-theme-faint mt-1">Next day shipping available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
