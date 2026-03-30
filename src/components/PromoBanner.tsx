import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function PromoBanner() {
  return (
    <ScrollReveal>
      <div className="w-full min-h-screen flex items-center px-6 py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden rounded-[2.5rem] shadow-premium">
          {/* Image side — slides in from left */}
          <div className="reveal reveal-left relative h-[450px] md:h-auto overflow-hidden">
            <Image
              src="/assets/promo_banner.png"
              alt="Work Hour Collection"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-white/80 px-4 py-2 font-sans font-semibold text-[10px] tracking-widest uppercase rounded-md">
              WORK HOUR
            </div>
          </div>

          {/* Text side — slides in from right */}
          <div className="p-10 md:p-20 flex flex-col justify-center space-y-6">
            <p className="reveal reveal-right text-[13px] font-sans font-medium tracking-[0.2em] text-theme-faint uppercase">
              WOMEN
            </p>
            <h2 className="reveal reveal-right reveal-delay-1 text-4xl md:text-5xl font-serif font-bold uppercase leading-tight text-theme-text">
              BEST BAGS FOR SALE
            </h2>
            <p className="reveal reveal-right reveal-delay-2 text-[15px] font-sans text-theme-faint uppercase font-light tracking-[0.1em]">
              SUMMER SALE HAS STARTED
            </p>
            <div className="reveal reveal-right reveal-delay-3 bg-[#e9decf]/50 px-6 py-2.5 rounded-full inline-block text-[13px] font-semibold text-[#8b6e4d] w-fit">
              Up to 20% OFF
            </div>
            <div className="reveal reveal-right reveal-delay-4 flex gap-4 pt-6">
              <Link
                href="/shop"
                className="bg-black text-white px-8 py-3.5 rounded-full text-[13px] font-medium hover:bg-theme-accent transition-all"
              >
                SHOP NOW
              </Link>
              <Link
                href="/explore"
                className="border border-black text-black px-8 py-3.5 rounded-full text-[13px] font-medium hover:bg-black hover:text-white transition-all"
              >
                EXPLORE MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
