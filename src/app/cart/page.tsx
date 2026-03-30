"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CART_UPDATED_EVENT,
  CartItem,
  getCartFromStorage,
  notifyCartUpdated,
  saveCartToStorage,
} from "@/lib/storage";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(() => getCartFromStorage());

  useEffect(() => {
    const handler = () => setItems(getCartFromStorage());
    window.addEventListener(CART_UPDATED_EVENT, handler);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handler);
  }, []);

  useEffect(() => {
    saveCartToStorage(items);
    notifyCartUpdated();
  }, [items]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 150;
  const total = subtotal + shipping;

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 animate-reveal">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col space-y-12">
          {/* Header */}
          <div className="flex justify-between items-baseline border-b border-theme-border/50 pb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-theme-text tracking-wide uppercase">
              Shopping Bag<span className="text-theme-accent">.</span>
            </h1>
            <span className="text-[14px] font-sans text-theme-faint font-medium tracking-[0.2em] uppercase">{items.length} Items</span>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-12">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-10 p-6 md:p-8 border border-theme-border/30 rounded-3xl bg-white hover:shadow-premium transition-all">
                    <div className="relative aspect-[4/5] w-full sm:w-48 rounded-2xl overflow-hidden bg-theme-bg/30">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold tracking-[0.3em] text-theme-accent uppercase">{item.category}</p>
                           <h3 className="text-xl font-serif font-bold text-theme-text uppercase">{item.name}</h3>
                           <p className="text-[11px] text-theme-faint font-light">ARTISAN HANDCRAFTED</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-theme-border hover:text-red-500 transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex flex-wrap justify-between items-end gap-6 mt-8">
                        <div className="flex items-center border border-theme-border rounded-full px-4 py-2 bg-theme-bg/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-theme-accent transition-colors"><Minus size={14} /></button>
                          <span className="w-12 text-center text-[13px] font-bold tracking-widest">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-theme-accent transition-colors"><Plus size={14} /></button>
                        </div>
                        <div className="text-lg font-serif font-bold text-theme-text">
                           ₹ {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Promotional banner placement */}
                <div className="p-8 bg-theme-bg/30 rounded-3xl border border-dashed border-theme-border/50 text-center space-y-4">
                   <p className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-70">Add more for complimentary shipping</p>
                   <Link href="/products" className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest hover:text-theme-accent transition-colors">
                      CONTINUE BROWSING <ChevronRight size={16} />
                   </Link>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                 <div className="glass p-10 rounded-3xl space-y-10 sticky top-32">
                    <h2 className="text-2xl font-serif font-bold text-theme-text uppercase tracking-widest">Order Summary</h2>
                    
                    <div className="space-y-6">
                       <div className="flex justify-between items-center text-[13px] tracking-wider uppercase">
                          <span className="text-theme-faint font-medium">Subtotal</span>
                          <span className="font-bold">₹ {subtotal.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center text-[13px] tracking-wider uppercase">
                          <span className="text-theme-faint font-medium">Shipping</span>
                          <span className="text-theme-accent font-bold">{shipping === 0 ? "FREE" : `₹ ${shipping}`}</span>
                       </div>
                       <div className="pt-6 border-t border-theme-border/30 flex justify-between items-center">
                          <span className="text-[13px] font-bold tracking-widest uppercase">Total</span>
                          <span className="text-2xl font-serif font-bold text-theme-text">₹ {total.toLocaleString()}</span>
                       </div>
                    </div>

                    <p className="text-[11px] text-theme-faint leading-relaxed uppercase tracking-wider text-center">
                       Complimentary tracked shipping included for premium members.
                    </p>

                    <Link 
                      href="/checkout" 
                      className="block w-full bg-theme-text text-theme-bg py-5 rounded-full text-center text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all flex items-center justify-center gap-3"
                    >
                      Process Order <ArrowRight size={18} />
                    </Link>
                 </div>
              </div>
            </div>
          ) : (
            <div className="py-40 text-center space-y-10 animate-reveal">
               <div className="w-24 h-24 bg-theme-bg rounded-full flex items-center justify-center mx-auto text-theme-accent border border-theme-border/30">
                 <ShoppingBag size={40} strokeWidth={1} />
               </div>
               <div className="space-y-4">
                 <h2 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">Your bag is empty</h2>
                 <p className="text-[14px] text-theme-faint font-light tracking-[0.1em] uppercase">Start your luxury journey with our latest collections.</p>
               </div>
               <Link href="/products" className="inline-block bg-theme-text text-theme-bg px-12 py-5 rounded-full text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent transition-all">
                  SHOP NOW
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
