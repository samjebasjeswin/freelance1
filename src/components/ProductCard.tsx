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
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    const formattedPrice = typeof product.price === 'number' 
        ? `₹ ${product.price.toLocaleString()}` 
        : product.price;

    return (
        <div 
            className="group cursor-pointer perspective-scene"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f5f5f5] mb-6 shadow-sm group-hover:shadow-premium transition-all duration-300 preserve-3d"
                style={{ 
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
            >
                <div className="absolute inset-0">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                
                {product.badge && (
                    <div 
                        className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xl"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        {product.badge}
                    </div>
                )}

                {product.timer && (
                    <div 
                        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase text-theme-text shadow-xl"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        {product.timer}
                    </div>
                )}

                <div 
                    className="absolute bottom-0 left-0 w-full h-1/4 bg-black/60 backdrop-blur-md flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"
                    style={{ transform: "translateZ(50px) translate-y(100%)" }}
                >
                    <span className="text-white font-sans text-[13px] font-bold tracking-widest uppercase">
                        ADD TO CART
                    </span>
                </div>
            </div>

            <div className="space-y-2 preserve-3d" style={{ transform: tilt.x ? `translateZ(10px)` : 'none' }}>
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
