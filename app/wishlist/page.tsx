"use client";

import Link from "next/link";

import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  // 🔥 Convert IDs → full product objects
  const wishlistProducts = products.filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">
        ❤️ Your Wishlist
      </h1>

      {/* Empty State */}
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="text-zinc-500 dark:text-zinc-400">
            No favourites yet
          </p>

          <Link href="/products">
            <Button className="hover:scale-[1.02] active:scale-[0.97] transition">
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (

        /* ✅ REAL PRODUCT GRID */
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        ">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      )}
    </div>
  );
}