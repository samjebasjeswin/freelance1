"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const latest = useRef({ scrollY: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const apply = () => {
      rafRef.current = null;
      const { scrollY, mouseX, mouseY } = latest.current;

      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translateY(${scrollY * 0.25}px) scale(1.15)`;
      }
      if (textLayerRef.current) {
        textLayerRef.current.style.transform = `translateY(${-scrollY * 0.1}px) rotateX(${-mouseY * 0.15}deg) rotateY(${-mouseX * 0.15}deg)`;
      }
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(apply);
    };

    const handleScroll = () => {
      latest.current.scrollY = window.scrollY;
      schedule();
    };

    const handleMouseMove = (e: MouseEvent) => {
      latest.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      latest.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      schedule();
    };

    // Initialize
    latest.current.scrollY = window.scrollY;
    schedule();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden bg-theme-text">
      {/* Parallax background image — moves slower than scroll */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 z-0"
        style={{ transition: "transform 0.15s linear", willChange: "transform", transform: "translateY(0px) scale(1.15)" }}
      >
        <Image
          src="/assets/hero_bag.png"
          alt="Luxury Crochet Collection"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/60 z-10" />
      </div>

      {/* Text — moves faster (independent parallax layer) */}
      <div
        ref={textLayerRef}
        className="container mx-auto px-6 relative z-20 text-white"
        style={{ transform: "translateY(0px) rotateX(0deg) rotateY(0deg)", transition: "transform 0.1s ease-out", perspective: "800px" }}
      >
        <div className="max-w-4xl space-y-8 animate-reveal">
          <div className="space-y-4">
            <p className="text-[12px] md:text-[14px] font-sans font-bold tracking-[0.5em] uppercase opacity-80 decoration-theme-accent underline decoration-2 underline-offset-8">
              Artisan Exhibition 2024
            </p>
            <h1 className="text-6xl md:text-[clamp(4rem,11vw,9rem)] font-serif font-bold leading-[0.9] uppercase tracking-tighter drop-shadow-2xl">
              Timeless<br />
              <span className="text-theme-accent">Artistry.</span>
            </h1>
          </div>

          <p className="text-[16px] md:text-[20px] font-sans font-light tracking-[0.15em] opacity-90 uppercase max-w-2xl leading-relaxed">
            Elevate your journey with our meticulously handcrafted crochet collection. Where tradition meets modern luxury.
          </p>

          <div className="pt-10 flex flex-wrap gap-6">
            <Link
              href="/collections"
              className="group relative inline-block bg-white text-theme-text px-12 py-5 rounded-full text-[14px] font-sans font-bold hover:bg-theme-accent hover:text-white transition-all transform hover:scale-110 hover:-translate-y-2 active:scale-95 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">DISCOVER COLLECTIONS</span>
              <div className="absolute inset-0 bg-theme-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 origin-bottom" />
            </Link>
            <Link
              href="/products"
              className="inline-block border border-white/30 backdrop-blur-md text-white px-12 py-5 rounded-full text-[14px] font-sans font-bold hover:bg-white hover:text-theme-text transition-all hover:scale-105 active:scale-95"
            >
              BROWSE ALL
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50 z-20">
        <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white" />
      </div>
    </div>
  );
}
