"use client";

import { X, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 sm:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-reveal shadow-2xl"
        onClick={() => router.back()}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-premium overflow-hidden animate-reveal p-10 space-y-10">
        <button 
          onClick={() => router.back()}
          className="absolute top-6 right-6 p-2 hover:bg-theme-bg rounded-full transition-colors"
        >
          <X size={20} className="text-theme-faint" />
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">Sign In</h2>
          <p className="text-[12px] font-sans text-theme-faint font-light tracking-[0.2em] uppercase">Access your artisan collection</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">Account Email</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL@EXAMPLE.COM" 
                className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-12 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              />
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-faint" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">Security Hash</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-12 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              />
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-faint" />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all shadow-xl"
          >
            Authenticate
          </button>
        </form>

        <div className="text-center space-y-4 pt-4 border-t border-theme-border/20">
          <p className="text-[11px] font-bold tracking-widest text-theme-faint uppercase">New to AM Crochet?</p>
          <button className="text-[12px] font-bold tracking-widest text-theme-accent hover:underline uppercase">Create Account</button>
        </div>
      </div>
    </div>
  );
}
