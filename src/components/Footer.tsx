import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-theme-text text-theme-bg py-20 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="footer-brand border-b md:border-none border-theme-border/20 pb-10 md:pb-0">
          <Link href="/" className="footer-logo text-3xl font-serif font-bold tracking-widest inline-block mb-6">
            AM CROCHET<span className="text-theme-accent">.</span>
          </Link>
          <p className="text-[14px] leading-relaxed opacity-70 mb-10 max-w-sm">
            Premium handcrafted bags designed for everyday style and durability. Elevate your carry with our signature crochet collection.
          </p>
          <div className="flex gap-5">
            <a
              href="https://www.instagram.com/am_crochet_bag?igsh=d2MzZzU1b2FrNmJt"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
              aria-label="Instagram"
            >
              <span className="text-[12px] font-bold tracking-wide">IG</span>
            </a>
            <a
              href="https://www.threads.com/@am_crochet_bag?xmt=AQF0Sy0JT9DICj93Zxc9LiE5iLaJWAtjU37pVnrIfDcpeNE"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
              aria-label="Threads"
            >
              <span className="text-[12px] font-bold tracking-wide">T</span>
            </a>
          </div>
        </div>

        <div className="footer-links flex flex-col gap-6">
          <h4 className="text-[15px] font-serif font-bold tracking-[0.2em] uppercase">SHOP</h4>
          <ul className="flex flex-col gap-4 text-[14px] opacity-70">
            <li><Link href="/collections" className="hover:text-theme-accent transition-colors">All Collections</Link></li>
            <li><Link href="/handbags" className="hover:text-theme-accent transition-colors">Handbags</Link></li>
            <li><Link href="/backpacks" className="hover:text-theme-accent transition-colors">Backpacks</Link></li>
            <li><Link href="/accessories" className="hover:text-theme-accent transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div className="footer-links flex flex-col gap-6">
          <h4 className="text-[15px] font-serif font-bold tracking-[0.2em] uppercase">CUSTOMER SUPPORT</h4>
          <ul className="flex flex-col gap-4 text-[14px] opacity-70">
            <li><Link href="/track-orders" className="hover:text-theme-accent transition-colors">Track Orders</Link></li>
            <li><Link href="/cart" className="hover:text-theme-accent transition-colors">Shopping Cart</Link></li>
            <li><Link href="/account" className="hover:text-theme-accent transition-colors">My Account</Link></li>
            <li><Link href="/auth" className="hover:text-theme-accent transition-colors">Sign In / Register</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-20 pt-10 border-t border-white/10 text-center text-[12px] opacity-50 tracking-widest">
        <p>&copy; 2024 AM CROCHET. All rights reserved.</p>
      </div>
    </footer>
  );
}
