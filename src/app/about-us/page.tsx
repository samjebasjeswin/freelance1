import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutUsPage() {
  return (
    <div className="bg-theme-bg w-full min-h-screen text-theme-text pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/promo_banner.png"
            alt="About AM Crochet"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-theme-bg/30 backdrop-blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-theme-bg to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 animate-reveal">
          <p className="text-[12px] md:text-[14px] font-sans font-bold tracking-[0.5em] uppercase text-theme-accent mb-6">
            Heritage & Craft
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight uppercase text-theme-text drop-shadow-lg">
            Our Story
          </h1>
        </div>
      </section>

      {/* The Story Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <ScrollReveal>
            <div className="reveal reveal-left space-y-8 max-w-xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight uppercase">
                A Legacy of <br/>
                <span className="text-theme-accent inline-block mt-2">Meticulous Craft</span>
              </h2>
              <div className="space-y-6 text-[15px] font-sans font-light leading-relaxed text-theme-faint">
                <p>
                  At AM Crochet, we believe that true luxury is not manufactured; it is carefully, patiently crafted by hand. Born from a passion for enduring design and traditional artistry, our brand creates pieces that are meant to be cherished for generations.
                </p>
                <p>
                  Every stitch, every loop, and every finish reflects hours of dedicated craftsmanship. We source only the finest sustainable yarns and premium leather, merging authentic heritage techniques with a distinctly modern aesthetic.
                </p>
              </div>
              <div className="pt-4">
                <Image 
                  src="/assets/signature.png" 
                  alt="Founder Signature" 
                  width={150} 
                  height={60} 
                  className="opacity-60 grayscale"
                />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase mt-4 text-theme-text">Founder & Lead Artisan</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="reveal reveal-right relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-premium">
              <Image
                src="/assets/bag_1.png"
                alt="Artisan crafting a bag"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 border-[1px] border-white/20 rounded-[2rem] m-4 pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="bg-theme-text text-white py-24 md:py-32">
        <ScrollReveal>
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <p className="reveal text-[11px] font-bold tracking-[0.4em] text-theme-accent uppercase mb-4">
                Our Philosophy
              </p>
              <h2 className="reveal reveal-delay-1 text-3xl md:text-5xl font-serif font-bold uppercase">
                The AM Standard
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
              {[
                { title: 'Exquisite Materials', desc: 'Sourced globally, selected locally. We only work with the finest, most durable fibers available.' },
                { title: 'Zero Compromise', desc: 'Each piece undergoes a rigorous artisan review process. If it isn’t perfect, it doesn’t leave our atelier.' },
                { title: 'Sustainable Luxury', desc: 'Slow fashion by definition. We create enduring pieces that defy trend cycles and stand the test of time.' }
              ].map((val, i) => (
                <div key={val.title} className="reveal reveal-scale p-8 border border-white/10 rounded-2xl hover:border-theme-accent/50 transition-colors" style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className="w-12 h-12 rounded-full border border-theme-accent flex items-center justify-center text-theme-accent font-serif text-xl mx-auto mb-6">
                    0{i + 1}
                  </div>
                  <h3 className="text-[14px] font-bold tracking-[0.15em] uppercase mb-4">{val.title}</h3>
                  <p className="text-[13px] font-light text-white/60 leading-relaxed font-sans">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Finishing CTA */}
      <ScrollReveal>
        <section className="reveal py-32 text-center container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase mb-10">
            Experience the <span className="text-theme-accent italic">Craft</span>
          </h2>
          <Link
            href="/collections"
            className="inline-block bg-theme-text text-white px-12 py-5 rounded-full text-[13px] font-sans font-bold hover:bg-theme-accent hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
          >
            DISCOVER COLLECTIONS
          </Link>
        </section>
      </ScrollReveal>
    </div>
  );
}
