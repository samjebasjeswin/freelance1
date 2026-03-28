"use client";

import Image from "next/image";
import { useState } from "react";

export interface Product {
    id: number | string;
    name: string;
    price: string | number;
    image: string;
    badge?: string | null;
    timer?: string | null;
    category?: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const formattedPrice = typeof product.price === 'number' 
        ? `₹ ${product.price.toLocaleString()}` 
        : product.price;

    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f5f5f5] mb-6 shadow-sm group-hover:shadow-premium transition-all duration-500">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {product.badge && (
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        {product.badge}
                    </div>
                )}

                {product.timer && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase text-theme-text shadow-sm">
                        {product.timer}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-black/60 backdrop-blur-md flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white font-sans text-[13px] font-bold tracking-widest uppercase">
                        ADD TO CART
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-serif font-semibold group-hover:text-theme-accent transition-colors">
                    {product.name}
                </h3>
                <div className="flex justify-between items-center">
                    <span className="text-theme-text font-bold">
                        {formattedPrice}
                    </span>
                    <button className="sm:hidden bg-black text-white px-4 py-1.5 rounded-lg text-xs font-medium">
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
}
