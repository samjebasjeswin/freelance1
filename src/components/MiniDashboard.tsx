"use client";

import { Package, User, ShoppingCart, X, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MiniDashboardProps {
  onClose: () => void;
}

export default function MiniDashboard({ onClose }: MiniDashboardProps) {
  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-3xl border-l border-theme-border/50 animate-slide-right shadow-2xl">
      {/* Header */}
      <div className="p-8 border-b border-theme-border/30 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif font-bold tracking-tight uppercase">Dashboard</h2>
          <p className="text-[10px] font-sans text-theme-faint font-medium tracking-[0.2em] uppercase mt-1">Parallel View</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-theme-bg rounded-full transition-colors group"
        >
          <X size={20} className="text-theme-faint group-hover:text-theme-text transition-colors" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-8 space-y-6 flex-grow overflow-y-auto">
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-theme-accent/5 border border-theme-accent/20">
          <div className="w-12 h-12 rounded-full bg-theme-accent text-white flex items-center justify-center shadow-lg transform -rotate-3">
            <User size={24} />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-[0.3em] text-theme-accent uppercase">Guest Artisan</p>
            <p className="text-[12px] font-sans text-theme-faint leading-tight">Enjoy full access to our collection without an account.</p>
            <Link href="/login" className="inline-block text-[11px] font-bold text-theme-text hover:text-theme-accent transition-colors uppercase border-b border-theme-text/20 pb-0.5 mt-1">Sign in for rewards</Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <p className="text-[11px] font-bold tracking-[0.3em] text-theme-faint uppercase border-b border-theme-border/20 pb-2">Quick Access</p>
          
          <Link href="/orders" className="group flex items-center justify-between p-4 rounded-xl hover:bg-white hover:shadow-premium transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-theme-bg rounded-lg text-theme-faint group-hover:text-theme-accent transition-colors">
                <Package size={18} />
              </div>
              <span className="text-[13px] font-medium tracking-wide">My Orders</span>
            </div>
            <ChevronRight size={16} className="text-theme-border group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/cart" className="group flex items-center justify-between p-4 rounded-xl hover:bg-white hover:shadow-premium transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-theme-bg rounded-lg text-theme-faint group-hover:text-theme-accent transition-colors">
                <ShoppingCart size={18} />
              </div>
              <span className="text-[13px] font-medium tracking-wide">Shopping Bag</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-theme-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">0</span>
              <ChevronRight size={16} className="text-theme-border group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="space-y-4 pt-4">
          <p className="text-[11px] font-bold tracking-[0.3em] text-theme-faint uppercase border-b border-theme-border/20 pb-2">Suggestions</p>
          <div className="grid grid-cols-2 gap-4">
             {/* We can add small product cards here */}
             <div className="aspect-square bg-theme-bg rounded-2xl animate-pulse" />
             <div className="aspect-square bg-theme-bg rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-8 border-t border-theme-border/30 bg-white/50">
        <Link 
          href="/products" 
          className="block w-full bg-theme-text text-theme-bg text-center py-4 rounded-full text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all"
          onClick={onClose}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
