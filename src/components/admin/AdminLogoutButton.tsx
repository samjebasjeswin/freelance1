"use client";

export default function AdminLogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST", credentials: "include" });
    } finally {
      window.location.href = "/admin";
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-theme-bg border border-theme-border rounded-2xl text-[12px] font-bold tracking-[0.2em] uppercase py-3 hover:bg-theme-bg/60 transition-all"
    >
      Logout
    </button>
  );
}

