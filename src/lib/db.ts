import { Pool } from "pg";

let pool: Pool | null = null;

function getBoolEnv(name: string, defaultValue = false) {
  const v = process.env[name];
  if (v === undefined) return defaultValue;
  return v === "1" || v.toLowerCase() === "true" || v.toLowerCase() === "yes";
}

export function getDbPool() {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for Postgres");
  }

  const ssl = getBoolEnv("DB_SSL", true); // Render Postgres typically needs SSL
  pool = new Pool({
    connectionString: databaseUrl,
    ssl: ssl ? { rejectUnauthorized: false } : undefined,
    max: 10,
  });

  return pool;
}

