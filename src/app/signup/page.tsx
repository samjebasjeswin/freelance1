"use client";

import { useState } from "react";
import { User, Eye, EyeOff, Loader2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/orders");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full animate-reveal space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <span className="p-4 bg-theme-accent/10 rounded-full text-theme-accent">
              <User size={32} />
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-theme-text tracking-wide">
            Create account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Title Selection */}
            <div className="relative group">
              <label className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1">
                SELECT TITLE
              </label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-theme-border py-3 pr-10 outline-none focus:border-theme-accent transition-all font-sans text-sm appearance-none cursor-pointer">
                  <option value="">Choose Title</option>
                  <option value="mr">Mr.</option>
                  <option value="ms">Ms.</option>
                  <option value="mrs">Mrs.</option>
                </select>
                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-theme-faint" />
              </div>
            </div>

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-theme-border py-3 outline-none focus:border-theme-accent transition-all font-sans text-sm"
                  placeholder="First name"
                />
              </div>
              <div className="relative group">
                <label className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1">
                  LAST NAME
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-theme-border py-3 outline-none focus:border-theme-accent transition-all font-sans text-sm"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative group">
              <label className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1">
                EMAIL
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent border-b border-theme-border py-3 outline-none focus:border-theme-accent transition-all font-sans text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <label className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-transparent border-b border-theme-border py-3 pr-10 outline-none focus:border-theme-accent transition-all font-sans text-sm"
                  placeholder="Create a password"
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

            {/* Phone (Optional) */}
            <div className="relative group">
              <label className="block text-[10px] font-bold tracking-[0.2em] text-theme-faint uppercase mb-1">
                PHONE (OPTIONAL)
              </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 border-b border-theme-border py-3 px-1 min-w-[80px]">
                  <img src="https://flagcdn.com/w20/in.png" alt="India flag" className="w-5 h-auto rounded-sm" />
                  <span className="text-sm font-sans">+91</span>
                  <ChevronDown size={12} className="text-theme-faint" />
                </div>
                <input
                  type="tel"
                  className="flex-1 bg-transparent border-b border-theme-border py-3 outline-none focus:border-theme-accent transition-all font-sans text-sm"
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-theme-text text-theme-bg py-4 rounded-md text-[13px] font-bold tracking-[0.2em] uppercase hover:bg-theme-accent transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : "CREATE"}
          </button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-[11px] font-bold tracking-[0.1em] text-theme-faint uppercase">
            ALREADY HAVE AN ACCOUNT?
          </p>
          <Link 
            href="/login" 
            className="inline-block text-[13px] font-bold tracking-[0.1em] text-theme-text hover:text-theme-accent transition-colors uppercase border-b border-theme-text/20 pb-1"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}
