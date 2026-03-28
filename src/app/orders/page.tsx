import Link from "next/link";
import { Package, Search, ChevronRight } from "lucide-react";

const ORDERS = [
  { id: "#AMC-82741", date: "MAR 28, 2024", total: "₹ 1,599.00", status: "PROCESSING", items: 1 },
  { id: "#AMC-79234", date: "FEB 15, 2024", total: "₹ 3,198.00", status: "DELIVERED", items: 2 },
];

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-24 animate-reveal">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 border-b border-theme-border pb-8 text-center md:text-left">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-theme-text tracking-wide uppercase">
              Your Orders
            </h1>
            <p className="text-[13px] font-sans text-theme-faint font-light tracking-[0.1em] uppercase">
              MANAGE AND TRACK YOUR PURCHASES
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="SEARCH ORDERS..." 
              className="w-full bg-transparent border-b border-theme-border py-2 text-[11px] font-bold tracking-widest outline-none focus:border-theme-accent transition-all"
            />
            <Search size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-theme-faint" />
          </div>
        </div>

        {ORDERS.length > 0 ? (
          <div className="space-y-6">
            {ORDERS.map((order) => (
              <div 
                key={order.id} 
                className="group p-6 md:p-10 border border-theme-border rounded-2xl bg-white hover:shadow-premium transition-all duration-500 cursor-pointer flex flex-col md:flex-row justify-between items-center gap-8"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="p-4 bg-theme-bg rounded-xl text-theme-accent group-hover:scale-110 transition-transform">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold tracking-widest text-theme-text">{order.id}</h3>
                    <p className="text-[11px] font-medium tracking-widest text-theme-faint mt-1 uppercase">{order.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto text-center md:text-left">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase">ITEMS</p>
                    <p className="text-[13px] font-medium">{order.items}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase">TOTAL</p>
                    <p className="text-[13px] font-bold text-theme-accent">{order.total}</p>
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-1">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase">STATUS</p>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      order.status === "DELIVERED" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <ChevronRight size={20} className="hidden md:block text-theme-border group-hover:text-theme-accent group-hover:translate-x-2 transition-all" />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-8 bg-theme-card rounded-3xl border border-dashed border-theme-border">
            <Package size={64} strokeWidth={1} className="mx-auto text-theme-border" />
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-theme-text uppercase tracking-widest">
                No orders yet
              </h2>
              <p className="text-theme-faint text-[13px] font-sans tracking-widest uppercase">
                Explore our collections to start your journey.
              </p>
            </div>
            <Link 
              href="/shop" 
              className="inline-block bg-theme-text text-theme-bg px-10 py-4 rounded-full text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent transition-all"
            >
              SHOP NOW
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
