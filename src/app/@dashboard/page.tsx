"use client";

import MiniDashboard from "@/components/MiniDashboard";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardSlot() {
  const pathname = usePathname();
  const router = useRouter();

  // Only show dashboard if specifically requested or via a state
  // For this demo, let's assume it shows on /dashboard path parallelly
  const isOpen = pathname.startsWith("/dashboard");

  if (!isOpen) return null;

  return (
    <div className="h-full">
      <MiniDashboard onClose={() => router.back()} />
    </div>
  );
}
