import { Truck, ShieldCheck, Headset, CreditCard } from "lucide-react";

const FEATURES = [
  { id: 1, icon: <Truck size={32} strokeWidth={1} />, title: "COMPLIMENTARY SHIPPING", desc: "Global delivery on all orders" },
  { id: 2, icon: <ShieldCheck size={32} strokeWidth={1} />, title: "SECURE CHECKOUT", desc: "Encrypted payment gateways" },
  { id: 3, icon: <Headset size={32} strokeWidth={1} />, title: "CLIENT SERVICES", desc: "Support information" },
  { id: 4, icon: <CreditCard size={32} strokeWidth={1} />, title: "FLEXIBLE PAYMENTS", desc: "Various payment options" },
];

export default function Features() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {FEATURES.map((feature) => (
          <div key={feature.id} className="group flex flex-col items-center text-center space-y-4 p-8 rounded-2xl hover:bg-theme-card hover:shadow-premium transition-all">
            <div className="text-theme-text group-hover:text-theme-accent transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase">
              {feature.title}
            </h3>
            <p className="text-[12px] font-sans text-theme-faint uppercase font-light tracking-[0.1em]">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
