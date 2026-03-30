import { NextResponse } from "next/server";
import { createCollectionDb } from "@/lib/collectionsRepo";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const productIdsRaw = Array.isArray(body.productIds) ? body.productIds : [];

    if (!name) {
      return NextResponse.json({ ok: false, error: "Collection name is required" }, { status: 400 });
    }

    const productIds = productIdsRaw
      .map((x) => (typeof x === "number" ? x : Number(x)))
      .filter((x) => Number.isFinite(x));

    const col = await createCollectionDb({ name, productIds });
    return NextResponse.json({ ok: true, collection: col });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create collection" }, { status: 500 });
  }
}

