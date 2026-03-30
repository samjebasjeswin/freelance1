import { Truck, ShieldCheck, Headset, CreditCard } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FEATURES = [
  { id: 1, icon: <Truck size={36} strokeWidth={1} />, title: "COMPLIMENTARY SHIPPING", desc: "Global delivery on all orders" },
  { id: 2, icon: <ShieldCheck size={36} strokeWidth={1} />, title: "SECURE CHECKOUT", desc: "Encrypted payment gateways" },
  { id: 3, icon: <Headset size={36} strokeWidth={1} />, title: "CLIENT SERVICES", desc: "Support information" },
  { id: 4, icon: <CreditCard size={36} strokeWidth={1} />, title: "FLEXIBLE PAYMENTS", desc: "Various payment options" },
];

export default function Features() {
  return (
    <ScrollReveal>
      <div className="w-full min-h-screen flex items-center px-6 py-24">
        <div className="container mx-auto">
          {/* Heading */}
          <p className="reveal text-center text-[11px] font-bold tracking-[0.5em] text-theme-accent uppercase mb-4">
            Why AM Crochet
          </p>
          <h2 className="reveal reveal-delay-1 text-center text-3xl md:text-5xl font-serif font-bold uppercase text-white mb-20 leading-tight">
            Crafted for every<br />
            <span className="text-theme-accent">journey</span>
          </h2>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.id}
                className="reveal reveal-scale group flex flex-col items-center text-center space-y-5 p-8 rounded-2xl border border-white/10 hover:border-theme-accent/40 bg-white/5 hover:bg-white/10 transition-all duration-500"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="text-theme-accent group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase text-white">
                  {feature.title}
                </h3>
                <p className="text-[12px] font-sans text-white/50 uppercase font-light tracking-[0.1em]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
