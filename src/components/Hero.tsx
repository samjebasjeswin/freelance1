"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-[95vh] flex items-center overflow-hidden bg-theme-text perspective-scene">
      <div 
        className="absolute inset-0 z-0 scale-110 preserve-3d"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px) translateZ(-100px) rotateX(${mousePos.y * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <Image
          src="/assets/hero_bag.png"
          alt="Luxury Crochet Collection"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-white preserve-3d">
        <div 
          className="max-w-4xl space-y-8 animate-reveal"
          style={{ 
            transform: `translateZ(50px) rotateX(${-mousePos.y * 0.2}deg) rotateY(${-mousePos.x * 0.2}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="space-y-4">
            <p className="text-[12px] md:text-[14px] font-sans font-bold tracking-[0.5em] uppercase opacity-80 decoration-theme-accent underline decoration-2 underline-offset-8">
              Artisan Exhibition 2024
            </p>
            <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] uppercase tracking-tighter drop-shadow-2xl">
              Timeless<br/>
              <span className="text-theme-accent">Artistry.</span>
            </h1>
          </div>

          <p className="text-[16px] md:text-[20px] font-sans font-light tracking-[0.15em] opacity-90 uppercase max-w-2xl leading-relaxed">
            Elevate your journey with our meticulously handcrafted crochet collection. Where tradition meets modern luxury.
          </p>

          <div className="pt-10 flex flex-wrap gap-6 preserve-3d">
            <Link 
              href="/collections" 
              className="group relative inline-block bg-white text-theme-text px-12 py-5 rounded-full text-[14px] font-sans font-bold hover:bg-theme-accent hover:text-white transition-all transform hover:scale-110 hover:-translate-y-2 active:scale-95 shadow-2xl overflow-hidden preserve-3d"
              style={{ transform: "translateZ(80px)" }}
            >
              <span className="relative z-10">DISCOVER COLLECTIONS</span>
              <div className="absolute inset-0 bg-theme-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 origin-bottom" />
            </Link>
            <Link 
              href="/products" 
              className="inline-block border border-white/30 backdrop-blur-md text-white px-12 py-5 rounded-full text-[14px] font-sans font-bold hover:bg-white hover:text-theme-text transition-all hover:scale-105 active:scale-95 preserve-3d"
              style={{ transform: "translateZ(30px)" }}
            >
              BROWSE ALL
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - floating in 3D */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50"
        style={{ transform: "translateZ(100px)" }}
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase vertical-text">Scroll</span>
        <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
}
