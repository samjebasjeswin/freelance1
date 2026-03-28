"use client";

import { Search, ChevronDown } from "lucide-react";

interface ProductFiltersProps {
    count: number;
}

export default function ProductFilters({ count }: ProductFiltersProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-theme-border pb-4">
                <div className="space-y-1">
                    <p className="text-[12px] font-bold tracking-[0.2em] text-theme-faint uppercase">
                        {count} ITEMS
                    </p>
                </div>
                <button className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-theme-faint hover:text-theme-accent transition-colors uppercase">
                    Sort & Filter <ChevronDown size={14} />
                </button>
            </div>

            <div className="bg-white border border-theme-border rounded-[2rem] p-4 md:p-6 shadow-sm space-y-4">
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder="SEARCH PRODUCTS..." 
                        className="w-full bg-transparent border-b border-theme-border py-3 pl-0 pr-10 text-[13px] font-bold tracking-widest outline-none focus:border-theme-accent transition-all uppercase placeholder:text-theme-faint/50"
                    />
                    <Search size={18} className="absolute right-0 top-1/2 -translate-y-1/2 text-theme-faint group-focus-within:text-theme-accent transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                        <select className="w-full bg-transparent border-b border-theme-border py-3 pr-10 text-[13px] font-bold tracking-widest outline-none focus:border-theme-accent transition-all appearance-none cursor-pointer uppercase">
                            <option>ALL CATEGORIES</option>
                            <option>HANDBAGS</option>
                            <option>BACKPACKS</option>
                            <option>ACCESSORIES</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-theme-faint group-focus-within:text-theme-accent" />
                    </div>

                    <div className="relative group">
                        <select className="w-full bg-transparent border-b border-theme-border py-3 pr-10 text-[13px] font-bold tracking-widest outline-none focus:border-theme-accent transition-all appearance-none cursor-pointer uppercase">
                            <option>NEWEST FIRST</option>
                            <option>PRICE: LOW TO HIGH</option>
                            <option>PRICE: HIGH TO LOW</option>
                            <option>MOST POPULAR</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-theme-faint group-focus-within:text-theme-accent" />
                    </div>
                </div>
            </div>
        </div>
    );
}
