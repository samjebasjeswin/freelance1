"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Truck, Lock, CreditCard } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen pt-24 pb-20 animate-reveal bg-theme-bg/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-theme-border/50 pb-8">
            <Link href="/cart" className="group flex items-center gap-2 text-[11px] font-bold tracking-widest text-theme-faint hover:text-theme-accent transition-colors uppercase">
               <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
               Review Bag
            </Link>
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-serif font-bold text-theme-text tracking-[0.3em] uppercase leading-tight">Guest Checkout</h1>
              <p className="text-[9px] font-bold tracking-[0.2em] text-theme-accent uppercase opacity-80">No account required</p>
            </div>
            <div className="flex items-center gap-3 text-theme-faint">
               <Lock size={16} />
               <span className="text-[10px] font-bold tracking-widest uppercase">SSL SECURE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Section */}
            <div className="space-y-12 bg-white/50 backdrop-blur-md p-10 rounded-3xl border border-theme-border/30">
               <div className="space-y-10">
                 {/* Step 1: Shipping */}
                 <div className="space-y-6">
                    <h2 className="flex items-center gap-4 text-lg font-serif font-bold text-theme-text uppercase tracking-widest border-b border-theme-border/30 pb-4">
                       <Truck size={20} className="text-theme-accent" />
                       Shipping Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-widest text-theme-faint uppercase">Full Name</label>
                          <input type="text" className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-theme-accent transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold tracking-widest text-theme-faint uppercase">Email Address</label>
                          <input type="email" className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-theme-accent transition-all" />
                       </div>
                       <div className="col-span-1 md:col-span-2 space-y-2">
                          <label className="text-[10px] font-bold tracking-widest text-theme-faint uppercase">Delivery Address</label>
                          <textarea className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-xl px-4 py-3 text-[13px] h-24 outline-none focus:border-theme-accent transition-all" />
                       </div>
                    </div>
                 </div>

                 {/* Step 2: Payment */}
                 <div className="space-y-6 opacity-50 pointer-events-none">
                    <h2 className="flex items-center gap-4 text-lg font-serif font-bold text-theme-text uppercase tracking-widest border-b border-theme-border/30 pb-4">
                       <CreditCard size={20} />
                       Secure Payment
                    </h2>
                    <p className="text-[11px] font-medium tracking-widest text-theme-faint uppercase">Select your preferred method after shipping info</p>
                 </div>
               </div>

               <button className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all shadow-xl">
                 Continue to Payment
               </button>
            </div>

            {/* Summary Panel */}
            <div className="space-y-8">
               <div className="bg-theme-bg/50 border border-theme-border/30 rounded-3xl p-10 space-y-8">
                  <h2 className="text-lg font-serif font-bold text-theme-text uppercase tracking-widest border-b border-theme-border/30 pb-4">In Your Bag</h2>
                  
                  {/* Cart Item Preview */}
                  <div className="flex items-center gap-6">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden shadow-sm bg-white">
                       <Image src="/assets/bag_1.png" alt="item" fill className="object-cover" />
                    </div>
                    <div>
                       <h3 className="text-[13px] font-bold tracking-widest uppercase">Aj Bags</h3>
                       <p className="text-[11px] text-theme-faint font-medium">QTY: 1</p>
                       <p className="text-[13px] font-bold text-theme-accent mt-2">₹ 1,599.00</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-theme-border/30">
                    <div className="flex justify-between items-center text-[11px] font-bold tracking-widest uppercase">
                       <span className="text-theme-faint">Subtotal</span>
                       <span>₹ 1,599.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold tracking-widest uppercase">
                       <span className="text-theme-faint">Shipping</span>
                       <span className="text-theme-accent">FREE</span>
                    </div>
                    <div className="pt-4 border-t border-theme-border/30 flex justify-between items-center">
                       <span className="text-[13px] font-bold tracking-widest uppercase">Order Total</span>
                       <span className="text-xl font-serif font-bold text-theme-text">₹ 1,599.00</span>
                    </div>
                  </div>
               </div>

               {/* Trust Marks */}
               <div className="flex justify-center gap-8 pt-4">
                  <div className="flex flex-col items-center gap-2 grayscale opacity-50">
                     <ShieldCheck size={24} />
                     <span className="text-[9px] font-bold tracking-widest uppercase text-center">AUTHENTIC<br/>ARTISAN</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 grayscale opacity-50">
                     <Lock size={24} />
                     <span className="text-[9px] font-bold tracking-widest uppercase text-center">ENCRYPTED<br/>DATA</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
