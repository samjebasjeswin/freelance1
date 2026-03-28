import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero_bag.png"
          alt="Luxury Crochet Collection"
          fill
          className="object-cover transition-transform duration-[20s] hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-white">
        <div className="max-w-4xl space-y-6 animate-reveal">
          <p className="text-[13px] md:text-[14px] font-sans font-medium tracking-[0.4em] uppercase opacity-90">
            MORNING SALE
          </p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] uppercase tracking-[-0.02em]">
            WINTER COLLECTIONS
          </h1>
          <p className="text-[16px] md:text-[18px] font-sans font-light tracking-[0.1em] opacity-80 uppercase">
            SALE IS LIVE NOW
          </p>
          <div className="pt-8">
            <Link 
              href="/collections" 
              className="inline-block bg-white text-theme-text px-10 py-4 rounded-full text-[14px] font-sans font-medium hover:bg-theme-accent hover:text-white transition-all transform hover:scale-105"
            >
              DISCOVER NOW
            </Link>
          </div>
        </div>
      </div>
      
      {/* Slider dots indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        <div className="w-10 h-1 rounded-full bg-white" />
        <div className="w-2 h-1 rounded-full bg-white/40" />
      </div>
    </section>
  );
}
