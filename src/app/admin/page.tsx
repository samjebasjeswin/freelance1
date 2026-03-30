import InitDbButton from "@/components/admin/InitDbButton";

export default function AdminHomePage() {
  return (
    <div className="pt-10 px-6 pb-20 animate-reveal">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-serif font-bold text-theme-text uppercase tracking-widest">
          Welcome
        </h1>
        <p className="text-theme-faint font-light tracking-wider uppercase">
          Use the left sidebar to manage products, collections, SMTP configuration, and enquiries.
        </p>

        <div className="pt-4">
          <div className="p-6 rounded-3xl border border-theme-border/50 bg-white/60 space-y-2">
            <div className="text-[12px] font-bold tracking-[0.3em] text-theme-faint uppercase">
              Database Setup
            </div>
            <div className="text-sm text-theme-faint">
              Click once after connecting Render Postgres to create required tables.
            </div>
            <InitDbButton />
          </div>
        </div>
      </div>
    </div>
  );
}

