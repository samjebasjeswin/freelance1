import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";


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
        <div className="flex-grow flex relative">
          <main className="flex-grow w-full">
            {/* Non-home page content */}
            {props.children}

            {/* 
              Sticky Stack Parallax — each slot is wrapped in a .stack-panel.
              The slots stack over each other as you scroll (Cascaid style).
            */}
            <div className="stack-container">
              <div className="stack-panel">
                {props.hero}
              </div>
              <div className="stack-panel bg-[#f8f0e5]">
                {props.banner}
              </div>
              <div className="stack-panel bg-theme-bg">
                {props.products}
              </div>
              <div className="stack-panel bg-theme-text">
                {props.features}
              </div>
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
