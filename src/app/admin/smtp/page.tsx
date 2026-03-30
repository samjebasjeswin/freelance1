"use client";

import { useState } from "react";

export default function AdminSmtpPage() {
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [quoteToEmail, setQuoteToEmail] = useState("jeswinsam287@gmail.com");
  const [quoteFromEmail, setQuoteFromEmail] = useState("");
  const [quoteCcEmail, setQuoteCcEmail] = useState("");
  const [quoteBccEmail, setQuoteBccEmail] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtpHost,
          smtpPort,
          smtpUser,
          smtpPass,
          quoteToEmail,
          quoteFromEmail: quoteFromEmail.trim() ? quoteFromEmail.trim() : undefined,
          quoteCcEmail: quoteCcEmail.trim() ? quoteCcEmail.trim() : undefined,
          quoteBccEmail: quoteBccEmail.trim() ? quoteBccEmail.trim() : undefined,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to save SMTP config");
      }

      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save SMTP config";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 animate-reveal">
      <div className="max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-theme-text uppercase tracking-widest">
            SMTP Configuration
          </h1>
          <p className="text-theme-faint text-sm">
            Enter SMTP details used to send quote emails to <code>quoteToEmail</code>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-700">
              SMTP configuration saved.
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              SMTP Host
            </label>
            <input
              required
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="smtp.gmail.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                SMTP Port
              </label>
              <input
                required
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                placeholder="587"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
                SMTP Username
              </label>
              <input
                required
                value={smtpUser}
                onChange={(e) => setSmtpUser(e.target.value)}
                className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
                placeholder="your-email@gmail.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              SMTP Password
            </label>
            <input
              required
              type="password"
              value={smtpPass}
              onChange={(e) => setSmtpPass(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="SMTP password / app password"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Quote To Email
            </label>
            <input
              required
              type="email"
              value={quoteToEmail}
              onChange={(e) => setQuoteToEmail(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="jeswinsam287@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Quote From Email (optional)
            </label>
            <input
              value={quoteFromEmail}
              onChange={(e) => setQuoteFromEmail(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="e.g. no-reply@yourdomain.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Quote CC Email(s) (optional)
            </label>
            <input
              value={quoteCcEmail}
              onChange={(e) => setQuoteCcEmail(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="comma separated (e.g. a@gmail.com,b@gmail.com)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.3em] text-theme-faint uppercase px-2">
              Quote BCC Email(s) (optional)
            </label>
            <input
              value={quoteBccEmail}
              onChange={(e) => setQuoteBccEmail(e.target.value)}
              className="w-full bg-theme-bg/30 border border-theme-border/30 rounded-2xl px-6 py-4 text-[13px] outline-none focus:border-theme-accent transition-all"
              placeholder="comma separated (e.g. a@gmail.com,b@gmail.com)"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-theme-text text-theme-bg py-5 rounded-full text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-theme-accent hover:shadow-premium transition-all shadow-xl disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save SMTP Config"}
          </button>

          <p className="text-[11px] text-theme-faint uppercase tracking-wider pt-2 leading-relaxed">
            This stores SMTP settings on the server (as JSON) so the quote API can send emails.
          </p>
        </form>
      </div>
    </div>
  );
}

