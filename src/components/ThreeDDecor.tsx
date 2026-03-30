"use client";

export default function ThreeDDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden perspective-scene">
      {/* 3D Floating Spheres/Blobs */}
      <div 
        className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-theme-accent/10 blur-3xl floating-3d animate-pulse"
        style={{ transform: "translateZ(-200px)" }}
      />
      <div 
        className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-theme-accent/5 blur-[100px] floating-3d"
        style={{ transform: "translateZ(-400px)", animationDelay: "2s" }}
      />
      
      {/* Geometric Glass Layers */}
      <div 
        className="absolute top-1/4 left-1/3 w-32 h-32 border border-theme-accent/20 rounded-2xl glass rotate-12 floating-3d"
        style={{ transform: "translateZ(-100px)", animationDuration: "10s" }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-theme-accent/10 rounded-full glass -rotate-12 floating-3d"
        style={{ transform: "translateZ(-150px)", animationDuration: "8s", animationDelay: "1s" }}
      />

      {/* Grid Floor Effect (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          backgroundImage: "radial-gradient(var(--color-theme-accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "rotateX(70deg) translateZ(-500px) scale(3)",
          transformOrigin: "bottom"
        }}
      />
    </div>
  );
}
