import nodemailer from "nodemailer";
import { getSmtpConfigAsync } from "@/lib/admin/smtpConfigStore";
import { appendEnquiryAsync } from "@/lib/admin/enquiriesRepo";

type QuotePayload = {
  name: string;
  phone: string;
  email: string;
  productName: string;
  quantity: number;
  message?: string;
};

export async function POST(req: Request) {
  let payload: QuotePayload | null = null;
  try {
    payload = (await req.json()) as QuotePayload;

    if (!payload?.name || !payload?.email || !payload?.phone || !payload?.productName) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const enquiryBase = {
      productName: payload.productName,
      quantity: payload.quantity,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
    };

    const saved = await getSmtpConfigAsync();
    const to = saved?.quoteToEmail || process.env.QUOTE_TO_EMAIL || "jeswinsam287@gmail.com";
    const from =
      saved?.quoteFromEmail || process.env.QUOTE_FROM_EMAIL || saved?.smtpUser || process.env.SMTP_USER;

    const quoteCcEmail = saved?.quoteCcEmail || process.env.QUOTE_CC_EMAIL;
    const quoteBccEmail = saved?.quoteBccEmail || process.env.QUOTE_BCC_EMAIL;

    const smtpHost = saved?.smtpHost || process.env.SMTP_HOST;
    const smtpPort = saved?.smtpPort || process.env.SMTP_PORT;
    const smtpUser = saved?.smtpUser || process.env.SMTP_USER;
    const smtpPass = saved?.smtpPass || process.env.SMTP_PASS;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      await appendEnquiryAsync({ ...enquiryBase, status: "failed" });
      return Response.json(
        {
          ok: false,
          error: "SMTP not configured. Set it via Admin > SMTP Configuration (or env SMTP_HOST/PORT/USER/PASS).",
        },
        { status: 500 }
      );
    }

    if (!from) {
      await appendEnquiryAsync({ ...enquiryBase, status: "failed" });
      return Response.json({ ok: false, error: "Missing QUOTE_FROM_EMAIL/SMTP_USER" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: String(smtpPort) === "465", // common convention for SMTPS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const ccList = quoteCcEmail
      ? quoteCcEmail
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const bccList = quoteBccEmail
      ? quoteBccEmail
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const mailOptions = {
      from,
      to,
      replyTo: payload.email,
      cc: ccList.length > 0 ? ccList : undefined,
      bcc: bccList.length > 0 ? bccList : undefined,
      subject: `Quote Request - ${payload.productName}`,
      text: [
        "Quote request received:",
        `Product: ${payload.productName}`,
        `Quantity: ${payload.quantity}`,
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Message: ${payload.message || "-"}`,
      ].join("\n"),
    };

    await transporter.sendMail(mailOptions);
    await appendEnquiryAsync({ ...enquiryBase, status: "sent" });
    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Best-effort save enquiry even when sending fails.
    if (payload?.productName) {
      await appendEnquiryAsync({
        productName: payload.productName,
        quantity: payload.quantity,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        status: "failed",
      });
    }
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}

