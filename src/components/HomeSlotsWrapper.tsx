"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface HomeSlotsWrapperProps {
  hero: React.ReactNode;
  banner: React.ReactNode;
  products: React.ReactNode;
  features: React.ReactNode;
}

export default function HomeSlotsWrapper({
  hero,
  banner,
  products,
  features,
}: HomeSlotsWrapperProps) {
  const pathname = usePathname();

  // ONLY render the home page sections if we are exactly on the home page ("/")
  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="stack-container">
      <div className="stack-panel">
        {hero}
      </div>
      <div className="stack-panel bg-[#f8f0e5]">
        {banner}
      </div>
      <div className="stack-panel bg-theme-bg">
        {products}
      </div>
      <div className="stack-panel bg-theme-text">
        {features}
      </div>
    </div>
  );
}
