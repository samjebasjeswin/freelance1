"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import Link from "next/link";

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
    const tiltContainerRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const rafRef = useRef<number | null>(null);

    const formattedPrice = useMemo(() => {
        return typeof product.price === 'number' 
            ? `₹ ${product.price.toLocaleString()}` 
            : product.price;
    }, [product.price]);

    const applyTilt = (clientX: number, clientY: number) => {
        const rect = rectRef.current;
        if (!rect || !tiltContainerRef.current || !detailsRef.current) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;

        tiltContainerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        // Slight lift for the text block while tilting.
        detailsRef.current.style.transform = rotateX ? "translateZ(10px)" : "none";
    };

    const handleMouseLeave = () => {
        rectRef.current = null;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (tiltContainerRef.current) tiltContainerRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
        if (detailsRef.current) detailsRef.current.style.transform = "none";
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        rectRef.current = e.currentTarget.getBoundingClientRect();
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const { clientX, clientY } = e;
        rafRef.current = requestAnimationFrame(() => applyTilt(clientX, clientY));
    };

    return (
        <Link
            href={`/products/${product.id}`}
            className="group cursor-pointer perspective-scene"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f5f5f5] mb-6 shadow-sm group-hover:shadow-premium transition-all duration-300 preserve-3d"
            >
                <div
                    ref={tiltContainerRef}
                    className="absolute inset-0"
                    style={{ transform: "rotateX(0deg) rotateY(0deg)" }}
                >
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

            <div className="space-y-2 preserve-3d" ref={detailsRef}>
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
        </Link>
    );
}
