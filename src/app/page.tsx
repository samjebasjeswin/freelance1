import Hero from "@/components/Hero";
import PromoBanner from "@/components/PromoBanner";
import Products from "@/components/Products";
import Features from "@/components/Features";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <PromoBanner />
      <Products />
      <Features />
    </div>
  );
}
