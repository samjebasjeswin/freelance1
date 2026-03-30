import { NextResponse } from "next/server";
import { saveSmtpConfigAsync } from "@/lib/admin/smtpConfigStore";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const required = ["smtpHost", "smtpPort", "smtpUser", "smtpPass", "quoteToEmail"] as const;
    for (const key of required) {
      if (typeof body[key] !== "string" || !String(body[key]).trim()) {
        return NextResponse.json(
          { ok: false, error: `Missing or invalid field: ${key}` },
          { status: 400 }
        );
      }
    }

    await saveSmtpConfigAsync({
      smtpHost: String(body.smtpHost),
      smtpPort: String(body.smtpPort),
      smtpUser: String(body.smtpUser),
      smtpPass: String(body.smtpPass),
      quoteToEmail: String(body.quoteToEmail),
      quoteFromEmail: typeof body.quoteFromEmail === "string" ? body.quoteFromEmail : undefined,
      quoteCcEmail: typeof body.quoteCcEmail === "string" ? body.quoteCcEmail : undefined,
      quoteBccEmail: typeof body.quoteBccEmail === "string" ? body.quoteBccEmail : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save SMTP config" }, { status: 500 });
  }
}

