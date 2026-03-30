"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollReveal — triggers CSS reveal animations when elements enter viewport.
 * Uses IntersectionObserver, no external dependencies.
 */
export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = containerRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className="flex-1 flex flex-col">{children}</div>;
}
