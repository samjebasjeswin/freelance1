import fs from "fs";
import path from "path";
import { getDbPool } from "@/lib/db";

export type SmtpConfig = {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  quoteToEmail: string;
  quoteFromEmail?: string;
  quoteCcEmail?: string;
  quoteBccEmail?: string;
};

const SMTP_CONFIG_PATH = path.join(process.cwd(), "src", "data", "smtp-config.json");

function isDbConfigured() {
  return Boolean(
    process.env.DATABASE_URL ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );
}

export function getSmtpConfig(): Partial<SmtpConfig> | null {
  try {
    const raw = fs.readFileSync(SMTP_CONFIG_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SmtpConfig>;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSmtpConfig(config: Partial<SmtpConfig>) {
  fs.writeFileSync(SMTP_CONFIG_PATH, JSON.stringify(config ?? {}, null, 2), "utf8");
}

export async function getSmtpConfigAsync(): Promise<Partial<SmtpConfig> | null> {
  if (!isDbConfigured()) return getSmtpConfig();

  const pool = getDbPool();
  const [rows] = await pool.execute(
    `SELECT smtpHost, smtpPort, smtpUser, smtpPass, quoteToEmail, quoteFromEmail, quoteCcEmail, quoteBccEmail
     FROM admin_smtp_config
     WHERE id = 1
     LIMIT 1`
  );

  const data = Array.isArray(rows) ? (rows as unknown as Record<string, unknown>[]) : [];
  if (!data[0]) return null;
  const r = data[0];
  return {
    smtpHost: r.smtpHost ? String(r.smtpHost) : "",
    smtpPort: r.smtpPort ? String(r.smtpPort) : "",
    smtpUser: r.smtpUser ? String(r.smtpUser) : "",
    smtpPass: r.smtpPass ? String(r.smtpPass) : "",
    quoteToEmail: r.quoteToEmail ? String(r.quoteToEmail) : "",
    quoteFromEmail: r.quoteFromEmail !== null ? String(r.quoteFromEmail) : undefined,
    quoteCcEmail: r.quoteCcEmail !== null ? String(r.quoteCcEmail) : undefined,
    quoteBccEmail: r.quoteBccEmail !== null ? String(r.quoteBccEmail) : undefined,
  };
}

export async function saveSmtpConfigAsync(config: Partial<SmtpConfig>) {
  if (!isDbConfigured()) return saveSmtpConfig(config);

  const pool = getDbPool();
  await pool.execute(
    `INSERT INTO admin_smtp_config
      (id, smtpHost, smtpPort, smtpUser, smtpPass, quoteToEmail, quoteFromEmail, quoteCcEmail, quoteBccEmail)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      smtpHost = VALUES(smtpHost),
      smtpPort = VALUES(smtpPort),
      smtpUser = VALUES(smtpUser),
      smtpPass = VALUES(smtpPass),
      quoteToEmail = VALUES(quoteToEmail),
      quoteFromEmail = VALUES(quoteFromEmail),
      quoteCcEmail = VALUES(quoteCcEmail),
      quoteBccEmail = VALUES(quoteBccEmail)`,
    [
      config.smtpHost ?? "",
      config.smtpPort ?? "",
      config.smtpUser ?? "",
      config.smtpPass ?? "",
      config.quoteToEmail ?? "",
      config.quoteFromEmail ?? null,
      config.quoteCcEmail ?? null,
      config.quoteBccEmail ?? null,
    ]
  );
}

