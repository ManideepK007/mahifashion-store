"use client";

import { Suspense } from "react";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { Spinner } from "@/components/ui/spinner";

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <section className="bg-secondary/30 border-b border-border/50">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-semibold mb-2">
            Our Collection
          </h1>
          <p className="text-muted-foreground">
            Discover quality products curated for you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-10 flex flex-col gap-8">

        {/* Filters */}
        <Suspense
          fallback={
            <div className="flex justify-center py-6">
              <Spinner className="h-6 w-6" />
            </div>
          }
        >
          <ProductFilters />
        </Suspense>

        {/* Product Grid */}
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <Spinner className="h-8 w-8" />
            </div>
          }
        >
          <ProductGrid />
        </Suspense>

      </section>

    </div>
  );
}