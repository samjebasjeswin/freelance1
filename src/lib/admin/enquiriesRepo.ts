import fs from "fs";
import path from "path";
import { getDbPool } from "@/lib/db";

export type Enquiry = {
  id: number;
  createdAt: string;
  productName: string;
  quantity: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: "submitted" | "sent" | "failed";
};

const ENQUIRIES_JSON_PATH = path.join(process.cwd(), "src", "data", "enquiries.json");

function isDbConfigured() {
  return Boolean(
    process.env.DATABASE_URL ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );
}

function readEnquiriesFile(): Enquiry[] {
  const raw = fs.readFileSync(ENQUIRIES_JSON_PATH, "utf8");
  const parsed = JSON.parse(raw) as Enquiry[];
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((x) => x && typeof x.id === "number")
    .map((x) => ({
      ...x,
      status: x.status || "submitted",
      createdAt: typeof x.createdAt === "string" ? x.createdAt : new Date().toISOString(),
    }));
}

function writeEnquiriesFile(entries: Enquiry[]) {
  fs.writeFileSync(ENQUIRIES_JSON_PATH, JSON.stringify(entries, null, 2), "utf8");
}

export function appendEnquiry(entry: Omit<Enquiry, "id" | "createdAt">) {
  const all = (() => {
    try {
      return readEnquiriesFile();
    } catch {
      return [];
    }
  })();

  const nextId = all.length > 0 ? Math.max(...all.map((x) => x.id)) + 1 : 1;
  const next: Enquiry = {
    id: nextId,
    createdAt: new Date().toISOString(),
    ...entry,
  };

  writeEnquiriesFile([next, ...all]);
  return next;
}

export function getAllEnquiries(): Enquiry[] {
  try {
    return readEnquiriesFile();
  } catch {
    return [];
  }
}

export async function appendEnquiryAsync(
  entry: Omit<Enquiry, "id" | "createdAt">
): Promise<Enquiry> {
  if (!isDbConfigured()) {
    return appendEnquiry(entry);
  }

  const pool = getDbPool();
  const [result] = await pool.execute(
    `INSERT INTO enquiries (productName, quantity, name, email, phone, message, status, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      entry.productName,
      entry.quantity,
      entry.name,
      entry.email,
      entry.phone,
      entry.message ?? null,
      entry.status ?? "submitted",
    ]
  );

  const insertId = (result as { insertId?: number }).insertId;
  return {
    id: typeof insertId === "number" ? insertId : Date.now(),
    createdAt: new Date().toISOString(),
    ...entry,
  };
}

export async function getAllEnquiriesAsync(): Promise<Enquiry[]> {
  if (!isDbConfigured()) {
    return getAllEnquiries();
  }

  const pool = getDbPool();
  const [rows] = await pool.execute(
    `SELECT id, createdAt, productName, quantity, name, email, phone, message, status
     FROM enquiries
     ORDER BY id DESC`
  );

  const data = Array.isArray(rows)
    ? (rows as unknown as Array<Record<string, unknown>>)
    : [];

  return data.map((r) => ({
    id: Number(r.id),
    createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date().toISOString(),
    productName: String(r.productName ?? ""),
    quantity: Number(r.quantity ?? 0),
    name: String(r.name ?? ""),
    email: String(r.email ?? ""),
    phone: String(r.phone ?? ""),
    message: r.message !== null && r.message !== undefined ? String(r.message) : undefined,
    status: (r.status === "sent" || r.status === "failed" ? r.status : "submitted") as
      | "submitted"
      | "sent"
      | "failed",
  }));
}

