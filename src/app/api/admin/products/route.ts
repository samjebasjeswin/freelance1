import { NextResponse } from "next/server";
import { createProductDb } from "@/lib/productsRepo";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const price = typeof body.price === "string" ? body.price.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() : "";

    if (!name || !price || !image) {
      return NextResponse.json(
        { ok: false, error: "name, price, and image are required" },
        { status: 400 }
      );
    }

    const product = await createProductDb({
      name,
      price,
      image,
      badge: typeof body.badge === "string" ? body.badge.trim() : null,
      timer: typeof body.timer === "string" ? body.timer.trim() : null,
      category: typeof body.category === "string" ? body.category.trim() : undefined,
    });

    return NextResponse.json({ ok: true, product });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create product" }, { status: 500 });
  }
}

