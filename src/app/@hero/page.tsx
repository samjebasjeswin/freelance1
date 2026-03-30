"use client";

import Hero from "@/components/Hero";
import { usePathname } from "next/navigation";

export default function HeroSlot() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  // Hero fills the full height of its parent .stack-panel (100vh)
  return <div className="flex-1 flex flex-col"><Hero /></div>;
}
