import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import ThreeDDecor from "@/components/ThreeDDecor";

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AM CROCHET | Luxury Handcrafted Bags",
  description: "Exquisite handcrafted crochet bags and accessories designed for enduring style and refined luxury.",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  dashboard: React.ReactNode;
  modal: React.ReactNode;
  hero: React.ReactNode;
  banner: React.ReactNode;
  products: React.ReactNode;
  features: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} scroll-smooth`}>
      <body className="antialiased font-sans text-theme-text bg-theme-bg min-h-screen flex flex-col selection:bg-theme-accent selection:text-white pb-safe relative overflow-x-hidden">
        <SplashScreen />
        <Header />
        <ThreeDDecor />
        
        <div className="flex-grow flex relative perspective-scene">
          <main className="flex-grow pt-20 transition-all duration-700 preserve-3d">
            {/* The main page.tsx content */}
            {props.children}

            {/* Parallel Home Page Slots */}
            <div className="flex flex-col preserve-3d">
              {props.hero}
              {props.banner}
              {props.products}
              {props.features}
            </div>
          </main>

          {/* Parallel Dashboard Slot */}
          <aside className="fixed right-0 top-0 h-full z-[1001] w-full md:w-[450px] transform transition-transform duration-700 ease-in-out">
            {props.dashboard}
          </aside>
        </div>

        {/* Parallel Modal Slot */}
        <div className="z-[2000]">
          {props.modal}
        </div>

        <Footer />
      </body>
    </html>
  );
}
