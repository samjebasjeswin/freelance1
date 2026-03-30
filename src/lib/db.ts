import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

function getBoolEnv(name: string, defaultValue = false) {
  const v = process.env[name];
  if (v === undefined) return defaultValue;
  return v === "1" || v.toLowerCase() === "true" || v.toLowerCase() === "yes";
}

function getDbConfig(): mysql.PoolOptions {
  // Preferred: DATABASE_URL (works well on Vercel/Render)
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    // mysql2 supports connection string in createPool; keep it simple
    const ssl = getBoolEnv("DB_SSL", false);
    return {
      uri: databaseUrl,
      ssl: ssl ? { rejectUnauthorized: false } : undefined,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0,
      charset: "utf8mb4",
    };
  }

  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const database = process.env.DB_NAME;
  const ssl = getBoolEnv("DB_SSL", false);

  return {
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    charset: "utf8mb4",
    ssl: ssl ? { rejectUnauthorized: false } : undefined,
  };
}

export function getDbPool() {
  if (pool) return pool;

  pool = mysql.createPool(getDbConfig());
  return pool;
}

