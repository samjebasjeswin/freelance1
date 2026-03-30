import type { Product } from "@/components/ProductCard";

import fs from "fs";
import path from "path";
import { getDbPool } from "@/lib/db";
import mysql from "mysql2/promise";

const PRODUCTS_JSON_PATH = path.join(process.cwd(), "src", "data", "products.json");

function isDbConfigured() {
  return Boolean(
    process.env.DATABASE_URL ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );
}

function readProductsFile(): Product[] {
  const raw = fs.readFileSync(PRODUCTS_JSON_PATH, "utf8");
  const parsed = JSON.parse(raw) as Product[];
  if (!Array.isArray(parsed)) return [];
  return parsed;
}

export function getAllProducts(): Product[] {
  if (!isDbConfigured()) {
    try {
      return readProductsFile();
    } catch {
      return [];
    }
  }

  // If DB mode is configured, use async functions (getAllProductsAsync).
  // Returning JSON fallback can mislead the UI. Keep safe: return [].
  return [];
}

export function getProductById(id: number): Product | null {
  if (!isDbConfigured()) {
    const products = getAllProducts();
    const found = products.find((p) => Number(p.id) === id);
    return found ?? null;
  }

  return null;
}

export async function getAllProductsAsync(): Promise<Product[]> {
  if (!isDbConfigured()) return getAllProducts();

  const pool = getDbPool();
  const [rows] = await pool.execute(
    `SELECT id, name, price, image, badge, timer, category
     FROM products
     ORDER BY id DESC`
  );

  const data = Array.isArray(rows)
    ? (rows as unknown as Array<Record<string, unknown>>)
    : [];

  if (data.length === 0) {
    // Best-effort seed from bundled JSON (useful for first deploys).
    try {
      const seed = readProductsFile();
      if (seed.length > 0) {
        for (const p of seed) {
          await pool.execute(
            `INSERT INTO products (name, price, image, badge, timer, category)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              p.name,
              typeof p.price === "number" ? String(p.price) : String(p.price),
              p.image,
              p.badge ?? null,
              p.timer ?? null,
              p.category ?? null,
            ]
          );
        }
      }
    } catch {
      // ignore seed errors
    }

    const [rowsAfter] = await pool.execute(
      `SELECT id, name, price, image, badge, timer, category
       FROM products
       ORDER BY id DESC`
    );
    const seeded = Array.isArray(rowsAfter)
      ? (rowsAfter as unknown as Array<Record<string, unknown>>)
      : [];
    return seeded.map((r) => ({
      id: Number(r.id),
      name: String(r.name),
      price: String(r.price),
      image: String(r.image),
      badge: r.badge !== null ? String(r.badge) : null,
      timer: r.timer !== null ? String(r.timer) : null,
      category: r.category !== null ? String(r.category) : undefined,
    }));
  }

  return data.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    price: String(r.price),
    image: String(r.image),
    badge: r.badge !== null ? String(r.badge) : null,
    timer: r.timer !== null ? String(r.timer) : null,
    category: r.category !== null ? String(r.category) : undefined,
  }));
}

export async function getProductByIdAsync(id: number): Promise<Product | null> {
  if (!isDbConfigured()) return getProductById(id);

  const pool = getDbPool();
  const [rows] = await pool.execute(
    `SELECT id, name, price, image, badge, timer, category
     FROM products WHERE id = ? LIMIT 1`,
    [id]
  );

  const data = Array.isArray(rows)
    ? (rows as unknown as Array<Record<string, unknown>>)
    : [];
  const r = data[0];
  if (!r) {
    // If the table was empty and never seeded yet, seed and retry once.
    try {
      const seed = readProductsFile();
      if (seed.length > 0) {
        for (const p of seed) {
          await pool.execute(
            `INSERT INTO products (name, price, image, badge, timer, category)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              p.name,
              typeof p.price === "number" ? String(p.price) : String(p.price),
              p.image,
              p.badge ?? null,
              p.timer ?? null,
              p.category ?? null,
            ]
          );
        }
      }
    } catch {
      // ignore seed errors
    }

    const [rowsAfter] = await pool.execute(
      `SELECT id, name, price, image, badge, timer, category
       FROM products WHERE id = ? LIMIT 1`,
      [id]
    );
    const afterData = Array.isArray(rowsAfter)
      ? (rowsAfter as unknown as Array<Record<string, unknown>>)
      : [];
    const rAfter = afterData[0];
    if (!rAfter) return null;

    return {
      id: Number(rAfter.id),
      name: String(rAfter.name),
      price: String(rAfter.price),
      image: String(rAfter.image),
      badge: rAfter.badge !== null ? String(rAfter.badge) : null,
      timer: rAfter.timer !== null ? String(rAfter.timer) : null,
      category: rAfter.category !== null ? String(rAfter.category) : undefined,
    };
  }

  return {
    id: Number(r.id),
    name: String(r.name),
    price: String(r.price),
    image: String(r.image),
    badge: r.badge !== null ? String(r.badge) : null,
    timer: r.timer !== null ? String(r.timer) : null,
    category: r.category !== null ? String(r.category) : undefined,
  };
}

type CreateProductInput = Omit<Product, "id"> & { id?: number };

export async function createProductDb(input: CreateProductInput): Promise<Product> {
  if (!isDbConfigured()) {
    const products = readProductsFile();
    const nextId =
      input.id ??
      (products.length > 0 ? Math.max(...products.map((p) => Number(p.id))) + 1 : 1);

    const nextProduct: Product = { ...input, id: nextId };
    const next = [nextProduct, ...products];
    fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(next, null, 2), "utf8");
    return nextProduct;
  }

  const pool = getDbPool();
  const price = typeof input.price === "number" ? String(input.price) : input.price;

  const [result] = await pool.execute<mysql.ResultSetHeader>(
    `INSERT INTO products (name, price, image, badge, timer, category)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      input.name,
      price,
      input.image,
      input.badge ?? null,
      input.timer ?? null,
      input.category ?? null,
    ]
  );

  const insertId = (result as mysql.ResultSetHeader).insertId;
  return {
    id: insertId,
    name: input.name,
    price,
    image: input.image,
    badge: input.badge ?? null,
    timer: input.timer ?? null,
    category: input.category,
  };
}

// Keep the old signature for local JSON use; DB writes should use createProductDb.
export function createProduct(input: CreateProductInput): Product {
  const products = readProductsFile();
  const nextId =
    input.id ??
    (products.length > 0 ? Math.max(...products.map((p) => Number(p.id))) + 1 : 1);
  const nextProduct: Product = { ...input, id: nextId };
  const next = [nextProduct, ...products];
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(next, null, 2), "utf8");
  return nextProduct;
}

