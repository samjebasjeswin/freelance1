import { notFound } from "next/navigation";
import type { Product } from "@/components/ProductCard";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductByIdAsync } from "@/lib/productsRepo";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const product: Product | null = await getProductByIdAsync(id);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
