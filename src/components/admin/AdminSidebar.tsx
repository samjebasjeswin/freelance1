"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "./AdminLogoutButton";

const NAV = [
  { label: "Products", href: "/admin/products" },
  { label: "Collections", href: "/admin/collections" },
  { label: "SMTP Configuration", href: "/admin/smtp" },
  { label: "Enquiry", href: "/admin/enquiry" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-[340px] border-r border-theme-border/50 bg-white/60 backdrop-blur-3xl">
      <div className="h-full p-6 space-y-6 flex flex-col">
        <div className="space-y-1">
          <h2 className="text-xl font-serif font-bold tracking-widest uppercase">Admin Panel</h2>
          <p className="text-[11px] text-theme-faint font-sans tracking-[0.2em] uppercase">Welcome</p>
        </div>

        <nav className="space-y-3">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 text-[13px] font-bold tracking-wide transition-all ${
                  active ? "bg-theme-text text-theme-bg" : "bg-white/50 hover:bg-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <AdminLogoutButton />
        </div>
      </div>
    </aside>
  );
}

