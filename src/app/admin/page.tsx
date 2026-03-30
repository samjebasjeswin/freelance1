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
      </div>
    </div>
  );
}

