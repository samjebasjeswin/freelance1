"use client";

import Hero from "@/components/Hero";
import { usePathname } from "next/navigation";

export default function HeroSlot() {
  const pathname = usePathname();
  
  // Only show Hero on the home page
  if (pathname !== "/") return null;

  return <Hero />;
}
