import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductClient from "./product-client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) return notFound();

  return <ProductClient product={product} />;
}