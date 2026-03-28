"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-theme-bg flex items-center justify-center px-6">
      <div className="bg-white/90 border border-theme-border rounded-2xl px-6 py-5 shadow-premium text-center animate-reveal">
        <div className="w-8 h-8 border-2 border-theme-border border-t-theme-accent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-theme-faint font-sans">
          Restoring your secure session...
        </p>
      </div>
    </div>
  );
}
