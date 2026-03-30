import fs from "fs";
import path from "path";
import { getDbPool } from "@/lib/db";

export type Collection = {
  id: number;
  name: string;
  productIds: number[];
  createdAt: string;
};

const COLLECTIONS_JSON_PATH = path.join(process.cwd(), "src", "data", "collections.json");

function readCollectionsFile(): Collection[] {
  const raw = fs.readFileSync(COLLECTIONS_JSON_PATH, "utf8");
  const parsed = JSON.parse(raw) as Collection[];
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((c) => typeof c?.id === "number" && typeof c?.name === "string")
    .map((c) => ({
      id: c.id,
      name: c.name,
      productIds: Array.isArray(c.productIds) ? c.productIds.map((x) => Number(x)).filter((x) => Number.isFinite(x)) : [],
      createdAt: typeof c.createdAt === "string" ? c.createdAt : new Date().toISOString(),
    }));
}

function writeCollectionsFile(collections: Collection[]) {
  fs.writeFileSync(COLLECTIONS_JSON_PATH, JSON.stringify(collections, null, 2), "utf8");
}

export function getAllCollections(): Collection[] {
  const hasDb = Boolean(
    process.env.DATABASE_URL ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );
  if (hasDb) return [];
  try {
    return readCollectionsFile();
  } catch {
    return [];
  }
}

type CreateCollectionInput = {
  name: string;
  productIds: number[];
};

export function createCollection(input: CreateCollectionInput): Collection {
  const hasDb = Boolean(
    process.env.DATABASE_URL ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );
  if (hasDb) {
    // In DB mode, use createCollectionDb.
    throw new Error("createCollection() is not available in DB mode");
  }
  const all = getAllCollections();
  const nextId = all.length > 0 ? Math.max(...all.map((c) => c.id)) + 1 : 1;

  const next: Collection = {
    id: nextId,
    name: input.name,
    productIds: input.productIds.map((x) => Number(x)).filter((x) => Number.isFinite(x)),
    createdAt: new Date().toISOString(),
  };

  writeCollectionsFile([next, ...all]);
  return next;
}

export async function getAllCollectionsAsync(): Promise<Collection[]> {
  const hasDb = Boolean(
    process.env.DATABASE_URL ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );

  if (!hasDb) return getAllCollections();

  const pool = getDbPool();
  const [rows] = await pool.execute(
    `SELECT c.id, c.name, c.createdAt
     FROM collections c
     ORDER BY c.id DESC`
  );

  const data = Array.isArray(rows)
    ? (rows as unknown as Array<Record<string, unknown>>)
    : [];
  if (data.length === 0) return [];

  // Fetch join table
  const ids = data.map((x) => Number(x.id));
  const [cpRows] = await pool.execute(
    `SELECT collectionId, productId FROM collection_products WHERE collectionId IN (?)`,
    [ids]
  );
  const cpData = Array.isArray(cpRows)
    ? (cpRows as unknown as Array<Record<string, unknown>>)
    : [];

  const map = new Map<number, number[]>();
  for (const c of data) map.set(Number(c.id), []);
  for (const r of cpData) {
    const cid = Number(r.collectionId);
    const pid = Number(r.productId);
    if (map.has(cid) && Number.isFinite(pid)) map.get(cid)!.push(pid);
  }

  return data.map((c) => ({
    id: Number(c.id),
    name: String(c.name),
    productIds: map.get(Number(c.id)) ?? [],
    createdAt: typeof c.createdAt === "string" ? c.createdAt : new Date().toISOString(),
  }));
}

export async function createCollectionDb(input: CreateCollectionInput): Promise<Collection> {
  const hasDb = Boolean(
    process.env.DATABASE_URL ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );
  if (!hasDb) return createCollection(input);

  const pool = getDbPool();
  const name = input.name;
  const productIds = input.productIds.map((x) => Number(x)).filter((x) => Number.isFinite(x));

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [insertRes] = await conn.execute(
      `INSERT INTO collections (name, createdAt) VALUES (?, NOW())`,
      [name]
    );
    const collectionId = Number(
      (insertRes as unknown as { insertId?: number }).insertId
    );
    if (!Number.isFinite(collectionId) || collectionId <= 0) {
      throw new Error("Failed to get inserted collection id");
    }

    if (productIds.length > 0) {
      const values = productIds.map((pid) => [collectionId, pid]);
      await conn.query(
        `INSERT INTO collection_products (collectionId, productId) VALUES ?`,
        [values]
      );
    }

    await conn.commit();

    return {
      id: collectionId,
      name,
      productIds,
      createdAt: new Date().toISOString(),
    };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

