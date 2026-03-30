"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-theme-bg/95 backdrop-blur-md border-b border-theme-border/50">
      <nav className="container mx-auto px-6 h-20 flex justify-between items-center">
        <div className="logo text-2xl font-serif font-bold tracking-widest uppercase">
          <Link href="/">
            AM CROCHET<span className="text-theme-accent">.</span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-10 text-[13px] font-medium tracking-[0.15em] items-center">
          <li>
            <Link 
              href="/" 
              className={`transition-colors relative pb-1 ${isActive('/') ? 'text-theme-accent border-b border-theme-border' : 'hover:text-theme-accent'}`}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link 
              href="/collections" 
              className={`transition-colors relative pb-1 ${isActive('/collections') ? 'text-theme-accent border-b border-theme-border' : 'hover:text-theme-accent'}`}
            >
              COLLECTIONS
            </Link>
          </li>
          <li>
            <Link 
              href="/products" 
              className={`transition-colors relative pb-1 ${isActive('/products') ? 'text-theme-accent border-b border-theme-border' : 'hover:text-theme-accent'}`}
            >
              PRODUCTS
            </Link>
          </li>
          <li>
            <Link 
              href="/orders" 
              className={`transition-colors relative pb-1 ${isActive('/orders') ? 'text-theme-accent border-b border-theme-border' : 'hover:text-theme-accent'}`}
            >
              ORDERS
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-[11px] font-bold tracking-widest hover:text-theme-accent transition-colors group">
            <User size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            DASHBOARD
          </Link>
          <Link href="/login" className="hidden md:block text-[11px] font-bold tracking-widest hover:text-theme-accent transition-colors">LOGIN</Link>
          <Link href="/cart" className="relative p-1 hover:text-theme-accent transition-colors group">
            <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:-rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-theme-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
          </Link>
          <button 
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-theme-bg border-b border-theme-border p-10 flex flex-col gap-8 animate-reveal shadow-xl">
          <Link href="/" className="text-lg font-medium tracking-widest text-center" onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link href="/products" className="text-lg font-medium tracking-widest text-center" onClick={() => setIsMenuOpen(false)}>PRODUCTS</Link>
          <Link href="/orders" className="text-lg font-medium tracking-widest text-center" onClick={() => setIsMenuOpen(false)}>ORDERS</Link>
          <div className="flex flex-col gap-4 mt-4">
            <Link href="/login" className="text-center font-medium tracking-widest py-3 border border-theme-border rounded-full" onClick={() => setIsMenuOpen(false)}>LOGIN</Link>
            <Link href="/signup" className="text-center font-medium tracking-widest py-3 bg-theme-text text-theme-bg rounded-full" onClick={() => setIsMenuOpen(false)}>SIGN UP</Link>
          </div>
        </div>
      )}
    </header>
  );
}
