"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { products, type Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Empty,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

import { Grid, List, ArrowUpDown, Package } from "lucide-react";

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card">
      <div className="aspect-[4/5] bg-secondary/30">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}

export function ProductGrid() {
  const searchParams = useSearchParams();

  // ✅ ALWAYS SAFE DEFAULTS
  const category = searchParams.get("category") || "all";
  const brand = searchParams.get("brand") || "all";
  const gender = searchParams.get("gender") || "all";
  const size = searchParams.get("size") || "all";
  const search = searchParams.get("search") || "";

  const [sortBy, setSortBy] = useState<
    "name" | "price-low" | "price-high" | "rating" | "newest"
  >("name");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const query = search.toLowerCase().trim();

  /* ✅ FINAL FILTER LOGIC */

  let filteredProducts: Product[] = products.filter((product) => {
    const name = product.name?.toLowerCase() ?? "";
    const description = product.description?.toLowerCase() ?? "";

    // CATEGORY
    if (category !== "all" && product.category !== category) return false;

    // BRAND (case safe)
    if (
      brand !== "all" &&
      product.brand?.toLowerCase() !== brand.toLowerCase()
    )
      return false;

    // GENDER (case safe)
    if (
      gender !== "all" &&
      product.gender?.toLowerCase() !== gender.toLowerCase()
    )
      return false;

    // SIZE
    if (size !== "all" && !product.sizes?.includes(size)) return false;

    // SEARCH (name + description)
    if (query && !name.includes(query) && !description.includes(query))
      return false;

    return true;
  });

  /* SORT */

  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "rating":
        return (b.rating || 0) - (a.rating || 0);

      case "newest":
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );

      default:
        return a.name.localeCompare(b.name);
    }
  });

  /* EMPTY */

  if (filteredProducts.length === 0) {
    return (
      <div className="py-20 text-center">
        <Empty>
          <EmptyMedia>
            <Package className="h-12 w-12 text-muted-foreground" />
          </EmptyMedia>

          <EmptyTitle>No products found</EmptyTitle>

          <EmptyDescription>
            Try adjusting filters or search
          </EmptyDescription>

          <Button className="mt-4" onClick={() => location.href = "/products"}>
            Reset Filters
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} product
          {filteredProducts.length !== 1 && "s"}
        </p>

        <div className="flex items-center gap-3">

          {/* SORT */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* VIEW */}
          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>

            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "space-y-4"
        }
      >
        {filteredProducts.map((product, index) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
}