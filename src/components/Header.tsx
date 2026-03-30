"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { CART_UPDATED_EVENT, getCartFromStorage, getCartItemCount } from "@/lib/storage";

export default function Header() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => setCartCount(getCartItemCount(getCartFromStorage()));
    update();
    window.addEventListener(CART_UPDATED_EVENT, update);
    return () => window.removeEventListener(CART_UPDATED_EVENT, update);
  }, []);

  if (!pathname || pathname.startsWith("/admin")) return null;

  const isActive = (path: string) => pathname === path;

  const NAV_LINKS = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'ORDERS', path: '/orders' },
    { name: 'ABOUT US', path: '/about-us' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-theme-bg/95 backdrop-blur-md border-b border-theme-border/50">
      {/* Top Row: Logo & Icons */}
      <div className="container mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
        <div className="logo text-xl md:text-2xl font-serif font-bold tracking-widest uppercase">
          <Link href="/">
            AM CROCHET<span className="text-theme-accent">.</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-10 text-[13px] font-medium tracking-[0.15em] items-center">
          {NAV_LINKS.map(link => (
            <li key={link.name}>
              <Link 
                href={link.path} 
                className={`transition-colors relative pb-1 ${isActive(link.path) ? 'text-theme-accent border-b border-theme-border' : 'hover:text-theme-accent'}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Utilities: Icons */}
        <div className="flex items-center gap-5 md:gap-6">
          <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-[11px] font-bold tracking-widest hover:text-theme-accent transition-colors group">
            <User size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
            DASHBOARD
          </Link>
          <Link href="/login" className="hidden md:block text-[11px] font-bold tracking-widest hover:text-theme-accent transition-colors">LOGIN</Link>
          <Link href="/cart" className="relative p-1 hover:text-theme-accent transition-colors group">
            <ShoppingBag size={20} className="md:w-[22px] md:h-[22px] group-hover:-rotate-12 transition-transform" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-theme-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </Link>
          <Link href="/dashboard" className="md:hidden relative p-1 hover:text-theme-accent transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Mobile Nav Row (Scrollable horizontally) */}
      <div className="md:hidden border-t border-theme-border/50 bg-theme-bg/95 backdrop-blur-md">
        <ul className="flex overflow-x-auto hide-scrollbar px-6 py-3 gap-6 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] items-center whitespace-nowrap">
          {NAV_LINKS.map(link => (
            <li key={link.name}>
              <Link 
                href={link.path} 
                className={`transition-colors ${isActive(link.path) ? 'text-theme-accent border-b border-theme-accent pb-[2px]' : 'text-theme-faint hover:text-theme-accent'}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
