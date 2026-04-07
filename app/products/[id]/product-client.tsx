"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/lib/data";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

export default function ProductClient({ product }: Props) {
  if (!product) return null;

  const router = useRouter();

  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const isWishlisted = useMemo(
    () => wishlist?.includes(product.id),
    [wishlist, product.id]
  );

  const whatsappUrl = useMemo(() => {
    const message = `Hi, I'm interested in ${product.name} - ${formatPrice(product.price)}`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  }, [product]);

  // 🛒 Add to cart
  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      quantity: 1,
      size: selectedSize || undefined,
    });
  };

  // ⚡ Buy Now
  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <div className="relative aspect-square rounded-xl overflow-hidden border">
        <Image
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition"
        />
      </div>

      {/* DETAILS */}
      <div className="flex flex-col gap-4">

        <h1 className="text-3xl md:text-4xl font-semibold">
          {product.name}
        </h1>

        <p className="text-2xl font-bold">
          {formatPrice(product.price)}
        </p>

        <p className="text-zinc-500 dark:text-zinc-400">
          {product.description}
        </p>

        {/* ⭐ Rating */}
        {product.rating && (
          <div className="text-yellow-500 text-sm">
            ⭐ {product.rating} / 5
          </div>
        )}

        {/* 🎯 SIZE SELECT */}
        {product.sizes?.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Select Size:</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded-md text-sm transition
                    ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {!selectedSize && (
              <p className="text-xs text-red-500 mt-1">
                Please select a size
              </p>
            )}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3">

          <Button onClick={handleAddToCart}>
            🛒 Add to Cart
          </Button>

          <Button onClick={handleBuyNow} className="bg-black text-white">
            ⚡ Buy Now
          </Button>

          <Button
            variant="outline"
            onClick={() => toggleWishlist(product.id)}
          >
            {isWishlisted
              ? "❤️ Remove"
              : "🤍 Wishlist"}
          </Button>

        </div>

        {/* WhatsApp */}
        <a href={whatsappUrl} target="_blank">
          <Button className="w-full bg-green-600 text-white">
            💬 Chat on WhatsApp
          </Button>
        </a>

      </div>
    </div>
  );
}