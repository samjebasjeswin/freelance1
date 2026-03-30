"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate mock login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/orders");
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full animate-reveal space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <span className="p-4 bg-theme-accent/10 rounded-full text-theme-accent">
              <User size={32} />
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-theme-text tracking-wide">
            Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <label 
                htmlFor="email" 
                className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1 transition-colors group-focus-within:text-theme-accent"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-theme-border py-3 outline-none focus:border-theme-accent transition-all font-sans text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative group">
              <label 
                htmlFor="password" 
                className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1 transition-colors group-focus-within:text-theme-accent"
              >
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-theme-border py-3 pr-10 outline-none focus:border-theme-accent transition-all font-sans text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-theme-faint hover:text-theme-accent transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-theme-text text-theme-bg py-4 rounded-md text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : "SUBMIT"}
          </button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-[11px] font-bold tracking-[0.1em] text-theme-faint uppercase">
            DO NOT HAVE AN ACCOUNT YET?
          </p>
          <Link 
            href="/signup" 
            className="inline-block text-[13px] font-bold tracking-[0.1em] text-theme-text hover:text-theme-accent transition-colors uppercase border-b border-theme-text/20 pb-1"
          >
            CREATE ACCOUNT
          </Link>
        </div>

        <div className="text-center pt-8 border-t border-theme-border/20">
          <Link 
            href="/" 
            className="text-[11px] font-bold tracking-[0.2em] text-theme-faint hover:text-theme-accent transition-colors uppercase"
          >
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}
