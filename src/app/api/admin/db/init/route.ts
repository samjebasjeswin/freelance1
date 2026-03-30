import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function POST() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== "1") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pool = getDbPool();

    // Run sequentially (safe with pg).
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price TEXT NOT NULL,
        image TEXT NOT NULL,
        badge TEXT NULL,
        timer TEXT NULL,
        category TEXT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS collections (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS collection_products (
        "collectionId" INT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
        "productId" INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        PRIMARY KEY ("collectionId", "productId")
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "productName" TEXT NOT NULL,
        quantity INT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NULL,
        status TEXT NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_smtp_config (
        id INT PRIMARY KEY,
        "smtpHost" TEXT NOT NULL,
        "smtpPort" TEXT NOT NULL,
        "smtpUser" TEXT NOT NULL,
        "smtpPass" TEXT NOT NULL,
        "quoteToEmail" TEXT NOT NULL,
        "quoteFromEmail" TEXT NULL,
        "quoteCcEmail" TEXT NULL,
        "quoteBccEmail" TEXT NULL
      );
    `);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Init failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

