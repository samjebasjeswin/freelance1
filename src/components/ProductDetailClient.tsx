"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  Heart,
  MessageCircle,
  ShoppingBag,
  Share2,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import type { Product } from "@/components/ProductCard";
import {
  CartItem,
  getCartFromStorage,
  getWishlistFromStorage,
  notifyCartUpdated,
  notifyWishlistUpdated,
  parsePriceToNumber,
  saveCartToStorage,
  saveWishlistToStorage,
} from "@/lib/storage";

type ProductDetailClientProps = {
  product: Product;
};

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const productId = typeof product.id === "number" ? product.id : Number(product.id);

  const [quantity, setQuantity] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(() =>
    getWishlistFromStorage().includes(productId)
  );

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");

  const [addedToBag, setAddedToBag] = useState(false);

  const whatsAppText = useMemo(() => {
    const parts = [
      `Hi! I want a quote for ${product.name}.`,
      `Quantity: ${quantity}.`,
      quoteName ? `Name: ${quoteName}.` : null,
      quotePhone ? `Phone: ${quotePhone}.` : null,
      quoteEmail ? `Email: ${quoteEmail}.` : null,
      quoteMessage ? `Message: ${quoteMessage}.` : null,
    ].filter(Boolean);
    return encodeURIComponent(parts.join(" "));
  }, [product.name, quantity, quoteName, quotePhone, quoteEmail, quoteMessage]);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/8925091475?text=${whatsAppText}`;
  }, [whatsAppText]);

  const handleToggleWishlist = () => {
    const wishlist = getWishlistFromStorage();
    const next = wishlist.includes(productId)
      ? wishlist.filter((x) => x !== productId)
      : [...wishlist, productId];

    saveWishlistToStorage(next);
    notifyWishlistUpdated();
    setIsWishlisted(next.includes(productId));
  };

  const handleAddToBag = () => {
    const cart = getCartFromStorage();
    const unitPrice = parsePriceToNumber(product.price);

    const nextCart = (() => {
      const existing = cart.find((x) => x.id === productId);
      if (!existing) {
        const next: CartItem[] = [
          ...cart,
          {
            id: productId,
            name: product.name,
            price: unitPrice,
            image: product.image,
            quantity,
            category: product.category,
          },
        ];
        return next;
      }
      return cart.map((x) =>
        x.id === productId ? { ...x, quantity: x.quantity + quantity } : x
      );
    })();

    saveCartToStorage(nextCart);
    notifyCartUpdated();
    setAddedToBag(true);
    window.setTimeout(() => setAddedToBag(false), 1800);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fallback content (also used if the API fails).
    const to = "jeswinsam287@gmail.com";
    const subject = encodeURIComponent(`Quote Request - ${product.name}`);
    const body = encodeURIComponent(
      [
        `Quote request received:`,
        ``,
        `Product: ${product.name}`,
        `Quantity: ${quantity}`,
        ``,
        `Name: ${quoteName || "-"}`,
        `Email: ${quoteEmail || "-"}`,
        `Phone: ${quotePhone || "-"}`,
        ``,
        `Message: ${quoteMessage || "-"}`,
      ].join("\n")
    );

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteName,
          email: quoteEmail,
          phone: quotePhone,
          productName: product.name,
          quantity,
          message: quoteMessage,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Failed to send quote email");
      }

      setIsQuoteOpen(false);
    } catch {
      // If SMTP/email sending isn't configured, fall back to a mailto draft.
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      setIsQuoteOpen(false);
    }
  };

  const handleShare = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      const title = `AM CROCHET - ${product.name}`;
      const text = `Check out: ${product.name}`;

      // Web Share API (if supported)
      const maybeNavigator = navigator as Navigator & {
        share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
      };

      if (maybeNavigator.share) {
        await maybeNavigator.share({ title, text, url });
        return;
      }

      // Fallback: copy link
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // Ignore share/copy failures.
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 animate-reveal">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-10 flex items-center gap-4">
          <Link
            href="/products"
            className="group flex items-center gap-2 text-[11px] font-bold tracking-widest text-theme-faint hover:text-theme-accent transition-colors uppercase"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>
          <div className="w-1 h-1 rounded-full bg-theme-border" />
          <span className="text-[11px] font-bold tracking-widest text-theme-text uppercase">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-premium">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
              {product.badge && (
                <div className="absolute top-8 left-8 bg-black text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase">
                  {product.badge}
                </div>
              )}
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-theme-bg/50 border border-theme-border/30 overflow-hidden cursor-pointer hover:border-theme-accent transition-all"
                >
                  <Image
                    src={product.image}
                    alt="thumbnail"
                    width={100}
                    height={100}
                    className="object-cover opacity-50 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-[12px] font-bold tracking-[0.4em] text-theme-accent uppercase">
                Handcrafted Legacy
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-theme-text leading-tight uppercase">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mt-4">
                <span className="text-3xl font-serif font-bold text-theme-text">
                  {product.price}
                </span>
                <span className="text-[14px] text-theme-faint font-light line-through uppercase">
                  ₹ 1,999.00
                </span>
              </div>
            </div>

            <p className="text-[15px] font-sans text-theme-faint leading-relaxed font-light">
              Meticulously handcrafted using our signature crochet technique, this piece embodies timeless elegance and enduring
              craftsmanship. Each stitch is a testament to the artisan&apos;s dedication, featuring premium cotton-blend fibers and
              reinforced structural padding for a silhouette that retains its form through daily journeys.
            </p>

            <div className="space-y-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-6">
                <span className="text-[12px] font-bold tracking-widest uppercase">
                  Quantity
                </span>
                <div className="flex items-center border border-theme-border rounded-full px-4 py-2 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-theme-faint hover:text-theme-text transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-[13px] font-bold tracking-widest">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-theme-faint hover:text-theme-text transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 min-w-[210px] bg-theme-text text-theme-bg py-5 rounded-full text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={18} />
                  {addedToBag ? "Added" : "Add to Bag"}
                </button>

                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="min-w-[180px] sm:w-auto p-5 border border-theme-border rounded-full hover:bg-theme-bg transition-all group"
                >
                  <span className="text-[12px] font-bold tracking-widest uppercase text-theme-text group-hover:text-theme-accent">
                    Request Quote
                  </span>
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className="p-5 border border-theme-border rounded-full hover:bg-theme-bg transition-all group"
                  aria-pressed={isWishlisted}
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${isWishlisted ? "text-red-500" : "text-theme-faint"} group-hover:text-red-500`}
                    fill={isWishlisted ? "#ef4444" : "transparent"}
                  />
                </button>

                <button
                  onClick={() => {
                    window.location.href = whatsappUrl;
                  }}
                  className="flex-1 min-w-[210px] bg-theme-text text-theme-bg py-5 rounded-full text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all flex items-center justify-center gap-3"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </button>

                <button
                  onClick={handleShare}
                  className="p-5 border border-theme-border rounded-full hover:bg-theme-bg transition-all group"
                  aria-label="Share"
                >
                  <Share2
                    size={20}
                    className="text-theme-faint group-hover:text-theme-accent transition-colors"
                  />
                </button>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-theme-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-bg rounded-xl text-theme-accent">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold tracking-wider uppercase">
                    Authenticity Guaranteed
                  </h4>
                  <p className="text-[11px] text-theme-faint mt-1">
                    Certified artisan handicraft
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-theme-bg rounded-xl text-theme-accent">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold tracking-wider uppercase">
                    Express Delivery
                  </h4>
                  <p className="text-[11px] text-theme-faint mt-1">
                    Next day shipping available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 sm:p-10">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-reveal shadow-2xl"
            onClick={() => setIsQuoteOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-premium overflow-hidden animate-reveal p-10 space-y-10">
            <button
              onClick={() => setIsQuoteOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-theme-bg rounded-full transition-colors"
              aria-label="Close quote form"
            >
              <X size={20} className="text-theme-faint" />
            </button>

            <div className="text-center space-y-4">
              <h2 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">
                Request a Quote
              </h2>
              <p className="text-[12px] font-sans text-theme-faint font-light tracking-[0.2em] uppercase">
                For {product.name}
              </p>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                  Your Name
                </label>
                <input
                  required
                  value={quoteName}
                  onChange={(e) => setQuoteName(e.target.value)}
                  className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                  className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                  placeholder="EMAIL@EXAMPLE.COM"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                  Phone
                </label>
                <input
                  required
                  value={quotePhone}
                  onChange={(e) => setQuotePhone(e.target.value)}
                  className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                  placeholder="Phone number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                  Message
                </label>
                <textarea
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                  placeholder="Tell us your requirements (size, color, delivery date...)"
                />
              </div>

              <div className="text-[12px] text-theme-faint uppercase tracking-[0.2em]">
                Quantity: <span className="text-theme-text font-bold">{quantity}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all shadow-xl"
              >
                Send Quote Email
              </button>

              <p className="text-center text-[11px] text-theme-faint uppercase tracking-wider pt-2">
                This will send the details to our email (and will fall back to a mail draft if SMTP isn&apos;t configured).
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

