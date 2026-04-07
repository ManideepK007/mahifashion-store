"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Heart, ShoppingCart, Eye, Star } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { formatPrice } from "@/lib/formatPrice";
import { type Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, image, name, price, category, brand } = product;

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = wishlist?.includes(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;

    setIsAdding(true);

    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
    });

    toast({
      title: "Added to cart 🛒",
      description: `${name} added successfully`,
    });

    setTimeout(() => setIsAdding(false), 400);
  };

  return (
    <TooltipProvider>
      {/* 🔥 Whole card clickable */}
      <Link href={`/products/${id}`} className="block">
        <Card
          className="
          group relative flex flex-col overflow-hidden rounded-2xl
          border border-zinc-200 dark:border-zinc-800
          bg-white/70 dark:bg-zinc-900/60
          backdrop-blur-md cursor-pointer
          transition-all duration-300
          hover:shadow-2xl hover:-translate-y-1
        "
        >
          {/* ❤️ Wishlist */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`
                  absolute top-3 right-3 z-10 h-8 w-8 rounded-full
                  bg-white/70 dark:bg-zinc-800/70 backdrop-blur
                  ${isWishlisted ? "text-red-500" : "text-zinc-600 dark:text-zinc-300"}
                `}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(id);
                }}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isWishlisted ? "fill-red-500 scale-110" : ""
                  }`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isWishlisted ? "Remove" : "Add to wishlist"}
            </TooltipContent>
          </Tooltip>

          {/* 🖼 Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`
                object-cover transition duration-500
                group-hover:scale-105
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              onLoad={() => setImageLoaded(true)}
            />

            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-700" />
            )}

            {/* ⚡ Quick Actions */}
            <div className="
              absolute inset-x-4 bottom-4 flex gap-2
              opacity-0 translate-y-3
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-300
            ">
              {/* 👁 View */}
              <Button
                size="sm"
                variant="secondary"
                className="flex-1 backdrop-blur-md"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/products/${id}`;
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>

              {/* 🛒 Cart */}
              <Button
                size="sm"
                variant="secondary"
                disabled={isAdding}
                onClick={handleAddToCart}
                className="hover:scale-105 active:scale-95 transition"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 📦 Info */}
          <CardContent className="flex flex-col gap-2 p-4">
            <span className="text-xs uppercase text-zinc-500">
              {category}
            </span>

            <h3 className="text-sm font-medium line-clamp-2">
              {name}
            </h3>

            {/* ⭐ Rating */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            {brand && (
              <p className="text-xs text-zinc-500">{brand}</p>
            )}

            <p className="mt-auto text-lg font-semibold">
              {formatPrice(price)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </TooltipProvider>
  );
}