"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const COLLECTIONS = [
  { id: "winter-24", title: "Winter 24", subtitle: "MORNING SALE IS LIVE", image: "/assets/hero_bag.png", count: 12 },
  { id: "artisan-series", title: "Artisan Series", subtitle: "CRAFTED WITH PRECISION", image: "/assets/promo_banner.png", count: 8 },
  { id: "classic-crochet", title: "Classic Crochet", subtitle: "TIMELESS ELEGANCE", image: "/assets/bag_1.png", count: 15 },
  { id: "daily-luxe", title: "Daily Luxe", subtitle: "EVERYDAY VERSATILITY", image: "/assets/bag_2.png", count: 10 },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 animate-reveal">
      <div className="container mx-auto px-6 space-y-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-[12px] font-bold tracking-[0.4em] text-theme-accent uppercase">Explore Our World</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-theme-text leading-tight uppercase">
            Curated Collections<span className="text-theme-accent">.</span>
          </h1>
          <p className="text-lg text-theme-faint font-sans font-light leading-relaxed tracking-wider uppercase max-w-xl">
             Discover the artistry behind each stitch and the story behind every design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {COLLECTIONS.map((c, index) => (
            <Link 
              key={c.id} 
              href={`/products?collection=${c.id}`}
              className="group relative h-[60vh] rounded-3xl overflow-hidden shadow-premium"
            >
              <Image 
                src={c.image} 
                alt={c.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000 origin-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16 text-white space-y-4 transition-all duration-500 group-hover:pb-20">
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-80">{c.subtitle}</p>
                <h3 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-tight">{c.title}</h3>
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-[11px] font-bold tracking-widest border border-white/30 px-3 py-1.5 rounded-full backdrop-blur-md uppercase">
                    {c.count} ITEMS
                  </span>
                  <div className="flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase group-hover:text-theme-accent transition-colors">
                    Explore Now <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Feature Banner Section */}
        <div className="relative rounded-3xl overflow-hidden bg-theme-text p-12 md:p-24 text-center space-y-8 shadow-2xl">
           <div className="relative z-10 space-y-4">
             <h2 className="text-2xl md:text-4xl font-serif font-bold text-theme-bg uppercase tracking-widest">
               Bespoke Craftsmanship
             </h2>
             <p className="text-theme-bg/60 text-sm md:text-base font-sans font-light tracking-[0.2em] uppercase max-w-2xl mx-auto">
               Can't find exactly what you're looking for? Contact us for exclusive custom orders tailored to your unique style.
             </p>
             <button className="inline-block bg-theme-accent text-white px-10 py-4 rounded-full text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-theme-text transition-all mt-6 shadow-xl">
               Contact Artisan
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
